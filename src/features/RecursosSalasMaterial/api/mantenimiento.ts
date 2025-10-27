export interface MantenimientoPreventivo {
  id: string;
  recursoId: string;
  recursoNombre: string;
  tipo: 'diario' | 'semanal' | 'mensual' | 'trimestral' | 'anual';
  descripcion: string;
  ultimaEjecucion?: Date;
  proximaEjecucion: Date;
  responsable?: string;
  estado: 'pendiente' | 'en_progreso' | 'completado' | 'omitido';
  tareas: string[];
  duracionEstimada: number; // en minutos
  costoEstimado?: number;
  notas?: string;
}

export const getMantenimientos = async (recursoId?: string): Promise<MantenimientoPreventivo[]> => {
  // Simulación de datos
  return [];
};

export const programarMantenimiento = async (
  mantenimiento: Partial<MantenimientoPreventivo>
): Promise<MantenimientoPreventivo> => {
  // Simulación
  return mantenimiento as MantenimientoPreventivo;
};

export const ejecutarMantenimiento = async (id: string, notas?: string): Promise<void> => {
  // Simulación
};

export const getMantenimientosPendientes = async (): Promise<MantenimientoPreventivo[]> => {
  // Simulación
  return [];
};

