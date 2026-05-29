import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card';
import { Activity, HeartPulse, Droplet, Wind, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { generateVitalsTimeline } from '../../mock/data';
import { useTranslation } from '../../i18n';
import InsightPanel from '../../components/analytics/InsightPanel';

export default function HomeVitals() {
  const { t } = useTranslation();
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
    <div className="p-4 md:p-8 h-full flex flex-col bg-muted/10 overflow-y-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold flex items-center gap-3">
          <Activity className="w-8 h-8 text-primary" />
          {t('vitals.title')}
        </h1>
        <p className="text-muted-foreground mt-2">{t('vitals.subtitle')}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <MetricCard title={t('vitals.restingHR')} value="72" unit={t('vitals.bpm')} icon={HeartPulse} trend={t('vitals.stableYesterday')} color="emerald" trendUp={true} />
        <MetricCard title={t('vitals.bp')} value="118/78" unit={t('vitals.mmHg')} icon={Activity} trend={t('vitals.slightlyElevated')} color="primary" trendUp={false} />
        <MetricCard title={t('vitals.bloodOxygen')} value="98" unit={t('vitals.percent')} icon={Wind} trend={t('vitals.optimal')} color="blue" trendUp={true} />
        <MetricCard title={t('vitals.glucose')} value="108" unit={t('vitals.mgdl')} icon={Droplet} trend={t('vitals.reviewRecommended')} color="amber" trendUp={false} />
      </div>

      <div className="mb-8">
        <InsightPanel 
          title={t('vitals.aiInsights')}
          insight="Vitals are stabilizing. The recent change in Metoprolol dosage seems to have effectively controlled resting heart rate. Fasting glucose is slightly elevated compared to your baseline; consider logging your dietary intake today."
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="h-[400px]">
          <CardHeader>
            <CardTitle>{t('vitals.hrTrends')}</CardTitle>
            <CardDescription>{t('vitals.last24h')}</CardDescription>
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
            <CardTitle>{t('vitals.bpFluctuations')}</CardTitle>
            <CardDescription>{t('vitals.systolicTracking')}</CardDescription>
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
