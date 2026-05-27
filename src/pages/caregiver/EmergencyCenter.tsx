import { Card, CardContent } from '../../components/ui/card';
import { AlertTriangle, PhoneCall, Clock, ShieldAlert } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { toast } from 'sonner';
import { useState } from 'react';

export default function EmergencyCenter() {
  const [activeAlerts, setActiveAlerts] = useState([
    { id: 1, type: 'Critical Vitals', patient: 'Arthur Mercer', desc: 'Sustained resting HR > 135 bpm', time: 'Just now', priority: 'High', action: 'Dispatch Emergency Services' },
    { id: 2, type: 'Fall Detection', patient: 'Martha Mercer', desc: 'Sudden altitude drop detected in living room', time: '10 mins ago', priority: 'Medium', action: 'Call Assigned Nurse' }
  ]);

  return (
    <div className="p-4 md:p-8 h-full flex flex-col bg-muted/10 overflow-y-auto">
      <div className="mb-8 flex justify-between items-end max-w-5xl mx-auto w-full">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3 mb-2 text-rose-500">
            <ShieldAlert className="w-8 h-8" />
            Emergency Dispatch Center
          </h1>
          <p className="text-muted-foreground">Monitor and respond to critical health anomalies.</p>
        </div>
      </div>
      
      <div className="max-w-5xl mx-auto w-full space-y-6">
        {activeAlerts.map(alert => (
          <Card key={alert.id} className={`shadow-lg relative overflow-hidden animate-in fade-in slide-in-from-bottom-4 ${alert.priority === 'High' ? 'border-rose-500/50' : 'border-amber-500/50'}`}>
             <div className={`absolute left-0 top-0 bottom-0 w-2 ${alert.priority === 'High' ? 'bg-rose-500' : 'bg-amber-500'}`} />
             <CardContent className="p-6 sm:p-8">
               <div className="flex flex-col sm:flex-row justify-between gap-6">
                 <div>
                    <div className="flex items-center gap-3 mb-2">
                      <AlertTriangle className={`w-6 h-6 ${alert.priority === 'High' ? 'text-rose-500 animate-pulse' : 'text-amber-500'}`} />
                      <h2 className="text-xl font-bold">{alert.type}</h2>
                      <span className="text-xs font-bold uppercase px-2 py-1 bg-muted rounded">{alert.priority} Priority</span>
                    </div>
                    <p className="text-muted-foreground"><strong>{alert.patient}</strong> • {alert.desc}</p>
                    <p className="text-sm mt-2 text-muted-foreground"><Clock className="w-4 h-4 inline mr-1" /> {alert.time}</p>
                 </div>
                 <div className="flex flex-col gap-3 min-w-[200px]">
                    <Button 
                      className={`w-full text-white ${alert.priority === 'High' ? 'bg-rose-500 hover:bg-rose-600 shadow-lg shadow-rose-500/20' : 'bg-amber-500 hover:bg-amber-600'}`}
                      onClick={() => {
                        toast.success(`Initiated: ${alert.action}`);
                        setActiveAlerts(activeAlerts.filter(a => a.id !== alert.id));
                      }}
                    >
                      <PhoneCall className="w-4 h-4 mr-2" /> {alert.action}
                    </Button>
                    <Button variant="outline" className="w-full" onClick={() => {
                      toast.success('Alert Acknowledged');
                      setActiveAlerts(activeAlerts.filter(a => a.id !== alert.id));
                    }}>Acknowledge</Button>
                 </div>
               </div>
             </CardContent>
          </Card>
        ))}

        {activeAlerts.length === 0 && (
          <div className="text-center p-12 opacity-50">
            <p>No further active emergencies.</p>
          </div>
        )}
      </div>
    </div>
  );
}
