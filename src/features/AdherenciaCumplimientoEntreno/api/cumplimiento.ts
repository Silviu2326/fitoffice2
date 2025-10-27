// API para gestión de cumplimiento de sesiones

export interface SesionEntrenamiento {
  id: string;
  clienteId: string;
  fecha: string;
  ejercicio: string;
  completada: boolean;
  duracion?: number;
  notas?: string;
}

export interface CumplimientoSemanal {
  semana: string;
  adherencia: number;
  sesionesCompletadas: number;
  sesionesPendientes: number;
  cambio: number;
}

/**
 * Obtiene el cumplimiento de sesiones de un cliente
 */
export async function getCumplimientoCliente(clienteId: string): Promise<SesionEntrenamiento[]> {
  // TODO: Implementar llamada a API real
  // const response = await fetch(`/api/entrenamiento/cumplimiento/cliente/${clienteId}`);
  // return response.json();
  
  return [
    {
      id: '1',
      clienteId,
      fecha: '2025-10-26',
      ejercicio: 'Entrenamiento de Fuerza',
      completada: true,
      duracion: 60
    },
    {
      id: '2',
      clienteId,
      fecha: '2025-10-25',
      ejercicio: 'Cardio HIIT',
      completada: true,
      duracion: 45
    },
    {
      id: '3',
      clienteId,
      fecha: '2025-10-24',
      ejercicio: 'Movilidad y Flexibilidad',
      completada: false
    }
  ];
}

/**
 * Marca una sesión como completada
 */
export async function marcarSesionCompletada(sesionId: string, datos: {
  duracion?: number;
  notas?: string;
}) {
  // TODO: Implementar llamada a API real
  // const response = await fetch(`/api/entrenamiento/cumplimiento/sesion/${sesionId}`, {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({ completada: true, ...datos })
  // });
  // return response.json();
  
  return {
    success: true,
    sesionId,
    mensaje: 'Sesión marcada como completada'
  };
}

/**
 * Obtiene el cumplimiento semanal
 */
export async function getCumplimientoSemanal(semanas: number = 4): Promise<CumplimientoSemanal[]> {
  // TODO: Implementar llamada a API real
  // const response = await fetch(`/api/entrenamiento/cumplimiento/semanal?semanas=${semanas}`);
  // return response.json();
  
  return [
    { semana: 'Sem 1', adherencia: 72, sesionesCompletadas: 215, sesionesPendientes: 83, cambio: 3 },
    { semana: 'Sem 2', adherencia: 75, sesionesCompletadas: 223, sesionesPendientes: 74, cambio: 3 },
    { semana: 'Sem 3', adherencia: 78, sesionesCompletadas: 234, sesionesPendientes: 66, cambio: 3 },
    { semana: 'Sem 4', adherencia: 80, sesionesCompletadas: 242, sesionesPendientes: 60, cambio: 2 }
  ];
}

/**
 * Registra seguimiento de sesión
 */
export async function registrarSeguimiento(clienteId: string, datos: {
  sesionId: string;
  completada: boolean;
  duracion?: number;
  feedback?: string;
}) {
  // TODO: Implementar llamada a API real
  // const response = await fetch('/api/entrenamiento/seguimiento', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({ clienteId, ...datos })
  // });
  // return response.json();
  
  return {
    success: true,
    mensaje: 'Seguimiento registrado correctamente'
  };
}

/**
 * Obtiene métricas de cumplimiento
 */
export async function getMetricasCumplimiento() {
  // TODO: Implementar llamada a API real
  // const response = await fetch('/api/entrenamiento/metricas');
  // return response.json();
  
  return {
    adherenciaGeneral: 78,
    sesionesCompletadas: 892,
    sesionesTotales: 1140,
    clientesActivos: 45,
    clientesRiesgo: 8,
    metaSemanal: 85
  };
}

