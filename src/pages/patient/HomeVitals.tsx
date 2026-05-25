import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card';
import { Activity, HeartPulse, Droplet, Wind, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { generateVitalsTimeline } from '../../mock/data';

export default function HomeVitals() {
  const vitalsData = generateVitalsTimeline();

  const MetricCard = ({ title, value, unit, icon: Icon, trend, color, trendUp }: any) => (
    <Card className={`border-l-4 border-l-${color}-500`}>
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <div className="flex items-baseline gap-1 mt-2">
              <p className="text-3xl font-bold">{value}</p>
              <span className="text-sm text-muted-foreground font-medium">{unit}</span>
            </div>
          </div>
          <div className={`p-3 bg-${color}-500/10 rounded-full`}>
            <Icon className={`w-5 h-5 text-${color}-500`} />
          </div>
        </div>
        <p className={`text-xs mt-4 flex items-center font-medium ${trendUp ? 'text-emerald-500' : 'text-destructive'}`}>
          {trendUp ? <ArrowUpRight className="w-3 h-3 mr-1" /> : <ArrowDownRight className="w-3 h-3 mr-1" />}
          {trend}
        </p>
      </CardContent>
    </Card>
  );

  return (
    <div className="p-8 h-full flex flex-col bg-muted/10 overflow-y-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold flex items-center gap-3">
          <Activity className="w-8 h-8 text-primary" />
          Home Vitals Monitoring
        </h1>
        <p className="text-muted-foreground mt-2">Real-time sync from your Apple Health and connected wearables.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <MetricCard title="Resting Heart Rate" value="72" unit="bpm" icon={HeartPulse} trend="Stable vs yesterday" color="emerald" trendUp={true} />
        <MetricCard title="Blood Pressure" value="118/78" unit="mmHg" icon={Activity} trend="Slightly elevated" color="primary" trendUp={false} />
        <MetricCard title="Blood Oxygen" value="98" unit="%" icon={Wind} trend="Optimal" color="blue" trendUp={true} />
        <MetricCard title="Glucose (Fasting)" value="108" unit="mg/dL" icon={Droplet} trend="Review recommended" color="amber" trendUp={false} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="h-[400px]">
          <CardHeader>
            <CardTitle>Heart Rate Trends</CardTitle>
            <CardDescription>Last 24 hours</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
             <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={vitalsData}>
                <defs>
                  <linearGradient id="colorHr" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="time" tickLine={false} axisLine={false} fontSize={12} />
                <YAxis domain={['dataMin - 10', 'dataMax + 10']} tickLine={false} axisLine={false} fontSize={12} />
                <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', borderRadius: '8px', border: '1px solid hsl(var(--border))' }} />
                <Area type="monotone" dataKey="heartRate" stroke="#10b981" fillOpacity={1} fill="url(#colorHr)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="h-[400px]">
          <CardHeader>
            <CardTitle>Blood Pressure Fluctuations</CardTitle>
            <CardDescription>Systolic tracking over 24h</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
             <ResponsiveContainer width="100%" height="100%">
              <LineChart data={vitalsData}>
                <XAxis dataKey="time" tickLine={false} axisLine={false} fontSize={12} />
                <YAxis domain={['auto', 'auto']} tickLine={false} axisLine={false} fontSize={12} />
                <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', borderRadius: '8px', border: '1px solid hsl(var(--border))' }} />
                <Line type="monotone" dataKey="bloodPressure" stroke="hsl(var(--primary))" strokeWidth={3} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
