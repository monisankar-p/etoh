import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card';
import { MessageSquare, Users, Award, TrendingUp, Sparkles, ShieldCheck, FileText, Video, Link as LinkIcon, Search, CheckCircle2, Bookmark, Share2, Stethoscope, BriefcaseMedical, Activity, BookOpen, X } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { toast } from 'sonner';
import { Input } from '../../components/ui/input';

export default function Community() {
  const [activeTab, setActiveTab] = useState<'feed' | 'mdt' | 'research' | 'referrals'>('feed');
  const [activeSpecialty, setActiveSpecialty] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isReferralModalOpen, setIsReferralModalOpen] = useState(false);
  const [newDiscussion, setNewDiscussion] = useState({ title: '', tags: '', specialty: 'Cardiology' });
  const [referralData, setReferralData] = useState({ patient: '', specialty: 'Neurology', reason: '' });

  const specialties = ['All', 'Cardiology', 'Neurology', 'Pediatrics', 'Oncology', 'Internal Med'];

  const [discussions, setDiscussions] = useState([
    { id: 1, title: 'Unusual presentation of late-onset Pompe disease', author: 'Dr. E. Chen', specialty: 'Neurology', replies: 24, views: 142, active: true, tags: ['Anonymized Case', 'Rare Disease'], verified: true, rep: 980 },
    { id: 2, title: 'New guidelines for heart failure management post-discharge', author: 'Dr. M. Davis', specialty: 'Cardiology', replies: 56, views: 310, active: false, tags: ['Guidelines'], verified: true, rep: 1250 },
    { id: 3, title: 'Second Opinion Needed: 12yo with persistent unexplainable fevers', author: 'Dr. A. Johnson', specialty: 'Pediatrics', replies: 18, views: 89, active: true, tags: ['Second Opinion', 'Anonymized Case'], verified: true, rep: 450 },
    { id: 4, title: 'Impact of SGLT2 inhibitors on non-diabetic CKD progression', author: 'Dr. S. Rahman', specialty: 'Internal Med', replies: 32, views: 205, active: false, tags: ['Research', 'Nephrology'], verified: true, rep: 890 },
  ]);

  const handlePostDiscussion = () => {
    if (!newDiscussion.title) return;
    setDiscussions([
      {
        id: Date.now(),
        title: newDiscussion.title,
        author: 'Dr. Alex Johnson',
        specialty: newDiscussion.specialty,
        replies: 0,
        views: 0,
        active: true,
        tags: newDiscussion.tags.split(',').map(t => t.trim()).filter(t => t),
        verified: true,
        rep: 2400
      },
      ...discussions
    ]);
    setIsModalOpen(false);
    setNewDiscussion({ title: '', tags: '', specialty: 'Cardiology' });
    toast.success('Discussion posted successfully');
  };

  const mdtRooms = [
    { id: 1, topic: 'Complex Oncology Case: Stage 4 NSCLC', scheduled: 'Today, 2:00 PM', participants: ['Oncology', 'Pulmonology', 'Radiology'], active: true },
    { id: 2, topic: 'Neonatal ICU Transition Planning', scheduled: 'Tomorrow, 10:00 AM', participants: ['Pediatrics', 'NICU', 'Social Work'], active: false },
  ];

  const renderFeed = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {specialties.map(spec => (
            <Button 
              key={spec} 
              variant={activeSpecialty === spec ? 'default' : 'outline'} 
              size="sm" 
              className={`rounded-full ${activeSpecialty === spec ? 'bg-emerald-500 hover:bg-emerald-600' : 'border-emerald-500/30 text-emerald-700'}`}
              onClick={() => setActiveSpecialty(spec)}
            >
              {spec}
            </Button>
          ))}
        </div>
        <div className="relative w-64 hidden sm:block">
          <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search cases..." className="pl-9 bg-background border-emerald-500/20 focus-visible:ring-emerald-500" />
        </div>
      </div>

      <Card className="border-emerald-500/20 bg-emerald-500/5">
        <CardContent className="p-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="w-12 h-12 bg-emerald-500/20 rounded-full flex items-center justify-center shrink-0">
            <Sparkles className="w-6 h-6 text-emerald-600" />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-2">
              AI Clinical Insights <span className="text-[10px] bg-emerald-500/20 px-2 py-0.5 rounded-full text-emerald-700">Auto-generated</span>
            </h3>
            <p className="text-sm text-emerald-600/80 dark:text-emerald-500/80 mt-1">Based on your recent pediatric cases, 2 new meta-analyses on Kawasaki disease treatment protocols are highly relevant.</p>
          </div>
          <Button variant="outline" className="border-emerald-500 text-emerald-600 hover:bg-emerald-500 hover:text-white shrink-0 w-full sm:w-auto" onClick={() => toast.success('Loading digest...')}>Read Research</Button>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {discussions.filter(d => activeSpecialty === 'All' || d.specialty === activeSpecialty).map(disc => (
          <Card key={disc.id} className="hover:border-emerald-500/50 transition-colors cursor-pointer group shadow-sm hover:shadow-md">
            <CardContent className="p-6">
              <div className="flex gap-4">
                <div className="hidden sm:flex flex-col items-center gap-1 min-w-[60px]">
                  <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center relative">
                    <span className="font-bold text-lg text-emerald-600">{disc.author.charAt(4)}</span>
                    {disc.verified && (
                      <div className="absolute -bottom-1 -right-1 bg-emerald-500 rounded-full p-0.5 border-2 border-background">
                        <CheckCircle2 className="w-3 h-3 text-white" />
                      </div>
                    )}
                  </div>
                  <span className="text-[10px] font-bold text-emerald-600 flex items-center gap-0.5">
                    <Award className="w-3 h-3" /> {disc.rep}
                  </span>
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap gap-2 mb-2">
                    {disc.tags.map(tag => (
                      <span key={tag} className={`text-[10px] font-bold px-2 py-0.5 rounded-sm uppercase ${
                        tag === 'Second Opinion' ? 'bg-amber-500/10 text-amber-600' :
                        tag === 'Anonymized Case' ? 'bg-blue-500/10 text-blue-600' :
                        'bg-slate-500/10 text-slate-600'
                      }`}>
                        {tag}
                      </span>
                    ))}
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-sm uppercase bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
                      {disc.specialty}
                    </span>
                  </div>
                  <h3 className="font-bold text-lg mb-1 group-hover:text-emerald-500 transition-colors">{disc.title}</h3>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-sm font-medium text-foreground">{disc.author}</span>
                    <span className="text-muted-foreground text-xs">• 2 hours ago</span>
                  </div>
                  <div className="flex gap-4 mt-3 text-xs text-muted-foreground font-semibold">
                    <span className="flex items-center gap-1"><MessageSquare className="w-4 h-4" /> {disc.replies} Replies</span>
                    <span className="flex items-center gap-1"><TrendingUp className="w-4 h-4" /> {disc.views} Views</span>
                    {disc.active && <span className="text-rose-500 bg-rose-500/10 px-2 py-0.5 rounded flex items-center gap-1"><Activity className="w-3 h-3" /> Trending</span>}
                  </div>
                </div>
                <div className="hidden md:flex flex-col items-end gap-2">
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-emerald-500"><Bookmark className="w-4 h-4" /></Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-emerald-500"><Share2 className="w-4 h-4" /></Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderMDT = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-background p-4 rounded-xl border shadow-sm">
        <div>
          <h2 className="font-bold text-lg flex items-center gap-2"><Video className="w-5 h-5 text-emerald-500" /> Multi-Disciplinary Team (MDT) Hub</h2>
          <p className="text-sm text-muted-foreground">Secure tele-collaboration for complex case management.</p>
        </div>
        <Button className="bg-emerald-500 hover:bg-emerald-600"><Users className="w-4 h-4 mr-2" /> Schedule MDT</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mdtRooms.map(room => (
          <Card key={room.id} className={room.active ? 'border-emerald-500/50 shadow-md ring-1 ring-emerald-500/20' : ''}>
            <CardHeader className="pb-3 border-b">
              <div className="flex justify-between items-start">
                <CardTitle className="text-base leading-tight">{room.topic}</CardTitle>
                {room.active && <span className="flex h-3 w-3 rounded-full bg-rose-500 animate-pulse shrink-0"></span>}
              </div>
              <CardDescription>{room.scheduled}</CardDescription>
            </CardHeader>
            <CardContent className="pt-4 space-y-4">
              <div>
                <p className="text-xs font-semibold text-muted-foreground mb-2 uppercase">Required Specialties</p>
                <div className="flex flex-wrap gap-2">
                  {room.participants.map(p => (
                    <span key={p} className="text-xs bg-muted px-2 py-1 rounded-md font-medium border">{p}</span>
                  ))}
                </div>
              </div>
              <div className="pt-2">
                <Button className={`w-full ${room.active ? 'bg-emerald-500 hover:bg-emerald-600' : 'bg-muted text-muted-foreground hover:bg-muted/80'}`} variant={room.active ? 'default' : 'secondary'}>
                  {room.active ? 'Join Secure Tele-Call' : 'Remind Me'}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderResearch = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-background p-4 rounded-xl border shadow-sm">
        <div>
          <h2 className="font-bold text-lg flex items-center gap-2"><FileText className="w-5 h-5 text-emerald-500" /> Clinical Research Hub</h2>
          <p className="text-sm text-muted-foreground">Access pre-prints, peer-reviewed articles, and share findings.</p>
        </div>
        <Button className="bg-emerald-500 hover:bg-emerald-600"><FileText className="w-4 h-4 mr-2" /> Upload Paper</Button>
      </div>

      <Card>
        <CardContent className="p-8 text-center text-muted-foreground">
          <BookOpen className="w-12 h-12 mx-auto mb-4 text-emerald-500/30" />
          <h3 className="font-bold text-lg text-foreground">Global Research Library</h3>
          <p className="max-w-md mx-auto mt-2 text-sm">Integration with PubMed and internal hospital repositories is active. Search for research to share directly into discussion feeds.</p>
          <div className="mt-6 max-w-sm mx-auto relative">
             <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
             <Input placeholder="Search journals..." className="pl-10 h-12 text-base" />
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderReferrals = () => (
    <div className="space-y-6">
       <div className="flex justify-between items-center bg-background p-4 rounded-xl border shadow-sm">
        <div>
          <h2 className="font-bold text-lg flex items-center gap-2"><LinkIcon className="w-5 h-5 text-emerald-500" /> Internal Referral Workflows</h2>
          <p className="text-sm text-muted-foreground">Seamlessly transfer patient context to specialists within the network.</p>
        </div>
        <Button className="bg-emerald-500 hover:bg-emerald-600" onClick={() => setIsReferralModalOpen(true)}>
          <Stethoscope className="w-4 h-4 mr-2" /> New Referral
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="text-base">Active Outbound Referrals</CardTitle>
          </CardHeader>
          <CardContent className="text-center py-12 text-muted-foreground text-sm">
            You have no pending outbound referrals at this time.
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Inbound Requests</CardTitle>
          </CardHeader>
          <CardContent className="text-center py-12 text-muted-foreground text-sm">
            No inbound referral requests for your specialty.
          </CardContent>
        </Card>
      </div>
    </div>
  );

  return (
    <div className="p-4 md:p-8 h-full flex flex-col bg-muted/10 overflow-y-auto">
      <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 max-w-7xl mx-auto w-full">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3 mb-2">
            <ShieldCheck className="w-8 h-8 text-emerald-500" />
            Verified Doctor Community
          </h1>
          <p className="text-muted-foreground">A secure ecosystem for case collaboration, second opinions, and research.</p>
        </div>
        <Button className="bg-emerald-500 hover:bg-emerald-600" onClick={() => setIsModalOpen(true)}>
          <MessageSquare className="w-4 h-4 mr-2" /> New Discussion
        </Button>
      </div>

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Main Content Area */}
        <div className="lg:col-span-3 flex flex-col gap-6">
          
          {/* Navigation Tabs */}
          <div className="flex bg-background border rounded-xl p-1 shadow-sm overflow-x-auto scrollbar-hide">
             <Button variant={activeTab === 'feed' ? 'default' : 'ghost'} className={`flex-1 min-w-[120px] rounded-lg ${activeTab === 'feed' ? 'bg-emerald-500 hover:bg-emerald-600' : ''}`} onClick={() => setActiveTab('feed')}>
               <MessageSquare className="w-4 h-4 mr-2" /> Feeds
             </Button>
             <Button variant={activeTab === 'mdt' ? 'default' : 'ghost'} className={`flex-1 min-w-[120px] rounded-lg ${activeTab === 'mdt' ? 'bg-emerald-500 hover:bg-emerald-600' : ''}`} onClick={() => setActiveTab('mdt')}>
               <Video className="w-4 h-4 mr-2" /> MDT Hub
             </Button>
             <Button variant={activeTab === 'research' ? 'default' : 'ghost'} className={`flex-1 min-w-[120px] rounded-lg ${activeTab === 'research' ? 'bg-emerald-500 hover:bg-emerald-600' : ''}`} onClick={() => setActiveTab('research')}>
               <FileText className="w-4 h-4 mr-2" /> Research
             </Button>
             <Button variant={activeTab === 'referrals' ? 'default' : 'ghost'} className={`flex-1 min-w-[120px] rounded-lg ${activeTab === 'referrals' ? 'bg-emerald-500 hover:bg-emerald-600' : ''}`} onClick={() => setActiveTab('referrals')}>
               <LinkIcon className="w-4 h-4 mr-2" /> Referrals
             </Button>
          </div>

          {activeTab === 'feed' && renderFeed()}
          {activeTab === 'mdt' && renderMDT()}
          {activeTab === 'research' && renderResearch()}
          {activeTab === 'referrals' && renderReferrals()}

        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          
          {/* Verified Profile Card */}
          <Card className="border-emerald-500/30 shadow-md relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-emerald-500" />
            <CardContent className="pt-6 pb-6 text-center">
               <div className="w-20 h-20 bg-emerald-500/10 border-2 border-emerald-500 mx-auto rounded-full flex items-center justify-center relative mb-4">
                  <BriefcaseMedical className="w-8 h-8 text-emerald-600" />
                  <div className="absolute -bottom-2 -right-2 bg-emerald-500 rounded-full p-1 border-2 border-background shadow-sm">
                     <CheckCircle2 className="w-4 h-4 text-white" />
                  </div>
               </div>
               <h3 className="font-bold text-lg">Dr. Alex Johnson</h3>
               <p className="text-sm font-medium text-emerald-600 mt-1">Attending Physician • Internal Med</p>
               
               <div className="flex justify-center gap-6 mt-6 pt-6 border-t">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-foreground">2.4k</p>
                    <p className="text-[10px] uppercase font-bold text-muted-foreground flex items-center justify-center gap-1"><Award className="w-3 h-3 text-emerald-500" /> Reputation</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-foreground">14</p>
                    <p className="text-[10px] uppercase font-bold text-muted-foreground flex items-center justify-center gap-1"><MessageSquare className="w-3 h-3 text-emerald-500" /> Cases Solved</p>
                  </div>
               </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Network Top Contributors</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between group cursor-pointer p-2 -mx-2 rounded hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center font-bold text-sm text-blue-600 relative">
                    SJ
                    <div className="absolute -bottom-1 -right-1 bg-emerald-500 rounded-full p-0.5 border border-background">
                       <CheckCircle2 className="w-2.5 h-2.5 text-white" />
                    </div>
                  </div>
                  <div>
                    <span className="font-bold text-sm group-hover:text-emerald-500 transition-colors">Dr. Sarah Jones</span>
                    <p className="text-[10px] text-muted-foreground font-semibold">Neurology • 12k Rep</p>
                  </div>
                </div>
                <Award className="w-5 h-5 text-amber-500 drop-shadow-sm" />
              </div>
              <div className="flex items-center justify-between group cursor-pointer p-2 -mx-2 rounded hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center font-bold text-sm text-emerald-600 relative">
                    MD
                    <div className="absolute -bottom-1 -right-1 bg-emerald-500 rounded-full p-0.5 border border-background">
                       <CheckCircle2 className="w-2.5 h-2.5 text-white" />
                    </div>
                  </div>
                  <div>
                    <span className="font-bold text-sm group-hover:text-emerald-500 transition-colors">Dr. M. Davis</span>
                    <p className="text-[10px] text-muted-foreground font-semibold">Cardiology • 9.8k Rep</p>
                  </div>
                </div>
                <Award className="w-5 h-5 text-slate-400 drop-shadow-sm" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2"><ShieldCheck className="w-5 h-5 text-emerald-500" /> Secure Communications</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground mb-4">All discussions and MDT tele-calls are end-to-end encrypted and HIPAA compliant.</p>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Anonymization protocols active
                </div>
                <div className="flex items-center gap-2 text-sm font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" /> E2E Encryption active
                </div>
                <div className="flex items-center gap-2 text-sm font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Verified MDs only
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* New Discussion Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-lg shadow-2xl border-emerald-500/30">
            <CardHeader className="border-b bg-emerald-500/5 flex flex-row items-center justify-between">
              <div>
                <CardTitle>New Discussion</CardTitle>
                <CardDescription>Start a secure clinical discussion or ask for a second opinion.</CardDescription>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setIsModalOpen(false)}>
                <X className="w-5 h-5" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Discussion Title</label>
                <Input 
                  value={newDiscussion.title} 
                  onChange={e => setNewDiscussion({...newDiscussion, title: e.target.value})} 
                  placeholder="e.g., Guidance on atypical presentation of..." 
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Target Specialty</label>
                  <select 
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    value={newDiscussion.specialty}
                    onChange={e => setNewDiscussion({...newDiscussion, specialty: e.target.value})}
                  >
                    {specialties.filter(s => s !== 'All').map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Tags (comma separated)</label>
                  <Input 
                    value={newDiscussion.tags} 
                    onChange={e => setNewDiscussion({...newDiscussion, tags: e.target.value})} 
                    placeholder="e.g., Second Opinion, Anonymized Case" 
                  />
                </div>
              </div>
              <div className="space-y-2">
                  <label className="text-sm font-medium">Clinical Details (Anonymized)</label>
                  <textarea 
                    className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Describe the case or research..."
                  />
              </div>
            </CardContent>
            <div className="p-6 border-t flex justify-end gap-2 bg-muted/30">
              <Button variant="outline" onClick={() => setIsModalOpen(false)}>Cancel</Button>
              <Button className="bg-emerald-500 hover:bg-emerald-600" onClick={handlePostDiscussion}>Post Discussion</Button>
            </div>
          </Card>
        </div>
      )}

      {/* New Referral Modal */}
      {isReferralModalOpen && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-lg shadow-2xl border-emerald-500/30">
            <CardHeader className="border-b bg-emerald-500/5 flex flex-row items-center justify-between">
              <div>
                <CardTitle>New Internal Referral</CardTitle>
                <CardDescription>Securely transfer patient context to a network specialist.</CardDescription>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setIsReferralModalOpen(false)}>
                <X className="w-5 h-5" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Patient Name or MRN</label>
                <Input 
                  value={referralData.patient} 
                  onChange={e => setReferralData({...referralData, patient: e.target.value})} 
                  placeholder="e.g., John Doe or MRN-12345" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Target Specialty</label>
                <select 
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  value={referralData.specialty}
                  onChange={e => setReferralData({...referralData, specialty: e.target.value})}
                >
                  {specialties.filter(s => s !== 'All').map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                  <label className="text-sm font-medium">Reason for Referral</label>
                  <textarea 
                    className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Provide brief clinical context..."
                    value={referralData.reason}
                    onChange={e => setReferralData({...referralData, reason: e.target.value})}
                  />
              </div>
            </CardContent>
            <div className="p-6 border-t flex justify-end gap-2 bg-muted/30">
              <Button variant="outline" onClick={() => setIsReferralModalOpen(false)}>Cancel</Button>
              <Button className="bg-emerald-500 hover:bg-emerald-600" onClick={() => {
                if (!referralData.patient) return;
                setIsReferralModalOpen(false);
                setReferralData({ patient: '', specialty: 'Neurology', reason: '' });
                toast.success('Referral request sent successfully');
              }}>Send Referral</Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
