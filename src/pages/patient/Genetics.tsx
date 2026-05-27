import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card';
import { Activity, Dna, AlertTriangle, UserPlus, X, Sparkles, TrendingUp } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { MockAIService } from '../../services/mockAIService';
import { familyVitalsTimeline } from '../../mock/data';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

type FamilyMember = {
  id: string;
  relation: string;
  gender: 'M' | 'F';
  generation: 'grandparents' | 'parents' | 'siblings' | 'children';
  side: 'paternal' | 'maternal' | 'none';
  condition?: string;
  conditionColor?: string;
};

const initialMembers: FamilyMember[] = [
  { id: '1', relation: 'Paternal GF', gender: 'M', generation: 'grandparents', side: 'paternal', condition: 'Hypertension', conditionColor: 'amber-500' },
  { id: '2', relation: 'Paternal GM', gender: 'F', generation: 'grandparents', side: 'paternal' },
  { id: '3', relation: 'Maternal GF', gender: 'M', generation: 'grandparents', side: 'maternal' },
  { id: '4', relation: 'Maternal GM', gender: 'F', generation: 'grandparents', side: 'maternal', condition: 'Diabetes T2', conditionColor: 'destructive' },
  { id: '5', relation: 'Father', gender: 'M', generation: 'parents', side: 'paternal', condition: 'Hypertension Risk', conditionColor: 'amber-500' },
  { id: '6', relation: 'Mother', gender: 'F', generation: 'parents', side: 'maternal', condition: 'Diabetes T2', conditionColor: 'destructive' },
];

export default function Genetics() {
  const [members, setMembers] = useState<FamilyMember[]>(initialMembers);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newMember, setNewMember] = useState<Partial<FamilyMember>>({ gender: 'M', generation: 'parents', side: 'paternal' });
  const [aiInsight, setAiInsight] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedVital, setSelectedVital] = useState<'Systolic BP' | 'HbA1c' | 'Cholesterol'>('Systolic BP');

  useEffect(() => {
    const generateInsights = async () => {
      setIsGenerating(true);
      setAiInsight('');
      try {
        const stream = MockAIService.streamResponse('Analyze family genetic patterns and identify hereditary risks.', 20);
        for await (const chunk of stream) {
          setAiInsight(prev => prev + chunk + ' ');
        }
      } catch (error) {
        console.error('Error generating insights', error);
      } finally {
        setIsGenerating(false);
      }
    };
    generateInsights();
  }, [members]);

  const handleAddMember = () => {
    if (!newMember.relation) return;
    
    setMembers([
      ...members, 
      { 
        id: Date.now().toString(), 
        relation: newMember.relation, 
        gender: newMember.gender as 'M' | 'F', 
        generation: newMember.generation as any,
        side: newMember.side as any,
        condition: newMember.condition,
        conditionColor: newMember.condition ? 'purple-500' : undefined
      }
    ]);
    setIsModalOpen(false);
    setNewMember({ gender: 'M', generation: 'parents', side: 'paternal' });
  };

  const getInitials = (relation: string) => {
    const parts = relation.split(' ');
    if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  const renderNodeGroup = (groupMembers: FamilyMember[]) => (
    <div className="flex gap-4 sm:gap-8 justify-center">
      {groupMembers.map(m => (
        <div key={m.id} className="flex flex-col items-center group cursor-pointer transition-transform hover:scale-110">
          <div className={`w-14 h-14 sm:w-16 sm:h-16 border-2 flex items-center justify-center font-bold text-base sm:text-lg mb-2 relative shadow-sm group-hover:shadow-md transition-all ${
            m.gender === 'F' ? 'rounded-full' : 'rounded-lg'
          } ${
            m.condition ? `bg-${m.conditionColor}/10 border-${m.conditionColor}/50` : 'bg-muted border-muted-foreground/30'
          }`}>
            {getInitials(m.relation)}
            {m.condition && (
              <div className={`absolute -top-2 -right-2 w-5 h-5 bg-${m.conditionColor} rounded-full flex items-center justify-center shadow-sm`}>
                <AlertTriangle className="w-3 h-3 text-white" />
              </div>
            )}
          </div>
          <p className="text-[10px] sm:text-xs font-semibold whitespace-nowrap">{m.relation}</p>
          {m.condition && <p className={`text-[8px] sm:text-[10px] font-bold text-${m.conditionColor} whitespace-nowrap`}>{m.condition}</p>}
        </div>
      ))}
    </div>
  );

  return (
    <div className="p-4 md:p-8 h-full flex flex-col bg-muted/10 overflow-y-auto">
      <div className="mb-8 max-w-7xl mx-auto w-full flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-3 mb-2">
            <Dna className="w-8 h-8 text-primary" />
            Family Health & Genetics Dashboard
          </h1>
          <p className="text-muted-foreground text-sm md:text-base">Interactive genetic mapping, cross-family longitudinal tracking, and inherited disease risk profiles.</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 gap-2 w-full sm:w-auto" onClick={() => setIsModalOpen(true)}>
          <UserPlus className="w-4 h-4" /> Add Relative
        </Button>
      </div>

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          
          {/* Family Tree */}
          <Card className="min-h-[500px] border-primary/20 bg-background/50 relative overflow-x-auto shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="min-w-[900px] w-full min-h-[500px] relative flex flex-col items-center justify-center p-8">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(var(--primary),0.05)_1px,transparent_1px)] bg-[length:24px_24px]" />
              
              <div className="relative z-10 flex flex-col items-center w-full">
                
                {/* Grandparents Layer */}
                <div className="flex w-full justify-around mb-2">
                  <div className="flex-1 flex justify-center">
                    {renderNodeGroup(members.filter(m => m.generation === 'grandparents' && m.side === 'paternal'))}
                  </div>
                  <div className="flex-1 flex justify-center">
                    {renderNodeGroup(members.filter(m => m.generation === 'grandparents' && m.side === 'maternal'))}
                  </div>
                </div>

                {/* Connecting Lines to Parents */}
                <div className="flex w-full relative h-12 mb-4">
                   <div className="flex-1 h-full flex justify-end">
                      <div className="w-1/2 h-full border-t-2 border-r-2 border-muted-foreground/30 rounded-tr-xl"></div>
                   </div>
                   <div className="flex-1 h-full flex justify-start">
                      <div className="w-1/2 h-full border-t-2 border-l-2 border-muted-foreground/30 rounded-tl-xl -ml-[2px]"></div>
                   </div>
                </div>

                {/* Parents Layer */}
                <div className="flex gap-16 sm:gap-24 mb-2">
                  {renderNodeGroup(members.filter(m => m.generation === 'parents'))}
                </div>

                {/* Connecting Lines to You */}
                 <div className="flex w-full justify-center relative h-12 mb-4">
                   <div className="w-[2px] bg-muted-foreground/30 h-full" />
                </div>

                {/* You Layer */}
                <div className="flex flex-col items-center group cursor-pointer transition-transform hover:scale-105">
                    <div className="w-20 h-20 rounded-xl bg-primary/10 border-4 border-primary shadow-[0_0_15px_rgba(var(--primary),0.2)] flex items-center justify-center font-bold text-xl mb-2 text-primary relative">
                      YOU
                      <div className="absolute -top-3 -right-3 w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center shadow-md animate-pulse">
                        <AlertTriangle className="w-3.5 h-3.5 text-white" />
                      </div>
                    </div>
                    <p className="text-sm font-bold">Alex Johnson</p>
                    <p className="text-xs font-bold text-amber-500 mt-0.5">Elevated BP Risk</p>
                </div>

              </div>
            </div>
          </Card>

          {/* Cross-Family Analytics Dashboard */}
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg flex flex-col sm:flex-row sm:items-center justify-between w-full gap-2">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-primary" /> Cross-Generational Trajectories
                </div>
                <div className="flex bg-muted/50 p-1 rounded-lg gap-1">
                  <Button variant={selectedVital === 'Systolic BP' ? 'default' : 'ghost'} size="sm" className="h-7 text-xs" onClick={() => setSelectedVital('Systolic BP')}>Systolic BP</Button>
                  <Button variant={selectedVital === 'HbA1c' ? 'default' : 'ghost'} size="sm" className="h-7 text-xs" onClick={() => setSelectedVital('HbA1c')}>HbA1c</Button>
                  <Button variant={selectedVital === 'Cholesterol' ? 'default' : 'ghost'} size="sm" className="h-7 text-xs" onClick={() => setSelectedVital('Cholesterol')}>Cholesterol</Button>
                </div>
              </CardTitle>
              <CardDescription>Comparing longitudinal vital trends across immediate family members to detect hereditary progression.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={familyVitalsTimeline} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--muted-foreground)/0.2)" />
                    <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} domain={selectedVital === 'HbA1c' ? ['dataMin - 1', 'dataMax + 1'] : ['dataMin - 10', 'dataMax + 10']} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: 'hsl(var(--background))', borderRadius: '8px', border: '1px solid hsl(var(--border))' }}
                      itemStyle={{ fontSize: '12px', fontWeight: 500 }}
                    />
                    <Legend iconType="circle" wrapperStyle={{ fontSize: '12px' }} />
                    {selectedVital === 'Systolic BP' && (
                      <>
                        <Line type="monotone" dataKey="patientSystolic" name="You (Alex)" stroke="hsl(var(--primary))" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                        <Line type="monotone" dataKey="fatherSystolic" name="Father" stroke="hsl(var(--chart-2))" strokeWidth={2} dot={{ r: 3 }} />
                        <Line type="monotone" dataKey="grandfatherSystolic" name="Paternal Grandfather" stroke="hsl(var(--chart-3))" strokeWidth={2} dot={{ r: 3 }} strokeDasharray="5 5" />
                        <Line type="monotone" dataKey="motherSystolic" name="Mother" stroke="hsl(var(--chart-4))" strokeWidth={2} dot={{ r: 3 }} />
                      </>
                    )}
                    {selectedVital === 'HbA1c' && (
                      <>
                        <Line type="monotone" dataKey="patientHbA1c" name="You (Alex)" stroke="hsl(var(--primary))" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                        <Line type="monotone" dataKey="fatherHbA1c" name="Father" stroke="hsl(var(--chart-2))" strokeWidth={2} dot={{ r: 3 }} />
                        <Line type="monotone" dataKey="grandfatherHbA1c" name="Paternal Grandfather" stroke="hsl(var(--chart-3))" strokeWidth={2} dot={{ r: 3 }} strokeDasharray="5 5" />
                        <Line type="monotone" dataKey="motherHbA1c" name="Mother" stroke="hsl(var(--chart-4))" strokeWidth={2} dot={{ r: 3 }} />
                      </>
                    )}
                    {selectedVital === 'Cholesterol' && (
                      <>
                        <Line type="monotone" dataKey="patientCholesterol" name="You (Alex)" stroke="hsl(var(--primary))" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                        <Line type="monotone" dataKey="fatherCholesterol" name="Father" stroke="hsl(var(--chart-2))" strokeWidth={2} dot={{ r: 3 }} />
                        <Line type="monotone" dataKey="grandfatherCholesterol" name="Paternal Grandfather" stroke="hsl(var(--chart-3))" strokeWidth={2} dot={{ r: 3 }} strokeDasharray="5 5" />
                        <Line type="monotone" dataKey="motherCholesterol" name="Mother" stroke="hsl(var(--chart-4))" strokeWidth={2} dot={{ r: 3 }} />
                      </>
                    )}
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

        </div>

        <div className="space-y-6">
          
          {/* AI Insights Panel */}
          <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20 shadow-md">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" /> AI Hereditary Insights
              </CardTitle>
              <CardDescription>Predictive preventive healthcare recommendations based on your family graph.</CardDescription>
            </CardHeader>
            <CardContent>
               <div className="text-sm leading-relaxed text-foreground min-h-[100px] flex items-center">
                  {isGenerating ? (
                    <div className="flex gap-1 items-center opacity-50">
                      <div className="w-2 h-2 rounded-full bg-primary animate-bounce" />
                      <div className="w-2 h-2 rounded-full bg-primary animate-bounce delay-75" />
                      <div className="w-2 h-2 rounded-full bg-primary animate-bounce delay-150" />
                    </div>
                  ) : (
                    <p className="font-medium bg-background p-4 rounded-xl border shadow-sm inline-block">
                      {aiInsight}
                    </p>
                  )}
               </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2"><Activity className="w-5 h-5 text-primary" /> Shared Disease Patterns</CardTitle>
              <CardDescription>Recurring chronic conditions mapped in family tree.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {members.filter(m => m.condition).map((r, i) => (
                <div key={i} className={`p-4 rounded-xl border bg-background flex justify-between items-center ${r.conditionColor === 'destructive' ? 'border-destructive/30 shadow-[0_0_10px_rgba(var(--destructive),0.05)]' : ''} transition-all hover:shadow-md`}>
                  <div>
                    <h3 className="font-bold text-sm">{r.condition}</h3>
                    <p className="text-xs text-muted-foreground mt-1">Source: {r.relation}</p>
                  </div>
                  <div className="text-right flex flex-col items-end">
                    <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full mt-1 bg-${r.conditionColor || 'primary'}/10 text-${r.conditionColor || 'primary'}`}>
                      Flagged
                    </span>
                  </div>
                </div>
              ))}
              {members.filter(m => m.condition).length === 0 && (
                <p className="text-sm text-muted-foreground">No significant genetic conditions mapped.</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Add Relative Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-md shadow-2xl border-primary/30">
            <CardHeader className="border-b bg-primary/5 flex flex-row items-center justify-between">
              <div>
                <CardTitle>Add Family Member</CardTitle>
                <CardDescription>Update your genetic health tree.</CardDescription>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setIsModalOpen(false)}>
                <X className="w-5 h-5" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Relationship (e.g., Uncle, Sister)</label>
                <Input 
                  value={newMember.relation || ''} 
                  onChange={e => setNewMember({...newMember, relation: e.target.value})} 
                  placeholder="e.g., Maternal Aunt" 
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Gender</label>
                  <select 
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    value={newMember.gender}
                    onChange={e => setNewMember({...newMember, gender: e.target.value as any})}
                  >
                    <option value="M">Male (Square)</option>
                    <option value="F">Female (Circle)</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Generation</label>
                  <select 
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    value={newMember.generation}
                    onChange={e => setNewMember({...newMember, generation: e.target.value as any})}
                  >
                    <option value="grandparents">Grandparents</option>
                    <option value="parents">Parents / Aunts / Uncles</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Side of Family</label>
                  <select 
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    value={newMember.side}
                    onChange={e => setNewMember({...newMember, side: e.target.value as any})}
                  >
                    <option value="paternal">Paternal</option>
                    <option value="maternal">Maternal</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Known Condition</label>
                  <Input 
                    value={newMember.condition || ''} 
                    onChange={e => setNewMember({...newMember, condition: e.target.value})} 
                    placeholder="Optional..." 
                  />
                </div>
              </div>
            </CardContent>
            <div className="p-6 border-t flex justify-end gap-2 bg-muted/30">
              <Button variant="outline" onClick={() => setIsModalOpen(false)}>Cancel</Button>
              <Button className="bg-primary hover:bg-primary/90" onClick={handleAddMember}>Add to Tree</Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
