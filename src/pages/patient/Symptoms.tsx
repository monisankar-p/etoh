import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Thermometer, Plus, Activity } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { useTranslation } from '../../i18n';
import TrendCard from '../../components/analytics/TrendCard';
import InsightPanel from '../../components/analytics/InsightPanel';
import { useState } from 'react';
import { SimulatedActionModal } from '../../components/ui/SimulatedActionModal';
import { toast } from 'sonner';

export default function Symptoms() {
  const { t } = useTranslation();
  const [modalOpen, setModalOpen] = useState(false);

  const activeSymptoms = [
    {
      id: 'S-1',
      name: 'Lower Back Pain',
      severity: 'Moderate',
      region: 'Back',
      since: '3 days ago',
      notes: 'Worse in the morning.'
    },
    {
      id: 'S-2',
      name: 'Mild Headache',
      severity: 'Mild',
      region: 'Head',
      since: 'Today',
      notes: 'Intermittent throbbing.'
    }
  ];

  const historicalSymptoms = [
    {
      id: 'S-3',
      name: 'Fatigue',
      severity: 'Severe',
      region: 'General',
      date: 'Sep 14, 2023',
      duration: '4 days'
    },
    {
      id: 'S-4',
      name: 'Chest Tightness',
      severity: 'Moderate',
      region: 'Chest',
      date: 'Aug 21, 2023',
      duration: '1 day'
    }
  ];

  return (
    <div className="p-4 md:p-8 h-full flex flex-col bg-muted/10 overflow-y-auto">
      <div className="mb-8 flex justify-between items-end max-w-5xl mx-auto w-full">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3 mb-2">
            <Thermometer className="w-8 h-8 text-primary" />
            {t('symptoms.title')}
          </h1>
          <p className="text-muted-foreground">{t('symptoms.subtitle')}</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 gap-2" onClick={() => setModalOpen(true)}>
          <Plus className="w-4 h-4" /> {t('symptoms.logNew')}
        </Button>
      </div>

      <div className="max-w-5xl mx-auto w-full grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>{t('symptoms.active')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {activeSymptoms.map((sym) => (
                <div key={sym.id} className="p-5 rounded-xl border bg-background hover:shadow-md transition-shadow flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h3 className="font-bold text-lg flex items-center gap-2">
                      {sym.name}
                      <span className={`text-[10px] uppercase px-2 py-0.5 rounded-full font-bold ${
                        sym.severity === 'Severe' ? 'bg-destructive/10 text-destructive' :
                        sym.severity === 'Moderate' ? 'bg-amber-500/10 text-amber-600' :
                        'bg-emerald-500/10 text-emerald-600'
                      }`}>
                        {sym.severity === 'Severe' ? t('symptoms.severe') : sym.severity === 'Moderate' ? t('symptoms.moderate') : t('symptoms.mild')}
                      </span>
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">{t('symptoms.bodyRegion')}: {sym.region} • {t('symptoms.since')}: {sym.since}</p>
                    <p className="text-sm mt-2 bg-muted/30 p-2 rounded-lg italic">"{sym.notes}"</p>
                  </div>
                  <Button variant="outline" size="sm">{t('analytics.viewDetails')}</Button>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t('symptoms.history')}</CardTitle>
            </CardHeader>
            <CardContent>
               <div className="space-y-4">
                {historicalSymptoms.map((sym) => (
                  <div key={sym.id} className="p-4 rounded-xl border flex justify-between items-center bg-background">
                    <div>
                      <p className="font-bold">{sym.name}</p>
                      <p className="text-xs text-muted-foreground">{sym.date} • {t('symptoms.duration')}: {sym.duration}</p>
                    </div>
                    <div className="text-right">
                       <span className={`text-xs font-bold uppercase px-2 py-1 rounded ${
                         sym.severity === 'Severe' ? 'text-destructive bg-destructive/10' :
                         sym.severity === 'Moderate' ? 'text-amber-600 bg-amber-500/10' :
                         'text-emerald-600 bg-emerald-500/10'
                       }`}>
                         {sym.severity === 'Severe' ? t('symptoms.severe') : sym.severity === 'Moderate' ? t('symptoms.moderate') : t('symptoms.mild')}
                       </span>
                    </div>
                  </div>
                ))}
               </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
            <TrendCard 
              title={t('symptoms.frequencyAnalysis')} 
              value="4 logs" 
              trend="stable" 
              trendLabel="vs last month" 
            />

            <InsightPanel 
              title={t('symptoms.correlations')}
              insight="etoh AI noted that your 'Lower Back Pain' correlates with periods of high stress and decreased physical activity as tracked by your Apple Health integration."
            />
            
            <Card>
              <CardHeader>
                <CardTitle className="text-sm uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                  <Activity className="w-4 h-4" /> {t('symptoms.patterns')}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                 <div className="flex justify-between items-center pb-2 border-b">
                   <span className="font-medium">{t('symptoms.head')} (Headache)</span>
                   <span>12 {t('symptoms.occurrences')}</span>
                 </div>
                 <div className="flex justify-between items-center pb-2 border-b">
                   <span className="font-medium">{t('symptoms.chest')}</span>
                   <span className="text-amber-500 font-bold">3 {t('symptoms.occurrences')}</span>
                 </div>
                 <div className="flex justify-between items-center">
                   <span className="font-medium">{t('symptoms.general')} (Fatigue)</span>
                   <span>8 {t('symptoms.occurrences')}</span>
                 </div>
              </CardContent>
            </Card>
        </div>
      </div>

      <SimulatedActionModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={t('symptoms.logNew')}
        description="Record details about your current symptom to track it over time."
        type="form"
        actionLabel="Save Symptom"
        fields={[
          { name: 'name', label: 'Symptom Name', placeholder: 'e.g., Headache' },
          { name: 'severity', label: 'Severity', placeholder: 'Mild, Moderate, Severe' },
          { name: 'notes', label: 'Additional Notes', placeholder: 'Any specific triggers or details?' }
        ]}
        onActionComplete={() => toast.success('Symptom logged successfully!')}
      />
    </div>
  );
}
