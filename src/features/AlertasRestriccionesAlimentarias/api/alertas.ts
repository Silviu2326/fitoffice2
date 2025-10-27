// API para gestión de alertas de seguridad alimentaria

export interface Alerta {
  id: string;
  restriccionId: string;
  clienteId: string;
  clienteNombre: string;
  ingrediente: string;
  receta: string;
  recetaId: string;
  tipo: 'alergia' | 'intolerancia' | 'religiosa' | 'cultural';
  severidad: 'alta' | 'media' | 'baja';
  estado: 'bloqueada' | 'resuelta' | 'pendiente';
  accion: string;
  fecha: string;
  resueltoEn?: string;
  resueltosPor?: string;
}

export interface FiltrosAlertas {
  clienteId?: string;
  tipo?: string;
  severidad?: string;
  estado?: string;
  fechaDesde?: string;
  fechaHasta?: string;
}

// GET /api/nutricion/alertas
export async function obtenerAlertas(filtros?: FiltrosAlertas): Promise<Alerta[]> {
  // TODO: Implementar llamada real a la API
  console.log('Obtener alertas con filtros:', filtros);
  return [];
}

// GET /api/nutricion/alertas/:id
export async function obtenerAlertaPorId(id: string): Promise<Alerta | null> {
  // TODO: Implementar llamada real a la API
  return null;
}

// GET /api/nutricion/alertas/cliente/:clienteId
export async function obtenerAlertasPorCliente(clienteId: string): Promise<Alerta[]> {
  // TODO: Implementar llamada real a la API
  return [];
}

// GET /api/nutricion/alertas/restriccion/:restriccionId
export async function obtenerAlertasPorRestriccion(restriccionId: string): Promise<Alerta[]> {
  // TODO: Implementar llamada real a la API
  return [];
}

// POST /api/nutricion/alertas/:id/resolver
export async function resolverAlerta(id: string, accion: string): Promise<void> {
  // TODO: Implementar llamada real a la API
  console.log('Resolver alerta:', id, accion);
}

// GET /api/nutricion/alertas/estadisticas
export async function obtenerEstadisticasAlertas(): Promise<{
  total: number;
  bloqueadas: number;
  resueltas: number;
  pendientes: number;
  porSeveridad: Record<string, number>;
  porTipo: Record<string, number>;
}> {
  // TODO: Implementar llamada real a la API
  return {
    total: 0,
    bloqueadas: 0,
    resueltas: 0,
    pendientes: 0,
    porSeveridad: {},
    porTipo: {}
  };
}

