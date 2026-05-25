import { useState } from 'react';
import { Card, CardContent } from '../../components/ui/card';
import { ClipboardList, MoreVertical } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { toast } from 'sonner';

export default function NurseTasks() {
  const [columns, setColumns] = useState([
    {
      id: 'todo',
      title: 'To Do',
      color: 'bg-muted',
      borderColor: 'border-muted-foreground/20',
      tasks: [
        { id: 1, title: 'Discharge Prep', patient: 'Room 205', priority: 'Medium' },
        { id: 2, title: 'IV Change', patient: 'Room 102', priority: 'High' },
      ]
    },
    {
      id: 'inprogress',
      title: 'In Progress',
      color: 'bg-amber-500/10',
      borderColor: 'border-amber-500/30',
      tasks: [
        { id: 3, title: 'Wound Dressing', patient: 'Room 104', priority: 'Medium' }
      ]
    },
    {
      id: 'done',
      title: 'Completed',
      color: 'bg-emerald-500/10',
      borderColor: 'border-emerald-500/30',
      tasks: [
        { id: 4, title: 'Morning Meds', patient: 'All Assigned', priority: 'High' }
      ]
    }
  ]);

  const handleAddTask = () => {
    const newTask = { id: Date.now(), title: 'New Mock Task', patient: 'Unassigned', priority: 'Medium' };
    setColumns(cols => cols.map(col =>
      col.id === 'todo' ? { ...col, tasks: [newTask, ...col.tasks] } : col
    ));
    toast.success('Task Added', { description: 'New task added to To Do list.' });
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
        <Button className="bg-amber-500 hover:bg-amber-600" onClick={handleAddTask}>Add Task</Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
        {columns.map((col, idx) => (
          <div key={idx} className={`rounded-xl border ${col.borderColor} ${col.color} p-4 flex flex-col`}>
            <div className="flex justify-between items-center mb-4 px-2">
              <h3 className="font-bold text-lg">{col.title}</h3>
              <span className="bg-background px-2 py-0.5 rounded-full text-xs font-bold border shadow-sm">{col.tasks.length}</span>
            </div>

            <div className="space-y-3 flex-1 overflow-y-auto">
              {col.tasks.map(task => (
                <Card key={task.id} className="cursor-grab active:cursor-grabbing hover:border-amber-500/50 transition-colors">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded ${task.priority === 'High' ? 'bg-destructive/10 text-destructive' : 'bg-primary/10 text-primary'}`}>
                        {task.priority}
                      </span>
                      <Button variant="ghost" size="icon" className="h-6 w-6 -mr-2 -mt-2"><MoreVertical className="w-4 h-4" /></Button>
                    </div>
                    <p className="font-bold">{task.title}</p>
                    <p className="text-xs text-muted-foreground mt-1">{task.patient}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
