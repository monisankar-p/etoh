import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { UploadCloud, FileText, CheckCircle2, AlertTriangle, ChevronRight, Activity, Sparkles, Download, Eye } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import { DocumentViewer } from '../../components/ui/DocumentViewer';

export default function ReportIntelligence() {
  const [isUploading, setIsUploading] = useState(false);
  const [isAnalyzed, setIsAnalyzed] = useState(false);
  const [isPdfModalOpen, setIsPdfModalOpen] = useState(false);
  const [reports, setReports] = useState([
    { id: 1, title: 'Complete Blood Count (CBC)', date: 'Oct 12, 2023', icon: Activity, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
    { id: 2, title: 'Chest X-Ray Radiology Report', date: 'Sep 28, 2023', icon: FileText, color: 'text-blue-500', bg: 'bg-blue-500/10' },
  ]);

  const handleUpload = () => {
    setIsUploading(true);
    toast.info('Uploading report...', { description: 'Please wait while we process the document.' });
    
    setTimeout(() => {
      setIsUploading(false);
      setIsAnalyzed(true);
      
      const newReport = {
        id: Date.now(),
        title: 'Comprehensive Metabolic Panel (CMP)',
        date: 'Just now',
        icon: Activity,
        color: 'text-primary',
        bg: 'bg-primary/10'
      };
      setReports([newReport, ...reports]);
      toast.success('Report analyzed successfully', { description: 'etoh AI has generated a summary.' });
    }, 3000);
  };

  const handleDownload = (title: string, e: React.MouseEvent) => {
    e.stopPropagation();
    toast.success(`Downloading ${title}`, { description: 'Your file will be saved shortly.' });
  };

  return (
    <div className="p-8 h-full flex flex-col bg-muted/10 overflow-y-auto">
      <div className="mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <FileText className="w-8 h-8 text-primary" />
            Report Intelligence
          </h1>
          <p className="text-muted-foreground mt-2">Upload medical records, lab results, and imaging reports for AI-powered analysis.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 flex-1">
        
        {/* Upload & History */}
        <div className="lg:col-span-1 space-y-6">
          <Card className={`border-2 border-dashed transition-all ${isUploading ? 'border-primary bg-primary/5' : 'border-muted-foreground/30 hover:border-primary/50 hover:bg-muted/30'}`}>
            <CardContent className="flex flex-col items-center justify-center py-12 text-center relative overflow-hidden">
              <AnimatePresence>
                {isUploading && (
                  <motion.div 
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    className="absolute inset-0 bg-background/80 backdrop-blur-sm flex flex-col items-center justify-center z-10"
                  >
                    <Sparkles className="w-8 h-8 text-primary animate-pulse mb-4" />
                    <p className="font-semibold text-primary">etoh AI is Analyzing...</p>
                    <div className="w-3/4 h-2 bg-muted rounded-full mt-4 overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }} 
                        animate={{ width: "100%" }} 
                        transition={{ duration: 3, ease: "linear" }}
                        className="h-full bg-primary"
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <UploadCloud className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Drag & Drop Reports</h3>
              <p className="text-sm text-muted-foreground mb-6">Supports PDF, JPG, PNG (Max 50MB)</p>
              <Button onClick={handleUpload} disabled={isUploading || isAnalyzed}>Browse Files</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm text-muted-foreground">Recent Analyses</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {reports.map((report) => {
                const Icon = report.icon;
                return (
                  <div key={report.id} className="flex items-center gap-4 p-3 rounded-lg border bg-background hover:bg-accent cursor-pointer transition-colors" onClick={() => setIsAnalyzed(true)}>
                    <div className={`w-10 h-10 rounded ${report.bg} flex items-center justify-center shrink-0`}>
                      <Icon className={`w-5 h-5 ${report.color}`} />
                    </div>
                    <div className="flex-1 overflow-hidden">
                      <p className="font-medium truncate">{report.title}</p>
                      <p className="text-xs text-muted-foreground">Analyzed {report.date}</p>
                    </div>
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={(e) => handleDownload(report.title, e)}>
                      <Download className="w-4 h-4 text-muted-foreground" />
                    </Button>
                  </div>
                )
              })}
            </CardContent>
          </Card>
        </div>

        {/* AI Analysis Results */}
        <div className="lg:col-span-2">
          {isAnalyzed ? (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="h-full">
              <Card className="h-full border-primary/20 shadow-[0_0_30px_rgba(var(--primary),0.1)]">
                <CardHeader className="border-b bg-muted/20 pb-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="px-2 py-1 rounded bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">Metabolic Panel</span>
                        <span className="text-sm text-muted-foreground">Uploaded Just Now</span>
                      </div>
                      <CardTitle className="text-2xl">Comprehensive Metabolic Panel (CMP)</CardTitle>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => setIsPdfModalOpen(true)}>
                        <Eye className="w-4 h-4 mr-2" /> View Original Report
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => setIsAnalyzed(false)}>Clear</Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6 space-y-8">
                  
                  {/* Summary */}
                  <div className="space-y-3">
                    <h3 className="font-semibold flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-primary" /> etoh AI Summary
                    </h3>
                    <p className="text-muted-foreground leading-relaxed p-4 bg-primary/5 rounded-xl border border-primary/10">
                      Overall, the metabolic panel shows stable kidney and liver function. However, the fasting glucose level is slightly elevated (108 mg/dL), indicating potential pre-diabetes. Potassium levels are at the lower end of the normal range (3.6 mEq/L).
                    </p>
                  </div>

                  {/* Biomarkers */}
                  <div>
                    <h3 className="font-semibold mb-4">Key Biomarker Flags</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-4 rounded-xl border bg-amber-500/5 border-amber-500/20">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center">
                            <AlertTriangle className="w-5 h-5 text-amber-500" />
                          </div>
                          <div>
                            <p className="font-semibold">Glucose, Fasting</p>
                            <p className="text-sm text-muted-foreground">Reference: 65 - 99 mg/dL</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-amber-500 text-xl">108 mg/dL <span className="text-sm text-muted-foreground font-normal">(High)</span></p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between p-4 rounded-xl border bg-background">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center">
                            <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                          </div>
                          <div>
                            <p className="font-semibold">Creatinine</p>
                            <p className="text-sm text-muted-foreground">Reference: 0.76 - 1.27 mg/dL</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-emerald-500 text-xl">0.92 mg/dL <span className="text-sm text-muted-foreground font-normal">(Normal)</span></p>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between p-4 rounded-xl border bg-background">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center">
                            <CheckCircle2 className="w-5 h-5 text-blue-500" />
                          </div>
                          <div>
                            <p className="font-semibold">Potassium</p>
                            <p className="text-sm text-muted-foreground">Reference: 3.5 - 5.2 mEq/L</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-foreground text-xl">3.6 mEq/L <span className="text-sm text-muted-foreground font-normal">(Low Normal)</span></p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Actionable Advice */}
                  <div className="pt-4 border-t">
                    <Button className="w-full gap-2">Discuss with etoh Copilot <ChevronRight className="w-4 h-4" /></Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ) : (
            <div className="h-full flex items-center justify-center border-2 border-dashed rounded-xl bg-muted/10">
              <div className="text-center text-muted-foreground max-w-sm">
                <FileText className="w-16 h-16 mx-auto mb-4 opacity-20" />
                <p>Upload a report to see the AI-generated intelligence and extracted insights here.</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <DocumentViewer
        isOpen={isPdfModalOpen}
        onClose={() => setIsPdfModalOpen(false)}
        title="Original PDF Report"
        type="pdf"
      />
    </div>
  );
}
