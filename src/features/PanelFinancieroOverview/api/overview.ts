// API endpoints para Panel Financiero Overview

const API_BASE_URL = '/api/finanzas';

export interface OverviewFinanciero {
  ingresosTotales: number;
  gastosTotales: number;
  beneficioNeto: number;
  tendencia: number;
  periodo: string;
}

export interface FuenteIngreso {
  nombre: string;
  cantidad: number;
  porcentaje: number;
  categoria: string;
}

export interface GastoEstructural {
  categoria: string;
  cantidad: number;
  porcentaje: number;
  tipo: 'fijo' | 'variable';
}

// GET /api/finanzas/overview
export async function getOverviewFinanciero(tipoUsuario: 'entrenador' | 'gimnasio'): Promise<OverviewFinanciero> {
  try {
    const response = await fetch(`${API_BASE_URL}/overview?tipo=${tipoUsuario}`);
    if (!response.ok) throw new Error('Error al obtener overview financiero');
    return await response.json();
  } catch (error) {
    console.error('Error en getOverviewFinanciero:', error);
    throw error;
  }
}

// GET /api/finanzas/ingresos
export async function getIngresosDetallados(tipoUsuario: 'entrenador' | 'gimnasio') {
  try {
    const response = await fetch(`${API_BASE_URL}/ingresos?tipo=${tipoUsuario}`);
    if (!response.ok) throw new Error('Error al obtener ingresos detallados');
    return await response.json();
  } catch (error) {
    console.error('Error en getIngresosDetallados:', error);
    throw error;
  }
}

// GET /api/finanzas/gastos
export async function getGastosDetallados(tipoUsuario: 'entrenador' | 'gimnasio') {
  try {
    const response = await fetch(`${API_BASE_URL}/gastos?tipo=${tipoUsuario}`);
    if (!response.ok) throw new Error('Error al obtener gastos detallados');
    return await response.json();
  } catch (error) {
    console.error('Error en getGastosDetallados:', error);
    throw error;
  }
}

// GET /api/finanzas/rendimiento
export async function getRendimientoMensual(meses: number = 6) {
  try {
    const response = await fetch(`${API_BASE_URL}/rendimiento?meses=${meses}`);
    if (!response.ok) throw new Error('Error al obtener rendimiento mensual');
    return await response.json();
  } catch (error) {
    console.error('Error en getRendimientoMensual:', error);
    throw error;
  }
}

// GET /api/finanzas/alertas
export async function getAlertasPagos() {
  try {
    const response = await fetch(`${API_BASE_URL}/alertas`);
    if (!response.ok) throw new Error('Error al obtener alertas de pagos');
    return await response.json();
  } catch (error) {
    console.error('Error en getAlertasPagos:', error);
    throw error;
  }
}

// GET /api/finanzas/rentabilidad
export async function getAnalisisRentabilidad() {
  try {
    const response = await fetch(`${API_BASE_URL}/rentabilidad`);
    if (!response.ok) throw new Error('Error al obtener análisis de rentabilidad');
    return await response.json();
  } catch (error) {
    console.error('Error en getAnalisisRentabilidad:', error);
    throw error;
  }
}

// GET /api/finanzas/proyecciones
export async function getProyeccionesFinancieras(meses: number = 3) {
  try {
    const response = await fetch(`${API_BASE_URL}/proyecciones?meses=${meses}`);
    if (!response.ok) throw new Error('Error al obtener proyecciones financieras');
    return await response.json();
  } catch (error) {
    console.error('Error en getProyeccionesFinancieras:', error);
    throw error;
  }
}

// POST /api/finanzas/reportes
export async function generarReporte(
  tipoReporte: string,
  fechaInicio: string,
  fechaFin: string,
  formato: 'PDF' | 'Excel' | 'CSV'
) {
  try {
    const response = await fetch(`${API_BASE_URL}/reportes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        tipoReporte,
        fechaInicio,
        fechaFin,
        formato
      })
    });
    if (!response.ok) throw new Error('Error al generar reporte');
    return await response.blob();
  } catch (error) {
    console.error('Error en generarReporte:', error);
    throw error;
  }
}

