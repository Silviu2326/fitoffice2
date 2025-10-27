// API para gestión de restricciones alimentarias

export interface Restriccion {
  id: string;
  clienteId: string;
  clienteNombre: string;
  tipo: 'alergia' | 'intolerancia' | 'religiosa' | 'cultural';
  descripcion: string;
  severidad: 'leve' | 'moderada' | 'severa';
  ingredientes: string[];
  fechaRegistro: string;
  activa: boolean;
}

export interface CrearRestriccionDTO {
  clienteId: string;
  clienteNombre: string;
  tipo: 'alergia' | 'intolerancia' | 'religiosa' | 'cultural';
  descripcion: string;
  severidad: 'leve' | 'moderada' | 'severa';
  ingredientes: string[];
}

// GET /api/nutricion/restricciones
export async function obtenerRestricciones(): Promise<Restriccion[]> {
  // TODO: Implementar llamada real a la API
  return [];
}

// GET /api/nutricion/restricciones/:id
export async function obtenerRestriccionPorId(id: string): Promise<Restriccion | null> {
  // TODO: Implementar llamada real a la API
  return null;
}

// GET /api/nutricion/restricciones/cliente/:clienteId
export async function obtenerRestriccionesPorCliente(clienteId: string): Promise<Restriccion[]> {
  // TODO: Implementar llamada real a la API
  return [];
}

// POST /api/nutricion/restricciones
export async function crearRestriccion(data: CrearRestriccionDTO): Promise<Restriccion> {
  // TODO: Implementar llamada real a la API
  console.log('Crear restricción:', data);
  return {} as Restriccion;
}

// PUT /api/nutricion/restricciones/:id
export async function actualizarRestriccion(id: string, data: Partial<CrearRestriccionDTO>): Promise<Restriccion> {
  // TODO: Implementar llamada real a la API
  console.log('Actualizar restricción:', id, data);
  return {} as Restriccion;
}

// DELETE /api/nutricion/restricciones/:id
export async function eliminarRestriccion(id: string): Promise<void> {
  // TODO: Implementar llamada real a la API
  console.log('Eliminar restricción:', id);
}

// POST /api/nutricion/restricciones/:id/activar
export async function activarRestriccion(id: string): Promise<void> {
  // TODO: Implementar llamada real a la API
  console.log('Activar restricción:', id);
}

// POST /api/nutricion/restricciones/:id/desactivar
export async function desactivarRestriccion(id: string): Promise<void> {
  // TODO: Implementar llamada real a la API
  console.log('Desactivar restricción:', id);
}

