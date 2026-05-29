import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card';
import { HeartHandshake, AlertTriangle, Activity, Pill, Calendar, Users, PhoneCall, Stethoscope, ArrowRight, BrainCircuit, MapPin, CheckCircle2, Clock, FileText, Video, Droplets } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Dialog } from '../../components/ui/dialog';
import { toast } from 'sonner';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

export default function CaregiverDashboard() {
  const [activeTab, setActiveTab] = useState<'overview' | 'operations' | 'homecare' | 'timeline'>('overview');
  const [showAlert, setShowAlert] = useState(true);
  const [showMissedDose, setShowMissedDose] = useState(true);
  const [tasks, setTasks] = useState([
    { task: 'Record Morning BP (Arthur)', time: '08:00 AM', status: 'completed' },
    { task: 'Administer Lisinopril (Martha)', time: '09:00 AM', status: 'completed' },
    { task: 'Physical Therapy Exercises (Arthur)', time: '02:00 PM', status: 'pending' },
    { task: 'Record Evening Glucose (Martha)', time: '08:00 PM', status: 'pending' }
  ]);

  const [selectedPatient, setSelectedPatient] = useState<any>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  const dependents = [
    {
      id: 1,
      name: 'Arthur Mercer',
      age: 78,
      condition: 'Chronic Heart Failure',
      lastVitals: '2 mins ago',
      adherence: 85,
      risk: 'High',
      doctor: 'Dr. Sarah Chen',
      nurse: 'Nurse Alex',
      allergies: ['Penicillin', 'Sulfa Drugs'],
      medications: ['Metoprolol 50mg', 'Lisinopril 10mg', 'Furosemide 20mg'],
      vitals: { hr: '135 bpm', hrStatus: 'high', bp: '145/90', spo2: '94%' },
      labs: 'Elevated BNP (450 pg/mL) on 05/20/2026'
    },
    {
      id: 2,
      name: 'Martha Mercer',
      age: 75,
      condition: 'Type 2 Diabetes',
      lastVitals: '1 hour ago',
      adherence: 92,
      risk: 'Medium',
      doctor: 'Dr. M. Davis',
      nurse: 'Unassigned',
      allergies: ['Latex'],
      medications: ['Metformin 500mg', 'Glipizide 5mg'],
      vitals: { hr: '72 bpm', hrStatus: 'normal', bp: '120/80', spo2: '98%' },
      labs: 'HbA1c 6.8% (Stable) on 04/15/2026'
    }
  ];

  const adherenceData = [
    { day: 'Mon', arthur: 90, martha: 95 },
    { day: 'Tue', arthur: 85, martha: 98 },
    { day: 'Wed', arthur: 88, martha: 92 },
    { day: 'Thu', arthur: 75, martha: 96 },
    { day: 'Fri', arthur: 82, martha: 95 },
    { day: 'Sat', arthur: 95, martha: 99 },
    { day: 'Sun', arthur: 91, martha: 97 }
  ];

  const deteriorationData = [
    { day: 'Day 1', risk: 20 }, { day: 'Day 2', risk: 22 }, { day: 'Day 3', risk: 25 },
    { day: 'Day 4', risk: 35 }, { day: 'Day 5', risk: 45 }, { day: 'Day 6', risk: 65 }, { day: 'Day 7', risk: 80 }
  ];

  const renderOverview = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {dependents.map(patient => (
          <Card key={patient.id} className="relative overflow-hidden hover:border-violet-500/50 transition-all">
            <div className={`absolute top-0 right-0 p-4 ${patient.risk === 'High' ? 'text-rose-500' : 'text-amber-500'}`}>
              <Activity className="w-8 h-8 opacity-20" />
            </div>
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-bold text-xl">{patient.name}</h3>
                  <p className="text-sm text-muted-foreground">{patient.age} yrs • {patient.condition}</p>
                </div>
                <div className={`px-2 py-1 rounded text-xs font-bold uppercase ${patient.risk === 'High' ? 'bg-rose-500/10 text-rose-500' : 'bg-amber-500/10 text-amber-500'}`}>
                  {patient.risk} Risk
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="p-3 bg-muted/50 rounded-xl">
                  <p className="text-xs text-muted-foreground mb-1">Medication Adherence</p>
                  <p className="font-bold text-lg text-emerald-500">{patient.adherence}%</p>
                </div>
                <div className="p-3 bg-muted/50 rounded-xl">
                  <p className="text-xs text-muted-foreground mb-1">Last Vitals</p>
                  <p className="font-bold text-lg">{patient.lastVitals}</p>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t flex items-center justify-between">
                <div className="flex gap-4">
                  <div className="flex items-center gap-1 text-sm text-muted-foreground"><Stethoscope className="w-4 h-4" /> {patient.doctor}</div>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground"><Users className="w-4 h-4" /> {patient.nurse}</div>
                </div>
                <Button size="sm" variant="outline" className="gap-2" onClick={() => {
                  setSelectedPatient(patient);
                  setIsDetailsModalOpen(true);
                }}><ArrowRight className="w-4 h-4" /> View Details</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-violet-500/20 shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><BrainCircuit className="w-5 h-5 text-violet-500" /> AI Deterioration Intelligence</CardTitle>
          <CardDescription>Predictive trajectory for Arthur Mercer (CHF Exacerbation Risk).</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={deteriorationData} margin={{ top: 5, right: 0, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRiskFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorRiskStroke" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--muted-foreground)/0.2)" />
                <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: 'hsl(var(--background))', color: 'hsl(var(--foreground))', borderRadius: '8px', border: '1px solid hsl(var(--border))', boxShadow: '0 4px 6px -1px hsl(var(--foreground)/0.1)' }}
                  itemStyle={{ fontWeight: 'bold', color: 'hsl(var(--foreground))' }}
                  labelStyle={{ color: 'hsl(var(--muted-foreground))' }}
                />
                <Area type="monotone" dataKey="risk" stroke="url(#colorRiskStroke)" strokeWidth={4} fillOpacity={1} fill="url(#colorRiskFill)" activeDot={{ r: 7, fill: "hsl(var(--pink-500))", stroke: "hsl(var(--background))", strokeWidth: 2 }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderOperations = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Users className="w-5 h-5 text-violet-500" /> Nurse Coordination</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 border rounded-xl bg-background hover:border-violet-500/50 transition-colors">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold text-sm">Nurse Alex (Home Care)</h3>
                <p className="text-xs text-muted-foreground mt-1">Scheduled for Arthur Mercer</p>
              </div>
              <span className="bg-emerald-500/10 text-emerald-500 text-[10px] font-bold px-2 py-0.5 rounded uppercase flex items-center gap-1"><MapPin className="w-3 h-3" /> En Route</span>
            </div>
            <div className="mt-3 flex gap-2">
              <Button size="sm" variant="outline" className="w-full text-xs" onClick={() => toast.info('Opening secure chat...')}>Message</Button>
              <Button size="sm" className="w-full bg-violet-500 hover:bg-violet-600 text-xs text-white">Live Tracking</Button>
            </div>
          </div>
          <Button variant="outline" className="w-full border-dashed text-muted-foreground" onClick={() => toast.success('Immediate nurse visit requested!')}>Request Immediate Nurse Visit</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Calendar className="w-5 h-5 text-violet-500" /> Appointment Management</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-3 border rounded-xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center"><Video className="w-5 h-5 text-blue-500" /></div>
              <div>
                <h3 className="font-bold text-sm">Telecardiology (Arthur)</h3>
                <p className="text-xs text-muted-foreground">Today, 2:30 PM • Dr. Sarah Chen</p>
              </div>
            </div>
            <Button size="sm" className="bg-blue-500 hover:bg-blue-600" onClick={() => toast.success('Connecting to waiting room...')}>Join Call</Button>
          </div>
          <div className="p-3 border rounded-xl flex items-center justify-between opacity-70">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center"><Stethoscope className="w-5 h-5 text-muted-foreground" /></div>
              <div>
                <h3 className="font-bold text-sm">Endocrinology (Martha)</h3>
                <p className="text-xs text-muted-foreground">Thursday, 10:00 AM</p>
              </div>
            </div>
            <Button size="sm" variant="outline" onClick={() => toast.info('Opening appointment manager...')}>Manage</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderHomeCare = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Pill className="w-5 h-5 text-violet-500" /> Medication Adherence</CardTitle>
          <CardDescription>7-day compliance average: 86.5%</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[200px] w-full mb-6">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={adherenceData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorArthur" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorMartha" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#008f53ff" stopOpacity={0.5} />
                    <stop offset="95%" stopColor="#008839ff" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--muted-foreground)/0.2)" />
                <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} domain={[60, 100]} />
                <Tooltip
                  contentStyle={{ backgroundColor: 'hsl(var(--background))', color: 'hsl(var(--foreground))', borderRadius: '8px', border: '1px solid hsl(var(--border))', boxShadow: '0 4px 6px -1px hsl(var(--foreground)/0.1)' }}
                  itemStyle={{ fontWeight: 'bold', color: 'hsl(var(--foreground))' }}
                  labelStyle={{ color: 'hsl(var(--muted-foreground))' }}
                />
                <Legend wrapperStyle={{ color: 'hsl(var(--foreground))' }} verticalAlign="top" height={36} iconType="circle" />
                <Area type="monotone" dataKey="martha" name="Martha Mercer" stroke="hsl(var(--rose-500))" strokeWidth={3} fillOpacity={1} fill="url(#colorMartha)" activeDot={{ r: 6 }} />
                <Area type="monotone" dataKey="arthur" name="Arthur Mercer" stroke="hsl(var(--indigo-500))" strokeWidth={3} fillOpacity={1} fill="url(#colorArthur)" activeDot={{ r: 6 }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-3">
            {showMissedDose && (
              <div className="p-3 bg-rose-500/10 border border-rose-500/20 rounded-xl flex justify-between items-center animate-in fade-in">
                <div className="flex items-center gap-3">
                  <AlertTriangle className="w-5 h-5 text-rose-500" />
                  <div>
                    <p className="text-sm font-bold text-rose-500">Missed Dose: Metoprolol 50mg</p>
                    <p className="text-xs text-rose-500/80">Arthur Mercer • Due 2 hours ago</p>
                  </div>
                </div>
                <Button size="sm" variant="destructive" onClick={() => {
                  setShowMissedDose(false);
                  toast.success('Marked as administered late');
                }}>Acknowledge</Button>
              </div>
            )}
            {!showMissedDose && (
              <div className="text-center p-4 opacity-50 text-sm">No missed doses.</div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-violet-500" /> Daily Care Tasks</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {tasks.map((item, idx) => (
            <div key={idx} className="flex items-center justify-between p-3 border rounded-xl">
              <div className="flex items-center gap-3">
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${item.status === 'completed' ? 'bg-emerald-500 border-emerald-500' : 'border-muted-foreground'}`}>
                  {item.status === 'completed' && <CheckCircle2 className="w-3 h-3 text-white" />}
                </div>
                <div>
                  <p className={`text-sm font-bold ${item.status === 'completed' ? 'line-through text-muted-foreground' : ''}`}>{item.task}</p>
                  <p className="text-xs text-muted-foreground">{item.time}</p>
                </div>
              </div>
              {item.status === 'pending' && (
                <Button
                  size="sm"
                  variant="outline"
                  className="text-xs"
                  onClick={() => {
                    const newTasks = [...tasks];
                    newTasks[idx].status = 'completed';
                    setTasks(newTasks);
                    toast.success('Task marked as done');
                  }}
                >
                  Mark Done
                </Button>
              )}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );

  const renderTimeline = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2"><Clock className="w-5 h-5 text-violet-500" /> Unified Family Timeline</CardTitle>
        <CardDescription>Chronological health events across all dependents.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative border-l-2 border-muted ml-3 space-y-6 pb-4">

          <div className="relative pl-6">
            <span className="absolute -left-2.5 top-1 w-5 h-5 rounded-full bg-rose-500 flex items-center justify-center ring-4 ring-background">
              <AlertTriangle className="w-3 h-3 text-white" />
            </span>
            <div className="bg-background border rounded-xl p-4 shadow-sm">
              <p className="text-xs text-muted-foreground mb-1">Today, 10:15 AM • Arthur Mercer</p>
              <h4 className="font-bold text-rose-500">AI Alert: Cardiac Anomaly Detected</h4>
              <p className="text-sm mt-1">Wearable detected sustained abnormal heart rate. Recommended immediate nurse visit.</p>
            </div>
          </div>

          <div className="relative pl-6">
            <span className="absolute -left-2.5 top-1 w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center ring-4 ring-background">
              <CheckCircle2 className="w-3 h-3 text-white" />
            </span>
            <div className="bg-background border rounded-xl p-4 shadow-sm opacity-80">
              <p className="text-xs text-muted-foreground mb-1">Yesterday, 4:00 PM • Martha Mercer</p>
              <h4 className="font-bold">Home Nurse Visit Completed</h4>
              <p className="text-sm mt-1">Nurse Alex administered wound care and checked vitals. All nominal.</p>
            </div>
          </div>

          <div className="relative pl-6">
            <span className="absolute -left-2.5 top-1 w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center ring-4 ring-background">
              <FileText className="w-3 h-3 text-white" />
            </span>
            <div className="bg-background border rounded-xl p-4 shadow-sm opacity-80">
              <p className="text-xs text-muted-foreground mb-1">Monday, 09:00 AM • Arthur Mercer</p>
              <h4 className="font-bold">Lab Results: Complete Blood Count</h4>
              <p className="text-sm mt-1">Uploaded by Dr. Sarah Chen. WBC slightly elevated.</p>
            </div>
          </div>

        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="p-4 md:p-8 h-full flex flex-col bg-muted/10 overflow-y-auto">

      {/* Top Persistent Emergency Alert */}
      {showAlert && (
        <div className="bg-rose-500/10 border border-rose-500/30 rounded-2xl p-4 mb-6 flex flex-col sm:flex-row items-center justify-between gap-4 animate-in fade-in slide-in-from-top-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-rose-500/20 flex items-center justify-center shrink-0">
              <AlertTriangle className="w-5 h-5 text-rose-500 animate-pulse" />
            </div>
            <div>
              <h3 className="font-bold text-rose-500">Emergency Alert: Abnormal Vitals Detected</h3>
              <p className="text-sm text-rose-500/80">Arthur Mercer's resting HR has spiked to 135 bpm. AI Deterioration Risk: Critical.</p>
            </div>
          </div>
          <Button className="bg-rose-500 hover:bg-rose-600 text-white shadow-lg shadow-rose-500/20 shrink-0" onClick={() => {
            setShowAlert(false);
            toast.error('Initiating Emergency Dispatch Protocol...');
          }}>
            <PhoneCall className="w-4 h-4 mr-2" /> Dispatch Response
          </Button>
        </div>
      )}

      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 max-w-7xl mx-auto w-full">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3 mb-2">
            <HeartHandshake className="w-8 h-8 text-violet-500" />
            Caregiver Control Center
          </h1>
          <p className="text-muted-foreground">Operational monitoring, emergency alerts, and family health intelligence.</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto w-full mb-6">
        <div className="flex overflow-x-auto pb-2 border-b gap-6 text-sm">
          <button
            className={`pb-2 font-medium transition-colors whitespace-nowrap ${activeTab === 'overview' ? 'border-b-2 border-violet-500 text-violet-500' : 'text-muted-foreground hover:text-foreground'}`}
            onClick={() => setActiveTab('overview')}
          >
            Family Overview & AI Insights
          </button>
          <button
            className={`pb-2 font-medium transition-colors whitespace-nowrap ${activeTab === 'operations' ? 'border-b-2 border-violet-500 text-violet-500' : 'text-muted-foreground hover:text-foreground'}`}
            onClick={() => setActiveTab('operations')}
          >
            Operations & Coordination
          </button>
          <button
            className={`pb-2 font-medium transition-colors whitespace-nowrap ${activeTab === 'homecare' ? 'border-b-2 border-violet-500 text-violet-500' : 'text-muted-foreground hover:text-foreground'}`}
            onClick={() => setActiveTab('homecare')}
          >
            Home-Care & Medications
          </button>
          <button
            className={`pb-2 font-medium transition-colors whitespace-nowrap ${activeTab === 'timeline' ? 'border-b-2 border-violet-500 text-violet-500' : 'text-muted-foreground hover:text-foreground'}`}
            onClick={() => setActiveTab('timeline')}
          >
            Unified Health Timeline
          </button>
        </div>
      </div>

      {/* Tab Content */}
      <div className="max-w-7xl mx-auto w-full">
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'operations' && renderOperations()}
        {activeTab === 'homecare' && renderHomeCare()}
        {activeTab === 'timeline' && renderTimeline()}
      </div>

      <Dialog isOpen={isDetailsModalOpen} onClose={() => setIsDetailsModalOpen(false)} title="Dependent Clinical Summary" description={selectedPatient ? `Comprehensive overview for ${selectedPatient.name}` : ''}>
        {selectedPatient && (
          <div className="space-y-6">
            {/* Header Profile Card */}
            <div className="relative overflow-hidden p-6 rounded-2xl border shadow-sm animate-in fade-in slide-in-from-bottom-2">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-violet-500 to-emerald-500" />
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-5">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-500 flex items-center justify-center font-bold text-white text-2xl shadow-lg shadow-violet-500/30">
                    {selectedPatient.name.split(' ').map((n: string) => n[0]).join('')}
                  </div>
                  <div>
                    <h3 className="font-extrabold text-2xl tracking-tight">{selectedPatient.name}</h3>
                    <p className="font-medium text-muted-foreground">{selectedPatient.age} years old • {selectedPatient.condition}</p>
                  </div>
                </div>
                <div className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider border ${selectedPatient.risk === 'High' ? 'bg-rose-500/10 text-rose-500 border-rose-500/20' : 'bg-amber-500/10 text-amber-500 border-amber-500/20'}`}>
                  {selectedPatient.risk} Risk Profile
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in slide-in-from-bottom-4 delay-75">
              <div className="bg-violet-500/5 p-5 rounded-2xl border border-violet-500/10 hover:border-violet-500/30 transition-colors">
                <p className="text-[11px] text-violet-600/80 uppercase font-bold tracking-wider mb-2">Primary Care Team</p>
                <div className="space-y-2">
                  <div className="flex items-center gap-3 bg-background p-3 rounded-xl border shadow-sm">
                    <div className="w-8 h-8 rounded-full bg-violet-500/10 flex items-center justify-center"><Stethoscope className="w-4 h-4 text-violet-600" /></div>
                    <div>
                      <p className="text-xs text-muted-foreground">Primary Physician</p>
                      <p className="text-sm font-bold">{selectedPatient.doctor}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 bg-background p-3 rounded-xl border shadow-sm">
                    <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center"><Users className="w-4 h-4 text-emerald-600" /></div>
                    <div>
                      <p className="text-xs text-muted-foreground">Assigned Home Nurse</p>
                      <p className="text-sm font-bold">{selectedPatient.nurse}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-rose-500/5 p-5 rounded-2xl border border-rose-500/10 hover:border-rose-500/30 transition-colors">
                <p className="text-[11px] text-rose-600/80 uppercase font-bold tracking-wider mb-2">Current Vitals</p>
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between items-center bg-background p-2.5 rounded-xl border shadow-sm">
                    <p className="text-xs text-muted-foreground font-semibold">Heart Rate</p>
                    <div className="flex items-center gap-2">
                      <p className={`font-bold ${selectedPatient.vitals.hrStatus === 'high' ? 'text-rose-500' : ''}`}>{selectedPatient.vitals.hr}</p>
                      {selectedPatient.vitals.hrStatus === 'high' && <span className="bg-rose-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded uppercase shadow-sm">High</span>}
                    </div>
                  </div>
                  <div className="flex justify-between items-center bg-background p-2.5 rounded-xl border shadow-sm">
                    <p className="text-xs text-muted-foreground font-semibold">Blood Pressure</p>
                    <p className="font-bold">{selectedPatient.vitals.bp}</p>
                  </div>
                  <div className="flex justify-between items-center bg-background p-2.5 rounded-xl border shadow-sm">
                    <p className="text-xs text-muted-foreground font-semibold">SpO2</p>
                    <p className="font-bold">{selectedPatient.vitals.spo2}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in slide-in-from-bottom-6 delay-150">
              <div className="p-5 rounded-2xl border bg-card shadow-sm">
                <div className="flex items-center gap-2 mb-4 border-b pb-2">
                  <div className="w-6 h-6 rounded bg-blue-500/10 flex items-center justify-center"><Pill className="w-3.5 h-3.5 text-blue-500" /></div>
                  <h4 className="font-bold text-sm">Active Medications</h4>
                </div>
                <div className="space-y-2">
                  {selectedPatient.medications.map((med: string, i: number) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                      <p className="text-sm font-medium">{med}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <div className="p-5 rounded-2xl border bg-amber-500/5 hover:border-amber-500/30 transition-colors shadow-sm">
                  <div className="flex items-center gap-2 mb-3">
                    <AlertTriangle className="w-4 h-4 text-amber-500" />
                    <h4 className="font-bold text-sm text-amber-700">Known Allergies</h4>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {selectedPatient.allergies.map((allergy: string, i: number) => (
                      <span key={i} className="bg-amber-500 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-sm">{allergy}</span>
                    ))}
                  </div>
                </div>

                <div className="p-5 rounded-2xl border bg-emerald-500/5 hover:border-emerald-500/30 transition-colors shadow-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <Droplets className="w-4 h-4 text-emerald-500" />
                    <h4 className="font-bold text-sm text-emerald-700">Latest Lab Result</h4>
                  </div>
                  <p className="text-sm font-semibold text-emerald-900 bg-background p-3 rounded-xl border shadow-sm">
                    {selectedPatient.labs}
                  </p>
                </div>
              </div>
            </div>

            <Button className="w-full h-12 text-base font-bold bg-violet-600 hover:bg-violet-700 text-white shadow-xl shadow-violet-500/20 rounded-xl" onClick={() => {
              setIsDetailsModalOpen(false);
              toast.success(`Exported complete medical summary for ${selectedPatient.name}.`);
            }}>Export Complete Medical File</Button>
          </div>
        )}
      </Dialog>
    </div>
  );
}
