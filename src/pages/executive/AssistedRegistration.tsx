import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { ScanFace, UserPlus, CheckCircle2, ChevronRight, FilePlus2, Loader2, CreditCard } from 'lucide-react';
import { toast } from 'sonner';

export default function AssistedRegistration() {
  const [step, setStep] = useState(1);
  const [isScanning, setIsScanning] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dob: '',
    gender: '',
    phone: '',
    address: '',
    emergencyContact: '',
    triageNotes: ''
  });

  const handleScanID = () => {
    setIsScanning(true);
    toast.info('Scanning Identity Document...', { description: 'Please hold the ID clearly in frame.' });
    
    setTimeout(() => {
      setFormData(prev => ({
        ...prev,
        firstName: 'John',
        lastName: 'Doe',
        dob: '1985-04-12',
        gender: 'Male',
        address: '123 Main St, Springfield'
      }));
      setIsScanning(false);
      toast.success('ID Scan Complete', { description: 'Demographics extracted successfully.' });
    }, 2500);
  };

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
  };

  const handleSubmit = () => {
    toast.success('Registration Complete', { description: 'Patient MRN generated. Ready for triage.' });
    setTimeout(() => setStep(1), 2000);
  };

  return (
    <div className="p-4 md:p-8 h-full flex flex-col bg-muted/10 overflow-y-auto">
      <div className="mb-8 max-w-4xl mx-auto w-full">
        <h1 className="text-3xl font-bold flex items-center gap-3 mb-2">
          <FilePlus2 className="w-8 h-8 text-indigo-500" />
          Assisted Patient Registration
        </h1>
        <p className="text-muted-foreground">Perform onboarding and identity verification on behalf of the patient.</p>
      </div>

      <div className="max-w-4xl mx-auto w-full flex flex-col lg:flex-row gap-8">
        
        {/* Left: Progress Steps */}
        <div className="w-full lg:w-64 shrink-0">
          <div className="space-y-4 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent">
            {[
              { num: 1, title: 'Identity Verification' },
              { num: 2, title: 'Contact Details' },
              { num: 3, title: 'Initial Triage' }
            ].map(s => (
              <div key={s.num} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 bg-background shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow transition-colors ${step >= s.num ? 'border-indigo-500 text-indigo-500' : 'border-muted text-muted-foreground'}`}>
                  {step > s.num ? <CheckCircle2 className="w-5 h-5" /> : <span className="font-bold">{s.num}</span>}
                </div>
                <div className={`w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border shadow-sm ${step === s.num ? 'bg-card border-indigo-500/50' : 'bg-card/50'}`}>
                  <h3 className={`font-bold ${step === s.num ? 'text-indigo-500' : 'text-foreground'}`}>{s.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Form Content */}
        <div className="flex-1">
          <Card className="border-indigo-500/20 shadow-[0_0_20px_rgba(236,72,153,0.05)]">
            <CardHeader className="bg-indigo-500/5 border-b">
              <CardTitle>
                {step === 1 && 'Step 1: Identity & Demographics'}
                {step === 2 && 'Step 2: Contact Information'}
                {step === 3 && 'Step 3: Initial Triage Details'}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              
              {step === 1 && (
                <div className="space-y-6">
                  <div className="p-6 border-2 border-dashed border-indigo-500/30 bg-indigo-500/5 rounded-xl text-center">
                    <ScanFace className="w-12 h-12 text-indigo-500 mx-auto mb-3 opacity-80" />
                    <h3 className="font-bold mb-1">Smart ID Extraction</h3>
                    <p className="text-sm text-muted-foreground mb-4">Instantly capture demographic data from driving licenses, Aadhar, or state IDs.</p>
                    <Button 
                      className="bg-indigo-500 hover:bg-indigo-600 gap-2" 
                      onClick={handleScanID}
                      disabled={isScanning}
                    >
                      {isScanning ? <Loader2 className="w-4 h-4 animate-spin" /> : <CreditCard className="w-4 h-4" />}
                      {isScanning ? 'Processing...' : 'Capture ID'}
                    </Button>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">First Name</label>
                      <Input value={formData.firstName} onChange={e => setFormData({...formData, firstName: e.target.value})} placeholder="First name" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Last Name</label>
                      <Input value={formData.lastName} onChange={e => setFormData({...formData, lastName: e.target.value})} placeholder="Last name" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Date of Birth</label>
                      <Input type="date" value={formData.dob} onChange={e => setFormData({...formData, dob: e.target.value})} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Gender</label>
                      <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                        <option value="">Select gender</option>
                        <option value="Male" selected={formData.gender === 'Male'}>Male</option>
                        <option value="Female" selected={formData.gender === 'Female'}>Female</option>
                        <option value="Other" selected={formData.gender === 'Other'}>Other</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Primary Phone</label>
                    <Input value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} placeholder="+1 (555) 000-0000" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Residential Address</label>
                    <Input value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} placeholder="Full address" />
                  </div>
                  <div className="space-y-2 pt-4 border-t">
                    <label className="text-sm font-medium text-destructive">Emergency Contact Name & Phone</label>
                    <Input value={formData.emergencyContact} onChange={e => setFormData({...formData, emergencyContact: e.target.value})} placeholder="e.g. Jane Doe - +1 (555) 111-2222" />
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-6">
                  <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl">
                    <h4 className="font-bold text-amber-600 mb-1">Pre-Consultation Context</h4>
                    <p className="text-sm text-amber-600/80">Information collected here will directly populate the Doctor's OPD Queue and Resident Assistant.</p>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Primary Reason for Visit</label>
                    <textarea 
                      className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 min-h-[120px]"
                      placeholder="Briefly describe the patient's symptoms or reason for registration..."
                      value={formData.triageNotes}
                      onChange={e => setFormData({...formData, triageNotes: e.target.value})}
                    />
                  </div>
                </div>
              )}

              <div className="mt-8 pt-6 border-t flex justify-between items-center">
                <Button variant="outline" onClick={() => setStep(step > 1 ? step - 1 : 1)} disabled={step === 1}>
                  Back
                </Button>
                {step < 3 ? (
                  <Button className="bg-indigo-500 hover:bg-indigo-600 gap-2" onClick={handleNext}>
                    Next Step <ChevronRight className="w-4 h-4" />
                  </Button>
                ) : (
                  <Button className="bg-emerald-500 hover:bg-emerald-600 gap-2" onClick={handleSubmit}>
                    <UserPlus className="w-4 h-4" /> Register Patient
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
