import { supabase } from '../../../lib/supabase';

export interface Renovacion {
  id: string;
  suscripcion_id: string;
  cliente_id: string;
  fecha_renovacion: string;
  monto: number;
  estado: 'programada' | 'completada' | 'fallida';
  metodo_pago: string;
  created_at?: string;
  updated_at?: string;
}

/**
 * Obtener todas las renovaciones
 */
export const getRenovaciones = async (): Promise<Renovacion[]> => {
  const { data, error } = await supabase
    .from('renovaciones')
    .select('*')
    .order('fecha_renovacion', { ascending: true });

  if (error) throw error;
  return data || [];
};

/**
 * Obtener renovaciones próximas (próximos 30 días)
 */
export const getRenovacionesProximas = async (): Promise<Renovacion[]> => {
  const hoy = new Date();
  const en30Dias = new Date(hoy);
  en30Dias.setDate(hoy.getDate() + 30);

  const { data, error } = await supabase
    .from('renovaciones')
    .select('*')
    .eq('estado', 'programada')
    .gte('fecha_renovacion', hoy.toISOString())
    .lte('fecha_renovacion', en30Dias.toISOString())
    .order('fecha_renovacion', { ascending: true });

  if (error) throw error;
  return data || [];
};

/**
 * Obtener renovaciones de esta semana
 */
export const getRenovacionesSemana = async (): Promise<Renovacion[]> => {
  const hoy = new Date();
  const en7Dias = new Date(hoy);
  en7Dias.setDate(hoy.getDate() + 7);

  const { data, error } = await supabase
    .from('renovaciones')
    .select('*')
    .eq('estado', 'programada')
    .gte('fecha_renovacion', hoy.toISOString())
    .lte('fecha_renovacion', en7Dias.toISOString())
    .order('fecha_renovacion', { ascending: true });

  if (error) throw error;
  return data || [];
};

/**
 * Crear una renovación programada
 */
export const createRenovacion = async (renovacion: Omit<Renovacion, 'id' | 'created_at' | 'updated_at'>): Promise<Renovacion> => {
  const { data, error } = await supabase
    .from('renovaciones')
    .insert([renovacion])
    .select()
    .single();

  if (error) throw error;
  return data;
};

/**
 * Procesar renovación automática
 */
export const procesarRenovacion = async (renovacionId: string): Promise<Renovacion> => {
  const { data, error } = await supabase
    .from('renovaciones')
    .update({
      estado: 'completada',
      updated_at: new Date().toISOString()
    })
    .eq('id', renovacionId)
    .select()
    .single();

  if (error) throw error;
  return data;
};

/**
 * Marcar renovación como fallida
 */
export const marcarRenovacionFallida = async (renovacionId: string): Promise<Renovacion> => {
  const { data, error } = await supabase
    .from('renovaciones')
    .update({
      estado: 'fallida',
      updated_at: new Date().toISOString()
    })
    .eq('id', renovacionId)
    .select()
    .single();

  if (error) throw error;
  return data;
};

/**
 * Programar siguiente renovación
 */
export const programarSiguienteRenovacion = async (
  suscripcionId: string,
  clienteId: string,
  fechaRenovacion: string,
  monto: number,
  metodoPago: string
): Promise<Renovacion> => {
  const renovacion: Omit<Renovacion, 'id' | 'created_at' | 'updated_at'> = {
    suscripcion_id: suscripcionId,
    cliente_id: clienteId,
    fecha_renovacion: fechaRenovacion,
    monto,
    estado: 'programada',
    metodo_pago: metodoPago
  };

  return createRenovacion(renovacion);
};

/**
 * Obtener estadísticas de renovaciones
 */
export const getEstadisticasRenovaciones = async () => {
  const renovaciones = await getRenovaciones();
  const renovacionesSemana = await getRenovacionesSemana();
  const hoy = new Date();
  const primerDiaMes = new Date(hoy.getFullYear(), hoy.getMonth(), 1);
  const ultimoDiaMes = new Date(hoy.getFullYear(), hoy.getMonth() + 1, 0);

  const renovacionesMes = renovaciones.filter(r => {
    const fecha = new Date(r.fecha_renovacion);
    return fecha >= primerDiaMes && fecha <= ultimoDiaMes && r.estado === 'programada';
  });

  const valorEstimadoSemana = renovacionesSemana.reduce((sum, r) => sum + r.monto, 0);
  const valorEstimadoMes = renovacionesMes.reduce((sum, r) => sum + r.monto, 0);

  return {
    renovacionesSemana: renovacionesSemana.length,
    renovacionesMes: renovacionesMes.length,
    valorEstimadoSemana,
    valorEstimadoMes,
    tasaExito: renovaciones.length > 0 
      ? (renovaciones.filter(r => r.estado === 'completada').length / renovaciones.length) * 100 
      : 0
  };
};

