import { CheckSquare, Square } from 'lucide-react';
import { useState } from 'react';
import { Card, CardHeader, CardTitle, Badge } from '../../../components/ui';

interface TasksWidgetProps {
  tasks: any[];
}

/**
 * TasksWidget - Lista de tareas del día
 * Actualizado según guía de estilos FitOffice v2.0
 */
export default function TasksWidget({ tasks }: TasksWidgetProps) {
  const defaultTasks = [
    { id: 1, title: 'Revisar check-ins pendientes', completed: false, priority: 'high' },
    { id: 2, title: 'Preparar sesión de las 10:00', completed: false, priority: 'high' },
    { id: 3, title: 'Seguimiento cliente nuevo', completed: true, priority: 'medium' },
    { id: 4, title: 'Actualizar inventario material', completed: false, priority: 'low' },
    { id: 5, title: 'Responder mensajes WhatsApp', completed: false, priority: 'medium' }
  ];

  const [taskList, setTaskList] = useState(tasks.length > 0 ? tasks : defaultTasks);

  const toggleTask = (id: number) => {
    setTaskList(taskList.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'border-l-[#EF4444]';
      case 'medium':
        return 'border-l-[#F59E0B]';
      case 'low':
        return 'border-l-[#3B82F6]';
      default:
        return 'border-l-[#64748B]';
    }
  };

  const pendingTasks = taskList.filter(t => !t.completed).length;

  return (
    <Card className="bg-[#1E1E2E] border-[#334155]">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-[#F1F5F9]">Tareas del Día</CardTitle>
          <Badge variant="success">
            {pendingTasks} pendientes
          </Badge>
        </div>
      </CardHeader>
      <div className="space-y-2">
        {taskList.map((task) => (
          <div
            key={task.id}
            className={`p-3 bg-[#2A2A3A] rounded-xl border-l-4 ${getPriorityColor(task.priority)} border-r border-t border-b border-[#334155] cursor-pointer hover:border-[#6366F1] transition-all duration-200`}
            onClick={() => toggleTask(task.id)}
          >
            <div className="flex items-start gap-3">
              {task.completed ? (
                <CheckSquare className="w-5 h-5 text-[#10B981] flex-shrink-0 mt-0.5" />
              ) : (
                <Square className="w-5 h-5 text-[#94A3B8] flex-shrink-0 mt-0.5" />
              )}
              <span
                className={`text-sm ${
                  task.completed ? 'text-[#64748B] line-through' : 'text-[#F1F5F9] font-medium'
                }`}
              >
                {task.title}
              </span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

