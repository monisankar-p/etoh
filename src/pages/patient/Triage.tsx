import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '../../components/ui/card';
import { Stethoscope, Mic, MicOff, ActivitySquare, AlertCircle, Send, CheckCircle2, ShieldAlert } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { extractSymptoms, getNextQuestion, calculateSeverity } from '../../services/triageService';
import type { ExtractedSymptoms, FollowUpQuestion, AssessmentResult } from '../../services/triageService';
import { useTranslation } from '../../i18n';
import { useLanguageStore } from '../../stores/useLanguageStore';

interface ChatMessage {
  id: string;
  role: 'ai' | 'user';
  text: string;
}

// Ensure TypeScript knows about webkitSpeechRecognition
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

export default function Triage() {
  const { t } = useTranslation();
  const { language } = useLanguageStore();

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [analyzing, setAnalyzing] = useState(false);
  
  // Voice Recording State
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const recognitionRef = useRef<any>(null);

  // Chat State
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [symptoms, setSymptoms] = useState<ExtractedSymptoms | null>(null);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [currentQuestion, setCurrentQuestion] = useState<FollowUpQuestion | null>(null);
  
  // Assessment State
  const [assessment, setAssessment] = useState<AssessmentResult | null>(null);

  const endMessagesRef = useRef<HTMLDivElement>(null);

  // Initialize Speech Recognition
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      
      const langMap: Record<string, string> = {
        'en': 'en-US',
        'hi': 'hi-IN',
        'bn': 'bn-IN',
        'or': 'or-IN', // Experimental or fallback
        'ta': 'ta-IN',
        'te': 'te-IN',
        'mr': 'mr-IN'
      };
      recognition.lang = langMap[language] || 'en-US';

      recognition.onresult = (event: any) => {
        let currentTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            currentTranscript += event.results[i][0].transcript + ' ';
          } else {
            currentTranscript += event.results[i][0].transcript;
          }
        }
        // Update with full history + new interim/final
        const newTranscript = Array.from(event.results)
          .map((res: any) => res[0].transcript)
          .join('');
        setTranscript(newTranscript);
      };

      recognition.onerror = (event: any) => {
        console.error('Speech recognition error', event.error);
        setIsRecording(false);
      };

      recognition.onend = () => {
         setIsRecording(false);
      };

      recognitionRef.current = recognition;
    }
  }, [language]);

  useEffect(() => {
    if (endMessagesRef.current) {
      endMessagesRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const toggleRecording = () => {
    if (isRecording) {
      recognitionRef.current?.stop();
      setIsRecording(false);
    } else {
      setTranscript('');
      recognitionRef.current?.start();
      setIsRecording(true);
    }
  };

  const handleInitialSubmit = async () => {
    if (!transcript.trim()) return;
    
    if (isRecording) {
      recognitionRef.current?.stop();
      setIsRecording(false);
    }

    setAnalyzing(true);
    
    // Extract symptoms using mock NLP
    const extracted = await extractSymptoms(transcript);
    setSymptoms(extracted);
    
    setMessages([
      { id: Date.now().toString() + '-user', role: 'user', text: transcript },
      { id: Date.now().toString() + '-ai', role: 'ai', text: `I've noted that you are experiencing ${extracted.intensity.toLowerCase()} ${extracted.primarySymptom.toLowerCase()} in your ${extracted.location.toLowerCase()} (${extracted.duration.toLowerCase()}). Let me ask a few follow-up questions to understand better.` }
    ]);

    const nextQ = getNextQuestion(extracted, {});
    setCurrentQuestion(nextQ);
    
    if (nextQ) {
       setTimeout(() => {
           setMessages(prev => [...prev, { id: Date.now().toString(), role: 'ai', text: nextQ.question }]);
           setStep(2);
           setAnalyzing(false);
       }, 2000);
    } else {
       // Direct to severity if no questions
       finishTriage(extracted, {});
    }
  };

  const handleAnswer = (answer: string) => {
    if (!currentQuestion || !symptoms) return;

    // Add user answer to chat
    setMessages(prev => [...prev, { id: Date.now().toString() + '-user', role: 'user', text: answer }]);
    
    // Record answer
    const newAnswers = { ...answers, [currentQuestion.id]: answer };
    setAnswers(newAnswers);
    
    // Get next question
    const nextQ = getNextQuestion(symptoms, newAnswers);
    setCurrentQuestion(nextQ);

    if (nextQ) {
       setAnalyzing(true);
       setTimeout(() => {
           setMessages(prev => [...prev, { id: Date.now().toString() + '-ai', role: 'ai', text: nextQ.question }]);
           setAnalyzing(false);
       }, 1000);
    } else {
       finishTriage(symptoms, newAnswers);
    }
  };

  const finishTriage = (currentSymptoms: ExtractedSymptoms, currentAnswers: Record<string, string>) => {
      setAnalyzing(true);
      setTimeout(() => {
         const result = calculateSeverity(currentSymptoms, currentAnswers);
         setAssessment(result);
         setAnalyzing(false);
         setStep(3);
      }, 2000);
  };

  const resetTriage = () => {
      setStep(1);
      setTranscript('');
      setMessages([]);
      setSymptoms(null);
      setAnswers({});
      setCurrentQuestion(null);
      setAssessment(null);
  };

  const getLevelColor = (level: number) => {
      switch(level) {
          case 4: return 'text-red-500 border-red-500/20 bg-red-500/5 shadow-[0_0_20px_rgba(239,68,68,0.1)]';
          case 3: return 'text-orange-500 border-orange-500/20 bg-orange-500/5 shadow-[0_0_20px_rgba(249,115,22,0.1)]';
          case 2: return 'text-yellow-500 border-yellow-500/20 bg-yellow-500/5 shadow-[0_0_20px_rgba(234,179,8,0.1)]';
          default: return 'text-green-500 border-green-500/20 bg-green-500/5 shadow-[0_0_20px_rgba(34,197,94,0.1)]';
      }
  };

  return (
    <div className="p-4 md:p-8 h-full flex flex-col bg-muted/10 overflow-y-auto">
      <div className="mb-8 max-w-4xl mx-auto w-full">
        <h1 className="text-3xl font-bold flex items-center gap-3 mb-2">
          <Stethoscope className="w-8 h-8 text-primary" />
          {t('triage.title')}
        </h1>
        <p className="text-muted-foreground">{t('triage.subtitle')}</p>
      </div>

      <div className="max-w-4xl mx-auto w-full flex-1 flex flex-col">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div key="step1" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, x: -20 }} className="flex-1 flex flex-col justify-center">
              <Card className="border-primary/20 shadow-xl overflow-hidden relative">
                {analyzing && (
                  <div className="absolute inset-0 bg-background/80 backdrop-blur-sm z-10 flex flex-col items-center justify-center">
                    <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4" />
                    <h3 className="text-lg font-bold text-primary animate-pulse">Extracting Clinical Data...</h3>
                    <p className="text-sm text-muted-foreground mt-2">Analyzing your symptoms with AI</p>
                  </div>
                )}
                <CardHeader className="text-center pb-2">
                  <CardTitle className="text-2xl">How are you feeling?</CardTitle>
                  <CardDescription>Speak naturally to describe your symptoms, when they started, and how severe they are.</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center py-12">
                  
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={toggleRecording}
                    className={`w-32 h-32 rounded-full flex items-center justify-center transition-all duration-300 shadow-2xl mb-8 ${isRecording ? 'bg-red-500 text-white animate-pulse' : 'bg-primary text-primary-foreground hover:bg-primary/90'}`}
                  >
                    {isRecording ? <MicOff className="w-12 h-12" /> : <Mic className="w-12 h-12" />}
                  </motion.button>
                  
                  {isRecording && <p className="text-red-500 font-medium mb-4 animate-pulse">Recording... Click to stop</p>}
                  
                  <div className="w-full max-w-lg mb-6 relative">
                    <textarea 
                      className="w-full bg-muted/50 p-6 rounded-xl border min-h-[120px] text-lg leading-relaxed text-center font-medium resize-none focus:outline-none focus:ring-2 focus:ring-primary/50"
                      placeholder='e.g., "I have severe chest pain on my left side since this morning."'
                      value={transcript}
                      onChange={(e) => setTranscript(e.target.value)}
                      disabled={isRecording}
                    />
                  </div>

                  <Button size="lg" className="w-full max-w-xs text-lg h-14" disabled={!transcript.trim() || isRecording} onClick={handleInitialSubmit}>
                      Start Assessment <ActivitySquare className="ml-2 w-5 h-5" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, scale: 0.95 }} className="flex-1 flex flex-col h-[600px]">
              <Card className="border-primary/20 flex-1 flex flex-col overflow-hidden">
                <CardHeader className="border-b bg-muted/30 pb-4">
                  <CardTitle className="flex items-center gap-2">
                      <ActivitySquare className="w-5 h-5 text-primary" /> Conversational Triage
                  </CardTitle>
                  <CardDescription>Our AI is dynamically assessing your condition.</CardDescription>
                </CardHeader>
                <CardContent className="flex-1 overflow-y-auto p-6 space-y-6 flex flex-col">
                    {messages.map((msg) => (
                        <motion.div 
                            key={msg.id} 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                            <div className={`max-w-[80%] rounded-2xl p-4 shadow-sm ${msg.role === 'user' ? 'bg-primary text-primary-foreground rounded-tr-sm' : 'bg-muted rounded-tl-sm'}`}>
                                <p className="leading-relaxed">{msg.text}</p>
                            </div>
                        </motion.div>
                    ))}
                    {analyzing && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                            <div className="bg-muted rounded-2xl p-4 rounded-tl-sm flex gap-2 items-center">
                                <div className="w-2 h-2 bg-primary rounded-full animate-bounce" />
                                <div className="w-2 h-2 bg-primary rounded-full animate-bounce delay-75" />
                                <div className="w-2 h-2 bg-primary rounded-full animate-bounce delay-150" />
                            </div>
                        </motion.div>
                    )}
                    <div ref={endMessagesRef} />
                </CardContent>
                <CardFooter className="border-t bg-background p-4 flex-col gap-4 items-stretch">
                   {currentQuestion?.options && !analyzing && (
                       <div className="flex flex-wrap gap-2 justify-center w-full mb-2">
                           {currentQuestion.options.map(opt => (
                               <Button key={opt} variant="outline" onClick={() => handleAnswer(opt)} className="rounded-full hover:bg-primary/10 hover:text-primary transition-colors">
                                   {opt}
                               </Button>
                           ))}
                       </div>
                   )}
                   <div className="flex gap-2 relative">
                        <Button variant="outline" size="icon" className={`absolute left-2 top-1/2 -translate-y-1/2 rounded-full w-10 h-10 ${isRecording ? 'text-red-500 bg-red-50 hover:bg-red-100 hover:text-red-600' : ''}`} onClick={toggleRecording}>
                            {isRecording ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                        </Button>
                        <input 
                            type="text" 
                            className="flex-1 rounded-full border bg-muted/50 px-14 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
                            placeholder={isRecording ? "Listening..." : "Type your answer or use microphone..."}
                            value={transcript}
                            onChange={(e) => setTranscript(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && transcript.trim() && !analyzing) {
                                    handleAnswer(transcript);
                                    setTranscript('');
                                }
                            }}
                        />
                        <Button 
                            size="icon" 
                            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full w-10 h-10"
                            disabled={!transcript.trim() || analyzing}
                            onClick={() => {
                                handleAnswer(transcript);
                                setTranscript('');
                            }}
                        >
                            <Send className="w-4 h-4" />
                        </Button>
                   </div>
                </CardFooter>
              </Card>
            </motion.div>
          )}

          {step === 3 && assessment && (
            <motion.div key="step3" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2 space-y-6">
                  
                  <Card className={`border-2 ${getLevelColor(assessment.level)}`}>
                    <CardHeader className="border-b bg-black/5 pb-4">
                      <div className="flex justify-between items-center">
                          <CardTitle className="flex items-center gap-2">
                              {assessment.level >= 3 ? <ShieldAlert className="w-6 h-6" /> : <CheckCircle2 className="w-6 h-6" />}
                              Triage Assessment Complete
                          </CardTitle>
                          <div className="text-right">
                              <span className="text-3xl font-black">{assessment.score}</span>
                              <span className="text-sm opacity-70">/100</span>
                          </div>
                      </div>
                    </CardHeader>
                    <CardContent className="p-6">
                      <div className="mb-8">
                          <div className="flex items-center gap-4 mb-4">
                              <h3 className="text-2xl font-bold uppercase tracking-wider">{assessment.classification} SEVERITY</h3>
                              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase bg-black/10 border border-black/10">Level {assessment.level}</span>
                          </div>
                          <p className="text-lg opacity-90 leading-relaxed font-medium bg-black/5 p-4 rounded-xl border border-black/5">{assessment.recommendedAction}</p>
                      </div>

                      {assessment.level >= 3 && (
                        <div className="flex gap-4">
                          <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white flex-1 h-14 text-lg">Call Emergency (911)</Button>
                          <Button size="lg" variant="outline" className="flex-1 h-14 text-lg bg-white/50 hover:bg-white backdrop-blur">Find Nearest ER</Button>
                        </div>
                      )}
                      {assessment.level === 2 && (
                        <Button size="lg" className="w-full h-14 text-lg bg-primary hover:bg-primary/90 text-white shadow-xl shadow-primary/20">Schedule Urgent Appointment</Button>
                      )}
                      {assessment.level === 1 && (
                        <Button size="lg" variant="outline" className="w-full h-14 text-lg bg-white/50 hover:bg-white">View Self-Care Instructions</Button>
                      )}
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Clinical Reasoning</CardTitle>
                      <CardDescription>Factors contributing to this assessment score.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-3">
                            {assessment.reasoning.map((reason, idx) => (
                                <li key={idx} className="flex gap-3 text-sm p-3 rounded-lg bg-muted/50 border">
                                    <AlertCircle className="w-5 h-5 text-muted-foreground shrink-0" />
                                    <span>{reason}</span>
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                  </Card>
                </div>

                <div className="space-y-6">
                  <Card className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground border-none shadow-xl shadow-primary/20">
                    <CardContent className="p-6">
                      <h3 className="font-bold text-lg mb-2">Telehealth Available</h3>
                      <p className="text-sm text-primary-foreground/90 mb-6 leading-relaxed">A triage nurse is available right now for a secure video consultation to verify your symptoms.</p>
                      <Button className="w-full bg-white text-primary hover:bg-white/90 h-12 font-bold transition-all hover:scale-[1.02]">Connect Now</Button>
                    </CardContent>
                  </Card>

                  <Card>
                      <CardHeader className="pb-2">
                          <CardTitle className="text-sm uppercase tracking-wider text-muted-foreground">Extracted Data</CardTitle>
                      </CardHeader>
                      <CardContent>
                          <div className="space-y-2 text-sm">
                              <div className="flex justify-between border-b pb-2"><span className="text-muted-foreground">Symptom</span> <span className="font-medium">{symptoms?.primarySymptom}</span></div>
                              <div className="flex justify-between border-b pb-2"><span className="text-muted-foreground">Location</span> <span className="font-medium">{symptoms?.location}</span></div>
                              <div className="flex justify-between border-b pb-2"><span className="text-muted-foreground">Duration</span> <span className="font-medium">{symptoms?.duration}</span></div>
                              <div className="flex justify-between"><span className="text-muted-foreground">Intensity</span> <span className="font-medium">{symptoms?.intensity}</span></div>
                          </div>
                      </CardContent>
                  </Card>

                  <Button variant="outline" className="w-full h-12 border-dashed border-2 hover:bg-muted/50 transition-colors" onClick={resetTriage}>Start New Assessment</Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
