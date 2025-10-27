// API para gestión de cobros

interface Cobro {
  id: string;
  facturaId: string;
  fecha: string;
  importe: number;
  metodoPago: 'efectivo' | 'transferencia' | 'tarjeta' | 'otro';
  referencia?: string;
  notas?: string;
}

/**
 * Registra un nuevo cobro
 * POST /api/finanzas/cobros
 */
export const registrarCobro = async (cobro: Omit<Cobro, 'id'>): Promise<Cobro> => {
  try {
    // TODO: Implementar llamada real a la API
    // const response = await fetch('/api/finanzas/cobros', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(cobro)
    // });
    // return await response.json();
    
    return { ...cobro, id: Date.now().toString() };
  } catch (error) {
    console.error('Error al registrar cobro:', error);
    throw error;
  }
};

/**
 * Obtiene los cobros de una factura
 * GET /api/finanzas/cobros?facturaId=:id
 */
export const obtenerCobrosPorFactura = async (facturaId: string): Promise<Cobro[]> => {
  try {
    // TODO: Implementar llamada real a la API
    // const response = await fetch(`/api/finanzas/cobros?facturaId=${facturaId}`);
    // return await response.json();
    
    return [];
  } catch (error) {
    console.error('Error al obtener cobros:', error);
    throw error;
  }
};

/**
 * Obtiene todos los cobros
 * GET /api/finanzas/cobros
 */
export const obtenerTodosCobros = async (): Promise<Cobro[]> => {
  try {
    // TODO: Implementar llamada real a la API
    // const response = await fetch('/api/finanzas/cobros');
    // return await response.json();
    
    return [];
  } catch (error) {
    console.error('Error al obtener cobros:', error);
    throw error;
  }
};

/**
 * Marca una factura como cobrada
 * POST /api/finanzas/cobros/marcar-cobrada
 */
export const marcarFacturaComoCobrada = async (
  facturaId: string,
  metodoPago: Cobro['metodoPago'],
  referencia?: string
): Promise<Cobro> => {
  try {
    const cobro: Omit<Cobro, 'id'> = {
      facturaId,
      fecha: new Date().toISOString(),
      importe: 0, // El backend debería obtener el importe de la factura
      metodoPago,
      referencia
    };

    return await registrarCobro(cobro);
  } catch (error) {
    console.error('Error al marcar factura como cobrada:', error);
    throw error;
  }
};

