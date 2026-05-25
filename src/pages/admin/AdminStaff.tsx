import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card';
import { Users, UserPlus, Phone, Edit, Ban, Trash2, Mail, Shield, Filter } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { toast } from 'sonner';

export default function AdminStaff() {
  const [staff, setStaff] = useState([
    { id: 1, name: 'Dr. Sarah Smith', role: 'Attending Physician', department: 'Cardiology', email: 's.smith@etoh.com', phone: '555-0101', status: 'Active', access: 'Doctor Suite' },
    { id: 2, name: 'Dr. Michael Davis', role: 'Resident', department: 'ICU', email: 'm.davis@etoh.com', phone: '555-0102', status: 'Active', access: 'Doctor Suite' },
    { id: 3, name: 'Emily Chen', role: 'Charge Nurse', department: 'Neurology', email: 'e.chen@etoh.com', phone: '555-0103', status: 'Active', access: 'Nurse Suite' },
    { id: 4, name: 'Alex Johnson', role: 'Field Executive', department: 'Operations', email: 'a.johnson@etoh.com', phone: '555-0104', status: 'Suspended', access: 'Executive Suite' },
  ]);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', role: '', department: '', email: '', phone: '', access: '' });

  const handleAddStaff = () => {
    if (!formData.name || !formData.role) {
      toast.error('Name and Role are required fields.');
      return;
    }
    const newStaff = { 
      id: Date.now(), 
      ...formData, 
      status: 'Active' 
    };
    setStaff([...staff, newStaff]);
    toast.success('Employee Profile Created', { description: `${formData.name} has been added to the system.` });
    setIsAddModalOpen(false);
    setFormData({ name: '', role: '', department: '', email: '', phone: '', access: '' });
  };

  return (
    <div className="p-4 md:p-8 h-full flex flex-col bg-muted/10 overflow-y-auto">
      <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-3 mb-2">
            <Users className="w-8 h-8 text-purple-500" />
            Employee Management
          </h1>
          <p className="text-muted-foreground text-sm md:text-base">Manage personnel records, access control, and hospital staff.</p>
        </div>
        <Button className="bg-purple-500 hover:bg-purple-600 gap-2 w-full sm:w-auto" onClick={() => setIsAddModalOpen(true)}>
          <UserPlus className="w-4 h-4" /> Add Employee
        </Button>
      </div>

      <Card className="border-purple-500/20 shadow-[0_0_20px_rgba(168,85,247,0.05)]">
        <CardHeader className="bg-purple-500/5 border-b flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <CardTitle>Staff Directory</CardTitle>
            <CardDescription>All active and suspended employee accounts.</CardDescription>
          </div>
          <div className="flex w-full sm:w-auto gap-2">
             <Input placeholder="Search employees..." className="w-full sm:w-64 bg-background" />
             <Button variant="outline" size="icon"><Filter className="w-4 h-4" /></Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="w-full overflow-x-auto">
            <table className="w-full text-sm text-left min-w-[800px]">
              <thead className="bg-muted/50 border-b">
                <tr>
                  <th className="p-4 font-semibold text-muted-foreground">Employee</th>
                  <th className="p-4 font-semibold text-muted-foreground">Department & Role</th>
                  <th className="p-4 font-semibold text-muted-foreground">Contact</th>
                  <th className="p-4 font-semibold text-muted-foreground">Access Level</th>
                  <th className="p-4 font-semibold text-muted-foreground">Status</th>
                  <th className="p-4 font-semibold text-right text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {staff.map((employee) => (
                  <tr key={employee.id} className="hover:bg-muted/30 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center font-bold text-purple-500 shrink-0">
                          {employee.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-semibold text-foreground whitespace-nowrap">{employee.name}</p>
                          <p className="text-xs text-muted-foreground">ID: EMP-{employee.id.toString().padStart(4, '0')}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <p className="font-medium">{employee.role}</p>
                      <p className="text-xs text-muted-foreground">{employee.department}</p>
                    </td>
                    <td className="p-4 space-y-1">
                      <p className="text-xs flex items-center gap-2"><Mail className="w-3 h-3 text-muted-foreground" /> {employee.email}</p>
                      <p className="text-xs flex items-center gap-2"><Phone className="w-3 h-3 text-muted-foreground" /> {employee.phone}</p>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2 text-xs border rounded-full px-2 py-1 w-fit bg-background">
                        <Shield className="w-3 h-3 text-purple-500" />
                        {employee.access}
                      </div>
                    </td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded text-xs font-bold uppercase tracking-wider ${
                        employee.status === 'Active' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-destructive/10 text-destructive'
                      }`}>
                        {employee.status}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-500 hover:text-blue-600 hover:bg-blue-500/10" onClick={() => toast.info('Edit mode opened')}>
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-amber-500 hover:text-amber-600 hover:bg-amber-500/10" onClick={() => toast.warning(`Account for ${employee.name} suspended.`)}>
                          <Ban className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10" onClick={() => toast.error(`Account for ${employee.name} deleted.`)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Add Employee Modal (Simplified Overlay) */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-md shadow-2xl border-purple-500/30">
            <CardHeader className="border-b bg-purple-500/5">
              <CardTitle>Add New Employee</CardTitle>
              <CardDescription>Create a new profile and assign access credentials.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Full Name</label>
                <Input value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} placeholder="e.g. John Doe" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Role</label>
                  <Input value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})} placeholder="e.g. Nurse" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Department</label>
                  <Input value={formData.department} onChange={e => setFormData({...formData, department: e.target.value})} placeholder="e.g. ER" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email</label>
                  <Input value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} placeholder="email@etoh.com" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Phone</label>
                  <Input value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} placeholder="555-0000" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Access Suite Level</label>
                <select 
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                  value={formData.access}
                  onChange={e => setFormData({...formData, access: e.target.value})}
                >
                  <option value="">Select access level...</option>
                  <option value="Patient Suite">Patient Suite</option>
                  <option value="Doctor Suite">Doctor Suite</option>
                  <option value="Nurse Suite">Nurse Suite</option>
                  <option value="Executive Suite">Executive Suite</option>
                  <option value="Admin Suite">Admin Suite</option>
                </select>
              </div>
            </CardContent>
            <div className="p-6 border-t flex justify-end gap-2 bg-muted/30">
              <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>Cancel</Button>
              <Button className="bg-purple-500 hover:bg-purple-600" onClick={handleAddStaff}>Create Account</Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
