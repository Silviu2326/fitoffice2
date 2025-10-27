import { supabase } from '../../../lib/supabase';

export interface PagoVencido {
  id: string;
  cliente_nombre: string;
  cliente_id: string;
  monto_pendiente: number;
  fecha_vencimiento: string;
  dias_retraso: number;
  nivel_morosidad: 'verde' | 'amarillo' | 'naranja' | 'rojo' | 'negro';
  descripcion: string;
  ultimo_recordatorio?: string;
  estado: 'pendiente' | 'en_gestion' | 'legal' | 'cobrado';
}

export interface EstadisticasMorosidad {
  total_pendiente: number;
  total_casos: number;
  casos_por_nivel: {
    verde: number;
    amarillo: number;
    naranja: number;
    rojo: number;
    negro: number;
  };
  tasa_recuperacion: number;
  monto_por_nivel: {
    verde: number;
    amarillo: number;
    naranja: number;
    rojo: number;
    negro: number;
  };
}

export const calcularDiasRetraso = (fechaVencimiento: string): number => {
  const hoy = new Date();
  const vencimiento = new Date(fechaVencimiento);
  const diferencia = hoy.getTime() - vencimiento.getTime();
  return Math.floor(diferencia / (1000 * 60 * 60 * 24));
};

export const determinarNivelMorosidad = (diasRetraso: number): PagoVencido['nivel_morosidad'] => {
  if (diasRetraso <= 7) return 'verde';
  if (diasRetraso <= 15) return 'amarillo';
  if (diasRetraso <= 30) return 'naranja';
  if (diasRetraso <= 60) return 'rojo';
  return 'negro';
};

export const obtenerPagosVencidos = async (): Promise<PagoVencido[]> => {
  const { data, error } = await supabase
    .from('pagos_pendientes')
    .select('*')
    .eq('estado', 'vencido')
    .order('fecha_vencimiento', { ascending: true });

  if (error) throw error;

  return data?.map(pago => ({
    ...pago,
    dias_retraso: calcularDiasRetraso(pago.fecha_vencimiento),
    nivel_morosidad: determinarNivelMorosidad(calcularDiasRetraso(pago.fecha_vencimiento)),
  })) || [];
};

export const obtenerEstadisticasMorosidad = async (): Promise<EstadisticasMorosidad> => {
  const pagosVencidos = await obtenerPagosVencidos();
  
  const estadisticas: EstadisticasMorosidad = {
    total_pendiente: 0,
    total_casos: pagosVencidos.length,
    casos_por_nivel: { verde: 0, amarillo: 0, naranja: 0, rojo: 0, negro: 0 },
    tasa_recuperacion: 0,
    monto_por_nivel: { verde: 0, amarillo: 0, naranja: 0, rojo: 0, negro: 0 },
  };

  pagosVencidos.forEach(pago => {
    estadisticas.total_pendiente += pago.monto_pendiente;
    estadisticas.casos_por_nivel[pago.nivel_morosidad]++;
    estadisticas.monto_por_nivel[pago.nivel_morosidad] += pago.monto_pendiente;
  });

  return estadisticas;
};

export const actualizarEstadoPago = async (
  pagoId: string, 
  nuevoEstado: PagoVencido['estado']
): Promise<void> => {
  const { error } = await supabase
    .from('pagos_pendientes')
    .update({ estado: nuevoEstado, updated_at: new Date().toISOString() })
    .eq('id', pagoId);

  if (error) throw error;
};

export const marcarPagoCobrado = async (pagoId: string): Promise<void> => {
  const { error } = await supabase
    .from('pagos_pendientes')
    .update({ 
      estado: 'cobrado',
      fecha_cobro: new Date().toISOString(),
      updated_at: new Date().toISOString()
    })
    .eq('id', pagoId);

  if (error) throw error;
};

