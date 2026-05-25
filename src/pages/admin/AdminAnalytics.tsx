import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card';
import { TrendingUp, DollarSign } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function AdminAnalytics() {
  const financialData = [
    { month: 'Jan', revenue: 4000, expenses: 2400 },
    { month: 'Feb', revenue: 3000, expenses: 1398 },
    { month: 'Mar', revenue: 2000, expenses: 9800 },
    { month: 'Apr', revenue: 2780, expenses: 3908 },
    { month: 'May', revenue: 1890, expenses: 4800 },
    { month: 'Jun', revenue: 2390, expenses: 3800 },
    { month: 'Jul', revenue: 3490, expenses: 4300 },
  ];

  return (
    <div className="p-8 h-full flex flex-col bg-muted/10 overflow-y-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold flex items-center gap-3 mb-2">
          <TrendingUp className="w-8 h-8 text-purple-500" />
          Financial & Operational Analytics
        </h1>
        <p className="text-muted-foreground">High-level hospital performance metrics.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
         <Card className="border-l-4 border-l-emerald-500">
           <CardContent className="p-6">
             <div className="flex justify-between items-start">
               <div>
                 <p className="text-sm font-medium text-muted-foreground">Monthly Revenue</p>
                 <p className="text-3xl font-bold mt-2">$2.4M</p>
               </div>
               <div className="p-3 bg-emerald-500/10 rounded-full">
                 <DollarSign className="w-5 h-5 text-emerald-500" />
               </div>
             </div>
           </CardContent>
         </Card>

         <Card className="border-l-4 border-l-destructive">
           <CardContent className="p-6">
             <div className="flex justify-between items-start">
               <div>
                 <p className="text-sm font-medium text-muted-foreground">Operating Expenses</p>
                 <p className="text-3xl font-bold mt-2">$1.8M</p>
               </div>
               <div className="p-3 bg-destructive/10 rounded-full">
                 <TrendingUp className="w-5 h-5 text-destructive transform rotate-180" />
               </div>
             </div>
           </CardContent>
         </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Revenue vs Expenses (YTD)</CardTitle>
          <CardDescription>etoh AI has optimized supply chain costs by 12% in Q2</CardDescription>
        </CardHeader>
        <CardContent className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={financialData}>
              <XAxis dataKey="month" tickLine={false} axisLine={false} fontSize={12} />
              <YAxis tickLine={false} axisLine={false} fontSize={12} />
              <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', borderRadius: '8px', border: '1px solid hsl(var(--border))' }} />
              <Area type="monotone" dataKey="revenue" stackId="1" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity={0.3} />
              <Area type="monotone" dataKey="expenses" stackId="2" stroke="hsl(var(--destructive))" fill="hsl(var(--destructive))" fillOpacity={0.3} />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
