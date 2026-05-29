import { Clock, Activity, FileText, Pill, Sparkles } from 'lucide-react';
import { useTranslation } from '../../i18n';
import TrendCard from '../../components/analytics/TrendCard';
import ScoreGauge from '../../components/analytics/ScoreGauge';
import InsightPanel from '../../components/analytics/InsightPanel';
import { Card } from '../../components/ui/card';

export default function HealthTimeline() {
  const { t } = useTranslation();

  const events = [
    { id: 1, date: 'Oct 12, 2023', type: 'report', title: t('timeline.metabolicPanel'), desc: t('timeline.aiDetectedGlucose'), icon: FileText, color: 'text-blue-500' },
    { id: 2, date: 'Sep 28, 2023', type: 'visit', title: t('timeline.cardiologyConsult'), desc: t('timeline.drChenAdjusted'), icon: Activity, color: 'text-emerald-500' },
    { id: 3, date: 'Sep 15, 2023', type: 'medication', title: t('timeline.startedAtorvastatin'), desc: t('timeline.prescribed20mg'), icon: Pill, color: 'text-primary' },
    { id: 4, date: 'Aug 02, 2023', type: 'ai', title: t('timeline.aiInsight'), desc: t('timeline.irregularSleep'), icon: Sparkles, color: 'text-amber-500' },
  ];

  return (
    <div className="p-4 md:p-8 h-full flex flex-col bg-muted/10 overflow-y-auto">
      <div className="mb-8 max-w-5xl mx-auto w-full">
        <h1 className="text-3xl font-bold flex items-center gap-3 mb-2">
          <Clock className="w-8 h-8 text-primary" />
          {t('timeline.title')}
        </h1>
        <p className="text-muted-foreground">{t('timeline.subtitle')}</p>
      </div>

      <div className="max-w-5xl mx-auto w-full space-y-8 mb-12">
        {/* Analytics Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="flex items-center justify-center p-6 bg-card">
            <ScoreGauge 
              score={82} 
              title={t('timeline.healthScore')} 
              subtitle={t('analytics.trendUp')} 
            />
          </Card>
          <div className="md:col-span-2 grid grid-cols-2 gap-4">
            <TrendCard
              title={t('timeline.hospitalVisits')}
              value="2"
              trend="stable"
              trendLabel={t('analytics.last6Months')}
            />
            <TrendCard
              title={t('timeline.medicationChanges')}
              value="3"
              trend="up"
              trendLabel={t('analytics.last6Months')}
              sparklineData={[1, 1, 2, 2, 3, 3]}
            />
            <TrendCard
              title={t('timeline.majorDiagnoses')}
              value="1"
              trend="stable"
              trendLabel={t('analytics.trendStable')}
            />
            <TrendCard
              title={t('timeline.riskEvolution')}
              value="14%"
              unit="Risk"
              trend="down"
              trendLabel={t('analytics.trendDown')}
              sparklineColor="var(--color-destructive)"
              sparklineData={[10, 11, 11, 12, 13, 14]}
            />
          </div>
        </div>

        <InsightPanel 
          title={t('timeline.aiSummary')}
          insight="Your overall health score has improved by 4% over the last 6 months. Blood pressure management is stabilizing with the new Metoprolol dosage. Focus on sleep regularity to further improve metabolic indicators."
        />
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
