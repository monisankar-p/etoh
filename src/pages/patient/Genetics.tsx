import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card';
import { Activity, Dna, AlertTriangle, UserPlus, X } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';

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
        <div key={m.id} className="flex flex-col items-center">
          <div className={`w-14 h-14 sm:w-16 sm:h-16 border-2 flex items-center justify-center font-bold text-base sm:text-lg mb-2 relative ${
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
      <div className="mb-8 max-w-5xl mx-auto w-full flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-3 mb-2">
            <Dna className="w-8 h-8 text-primary" />
            Family Health Tree
          </h1>
          <p className="text-muted-foreground text-sm md:text-base">Interactive genetic mapping and disease inheritance risk profiles.</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 gap-2 w-full sm:w-auto" onClick={() => setIsModalOpen(true)}>
          <UserPlus className="w-4 h-4" /> Add Relative
        </Button>
      </div>

      <div className="max-w-5xl mx-auto w-full grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card className="h-[500px] border-primary/20 bg-background/50 relative overflow-x-auto overflow-y-hidden">
            <div className="min-w-[600px] w-full h-full relative flex items-center justify-center px-8">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(var(--primary),0.05)_1px,transparent_1px)] bg-[length:24px_24px]" />
              
              <div className="relative z-10 flex flex-col items-center gap-6 sm:gap-8 py-8 w-full">
                
                {/* Grandparents Layer */}
                <div className="flex w-full justify-around">
                  {renderNodeGroup(members.filter(m => m.generation === 'grandparents' && m.side === 'paternal'))}
                  {renderNodeGroup(members.filter(m => m.generation === 'grandparents' && m.side === 'maternal'))}
                </div>

                {/* Connecting Lines */}
                <div className="flex w-full justify-around relative h-8 sm:h-12">
                   <div className="absolute top-0 w-[35%] left-[15%] h-full border-t-2 border-r-2 border-muted-foreground/30 rounded-tr-xl" />
                   <div className="absolute top-0 w-[35%] right-[15%] h-full border-t-2 border-l-2 border-muted-foreground/30 rounded-tl-xl" />
                </div>

                {/* Parents Layer */}
                <div className="flex gap-16 sm:gap-24">
                  {renderNodeGroup(members.filter(m => m.generation === 'parents'))}
                </div>

                {/* Connecting Lines */}
                 <div className="flex w-full justify-center relative h-8 sm:h-12">
                   <div className="w-px bg-muted-foreground/30 h-full" />
                </div>

                {/* You Layer */}
                <div className="flex flex-col items-center">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg bg-primary/20 border-4 border-primary shadow-[0_0_20px_rgba(var(--primary),0.3)] flex items-center justify-center font-bold text-xl sm:text-2xl mb-2 text-primary">
                      YOU
                    </div>
                    <p className="text-xs sm:text-sm font-bold">Alex Johnson</p>
                </div>

              </div>
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2"><Activity className="w-5 h-5 text-primary" /> Dynamic Risk Analysis</CardTitle>
              <CardDescription>Based on your current family tree data.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {members.filter(m => m.condition).map((r, i) => (
                <div key={i} className={`p-4 rounded-xl border bg-background flex justify-between items-center ${r.conditionColor === 'destructive' ? 'border-destructive/30 shadow-[0_0_10px_rgba(var(--destructive),0.05)]' : ''}`}>
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
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
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
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
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
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
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
