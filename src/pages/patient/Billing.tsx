import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card';
import { CreditCard, DollarSign, FileText, CheckCircle2, Clock, AlertTriangle } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { toast } from 'sonner';
import { useState } from 'react';
import { DocumentViewer } from '../../components/ui/DocumentViewer';
import { SimulatedActionModal } from '../../components/ui/SimulatedActionModal';

export default function Billing() {
  const claims = [
    { id: 'CLM-90210', date: 'Oct 12, 2023', provider: 'etoh General Hospital', amount: 450.00, status: 'Processing', type: 'Consultation' },
    { id: 'CLM-88342', date: 'Sep 28, 2023', provider: 'etoh Cardiology', amount: 1200.00, status: 'Approved', type: 'Procedure' },
    { id: 'CLM-88120', date: 'Sep 15, 2023', provider: 'etoh Labs', amount: 150.00, status: 'Requires Info', type: 'Pathology' },
  ];

  const [docViewerConfig, setDocViewerConfig] = useState<{isOpen: boolean; title: string}>({ isOpen: false, title: '' });
  const [modalOpen, setModalOpen] = useState(false);

  const handlePayment = () => {
    setModalOpen(true);
  };

  return (
    <div className="p-8 h-full flex flex-col bg-muted/10 overflow-y-auto">
      <div className="mb-8 max-w-5xl mx-auto w-full flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3 mb-2">
            <CreditCard className="w-8 h-8 text-primary" />
            Insurance & Billing
          </h1>
          <p className="text-muted-foreground">Track your claims, view coverage, and manage medical expenses.</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90" onClick={handlePayment}>Pay Outstanding Balance</Button>
      </div>

      <div className="max-w-5xl mx-auto w-full grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="border-l-4 border-l-primary">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Outstanding Balance</p>
                <p className="text-3xl font-bold mt-2">$0.00</p>
              </div>
              <div className="p-3 bg-primary/10 rounded-full">
                <DollarSign className="w-5 h-5 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-emerald-500">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Deductible Met</p>
                <p className="text-3xl font-bold mt-2">$2,150<span className="text-sm font-normal text-muted-foreground"> / $3,000</span></p>
              </div>
              <div className="p-3 bg-emerald-500/10 rounded-full">
                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
              </div>
            </div>
            <div className="w-full bg-muted rounded-full h-2 mt-4">
              <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '71%' }} />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Policy</p>
                <p className="text-xl font-bold mt-2">BlueCross Shield</p>
                <p className="text-xs text-muted-foreground">PPO Premium</p>
              </div>
              <div className="p-3 bg-blue-500/10 rounded-full">
                <CreditCard className="w-5 h-5 text-blue-500" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="max-w-5xl mx-auto w-full">
        <Card>
          <CardHeader>
            <CardTitle>Recent Claims</CardTitle>
            <CardDescription>Status of claims submitted to your insurance provider.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-xl border overflow-hidden">
              <table className="w-full text-sm text-left">
                <thead className="bg-muted/50 border-b">
                  <tr>
                    <th className="p-4 font-semibold text-muted-foreground">Claim ID</th>
                    <th className="p-4 font-semibold text-muted-foreground">Date</th>
                    <th className="p-4 font-semibold text-muted-foreground">Provider</th>
                    <th className="p-4 font-semibold text-muted-foreground">Amount</th>
                    <th className="p-4 font-semibold text-muted-foreground">Status</th>
                    <th className="p-4 font-semibold text-muted-foreground">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {claims.map((claim, idx) => (
                    <tr key={idx} className="border-b last:border-0 hover:bg-accent/50 transition-colors">
                      <td className="p-4 font-mono font-bold text-primary">{claim.id}</td>
                      <td className="p-4">{claim.date}</td>
                      <td className="p-4">
                        <p className="font-semibold">{claim.provider}</p>
                        <p className="text-xs text-muted-foreground">{claim.type}</p>
                      </td>
                      <td className="p-4 font-mono">${claim.amount.toFixed(2)}</td>
                      <td className="p-4">
                        <span className={`px-2 py-1 rounded text-xs font-bold uppercase flex items-center w-max gap-1 ${
                          claim.status === 'Approved' ? 'bg-emerald-500/10 text-emerald-600' :
                          claim.status === 'Processing' ? 'bg-blue-500/10 text-blue-600' : 'bg-amber-500/10 text-amber-600'
                        }`}>
                          {claim.status === 'Approved' && <CheckCircle2 className="w-3 h-3" />}
                          {claim.status === 'Processing' && <Clock className="w-3 h-3" />}
                          {claim.status === 'Requires Info' && <AlertTriangle className="w-3 h-3" />}
                          {claim.status}
                        </span>
                      </td>
                      <td className="p-4">
                        <Button variant="ghost" size="icon" onClick={() => setDocViewerConfig({ isOpen: true, title: `EOB for ${claim.id}` })}><FileText className="w-4 h-4 text-muted-foreground" /></Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>

      <DocumentViewer 
        isOpen={docViewerConfig.isOpen} 
        onClose={() => setDocViewerConfig({ isOpen: false, title: '' })} 
        title={docViewerConfig.title}
        type="eob"
      />

      <SimulatedActionModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Payment Gateway"
        description="Securely process your outstanding balance."
        type="form"
        actionLabel="Pay $0.00"
        fields={[
          { name: 'card', label: 'Card Number', placeholder: '**** **** **** 4242' },
          { name: 'exp', label: 'Expiry Date', placeholder: 'MM/YY' },
          { name: 'cvc', label: 'CVC', placeholder: '123' },
        ]}
        onActionComplete={() => toast.success('Payment successful!')}
      />
    </div>
  );
}
