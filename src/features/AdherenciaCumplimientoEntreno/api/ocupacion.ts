// API para gestión de ocupación de clases (gimnasios)

export interface Clase {
  id: string;
  nombre: string;
  horario: string;
  dia: string;
  plazasTotal: number;
  plazasOcupadas: number;
  ocupacion: number;
  instructorId?: string;
  salaId?: string;
}

export interface OcupacionGeneral {
  ocupacionPromedio: number;
  totalClases: number;
  asistenciaTotal: number;
  tendencia: number;
}

export interface PlanGrupal {
  id: string;
  nombre: string;
  totalSocios: number;
  sociosSiguiendo: number;
  porcentajeSeguimiento: number;
  tendencia: 'up' | 'down' | 'stable';
}

/**
 * Obtiene la ocupación general de clases
 */
export async function getOcupacionGeneral(): Promise<OcupacionGeneral> {
  // TODO: Implementar llamada a API real
  // const response = await fetch('/api/entrenamiento/ocupacion');
  // return response.json();
  
  return {
    ocupacionPromedio: 75,
    totalClases: 45,
    asistenciaTotal: 567,
    tendencia: 8.5
  };
}

/**
 * Obtiene la ocupación de una clase específica
 */
export async function getOcupacionClase(claseId: string): Promise<Clase> {
  // TODO: Implementar llamada a API real
  // const response = await fetch(`/api/entrenamiento/adherencia/clase/${claseId}`);
  // return response.json();
  
  return {
    id: claseId,
    nombre: 'Spinning Intenso',
    horario: '07:00',
    dia: 'Lunes',
    plazasTotal: 20,
    plazasOcupadas: 18,
    ocupacion: 90
  };
}

/**
 * Obtiene todas las clases con su ocupación
 */
export async function getOcupacionClases(): Promise<Clase[]> {
  // TODO: Implementar llamada a API real
  // const response = await fetch('/api/entrenamiento/ocupacion/clases');
  // return response.json();
  
  return [
    {
      id: '1',
      nombre: 'Spinning Intenso',
      horario: '07:00',
      dia: 'Lunes',
      plazasTotal: 20,
      plazasOcupadas: 18,
      ocupacion: 90
    },
    {
      id: '2',
      nombre: 'Yoga Flow',
      horario: '09:00',
      dia: 'Lunes',
      plazasTotal: 15,
      plazasOcupadas: 12,
      ocupacion: 80
    },
    {
      id: '3',
      nombre: 'CrossFit WOD',
      horario: '18:00',
      dia: 'Lunes',
      plazasTotal: 25,
      plazasOcupadas: 10,
      ocupacion: 40
    }
  ];
}

/**
 * Obtiene los planes grupales con seguimiento
 */
export async function getPlanesGrupales(): Promise<PlanGrupal[]> {
  // TODO: Implementar llamada a API real
  // const response = await fetch('/api/entrenamiento/ocupacion/planes-grupales');
  // return response.json();
  
  return [
    {
      id: '1',
      nombre: 'Plan Funcional Básico',
      totalSocios: 120,
      sociosSiguiendo: 95,
      porcentajeSeguimiento: 79,
      tendencia: 'up'
    },
    {
      id: '2',
      nombre: 'Plan CrossFit Estándar',
      totalSocios: 85,
      sociosSiguiendo: 72,
      porcentajeSeguimiento: 85,
      tendencia: 'up'
    }
  ];
}

/**
 * Registra asistencia a una clase
 */
export async function registrarAsistencia(claseId: string, socioId: string, asistio: boolean) {
  // TODO: Implementar llamada a API real
  // const response = await fetch('/api/entrenamiento/ocupacion/asistencia', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({ claseId, socioId, asistio })
  // });
  // return response.json();
  
  return {
    success: true,
    mensaje: 'Asistencia registrada correctamente'
  };
}

/**
 * Obtiene análisis de ocupación por horario
 */
export async function getAnalisisOcupacionHorario() {
  // TODO: Implementar llamada a API real
  // const response = await fetch('/api/entrenamiento/ocupacion/analisis-horarios');
  // return response.json();
  
  return {
    mejorHorario: { hora: '07:00', ocupacion: 92 },
    peorHorario: { hora: '15:00', ocupacion: 45 },
    recomendaciones: [
      'Aumentar clases en horario matutino',
      'Considerar reducir clases en horario de tarde'
    ]
  };
}

