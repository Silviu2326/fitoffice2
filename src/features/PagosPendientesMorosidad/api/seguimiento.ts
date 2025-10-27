import { supabase } from '../../../lib/supabase';

export interface AccionSeguimiento {
  id: string;
  pago_id: string;
  cliente_id: string;
  tipo_accion: 'llamada' | 'email' | 'sms' | 'whatsapp' | 'reunion' | 'negociacion' | 'legal' | 'otro';
  descripcion: string;
  resultado: 'exitoso' | 'sin_respuesta' | 'promesa_pago' | 'disputa' | 'rechazado' | 'pendiente';
  fecha_accion: string;
  fecha_proxima_accion?: string;
  notas?: string;
  monto_comprometido?: number;
  fecha_compromiso_pago?: string;
  realizado_por: string;
}

export interface ClasificacionRiesgo {
  cliente_id: string;
  nivel_riesgo: 'bajo' | 'medio' | 'alto' | 'critico';
  score_riesgo: number; // 0-100
  factores: {
    historial_pagos: number;
    dias_promedio_retraso: number;
    num_incumplimientos: number;
    monto_total_deuda: number;
    tasa_respuesta: number;
  };
  recomendacion: string;
  estrategia_sugerida: string;
}

export const registrarAccionSeguimiento = async (
  accion: Omit<AccionSeguimiento, 'id'>
): Promise<AccionSeguimiento> => {
  const { data, error } = await supabase
    .from('seguimiento_morosidad')
    .insert(accion)
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const obtenerSeguimientoPago = async (pagoId: string): Promise<AccionSeguimiento[]> => {
  const { data, error } = await supabase
    .from('seguimiento_morosidad')
    .select('*')
    .eq('pago_id', pagoId)
    .order('fecha_accion', { ascending: false });

  if (error) throw error;
  return data || [];
};

export const obtenerSeguimientoCliente = async (clienteId: string): Promise<AccionSeguimiento[]> => {
  const { data, error } = await supabase
    .from('seguimiento_morosidad')
    .select('*')
    .eq('cliente_id', clienteId)
    .order('fecha_accion', { ascending: false });

  if (error) throw error;
  return data || [];
};

export const calcularClasificacionRiesgo = async (
  clienteId: string
): Promise<ClasificacionRiesgo> => {
  // Obtener historial de pagos del cliente
  const { data: pagos } = await supabase
    .from('pagos_pendientes')
    .select('*')
    .eq('cliente_id', clienteId);

  const { data: seguimiento } = await supabase
    .from('seguimiento_morosidad')
    .select('*')
    .eq('cliente_id', clienteId);

  // Calcular factores de riesgo
  const totalPagos = pagos?.length || 0;
  const pagosRetrasados = pagos?.filter(p => p.estado === 'vencido').length || 0;
  const totalDeuda = pagos?.reduce((sum, p) => sum + (p.monto_pendiente || 0), 0) || 0;
  
  const diasRetrasosArray = pagos?.map(p => {
    const dias = Math.floor((new Date().getTime() - new Date(p.fecha_vencimiento).getTime()) / (1000 * 60 * 60 * 24));
    return dias > 0 ? dias : 0;
  }) || [];
  
  const diasPromedioRetraso = diasRetrasosArray.length > 0
    ? diasRetrasosArray.reduce((a, b) => a + b, 0) / diasRetrasosArray.length
    : 0;

  const accionesConRespuesta = seguimiento?.filter(s => s.resultado !== 'sin_respuesta').length || 0;
  const totalAcciones = seguimiento?.length || 1;
  const tasaRespuesta = (accionesConRespuesta / totalAcciones) * 100;

  // Calcular score de riesgo (0-100, donde 100 es máximo riesgo)
  const scoreHistorialPagos = totalPagos > 0 ? (pagosRetrasados / totalPagos) * 30 : 0;
  const scoreDiasRetraso = Math.min(diasPromedioRetraso / 60 * 30, 30);
  const scoreDeuda = Math.min(totalDeuda / 10000 * 20, 20);
  const scoreTasaRespuesta = (100 - tasaRespuesta) * 0.2;
  
  const scoreTotal = scoreHistorialPagos + scoreDiasRetraso + scoreDeuda + scoreTasaRespuesta;

  let nivelRiesgo: ClasificacionRiesgo['nivel_riesgo'];
  let estrategiaSugerida: string;

  if (scoreTotal < 25) {
    nivelRiesgo = 'bajo';
    estrategiaSugerida = 'Recordatorios automáticos estándar';
  } else if (scoreTotal < 50) {
    nivelRiesgo = 'medio';
    estrategiaSugerida = 'Seguimiento telefónico y recordatorios frecuentes';
  } else if (scoreTotal < 75) {
    nivelRiesgo = 'alto';
    estrategiaSugerida = 'Gestión personalizada, plan de pagos negociado';
  } else {
    nivelRiesgo = 'critico';
    estrategiaSugerida = 'Escalación a gestión legal, acciones inmediatas';
  }

  return {
    cliente_id: clienteId,
    nivel_riesgo: nivelRiesgo,
    score_riesgo: Math.round(scoreTotal),
    factores: {
      historial_pagos: totalPagos,
      dias_promedio_retraso: Math.round(diasPromedioRetraso),
      num_incumplimientos: pagosRetrasados,
      monto_total_deuda: totalDeuda,
      tasa_respuesta: Math.round(tasaRespuesta),
    },
    recomendacion: `Cliente con riesgo ${nivelRiesgo}. ${estrategiaSugerida}`,
    estrategia_sugerida: estrategiaSugerida,
  };
};

export const obtenerAccionesPendientes = async (): Promise<AccionSeguimiento[]> => {
  const hoy = new Date().toISOString().split('T')[0];
  
  const { data, error } = await supabase
    .from('seguimiento_morosidad')
    .select('*')
    .lte('fecha_proxima_accion', hoy)
    .eq('resultado', 'pendiente')
    .order('fecha_proxima_accion', { ascending: true });

  if (error) throw error;
  return data || [];
};

export const programarSeguimiento = async (
  pagoId: string,
  clienteId: string,
  fechaProxima: string,
  notas: string
): Promise<AccionSeguimiento> => {
  const accion: Omit<AccionSeguimiento, 'id'> = {
    pago_id: pagoId,
    cliente_id: clienteId,
    tipo_accion: 'otro',
    descripcion: 'Seguimiento programado',
    resultado: 'pendiente',
    fecha_accion: new Date().toISOString(),
    fecha_proxima_accion: fechaProxima,
    notas,
    realizado_por: 'sistema',
  };

  return registrarAccionSeguimiento(accion);
};

