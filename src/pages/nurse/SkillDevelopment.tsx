import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card';
import { BookOpen, Target, ShieldCheck, PlayCircle, GraduationCap } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { toast } from 'sonner';

export default function SkillDevelopment() {
  const certifications = [
    { name: 'Advanced Cardiovascular Life Support (ACLS)', expires: 'Nov 2025', status: 'Valid' },
    { name: 'Pediatric Advanced Life Support (PALS)', expires: 'Oct 2023', status: 'Expiring Soon' },
    { name: 'NIH Stroke Scale Certification', expires: 'Jan 2026', status: 'Valid' },
  ];

  return (
    <div className="p-8 h-full flex flex-col bg-muted/10 overflow-y-auto">
      <div className="mb-8 flex justify-between items-end max-w-5xl mx-auto w-full">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3 mb-2">
            <GraduationCap className="w-8 h-8 text-amber-500" />
            Skill Development & Competency
          </h1>
          <p className="text-muted-foreground">Track certifications, complete CEUs, and monitor your clinical growth.</p>
        </div>
        <Button className="bg-amber-500 hover:bg-amber-600 gap-2" onClick={() => toast.info('Loading course catalog...')}>
          <BookOpen className="w-4 h-4" /> Browse Course Catalog
        </Button>
      </div>

      <div className="max-w-5xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Target className="w-5 h-5 text-amber-500" /> Competency Heatmap</CardTitle>
              <CardDescription>AI-generated breakdown based on your clinical rotations.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1"><span className="font-bold">IV Therapy & Phlebotomy</span> <span className="text-emerald-500 font-bold">Expert</span></div>
                  <div className="w-full bg-muted rounded-full h-2"><div className="bg-emerald-500 h-2 rounded-full" style={{ width: '95%' }} /></div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1"><span className="font-bold">Wound Care Management</span> <span className="text-primary font-bold">Advanced</span></div>
                  <div className="w-full bg-muted rounded-full h-2"><div className="bg-primary h-2 rounded-full" style={{ width: '80%' }} /></div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1"><span className="font-bold">Telemetry Interpretation</span> <span className="text-amber-500 font-bold">Intermediate</span></div>
                  <div className="w-full bg-muted rounded-full h-2"><div className="bg-amber-500 h-2 rounded-full" style={{ width: '60%' }} /></div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1"><span className="font-bold">Ventilator Management</span> <span className="text-muted-foreground font-bold">Beginner</span></div>
                  <div className="w-full bg-muted rounded-full h-2"><div className="bg-muted-foreground h-2 rounded-full" style={{ width: '25%' }} /></div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-amber-500/20 bg-amber-500/5">
             <CardContent className="p-6">
               <h3 className="font-bold text-amber-700 dark:text-amber-400 mb-2">Recommended Training</h3>
               <div className="bg-background border rounded-xl p-4 flex items-center justify-between">
                 <div className="flex items-center gap-3">
                   <div className="w-10 h-10 bg-amber-500/20 rounded flex items-center justify-center shrink-0">
                     <PlayCircle className="w-5 h-5 text-amber-600" />
                   </div>
                   <div>
                     <p className="font-bold text-sm">Advanced Telemetry Mastery</p>
                     <p className="text-xs text-muted-foreground">3h 45m • 4 CME Credits</p>
                   </div>
                 </div>
                 <Button size="sm" variant="outline" className="text-amber-600 border-amber-500 hover:bg-amber-500 hover:text-white" onClick={() => toast.success('Starting module: Advanced Telemetry Mastery')}>Start</Button>
               </div>
             </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><ShieldCheck className="w-5 h-5 text-emerald-500" /> Active Certifications</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {certifications.map((cert, idx) => (
                <div key={idx} className="p-4 border rounded-xl bg-background flex justify-between items-center hover:border-amber-500/50 transition-colors">
                  <div>
                    <h3 className="font-bold text-sm">{cert.name}</h3>
                    <p className="text-xs text-muted-foreground mt-1">Expires: {cert.expires}</p>
                  </div>
                  <div>
                    <span className={`text-[10px] uppercase font-bold px-2 py-1 rounded ${
                      cert.status === 'Valid' ? 'bg-emerald-500/10 text-emerald-600' : 'bg-destructive/10 text-destructive'
                    }`}>
                      {cert.status}
                    </span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
