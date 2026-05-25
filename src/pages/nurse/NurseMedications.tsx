import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card';
import { Pill, Clock, CheckCircle2, AlertTriangle, User } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { toast } from 'sonner';

export default function NurseMedications() {
  const [marData, setMarData] = useState([
    { id: 1, patient: 'Alex Johnson', room: '102A', med: 'Metoprolol', dose: '50mg PO', time: '10:00 AM', status: 'pending', alert: null },
    { id: 2, patient: 'Sarah Smith', room: '104B', med: 'Vancomycin', dose: '1g IV', time: '10:30 AM', status: 'pending', alert: 'Check trough level' },
    { id: 3, patient: 'Michael Davis', room: '201A', med: 'Lisinopril', dose: '10mg PO', time: '08:00 AM', status: 'administered', alert: null },
    { id: 4, patient: 'Emily Chen', room: '205B', med: 'Insulin Glargine', dose: '15 units SQ', time: '12:00 PM', status: 'upcoming', alert: null },
  ]);

  const handleAdminister = (id: number, med: string) => {
    setMarData(prev => prev.map(item => item.id === id ? { ...item, status: 'administered' } : item));
    toast.success(`${med} Administered`, { description: 'eMAR updated successfully.' });
  };

  return (
    <div className="p-8 h-full flex flex-col bg-muted/10 overflow-y-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold flex items-center gap-3 mb-2">
          <Pill className="w-8 h-8 text-amber-500" />
          Medication Administration (eMAR)
        </h1>
        <p className="text-muted-foreground">Track and administer medications for your assigned patients.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Current Shift: 07:00 - 19:00</CardTitle>
          <CardDescription>2 medications due within the next hour.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {marData.map((item) => (
              <div key={item.id} className={`p-4 rounded-xl border flex flex-col md:flex-row justify-between items-start md:items-center gap-4 transition-colors ${item.status === 'pending' ? 'bg-amber-500/5 border-amber-500/30' : 'bg-background'}`}>

                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${item.status === 'administered' ? 'bg-emerald-500/10' :
                      item.status === 'pending' ? 'bg-amber-500/20' : 'bg-muted'
                    }`}>
                    {item.status === 'administered' ? <CheckCircle2 className="w-6 h-6 text-emerald-500" /> : <Pill className={`w-6 h-6 ${item.status === 'pending' ? 'text-amber-600' : 'text-muted-foreground'}`} />}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg flex items-center gap-2">
                      <User className="w-4 h-4 text-muted-foreground" /> {item.patient} <span className="text-sm font-normal text-muted-foreground">(Rm {item.room})</span>
                    </h3>
                    <p className="font-semibold text-primary">{item.med} <span className="text-foreground">{item.dose}</span></p>
                  </div>
                </div>

                <div className="flex flex-col md:items-end gap-2 w-full md:w-auto">
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    {item.time}
                    <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold ${item.status === 'administered' ? 'bg-emerald-500/10 text-emerald-600' :
                        item.status === 'pending' ? 'bg-amber-500 text-white animate-pulse' : 'bg-muted text-muted-foreground'
                      }`}>
                      {item.status}
                    </span>
                  </div>

                  {item.alert && (
                    <div className="flex items-center gap-1 text-xs text-destructive font-bold bg-destructive/10 px-2 py-1 rounded">
                      <AlertTriangle className="w-3 h-3" /> {item.alert}
                    </div>
                  )}

                  {item.status !== 'administered' && (
                    <Button size="sm" className="w-full md:w-auto bg-amber-500 hover:bg-amber-600" onClick={() => handleAdminister(item.id, item.med)}>Administer</Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
