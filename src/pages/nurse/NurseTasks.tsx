import { useState } from 'react';
import { Card, CardContent } from '../../components/ui/card';
import { ClipboardList, MoreVertical, ArrowRightLeft, Users, Pencil } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Dialog } from '../../components/ui/dialog';
import { Input } from '../../components/ui/input';
import { toast } from 'sonner';

export default function NurseTasks() {
  const [columns, setColumns] = useState([
    {
      id: 'todo',
      title: 'To Do',
      color: 'bg-muted',
      borderColor: 'border-muted-foreground/20',
      tasks: [
        { id: 1, title: 'Discharge Prep', patient: 'John Smith', room: 'Room 205', details: 'Post-op Day 2, check vitals before discharge.', priority: 'Medium' },
        { id: 2, title: 'IV Change', patient: 'Emily Chen', room: 'Room 102', details: 'Change saline IV, check for phlebitis.', priority: 'High' },
      ]
    },
    {
      id: 'inprogress',
      title: 'In Progress',
      color: 'bg-amber-500/10',
      borderColor: 'border-amber-500/30',
      tasks: [
        { id: 3, title: 'Wound Dressing', patient: 'Michael Davis', room: 'Room 104', details: 'Surgical site cleaning, apply fresh bandages.', priority: 'Medium' }
      ]
    },
    {
      id: 'done',
      title: 'Completed',
      color: 'bg-emerald-500/10',
      borderColor: 'border-emerald-500/30',
      tasks: [
        { id: 4, title: 'Morning Meds', patient: 'Multiple', room: 'All Assigned', details: 'Administered 08:00 AM round.', priority: 'High' }
      ]
    }
  ]);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newTaskData, setNewTaskData] = useState({ title: '', patient: '', room: '', details: '', priority: 'Medium' });

  const [isTransferModalOpen, setIsTransferModalOpen] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null);
  const [transferNurse, setTransferNurse] = useState('');

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);
  const [editingTaskData, setEditingTaskData] = useState({ title: '', patient: '', room: '', details: '', priority: 'Medium' });

  const handleAddTaskSubmit = () => {
    if (!newTaskData.title || !newTaskData.patient) {
      toast.error('Please fill in title and patient name.');
      return;
    }
    const newTask = { id: Date.now(), ...newTaskData };
    setColumns(cols => cols.map(col =>
      col.id === 'todo' ? { ...col, tasks: [newTask, ...col.tasks] } : col
    ));
    toast.success('Task Added', { description: 'New task added to To Do list.' });
    setIsAddModalOpen(false);
    setNewTaskData({ title: '', patient: '', room: '', details: '', priority: 'Medium' });
  };

  const handleTransferSubmit = () => {
    if (!transferNurse) {
      toast.error('Please enter a nurse name.');
      return;
    }
    setColumns(cols => cols.map(col => ({
      ...col,
      tasks: col.tasks.filter(t => t.id !== selectedTaskId)
    })));
    toast.success('Task Transferred', { description: `Task has been reassigned to ${transferNurse}.` });
    setIsTransferModalOpen(false);
    setTransferNurse('');
  };

  const handleEditTaskSubmit = () => {
    if (!editingTaskData.title || !editingTaskData.patient) {
      toast.error('Please fill in title and patient name.');
      return;
    }
    setColumns(cols => cols.map(col => ({
      ...col,
      tasks: col.tasks.map(t => t.id === editingTaskId ? { ...t, ...editingTaskData } : t)
    })));
    toast.success('Task Updated', { description: 'The task details have been saved.' });
    setIsEditModalOpen(false);
  };

  const handleDragStart = (e: React.DragEvent, taskId: number, sourceColId: string) => {
    e.dataTransfer.setData('taskId', taskId.toString());
    e.dataTransfer.setData('sourceColId', sourceColId);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault(); // Necessary to allow dropping
  };

  const handleDrop = (e: React.DragEvent, destColId: string) => {
    e.preventDefault();
    const taskId = Number(e.dataTransfer.getData('taskId'));
    const sourceColId = e.dataTransfer.getData('sourceColId');

    if (!taskId || !sourceColId || sourceColId === destColId) return;

    setColumns(cols => {
      const newCols = JSON.parse(JSON.stringify(cols)); // Deep copy
      const sourceCol = newCols.find((c: any) => c.id === sourceColId);
      const destCol = newCols.find((c: any) => c.id === destColId);
      
      const taskIndex = sourceCol.tasks.findIndex((t: any) => t.id === taskId);
      if (taskIndex === -1) return cols;
      
      const [task] = sourceCol.tasks.splice(taskIndex, 1);
      destCol.tasks.push(task);
      
      return newCols;
    });
  };

  return (
    <div className="p-8 h-full flex flex-col bg-muted/10 overflow-y-auto">
      <div className="mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3 mb-2">
            <ClipboardList className="w-8 h-8 text-amber-500" />
            Shift Tasks
          </h1>
          <p className="text-muted-foreground">Manage your nursing workflow and delegate assignments.</p>
        </div>
        <Button className="bg-amber-500 hover:bg-amber-600" onClick={() => setIsAddModalOpen(true)}>Add Task</Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
        {columns.map((col, idx) => (
          <div 
            key={idx} 
            className={`rounded-xl border ${col.borderColor} ${col.color} p-4 flex flex-col`}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, col.id)}
          >
            <div className="flex justify-between items-center mb-4 px-2">
              <h3 className="font-bold text-lg">{col.title}</h3>
              <span className="bg-background px-2 py-0.5 rounded-full text-xs font-bold border shadow-sm">{col.tasks.length}</span>
            </div>

            <div className="space-y-3 flex-1 overflow-y-auto pb-8">
              {col.tasks.map((task: any) => (
                <Card 
                  key={task.id} 
                  draggable 
                  onDragStart={(e) => handleDragStart(e, task.id, col.id)}
                  className="cursor-grab active:cursor-grabbing hover:border-amber-500/50 transition-colors bg-card shadow-sm"
                >
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded ${task.priority === 'High' ? 'bg-destructive/10 text-destructive' : 'bg-primary/10 text-primary'}`}>
                        {task.priority}
                      </span>
                      <div className="flex -mr-2 -mt-2">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-6 w-6 text-muted-foreground hover:text-amber-600"
                          title="Edit Task"
                          onClick={() => {
                            setEditingTaskId(task.id);
                            setEditingTaskData({ title: task.title, patient: task.patient, room: task.room, details: task.details, priority: task.priority });
                            setIsEditModalOpen(true);
                          }}
                        >
                          <Pencil className="w-3.5 h-3.5" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-6 w-6 text-muted-foreground hover:text-amber-600"
                          title="Transfer Task"
                          onClick={() => {
                            setSelectedTaskId(task.id);
                            setIsTransferModalOpen(true);
                          }}
                        >
                          <ArrowRightLeft className="w-3.5 h-3.5" />
                        </Button>
                      </div>
                    </div>
                    <p className="font-bold">{task.title}</p>
                    <div className="flex justify-between items-center mt-1">
                      <p className="text-xs font-semibold text-muted-foreground">{task.patient}</p>
                      <span className="text-[10px] text-muted-foreground bg-muted px-1.5 py-0.5 rounded">{task.room}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2 border-t pt-2 line-clamp-2">{task.details}</p>
                  </CardContent>
                </Card>
              ))}
              {col.tasks.length === 0 && (
                <div className="text-center p-8 border-2 border-dashed rounded-xl opacity-30 text-sm font-semibold">Drop here</div>
              )}
            </div>
          </div>
        ))}
      </div>

      <Dialog isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Add New Task" description="Create a new task and add it to the To Do list.">
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Task Title</label>
            <Input value={newTaskData.title} onChange={e => setNewTaskData({...newTaskData, title: e.target.value})} placeholder="e.g. Wound Dressing" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Patient Name</label>
              <Input value={newTaskData.patient} onChange={e => setNewTaskData({...newTaskData, patient: e.target.value})} placeholder="e.g. John Smith" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Room</label>
              <Input value={newTaskData.room} onChange={e => setNewTaskData({...newTaskData, room: e.target.value})} placeholder="e.g. Room 102" />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Priority</label>
            <div className="flex gap-2">
              <Button variant={newTaskData.priority === 'High' ? 'default' : 'outline'} className={newTaskData.priority === 'High' ? 'bg-destructive hover:bg-destructive/90' : ''} onClick={() => setNewTaskData({...newTaskData, priority: 'High'})}>High</Button>
              <Button variant={newTaskData.priority === 'Medium' ? 'default' : 'outline'} className={newTaskData.priority === 'Medium' ? 'bg-amber-500 hover:bg-amber-600' : ''} onClick={() => setNewTaskData({...newTaskData, priority: 'Medium'})}>Medium</Button>
              <Button variant={newTaskData.priority === 'Low' ? 'default' : 'outline'} onClick={() => setNewTaskData({...newTaskData, priority: 'Low'})}>Low</Button>
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Clinical Details</label>
            <Input value={newTaskData.details} onChange={e => setNewTaskData({...newTaskData, details: e.target.value})} placeholder="e.g. Needs immediate attention" />
          </div>
          <Button className="w-full bg-amber-500 hover:bg-amber-600 text-white mt-4" onClick={handleAddTaskSubmit}>Create Task</Button>
        </div>
      </Dialog>

      <Dialog isOpen={isTransferModalOpen} onClose={() => setIsTransferModalOpen(false)} title="Transfer Task" description="Reassign this task to another nurse.">
        <div className="space-y-4">
          <div className="p-4 bg-muted/50 rounded-xl flex items-center gap-4 mb-4">
            <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center shrink-0">
              <Users className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <p className="text-sm font-medium">You are transferring a task.</p>
              <p className="text-xs text-muted-foreground">This will remove it from your board.</p>
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Assign To Nurse</label>
            <Input value={transferNurse} onChange={e => setTransferNurse(e.target.value)} placeholder="e.g. Nurse Alex" />
          </div>
          <Button className="w-full mt-4" onClick={handleTransferSubmit}>Transfer Shift Task</Button>
        </div>
      </Dialog>

      <Dialog isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} title="Edit Task" description="Modify the details of this existing task.">
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Task Title</label>
            <Input value={editingTaskData.title} onChange={e => setEditingTaskData({...editingTaskData, title: e.target.value})} placeholder="e.g. Wound Dressing" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Patient Name</label>
              <Input value={editingTaskData.patient} onChange={e => setEditingTaskData({...editingTaskData, patient: e.target.value})} placeholder="e.g. John Smith" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Room</label>
              <Input value={editingTaskData.room} onChange={e => setEditingTaskData({...editingTaskData, room: e.target.value})} placeholder="e.g. Room 102" />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Priority</label>
            <div className="flex gap-2">
              <Button variant={editingTaskData.priority === 'High' ? 'default' : 'outline'} className={editingTaskData.priority === 'High' ? 'bg-destructive hover:bg-destructive/90' : ''} onClick={() => setEditingTaskData({...editingTaskData, priority: 'High'})}>High</Button>
              <Button variant={editingTaskData.priority === 'Medium' ? 'default' : 'outline'} className={editingTaskData.priority === 'Medium' ? 'bg-amber-500 hover:bg-amber-600' : ''} onClick={() => setEditingTaskData({...editingTaskData, priority: 'Medium'})}>Medium</Button>
              <Button variant={editingTaskData.priority === 'Low' ? 'default' : 'outline'} onClick={() => setEditingTaskData({...editingTaskData, priority: 'Low'})}>Low</Button>
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Clinical Details</label>
            <Input value={editingTaskData.details} onChange={e => setEditingTaskData({...editingTaskData, details: e.target.value})} placeholder="e.g. Needs immediate attention" />
          </div>
          <Button className="w-full bg-amber-500 hover:bg-amber-600 text-white mt-4" onClick={handleEditTaskSubmit}>Save Changes</Button>
        </div>
      </Dialog>
    </div>
  );
}
