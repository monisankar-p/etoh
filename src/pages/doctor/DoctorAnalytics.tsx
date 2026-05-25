import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card';
import { Activity, AlertTriangle, TrendingUp, Users } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar, CartesianGrid } from 'recharts';

export default function DoctorAnalytics() {
  const riskData = [
    { day: 'Mon', highRisk: 12, mediumRisk: 24, lowRisk: 45 },
    { day: 'Tue', highRisk: 15, mediumRisk: 22, lowRisk: 50 },
    { day: 'Wed', highRisk: 10, mediumRisk: 28, lowRisk: 48 },
    { day: 'Thu', highRisk: 8, mediumRisk: 30, lowRisk: 55 },
    { day: 'Fri', highRisk: 18, mediumRisk: 25, lowRisk: 42 },
    { day: 'Sat', highRisk: 22, mediumRisk: 20, lowRisk: 38 },
    { day: 'Sun', highRisk: 14, mediumRisk: 21, lowRisk: 40 },
  ];

  const deteriorationData = [
    { time: '00:00', score: 20 },
    { time: '04:00', score: 22 },
    { time: '08:00', score: 45 },
    { time: '12:00', score: 68 },
    { time: '16:00', score: 55 },
    { time: '20:00', score: 30 },
  ];

  return (
    <div className="p-8 h-full flex flex-col bg-muted/10 overflow-y-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold flex items-center gap-3 mb-2">
          <Activity className="w-8 h-8 text-emerald-500" />
          ROIC Deterioration Dashboard
        </h1>
        <p className="text-muted-foreground">Risk of In-Hospital Clinical Deterioration, powered by predictive AI.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="border-l-4 border-l-destructive bg-destructive/5">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-destructive">High Risk Patients</p>
                <p className="text-3xl font-bold mt-2 text-foreground">14</p>
              </div>
              <div className="p-3 bg-destructive/10 rounded-full">
                <AlertTriangle className="w-5 h-5 text-destructive" />
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-4 font-medium">Require immediate review</p>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-amber-500">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Average ROIC Score</p>
                <p className="text-3xl font-bold mt-2">42<span className="text-sm font-normal text-muted-foreground">/100</span></p>
              </div>
              <div className="p-3 bg-amber-500/10 rounded-full">
                <TrendingUp className="w-5 h-5 text-amber-500" />
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-4 font-medium text-amber-500">+5% vs yesterday</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-emerald-500">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Monitored</p>
                <p className="text-3xl font-bold mt-2">86</p>
              </div>
              <div className="p-3 bg-emerald-500/10 rounded-full">
                <Users className="w-5 h-5 text-emerald-500" />
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-4 font-medium">Across all your wards</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Ward Risk Distribution</CardTitle>
            <CardDescription>Patient count by risk stratification (7 days)</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={riskData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                <XAxis dataKey="day" tickLine={false} axisLine={false} fontSize={12} />
                <YAxis tickLine={false} axisLine={false} fontSize={12} />
                <Tooltip 
                  cursor={{fill: 'hsl(var(--muted))'}}
                  contentStyle={{ backgroundColor: 'hsl(var(--card))', borderRadius: '8px', border: '1px solid hsl(var(--border))' }}
                />
                <Bar dataKey="highRisk" stackId="a" fill="hsl(var(--destructive))" name="High Risk" />
                <Bar dataKey="mediumRisk" stackId="a" fill="#f59e0b" name="Medium Risk" />
                <Bar dataKey="lowRisk" stackId="a" fill="#10b981" radius={[4, 4, 0, 0]} name="Low Risk" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Predictive Deterioration Spike</CardTitle>
            <CardDescription>AI forecasted anomaly in ward ICU-A</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={deteriorationData}>
                <defs>
                  <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--destructive))" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="hsl(var(--destructive))" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="time" tickLine={false} axisLine={false} fontSize={12} />
                <YAxis tickLine={false} axisLine={false} fontSize={12} domain={[0, 100]} />
                <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', borderRadius: '8px', border: '1px solid hsl(var(--border))' }} />
                <Area type="monotone" dataKey="score" stroke="hsl(var(--destructive))" strokeWidth={3} fill="url(#colorScore)" name="Risk Score" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
