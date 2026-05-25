import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card';
import { CheckCircle2, AlertTriangle, AlertCircle, Target } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { toast } from 'sonner';

export default function GapAnalysis() {
  const complianceMatrix = [
    { area: 'Data Privacy (HIPAA)', score: 98, status: 'Compliant' },
    { area: 'Infection Control', score: 85, status: 'At Risk' },
    { area: 'Documentation Accuracy', score: 99, status: 'Compliant' },
    { area: 'Emergency Response Time', score: 72, status: 'Critical' },
  ];

  return (
    <div className="p-8 h-full flex flex-col bg-muted/10 overflow-y-auto">
      <div className="mb-8 flex justify-between items-end max-w-5xl mx-auto w-full">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3 mb-2">
            <Target className="w-8 h-8 text-purple-500" />
            Clinical Gap Analysis
          </h1>
          <p className="text-muted-foreground">Identify compliance shortfalls, core measure deviations, and care gaps.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="border-purple-500 text-purple-600 hover:bg-purple-500 hover:text-white" onClick={() => toast.promise(new Promise(r => setTimeout(r, 2000)), { loading: 'Generating AI Audit...', success: 'Report ready.', error: 'Failed' })}>Generate Audit Report</Button>
          <Button className="bg-purple-500 hover:bg-purple-600" onClick={() => toast.info('Opening improvement plan editor...')}>Create Improvement Plan</Button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Compliance Matrix</CardTitle>
              <CardDescription>Current standing vs. Joint Commission standards.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {complianceMatrix.map((item, idx) => (
                <div key={idx} className="space-y-2">
                  <div className="flex justify-between items-center text-sm">
                    <span className="font-bold flex items-center gap-2">
                       {item.status === 'Compliant' && <CheckCircle2 className="w-4 h-4 text-emerald-500" />}
                       {item.status === 'At Risk' && <AlertTriangle className="w-4 h-4 text-amber-500" />}
                       {item.status === 'Critical' && <AlertCircle className="w-4 h-4 text-destructive" />}
                       {item.area}
                    </span>
                    <span className="font-mono">{item.score}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${item.score > 90 ? 'bg-emerald-500' : item.score > 80 ? 'bg-amber-500' : 'bg-destructive'}`} 
                      style={{ width: `${item.score}%` }} 
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="border-destructive/30 bg-destructive/5 shadow-[0_0_15px_rgba(239,68,68,0.1)]">
            <CardHeader>
              <CardTitle className="text-destructive">Critical Gap Identified</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="p-4 bg-background rounded-xl border border-destructive flex gap-4">
                <AlertCircle className="w-8 h-8 text-destructive shrink-0" />
                <div>
                  <h3 className="font-bold text-lg mb-1">Emergency Department Triage Delays</h3>
                  <p className="text-sm text-muted-foreground mb-4">Average door-to-doctor time has exceeded 45 minutes during peak hours (18:00 - 22:00) for the past 3 consecutive days.</p>
                  <Button variant="outline" className="text-destructive border-destructive hover:bg-destructive hover:text-white">Review Staffing Allocation</Button>
                </div>
              </div>
            </CardContent>
          </Card>

           <Card>
            <CardHeader>
              <CardTitle>AI Action Plan</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>etoh AI successfully automated 40% of nursing discharge documentation, reducing errors to 0.05%.</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-4 h-4 rounded-full border-2 border-amber-500 shrink-0 mt-0.5 flex items-center justify-center"><div className="w-1.5 h-1.5 bg-amber-500 rounded-full" /></div>
                  <span>Pending implementation of automated hand-hygiene monitoring system for Infection Control.</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
