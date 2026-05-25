import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card';
import { UserCheck, HeartHandshake, Award } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { toast } from 'sonner';

export default function QualityMonitoring() {
  const metrics = [
    { title: 'Readmission Rate (30-day)', value: '8.4%', target: '< 10%', status: 'Good' },
    { title: 'Hospital Acquired Infections', value: '1.2%', target: '< 1.5%', status: 'Good' },
    { title: 'Patient Satisfaction Score', value: '4.8/5', target: '> 4.5', status: 'Excellent' },
    { title: 'Medication Errors', value: '0.05%', target: '0%', status: 'Warning' },
  ];

  const doctors = [
    { name: 'Dr. Sarah Smith', department: 'Cardiology', cases: 145, successRate: '98%', readmissions: 2 },
    { name: 'Dr. Michael Davis', department: 'ICU', cases: 88, successRate: '92%', readmissions: 5 },
    { name: 'Dr. Emily Chen', department: 'Neurology', cases: 112, successRate: '96%', readmissions: 1 },
  ];

  return (
    <div className="p-8 h-full flex flex-col bg-muted/10 overflow-y-auto">
      <div className="mb-8 flex justify-between items-end max-w-6xl mx-auto w-full">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3 mb-2">
            <Award className="w-8 h-8 text-purple-500" />
            Quality & Performance Monitoring
          </h1>
          <p className="text-muted-foreground">Track readmission rates, physician performance, and patient outcomes.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="border-purple-500 text-purple-600 hover:bg-purple-500 hover:text-white" onClick={() => toast.success('Exporting dataset...', { description: 'Generating CSV...' })}>Export Data</Button>
          <Button className="bg-purple-500 hover:bg-purple-600" onClick={() => toast.info('Fetching incident logs...')}>View Incident Reports</Button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {metrics.map((metric, idx) => (
          <Card key={idx} className={`border-l-4 ${metric.status === 'Warning' ? 'border-l-amber-500' : 'border-l-emerald-500'}`}>
            <CardContent className="p-6">
              <p className="text-sm font-medium text-muted-foreground">{metric.title}</p>
              <p className="text-2xl font-bold mt-2">{metric.value}</p>
              <p className="text-xs text-muted-foreground mt-2">Target: {metric.target}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Physician Performance Matrix</CardTitle>
              <CardDescription>Clinical outcomes tracked over the last quarter.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-xl border overflow-hidden">
                <table className="w-full text-sm text-left">
                  <thead className="bg-muted/50 border-b">
                    <tr>
                      <th className="p-4 font-semibold text-muted-foreground">Physician</th>
                      <th className="p-4 font-semibold text-muted-foreground">Department</th>
                      <th className="p-4 font-semibold text-muted-foreground">Total Cases</th>
                      <th className="p-4 font-semibold text-muted-foreground">Success Rate</th>
                      <th className="p-4 font-semibold text-muted-foreground">Readmissions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {doctors.map((doc, idx) => (
                      <tr key={idx} className="border-b last:border-0 hover:bg-accent/50 transition-colors">
                        <td className="p-4 font-bold flex items-center gap-2"><UserCheck className="w-4 h-4 text-emerald-500" /> {doc.name}</td>
                        <td className="p-4">{doc.department}</td>
                        <td className="p-4">{doc.cases}</td>
                        <td className="p-4 font-mono text-emerald-600 font-bold">{doc.successRate}</td>
                        <td className="p-4">{doc.readmissions}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="bg-primary/5 border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-primary"><HeartHandshake className="w-5 h-5" /> Patient Feedback</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-background rounded-xl border border-primary/10 shadow-sm">
                <div className="flex text-amber-400 mb-2">★★★★★</div>
                <p className="text-sm italic">"The AI copilot feature on my phone helped me understand my post-op care perfectly. Dr. Smith was amazing."</p>
                <p className="text-xs text-muted-foreground mt-2 text-right">- Cardiology Patient</p>
              </div>
              <div className="p-4 bg-background rounded-xl border border-primary/10 shadow-sm">
                <div className="flex text-amber-400 mb-2">★★★★☆</div>
                <p className="text-sm italic">"Very fast discharge process. The new system seems to have cut wait times drastically."</p>
                <p className="text-xs text-muted-foreground mt-2 text-right">- General Ward Patient</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
