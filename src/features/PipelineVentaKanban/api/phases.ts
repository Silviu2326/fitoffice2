import { Phase, BusinessType } from '../types';

// Fases por defecto para diferentes tipos de negocio
const personalTrainerPhases: Phase[] = [
  {
    id: 'contactado',
    name: 'Contactado',
    order: 0,
    color: 'bg-blue-500',
    description: 'Primer contacto con el lead',
  },
  {
    id: 'enviado-precio',
    name: 'Enviado Precio',
    order: 1,
    color: 'bg-purple-500',
    description: 'Precio y condiciones enviadas',
  },
  {
    id: 'llamada',
    name: 'Llamada',
    order: 2,
    color: 'bg-amber-500',
    description: 'Llamada de seguimiento realizada',
  },
  {
    id: 'cerrado',
    name: 'Cerrado',
    order: 3,
    color: 'bg-emerald-500',
    description: 'Venta cerrada exitosamente',
  },
];

const gymPhases: Phase[] = [
  {
    id: 'tour-hecho',
    name: 'Tour Hecho',
    order: 0,
    color: 'bg-blue-500',
    description: 'Visita guiada a las instalaciones',
  },
  {
    id: 'oferta-enviada',
    name: 'Oferta Enviada',
    order: 1,
    color: 'bg-purple-500',
    description: 'Propuesta comercial enviada',
  },
  {
    id: 'matricula-pendiente',
    name: 'Matrícula Pendiente',
    order: 2,
    color: 'bg-amber-500',
    description: 'En proceso de matrícula',
  },
  {
    id: 'alta-cerrada',
    name: 'Alta Cerrada',
    order: 3,
    color: 'bg-emerald-500',
    description: 'Cliente dado de alta',
  },
];

const businessTypes: BusinessType[] = [
  {
    id: 'personal-trainer',
    name: 'Entrenador Personal',
    defaultPhases: personalTrainerPhases,
  },
  {
    id: 'gym',
    name: 'Gimnasio/Centro',
    defaultPhases: gymPhases,
  },
];

export const phasesAPI = {
  // Obtener todas las fases del pipeline
  getPhases: async (): Promise<Phase[]> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    // Por defecto, devolver fases de entrenador personal
    return personalTrainerPhases;
  },

  // Crear una nueva fase
  createPhase: async (phase: Omit<Phase, 'id'>): Promise<Phase> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const newPhase: Phase = {
      ...phase,
      id: `phase-${Date.now()}`,
    };
    return newPhase;
  },

  // Actualizar una fase
  updatePhase: async (id: string, updates: Partial<Phase>): Promise<Phase> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const phase = personalTrainerPhases.find(p => p.id === id);
    if (!phase) throw new Error('Fase no encontrada');
    return { ...phase, ...updates };
  },

  // Eliminar una fase
  deletePhase: async (id: string): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    // En producción, aquí se eliminaría de la base de datos
  },

  // Obtener tipos de negocio con sus fases predeterminadas
  getBusinessTypes: async (): Promise<BusinessType[]> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return businessTypes;
  },

  // Obtener fases por tipo de negocio
  getPhasesByBusinessType: async (businessTypeId: string): Promise<Phase[]> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const businessType = businessTypes.find(bt => bt.id === businessTypeId);
    return businessType ? businessType.defaultPhases : personalTrainerPhases;
  },

  // Actualizar todas las fases (configuración completa)
  updateAllPhases: async (phases: Phase[]): Promise<Phase[]> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    // En producción, aquí se actualizarían todas las fases en la base de datos
    return phases;
  },
};

