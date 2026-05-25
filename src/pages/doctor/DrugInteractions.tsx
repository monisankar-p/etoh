import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card';
import { Pill, AlertTriangle, ShieldAlert, CheckCircle2, AlertCircle } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { toast } from 'sonner';

export default function DrugInteractions() {
  return (
    <div className="p-8 h-full flex flex-col bg-muted/10 overflow-y-auto">
      <div className="mb-8 flex justify-between items-end max-w-5xl mx-auto w-full">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3 mb-2">
            <ShieldAlert className="w-8 h-8 text-emerald-500" />
            Drug Interaction Assistant
          </h1>
          <p className="text-muted-foreground">Pharmacology conflict checker and alternative recommendations.</p>
        </div>
        <div className="flex gap-2">
          <input type="text" placeholder="Add medication to check..." className="px-4 py-2 rounded-lg bg-background border text-sm w-64" />
          <Button className="bg-emerald-500 hover:bg-emerald-600" onClick={() => toast.promise(new Promise(r => setTimeout(r, 1500)), { loading: 'Checking interactions...', success: 'Analysis complete', error: 'Failed' })}>Simulate</Button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto w-full space-y-6">
        <Card className="border-destructive/30 shadow-[0_0_15px_rgba(239,68,68,0.1)] bg-destructive/5">
          <CardHeader>
            <CardTitle className="text-destructive flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" /> Major Interaction Detected
            </CardTitle>
            <CardDescription className="text-destructive/80">Contraindicated combination based on patient's current active prescriptions.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-6 items-center">
              <div className="flex-1 p-4 bg-background rounded-xl border flex flex-col items-center justify-center text-center">
                <Pill className="w-8 h-8 text-primary mb-2" />
                <p className="font-bold text-lg">Warfarin</p>
                <p className="text-xs text-muted-foreground">Active (5mg PO Daily)</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-destructive/20 flex items-center justify-center shrink-0 border-2 border-destructive/50">
                <span className="font-bold text-destructive text-xl">X</span>
              </div>
              <div className="flex-1 p-4 bg-background rounded-xl border border-destructive flex flex-col items-center justify-center text-center shadow-[0_0_10px_rgba(239,68,68,0.1)]">
                <Pill className="w-8 h-8 text-destructive mb-2" />
                <p className="font-bold text-lg">Amiodarone</p>
                <p className="text-xs text-muted-foreground">Proposed Addition</p>
              </div>
            </div>

            <div className="mt-6 p-4 bg-background rounded-xl border">
              <h4 className="font-bold text-sm mb-2 text-destructive">Clinical Implication:</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Amiodarone significantly inhibits the metabolism of Warfarin (CYP2C9 inhibition), leading to heavily elevated INR and extreme bleeding risk. If combined therapy is essential, empirical Warfarin dose reduction by 30-50% is mandatory.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>etoh AI Alternative Recommendations</CardTitle>
            <CardDescription>Safer therapeutic pathways for arrhythmia management.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 rounded-xl border bg-emerald-500/5 border-emerald-500/30 flex justify-between items-center">
              <div>
                <p className="font-bold text-emerald-600 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" /> Sotalol
                </p>
                <p className="text-xs text-muted-foreground mt-1">No significant CYP interaction with Warfarin. Renal adjustment may be required.</p>
              </div>
              <Button size="sm" className="bg-emerald-500 hover:bg-emerald-600" onClick={() => toast.success('Switched to Sotalol', { description: 'Updated prescription draft.' })}>Prescribe Instead</Button>
            </div>

            <div className="p-4 rounded-xl border flex justify-between items-center">
              <div>
                <p className="font-bold flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-500" /> Dofetilide
                </p>
                <p className="text-xs text-muted-foreground mt-1">Requires inpatient initiation and QT monitoring, but safe with Warfarin.</p>
              </div>
              <Button size="sm" variant="outline" onClick={() => toast.success('Switched to Dofetilide', { description: 'Updated prescription draft.' })}>Prescribe Instead</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
