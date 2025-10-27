export interface Recurso {
  id: string;
  nombre: string;
  tipo: 'sala' | 'material';
  estado: 'disponible' | 'en_uso' | 'mantenimiento' | 'bloqueado';
  categoria?: string;
  descripcion?: string;
  aforo?: number;
  ubicacion?: string;
  fechaCreacion: Date;
  fechaActualizacion?: Date;
}

export interface Sala extends Recurso {
  tipo: 'sala';
  aforo: number;
  tipoSala: 'musculacion' | 'cardio' | 'spinning' | 'yoga' | 'boxeo' | 'crossfit' | 'fisioterapia' | 'nutricion';
  horarioDisponibilidad: {
    desde: string;
    hasta: string;
  };
  equipamiento: string[];
  superficie: number;
}

export interface Material extends Recurso {
  tipo: 'material';
  cantidad: number;
  cantidadDisponible: number;
  estado: 'disponible' | 'en_uso' | 'mantenimiento' | 'dañado';
  ultimoMantenimiento?: Date;
  proximoMantenimiento?: Date;
}

// API endpoints
export const getRecursos = async (): Promise<Recurso[]> => {
  // Simulación de datos
  return [];
};

export const getSalas = async (): Promise<Sala[]> => {
  // Simulación de datos
  return [];
};

export const getMaterial = async (): Promise<Material[]> => {
  // Simulación de datos
  return [];
};

export const crearRecurso = async (recurso: Partial<Recurso>): Promise<Recurso> => {
  // Simulación
  return recurso as Recurso;
};

export const actualizarRecurso = async (id: string, data: Partial<Recurso>): Promise<Recurso> => {
  // Simulación
  return { id, ...data } as Recurso;
};

export const eliminarRecurso = async (id: string): Promise<void> => {
  // Simulación
};

