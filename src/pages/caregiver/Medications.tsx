import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card';
import { Pill, AlertTriangle, Clock } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { toast } from 'sonner';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { useState } from 'react';

export default function Medications() {
  const [showMissedDose, setShowMissedDose] = useState(true);
  const adherenceData = [
    { day: 'Mon', arthur: 90, martha: 95 }, 
    { day: 'Tue', arthur: 85, martha: 98 }, 
    { day: 'Wed', arthur: 88, martha: 92 },
    { day: 'Thu', arthur: 75, martha: 96 }, 
    { day: 'Fri', arthur: 82, martha: 95 }, 
    { day: 'Sat', arthur: 95, martha: 99 }, 
    { day: 'Sun', arthur: 91, martha: 97 }
  ];

  return (
    <div className="p-4 md:p-8 h-full flex flex-col bg-muted/10 overflow-y-auto">
      <div className="mb-8 max-w-5xl mx-auto w-full">
        <h1 className="text-3xl font-bold flex items-center gap-3 mb-2">
          <Pill className="w-8 h-8 text-violet-500" />
          Medication Management
        </h1>
        <p className="text-muted-foreground">Monitor adherence, refill requests, and active prescriptions.</p>
      </div>

      <div className="max-w-5xl mx-auto w-full grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">Family Adherence Trends</CardTitle>
            <CardDescription>7-day compliance average: 86.5%</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={adherenceData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorArthur" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--indigo-500))" stopOpacity={0.5}/>
                      <stop offset="95%" stopColor="hsl(var(--indigo-500))" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorMartha" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--rose-500))" stopOpacity={0.5}/>
                      <stop offset="95%" stopColor="hsl(var(--rose-500))" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--muted-foreground)/0.2)" />
                  <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} domain={[60, 100]} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'hsl(var(--background))', color: 'hsl(var(--foreground))', borderRadius: '8px', border: '1px solid hsl(var(--border))', boxShadow: '0 4px 6px -1px hsl(var(--foreground)/0.1)' }}
                    itemStyle={{ fontWeight: 'bold', color: 'hsl(var(--foreground))' }}
                    labelStyle={{ color: 'hsl(var(--muted-foreground))' }}
                  />
                  <Legend wrapperStyle={{ color: 'hsl(var(--foreground))' }} verticalAlign="top" height={36} iconType="circle" />
                  <Area type="monotone" dataKey="martha" name="Martha Mercer" stroke="hsl(var(--rose-500))" strokeWidth={3} fillOpacity={1} fill="url(#colorMartha)" activeDot={{ r: 6 }} />
                  <Area type="monotone" dataKey="arthur" name="Arthur Mercer" stroke="hsl(var(--indigo-500))" strokeWidth={3} fillOpacity={1} fill="url(#colorArthur)" activeDot={{ r: 6 }} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="shadow-sm border-rose-500/30">
            <CardHeader className="bg-rose-500/5 pb-4">
              <CardTitle className="text-rose-500 flex items-center gap-2 text-base"><AlertTriangle className="w-4 h-4"/> Critical Alerts</CardTitle>
            </CardHeader>
            <CardContent className="pt-4 space-y-3">
              {showMissedDose ? (
                <div className="p-3 border border-rose-500/20 rounded-xl bg-background animate-in fade-in">
                  <p className="text-sm font-bold text-rose-500 mb-1">Missed: Metoprolol 50mg</p>
                  <p className="text-xs text-muted-foreground mb-3">Arthur Mercer • Due 2 hours ago</p>
                  <Button size="sm" className="w-full bg-rose-500 hover:bg-rose-600 text-white" onClick={() => {
                    setShowMissedDose(false);
                    toast.success('Marked administered');
                  }}>Acknowledge Late</Button>
                </div>
              ) : (
                <div className="text-center p-4 opacity-50 text-sm">No critical alerts.</div>
              )}
            </CardContent>
          </Card>
          
          <Card className="shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-base flex items-center gap-2"><Clock className="w-4 h-4 text-violet-500"/> Refills Due Soon</CardTitle>
            </CardHeader>
            <CardContent className="pt-4 space-y-3">
              <div className="flex justify-between items-center p-3 border rounded-xl hover:border-violet-500/30">
                 <div>
                   <p className="text-sm font-bold">Lisinopril 10mg</p>
                   <p className="text-xs text-muted-foreground mt-0.5">3 days supply left</p>
                 </div>
                 <Button size="sm" variant="outline" className="text-xs">Request</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
