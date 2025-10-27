import { ArrowUp, ArrowRight, ArrowDown } from 'lucide-react';
import { Task } from '../types';
import { Badge, Card } from '../../../components/ui';

interface PriorityQueueProps {
  tasks: Task[];
  onSelectTask: (taskId: string) => void;
}

export default function PriorityQueue({ tasks, onSelectTask }: PriorityQueueProps) {
  const tareasPendientes = tasks.filter(t => t.estado === 'pendiente' || t.estado === 'en_progreso');
  
  const tareasAlta = tareasPendientes.filter(t => t.prioridad === 'alta');
  const tareasMedia = tareasPendientes.filter(t => t.prioridad === 'media');
  const tareasBaja = tareasPendientes.filter(t => t.prioridad === 'baja');

  const PrioritySection = ({ 
    title, 
    tasks, 
    icon, 
    badgeClass 
  }: { 
    title: string; 
    tasks: Task[]; 
    icon: React.ReactNode; 
    badgeClass: string;
  }) => (
    <Card className="p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          {icon}
          <h3 className="text-body font-semibold text-text-primary">{title}</h3>
        </div>
        <span className={`badge-base ${badgeClass}`}>
          {tasks.length}
        </span>
      </div>

      <div className="space-y-2">
        {tasks.length === 0 ? (
          <p className="text-text-muted text-body-small text-center py-4">Sin tareas</p>
        ) : (
          tasks.slice(0, 3).map((task) => (
            <button
              key={task.id}
              onClick={() => onSelectTask(task.id)}
              className="w-full text-left p-3 bg-surface hover:bg-surface-2 border border-border rounded-lg transition-fast"
            >
              <p className="text-text-primary text-body-small font-medium truncate">{task.titulo}</p>
              <p className="text-text-secondary text-caption mt-1 truncate">{task.descripcion}</p>
            </button>
          ))
        )}
        {tasks.length > 3 && (
          <p className="text-text-muted text-caption text-center pt-2">
            +{tasks.length - 3} más
          </p>
        )}
      </div>
    </Card>
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-h2 text-text-primary">Cola de Prioridades</h2>
        <span className="text-body-small text-text-secondary">
          {tareasPendientes.length} tareas pendientes
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <PrioritySection
          title="Alta Prioridad"
          tasks={tareasAlta}
          icon={<ArrowUp className="w-icon-md h-icon-md text-error" />}
          badgeClass="badge-error"
        />
        <PrioritySection
          title="Media Prioridad"
          tasks={tareasMedia}
          icon={<ArrowRight className="w-icon-md h-icon-md text-warning" />}
          badgeClass="badge-warning"
        />
        <PrioritySection
          title="Baja Prioridad"
          tasks={tareasBaja}
          icon={<ArrowDown className="w-icon-md h-icon-md text-info" />}
          badgeClass="badge-info"
        />
      </div>
    </div>
  );
}

