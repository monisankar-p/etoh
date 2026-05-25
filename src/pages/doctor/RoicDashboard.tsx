import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Activity, AlertTriangle, Search, Filter, ShieldAlert, HeartPulse, Thermometer } from 'lucide-react';
import { Dialog } from '../../components/ui/dialog';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';

// Mock IPD data
const ipdPatients = [
  { id: 'IPD-001', name: 'James Wilson', age: 68, room: 'ICU-B 04', diagnosis: 'Sepsis, Pneumonia', news2: 8, status: 'Critical', trend: 'worsening' },
  { id: 'IPD-002', name: 'Maria Garcia', age: 54, room: 'Ward-A 12', diagnosis: 'Post-op CABG', news2: 4, status: 'Warning', trend: 'stable' },
  { id: 'IPD-003', name: 'Robert Chen', age: 42, room: 'Ward-B 08', diagnosis: 'Acute Pancreatitis', news2: 2, status: 'Stable', trend: 'improving' },
  { id: 'IPD-004', name: 'Sarah Smith', age: 71, room: 'ICU-A 01', diagnosis: 'Heart Failure Exacerbation', news2: 7, status: 'Critical', trend: 'stable' },
  { id: 'IPD-005', name: 'Emily Davis', age: 29, room: 'Ward-C 15', diagnosis: 'Diabetic Ketoacidosis', news2: 3, status: 'Warning', trend: 'improving' },
  { id: 'IPD-006', name: 'Michael Brown', age: 60, room: 'Ward-A 05', diagnosis: 'COPD Exacerbation', news2: 5, status: 'Warning', trend: 'worsening' },
];

const mockVitalsTrend = [
  { time: '08:00', hr: 85, rr: 18, spo2: 96 },
  { time: '10:00', hr: 92, rr: 20, spo2: 94 },
  { time: '12:00', hr: 98, rr: 22, spo2: 92 },
  { time: '14:00', hr: 105, rr: 24, spo2: 90 },
  { time: '16:00', hr: 112, rr: 26, spo2: 88 }, // Deterioration point
];

export default function RoicDashboard() {
  const [search, setSearch] = useState('');
  const [selectedPatient, setSelectedPatient] = useState<typeof ipdPatients[0] | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Critical': return 'border-destructive bg-destructive/5';
      case 'Warning': return 'border-amber-500 bg-amber-500/5';
      default: return 'border-emerald-500 bg-emerald-500/5';
    }
  };

  const getNewsColor = (score: number) => {
    if (score >= 7) return 'text-destructive';
    if (score >= 5) return 'text-amber-500';
    return 'text-emerald-500';
  };

  return (
    <div className="p-8 h-full flex flex-col bg-muted/10 overflow-y-auto">
      {/* Header */}
      <div className="mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3 mb-2">
            <Activity className="w-8 h-8 text-destructive" />
            ROIC Deterioration Monitor
          </h1>
          <p className="text-muted-foreground">Inpatient Department (IPD) command center. AI-powered real-time risk tracking.</p>
        </div>
        <div className="flex gap-2">
           <div className="relative w-64">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
             <Input placeholder="Search IPD patients..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
           </div>
           <Button variant="outline" size="icon"><Filter className="w-4 h-4" /></Button>
        </div>
      </div>

      {/* High Density Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {ipdPatients.filter(p => p.name.toLowerCase().includes(search.toLowerCase())).map(patient => (
          <Card 
            key={patient.id} 
            className={`cursor-pointer transition-all hover:shadow-md hover:scale-[1.01] ${getStatusColor(patient.status)}`}
            onClick={() => setSelectedPatient(patient)}
          >
            <CardHeader className="pb-2 border-b border-border/50 bg-background/50 backdrop-blur-sm">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{patient.name}</CardTitle>
                  <CardDescription>{patient.age} yrs • {patient.room}</CardDescription>
                </div>
                <div className="text-right">
                  <div className="text-xs font-bold text-muted-foreground uppercase">NEWS2 Score</div>
                  <div className={`text-2xl font-bold ${getNewsColor(patient.news2)}`}>{patient.news2}</div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-4 bg-background/50">
               <p className="font-semibold text-sm mb-1 line-clamp-1">{patient.diagnosis}</p>
               <div className="flex items-center gap-2 mt-3">
                 {patient.status === 'Critical' && <ShieldAlert className="w-4 h-4 text-destructive animate-pulse" />}
                 {patient.status === 'Warning' && <AlertTriangle className="w-4 h-4 text-amber-500" />}
                 <span className="text-xs font-medium text-muted-foreground">
                   Trend: <span className="uppercase font-bold">{patient.trend}</span>
                 </span>
               </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Deterioration Modal */}
      <Dialog 
        isOpen={!!selectedPatient} 
        onClose={() => setSelectedPatient(null)} 
        title="Clinical Deterioration Dashboard" 
        description={selectedPatient ? `Monitoring ${selectedPatient.name} • ${selectedPatient.room}` : ''}
        maxWidth="4xl"
      >
        {selectedPatient && (
          <div className="space-y-6">
            {/* Top Stats Banner */}
            <div className="grid grid-cols-4 gap-4">
               <div className="p-4 rounded-xl border bg-destructive/10 border-destructive/20 text-center">
                 <p className="text-xs font-bold text-destructive uppercase mb-1">NEWS2 Score</p>
                 <p className="text-3xl font-bold text-destructive">{selectedPatient.news2}</p>
               </div>
               <div className="p-4 rounded-xl border bg-background text-center">
                 <HeartPulse className="w-5 h-5 mx-auto text-primary mb-1" />
                 <p className="text-xs text-muted-foreground uppercase">Heart Rate</p>
                 <p className="text-xl font-bold">112 <span className="text-sm font-normal">bpm</span></p>
               </div>
               <div className="p-4 rounded-xl border bg-background text-center">
                 <Activity className="w-5 h-5 mx-auto text-blue-500 mb-1" />
                 <p className="text-xs text-muted-foreground uppercase">SpO2</p>
                 <p className="text-xl font-bold text-destructive">88% <span className="text-sm font-normal">RA</span></p>
               </div>
               <div className="p-4 rounded-xl border bg-background text-center">
                 <Thermometer className="w-5 h-5 mx-auto text-amber-500 mb-1" />
                 <p className="text-xs text-muted-foreground uppercase">Temp</p>
                 <p className="text-xl font-bold">101.4 <span className="text-sm font-normal">°F</span></p>
               </div>
            </div>

            {/* AI Insight Alert */}
            {selectedPatient.status === 'Critical' && (
              <div className="p-4 rounded-xl border border-destructive bg-destructive/5 flex gap-4 items-start">
                 <div className="w-10 h-10 rounded-full bg-destructive/20 flex items-center justify-center shrink-0">
                   <ShieldAlert className="w-5 h-5 text-destructive" />
                 </div>
                 <div>
                   <h3 className="font-bold text-destructive">AI Sepsis Alert Triggered</h3>
                   <p className="text-sm mt-1">etoh Predictive AI indicates a 94% probability of septic shock within the next 4 hours based on degrading SpO2 and rising HR trajectories.</p>
                   <div className="flex gap-2 mt-3">
                     <Button size="sm" variant="destructive">Activate RRT (Rapid Response)</Button>
                     <Button size="sm" variant="outline" className="border-destructive text-destructive">Order Lactate Stat</Button>
                   </div>
                 </div>
              </div>
            )}

            {/* Trajectory Graph */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">8-Hour Vitals Trajectory</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[250px] w-full mt-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={mockVitalsTrend}>
                      <XAxis dataKey="time" fontSize={12} tickLine={false} axisLine={false} />
                      <YAxis yAxisId="left" domain={[60, 140]} fontSize={12} tickLine={false} axisLine={false} />
                      <YAxis yAxisId="right" orientation="right" domain={[80, 100]} fontSize={12} tickLine={false} axisLine={false} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: 'hsl(var(--card))', borderRadius: '8px', border: '1px solid hsl(var(--border))' }}
                      />
                      <ReferenceLine yAxisId="right" y={90} stroke="hsl(var(--destructive))" strokeDasharray="3 3" />
                      <Line yAxisId="left" type="monotone" dataKey="hr" stroke="#10b981" strokeWidth={3} dot={{r: 4}} name="Heart Rate (bpm)" />
                      <Line yAxisId="right" type="monotone" dataKey="spo2" stroke="#3b82f6" strokeWidth={3} dot={{r: 4}} name="SpO2 (%)" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

          </div>
        )}
      </Dialog>
    </div>
  );
}
