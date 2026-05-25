import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Users, Calendar, Activity, ArrowRight, ActivitySquare, CheckCircle, TrendingUp, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { generateVitalsTimeline } from '../../mock/data';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function DoctorDashboard() {
  const navigate = useNavigate();
  const vitalsData = generateVitalsTimeline();

  return (
    <div className="p-8 h-full flex flex-col bg-muted/10 overflow-y-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold flex items-center gap-3 mb-2">
          <ActivitySquare className="w-8 h-8 text-emerald-500" />
          Doctor Overview
        </h1>
        <p className="text-muted-foreground">Welcome back. Here is your practice at a glance.</p>
      </div>

      {/* Top Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Today's Patients</p>
                <h3 className="text-3xl font-bold">24</h3>
              </div>
              <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center">
                <Users className="w-5 h-5 text-emerald-500" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Pending Notes</p>
                <h3 className="text-3xl font-bold text-amber-500">3</h3>
              </div>
              <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center">
                <FileText className="w-5 h-5 text-amber-500" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Critical IPD Alerts</p>
                <h3 className="text-3xl font-bold text-destructive">2</h3>
              </div>
              <div className="w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center">
                <Activity className="w-5 h-5 text-destructive" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Completed Consults</p>
                <h3 className="text-3xl font-bold">12</h3>
              </div>
              <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-blue-500" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Workflows</CardTitle>
            <CardDescription>Navigate to your primary workspaces.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button 
              variant="outline" 
              className="w-full justify-between h-14 text-lg hover:bg-emerald-500 hover:text-white hover:border-emerald-500 group transition-all"
              onClick={() => navigate('/doctor/consultations')}
            >
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5" />
                Start OPD Consultations
              </div>
              <ArrowRight className="w-5 h-5 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
            </Button>
            <Button 
              variant="outline" 
              className="w-full justify-between h-14 text-lg hover:bg-destructive hover:text-white hover:border-destructive group transition-all"
              onClick={() => navigate('/doctor/roic')}
            >
              <div className="flex items-center gap-3">
                <Activity className="w-5 h-5" />
                Open ROIC / IPD Monitor
              </div>
              <ArrowRight className="w-5 h-5 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
            </Button>
          </CardContent>
        </Card>

        {/* Practice Analytics Mini */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-emerald-500" />
              Patient Volume Trend
            </CardTitle>
          </CardHeader>
          <CardContent>
             <div className="h-[200px] w-full">
               <ResponsiveContainer width="100%" height="100%">
                 <LineChart data={vitalsData.slice(0, 10)}>
                   <XAxis dataKey="time" fontSize={12} tickLine={false} axisLine={false} />
                   <YAxis fontSize={12} tickLine={false} axisLine={false} />
                   <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                   <Line type="monotone" dataKey="hr" stroke="#10b981" strokeWidth={3} dot={{r: 4}} />
                 </LineChart>
               </ResponsiveContainer>
             </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
