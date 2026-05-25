import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Users, FilePlus2, CheckCircle, Clock, Activity, ScanFace } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function ExecutiveDashboard() {
  const navigate = useNavigate();

  return (
    <div className="p-4 md:p-8 h-full flex flex-col bg-muted/10 overflow-y-auto">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-3 mb-2">
          <Users className="w-8 h-8 text-indigo-500" />
          Executive Dashboard
        </h1>
        <p className="text-muted-foreground text-sm md:text-base">Manage your field registrations and patient onboarding tasks.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
        <Card className="border-indigo-500/20 shadow-[0_0_15px_rgba(236,72,153,0.05)] bg-card/50 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Registered Today</p>
                <h3 className="text-3xl font-bold">14</h3>
              </div>
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20">
                <FilePlus2 className="w-5 h-5 text-indigo-500" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-amber-500/20 shadow-[0_0_15px_rgba(245,158,11,0.05)] bg-card/50 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Verifications Pending</p>
                <h3 className="text-3xl font-bold text-amber-500">2</h3>
              </div>
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center border border-amber-500/20">
                <Clock className="w-5 h-5 text-amber-500" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.05)] bg-card/50 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">ID Matches</p>
                <h3 className="text-3xl font-bold text-emerald-500">100%</h3>
              </div>
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                <CheckCircle className="w-5 h-5 text-emerald-500" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.05)] bg-card/50 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Field Activity</p>
                <h3 className="text-3xl font-bold text-blue-500">High</h3>
              </div>
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
                <Activity className="w-5 h-5 text-blue-500" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Primary workflows for patient onboarding.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button 
              className="w-full justify-start h-14 text-lg bg-indigo-500 hover:bg-indigo-600 gap-3"
              onClick={() => navigate('/executive/registration')}
            >
              <FilePlus2 className="w-5 h-5" />
              Start Assisted Registration
            </Button>
            <Button 
              variant="outline" 
              className="w-full justify-start h-14 text-lg gap-3 hover:border-indigo-500 hover:text-indigo-500 transition-colors"
              onClick={() => navigate('/executive/verification')}
            >
              <ScanFace className="w-5 h-5" />
              Verify Pending Documents
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Registrations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: 'Thomas Anderson', time: '10 mins ago', status: 'Verified' },
                { name: 'Martha Wayne', time: '45 mins ago', status: 'Pending ID' },
                { name: 'Bruce Banner', time: '2 hours ago', status: 'Verified' },
                { name: 'Diana Prince', time: '3 hours ago', status: 'Verified' },
              ].map((patient, i) => (
                <div key={i} className="flex justify-between items-center p-3 rounded-lg border bg-background">
                  <div>
                    <p className="font-bold">{patient.name}</p>
                    <p className="text-xs text-muted-foreground">{patient.time}</p>
                  </div>
                  <span className={`px-2 py-1 rounded text-xs font-bold ${
                    patient.status === 'Verified' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-amber-500/10 text-amber-500'
                  }`}>
                    {patient.status}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
