import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card';
import { Clock, Activity, Thermometer, Pill, Syringe, CheckCircle2, FilePlus2 } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { toast } from 'sonner';

export default function CareTimeline() {
  const events = [
    { time: '14:30', type: 'Medication', title: 'Administered Cefepime 2g IV', user: 'Nurse A. Johnson', icon: Syringe, color: 'text-amber-500' },
    { time: '13:00', type: 'Vitals', title: 'BP 118/75, HR 82, Temp 98.6°F', user: 'Auto-recorded (Monitor)', icon: Activity, color: 'text-emerald-500' },
    { time: '11:45', type: 'Observation', title: 'Patient reports pain level 3/10', user: 'Nurse A. Johnson', icon: Thermometer, color: 'text-primary' },
    { time: '09:00', type: 'Medication', title: 'Administered Metoprolol 50mg PO', user: 'Nurse M. Davis', icon: Pill, color: 'text-amber-500' },
    { time: '08:00', type: 'Shift Change', title: 'Handover complete. Plan discussed.', user: 'Nurse M. Davis', icon: Clock, color: 'text-muted-foreground' },
  ];

  return (
    <div className="p-8 h-full flex flex-col bg-muted/10 overflow-y-auto">
      <div className="mb-8 flex justify-between items-end max-w-4xl mx-auto w-full">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3 mb-2">
            <Activity className="w-8 h-8 text-amber-500" />
            Longitudinal Care Timeline
          </h1>
          <p className="text-muted-foreground">Comprehensive tracking of patient milestones, interventions, and progression.</p>
        </div>
        <Button className="bg-amber-500 hover:bg-amber-600 gap-2" onClick={() => toast.success('Starting observation entry...', { description: 'Microphone access requested.' })}>
          <FilePlus2 className="w-4 h-4" /> Log Observation
        </Button>
      </div>

      <div className="max-w-4xl mx-auto w-full space-y-6">
        <Card className="border-amber-500/20 shadow-[0_0_15px_rgba(245,158,11,0.05)]">
          <CardHeader className="bg-amber-500/5 border-b border-amber-500/10 flex flex-row items-center justify-between pb-4">
            <div>
              <CardTitle className="text-amber-600">Active Shift Log</CardTitle>
              <CardDescription>Today's nursing interventions</CardDescription>
            </div>
            <Button size="sm" className="bg-amber-500 hover:bg-amber-600">Log Observation</Button>
          </CardHeader>
          <CardContent className="p-8">
            <div className="relative">
              <div className="absolute left-8 top-0 bottom-0 w-px bg-border" />

              <div className="space-y-8">
                {events.map((event, i) => {
                  const Icon = event.icon;
                  return (
                    <div key={i} className="flex gap-6 relative group">
                      <div className="w-16 h-16 rounded-full bg-background border-4 border-background flex items-center justify-center shadow-sm shrink-0 z-10 transition-transform group-hover:scale-110">
                        <div className="w-12 h-12 rounded-full flex items-center justify-center bg-muted/50">
                          <Icon className={`w-5 h-5 ${event.color}`} />
                        </div>
                      </div>
                      <div className="flex-1 pt-3">
                        <div className="bg-background border rounded-xl p-4 shadow-sm group-hover:border-amber-500/50 transition-colors">
                          <div className="flex justify-between items-start mb-2">
                            <span className="text-sm font-bold font-mono text-primary">{event.time}</span>
                            <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-muted text-muted-foreground">{event.type}</span>
                          </div>
                          <h3 className="font-semibold text-lg mb-1">{event.title}</h3>
                          <p className="text-xs text-muted-foreground flex items-center gap-1">
                            {event.user.includes('Auto') ? <CheckCircle2 className="w-3 h-3 text-emerald-500" /> : <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />}
                            Logged by {event.user}
                          </p>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
