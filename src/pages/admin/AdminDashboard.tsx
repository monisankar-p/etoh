import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { TrendingUp, Users, BedDouble, Activity, ShieldAlert } from 'lucide-react';

const occupancyData = [
  { name: 'Cardiology', beds: 45, occupied: 40 },
  { name: 'Neurology', beds: 30, occupied: 22 },
  { name: 'Oncology', beds: 50, occupied: 48 },
  { name: 'Pediatrics', beds: 40, occupied: 15 },
  { name: 'ICU', beds: 20, occupied: 18 },
];

export default function AdminDashboard() {
  return (
    <div className="p-8 h-full flex flex-col bg-muted/20 overflow-y-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Hospital Command Center</h1>
        <p className="text-muted-foreground mt-1">Real-time operational metrics and AI forecasting.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="border-l-4 border-l-purple-500">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Occupancy</p>
                <p className="text-3xl font-bold mt-2">78%</p>
              </div>
              <div className="p-3 bg-purple-500/10 rounded-full">
                <BedDouble className="w-5 h-5 text-purple-500" />
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-4 flex items-center text-emerald-500 font-medium">
              <TrendingUp className="w-3 h-3 mr-1" /> +2.5% from last week
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Staff</p>
                <p className="text-3xl font-bold mt-2">142</p>
              </div>
              <div className="p-3 bg-blue-500/10 rounded-full">
                <Users className="w-5 h-5 text-blue-500" />
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-4">Currently on shift</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-emerald-500">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-muted-foreground">AI Automation Savings</p>
                <p className="text-3xl font-bold mt-2">14h</p>
              </div>
              <div className="p-3 bg-emerald-500/10 rounded-full">
                <Activity className="w-5 h-5 text-emerald-500" />
              </div>
            </div>
             <p className="text-xs text-muted-foreground mt-4">Time saved via automated SOAP notes</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-amber-500 bg-amber-500/5">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Critical Alerts</p>
                <p className="text-3xl font-bold mt-2 text-amber-600">3</p>
              </div>
              <div className="p-3 bg-amber-500/10 rounded-full">
                <ShieldAlert className="w-5 h-5 text-amber-500" />
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-4">Requires immediate attention</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Department Occupancy</CardTitle>
            <CardDescription>Live bed availability across wards</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={occupancyData} layout="vertical" margin={{ top: 0, right: 0, left: 30, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="hsl(var(--border))" />
                  <XAxis type="number" tickLine={false} axisLine={false} fontSize={12} />
                  <YAxis dataKey="name" type="category" tickLine={false} axisLine={false} fontSize={12} />
                  <Tooltip 
                    cursor={{fill: 'hsl(var(--muted))'}}
                    contentStyle={{ backgroundColor: 'hsl(var(--card))', borderRadius: '8px', border: '1px solid hsl(var(--border))' }}
                  />
                  <Bar dataKey="occupied" stackId="a" fill="#a855f7" radius={[0, 0, 0, 0]} name="Occupied Beds" />
                  <Bar dataKey="beds" stackId="a" fill="hsl(var(--muted))" radius={[0, 4, 4, 0]} name="Total Beds" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>AI Resource Forecasting</CardTitle>
            <CardDescription>Predicted admission spikes for the next 24 hours</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center h-[300px] bg-muted/30 rounded-xl border border-dashed border-muted-foreground/30">
               <div className="text-center">
                 <Activity className="w-8 h-8 text-muted-foreground mx-auto mb-2 opacity-50" />
                 <p className="text-muted-foreground font-medium">Predictive graph generation...</p>
                 <p className="text-xs text-muted-foreground/70 mt-1">Simulating historical admission data</p>
               </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
