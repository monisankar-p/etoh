import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card';
import { Network as NetworkIcon, MapPin, Building2, UserCircle2 } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { toast } from 'sonner';

export default function Network() {
  const affiliations = [
    { hospital: 'etoh General (Primary)', role: 'Senior Consultant', distance: '0 miles' },
    { hospital: 'St. Mary Specialized Center', role: 'Visiting Cardiologist', distance: '4.2 miles' },
    { hospital: 'Mercy Community Clinic', role: 'Telehealth Supervisor', distance: '12 miles' },
  ];

  return (
    <div className="p-8 h-full flex flex-col bg-muted/10 overflow-y-auto">
      <div className="mb-8 flex justify-between items-end max-w-5xl mx-auto w-full">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3 mb-2">
            <NetworkIcon className="w-8 h-8 text-emerald-500" />
            Multi-Hospital Network
          </h1>
          <p className="text-muted-foreground">Manage your affiliations, cross-hospital scheduling, and consultant mappings.</p>
        </div>
        <Button className="bg-emerald-500 hover:bg-emerald-600" onClick={() => toast.info('Opening affiliation wizard...')}>Add Affiliation</Button>
      </div>

      <div className="max-w-5xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-8">

        <Card className="h-[400px] border-emerald-500/20 bg-background/50 relative overflow-hidden flex items-center justify-center">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.05)_1px,transparent_1px)] bg-[length:24px_24px]" />

          <div className="relative z-10 w-full h-full flex items-center justify-center">

            {/* Center Node */}
            <div className="absolute z-20 w-16 h-16 bg-emerald-500 rounded-full flex flex-col items-center justify-center text-white shadow-[0_0_30px_rgba(16,185,129,0.4)]">
              <UserCircle2 className="w-8 h-8" />
              <span className="text-[10px] font-bold uppercase mt-1 tracking-wider">You</span>
            </div>

            {/* Orbit Lines */}
            <div className="absolute w-64 h-64 rounded-full border border-dashed border-emerald-500/30 animate-[spin_60s_linear_infinite]" />
            <div className="absolute w-96 h-96 rounded-full border border-dashed border-emerald-500/20 animate-[spin_90s_linear_infinite_reverse]" />

            {/* Nodes */}
            <div className="absolute top-12 left-24 w-12 h-12 bg-background border-2 border-emerald-500 rounded-full flex items-center justify-center shadow-lg">
              <Building2 className="w-5 h-5 text-emerald-500" />
            </div>

            <div className="absolute bottom-20 right-32 w-12 h-12 bg-background border-2 border-primary rounded-full flex items-center justify-center shadow-lg">
              <Building2 className="w-5 h-5 text-primary" />
            </div>

            <div className="absolute top-32 right-16 w-12 h-12 bg-background border-2 border-amber-500 rounded-full flex items-center justify-center shadow-lg">
              <Building2 className="w-5 h-5 text-amber-500" />
            </div>

            {/* Connecting lines drawn via SVG */}
            <svg className="absolute inset-0 w-full h-full -z-10 opacity-30">
              <line x1="50%" y1="50%" x2="30%" y2="25%" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" className="text-emerald-500" />
              <line x1="50%" y1="50%" x2="70%" y2="80%" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" className="text-primary" />
              <line x1="50%" y1="50%" x2="80%" y2="35%" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" className="text-amber-500" />
            </svg>

          </div>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Active Affiliations</CardTitle>
              <CardDescription>Your integrated medical institutions.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {affiliations.map((aff, idx) => (
                <div key={idx} className="p-4 border rounded-xl bg-background flex justify-between items-center hover:border-emerald-500/50 transition-colors">
                  <div>
                    <h3 className="font-bold">{aff.hospital}</h3>
                    <p className="text-sm text-muted-foreground">{aff.role}</p>
                  </div>
                  <div className="text-right">
                    <span className="flex items-center gap-1 text-xs font-semibold text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded">
                      <MapPin className="w-3 h-3" /> {aff.distance}
                    </span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  );
}
