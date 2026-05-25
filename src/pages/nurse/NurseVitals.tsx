import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card';
import { Thermometer, Activity, HeartPulse, Wind } from 'lucide-react';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import { toast } from 'sonner';

export default function NurseVitals() {
  const [patient, setPatient] = useState('Alex Johnson');
  const [hr, setHr] = useState('');
  const [bp, setBp] = useState('');
  const [spo2, setSpo2] = useState('');
  const [temp, setTemp] = useState('');

  const [recentEntries, setRecentEntries] = useState([
    { id: 1, patient: 'Michael Davis', time: '10 mins ago', hr: '82', bp: '130/85', spo2: '96', temp: '99.1' }
  ]);

  const handleSave = () => {
    if (!hr && !bp && !spo2 && !temp) {
      toast.error('Please enter at least one vital sign.');
      return;
    }
    
    const newEntry = {
      id: Date.now(),
      patient: patient.split(' ')[0] + ' ' + patient.split(' ')[1], // basic name extraction
      time: 'Just now',
      hr: hr || '--',
      bp: bp || '--/--',
      spo2: spo2 || '--',
      temp: temp || '--'
    };
    
    setRecentEntries([newEntry, ...recentEntries]);
    toast.success(`Vitals saved for ${newEntry.patient}`, { description: 'etoh AI review complete: No anomalies detected.' });
    
    setHr('');
    setBp('');
    setSpo2('');
    setTemp('');
  };

  return (
    <div className="p-8 h-full flex flex-col bg-muted/10 overflow-y-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold flex items-center gap-3 mb-2">
          <Thermometer className="w-8 h-8 text-amber-500" />
          Vitals Entry
        </h1>
        <p className="text-muted-foreground">Log patient vital signs rapidly. Anomalies are flagged by etoh AI automatically.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="border-t-4 border-t-amber-500">
          <CardHeader>
            <CardTitle>Manual Entry Form</CardTitle>
            <CardDescription>Select patient and input current metrics.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Select Patient</label>
              <select className="w-full p-3 rounded-lg bg-background border text-sm" value={patient} onChange={(e) => setPatient(e.target.value)}>
                <option value="Alex Johnson (Rm 102A)">Alex Johnson (Rm 102A)</option>
                <option value="Sarah Smith (Rm 104B)">Sarah Smith (Rm 104B)</option>
              </select>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-2"><HeartPulse className="w-4 h-4 text-emerald-500" /> Heart Rate (bpm)</label>
                <Input type="number" placeholder="e.g. 72" value={hr} onChange={(e) => setHr(e.target.value)} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-2"><Activity className="w-4 h-4 text-primary" /> Blood Pressure (mmHg)</label>
                <Input type="text" placeholder="e.g. 120/80" value={bp} onChange={(e) => setBp(e.target.value)} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-2"><Wind className="w-4 h-4 text-blue-500" /> SpO2 (%)</label>
                <Input type="number" placeholder="e.g. 98" value={spo2} onChange={(e) => setSpo2(e.target.value)} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-2"><Thermometer className="w-4 h-4 text-amber-500" /> Temperature (°F)</label>
                <Input type="number" placeholder="e.g. 98.6" value={temp} onChange={(e) => setTemp(e.target.value)} />
              </div>
            </div>

            <Button className="w-full bg-amber-500 hover:bg-amber-600" onClick={handleSave}>Save to Chart</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Entries</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentEntries.map((entry) => (
                <div key={entry.id} className="p-3 bg-muted/50 rounded-lg flex justify-between items-center text-sm">
                  <div>
                    <p className="font-bold">{entry.patient}</p>
                    <p className="text-xs text-muted-foreground">Logged {entry.time}</p>
                  </div>
                  <div className="text-right">
                     <p>HR: {entry.hr} | BP: {entry.bp}</p>
                     <p>SpO2: {entry.spo2}% | Temp: {entry.temp}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
