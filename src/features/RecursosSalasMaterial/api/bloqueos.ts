export interface Bloqueo {
  id: string;
  recursoId: string;
  recursoNombre: string;
  tipoBloqueo: 'mantenimiento' | 'reparacion' | 'limpieza' | 'otro';
  motivo: string;
  fechaInicio: Date;
  fechaFin: Date;
  estado: 'activo' | 'completado' | 'cancelado';
  responsable?: string;
  notas?: string;
  prioridad: 'baja' | 'media' | 'alta' | 'urgente';
  costoEstimado?: number;
  costoReal?: number;
}

export const getBloqueos = async (recursoId?: string): Promise<Bloqueo[]> => {
  // Simulación de datos
  return [];
};

export const crearBloqueo = async (bloqueo: Partial<Bloqueo>): Promise<Bloqueo> => {
  // Simulación
  return bloqueo as Bloqueo;
};

export const actualizarBloqueo = async (id: string, data: Partial<Bloqueo>): Promise<Bloqueo> => {
  // Simulación
  return { id, ...data } as Bloqueo;
};

export const finalizarBloqueo = async (id: string): Promise<void> => {
  // Simulación
};

