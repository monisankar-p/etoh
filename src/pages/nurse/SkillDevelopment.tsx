import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card';
import { BookOpen, Target, ShieldCheck, PlayCircle, GraduationCap, TrendingUp, UserCheck, Stethoscope, Activity, Heart, ArrowRight } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { toast } from 'sonner';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

export default function SkillDevelopment() {
  const certifications = [
    { name: 'Advanced Cardiovascular Life Support (ACLS)', expires: 'Nov 2025', status: 'Valid' },
    { name: 'Pediatric Advanced Life Support (PALS)', expires: 'Oct 2023', status: 'Expiring Soon' },
    { name: 'NIH Stroke Scale Certification', expires: 'Jan 2026', status: 'Valid' },
    { name: 'Critical Care Registered Nurse (CCRN)', expires: 'Mar 2027', status: 'Valid' }
  ];

  const skillData = [
    { subject: 'ICU', score: 9.5 },
    { subject: 'Emergency', score: 8.5 },
    { subject: 'Pediatric', score: 7.0 },
    { subject: 'Elderly', score: 9.0 },
    { subject: 'Home Care', score: 6.5 },
    { subject: 'Wound Care', score: 8.8 },
    { subject: 'Ventilator', score: 9.2 },
  ];

  const growthData = [
    { month: 'Jan', score: 65 },
    { month: 'Feb', score: 68 },
    { month: 'Mar', score: 72 },
    { month: 'Apr', score: 75 },
    { month: 'May', score: 82 },
    { month: 'Jun', score: 88 },
    { month: 'Jul', score: 87 },
    { month: 'Aug', score: 91 },
  ];

  return (
    <div className="p-4 md:p-8 h-full flex flex-col bg-muted/10 overflow-y-auto">
      <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 max-w-7xl mx-auto w-full">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3 mb-2">
            <GraduationCap className="w-8 h-8 text-amber-500" />
            Workforce Intelligence Platform
          </h1>
          <p className="text-muted-foreground">AI-driven skill profiling, competency scoring, and career growth analytics.</p>
        </div>
        <Button className="bg-amber-500 hover:bg-amber-600 gap-2" onClick={() => toast.info('Loading course catalog...')}>
          <BookOpen className="w-4 h-4" /> Course Catalog
        </Button>
      </div>

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Main Analytics Area */}
        <div className="lg:col-span-2 space-y-6">

          {/* Competency Scoring */}
          <Card className="shadow-sm border-amber-500/20">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2"><Target className="w-5 h-5 text-amber-500" /> Competency Scoring</CardTitle>
              <CardDescription>Real-time skill profiling across skill set.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="w-full space-y-5 mt-4">
                {skillData.map((skill, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between text-sm mb-1.5">
                      <span className="font-bold">{skill.subject}</span>
                      <span className="font-bold text-amber-600">{skill.score} / 10</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className="bg-amber-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${(skill.score / 10) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Career Growth Tracking */}
          <Card className="shadow-sm border-amber-500/20">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2"><TrendingUp className="w-5 h-5 text-amber-500" /> Career Growth & Performance Analytics</CardTitle>
              <CardDescription>Overall clinical competency score progression over the last 8 months.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[250px] w-full mt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={growthData} margin={{ top: 5, right: 30, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--amber-500))" stopOpacity={0.4} />
                        <stop offset="95%" stopColor="hsl(var(--amber-500))" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--muted-foreground)/0.15)" />
                    <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} tickMargin={10} />
                    <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} domain={['dataMin - 5', 'dataMax + 5']} tickMargin={10} />
                    <Tooltip
                      contentStyle={{ backgroundColor: 'hsl(var(--background))', borderRadius: '12px', border: '1px solid hsl(var(--border))', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                      itemStyle={{ fontSize: '14px', fontWeight: 600, color: 'hsl(var(--amber-500))' }}
                      cursor={{ stroke: 'hsl(var(--muted-foreground)/0.3)', strokeWidth: 1, strokeDasharray: '4 4' }}
                    />
                    <Area type="monotone" dataKey="score" stroke="hsl(var(--amber-500))" strokeWidth={4} fillOpacity={1} fill="url(#colorScore)" activeDot={{ r: 8, strokeWidth: 0, fill: "hsl(var(--amber-500))" }} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

        </div>

        {/* Sidebar */}
        <div className="space-y-6">

          {/* AI Patient Matching */}
          <Card className="bg-gradient-to-br from-amber-500/10 to-transparent border-amber-500/30 shadow-md relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
              <Heart className="w-24 h-24" />
            </div>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2"><UserCheck className="w-5 h-5 text-amber-600" /> Patient Matching</CardTitle>
              <CardDescription>Optimal incoming patient assignments based on your active skill profile.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 relative z-10">
              <div className="bg-background p-4 rounded-xl border shadow-sm">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <span className="text-xs font-bold bg-rose-500/10 text-rose-600 px-2 py-0.5 rounded uppercase">High Acuity</span>
                    <h3 className="font-bold text-sm mt-1">Incoming ICU Patient (Bed 4)</h3>
                    <p className="text-xs text-muted-foreground mt-0.5">Requires immediate ventilator onboarding and complex wound care.</p>
                  </div>
                  <div className="w-12 h-12 rounded-full border-4 border-emerald-500 flex items-center justify-center font-bold text-emerald-600 text-sm bg-emerald-500/10 shrink-0">
                    94%
                  </div>
                </div>
                <div className="text-[10px] text-muted-foreground mb-3 flex gap-2">
                  <span className="flex items-center gap-1"><Activity className="w-3 h-3" /> Matches your ICU Expert profile</span>
                </div>
                <Button size="sm" className="w-full bg-amber-500 hover:bg-amber-600" onClick={() => toast.success('Assigned to Bed 4')}>Accept Assignment</Button>
              </div>

              <div className="bg-background p-4 rounded-xl border shadow-sm opacity-70">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <span className="text-xs font-bold bg-blue-500/10 text-blue-600 px-2 py-0.5 rounded uppercase">Routine</span>
                    <h3 className="font-bold text-sm mt-1">Elderly Care Transfer</h3>
                    <p className="text-xs text-muted-foreground mt-0.5">Post-op monitoring.</p>
                  </div>
                  <div className="w-12 h-12 rounded-full border-4 border-amber-500 flex items-center justify-center font-bold text-amber-600 text-sm bg-amber-500/10 shrink-0">
                    88%
                  </div>
                </div>
                <Button size="sm" variant="outline" className="w-full text-xs">View Details</Button>
              </div>
            </CardContent>
          </Card>

          {/* Clinical Assessments & Learning */}
          <Card className="border-emerald-500/20 bg-emerald-500/5">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2"><Stethoscope className="w-5 h-5 text-emerald-600" /> Clinical Assessments</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-xs text-emerald-700/80 dark:text-emerald-400/80 mb-2">Your Pediatric score is below the unit average. Recommended learning modules:</p>
              <div className="bg-background border rounded-xl p-3 hover:border-emerald-500/50 cursor-pointer transition-colors" onClick={() => toast.success('Starting module...')}>
                <div className="flex justify-between items-center mb-1">
                  <p className="font-bold text-sm">Pediatric Emergency Protocols</p>
                  <PlayCircle className="w-4 h-4 text-emerald-600" />
                </div>
                <p className="text-[10px] text-muted-foreground">Interactive simulation • +10 Ped Points</p>
              </div>
              <div className="bg-background border rounded-xl p-3 hover:border-emerald-500/50 cursor-pointer transition-colors" onClick={() => toast.success('Starting assessment...')}>
                <div className="flex justify-between items-center mb-1">
                  <p className="font-bold text-sm">Quarterly Vent Check</p>
                  <ArrowRight className="w-4 h-4 text-emerald-600" />
                </div>
                <p className="text-[10px] text-muted-foreground">Practical Assessment • Due in 5 days</p>
              </div>
            </CardContent>
          </Card>

          {/* Active Certifications */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2"><ShieldCheck className="w-5 h-5 text-primary" /> Active Certifications</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {certifications.map((cert, idx) => (
                <div key={idx} className="p-3 border rounded-xl bg-background flex justify-between items-center hover:bg-muted/30 transition-colors">
                  <div>
                    <h3 className="font-bold text-xs">{cert.name}</h3>
                    <p className="text-[10px] text-muted-foreground mt-0.5">Expires: {cert.expires}</p>
                  </div>
                  <div>
                    <span className={`text-[9px] uppercase font-bold px-1.5 py-0.5 rounded ${cert.status === 'Valid' ? 'bg-emerald-500/10 text-emerald-600' : 'bg-destructive/10 text-destructive'
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
