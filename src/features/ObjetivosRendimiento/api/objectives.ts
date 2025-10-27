// API para la gestión de objetivos
export interface Objective {
  id: string;
  nombre: string;
  descripcion: string;
  tipo: 'personal' | 'comercial' | 'operacional';
  metricaObjetivo: number;
  metricaActual: number;
  unidad: string;
  fechaInicio: string;
  fechaFin: string;
  responsable: string;
  estado: 'en_progreso' | 'completado' | 'cancelado' | 'pausado';
  progreso: number;
}

// Mock de datos - conectar con API real en producción
export const getObjectives = async (): Promise<Objective[]> => {
  return [
    {
      id: '1',
      nombre: 'Facturación Mensual Q4',
      descripcion: 'Alcanzar objetivo de facturación para el cuarto trimestre',
      tipo: 'personal',
      metricaObjetivo: 12000,
      metricaActual: 9800,
      unidad: '€',
      fechaInicio: '2025-10-01',
      fechaFin: '2025-12-31',
      responsable: 'Carlos Pérez',
      estado: 'en_progreso',
      progreso: 81.67
    },
    {
      id: '2',
      nombre: 'Adherencia de Clientes',
      descripcion: 'Mantener adherencia promedio superior al 85%',
      tipo: 'personal',
      metricaObjetivo: 85,
      metricaActual: 88,
      unidad: '%',
      fechaInicio: '2025-10-01',
      fechaFin: '2025-10-31',
      responsable: 'Carlos Pérez',
      estado: 'en_progreso',
      progreso: 103.53
    },
    {
      id: '3',
      nombre: 'Nuevos Clientes',
      descripcion: 'Captación de nuevos clientes este mes',
      tipo: 'comercial',
      metricaObjetivo: 20,
      metricaActual: 15,
      unidad: 'clientes',
      fechaInicio: '2025-10-01',
      fechaFin: '2025-10-31',
      responsable: 'Laura González',
      estado: 'en_progreso',
      progreso: 75
    }
  ];
};

export const createObjective = async (objective: Omit<Objective, 'id'>): Promise<Objective> => {
  return { ...objective, id: Date.now().toString() };
};

export const updateObjective = async (id: string, objective: Partial<Objective>): Promise<Objective> => {
  const objectives = await getObjectives();
  const existing = objectives.find(obj => obj.id === id);
  if (!existing) throw new Error('Objetivo no encontrado');
  return { ...existing, ...objective };
};

export const deleteObjective = async (id: string): Promise<void> => {
  console.log('Eliminando objetivo:', id);
};

