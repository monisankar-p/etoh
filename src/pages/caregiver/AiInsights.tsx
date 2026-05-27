import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card';
import { BrainCircuit, TrendingUp } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function AiInsights() {
  const deteriorationData = [
    { day: 'Day 1', risk: 20 }, { day: 'Day 2', risk: 22 }, { day: 'Day 3', risk: 25 },
    { day: 'Day 4', risk: 35 }, { day: 'Day 5', risk: 45 }, { day: 'Day 6', risk: 65 }, { day: 'Day 7', risk: 80 }
  ];

  return (
    <div className="p-4 md:p-8 h-full flex flex-col bg-muted/10 overflow-y-auto">
      <div className="mb-8 max-w-5xl mx-auto w-full">
        <h1 className="text-3xl font-bold flex items-center gap-3 mb-2">
          <BrainCircuit className="w-8 h-8 text-violet-500" />
          AI Health Intelligence
        </h1>
        <p className="text-muted-foreground">Predictive health analytics and risk progression for your dependents.</p>
      </div>

      <div className="max-w-5xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="md:col-span-2 shadow-sm border-violet-500/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">Deterioration Intelligence (Arthur Mercer)</CardTitle>
            <CardDescription>Predictive trajectory indicating potential CHF Exacerbation.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={deteriorationData} margin={{ top: 5, right: 0, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorRisk" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--rose-500))" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="hsl(var(--rose-500))" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--muted-foreground)/0.2)" />
                  <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--background))', borderRadius: '8px', border: '1px solid hsl(var(--border))' }} />
                  <Area type="monotone" dataKey="risk" stroke="hsl(var(--rose-500))" strokeWidth={3} fillOpacity={1} fill="url(#colorRisk)" activeDot={{ r: 6 }} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            
            <div className="mt-6 p-4 bg-rose-500/5 border border-rose-500/20 rounded-xl">
               <h3 className="font-bold text-rose-500 flex items-center gap-2 mb-2"><TrendingUp className="w-4 h-4"/> Trajectory Analysis</h3>
               <p className="text-sm text-muted-foreground">Arthur's deterioration probability has increased by 18% over the last 48 hours due to combined factors: Missed medication and sustained elevated resting HR. A proactive clinical intervention is recommended.</p>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader>
             <CardTitle>Martha Mercer (Stable)</CardTitle>
             <CardDescription>Type 2 Diabetes progression</CardDescription>
          </CardHeader>
          <CardContent>
             <div className="flex items-center gap-4">
               <div className="w-16 h-16 rounded-full border-4 border-emerald-500 flex items-center justify-center font-bold text-xl text-emerald-500">
                 A1C
               </div>
               <div>
                 <p className="text-sm font-bold">Stable Glycemic Control</p>
                 <p className="text-xs text-muted-foreground mt-1">Predictions show 92% likelihood of maintaining target range based on current adherence.</p>
               </div>
             </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
