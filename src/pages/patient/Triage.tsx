import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card';
import { Stethoscope, AlertCircle, ActivitySquare } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

export default function Triage() {
  const [step, setStep] = useState(1);
  const [analyzing, setAnalyzing] = useState(false);

  const handleAnalyze = () => {
    setAnalyzing(true);
    setTimeout(() => {
      setAnalyzing(false);
      setStep(3);
    }, 2500);
  };

  return (
    <div className="p-8 h-full flex flex-col bg-muted/10 overflow-y-auto">
      <div className="mb-8 max-w-4xl mx-auto w-full">
        <h1 className="text-3xl font-bold flex items-center gap-3 mb-2">
          <Stethoscope className="w-8 h-8 text-primary" />
          AI Symptom Triage
        </h1>
        <p className="text-muted-foreground">Describe your symptoms for an instant AI differential diagnosis and routing.</p>
      </div>

      <div className="max-w-4xl mx-auto w-full flex-1">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div key="step1" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, x: -20 }}>
              <Card className="border-primary/20">
                <CardHeader>
                  <CardTitle>Where does it hurt?</CardTitle>
                  <CardDescription>Select the primary body system experiencing symptoms.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    {['Head & Neck', 'Chest & Heart', 'Abdomen', 'Limbs & Joints'].map((part) => (
                      <Button key={part} variant="outline" className="h-24 flex flex-col gap-2 hover:border-primary hover:bg-primary/5" onClick={() => setStep(2)}>
                        <ActivitySquare className="w-6 h-6 text-muted-foreground" />
                        {part}
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, scale: 0.95 }}>
              <Card className="border-primary/20 relative overflow-hidden">
                {analyzing && (
                  <div className="absolute inset-0 bg-background/80 backdrop-blur-sm z-10 flex flex-col items-center justify-center">
                    <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4" />
                    <h3 className="text-lg font-bold text-primary animate-pulse">Running Differential Diagnosis...</h3>
                    <p className="text-sm text-muted-foreground mt-2">Cross-referencing your medical history</p>
                  </div>
                )}
                <CardHeader>
                  <CardTitle>Describe the pain</CardTitle>
                  <CardDescription>Provide more context for 'Chest & Heart' symptoms.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold">Severity (1-10)</label>
                    <input type="range" min="1" max="10" defaultValue="6" className="w-full accent-primary" />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Mild</span>
                      <span>Severe</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-semibold">Type of Pain</label>
                    <div className="flex flex-wrap gap-2">
                      {['Sharp', 'Dull Ache', 'Crushing', 'Burning', 'Radiating'].map(t => (
                        <span key={t} className="px-3 py-1.5 rounded-full border bg-muted/30 text-sm cursor-pointer hover:bg-primary hover:text-white transition-colors">{t}</span>
                      ))}
                    </div>
                  </div>

                  <Button className="w-full" size="lg" onClick={handleAnalyze}>Generate AI Assessment</Button>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div key="step3" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2 space-y-6">
                  <Card className="border-amber-500/30 shadow-[0_0_20px_rgba(245,158,11,0.1)]">
                    <CardHeader className="bg-amber-500/5 border-b border-amber-500/20">
                      <CardTitle className="text-amber-600 flex items-center gap-2">
                        <AlertCircle className="w-5 h-5" /> Recommended Action
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                      <h3 className="text-2xl font-bold mb-2">Seek Urgent Care</h3>
                      <p className="text-muted-foreground mb-6">Based on your description of crushing chest pain and your genetic risk profile, we recommend immediate medical evaluation to rule out cardiac events.</p>
                      <div className="flex gap-4">
                        <Button className="bg-destructive hover:bg-destructive/90 flex-1">Call Emergency (911)</Button>
                        <Button variant="outline" className="flex-1">Find Nearest ER</Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Differential Diagnosis</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                       <div className="p-4 rounded-xl border flex justify-between items-center bg-destructive/5 border-destructive/20">
                         <div>
                           <p className="font-bold text-destructive">Myocardial Infarction</p>
                           <p className="text-xs text-muted-foreground mt-1">Rule out first</p>
                         </div>
                         <div className="text-right">
                           <span className="text-2xl font-bold text-destructive">65%</span>
                           <p className="text-[10px] uppercase font-bold text-muted-foreground">Confidence</p>
                         </div>
                       </div>
                       <div className="p-4 rounded-xl border flex justify-between items-center bg-background">
                         <div>
                           <p className="font-bold">Gastroesophageal Reflux</p>
                         </div>
                         <div className="text-right">
                           <span className="text-2xl font-bold text-foreground">25%</span>
                           <p className="text-[10px] uppercase font-bold text-muted-foreground">Confidence</p>
                         </div>
                       </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="space-y-6">
                  <Card className="bg-primary text-primary-foreground border-none">
                    <CardContent className="p-6">
                      <h3 className="font-bold mb-2">Telehealth Available</h3>
                      <p className="text-sm text-primary-foreground/80 mb-4">A triage nurse is available right now for a video consult.</p>
                      <Button className="w-full bg-white text-primary hover:bg-white/90">Connect Now</Button>
                    </CardContent>
                  </Card>

                  <Button variant="outline" className="w-full" onClick={() => setStep(1)}>Start Over</Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
