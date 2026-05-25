import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { ScanFace, CheckCircle2, FileText } from 'lucide-react';

export default function IdentityVerification() {
  const pendingVerifications = [
    { id: 'V-101', name: 'Martha Wayne', type: 'State ID', submitted: '45 mins ago', status: 'Pending Review' },
    { id: 'V-102', name: 'James Gordon', type: 'Driver License', submitted: '2 hours ago', status: 'Flagged - Blurry' },
  ];

  return (
    <div className="p-4 md:p-8 h-full flex flex-col bg-muted/10 overflow-y-auto">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-3 mb-2">
          <ScanFace className="w-8 h-8 text-indigo-500" />
          Identity Verification
        </h1>
        <p className="text-muted-foreground text-sm md:text-base">Review and approve manual ID verifications that the AI flagged.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Verification Queue</CardTitle>
            <CardDescription>Documents awaiting manual review.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {pendingVerifications.map((doc, i) => (
              <div key={i} className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 rounded-lg border bg-background gap-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded bg-indigo-500/10 flex items-center justify-center shrink-0">
                    <FileText className="w-5 h-5 text-indigo-500" />
                  </div>
                  <div>
                    <h3 className="font-bold">{doc.name}</h3>
                    <p className="text-sm text-muted-foreground">{doc.type} • {doc.submitted}</p>
                    <span className={`inline-block px-2 py-0.5 rounded text-xs font-bold mt-1 ${
                      doc.status.includes('Flagged') ? 'bg-destructive/10 text-destructive' : 'bg-amber-500/10 text-amber-500'
                    }`}>
                      {doc.status}
                    </span>
                  </div>
                </div>
                <Button className="w-full sm:w-auto">Review</Button>
              </div>
            ))}
            {pendingVerifications.length === 0 && (
              <div className="text-center p-8 text-muted-foreground">
                <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto mb-3 opacity-50" />
                <p>All clear! No pending verifications.</p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="border-indigo-500/20 shadow-[0_0_20px_rgba(99,102,241,0.05)]">
          <CardHeader className="bg-indigo-500/5 border-b">
            <CardTitle className="flex items-center gap-2">
              <ScanFace className="w-5 h-5 text-indigo-500" /> Current Document
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 text-center space-y-4">
             <div className="aspect-video w-full max-w-sm mx-auto bg-muted rounded-xl flex items-center justify-center border-2 border-dashed border-muted-foreground/30">
               <FileText className="w-12 h-12 text-muted-foreground/30" />
             </div>
             <div>
               <h3 className="font-bold text-lg">Select a document</h3>
               <p className="text-muted-foreground">Choose a pending verification from the queue to review.</p>
             </div>
             <div className="flex justify-center gap-2 pt-4">
               <Button variant="outline" className="text-destructive border-destructive hover:bg-destructive hover:text-white" disabled>Reject</Button>
               <Button className="bg-emerald-500 hover:bg-emerald-600 gap-2" disabled><CheckCircle2 className="w-4 h-4" /> Approve</Button>
             </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
