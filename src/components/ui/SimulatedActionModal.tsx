import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './card';
import { Button } from './button';
import { X, Loader2, CheckCircle2, Mic, Video, Calendar, UploadCloud } from 'lucide-react';
import { Input } from './input';

interface SimulatedActionModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  type?: 'ai-process' | 'form' | 'video-call' | 'schedule' | 'upload';
  fields?: { name: string; label: string; type?: string; placeholder?: string }[];
  actionLabel?: string;
  onActionComplete?: () => void;
}

export function SimulatedActionModal({
  isOpen,
  onClose,
  title,
  description,
  type = 'ai-process',
  fields = [],
  actionLabel = 'Submit',
  onActionComplete
}: SimulatedActionModalProps) {
  const [status, setStatus] = useState<'idle' | 'processing' | 'success'>('idle');

  // Reset status when opened
  useEffect(() => {
    if (isOpen) setStatus('idle');
  }, [isOpen]);

  if (!isOpen) return null;

  const handleAction = () => {
    setStatus('processing');
    setTimeout(() => {
      setStatus('success');
      if (onActionComplete) onActionComplete();
      setTimeout(() => {
        onClose();
      }, 2000);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
      <Card className="w-full max-w-md shadow-2xl border-primary/30 animate-in zoom-in-95 duration-200">
        <CardHeader className="border-b bg-muted/20 flex flex-row items-center justify-between">
          <div>
            <CardTitle>{title}</CardTitle>
            {description && <CardDescription>{description}</CardDescription>}
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} disabled={status === 'processing'}>
            <X className="w-5 h-5" />
          </Button>
        </CardHeader>
        
        <CardContent className="pt-6">
          {status === 'success' ? (
            <div className="py-8 flex flex-col items-center justify-center text-center animate-in fade-in zoom-in-95 duration-300">
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center mb-4">
                <CheckCircle2 className="w-8 h-8 text-emerald-500" />
              </div>
              <h3 className="text-xl font-bold mb-1">Action Complete</h3>
              <p className="text-muted-foreground">The workflow has been successfully processed.</p>
            </div>
          ) : (
            <div className="space-y-6">
              
              {/* Type: AI Process (e.g. Scribe) */}
              {type === 'ai-process' && (
                <div className="py-8 flex flex-col items-center justify-center text-center border-2 border-dashed rounded-xl bg-muted/10">
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 transition-all duration-500 ${
                    status === 'processing' ? 'bg-primary/20 scale-110 shadow-[0_0_30px_rgba(var(--primary),0.3)]' : 'bg-primary/10'
                  }`}>
                    {status === 'processing' ? (
                      <Loader2 className="w-8 h-8 text-primary animate-spin" />
                    ) : (
                      <Mic className="w-8 h-8 text-primary" />
                    )}
                  </div>
                  {status === 'processing' ? (
                    <p className="font-semibold text-primary animate-pulse">etoh AI is listening & processing...</p>
                  ) : (
                    <p className="font-medium">Ready to start AI Scribe</p>
                  )}
                </div>
              )}

              {/* Type: Video Call */}
              {type === 'video-call' && (
                <div className="aspect-video bg-black rounded-xl border relative overflow-hidden flex items-center justify-center">
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80 z-10" />
                  <Video className="w-16 h-16 text-white/20 absolute" />
                  {status === 'processing' && (
                    <div className="absolute inset-0 z-20 bg-black/60 flex flex-col items-center justify-center text-white">
                      <Loader2 className="w-8 h-8 animate-spin mb-2" />
                      <p>Establishing Secure Connection...</p>
                    </div>
                  )}
                  <div className="absolute bottom-4 left-4 right-4 z-20 flex justify-between items-center text-white">
                    <p className="font-semibold text-sm">Secure Telehealth Channel</p>
                  </div>
                </div>
              )}

              {/* Type: Form */}
              {(type === 'form' || type === 'schedule') && (
                <div className="space-y-4">
                  {type === 'schedule' && (
                    <div className="p-4 bg-primary/10 rounded-xl flex items-center gap-4 mb-4">
                      <Calendar className="w-8 h-8 text-primary" />
                      <div>
                        <h4 className="font-semibold">Scheduling Matrix</h4>
                        <p className="text-xs text-muted-foreground">Find next available slot</p>
                      </div>
                    </div>
                  )}
                  {fields.map((field, i) => (
                    <div key={i} className="space-y-2">
                      <label className="text-sm font-medium">{field.label}</label>
                      <Input type={field.type || 'text'} placeholder={field.placeholder} />
                    </div>
                  ))}
                  {fields.length === 0 && (
                    <div className="space-y-4">
                       <div className="space-y-2">
                          <label className="text-sm font-medium">Date & Time</label>
                          <Input type="datetime-local" />
                       </div>
                       <div className="space-y-2">
                          <label className="text-sm font-medium">Notes</label>
                          <Input placeholder="Additional details..." />
                       </div>
                    </div>
                  )}
                </div>
              )}

              {/* Type: Upload */}
              {type === 'upload' && (
                <div className="border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center text-center">
                  <UploadCloud className="w-12 h-12 text-muted-foreground mb-4" />
                  <h4 className="font-semibold mb-1">Upload Document</h4>
                  <p className="text-sm text-muted-foreground mb-4">Drag and drop or click to select</p>
                  <Button variant="secondary" disabled={status === 'processing'}>Select File</Button>
                </div>
              )}

              <div className="border-t pt-4 flex justify-end gap-2">
                <Button variant="outline" onClick={onClose} disabled={status === 'processing'}>
                  Cancel
                </Button>
                <Button 
                  className="bg-primary hover:bg-primary/90 min-w-[120px]" 
                  onClick={handleAction}
                  disabled={status === 'processing'}
                >
                  {status === 'processing' ? <Loader2 className="w-4 h-4 animate-spin" /> : actionLabel}
                </Button>
              </div>

            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
