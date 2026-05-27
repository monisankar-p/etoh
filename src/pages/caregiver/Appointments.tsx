import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card';
import { Calendar, Video, Stethoscope, Clock, Users } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { toast } from 'sonner';
import { useState } from 'react';

export default function Appointments() {
  const [upcoming, setUpcoming] = useState([
    { id: 1, type: 'telehealth', title: 'Telecardiology', patient: 'Arthur Mercer', time: 'Today, 2:30 PM', doctor: 'Dr. Sarah Chen' },
    { id: 2, type: 'in-person', title: 'Endocrinology Follow-up', patient: 'Martha Mercer', time: 'Tomorrow, 10:00 AM', doctor: 'Dr. M. Davis' },
    { id: 3, type: 'in-person', title: 'Physical Therapy Assessment', patient: 'Arthur Mercer', time: 'Friday, 1:00 PM', doctor: 'PT Clinic' }
  ]);

  return (
    <div className="p-4 md:p-8 h-full flex flex-col bg-muted/10 overflow-y-auto">
      <div className="mb-8 max-w-5xl mx-auto w-full">
        <h1 className="text-3xl font-bold flex items-center gap-3 mb-2">
          <Calendar className="w-8 h-8 text-violet-500" />
          Appointment Management
        </h1>
        <p className="text-muted-foreground">Manage family doctor visits and teleconsultations.</p>
      </div>

      <div className="max-w-5xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-6">
          {upcoming.map((apt, idx) => (
             <Card key={idx} className={`shadow-sm relative overflow-hidden ${apt.type === 'telehealth' ? 'border-blue-500/30 bg-blue-500/5' : ''}`}>
               {apt.type === 'telehealth' && <div className="absolute top-0 right-0 p-4"><Video className="w-16 h-16 opacity-5 text-blue-500" /></div>}
               <CardContent className="p-6">
                 <div className="flex justify-between items-start mb-4">
                   <div>
                     <h3 className="font-bold text-lg">{apt.title}</h3>
                     <p className="text-sm font-medium text-muted-foreground mt-1">{apt.patient}</p>
                   </div>
                   {apt.type === 'telehealth' && (
                     <span className="bg-blue-500/10 text-blue-500 text-[10px] font-bold px-2 py-1 rounded uppercase">Telehealth</span>
                   )}
                 </div>
                 
                 <div className="space-y-2 mb-6">
                   <div className="flex items-center gap-2 text-sm text-muted-foreground">
                     <Clock className="w-4 h-4" /> {apt.time}
                   </div>
                   <div className="flex items-center gap-2 text-sm text-muted-foreground">
                     <Stethoscope className="w-4 h-4" /> {apt.doctor}
                   </div>
                 </div>

                 {apt.type === 'telehealth' ? (
                   <Button className="w-full bg-blue-500 hover:bg-blue-600 shadow-lg shadow-blue-500/20" onClick={() => toast.success('Joining waiting room...')}>
                     <Video className="w-4 h-4 mr-2" /> Join Call
                   </Button>
                 ) : (
                   <div className="flex gap-2">
                     <Button variant="outline" className="w-full" onClick={() => {
                       setUpcoming(upcoming.filter(u => u.id !== apt.id));
                       toast.info('Appointment cancelled/rescheduled.');
                     }}>Reschedule</Button>
                     <Button variant="secondary" className="w-full" onClick={() => toast.success('Opening Maps...')}>Get Directions</Button>
                   </div>
                 )}
               </CardContent>
             </Card>
          ))}
          {upcoming.length === 0 && (
            <div className="text-center p-8 opacity-50">No upcoming appointments.</div>
          )}
        </div>

        <div>
          <Card className="shadow-sm">
             <CardHeader>
               <CardTitle>Schedule New</CardTitle>
               <CardDescription>Request an appointment for a dependent.</CardDescription>
             </CardHeader>
             <CardContent className="space-y-4">
                <Button variant="outline" className="w-full h-16 border-dashed justify-start px-4" onClick={() => toast.info('Opening teleconsultation booking...')}>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-violet-500/10 flex items-center justify-center">
                      <Stethoscope className="w-5 h-5 text-violet-500" />
                    </div>
                    <div className="text-left">
                      <p className="font-bold text-sm">Consult a Doctor</p>
                      <p className="text-xs text-muted-foreground">Book teleconsultation or clinic visit</p>
                    </div>
                  </div>
                </Button>
                <Button variant="outline" className="w-full h-16 border-dashed justify-start px-4" onClick={() => toast.info('Opening Home Nurse scheduling...')}>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center">
                      <Users className="w-5 h-5 text-amber-500" />
                    </div>
                    <div className="text-left">
                      <p className="font-bold text-sm">Request Home Nurse</p>
                      <p className="text-xs text-muted-foreground">Schedule a home care visit</p>
                    </div>
                  </div>
                </Button>
             </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
