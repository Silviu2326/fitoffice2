// API endpoints para check-ins de entrenamiento

export interface CheckIn {
  id: string;
  clienteId: string;
  clienteNombre: string;
  ejercicio: string;
  serie: number;
  sensacion: 'buena' | 'regular' | 'mala';
  rpe: number;
  dolorLumbar: boolean;
  fecha: string;
  notas: string;
}

// GET /api/entrenamiento/checkins
export async function obtenerCheckIns(): Promise<CheckIn[]> {
  // TODO: Implementar llamada real a la API
  return [];
}

// POST /api/entrenamiento/checkins
export async function crearCheckIn(data: Omit<CheckIn, 'id'>): Promise<CheckIn> {
  // TODO: Implementar llamada real a la API
  return { ...data, id: Date.now().toString() };
}

// PUT /api/entrenamiento/checkins/:id
export async function actualizarCheckIn(id: string, data: Partial<CheckIn>): Promise<CheckIn> {
  // TODO: Implementar llamada real a la API
  return { id, ...data } as CheckIn;
}

// GET /api/entrenamiento/checkins/historial
export async function obtenerHistorial(clienteId?: string): Promise<any[]> {
  // TODO: Implementar llamada real a la API
  return [];
}

// GET /api/entrenamiento/checkins/analytics
export async function obtenerAnalytics(): Promise<any> {
  // TODO: Implementar llamada real a la API
  return {};
}

