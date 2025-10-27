// API endpoints para análisis de patrones

export interface Patron {
  cliente: string;
  ejercicio: string;
  tendencia: 'mejorando' | 'estable' | 'empeorando';
  rpePromedio: number;
  rpeCambio: number;
  satisfaccion: number;
}

// GET /api/entrenamiento/checkins/patrones
export async function obtenerPatrones(clienteId?: string): Promise<Patron[]> {
  // TODO: Implementar llamada real a la API
  return [];
}

// POST /api/entrenamiento/checkins/ajuste
export async function ajustarProgramacion(
  clienteId: string,
  ejercicioId: string,
  ajustes: any
): Promise<any> {
  // TODO: Implementar llamada real a la API
  return {};
}

