import { X, ZoomIn, ZoomOut, Download, Printer, Share2, FileText, ActivitySquare } from 'lucide-react';
import { Button } from './button';
import { Card } from './card';

interface DocumentViewerProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  type?: 'pdf' | 'dicom' | 'eob';
}

export function DocumentViewer({ isOpen, onClose, title, type = 'pdf' }: DocumentViewerProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-background/90 backdrop-blur-sm">
      <Card className="w-full max-w-5xl h-[90vh] flex flex-col shadow-2xl border-primary/20 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Toolbar */}
        <div className="h-16 border-b bg-card flex items-center justify-between px-4 sm:px-6 shrink-0">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
              type === 'dicom' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-primary/10 text-primary'
            }`}>
              {type === 'dicom' ? <ActivitySquare className="w-5 h-5" /> : <FileText className="w-5 h-5" />}
            </div>
            <div className="min-w-0">
              <h2 className="font-bold text-lg truncate pr-4">{title}</h2>
              <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">
                {type === 'dicom' ? 'Radiology Viewer' : 'Secure Document Viewer'}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-1 sm:gap-2 shrink-0">
            <div className="hidden sm:flex items-center gap-1 border-r pr-2 mr-1">
              <Button variant="ghost" size="icon" className="text-muted-foreground"><ZoomOut className="w-4 h-4" /></Button>
              <span className="text-xs font-medium w-12 text-center">100%</span>
              <Button variant="ghost" size="icon" className="text-muted-foreground"><ZoomIn className="w-4 h-4" /></Button>
            </div>
            <Button variant="ghost" size="icon" className="hidden sm:flex text-muted-foreground"><Download className="w-4 h-4" /></Button>
            <Button variant="ghost" size="icon" className="hidden sm:flex text-muted-foreground"><Printer className="w-4 h-4" /></Button>
            <Button variant="ghost" size="icon" className="hidden sm:flex text-muted-foreground"><Share2 className="w-4 h-4" /></Button>
            <Button variant="ghost" size="icon" onClick={onClose} className="hover:bg-destructive/10 hover:text-destructive">
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 bg-muted/30 overflow-y-auto p-4 sm:p-8 flex items-center justify-center">
          {type === 'dicom' ? (
            <div className="w-full max-w-2xl aspect-square bg-black rounded-xl border border-white/10 shadow-2xl relative overflow-hidden flex flex-col">
              <div className="absolute top-4 left-4 text-white/50 text-xs font-mono">
                <p>PATIENT: SMITH, J</p>
                <p>DOB: 1980-05-15</p>
                <p>STUDY: MRI BRAIN</p>
              </div>
              <div className="absolute top-4 right-4 text-white/50 text-xs font-mono text-right">
                <p>SERIES: 4</p>
                <p>IMG: 24/120</p>
                <p>THK: 5.0mm</p>
              </div>
              
              <div className="flex-1 flex items-center justify-center">
                {/* Simulated Brain MRI using CSS gradients */}
                <div className="w-64 h-80 bg-gradient-to-b from-transparent via-white/20 to-transparent rounded-[100px] blur-sm relative mix-blend-screen opacity-80">
                  <div className="absolute inset-4 bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-full blur-md" />
                  <div className="absolute top-1/4 left-1/4 right-1/4 h-1/2 border-4 border-white/40 rounded-[100px] blur-sm" />
                </div>
              </div>
              
              <div className="absolute bottom-4 left-4 text-white/50 text-xs font-mono">
                <p>WL: 400 WW: 1500</p>
              </div>
              <div className="absolute bottom-0 inset-x-0 h-1 bg-emerald-500/50" />
            </div>
          ) : (
            <div className="w-full max-w-3xl min-h-[800px] bg-background rounded shadow-xl border p-12 mx-auto">
              {/* Simulated PDF Document */}
              <div className="flex justify-between items-start mb-12 border-b pb-8">
                <div>
                  <h1 className="text-4xl font-bold tracking-tighter mb-2">etoh <span className="text-primary font-light">Health</span></h1>
                  <p className="text-sm text-muted-foreground">Comprehensive Medical Report</p>
                </div>
                <div className="text-right text-sm text-muted-foreground">
                  <p>Date: {new Date().toLocaleDateString()}</p>
                  <p>ID: DOC-{Math.floor(Math.random() * 10000)}</p>
                </div>
              </div>

              <div className="space-y-8">
                <div>
                  <h3 className="font-bold text-lg border-b pb-2 mb-4 uppercase tracking-wider text-muted-foreground">Patient Information</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <p><span className="font-semibold">Name:</span> Alex Johnson</p>
                    <p><span className="font-semibold">DOB:</span> 1985-04-12</p>
                    <p><span className="font-semibold">Provider:</span> Dr. Sarah Smith</p>
                    <p><span className="font-semibold">Facility:</span> etoh Central Hospital</p>
                  </div>
                </div>

                <div>
                  <h3 className="font-bold text-lg border-b pb-2 mb-4 uppercase tracking-wider text-muted-foreground">Clinical Summary</h3>
                  <div className="space-y-3 text-sm leading-relaxed">
                    <div className="h-4 bg-muted rounded w-full" />
                    <div className="h-4 bg-muted rounded w-11/12" />
                    <div className="h-4 bg-muted rounded w-4/5" />
                    <div className="h-4 bg-muted rounded w-full" />
                    <div className="h-4 bg-muted rounded w-3/4" />
                  </div>
                </div>

                <div>
                  <h3 className="font-bold text-lg border-b pb-2 mb-4 uppercase tracking-wider text-muted-foreground">Findings & Impressions</h3>
                  <div className="space-y-4">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="flex gap-4 items-start">
                        <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 text-xs font-bold text-primary">{i}</div>
                        <div className="space-y-2 flex-1 pt-1">
                          <div className="h-3 bg-muted rounded w-full" />
                          <div className="h-3 bg-muted rounded w-5/6" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {type === 'eob' && (
                  <div>
                    <h3 className="font-bold text-lg border-b pb-2 mb-4 uppercase tracking-wider text-muted-foreground">Financial Breakdown</h3>
                    <div className="border rounded-lg overflow-hidden">
                      <table className="w-full text-sm">
                        <thead className="bg-muted">
                          <tr>
                            <th className="text-left p-3 font-semibold">Service</th>
                            <th className="text-right p-3 font-semibold">Billed</th>
                            <th className="text-right p-3 font-semibold">Plan Paid</th>
                            <th className="text-right p-3 font-semibold text-primary">You Owe</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y">
                          <tr>
                            <td className="p-3">Office Visit - Level 3</td>
                            <td className="p-3 text-right">$150.00</td>
                            <td className="p-3 text-right">$110.00</td>
                            <td className="p-3 text-right font-bold">$40.00</td>
                          </tr>
                          <tr>
                            <td className="p-3">Comprehensive Metabolic Panel</td>
                            <td className="p-3 text-right">$45.00</td>
                            <td className="p-3 text-right">$45.00</td>
                            <td className="p-3 text-right font-bold">$0.00</td>
                          </tr>
                        </tbody>
                        <tfoot className="bg-muted/50 font-bold">
                          <tr>
                            <td className="p-3 text-right" colSpan={3}>Total Patient Responsibility:</td>
                            <td className="p-3 text-right text-primary text-lg">$40.00</td>
                          </tr>
                        </tfoot>
                      </table>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="mt-20 pt-8 border-t flex justify-between items-end text-sm text-muted-foreground">
                <div className="space-y-2">
                  <div className="w-40 h-12 bg-muted/50 rounded flex items-center justify-center font-mono italic text-lg opacity-50">Signed Electronically</div>
                  <p>Electronically Signed By</p>
                  <p>Dr. Sarah Smith, MD</p>
                </div>
                <div className="text-right">
                  <p>Page 1 of 1</p>
                  <p>CONFIDENTIAL</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
