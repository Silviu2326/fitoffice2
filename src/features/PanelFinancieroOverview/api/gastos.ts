// API específica para gestión de gastos estructurales

const API_BASE_URL = '/api/finanzas/gastos';

export interface DetalleGasto {
  id: string;
  fecha: string;
  concepto: string;
  categoria: string;
  cantidad: number;
  tipo: 'fijo' | 'variable';
  proveedor?: string;
  metodoPago: string;
  estado: 'pagado' | 'pendiente' | 'vencido';
  fechaVencimiento?: string;
}

export interface ResumenGastosPorCategoria {
  categoria: string;
  total: number;
  tipo: 'fijo' | 'variable';
  cantidad: number;
  promedio: number;
}

// GET /api/finanzas/gastos/detalle
export async function getDetalleGastos(
  fechaInicio: string,
  fechaFin: string,
  tipo?: 'fijo' | 'variable'
): Promise<DetalleGasto[]> {
  try {
    const params = new URLSearchParams({
      fechaInicio,
      fechaFin,
      ...(tipo && { tipo })
    });
    
    const response = await fetch(`${API_BASE_URL}/detalle?${params}`);
    if (!response.ok) throw new Error('Error al obtener detalle de gastos');
    return await response.json();
  } catch (error) {
    console.error('Error en getDetalleGastos:', error);
    throw error;
  }
}

// GET /api/finanzas/gastos/por-categoria
export async function getGastosPorCategoria(
  fechaInicio: string,
  fechaFin: string
): Promise<ResumenGastosPorCategoria[]> {
  try {
    const params = new URLSearchParams({ fechaInicio, fechaFin });
    const response = await fetch(`${API_BASE_URL}/por-categoria?${params}`);
    if (!response.ok) throw new Error('Error al obtener gastos por categoría');
    return await response.json();
  } catch (error) {
    console.error('Error en getGastosPorCategoria:', error);
    throw error;
  }
}

// GET /api/finanzas/gastos/comparativa
export async function getComparativaGastos(meses: number = 6) {
  try {
    const response = await fetch(`${API_BASE_URL}/comparativa?meses=${meses}`);
    if (!response.ok) throw new Error('Error al obtener comparativa de gastos');
    return await response.json();
  } catch (error) {
    console.error('Error en getComparativaGastos:', error);
    throw error;
  }
}

// GET /api/finanzas/gastos/pendientes
export async function getGastosPendientes() {
  try {
    const response = await fetch(`${API_BASE_URL}/pendientes`);
    if (!response.ok) throw new Error('Error al obtener gastos pendientes');
    return await response.json();
  } catch (error) {
    console.error('Error en getGastosPendientes:', error);
    throw error;
  }
}

// POST /api/finanzas/gastos/registrar
export async function registrarGasto(gasto: Omit<DetalleGasto, 'id'>) {
  try {
    const response = await fetch(`${API_BASE_URL}/registrar`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(gasto)
    });
    if (!response.ok) throw new Error('Error al registrar gasto');
    return await response.json();
  } catch (error) {
    console.error('Error en registrarGasto:', error);
    throw error;
  }
}

// PUT /api/finanzas/gastos/:id
export async function actualizarGasto(id: string, gasto: Partial<DetalleGasto>) {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(gasto)
    });
    if (!response.ok) throw new Error('Error al actualizar gasto');
    return await response.json();
  } catch (error) {
    console.error('Error en actualizarGasto:', error);
    throw error;
  }
}

// DELETE /api/finanzas/gastos/:id
export async function eliminarGasto(id: string) {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'DELETE'
    });
    if (!response.ok) throw new Error('Error al eliminar gasto');
    return await response.json();
  } catch (error) {
    console.error('Error en eliminarGasto:', error);
    throw error;
  }
}

