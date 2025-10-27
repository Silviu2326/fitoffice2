import { supabase } from '../../../lib/supabase';

export interface Ausencia {
  id: string;
  socio_id: string;
  clase_id: string;
  fecha: string;
  hora: string;
  tipo: 'cancelacion' | 'no_show' | 'tardanza';
  aviso_previo: boolean;
  tiempo_aviso?: number; // en horas
  penalizacion_aplicada: boolean;
  monto_penalizacion?: number;
  justificacion?: string;
  notas?: string;
  created_at: string;
  updated_at: string;
}

export interface AsistenciaClase {
  clase_id: string;
  fecha: string;
  total_plazas: number;
  plazas_ocupadas: number;
  asistencias: number;
  ausencias: number;
  tasa_ocupacion: number;
  tasa_asistencia: number;
}

// Obtener todas las ausencias
export const getAusencias = async () => {
  const { data, error } = await supabase
    .from('ausencias')
    .select('*')
    .order('fecha', { ascending: false });

  if (error) throw error;
  return data;
};

// Obtener ausencias por socio
export const getAusenciasPorSocio = async (socioId: string) => {
  const { data, error } = await supabase
    .from('ausencias')
    .select('*')
    .eq('socio_id', socioId)
    .order('fecha', { ascending: false });

  if (error) throw error;
  return data;
};

// Obtener ausencias por clase
export const getAusenciasPorClase = async (claseId: string, fecha: string) => {
  const { data, error } = await supabase
    .from('ausencias')
    .select('*')
    .eq('clase_id', claseId)
    .eq('fecha', fecha);

  if (error) throw error;
  return data;
};

// Registrar ausencia
export const registrarAusencia = async (ausencia: Omit<Ausencia, 'id' | 'created_at' | 'updated_at'>) => {
  const { data, error } = await supabase
    .from('ausencias')
    .insert([ausencia])
    .select()
    .single();

  if (error) throw error;
  return data;
};

// Actualizar ausencia
export const updateAusencia = async (id: string, updates: Partial<Ausencia>) => {
  const { data, error } = await supabase
    .from('ausencias')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
};

// Eliminar ausencia
export const deleteAusencia = async (id: string) => {
  const { error } = await supabase
    .from('ausencias')
    .delete()
    .eq('id', id);

  if (error) throw error;
};

// Obtener estadísticas de ausencias por socio
export const getEstadisticasAusenciasSocio = async (socioId: string, fechaInicio: string, fechaFin: string) => {
  const { data, error } = await supabase
    .from('ausencias')
    .select('*')
    .eq('socio_id', socioId)
    .gte('fecha', fechaInicio)
    .lte('fecha', fechaFin);

  if (error) throw error;

  const total = data.length;
  const conAviso = data.filter(a => a.aviso_previo).length;
  const sinAviso = total - conAviso;
  const noShow = data.filter(a => a.tipo === 'no_show').length;
  const cancelaciones = data.filter(a => a.tipo === 'cancelacion').length;

  return {
    total,
    conAviso,
    sinAviso,
    noShow,
    cancelaciones,
    tasaAviso: total > 0 ? (conAviso / total) * 100 : 0
  };
};

// Obtener estadísticas de asistencia por clase
export const getEstadisticasAsistenciaClase = async (claseId: string, fechaInicio: string, fechaFin: string) => {
  const { data: ausencias, error: errorAusencias } = await supabase
    .from('ausencias')
    .select('*')
    .eq('clase_id', claseId)
    .gte('fecha', fechaInicio)
    .lte('fecha', fechaFin);

  if (errorAusencias) throw errorAusencias;

  // Aquí se debería obtener también las reservas confirmadas
  // Por ahora, se retorna un objeto con la estructura esperada
  
  return {
    totalClases: 30, // Ejemplo
    totalAusencias: ausencias.length,
    promedioAsistencia: 85, // Ejemplo
    tendencia: 'mejorando' // Ejemplo
  };
};

// Registrar asistencia masiva de una clase
export const registrarAsistenciaMasiva = async (claseId: string, fecha: string, sociosPresentes: string[]) => {
  // Obtener todas las reservas de la clase
  const { data: reservas, error: errorReservas } = await supabase
    .from('reservas')
    .select('*')
    .eq('clase_id', claseId)
    .eq('fecha', fecha);

  if (errorReservas) throw errorReservas;

  // Identificar ausencias (reservas sin asistencia)
  const ausencias = reservas
    ?.filter(reserva => !sociosPresentes.includes(reserva.socio_id))
    .map(reserva => ({
      socio_id: reserva.socio_id,
      clase_id: claseId,
      fecha: fecha,
      hora: reserva.hora,
      tipo: 'no_show' as const,
      aviso_previo: false,
      penalizacion_aplicada: false
    }));

  // Insertar ausencias
  if (ausencias && ausencias.length > 0) {
    const { error } = await supabase
      .from('ausencias')
      .insert(ausencias);

    if (error) throw error;
  }

  return {
    totalReservas: reservas?.length || 0,
    asistencias: sociosPresentes.length,
    ausencias: ausencias?.length || 0
  };
};

// Calcular penalización por ausencia
export const calcularPenalizacion = (tipo: string, avisoHoras?: number): number => {
  if (tipo === 'no_show') {
    return 10.00; // Penalización por no presentarse
  }
  
  if (tipo === 'cancelacion' && avisoHoras !== undefined) {
    if (avisoHoras < 2) {
      return 5.00; // Cancelación con menos de 2 horas de aviso
    }
    if (avisoHoras < 12) {
      return 2.00; // Cancelación con menos de 12 horas de aviso
    }
  }
  
  return 0; // Sin penalización
};

// Aplicar penalización automática
export const aplicarPenalizacion = async (ausenciaId: string) => {
  const { data: ausencia, error } = await supabase
    .from('ausencias')
    .select('*')
    .eq('id', ausenciaId)
    .single();

  if (error) throw error;

  const monto = calcularPenalizacion(ausencia.tipo, ausencia.tiempo_aviso);

  if (monto > 0) {
    await updateAusencia(ausenciaId, {
      penalizacion_aplicada: true,
      monto_penalizacion: monto
    });

    // Aquí se podría integrar con el sistema de pagos
    // para registrar el cargo pendiente
  }

  return monto;
};

