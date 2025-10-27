// API específica para gestión de ingresos

const API_BASE_URL = '/api/finanzas/ingresos';

export interface DetalleIngreso {
  id: string;
  fecha: string;
  concepto: string;
  categoria: string;
  cantidad: number;
  cliente?: string;
  metodoPago: string;
  estado: 'completado' | 'pendiente' | 'cancelado';
}

export interface ResumenIngresosPorCategoria {
  categoria: string;
  total: number;
  cantidad: number;
  promedio: number;
}

// GET /api/finanzas/ingresos/detalle
export async function getDetalleIngresos(
  fechaInicio: string,
  fechaFin: string,
  categoria?: string
): Promise<DetalleIngreso[]> {
  try {
    const params = new URLSearchParams({
      fechaInicio,
      fechaFin,
      ...(categoria && { categoria })
    });
    
    const response = await fetch(`${API_BASE_URL}/detalle?${params}`);
    if (!response.ok) throw new Error('Error al obtener detalle de ingresos');
    return await response.json();
  } catch (error) {
    console.error('Error en getDetalleIngresos:', error);
    throw error;
  }
}

// GET /api/finanzas/ingresos/por-categoria
export async function getIngresosPorCategoria(
  fechaInicio: string,
  fechaFin: string
): Promise<ResumenIngresosPorCategoria[]> {
  try {
    const params = new URLSearchParams({ fechaInicio, fechaFin });
    const response = await fetch(`${API_BASE_URL}/por-categoria?${params}`);
    if (!response.ok) throw new Error('Error al obtener ingresos por categoría');
    return await response.json();
  } catch (error) {
    console.error('Error en getIngresosPorCategoria:', error);
    throw error;
  }
}

// GET /api/finanzas/ingresos/comparativa
export async function getComparativaIngresos(meses: number = 6) {
  try {
    const response = await fetch(`${API_BASE_URL}/comparativa?meses=${meses}`);
    if (!response.ok) throw new Error('Error al obtener comparativa de ingresos');
    return await response.json();
  } catch (error) {
    console.error('Error en getComparativaIngresos:', error);
    throw error;
  }
}

// GET /api/finanzas/ingresos/top-clientes
export async function getTopClientesPorIngresos(limite: number = 10) {
  try {
    const response = await fetch(`${API_BASE_URL}/top-clientes?limite=${limite}`);
    if (!response.ok) throw new Error('Error al obtener top clientes');
    return await response.json();
  } catch (error) {
    console.error('Error en getTopClientesPorIngresos:', error);
    throw error;
  }
}

