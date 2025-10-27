import { useState } from 'react';
import { CheckCircle2, Circle, Clock, AlertCircle } from 'lucide-react';
import { Task, TaskPriority, TaskStatus } from '../types';
import { Badge } from '../../../components/ui';

interface TasksManagerProps {
  tasks: Task[];
  onUpdateTask: (taskId: string, updates: Partial<Task>) => void;
  onDeleteTask: (taskId: string) => void;
}

export default function TasksManager({ tasks, onUpdateTask, onDeleteTask }: TasksManagerProps) {
  const [filtro, setFiltro] = useState<'todas' | TaskPriority>('todas');
  const [estadoFiltro, setEstadoFiltro] = useState<'todas' | TaskStatus>('todas');

  const getPriorityColor = (prioridad: TaskPriority) => {
    switch (prioridad) {
      case 'alta':
        return 'bg-error-light text-error border-error/20';
      case 'media':
        return 'bg-warning-light text-warning border-warning/20';
      case 'baja':
        return 'bg-info-light text-info border-info/20';
    }
  };

  const getStatusIcon = (estado: TaskStatus) => {
    switch (estado) {
      case 'completada':
        return <CheckCircle2 className="w-icon-md h-icon-md text-success" />;
      case 'en_progreso':
        return <Clock className="w-icon-md h-icon-md text-warning" />;
      case 'reagendada':
        return <AlertCircle className="w-icon-md h-icon-md text-info" />;
      default:
        return <Circle className="w-icon-md h-icon-md text-text-muted" />;
    }
  };

  const tareasFiltradas = tasks.filter(task => {
    if (filtro !== 'todas' && task.prioridad !== filtro) return false;
    if (estadoFiltro !== 'todas' && task.estado !== estadoFiltro) return false;
    return true;
  });

  return (
    <div className="space-y-4">
      {/* Filtros */}
      <div className="flex gap-4 items-center flex-wrap">
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => setFiltro('todas')}
            className={`chip-base transition-normal ${
              filtro === 'todas' ? 'chip-selected' : ''
            }`}
          >
            Todas
          </button>
          <button
            onClick={() => setFiltro('alta')}
            className={`chip-base transition-normal ${
              filtro === 'alta' ? 'bg-error-light text-error border border-error' : ''
            }`}
          >
            Alta
          </button>
          <button
            onClick={() => setFiltro('media')}
            className={`chip-base transition-normal ${
              filtro === 'media' ? 'bg-warning-light text-warning border border-warning' : ''
            }`}
          >
            Media
          </button>
          <button
            onClick={() => setFiltro('baja')}
            className={`chip-base transition-normal ${
              filtro === 'baja' ? 'bg-info-light text-info border border-info' : ''
            }`}
          >
            Baja
          </button>
        </div>

        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => setEstadoFiltro('todas')}
            className={`chip-base transition-normal ${
              estadoFiltro === 'todas' ? 'chip-selected' : ''
            }`}
          >
            Todos los estados
          </button>
          <button
            onClick={() => setEstadoFiltro('pendiente')}
            className={`chip-base transition-normal ${
              estadoFiltro === 'pendiente' ? 'chip-selected' : ''
            }`}
          >
            Pendientes
          </button>
        </div>
      </div>

      {/* Lista de tareas */}
      <div className="space-y-3">
        {tareasFiltradas.map((task) => (
          <div
            key={task.id}
            className="card-base card-hover"
          >
            <div className="flex items-start gap-4">
              <button
                onClick={() =>
                  onUpdateTask(task.id, {
                    estado: task.estado === 'completada' ? 'pendiente' : 'completada',
                  })
                }
                className="mt-1 transition-fast hover:scale-110"
              >
                {getStatusIcon(task.estado)}
              </button>

              <div className="flex-1">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className={`text-h3 ${
                      task.estado === 'completada' ? 'text-text-muted line-through' : 'text-text-primary'
                    }`}>
                      {task.titulo}
                    </h3>
                    <p className="text-body-small text-text-secondary mt-1">{task.descripcion}</p>
                  </div>

                  <span className={`badge-base ${getPriorityColor(task.prioridad)}`}>
                    {task.prioridad.charAt(0).toUpperCase() + task.prioridad.slice(1)}
                  </span>
                </div>

                <div className="flex items-center gap-4 mt-3 text-body-small text-text-secondary">
                  <span>Creada: {new Date(task.fecha_creacion).toLocaleDateString()}</span>
                  {task.fecha_vencimiento && (
                    <span className="text-warning">
                      Vence: {new Date(task.fecha_vencimiento).toLocaleDateString()}
                    </span>
                  )}
                  {task.asignado_a && (
                    <span>Asignado a: {task.asignado_a}</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}

        {tareasFiltradas.length === 0 && (
          <div className="text-center py-12 text-text-muted">
            <Circle className="w-icon-2xl h-icon-2xl mx-auto mb-4 opacity-50" />
            <p className="text-body">No hay tareas que coincidan con los filtros</p>
          </div>
        )}
      </div>
    </div>
  );
}

