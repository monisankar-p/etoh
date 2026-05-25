import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Pill, Activity, CheckCircle2, AlertCircle, Clock, ChevronRight } from 'lucide-react';
import { mockPatients } from '../../mock/data';

export default function NurseDashboard() {
  const [tasks] = useState([
    { id: 1, type: 'medication', patient: mockPatients[0], detail: 'Administer Metoprolol 50mg', time: '10:00 AM', status: 'pending', priority: 'high', instructions: 'Take with food. Monitor HR post-admin.' },
    { id: 2, type: 'vitals', patient: mockPatients[1], detail: 'Check BP and SpO2', time: '10:30 AM', status: 'completed', priority: 'normal', instructions: 'Patient on RA. Log immediately.' },
    { id: 3, type: 'assessment', patient: mockPatients[2], detail: 'Pain assessment', time: '11:00 AM', status: 'pending', priority: 'normal', instructions: 'Use numeric rating scale. Check surgical site.' },
    { id: 4, type: 'medication', patient: mockPatients[3], detail: 'IV Antibiotics', time: '12:00 PM', status: 'pending', priority: 'high', instructions: 'Vancomycin 1g. Check trough levels.' },
  ]);

  const [expandedTask, setExpandedTask] = useState<number | null>(null);

  return (
    <div className="p-8 h-full flex flex-col bg-muted/20 overflow-y-auto">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-bold">Shift Overview</h1>
          <p className="text-muted-foreground mt-1">Good morning! You have 3 pending tasks for your shift.</p>
        </div>
        <div className="flex gap-4">
           <Card className="bg-amber-500/10 border-amber-500/20">
             <CardContent className="p-4 flex items-center gap-4">
               <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center">
                 <AlertCircle className="w-5 h-5 text-amber-600" />
               </div>
               <div>
                 <p className="text-2xl font-bold text-amber-600">3</p>
                 <p className="text-xs text-amber-600/80 uppercase font-semibold">Pending High</p>
               </div>
             </CardContent>
           </Card>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Task Timeline */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-amber-500" />
                Current Shift Tasks
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {tasks.map(task => (
                  <div key={task.id} className="flex flex-col p-4 rounded-xl border bg-background hover:bg-accent/50 transition-colors cursor-pointer" onClick={() => setExpandedTask(expandedTask === task.id ? null : task.id)}>
                    <div className="flex items-start gap-4">
                      <div className="mt-1">
                        {task.status === 'completed' ? (
                          <CheckCircle2 className="w-6 h-6 text-emerald-500" />
                        ) : (
                          <div className="w-6 h-6 rounded-full border-2 border-muted-foreground" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className={`font-semibold ${task.status === 'completed' ? 'text-muted-foreground line-through' : ''}`}>
                              {task.detail}
                            </p>
                            <p className="text-sm text-muted-foreground mt-0.5">
                              Patient: <span className="font-medium text-foreground">{task.patient.name}</span> ({task.patient.room})
                            </p>
                          </div>
                          <div className="text-right flex items-center gap-2">
                            <div>
                              <p className="text-sm font-medium">{task.time}</p>
                              {task.priority === 'high' && task.status !== 'completed' && (
                                <span className="inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-bold bg-destructive/10 text-destructive uppercase">
                                  Urgent
                                </span>
                              )}
                            </div>
                            <ChevronRight className={`w-4 h-4 text-muted-foreground transition-transform ${expandedTask === task.id ? 'rotate-90 text-amber-500' : ''}`} />
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Expanded Content */}
                    {expandedTask === task.id && (
                      <div className="mt-4 pt-4 border-t pl-10 flex gap-4">
                        <div className="flex-1 p-3 bg-muted/30 rounded-lg text-sm text-muted-foreground">
                          <strong>Instructions:</strong> {task.instructions}
                        </div>
                        <Button size="sm" className="bg-amber-500 hover:bg-amber-600 self-center">Take Action</Button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions & AI Assist */}
        <div className="space-y-6">
          <Card className="bg-amber-500 text-white border-none shadow-lg shadow-amber-500/20">
            <CardHeader>
              <CardTitle className="text-amber-50">Quick Vitals Entry</CardTitle>
              <CardDescription className="text-amber-100/80">Log data rapidly via voice or manual entry</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full bg-white text-amber-600 hover:bg-amber-50" size="lg">
                <Activity className="w-4 h-4 mr-2" /> Log Vitals
              </Button>
              <Button variant="outline" className="w-full border-amber-400 bg-transparent text-amber-50 hover:bg-amber-600 hover:text-white" size="lg">
                <Pill className="w-4 h-4 mr-2" /> Med Administration
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Shift Handoff Notes</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground italic bg-muted p-3 rounded-lg">
                "Room 102 reported mild nausea after morning meds. Monitor hydration. Room 205 needs dressing change at 2PM."
              </p>
              <Button variant="link" className="px-0 mt-2 text-amber-500">Generate AI Handoff Summary</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
