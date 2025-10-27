import { Task } from '../types';

// Simulación de API - Reemplazar con llamadas reales a Supabase
export const tasksApi = {
  async getTasks(): Promise<Task[]> {
    // TODO: Implementar con Supabase
    return [];
  },

  async createTask(task: Omit<Task, 'id' | 'fecha_creacion'>): Promise<Task> {
    // TODO: Implementar con Supabase
    const newTask: Task = {
      ...task,
      id: Math.random().toString(36).substr(2, 9),
      fecha_creacion: new Date().toISOString(),
    };
    return newTask;
  },

  async updateTask(taskId: string, updates: Partial<Task>): Promise<Task> {
    // TODO: Implementar con Supabase
    return { id: taskId, ...updates } as Task;
  },

  async deleteTask(taskId: string): Promise<void> {
    // TODO: Implementar con Supabase
    console.log('Deleting task:', taskId);
  },

  async getTasksByPriority(priority: string): Promise<Task[]> {
    // TODO: Implementar con Supabase
    return [];
  },

  async getAssignedTasks(userId: string): Promise<Task[]> {
    // TODO: Implementar con Supabase
    return [];
  },

  async completeTask(taskId: string): Promise<Task> {
    // TODO: Implementar con Supabase
    return { id: taskId } as Task;
  },
};

