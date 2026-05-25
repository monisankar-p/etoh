import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { MessageSquare, Users, Award, TrendingUp, Sparkles } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { toast } from 'sonner';

export default function Community() {
  const discussions = [
    { id: 1, title: 'Unusual presentation of late-onset Pompe disease', author: 'Dr. E. Chen (Neurology)', replies: 24, views: 142, active: true },
    { id: 2, title: 'New guidelines for heart failure management post-discharge', author: 'Dr. M. Davis (Cardiology)', replies: 56, views: 310, active: false },
    { id: 3, title: 'AI Scribe prompt sharing - What works best for pediatric intake?', author: 'Dr. A. Johnson (Pediatrics)', replies: 18, views: 89, active: true },
  ];

  return (
    <div className="p-8 h-full flex flex-col bg-muted/10 overflow-y-auto">
      <div className="mb-8 flex justify-between items-end max-w-6xl mx-auto w-full">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3 mb-2">
            <Users className="w-8 h-8 text-emerald-500" />
            Medical Community
          </h1>
          <p className="text-muted-foreground">Collaborate on complex cases, share clinical insights, and discuss research.</p>
        </div>
        <Button className="bg-emerald-500 hover:bg-emerald-600" onClick={() => toast.info('Opening discussion editor...')}>New Discussion</Button>
      </div>

      <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3 flex flex-col gap-6">
          <Card className="border-emerald-500/20 bg-emerald-500/5">
            <CardContent className="p-4 flex items-center gap-4">
              <div className="w-12 h-12 bg-emerald-500/20 rounded-full flex items-center justify-center shrink-0">
                <Sparkles className="w-6 h-6 text-emerald-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-emerald-700 dark:text-emerald-400">etoh AI Daily Clinical Digest</h3>
                <p className="text-sm text-emerald-600/80 dark:text-emerald-500/80">3 new meta-analyses related to your active patients were published in the last 24h.</p>
              </div>
              <Button variant="outline" className="border-emerald-500 text-emerald-600 hover:bg-emerald-500 hover:text-white" onClick={() => toast.success('Loading digest...')}>Read Digest</Button>
            </CardContent>
          </Card>

          <Card className="flex-1">
            <CardHeader className="border-b">
              <CardTitle>Active Case Discussions</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {discussions.map((disc, idx) => (
                <div key={idx} className="p-6 border-b last:border-0 hover:bg-muted/30 transition-colors flex gap-4 cursor-pointer">
                  <div className="mt-1">
                    <MessageSquare className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg mb-1 hover:text-emerald-500 transition-colors">{disc.title}</h3>
                    <p className="text-sm text-muted-foreground">Started by {disc.author}</p>
                    <div className="flex gap-4 mt-3 text-xs text-muted-foreground font-semibold">
                      <span className="flex items-center gap-1"><MessageSquare className="w-3 h-3" /> {disc.replies} Replies</span>
                      <span className="flex items-center gap-1"><TrendingUp className="w-3 h-3" /> {disc.views} Views</span>
                      {disc.active && <span className="text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded">Hot Topic</span>}
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Top Contributors</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center font-bold text-xs text-blue-600">SJ</div>
                  <span className="font-semibold text-sm">Dr. Sarah Jones</span>
                </div>
                <Award className="w-4 h-4 text-amber-500" />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center font-bold text-xs text-emerald-600">MD</div>
                  <span className="font-semibold text-sm">Dr. M. Davis</span>
                </div>
                <Award className="w-4 h-4 text-slate-400" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Live Clinical Poll</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm font-semibold mb-4">Preferred first-line for uncomplicated UTI in pregnancy?</p>
              <div className="space-y-2">
                <div className="w-full bg-muted rounded relative overflow-hidden h-8 flex items-center px-3 cursor-pointer hover:bg-muted/80">
                  <div className="absolute top-0 left-0 h-full bg-emerald-500/20 w-[65%]" />
                  <span className="relative z-10 text-xs font-semibold flex justify-between w-full"><span>Cephalexin</span> <span>65%</span></span>
                </div>
                <div className="w-full bg-muted rounded relative overflow-hidden h-8 flex items-center px-3 cursor-pointer hover:bg-muted/80">
                  <div className="absolute top-0 left-0 h-full bg-emerald-500/20 w-[20%]" />
                  <span className="relative z-10 text-xs font-semibold flex justify-between w-full"><span>Nitrofurantoin</span> <span>20%</span></span>
                </div>
                <div className="w-full bg-muted rounded relative overflow-hidden h-8 flex items-center px-3 cursor-pointer hover:bg-muted/80">
                  <div className="absolute top-0 left-0 h-full bg-emerald-500/20 w-[15%]" />
                  <span className="relative z-10 text-xs font-semibold flex justify-between w-full"><span>Fosfomycin</span> <span>15%</span></span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
