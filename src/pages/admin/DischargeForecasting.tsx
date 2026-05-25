import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card';
import { CalendarDays, TrendingUp, Users, ArrowUpRight, ArrowDownRight, Clock, Download } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar, CartesianGrid } from 'recharts';
import { Button } from '../../components/ui/button';
import { toast } from 'sonner';

export default function DischargeForecasting() {
  const forecastData = [
    { day: 'Mon', actual: 12, predicted: 14 },
    { day: 'Tue', actual: 15, predicted: 16 },
    { day: 'Wed', actual: 18, predicted: 17 },
    { day: 'Thu', actual: 10, predicted: 12 },
    { day: 'Fri', actual: null, predicted: 22 },
    { day: 'Sat', actual: null, predicted: 25 },
    { day: 'Sun', actual: null, predicted: 14 },
  ];

  return (
    <div className="p-8 h-full flex flex-col bg-muted/10 overflow-y-auto">
      <div className="mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3 mb-2">
            <CalendarDays className="w-8 h-8 text-purple-500" />
            Discharge Forecasting
          </h1>
          <p className="text-muted-foreground">AI-predicted resource utilization and patient movement analytics.</p>
        </div>
        <Button className="bg-purple-500 hover:bg-purple-600 gap-2" onClick={() => toast.success('Exporting predictive model...', { description: 'Generating CSV...' })}>
          <Download className="w-4 h-4" /> Export Forecast
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="border-l-4 border-l-purple-500">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Predicted Discharges (48h)</p>
                <p className="text-3xl font-bold mt-2 text-foreground">47</p>
              </div>
              <div className="p-3 bg-purple-500/10 rounded-full">
                <Users className="w-5 h-5 text-purple-500" />
              </div>
            </div>
            <p className="text-xs text-emerald-500 mt-4 font-medium flex items-center gap-1"><ArrowUpRight className="w-3 h-3" /> 12% higher than average</p>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-amber-500">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg Length of Stay (ALOS)</p>
                <p className="text-3xl font-bold mt-2">4.2 <span className="text-sm font-normal text-muted-foreground">days</span></p>
              </div>
              <div className="p-3 bg-amber-500/10 rounded-full">
                <Clock className="w-5 h-5 text-amber-500" />
              </div>
            </div>
            <p className="text-xs text-emerald-500 mt-4 font-medium flex items-center gap-1"><ArrowDownRight className="w-3 h-3" /> 0.3 days reduction via AI paths</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-emerald-500">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Bed Turnover Rate</p>
                <p className="text-3xl font-bold mt-2">92%</p>
              </div>
              <div className="p-3 bg-emerald-500/10 rounded-full">
                <TrendingUp className="w-5 h-5 text-emerald-500" />
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-4 font-medium">Optimal efficiency</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Discharge Volume Forecast</CardTitle>
            <CardDescription>etoh AI 7-day predictive modeling</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={forecastData}>
                <defs>
                  <linearGradient id="colorPredicted" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#a855f7" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#a855f7" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="day" tickLine={false} axisLine={false} fontSize={12} />
                <YAxis tickLine={false} axisLine={false} fontSize={12} />
                <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', borderRadius: '8px', border: '1px solid hsl(var(--border))' }} />
                <Area type="monotone" dataKey="predicted" stroke="#a855f7" strokeWidth={3} strokeDasharray="5 5" fill="url(#colorPredicted)" name="AI Prediction" />
                <Area type="monotone" dataKey="actual" stroke="hsl(var(--primary))" strokeWidth={3} fill="transparent" name="Actual Discharges" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Discharge Bottlenecks</CardTitle>
            <CardDescription>Primary reasons for delayed discharges</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={[
                { reason: 'Pending Labs', count: 24 },
                { reason: 'Insurance Auth', count: 18 },
                { reason: 'Transport', count: 12 },
                { reason: 'Consult Note', count: 8 },
              ]} layout="vertical" margin={{ left: 30 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="hsl(var(--border))" />
                <XAxis type="number" tickLine={false} axisLine={false} fontSize={12} />
                <YAxis dataKey="reason" type="category" tickLine={false} axisLine={false} fontSize={12} />
                <Tooltip cursor={{fill: 'hsl(var(--muted))'}} contentStyle={{ backgroundColor: 'hsl(var(--card))', borderRadius: '8px', border: '1px solid hsl(var(--border))' }} />
                <Bar dataKey="count" fill="#f59e0b" radius={[0, 4, 4, 0]} name="Occurrences" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
