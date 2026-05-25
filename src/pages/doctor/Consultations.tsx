import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Calendar, Clock, Video, User, FileText } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { toast } from 'sonner';

export default function Consultations() {
  const appointments = [
    { time: '09:00 AM', type: 'In-Person', patient: 'Alex Johnson', reason: 'Follow-up (Hypertension)', duration: '30 min', status: 'completed' },
    { time: '10:00 AM', type: 'Telehealth', patient: 'Sarah Smith', reason: 'New Patient Intake', duration: '45 min', status: 'current' },
    { time: '11:30 AM', type: 'In-Person', patient: 'Michael Davis', reason: 'Post-op Check', duration: '30 min', status: 'upcoming' },
    { time: '02:00 PM', type: 'Telehealth', patient: 'Emily Chen', reason: 'Lab Results Review', duration: '15 min', status: 'upcoming' },
  ];

  return (
    <div className="p-8 h-full flex flex-col bg-muted/10 overflow-y-auto">
      <div className="mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3 mb-2">
            <Calendar className="w-8 h-8 text-emerald-500" />
            Consultation Schedule
          </h1>
          <p className="text-muted-foreground">Manage your daily appointments and telehealth sessions.</p>
        </div>
        <Button className="bg-emerald-500 hover:bg-emerald-600" onClick={() => toast.info('Opening scheduling matrix...')}>New Appointment</Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {appointments.map((apt, idx) => (
            <Card key={idx} className={`overflow-hidden transition-all hover:shadow-md ${apt.status === 'current' ? 'border-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.15)] ring-1 ring-emerald-500' : ''}`}>
              <div className="flex flex-col sm:flex-row">
                <div className={`p-6 flex flex-col items-center justify-center border-b sm:border-b-0 sm:border-r w-full sm:w-48 shrink-0 ${apt.status === 'current' ? 'bg-emerald-500/10' : 'bg-muted/30'}`}>
                  <span className={`text-xl font-bold ${apt.status === 'completed' ? 'text-muted-foreground' : 'text-foreground'}`}>{apt.time}</span>
                  <span className="text-xs text-muted-foreground mt-1 flex items-center gap-1"><Clock className="w-3 h-3" /> {apt.duration}</span>
                </div>
                <CardContent className="p-6 flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-bold flex items-center gap-2">
                        <User className="w-4 h-4 text-emerald-500" /> {apt.patient}
                      </h3>
                      <p className="text-muted-foreground mt-1">{apt.reason}</p>
                      <div className="flex items-center gap-2 mt-3">
                        <span className="px-2 py-1 bg-muted rounded text-xs font-medium uppercase">{apt.type}</span>
                        {apt.status === 'current' && <span className="px-2 py-1 bg-emerald-500 text-white rounded text-xs font-bold uppercase animate-pulse">In Progress</span>}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2 w-full mt-4">
                    <Button
                      className={`flex-1 gap-2 ${apt.type === 'Telehealth' ? 'bg-emerald-500 hover:bg-emerald-600' : ''}`}
                      onClick={() => apt.type === 'Telehealth'
                        ? toast.success(`Connecting to ${apt.patient}...`, { description: 'Starting secure video channel.' })
                        : toast.info(`Opening chart for ${apt.patient}...`)}
                    >
                      {apt.type === 'Telehealth' ? <Video className="w-4 h-4" /> : <FileText className="w-4 h-4" />}
                      {apt.type === 'Telehealth' ? 'Join Call' : 'View Chart'}
                    </Button>
                    <Button variant="outline" className="flex-1 gap-2" onClick={() => toast.info(`Opening chart for ${apt.patient}...`)}>
                      <FileText className="w-4 h-4" /> View Chart
                    </Button>
                  </div>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Daily Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center pb-4 border-b">
                <span className="text-muted-foreground">Total Appointments</span>
                <span className="font-bold text-xl">8</span>
              </div>
              <div className="flex justify-between items-center pb-4 border-b">
                <span className="text-muted-foreground">Completed</span>
                <span className="font-bold text-emerald-500 text-xl">1</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Telehealth</span>
                <span className="font-bold text-xl">3</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
