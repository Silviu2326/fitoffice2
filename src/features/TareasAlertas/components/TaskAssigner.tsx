import { Users, UserPlus } from 'lucide-react';
import { Task } from '../types';
import { Card, Badge } from '../../../components/ui';

interface TaskAssignerProps {
  tasks: Task[];
  availableUsers: string[];
  onAssignTask: (taskId: string, userId: string) => void;
}

export default function TaskAssigner({ tasks, availableUsers, onAssignTask }: TaskAssignerProps) {
  const tareasNoAsignadas = tasks.filter(t => !t.asignado_a && t.estado !== 'completada');

  return (
    <Card className="p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-primary-50 p-2 rounded-lg">
          <Users className="w-icon-md h-icon-md text-primary" />
        </div>
        <div>
          <h2 className="text-h2 text-text-primary">Asignador de Tareas</h2>
          <p className="text-body-small text-text-secondary">
            {tareasNoAsignadas.length} tareas sin asignar
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {tareasNoAsignadas.length === 0 ? (
          <div className="text-center py-12 text-text-muted">
            <UserPlus className="w-icon-2xl h-icon-2xl mx-auto mb-4 opacity-50" />
            <p className="text-body">Todas las tareas están asignadas</p>
          </div>
        ) : (
          tareasNoAsignadas.map((task) => (
            <div
              key={task.id}
              className="p-4 bg-surface border border-border rounded-lg"
            >
              <div className="flex items-start gap-4">
                <div className="flex-1">
                  <h3 className="text-body font-semibold text-text-primary">{task.titulo}</h3>
                  <p className="text-body-small text-text-secondary mt-1">{task.descripcion}</p>
                  <Badge 
                    variant={
                      task.prioridad === 'alta' ? 'error' :
                      task.prioridad === 'media' ? 'warning' : 'info'
                    }
                    className="mt-2"
                  >
                    {task.prioridad}
                  </Badge>
                </div>

                <select
                  onChange={(e) => {
                    if (e.target.value) {
                      onAssignTask(task.id, e.target.value);
                    }
                  }}
                  className="input-base input-sm"
                  defaultValue=""
                >
                  <option value="" disabled>Asignar a...</option>
                  {availableUsers.map((user) => (
                    <option key={user} value={user}>
                      {user}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          ))
        )}
      </div>
    </Card>
  );
}

