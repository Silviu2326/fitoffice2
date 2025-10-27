import { Task, TaskPriority } from '../types';

// Sistema de priorización de tareas
export const priorityApi = {
  calculatePriority(task: {
    tipo: string;
    fecha_vencimiento?: string;
    relacionado_tipo?: string;
  }): TaskPriority {
    // Lógica para calcular prioridad automáticamente
    
    // Tareas relacionadas con pagos siempre son alta prioridad
    if (task.tipo.includes('pago') || task.tipo.includes('factura')) {
      return 'alta';
    }

    // Tareas con vencimiento próximo (menos de 2 días)
    if (task.fecha_vencimiento) {
      const daysUntilDue = Math.floor(
        (new Date(task.fecha_vencimiento).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
      );
      if (daysUntilDue <= 2) return 'alta';
      if (daysUntilDue <= 7) return 'media';
    }

    // Tareas relacionadas con clientes son media prioridad por defecto
    if (task.relacionado_tipo === 'cliente') {
      return 'media';
    }

    return 'baja';
  },

  sortByPriority(tasks: Task[]): Task[] {
    const priorityOrder = { alta: 3, media: 2, baja: 1 };
    return [...tasks].sort((a, b) => {
      // Primero por prioridad
      const priorityDiff = priorityOrder[b.prioridad] - priorityOrder[a.prioridad];
      if (priorityDiff !== 0) return priorityDiff;

      // Luego por fecha de vencimiento
      if (a.fecha_vencimiento && b.fecha_vencimiento) {
        return new Date(a.fecha_vencimiento).getTime() - new Date(b.fecha_vencimiento).getTime();
      }

      // Finalmente por fecha de creación
      return new Date(b.fecha_creacion).getTime() - new Date(a.fecha_creacion).getTime();
    });
  },
};

