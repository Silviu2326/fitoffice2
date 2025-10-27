import { CheckCircle2, Calendar, User } from 'lucide-react';
import { Task } from '../types';
import { Card } from '../../../components/ui';

interface TaskHistoryProps {
  tasks: Task[];
}

export default function TaskHistory({ tasks }: TaskHistoryProps) {
  const tareasCompletadas = tasks
    .filter(t => t.estado === 'completada')
    .sort((a, b) => {
      const dateA = a.completada_fecha ? new Date(a.completada_fecha).getTime() : 0;
      const dateB = b.completada_fecha ? new Date(b.completada_fecha).getTime() : 0;
      return dateB - dateA;
    });

  return (
    <Card className="p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-success-light p-2 rounded-lg">
          <CheckCircle2 className="w-icon-md h-icon-md text-success" />
        </div>
        <div>
          <h2 className="text-h2 text-text-primary">Historial de Tareas</h2>
          <p className="text-body-small text-text-secondary">
            {tareasCompletadas.length} tareas completadas
          </p>
        </div>
      </div>

      <div className="space-y-3 max-h-[600px] overflow-y-auto custom-scrollbar">
        {tareasCompletadas.length === 0 ? (
          <div className="text-center py-12 text-text-muted">
            <CheckCircle2 className="w-icon-2xl h-icon-2xl mx-auto mb-4 opacity-50" />
            <p className="text-body">No hay tareas completadas aún</p>
          </div>
        ) : (
          tareasCompletadas.map((task) => (
            <div
              key={task.id}
              className="p-4 bg-surface border border-border rounded-lg"
            >
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-icon-md h-icon-md text-success mt-1 flex-shrink-0" />
                
                <div className="flex-1">
                  <h3 className="text-body font-semibold text-text-muted line-through">
                    {task.titulo}
                  </h3>
                  <p className="text-body-small text-text-secondary mt-1">{task.descripcion}</p>
                  
                  <div className="flex flex-wrap gap-4 mt-3 text-caption text-text-muted">
                    {task.completada_fecha && (
                      <span className="flex items-center gap-1">
                        <Calendar className="w-icon-xs h-icon-xs" />
                        Completada: {new Date(task.completada_fecha).toLocaleDateString()}
                      </span>
                    )}
                    {task.asignado_a && (
                      <span className="flex items-center gap-1">
                        <User className="w-icon-xs h-icon-xs" />
                        {task.asignado_a}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </Card>
  );
}

