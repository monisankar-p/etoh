import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { FileImage, Calendar, CheckCircle2, AlertTriangle, FileText } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { DocumentViewer } from '../../components/ui/DocumentViewer';
import { SimulatedActionModal } from '../../components/ui/SimulatedActionModal';
import { useTranslation } from '../../i18n';

export default function TestsImaging() {
  const { t } = useTranslation();
  const [docViewerConfig, setDocViewerConfig] = useState<{isOpen: boolean; title: string; type: 'pdf' | 'dicom'}>({ isOpen: false, title: '', type: 'pdf' });
  const [modalConfig, setModalConfig] = useState<{isOpen: boolean; title: string; type: 'schedule'; description: string}>({ isOpen: false, title: '', type: 'schedule', description: '' });

  const handleBook = () => {
    setModalConfig({ isOpen: true, title: t('tests.bookNew'), type: 'schedule', description: 'Find available slots for your preferred facility.' });
  };
  
  const handleReschedule = () => {
    setModalConfig({ isOpen: true, title: t('tests.reschedule'), type: 'schedule', description: 'Select a new date and time.' });
  };
  
  const handleView = (type: string, format: 'pdf' | 'dicom') => {
    setDocViewerConfig({ isOpen: true, title: type, type: format });
  };

  return (
    <div className="p-4 md:p-8 h-full flex flex-col bg-muted/10 overflow-y-auto">
      <div className="mb-8 flex justify-between items-end max-w-5xl mx-auto w-full">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3 mb-2">
            <FileImage className="w-8 h-8 text-primary" />
            {t('tests.title')}
          </h1>
          <p className="text-muted-foreground">{t('tests.subtitle')}</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90" onClick={handleBook}>{t('tests.bookNew')}</Button>
      </div>

      <div className="max-w-5xl mx-auto w-full grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-primary/30 shadow-[0_0_15px_rgba(var(--primary),0.1)] relative overflow-hidden">
             <div className="absolute top-0 left-0 w-1 h-full bg-primary" />
             <CardContent className="p-6">
               <div className="flex justify-between items-start mb-4">
                 <div>
                   <h2 className="text-2xl font-bold">MRI Brain (w/ Contrast)</h2>
                   <p className="text-muted-foreground flex items-center gap-2 mt-1"><Calendar className="w-4 h-4" /> Tomorrow, 09:00 AM</p>
                 </div>
                 <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-bold uppercase">{t('tests.upcoming')}</span>
               </div>
               
               <div className="bg-muted/50 rounded-xl p-4 mb-6">
                 <h4 className="font-semibold mb-3 flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> {t('tests.prepTimeline')}</h4>
                 <div className="space-y-4 relative before:absolute before:inset-0 before:ml-2 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-muted-foreground/20 before:to-transparent">
                    
                    <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                      <div className="flex items-center justify-center w-5 h-5 rounded-full border-2 border-emerald-500 bg-background text-emerald-500 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                        <CheckCircle2 className="w-3 h-3" />
                      </div>
                      <div className="w-[calc(100%-2.5rem)] md:w-[calc(50%-1.5rem)] p-3 rounded-lg border bg-background shadow-sm">
                        <p className="text-xs font-bold text-muted-foreground">Today, 09:00 PM</p>
                        <p className="font-semibold text-sm">{t('tests.stopEating')}</p>
                      </div>
                    </div>

                    <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                      <div className="flex items-center justify-center w-5 h-5 rounded-full border-2 border-primary bg-primary shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                        <div className="w-1.5 h-1.5 bg-background rounded-full" />
                      </div>
                      <div className="w-[calc(100%-2.5rem)] md:w-[calc(50%-1.5rem)] p-3 rounded-lg border border-primary/30 bg-primary/5 shadow-sm">
                        <p className="text-xs font-bold text-primary">Tomorrow, 07:00 AM</p>
                        <p className="font-semibold text-sm">{t('tests.stopDrinking')}</p>
                      </div>
                    </div>

                 </div>
               </div>

               <div className="flex gap-4">
                 <Button className="flex-1 bg-primary hover:bg-primary/90" onClick={handleReschedule}>{t('tests.reschedule')}</Button>
                 <Button variant="outline" className="flex-1" onClick={() => handleView('MRI Prep Instructions', 'pdf')}>{t('tests.viewInstructions')}</Button>
               </div>
             </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t('tests.pastResults')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
               <div className="p-4 rounded-xl border bg-background flex justify-between items-center hover:bg-muted/30 transition-colors cursor-pointer" onClick={() => handleView('Chest X-Ray', 'dicom')}>
                 <div className="flex items-center gap-4">
                   <div className="w-10 h-10 bg-blue-500/10 rounded flex items-center justify-center"><FileImage className="w-5 h-5 text-blue-500" /></div>
                   <div>
                     <p className="font-bold">Chest X-Ray</p>
                     <p className="text-xs text-muted-foreground">Oct 12, 2023</p>
                   </div>
                 </div>
                 <Button variant="ghost" size="sm">{t('tests.viewImage')}</Button>
               </div>
               
               <div className="p-4 rounded-xl border bg-background flex justify-between items-center hover:bg-muted/30 transition-colors cursor-pointer" onClick={() => handleView('Comprehensive Blood Panel', 'pdf')}>
                 <div className="flex items-center gap-4">
                   <div className="w-10 h-10 bg-emerald-500/10 rounded flex items-center justify-center"><FileText className="w-5 h-5 text-emerald-500" /></div>
                   <div>
                     <p className="font-bold">Comprehensive Blood Panel</p>
                     <p className="text-xs text-muted-foreground">Sep 28, 2023</p>
                   </div>
                 </div>
                 <Button variant="ghost" size="sm">{t('tests.viewReport')}</Button>
               </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="bg-amber-500/5 border-amber-500/30">
            <CardHeader>
               <CardTitle className="text-amber-600 flex items-center gap-2"><AlertTriangle className="w-5 h-5" /> {t('tests.safetyPrecautions')}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-amber-700 dark:text-amber-400 mb-4">
                {t('tests.mriSafetyNote')}
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> {t('tests.noPacemakers')}</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> {t('tests.noImplants')}</li>
                <li className="flex items-center gap-2 text-muted-foreground"><div className="w-4 h-4 rounded-full border-2 border-muted-foreground" /> {t('tests.removeJewelry')}</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>

      <DocumentViewer 
        isOpen={docViewerConfig.isOpen} 
        onClose={() => setDocViewerConfig(prev => ({ ...prev, isOpen: false }))} 
        title={docViewerConfig.title}
        type={docViewerConfig.type}
      />

      <SimulatedActionModal
        isOpen={modalConfig.isOpen}
        onClose={() => setModalConfig(prev => ({ ...prev, isOpen: false }))}
        title={modalConfig.title}
        description={modalConfig.description}
        type={modalConfig.type}
      />
    </div>
  );
}
