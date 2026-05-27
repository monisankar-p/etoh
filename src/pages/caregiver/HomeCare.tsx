import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card';
import { Activity, CheckCircle2, MapPin, Users, HeartPulse } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { toast } from 'sonner';
import { useState } from 'react';

export default function HomeCare() {
  const [tasks, setTasks] = useState([
    { task: 'Record Morning BP (Arthur)', time: '08:00 AM', status: 'completed' },
    { task: 'Physical Therapy Exercises (Arthur)', time: '02:00 PM', status: 'pending' },
    { task: 'Record Evening Glucose (Martha)', time: '08:00 PM', status: 'pending' },
    { task: 'Wound Dressing Change (Arthur)', time: '09:00 PM', status: 'pending' }
  ]);

  return (
    <div className="p-4 md:p-8 h-full flex flex-col bg-muted/10 overflow-y-auto">
      <div className="mb-8 max-w-5xl mx-auto w-full">
        <h1 className="text-3xl font-bold flex items-center gap-3 mb-2">
          <Activity className="w-8 h-8 text-violet-500" />
          Home Care Workflow
        </h1>
        <p className="text-muted-foreground">Manage daily tasks, vitals tracking, and nurse visits.</p>
      </div>

      <div className="max-w-5xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-violet-500" /> Daily Care Tasks</CardTitle>
            <CardDescription>Track daily requirements for all dependents.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {tasks.map((item, idx) => (
               <div key={idx} className="flex items-center justify-between p-4 border rounded-xl hover:border-violet-500/30 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 ${item.status === 'completed' ? 'bg-emerald-500 border-emerald-500' : 'border-muted-foreground'}`}>
                      {item.status === 'completed' && <CheckCircle2 className="w-4 h-4 text-white" />}
                    </div>
                    <div>
                      <p className={`text-sm font-bold ${item.status === 'completed' ? 'line-through text-muted-foreground' : ''}`}>{item.task}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{item.time}</p>
                    </div>
                  </div>
                  {item.status === 'pending' && (
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={() => {
                        const newTasks = [...tasks];
                        newTasks[idx].status = 'completed';
                        setTasks(newTasks);
                        toast.success('Task marked as done');
                      }}
                    >
                      Done
                    </Button>
                  )}
               </div>
            ))}
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Users className="w-5 h-5 text-violet-500" /> Nurse Coordination</CardTitle>
            <CardDescription>Live tracking and visit management.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 border rounded-xl bg-background shadow-sm border-emerald-500/30">
              <div className="flex justify-between items-start mb-4">
                <div className="flex gap-3 items-center">
                  <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center">
                    <HeartPulse className="w-5 h-5 text-emerald-500" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm">Nurse Alex</h3>
                    <p className="text-xs text-muted-foreground mt-0.5">Assigned to Arthur Mercer</p>
                  </div>
                </div>
                <span className="bg-emerald-500/10 text-emerald-500 text-[10px] font-bold px-2 py-1 rounded uppercase flex items-center gap-1">
                  <MapPin className="w-3 h-3"/> En Route (12 mins)
                </span>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="w-full" onClick={() => toast.info('Opening secure chat...')}>Message</Button>
                <Button size="sm" className="bg-emerald-500 hover:bg-emerald-600 text-white w-full">Live Map</Button>
              </div>
            </div>
            
            <div className="p-4 border rounded-xl bg-muted/30 opacity-70">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-bold text-sm">Unassigned Visit</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">Martha Mercer (Endocrinology follow-up)</p>
                </div>
              </div>
              <Button size="sm" variant="outline" className="w-full mt-2 border-dashed">Request Nurse Staffing</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
