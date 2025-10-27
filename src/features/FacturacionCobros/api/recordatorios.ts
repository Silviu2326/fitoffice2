// API para gestión de recordatorios de pago

interface Recordatorio {
  id: string;
  facturaId: string;
  tipo: 'automatico' | 'manual';
  fecha: string;
  estado: 'enviado' | 'programado' | 'fallido';
  mensaje?: string;
  destinatario?: string;
}

/**
 * Obtiene todos los recordatorios
 * GET /api/finanzas/recordatorios
 */
export const obtenerRecordatorios = async (): Promise<Recordatorio[]> => {
  try {
    // TODO: Implementar llamada real a la API
    // const response = await fetch('/api/finanzas/recordatorios');
    // return await response.json();
    
    return [];
  } catch (error) {
    console.error('Error al obtener recordatorios:', error);
    throw error;
  }
};

/**
 * Obtiene los recordatorios de una factura
 * GET /api/finanzas/recordatorios?facturaId=:id
 */
export const obtenerRecordatoriosPorFactura = async (facturaId: string): Promise<Recordatorio[]> => {
  try {
    // TODO: Implementar llamada real a la API
    // const response = await fetch(`/api/finanzas/recordatorios?facturaId=${facturaId}`);
    // return await response.json();
    
    return [];
  } catch (error) {
    console.error('Error al obtener recordatorios de la factura:', error);
    throw error;
  }
};

/**
 * Envía un recordatorio de pago
 * POST /api/finanzas/recordatorios
 */
export const enviarRecordatorio = async (
  facturaId: string,
  mensaje?: string,
  programarPara?: string
): Promise<Recordatorio> => {
  try {
    const recordatorio = {
      facturaId,
      tipo: 'manual' as const,
      mensaje,
      fecha: programarPara || new Date().toISOString()
    };

    // TODO: Implementar llamada real a la API
    // const response = await fetch('/api/finanzas/recordatorios', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(recordatorio)
    // });
    // return await response.json();
    
    return {
      ...recordatorio,
      id: Date.now().toString(),
      estado: programarPara ? 'programado' : 'enviado'
    };
  } catch (error) {
    console.error('Error al enviar recordatorio:', error);
    throw error;
  }
};

/**
 * Configura recordatorios automáticos
 * POST /api/finanzas/recordatorios/configurar-automaticos
 */
export const configurarRecordatoriosAutomaticos = async (config: {
  diasAntes: number[];
  diasDespues: number[];
  plantillaMensaje: string;
}): Promise<void> => {
  try {
    // TODO: Implementar llamada real a la API
    // await fetch('/api/finanzas/recordatorios/configurar-automaticos', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(config)
    // });
  } catch (error) {
    console.error('Error al configurar recordatorios automáticos:', error);
    throw error;
  }
};

/**
 * Cancela un recordatorio programado
 * DELETE /api/finanzas/recordatorios/:id
 */
export const cancelarRecordatorio = async (id: string): Promise<void> => {
  try {
    // TODO: Implementar llamada real a la API
    // await fetch(`/api/finanzas/recordatorios/${id}`, { method: 'DELETE' });
  } catch (error) {
    console.error('Error al cancelar recordatorio:', error);
    throw error;
  }
};

