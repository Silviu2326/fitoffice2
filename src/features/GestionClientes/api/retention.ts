import { supabase } from '../../../lib/supabase';

export interface AlertaRetencion {
  id: string;
  tipo: 'inactividad' | 'baja_adherencia' | 'cancelacion' | 'pago_pendiente';
  clienteId: string;
  clienteNombre: string;
  prioridad: 'alta' | 'media' | 'baja';
  mensaje: string;
  estado: 'pendiente' | 'en_proceso' | 'completada' | 'ignorada';
  accionesSugeridas: string[];
  fechaCreacion: string;
  created_at?: string;
  updated_at?: string;
}

export interface AccionRetencion {
  id: string;
  alertaId: string;
  clienteId: string;
  tipo: 'llamada' | 'email' | 'sms' | 'whatsapp' | 'reunion';
  descripcion: string;
  fecha: string;
  resultado: string;
  efectiva: boolean;
  created_at?: string;
}

/**
 * Obtiene todas las alertas de retención
 */
export async function getAlertasRetencion(): Promise<AlertaRetencion[]> {
  const { data, error } = await supabase
    .from('alertas_retencion')
    .select('*')
    .order('fechaCreacion', { ascending: false });

  if (error) {
    console.error('Error fetching alertas retención:', error);
    throw error;
  }

  return data || [];
}

/**
 * Obtiene alertas pendientes
 */
export async function getAlertasPendientes(): Promise<AlertaRetencion[]> {
  const { data, error } = await supabase
    .from('alertas_retencion')
    .select('*')
    .eq('estado', 'pendiente')
    .order('prioridad', { ascending: false })
    .order('fechaCreacion', { ascending: false });

  if (error) {
    console.error('Error fetching alertas pendientes:', error);
    throw error;
  }

  return data || [];
}

/**
 * Obtiene alertas por cliente
 */
export async function getAlertasByCliente(clienteId: string): Promise<AlertaRetencion[]> {
  const { data, error } = await supabase
    .from('alertas_retencion')
    .select('*')
    .eq('clienteId', clienteId)
    .order('fechaCreacion', { ascending: false });

  if (error) {
    console.error('Error fetching alertas del cliente:', error);
    throw error;
  }

  return data || [];
}

/**
 * Crea una nueva alerta de retención
 */
export async function createAlertaRetencion(
  alerta: Omit<AlertaRetencion, 'id' | 'created_at' | 'updated_at'>
): Promise<AlertaRetencion> {
  const { data, error } = await supabase
    .from('alertas_retencion')
    .insert([alerta])
    .select()
    .single();

  if (error) {
    console.error('Error creating alerta retención:', error);
    throw error;
  }

  return data;
}

/**
 * Actualiza el estado de una alerta
 */
export async function updateAlertaEstado(
  id: string,
  estado: AlertaRetencion['estado']
): Promise<AlertaRetencion> {
  const { data, error } = await supabase
    .from('alertas_retencion')
    .update({ estado })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating alerta estado:', error);
    throw error;
  }

  return data;
}

/**
 * Registra una acción de retención
 */
export async function createAccionRetencion(
  accion: Omit<AccionRetencion, 'id' | 'created_at'>
): Promise<AccionRetencion> {
  const { data, error } = await supabase
    .from('acciones_retencion')
    .insert([accion])
    .select()
    .single();

  if (error) {
    console.error('Error creating acción retención:', error);
    throw error;
  }

  return data;
}

/**
 * Obtiene historial de acciones de retención por cliente
 */
export async function getAccionesByCliente(clienteId: string): Promise<AccionRetencion[]> {
  const { data, error } = await supabase
    .from('acciones_retencion')
    .select('*')
    .eq('clienteId', clienteId)
    .order('fecha', { ascending: false });

  if (error) {
    console.error('Error fetching acciones del cliente:', error);
    throw error;
  }

  return data || [];
}

/**
 * Analiza la efectividad de las acciones de retención
 */
export async function getEfectividadAcciones(): Promise<{
  total: number;
  efectivas: number;
  porcentajeEfectividad: number;
  porTipo: Record<string, { total: number; efectivas: number }>;
}> {
  const { data, error } = await supabase
    .from('acciones_retencion')
    .select('tipo, efectiva');

  if (error) {
    console.error('Error fetching efectividad acciones:', error);
    throw error;
  }

  const total = data?.length || 0;
  const efectivas = data?.filter(a => a.efectiva).length || 0;
  
  const porTipo: Record<string, { total: number; efectivas: number }> = {};
  data?.forEach(accion => {
    if (!porTipo[accion.tipo]) {
      porTipo[accion.tipo] = { total: 0, efectivas: 0 };
    }
    porTipo[accion.tipo].total++;
    if (accion.efectiva) {
      porTipo[accion.tipo].efectivas++;
    }
  });

  return {
    total,
    efectivas,
    porcentajeEfectividad: total > 0 ? (efectivas / total) * 100 : 0,
    porTipo
  };
}

/**
 * Genera alertas automáticas basadas en criterios
 */
export async function generarAlertasAutomaticas(): Promise<AlertaRetencion[]> {
  // Esta función analizaría los clientes y generaría alertas automáticamente
  // basándose en criterios como:
  // - Inactividad prolongada
  // - Caída de adherencia
  // - Cancelaciones frecuentes
  // - Pagos pendientes
  
  // TODO: Implementar lógica de generación automática
  return [];
}

