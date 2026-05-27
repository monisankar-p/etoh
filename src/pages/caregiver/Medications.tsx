import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card';
import { Pill, AlertTriangle, Clock, Activity, CheckCircle2, ArrowRight, BrainCircuit, ShieldAlert, Send } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { toast } from 'sonner';
import { useState } from 'react';
import { Dialog } from '../../components/ui/dialog';
import { Input } from '../../components/ui/input';

export default function Medications() {
  const [showMissedDose, setShowMissedDose] = useState(true);
  const [showWarning, setShowWarning] = useState(true);
  const [refillRequested, setRefillRequested] = useState(false);
  const [isTimelineOpen, setIsTimelineOpen] = useState(false);
  const [isAdjustScheduleOpen, setIsAdjustScheduleOpen] = useState(false);
  const [isMessageDraftOpen, setIsMessageDraftOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<any>(null);

  const [patients, setPatients] = useState([
    {
      id: 1,
      name: 'Arthur Mercer',
      age: 78,
      condition: 'Chronic Heart Failure',
      adherence: 85,
      medCount: 3,
      timeline: [
        { time: '08:00 AM', med: 'Metoprolol 50mg', status: 'done' },
        { time: '08:00 AM', med: 'Lisinopril 10mg', status: 'missed' },
        { time: '02:00 PM', med: 'Furosemide 20mg', status: 'upcoming' },
        { time: '08:00 PM', med: 'Metoprolol 50mg', status: 'upcoming' }
      ]
    },
    {
      id: 2,
      name: 'Martha Mercer',
      age: 75,
      condition: 'Type 2 Diabetes',
      adherence: 96,
      medCount: 2,
      timeline: [
        { time: '07:30 AM', med: 'Metformin 500mg', status: 'done' },
        { time: '12:00 PM', med: 'Glipizide 5mg', status: 'done' },
        { time: '07:30 PM', med: 'Metformin 500mg', status: 'upcoming' }
      ]
    }
  ]);

  return (
    <div className="p-4 md:p-8 h-full flex flex-col bg-muted/10 overflow-y-auto">
      <div className="mb-8 max-w-5xl mx-auto w-full">
        <h1 className="text-3xl font-bold flex items-center gap-3 mb-2">
          <Pill className="w-8 h-8 text-violet-500" />
          Medication Management
        </h1>
        <p className="text-muted-foreground">Monitor adherence, refill requests, and active prescriptions.</p>
      </div>

      <div className="max-w-5xl mx-auto w-full grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2 shadow-sm border-violet-500/20">
          <CardHeader className="bg-violet-500/5 pb-4">
            <CardTitle className="flex items-center gap-2 text-violet-700">
              <BrainCircuit className="w-5 h-5" /> 
              AI Medication Safety Scanner
            </CardTitle>
            <CardDescription>Real-time interaction analysis and safety recommendations.</CardDescription>
          </CardHeader>
          <CardContent className="pt-6 space-y-4">
            {/* Warning 1 */}
            {showWarning && (
              <div className="flex gap-4 p-4 rounded-xl border border-amber-500/20 bg-amber-500/5 items-start animate-in fade-in">
                <div className="mt-0.5"><AlertTriangle className="w-5 h-5 text-amber-500" /></div>
                <div>
                  <h4 className="font-bold text-amber-700">Moderate Interaction Detected (Arthur)</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    <span className="font-semibold text-foreground">Metoprolol 50mg</span> + <span className="font-semibold text-foreground">Furosemide 20mg</span>
                  </p>
                  <p className="text-sm mt-2">Combined use may increase risk of excessive blood pressure drop. AI recommends staggering administration by at least 2 hours.</p>
                  <div className="mt-3 flex gap-2">
                    <Button size="sm" variant="outline" className="text-xs border-amber-500/30 text-amber-700 bg-amber-500/10 hover:bg-amber-500/20" onClick={() => setShowWarning(false)}>Acknowledge</Button>
                    <Button size="sm" className="text-xs bg-amber-500 hover:bg-amber-600 text-white" onClick={() => setIsAdjustScheduleOpen(true)}>Adjust Schedule</Button>
                  </div>
                </div>
              </div>
            )}

            {/* Optimization 1 */}
            <div className="flex gap-4 p-4 rounded-xl border border-emerald-500/20 bg-emerald-500/5 items-start">
              <div className="mt-0.5"><ShieldAlert className="w-5 h-5 text-emerald-500" /></div>
              <div>
                <h4 className="font-bold text-emerald-700">Prescription Optimization (Martha)</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  <span className="font-semibold text-foreground">Glipizide 5mg</span>
                </p>
                <p className="text-sm mt-2">Martha's glucose has stabilized beautifully. Based on recent 7-day lab trends, consult Dr. Davis about potentially stepping down Glipizide dosage to prevent hypoglycemia.</p>
                <div className="mt-3">
                  <Button size="sm" className="text-xs bg-emerald-500 hover:bg-emerald-600 text-white" onClick={() => setIsMessageDraftOpen(true)}>Draft Message to Physician</Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="shadow-sm border-rose-500/30">
            <CardHeader className="bg-rose-500/5 pb-4">
              <CardTitle className="text-rose-500 flex items-center gap-2 text-base"><AlertTriangle className="w-4 h-4"/> Critical Alerts</CardTitle>
            </CardHeader>
            <CardContent className="pt-4 space-y-3">
              {showMissedDose ? (
                <div className="p-3 border border-rose-500/20 rounded-xl bg-background animate-in fade-in">
                  <p className="text-sm font-bold text-rose-500 mb-1">Missed: Metoprolol 50mg</p>
                  <p className="text-xs text-muted-foreground mb-3">Arthur Mercer • Due 2 hours ago</p>
                  <Button size="sm" className="w-full bg-rose-500 hover:bg-rose-600 text-white" onClick={() => {
                    setShowMissedDose(false);
                    toast.success('Marked administered');
                  }}>Acknowledge Late</Button>
                </div>
              ) : (
                <div className="text-center p-4 opacity-50 text-sm">No critical alerts.</div>
              )}
            </CardContent>
          </Card>
          
          <Card className="shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-base flex items-center gap-2"><Clock className="w-4 h-4 text-violet-500"/> Refills Due Soon</CardTitle>
            </CardHeader>
            <CardContent className="pt-4 space-y-3">
              <div className={`flex justify-between items-center p-3 border rounded-xl ${refillRequested ? 'bg-emerald-500/5 border-emerald-500/20' : 'hover:border-violet-500/30'}`}>
                 <div>
                   <p className="text-sm font-bold">Lisinopril 10mg</p>
                   <p className="text-xs text-muted-foreground mt-0.5">3 days supply left</p>
                 </div>
                 {refillRequested ? (
                   <span className="text-xs font-bold text-emerald-600 bg-emerald-500/10 px-2 py-1 rounded">Requested</span>
                 ) : (
                   <Button size="sm" variant="outline" className="text-xs" onClick={() => {
                     setRefillRequested(true);
                     toast.success('Refill request sent to pharmacy.');
                   }}>Request</Button>
                 )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Patient Profiles Section */}
      <div className="max-w-5xl mx-auto w-full mt-6 mb-8">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2"><Activity className="w-5 h-5 text-violet-500"/> Dependent Medication Profiles</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {patients.map(patient => (
            <Card key={patient.id} className="hover:border-violet-500/50 transition-colors shadow-sm">
              <CardContent className="p-5">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-violet-500/10 flex items-center justify-center font-bold text-violet-600 text-lg border border-violet-500/20">
                      {patient.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">{patient.name}</h3>
                      <p className="text-sm text-muted-foreground">{patient.condition}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider">Adherence</p>
                    <p className={`font-bold text-xl ${patient.adherence < 90 ? 'text-rose-500' : 'text-emerald-500'}`}>{patient.adherence}%</p>
                  </div>
                </div>
                <div className="bg-muted/30 p-3 rounded-xl flex justify-between items-center mb-4 border">
                  <span className="text-sm font-medium"><Pill className="w-4 h-4 inline mr-1 text-violet-500"/> {patient.medCount} Active Prescriptions</span>
                </div>
                <Button className="w-full bg-violet-50 hover:bg-violet-100 text-violet-700 border border-violet-500/20 shadow-sm" onClick={() => {
                  setSelectedPatient(patient);
                  setIsTimelineOpen(true);
                }}>
                  View Daily Timeline <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Dialog isOpen={isTimelineOpen} onClose={() => setIsTimelineOpen(false)} title={`${selectedPatient?.name}'s Daily Timeline`} description="Today's medication schedule and completion status.">
        {selectedPatient && (
          <div className="py-4">
            <div className="relative border-l-2 border-muted ml-4 space-y-8">
              {selectedPatient.timeline.map((item: any, idx: number) => (
                <div key={idx} className="relative pl-6">
                  {/* Timeline Dot */}
                  <div className={`absolute -left-[11px] top-1 w-5 h-5 rounded-full border-2 flex items-center justify-center bg-background
                    ${item.status === 'done' ? 'border-emerald-500' : item.status === 'missed' ? 'border-rose-500' : 'border-muted-foreground/30'}
                  `}>
                    {item.status === 'done' && <CheckCircle2 className="w-3 h-3 text-emerald-500" />}
                    {item.status === 'missed' && <AlertTriangle className="w-3 h-3 text-rose-500" />}
                  </div>

                  {/* Content */}
                  <div className={`p-4 rounded-xl border shadow-sm ${item.status === 'done' ? 'bg-emerald-500/5 border-emerald-500/20' : item.status === 'missed' ? 'bg-rose-500/5 border-rose-500/20' : 'bg-card'}`}>
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-bold">{item.med}</p>
                        <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1"><Clock className="w-3 h-3"/> {item.time}</p>
                      </div>
                      <span className={`text-xs font-bold uppercase px-2 py-1 rounded ${
                        item.status === 'done' ? 'bg-emerald-500/10 text-emerald-600' :
                        item.status === 'missed' ? 'bg-rose-500/10 text-rose-600' :
                        'bg-muted text-muted-foreground'
                      }`}>
                        {item.status}
                      </span>
                    </div>
                    {item.status === 'upcoming' && (
                      <Button size="sm" className="w-full mt-3 bg-violet-500 hover:bg-violet-600 text-white" onClick={() => {
                        const newPatients = [...patients];
                        const patientIdx = newPatients.findIndex(p => p.id === selectedPatient.id);
                        newPatients[patientIdx].timeline[idx].status = 'done';
                        setPatients(newPatients);
                        setSelectedPatient({ ...newPatients[patientIdx] });
                        toast.success(`${item.med} marked as administered`);
                      }}>Mark as Administered</Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </Dialog>

      {/* Adjust Schedule Modal */}
      <Dialog isOpen={isAdjustScheduleOpen} onClose={() => setIsAdjustScheduleOpen(false)} title="Adjust Medication Schedule" description="AI recommends staggering these medications.">
        <div className="space-y-4 pt-4">
          <div className="p-4 border rounded-xl bg-amber-500/5 border-amber-500/20">
            <h4 className="font-bold text-sm">Metoprolol 50mg (Arthur)</h4>
            <p className="text-xs text-muted-foreground">Current: 08:00 AM</p>
            <Input className="mt-2" defaultValue="08:00" type="time" />
          </div>
          <div className="p-4 border rounded-xl bg-amber-500/5 border-amber-500/20">
            <h4 className="font-bold text-sm">Furosemide 20mg (Arthur)</h4>
            <p className="text-xs text-muted-foreground">Current: 08:00 AM <span className="text-rose-500 font-bold">(Conflict)</span></p>
            <Input className="mt-2 text-emerald-600 font-bold" defaultValue="10:00" type="time" />
            <p className="text-xs text-emerald-600 mt-1 font-medium">✨ AI Suggested Time</p>
          </div>
          <Button className="w-full bg-violet-500 hover:bg-violet-600 text-white" onClick={() => {
            setIsAdjustScheduleOpen(false);
            setShowWarning(false);
            toast.success("Schedule successfully updated!");
          }}>Save Schedule & Resolve Warning</Button>
        </div>
      </Dialog>

      {/* Draft Message Modal */}
      <Dialog isOpen={isMessageDraftOpen} onClose={() => setIsMessageDraftOpen(false)} title="Secure Message to Dr. Davis" description="Draft regarding Martha's Glipizide dosage.">
        <div className="space-y-4 pt-4">
          <div className="p-3 bg-muted/30 border rounded-lg text-sm">
            <p className="text-muted-foreground mb-2">To: <span className="font-bold text-foreground">Dr. M. Davis (Endocrinology)</span></p>
            <p className="text-muted-foreground">Subject: <span className="font-bold text-foreground">Martha Mercer - Glipizide Step Down Inquiry</span></p>
          </div>
          <textarea 
            className="w-full h-32 p-3 text-sm border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-violet-500/50"
            defaultValue={"Hello Dr. Davis,\n\nMartha's continuous glucose monitor shows her levels have stabilized beautifully over the last 7 days. Our AI analytics flagged that we might want to consider stepping down her Glipizide 5mg dosage to prevent hypoglycemia.\n\nPlease advise if we should adjust her prescription.\n\nThank you!"}
          />
          <div className="flex gap-3">
            <Button variant="outline" className="flex-1" onClick={() => setIsMessageDraftOpen(false)}>Cancel</Button>
            <Button className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white" onClick={() => {
              setIsMessageDraftOpen(false);
              toast.success("Message securely sent to Dr. Davis.");
            }}>
              <Send className="w-4 h-4 mr-2" /> Send Message
            </Button>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
