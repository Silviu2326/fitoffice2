// API endpoints para alertas de dolor y problemas

export interface Alerta {
  id: string;
  tipo: 'dolor_lumbar' | 'fatiga_excesiva' | 'patron_negativo';
  cliente: string;
  ejercicio: string;
  fecha: string;
  descripcion: string;
  severidad: 'alta' | 'media' | 'baja';
  resuelta: boolean;
}

// POST /api/entrenamiento/checkins/alerta
export async function crearAlerta(data: Omit<Alerta, 'id'>): Promise<Alerta> {
  // TODO: Implementar llamada real a la API
  return { ...data, id: Date.now().toString() };
}

// GET /api/entrenamiento/checkins/alertas
export async function obtenerAlertas(filtros?: {
  cliente?: string;
  severidad?: string;
  resuelta?: boolean;
}): Promise<Alerta[]> {
  // TODO: Implementar llamada real a la API
  return [];
}

// PUT /api/entrenamiento/checkins/alertas/:id
export async function marcarAlertaResuelta(id: string): Promise<void> {
  // TODO: Implementar llamada real a la API
}

