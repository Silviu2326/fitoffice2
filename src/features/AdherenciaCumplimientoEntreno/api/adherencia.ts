// API para gestión de adherencia de entrenamiento

export interface AdherenciaCliente {
  clienteId: string;
  nombre: string;
  adherencia: number;
  sesionesCompletadas: number;
  sesionesPendientes: number;
  ultimaSesion: string;
}

export interface AdherenciaGeneral {
  adherenciaPromedio: number;
  tendencia: number;
  clientesActivos: number;
  clientesRiesgo: number;
  sesionesCompletadas: number;
  sesionesTotales: number;
}

/**
 * Obtiene la adherencia general del sistema
 */
export async function getAdherenciaGeneral(): Promise<AdherenciaGeneral> {
  // TODO: Implementar llamada a API real
  // const response = await fetch('/api/entrenamiento/adherencia');
  // return response.json();
  
  return {
    adherenciaPromedio: 78,
    tendencia: 5.2,
    clientesActivos: 45,
    clientesRiesgo: 8,
    sesionesCompletadas: 892,
    sesionesTotales: 1140
  };
}

/**
 * Obtiene la adherencia de un cliente específico
 */
export async function getAdherenciaCliente(clienteId: string): Promise<AdherenciaCliente> {
  // TODO: Implementar llamada a API real
  // const response = await fetch(`/api/entrenamiento/adherencia/cliente/${clienteId}`);
  // return response.json();
  
  return {
    clienteId,
    nombre: 'Cliente Demo',
    adherencia: 85,
    sesionesCompletadas: 17,
    sesionesPendientes: 3,
    ultimaSesion: '2025-10-25'
  };
}

/**
 * Obtiene la lista de clientes con su adherencia
 */
export async function getAdherenciaClientes(): Promise<AdherenciaCliente[]> {
  // TODO: Implementar llamada a API real
  // const response = await fetch('/api/entrenamiento/adherencia/clientes');
  // return response.json();
  
  return [
    {
      clienteId: '1',
      nombre: 'Juan Pérez',
      adherencia: 85,
      sesionesCompletadas: 17,
      sesionesPendientes: 3,
      ultimaSesion: '2025-10-25'
    },
    {
      clienteId: '2',
      nombre: 'María García',
      adherencia: 92,
      sesionesCompletadas: 23,
      sesionesPendientes: 2,
      ultimaSesion: '2025-10-26'
    }
  ];
}

/**
 * Obtiene métricas de adherencia para analytics
 */
export async function getAdherenciaAnalytics(periodo: 'semana' | 'mes' | 'trimestre') {
  // TODO: Implementar llamada a API real
  // const response = await fetch(`/api/entrenamiento/adherencia/analytics?periodo=${periodo}`);
  // return response.json();
  
  return {
    periodo,
    adherenciaPromedio: 78,
    tendencias: [
      { periodo: 'Sem 1', valor: 72 },
      { periodo: 'Sem 2', valor: 75 },
      { periodo: 'Sem 3', valor: 78 },
      { periodo: 'Sem 4', valor: 80 }
    ]
  };
}

/**
 * Crea una alerta de baja adherencia
 */
export async function crearAlertaAdherencia(clienteId: string, tipo: string, datos: any) {
  // TODO: Implementar llamada a API real
  // const response = await fetch('/api/entrenamiento/adherencia/alerta', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({ clienteId, tipo, datos })
  // });
  // return response.json();
  
  return {
    success: true,
    alertaId: 'alerta-123',
    mensaje: 'Alerta creada correctamente'
  };
}

