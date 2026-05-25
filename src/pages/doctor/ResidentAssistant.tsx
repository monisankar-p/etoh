import { useState, useRef, useEffect } from 'react';
import { FileText, Search, Filter, Mic, Bot, Stethoscope, AlertCircle, PlayCircle, StopCircle, Clock, Sparkles } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import { toast } from 'sonner';

const opdQueue = [
  { id: 'OPD-101', name: 'Alex Johnson', age: 45, reason: 'Follow-up: Hypertension', status: 'Waiting', time: '09:00 AM' },
  { id: 'OPD-102', name: 'Maria Garcia', age: 32, reason: 'Severe Migraine', status: 'Consulting', time: '09:15 AM' },
  { id: 'OPD-103', name: 'Robert Chen', age: 28, reason: 'Sports Injury (Knee)', status: 'Waiting', time: '09:30 AM' },
  { id: 'OPD-104', name: 'Sarah Smith', age: 55, reason: 'Routine Checkup', status: 'Waiting', time: '09:45 AM' },
  { id: 'OPD-105', name: 'Emily Davis', age: 41, reason: 'Refill: Asthma Inhaler', status: 'Waiting', time: '10:00 AM' },
];

export default function ResidentAssistant() {
  const [activePatient, setActivePatient] = useState(opdQueue[1]);
  const [isRecording, setIsRecording] = useState(false);
  const [consultNotes, setConsultNotes] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll logic for notes
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [consultNotes]);

  const toggleRecording = () => {
    if (!isRecording) {
      toast.info('Listening...', { description: 'etoh AI Scribe is active.' });
      setIsRecording(true);
      // Simulate real-time transcription
      setTimeout(() => setConsultNotes(prev => prev + 'Patient presents with severe throbbing headache '), 1500);
      setTimeout(() => setConsultNotes(prev => prev + 'started 2 days ago. '), 3000);
      setTimeout(() => setConsultNotes(prev => prev + 'Reports photophobia and nausea. '), 4500);
    } else {
      setIsRecording(false);
      toast.success('Transcription saved.', { description: 'Ready for review.' });
    }
  };

  return (
    <div className="flex h-full w-full bg-muted/10">
      {/* Left: Rapid OPD Queue */}
      <div className="w-1/3 flex flex-col h-full bg-background border-r shrink-0">
        <div className="p-6 border-b flex flex-col gap-4 bg-card/30 backdrop-blur-sm z-10 shrink-0">
          <div>
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-emerald-500" />
              AI Resident Assistant
            </h2>
            <p className="text-sm text-muted-foreground mt-1">Select patient to begin AI-assisted consult.</p>
          </div>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search queue..." className="pl-9 bg-muted/50" />
            </div>
            <Button variant="outline" size="icon"><Filter className="w-4 h-4" /></Button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {opdQueue.map(patient => (
            <div
              key={patient.id}
              onClick={() => setActivePatient(patient)}
              className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col gap-2 ${activePatient.id === patient.id ? 'bg-emerald-500/10 border-emerald-500 ring-1 ring-emerald-500' : 'bg-background hover:bg-accent'}`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-foreground">{patient.name}</h3>
                  <p className="text-xs text-muted-foreground">{patient.age} yrs • {patient.id}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold font-mono text-muted-foreground">{patient.time}</p>
                  {patient.status === 'Consulting' && <span className="inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500 text-white uppercase animate-pulse">Active</span>}
                  {patient.status === 'Waiting' && <span className="inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/10 text-amber-600 uppercase">Waiting</span>}
                </div>
              </div>
              <div className="p-2 bg-muted/50 rounded-lg text-sm text-muted-foreground line-clamp-1 border">
                <strong>Reason:</strong> {patient.reason}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right: Active Consultation Workflow */}
      <div className="flex-1 flex flex-col h-full relative overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b bg-background sticky top-0 z-10 flex justify-between items-center shrink-0 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center">
              <Stethoscope className="w-6 h-6 text-emerald-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">{activePatient.name}</h2>
              <p className="text-sm text-muted-foreground">
                {activePatient.age} yrs • Consultation Active
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="text-destructive border-destructive hover:bg-destructive hover:text-white">End Consult</Button>
            <Button className="bg-emerald-500 hover:bg-emerald-600" onClick={() => toast.success('Prescription template generated.')}>Sign & E-Prescribe</Button>
          </div>
        </div>

        <div className="flex-1 flex overflow-hidden">
          {/* Main Console: AI Scribe & Notes */}
          <div className="flex-1 flex flex-col p-6 overflow-hidden">
            <Card className="flex-1 flex flex-col border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.05)]">
              <CardHeader className="bg-emerald-500/5 border-b pb-4 shrink-0 flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2 text-emerald-600">
                    <Mic className={`w-5 h-5 ${isRecording ? 'animate-pulse text-destructive' : ''}`} />
                    Live Dictation & Notes
                  </CardTitle>
                  <CardDescription>etoh AI is listening and structuring your notes automatically.</CardDescription>
                </div>
                <Button
                  size="icon"
                  variant={isRecording ? 'destructive' : 'default'}
                  className={isRecording ? '' : 'bg-emerald-500 hover:bg-emerald-600'}
                  onClick={toggleRecording}
                >
                  {isRecording ? <StopCircle className="w-5 h-5" /> : <PlayCircle className="w-5 h-5" />}
                </Button>
              </CardHeader>
              <CardContent className="flex-1 p-0 flex flex-col relative overflow-hidden">
                <textarea
                  className="flex-1 w-full p-6 resize-none focus:outline-none bg-transparent text-lg leading-relaxed placeholder:text-muted-foreground/50"
                  placeholder="Start speaking or type clinical notes here..."
                  value={consultNotes}
                  onChange={(e) => setConsultNotes(e.target.value)}
                />
                <div ref={chatEndRef} />
              </CardContent>
              <div className="p-4 bg-muted/30 border-t flex items-center justify-between">
                <p className="text-xs text-muted-foreground flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" /> Ensure all critical findings are verbalized clearly.
                </p>
                <Button size="sm" variant="outline" className="gap-2">
                  <FileText className="w-4 h-4" /> Structure Note
                </Button>
              </div>
            </Card>
          </div>

          {/* Right Sidebar: Resident Assistant */}
          <div className="w-80 border-l bg-muted/20 flex flex-col shrink-0 overflow-y-auto">
            <div className="p-4 border-b bg-primary/5 sticky top-0 backdrop-blur-md z-10 flex items-center gap-2">
              <Bot className="w-5 h-5 text-primary" />
              <h3 className="font-bold text-primary">AI Resident</h3>
            </div>

            <div className="p-4 space-y-6">
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-muted-foreground uppercase flex items-center gap-2"><Clock className="w-4 h-4" /> Medical History</h4>
                <div className="p-3 bg-background rounded-lg border text-sm shadow-sm hover:border-primary/50 transition-colors cursor-pointer">
                  <p className="font-semibold text-primary mb-1">Previous Migraine Mgmt</p>
                  <p className="text-muted-foreground">Patient was prescribed Sumatriptan 50mg on Oct 12, 2022. Reported partial relief.</p>
                </div>
                <div className="p-3 bg-background rounded-lg border text-sm shadow-sm hover:border-primary/50 transition-colors cursor-pointer">
                  <p className="font-semibold text-primary mb-1">Allergies</p>
                  <p className="text-destructive font-medium">Penicillin (Hives)</p>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="text-xs font-bold text-muted-foreground uppercase">AI Differential Diagnosis</h4>
                <div className="p-4 bg-primary text-primary-foreground rounded-lg shadow-md space-y-2">
                  <div className="flex justify-between items-center border-b border-primary-foreground/20 pb-2">
                    <span className="font-bold">Migraine with Aura</span>
                    <span className="text-xs bg-white/20 px-2 py-0.5 rounded">92% Match</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-primary-foreground/20 pb-2">
                    <span className="font-bold">Tension Headache</span>
                    <span className="text-xs bg-white/20 px-2 py-0.5 rounded">45% Match</span>
                  </div>
                  <Button variant="secondary" size="sm" className="w-full mt-2 text-xs h-7">Review Protocols</Button>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="text-xs font-bold text-muted-foreground uppercase">Suggested Actions</h4>
                <Button variant="outline" className="w-full justify-start text-sm h-9">Order MRI Brain W/O Contrast</Button>
                <Button variant="outline" className="w-full justify-start text-sm h-9">Prescribe Rizatriptan 10mg ODT</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
