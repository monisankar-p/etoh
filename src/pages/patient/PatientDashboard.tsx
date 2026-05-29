import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, Upload, Mic, Clock, Sparkles, AlertCircle, Activity } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { MockAIService } from '../../services/mockAIService';
import ReactMarkdown from 'react-markdown';
import { useTranslation } from '../../i18n';

interface ChatMessage {
  id: string;
  role: 'user' | 'ai';
  content: string;
  citations?: string[];
}

export default function PatientDashboard() {
  const { t } = useTranslation();

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      role: 'ai',
      content: t('dashboard.greeting'),
    }
  ]);
  const [input, setInput] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isStreaming]);

  const handleSend = async () => {
    if (!input.trim() || isStreaming) return;
    
    const newMsg: ChatMessage = { id: Date.now().toString(), role: 'user', content: input };
    setMessages(prev => [...prev, newMsg]);
    setInput('');
    setIsStreaming(true);

    const aiMsgId = (Date.now() + 1).toString();
    setMessages(prev => [...prev, { id: aiMsgId, role: 'ai', content: '' }]);

    try {
      const stream = MockAIService.streamResponse(newMsg.content, 20);
      for await (const chunk of stream) {
        setMessages(prev => 
          prev.map(msg => msg.id === aiMsgId ? { ...msg, content: msg.content + chunk } : msg)
        );
      }
    } finally {
      setIsStreaming(false);
    }
  };

  return (
    <div className="flex h-full w-full">
      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col h-full bg-background border-r">
        <div className="p-6 border-b flex items-center justify-between bg-card/30 backdrop-blur-sm z-10">
          <div>
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              {t('dashboard.title')}
            </h2>
            <p className="text-sm text-muted-foreground">{t('dashboard.subtitle')}</p>
          </div>
          <Button variant="outline" size="sm" className="gap-2">
            <Upload className="w-4 h-4" /> {t('dashboard.uploadReport')}
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className="flex max-w-[80%] gap-4">
                {msg.role === 'ai' && (
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0 border border-primary/20">
                    <Sparkles className="w-5 h-5 text-primary" />
                  </div>
                )}
                
                <div className={`p-5 rounded-2xl ${
                  msg.role === 'user' 
                    ? 'bg-primary text-primary-foreground rounded-tr-sm' 
                    : 'bg-card border shadow-sm rounded-tl-sm'
                }`}>
                  <div className={`prose max-w-none ${msg.role === 'user' ? 'text-primary-foreground' : 'dark:prose-invert'}`}>
                    <ReactMarkdown>
                      {msg.content}
                    </ReactMarkdown>
                  </div>
                </div>

                {msg.role === 'user' && (
                  <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center shrink-0 font-bold border">
                    A
                  </div>
                )}
              </div>
            </motion.div>
          ))}
          {isStreaming && (
            <div className="flex justify-start gap-4">
               <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0 border border-primary/20">
                  <Sparkles className="w-5 h-5 text-primary animate-pulse" />
                </div>
                <div className="bg-card border shadow-sm rounded-2xl rounded-tl-sm p-5 flex items-center gap-2 h-[60px]">
                  <motion.div className="w-2 h-2 bg-primary rounded-full" animate={{ y: [0, -6, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0 }} />
                  <motion.div className="w-2 h-2 bg-primary rounded-full" animate={{ y: [0, -6, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }} />
                  <motion.div className="w-2 h-2 bg-primary rounded-full" animate={{ y: [0, -6, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }} />
                </div>
            </div>
          )}
          <div ref={messagesEndRef} className="h-4" />
        </div>

        <div className="p-4 bg-background border-t">
          <div className="max-w-4xl mx-auto flex gap-2 mb-2">
            <Button variant="outline" size="sm" className="text-xs rounded-full h-8" onClick={() => setInput(t('dashboard.askBloodReport'))}>
              {t('dashboard.interpretReport')}
            </Button>
            <Button variant="outline" size="sm" className="text-xs rounded-full h-8" onClick={() => setInput(t('dashboard.headacheFatigue'))}>
              {t('dashboard.logSymptom')}
            </Button>
          </div>
          <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="max-w-4xl mx-auto relative flex items-center">
            <Button type="button" variant="ghost" size="icon" className="absolute left-2 text-muted-foreground hover:text-foreground">
              <Mic className="w-5 h-5" />
            </Button>
            <Input 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={isStreaming}
              placeholder={t('dashboard.placeholder')}
              className="pl-12 pr-14 py-6 rounded-2xl bg-muted/50 border-transparent focus-visible:ring-primary/50 text-base"
            />
            <Button 
              type="submit" 
              size="icon" 
              disabled={!input.trim() || isStreaming}
              className="absolute right-2 rounded-full w-10 h-10 bg-primary hover:bg-primary/90"
            >
              <Send className="w-4 h-4 text-primary-foreground" />
            </Button>
          </form>
        </div>
      </div>

      {/* Right Contextual Health Insights */}
      <div className="w-80 bg-card/30 hidden lg:flex flex-col p-6 space-y-6 overflow-y-auto">
        <div>
          <h3 className="font-semibold text-lg flex items-center gap-2 mb-4">
            <Activity className="w-5 h-5 text-primary" /> {t('dashboard.activeContext')}
          </h3>
          <Card className="bg-background">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">{t('dashboard.currentVitals')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-muted-foreground">{t('dashboard.heartRate')}</span>
                  <span className="font-semibold text-emerald-500">72 bpm</span>
                </div>
                <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 w-[60%]" />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-muted-foreground">{t('dashboard.bloodPressure')}</span>
                  <span className="font-semibold">118/78</span>
                </div>
                <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-primary w-[50%]" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <h3 className="font-semibold text-lg flex items-center gap-2 mb-4">
            <AlertCircle className="w-5 h-5 text-amber-500" /> {t('dashboard.reminders')}
          </h3>
          <div className="space-y-3">
            <div className="p-3 rounded-lg border bg-amber-500/10 border-amber-500/20 text-sm">
              <p className="font-semibold text-amber-600 dark:text-amber-400">{t('dashboard.takeMetoprolol')}</p>
              <p className="text-muted-foreground text-xs mt-1">{t('dashboard.dueInHours')}</p>
            </div>
            <div className="p-3 rounded-lg border bg-background text-sm">
              <p className="font-semibold">{t('dashboard.uploadCBC')}</p>
              <p className="text-muted-foreground text-xs mt-1">{t('dashboard.drChenRequested')}</p>
            </div>
          </div>
        </div>

        <div>
           <h3 className="font-semibold text-lg flex items-center gap-2 mb-4">
            <Clock className="w-5 h-5 text-primary" /> {t('dashboard.memorySnapshot')}
          </h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            {t('dashboard.memoryText')}
          </p>
        </div>
      </div>
    </div>
  );
}
