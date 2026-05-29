import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Calendar, Clock, MapPin, Video, User, CheckCircle2, CalendarDays } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { useTranslation } from '../../i18n';
import ScoreGauge from '../../components/analytics/ScoreGauge';
import InsightPanel from '../../components/analytics/InsightPanel';
import { useState } from 'react';
import { SimulatedActionModal } from '../../components/ui/SimulatedActionModal';
import { toast } from 'sonner';

export default function Appointments() {
  const { t } = useTranslation();
  const [modalOpen, setModalOpen] = useState(false);

  const appointments = [
    {
      id: 'A-101',
      doctor: 'Dr. Sarah Chen',
      specialty: 'Cardiology',
      date: 'Tomorrow, Oct 24',
      time: '10:00 AM',
      location: 'etoh Heart Center, Room 402',
      type: 'in-person',
      status: 'confirmed'
    },
    {
      id: 'A-102',
      doctor: 'Dr. Michael Roberts',
      specialty: 'Primary Care',
      date: 'Nov 12, 2023',
      time: '02:30 PM',
      location: 'Telehealth Secure Link',
      type: 'video',
      status: 'confirmed'
    }
  ];

  const pastAppointments = [
    {
      id: 'P-901',
      doctor: 'Dr. Sarah Chen',
      specialty: 'Cardiology',
      date: 'Sep 10, 2023',
      status: 'completed',
      outcome: 'Medication adjusted'
    },
    {
      id: 'P-892',
      doctor: 'Dr. Emily Watson',
      specialty: 'Endocrinology',
      date: 'Aug 05, 2023',
      status: 'missed',
      outcome: 'Rescheduled'
    }
  ];

  return (
    <div className="p-4 md:p-8 h-full flex flex-col bg-muted/10 overflow-y-auto">
      <div className="mb-8 flex justify-between items-end max-w-5xl mx-auto w-full">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3 mb-2">
            <CalendarDays className="w-8 h-8 text-primary" />
            {t('appt.title')}
          </h1>
          <p className="text-muted-foreground">{t('appt.subtitle')}</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90" onClick={() => setModalOpen(true)}>{t('appt.bookNew')}</Button>
      </div>

      <div className="max-w-5xl mx-auto w-full grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>{t('appt.upcoming')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {appointments.map((appt) => (
                <div key={appt.id} className="p-5 rounded-xl border bg-background hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                        <User className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg">{appt.doctor}</h3>
                        <p className="text-sm text-muted-foreground">{appt.specialty}</p>
                      </div>
                    </div>
                    <span className="px-3 py-1 bg-emerald-500/10 text-emerald-600 rounded-full text-xs font-bold uppercase flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      {t('appt.confirmed')}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4 text-sm bg-muted/30 p-3 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <span className="font-medium">{appt.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span className="font-medium">{appt.time}</span>
                    </div>
                    <div className="flex items-center gap-2 md:col-span-2">
                      {appt.type === 'video' ? <Video className="w-4 h-4 text-primary" /> : <MapPin className="w-4 h-4 text-muted-foreground" />}
                      <span className="font-medium">{appt.location}</span>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button variant="outline" className="flex-1">{t('appt.reschedule')}</Button>
                    {appt.type === 'video' ? (
                      <Button className="flex-1 bg-primary hover:bg-primary/90">{t('appt.joinCall')}</Button>
                    ) : null}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t('appt.past')}</CardTitle>
            </CardHeader>
            <CardContent>
               <div className="space-y-4">
                {pastAppointments.map((appt) => (
                  <div key={appt.id} className={`p-4 rounded-xl border flex justify-between items-center ${appt.status === 'missed' ? 'bg-destructive/5 border-destructive/20' : 'bg-background'}`}>
                    <div>
                      <p className="font-bold">{appt.doctor}</p>
                      <p className="text-xs text-muted-foreground">{appt.date} • {appt.specialty}</p>
                    </div>
                    <div className="text-right">
                       <span className={`text-xs font-bold uppercase px-2 py-1 rounded ${appt.status === 'missed' ? 'text-destructive bg-destructive/10' : 'text-muted-foreground bg-muted'}`}>
                         {appt.status === 'missed' ? t('appt.missed') : t('appt.completed')}
                       </span>
                       <p className="text-xs mt-1 text-muted-foreground">{appt.outcome}</p>
                    </div>
                  </div>
                ))}
               </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
           <ScoreGauge 
              score={85} 
              title={t('appt.adherenceScore')} 
              subtitle={t('appt.missedTracker')} 
            />

            <InsightPanel 
              title={t('analytics.aiInsight')}
              insight={t('appt.recommendedScheduling')}
            />
            
            <Card>
              <CardHeader>
                <CardTitle className="text-sm uppercase tracking-wider text-muted-foreground">{t('appt.specialistFrequency')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                 <div className="flex justify-between items-center pb-2 border-b">
                   <span className="font-medium">Cardiology</span>
                   <span>Every 3 months</span>
                 </div>
                 <div className="flex justify-between items-center pb-2 border-b">
                   <span className="font-medium">Endocrinology</span>
                   <span className="text-amber-500 font-bold">Overdue (6m)</span>
                 </div>
                 <div className="flex justify-between items-center">
                   <span className="font-medium">Primary Care</span>
                   <span>Annual</span>
                 </div>
              </CardContent>
            </Card>
        </div>
      </div>

      <SimulatedActionModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={t('appt.bookNew')}
        description="Select a specialty and preferred time for your new appointment."
        type="form"
        actionLabel="Confirm Booking"
        fields={[
          { name: 'specialty', label: 'Specialty', placeholder: 'e.g., Cardiology, Primary Care' },
          { name: 'date', label: 'Preferred Date', placeholder: 'YYYY-MM-DD' },
          { name: 'time', label: 'Preferred Time', placeholder: 'Morning / Afternoon' }
        ]}
        onActionComplete={() => toast.success('Appointment request submitted successfully!')}
      />
    </div>
  );
}
