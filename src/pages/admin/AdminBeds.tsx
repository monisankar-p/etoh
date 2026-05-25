import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { BedDouble, CheckCircle2, AlertTriangle, Clock } from 'lucide-react';

export default function AdminBeds() {
  const wards = [
    { name: 'Cardiology (West Wing)', capacity: 45, occupied: 42, cleaning: 2, maintenance: 1 },
    { name: 'ICU (Central)', capacity: 20, occupied: 18, cleaning: 1, maintenance: 1 },
    { name: 'Neurology (East Wing)', capacity: 30, occupied: 22, cleaning: 3, maintenance: 0 },
    { name: 'Pediatrics (South Wing)', capacity: 40, occupied: 15, cleaning: 5, maintenance: 0 },
  ];

  return (
    <div className="p-8 h-full flex flex-col bg-muted/10 overflow-y-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold flex items-center gap-3 mb-2">
          <BedDouble className="w-8 h-8 text-purple-500" />
          Bed Management
        </h1>
        <p className="text-muted-foreground">Real-time capacity tracking and turnaround management.</p>
      </div>

      <div className="space-y-6">
        {wards.map((ward, idx) => (
          <Card key={idx} className="overflow-hidden">
            <CardHeader className="bg-muted/30 border-b pb-4">
              <div className="flex justify-between items-center">
                <CardTitle>{ward.name}</CardTitle>
                <span className="font-mono bg-background px-3 py-1 rounded border text-sm font-bold">
                  {ward.occupied} / {ward.capacity} Occupied
                </span>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-6">
                <div className="h-4 bg-purple-500 rounded-l-full" style={{ width: `${(ward.occupied / ward.capacity) * 100}%` }} title="Occupied" />
                {ward.cleaning > 0 && <div className="h-4 bg-amber-500" style={{ width: `${(ward.cleaning / ward.capacity) * 100}%` }} title="Cleaning" />}
                {ward.maintenance > 0 && <div className="h-4 bg-destructive" style={{ width: `${(ward.maintenance / ward.capacity) * 100}%` }} title="Maintenance" />}
                <div className="h-4 bg-muted flex-1 rounded-r-full" title="Available" />
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-4 rounded-xl border bg-background flex flex-col items-center justify-center text-center">
                  <CheckCircle2 className="w-6 h-6 text-emerald-500 mb-2" />
                  <p className="text-2xl font-bold">{ward.capacity - ward.occupied - ward.cleaning - ward.maintenance}</p>
                  <p className="text-xs text-muted-foreground">Available</p>
                </div>
                <div className="p-4 rounded-xl border bg-purple-500/5 flex flex-col items-center justify-center text-center">
                  <BedDouble className="w-6 h-6 text-purple-500 mb-2" />
                  <p className="text-2xl font-bold">{ward.occupied}</p>
                  <p className="text-xs text-muted-foreground">Occupied</p>
                </div>
                <div className="p-4 rounded-xl border bg-amber-500/5 flex flex-col items-center justify-center text-center">
                  <Clock className="w-6 h-6 text-amber-500 mb-2" />
                  <p className="text-2xl font-bold">{ward.cleaning}</p>
                  <p className="text-xs text-muted-foreground">Cleaning</p>
                </div>
                <div className="p-4 rounded-xl border bg-destructive/5 flex flex-col items-center justify-center text-center">
                  <AlertTriangle className="w-6 h-6 text-destructive mb-2" />
                  <p className="text-2xl font-bold">{ward.maintenance}</p>
                  <p className="text-xs text-muted-foreground">Maintenance</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
