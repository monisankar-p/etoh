import { Clock, Activity, FileText, Pill, Sparkles } from 'lucide-react';

export default function HealthTimeline() {
  const events = [
    { id: 1, date: 'Oct 12, 2023', type: 'report', title: 'Metabolic Panel Uploaded', desc: 'AI detected elevated fasting glucose.', icon: FileText, color: 'text-blue-500' },
    { id: 2, date: 'Sep 28, 2023', type: 'visit', title: 'Cardiology Consultation', desc: 'Dr. Chen adjusted Metoprolol dosage to 50mg.', icon: Activity, color: 'text-emerald-500' },
    { id: 3, date: 'Sep 15, 2023', type: 'medication', title: 'Started Atorvastatin', desc: 'Prescribed 20mg daily for cholesterol management.', icon: Pill, color: 'text-primary' },
    { id: 4, date: 'Aug 02, 2023', type: 'ai', title: 'etoh AI Insight', desc: 'Detected irregular sleeping patterns based on Apple Health data.', icon: Sparkles, color: 'text-amber-500' },
  ];

  return (
    <div className="p-8 h-full flex flex-col bg-muted/10 overflow-y-auto">
      <div className="mb-12 max-w-3xl mx-auto w-full">
        <h1 className="text-3xl font-bold flex items-center gap-3 mb-2">
          <Clock className="w-8 h-8 text-primary" />
          Health Memory Timeline
        </h1>
        <p className="text-muted-foreground">A chronological history of your health events, powered by etoh AI.</p>
      </div>

      <div className="max-w-3xl mx-auto w-full relative">
        <div className="absolute left-8 top-0 bottom-0 w-px bg-border" />
        
        <div className="space-y-8">
          {events.map((event, _i) => {
            const Icon = event.icon;
            return (
              <div key={event.id} className="flex gap-6 relative group">
                <div className={`w-16 h-16 rounded-full bg-background border-4 border-background flex items-center justify-center shadow-sm shrink-0 z-10 transition-transform group-hover:scale-110`}>
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center bg-muted/50`}>
                     <Icon className={`w-5 h-5 ${event.color}`} />
                  </div>
                </div>
                <div className="flex-1 pt-3">
                  <div className="bg-card border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                    <span className="text-sm font-semibold text-muted-foreground mb-2 block">{event.date}</span>
                    <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                    <p className="text-muted-foreground">{event.desc}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  );
}
