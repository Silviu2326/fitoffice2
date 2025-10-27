import { supabase } from '../../../lib/supabase';

export interface Cuota {
  id: string;
  suscripcion_id: string;
  cliente_id: string;
  monto: number;
  fecha_cobro: string;
  estado: 'pendiente' | 'procesado' | 'fallido';
  metodo_pago: string;
  intentos: number;
  created_at?: string;
  updated_at?: string;
}

/**
 * Obtener todas las cuotas
 */
export const getCuotas = async (): Promise<Cuota[]> => {
  const { data, error } = await supabase
    .from('cuotas_recurrentes')
    .select('*')
    .order('fecha_cobro', { ascending: false });

  if (error) throw error;
  return data || [];
};

/**
 * Obtener cuotas por estado
 */
export const getCuotasByEstado = async (estado: 'pendiente' | 'procesado' | 'fallido'): Promise<Cuota[]> => {
  const { data, error } = await supabase
    .from('cuotas_recurrentes')
    .select('*')
    .eq('estado', estado)
    .order('fecha_cobro', { ascending: true });

  if (error) throw error;
  return data || [];
};

/**
 * Obtener cuotas de una suscripción
 */
export const getCuotasBySuscripcion = async (suscripcionId: string): Promise<Cuota[]> => {
  const { data, error } = await supabase
    .from('cuotas_recurrentes')
    .select('*')
    .eq('suscripcion_id', suscripcionId)
    .order('fecha_cobro', { ascending: false });

  if (error) throw error;
  return data || [];
};

/**
 * Crear una nueva cuota
 */
export const createCuota = async (cuota: Omit<Cuota, 'id' | 'created_at' | 'updated_at'>): Promise<Cuota> => {
  const { data, error } = await supabase
    .from('cuotas_recurrentes')
    .insert([cuota])
    .select()
    .single();

  if (error) throw error;
  return data;
};

/**
 * Procesar pago de cuota
 */
export const procesarCuota = async (cuotaId: string): Promise<Cuota> => {
  const { data, error } = await supabase
    .from('cuotas_recurrentes')
    .update({
      estado: 'procesado',
      intentos: supabase.sql`intentos + 1`,
      updated_at: new Date().toISOString()
    })
    .eq('id', cuotaId)
    .select()
    .single();

  if (error) throw error;
  return data;
};

/**
 * Marcar cuota como fallida
 */
export const marcarCuotaFallida = async (cuotaId: string): Promise<Cuota> => {
  const { data, error } = await supabase
    .from('cuotas_recurrentes')
    .update({
      estado: 'fallido',
      intentos: supabase.sql`intentos + 1`,
      updated_at: new Date().toISOString()
    })
    .eq('id', cuotaId)
    .select()
    .single();

  if (error) throw error;
  return data;
};

/**
 * Reintentar cobro de cuota fallida
 */
export const reintentarCuota = async (cuotaId: string): Promise<Cuota> => {
  const { data, error } = await supabase
    .from('cuotas_recurrentes')
    .update({
      estado: 'pendiente',
      updated_at: new Date().toISOString()
    })
    .eq('id', cuotaId)
    .select()
    .single();

  if (error) throw error;
  return data;
};

/**
 * Obtener cuotas pendientes del mes
 */
export const getCuotasPendientesMes = async (): Promise<Cuota[]> => {
  const hoy = new Date();
  const primerDia = new Date(hoy.getFullYear(), hoy.getMonth(), 1);
  const ultimoDia = new Date(hoy.getFullYear(), hoy.getMonth() + 1, 0);

  const { data, error } = await supabase
    .from('cuotas_recurrentes')
    .select('*')
    .eq('estado', 'pendiente')
    .gte('fecha_cobro', primerDia.toISOString())
    .lte('fecha_cobro', ultimoDia.toISOString())
    .order('fecha_cobro', { ascending: true });

  if (error) throw error;
  return data || [];
};

/**
 * Obtener estadísticas de cuotas
 */
export const getEstadisticasCuotas = async () => {
  const cuotas = await getCuotas();
  
  const totalPendiente = cuotas
    .filter(c => c.estado === 'pendiente')
    .reduce((sum, c) => sum + c.monto, 0);
  
  const totalProcesado = cuotas
    .filter(c => c.estado === 'procesado')
    .reduce((sum, c) => sum + c.monto, 0);
  
  const totalFallido = cuotas
    .filter(c => c.estado === 'fallido')
    .reduce((sum, c) => sum + c.monto, 0);

  return {
    totalPendiente,
    totalProcesado,
    totalFallido,
    cantidadPendiente: cuotas.filter(c => c.estado === 'pendiente').length,
    cantidadProcesado: cuotas.filter(c => c.estado === 'procesado').length,
    cantidadFallido: cuotas.filter(c => c.estado === 'fallido').length
  };
};

