import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Pill, AlertTriangle, Clock, RotateCcw, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';
import { SimulatedActionModal } from '../../components/ui/SimulatedActionModal';
import { useTranslation } from '../../i18n';
import ScoreGauge from '../../components/analytics/ScoreGauge';
import TrendCard from '../../components/analytics/TrendCard';
import InsightPanel from '../../components/analytics/InsightPanel';

export default function Prescriptions() {
  const { t } = useTranslation();

  const [activeMeds, setActiveMeds] = useState([
    { id: 1, name: 'Metoprolol', dosage: '50mg', frequency: t('meds.twiceDaily'), status: 'active', remaining: 14, refillStatus: 'available', alert: null },
    { id: 2, name: 'Atorvastatin', dosage: '20mg', frequency: t('meds.onceDailyBedtime'), status: 'active', remaining: 30, refillStatus: 'not_needed', alert: null },
    { id: 3, name: 'Ibuprofen', dosage: '400mg', frequency: t('meds.asNeeded'), status: 'caution', remaining: 5, refillStatus: 'available', alert: 'Potential interaction with Warfarin' },
  ]);

  const [modalConfig, setModalConfig] = useState<{isOpen: boolean; title: string; medId: number; medName: string}>({ isOpen: false, title: '', medId: 0, medName: '' });

  const handleRefillRequest = (id: number, name: string) => {
    setModalConfig({ isOpen: true, title: t('meds.requestRefill'), medId: id, medName: name });
  };

  const confirmRefill = () => {
    setActiveMeds(meds => meds.map(med => 
      med.id === modalConfig.medId ? { ...med, refillStatus: 'requested' } : med
    ));
    toast.success(`${t('meds.refillRequested')} ${modalConfig.medName}`);
  };

  return (
    <div className="p-4 md:p-8 h-full flex flex-col bg-muted/10 overflow-y-auto">
      <div className="mb-8 max-w-6xl mx-auto w-full">
        <h1 className="text-3xl font-bold flex items-center gap-3">
          <Pill className="w-8 h-8 text-primary" />
          {t('meds.title')}
        </h1>
        <p className="text-muted-foreground mt-2">{t('meds.subtitle')}</p>
      </div>

      <div className="max-w-6xl mx-auto w-full space-y-8 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="flex items-center justify-center p-6 bg-card">
            <ScoreGauge 
              score={92} 
              title={t('meds.adherenceScore')} 
              subtitle={t('analytics.trendStable')} 
            />
          </Card>
          <div className="md:col-span-2 grid grid-cols-2 gap-4">
            <TrendCard
              title={t('meds.adherenceTrend')}
              value="92%"
              trend="stable"
              trendLabel={t('analytics.last30Days')}
              sparklineData={[85, 88, 90, 92, 92, 92]}
            />
            <TrendCard
              title={t('meds.missedDoses')}
              value="2"
              trend="up"
              trendLabel={t('analytics.trendUp')}
              sparklineColor="var(--color-emerald-500)"
              sparklineData={[5, 4, 3, 2, 2, 2]}
            />
          </div>
        </div>

        <InsightPanel 
          title={t('analytics.aiInsight')}
          insight="Your medication adherence is excellent at 92%. However, there is a known caution alert between Ibuprofen and Warfarin. Consider using an alternative pain reliever after consulting Dr. Chen."
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-6xl mx-auto w-full">
        <div className="lg:col-span-2 space-y-4">
          {activeMeds.map((med) => (
            <Card key={med.id} className={`overflow-hidden transition-all hover:shadow-md ${med.status === 'caution' ? 'border-amber-500/50 bg-amber-500/5' : ''}`}>
              <div className="flex flex-col sm:flex-row">
                <div className={`p-6 flex items-center justify-center border-b sm:border-b-0 sm:border-r w-full sm:w-48 shrink-0 ${med.status === 'caution' ? 'bg-amber-500/10' : 'bg-muted/30'}`}>
                   <Pill className={`w-12 h-12 ${med.status === 'caution' ? 'text-amber-500' : 'text-primary'}`} />
                </div>
                <CardContent className="p-6 flex-1 flex flex-col justify-center">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-xl font-bold">{med.name}</h3>
                      <p className="text-lg font-medium text-muted-foreground">{med.dosage}</p>
                    </div>
                    {med.status === 'caution' && (
                      <span className="flex items-center gap-1 text-xs font-bold uppercase tracking-wider px-2 py-1 bg-amber-500 text-white rounded">
                        <AlertTriangle className="w-3 h-3" /> {t('meds.caution')}
                      </span>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm text-foreground mt-4 mb-2">
                    <Clock className="w-4 h-4 text-primary" />
                    <span>{med.frequency}</span>
                  </div>

                  {med.alert && (
                    <div className="p-3 bg-amber-500/10 text-amber-700 dark:text-amber-400 rounded-lg text-sm flex items-start gap-2 mt-2">
                      <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                      <p><strong>{t('meds.safetyAlert')}</strong> {med.alert}. {t('meds.consultDoctor')}</p>
                    </div>
                  )}

                  <div className="flex justify-between items-center mt-6 pt-4 border-t">
                     <p className="text-sm font-medium text-muted-foreground">
                       {t('meds.remaining', { count: med.remaining.toString() })}
                     </p>
                     {med.refillStatus === 'available' && (
                       <Button size="sm" variant="outline" className="gap-2" onClick={() => handleRefillRequest(med.id, med.name)}>
                         <RotateCcw className="w-4 h-4" /> {t('meds.requestRefill')}
                       </Button>
                     )}
                     {med.refillStatus === 'requested' && (
                       <div className="flex items-center gap-1 text-amber-500 text-sm font-medium px-3 py-1.5 bg-amber-500/10 rounded-md">
                         <Clock className="w-4 h-4" /> {t('meds.refillRequested')}
                       </div>
                     )}
                     {med.refillStatus === 'not_needed' && (
                       <div className="flex items-center gap-1 text-emerald-500 text-sm font-medium">
                         <CheckCircle2 className="w-4 h-4" /> {t('meds.refillNotNeeded')}
                       </div>
                     )}
                  </div>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>

        <div className="space-y-6">
          <Card className="bg-primary text-primary-foreground border-none">
            <CardHeader>
              <CardTitle>{t('meds.pharmacyPickup')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-white/10 p-4 rounded-xl space-y-2">
                <p className="font-semibold">CVS Pharmacy #1234</p>
                <p className="text-sm text-primary-foreground/80">123 Health Ave, Medical City</p>
                <div className="pt-2 mt-2 border-t border-white/20">
                  <p className="text-xs font-bold uppercase">{t('meds.status')}</p>
                  <p className="text-sm">{t('meds.readyForPickup')}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">{t('meds.pastMedications')}</CardTitle>
              <CardDescription>{t('meds.recentlyDiscontinued')}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
               <div className="flex justify-between items-center p-3 rounded-lg border bg-muted/30">
                 <div>
                   <p className="font-medium line-through text-muted-foreground">Amoxicillin 500mg</p>
                   <p className="text-xs text-muted-foreground">{t('meds.courseCompleted')}</p>
                 </div>
               </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <SimulatedActionModal
        isOpen={modalConfig.isOpen}
        onClose={() => setModalConfig({ isOpen: false, title: '', medId: 0, medName: '' })}
        title={modalConfig.title}
        description={t('meds.confirmRefill', { name: modalConfig.medName })}
        type="form"
        actionLabel={t('meds.submitRequest')}
        fields={[
          { name: 'pharmacy', label: t('meds.preferredPharmacy'), placeholder: 'e.g. CVS Pharmacy #1234' },
          { name: 'notes', label: t('meds.additionalNotes'), placeholder: 'Any messages for the doctor?' },
        ]}
        onActionComplete={confirmRefill}
      />
    </div>
  );
}
