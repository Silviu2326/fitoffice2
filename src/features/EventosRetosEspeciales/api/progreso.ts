import { supabase } from '../../../lib/supabase';

export interface RegistroProgreso {
  id: string;
  participante_id: string;
  reto_id: string;
  fecha: string;
  dia_numero: number;
  completado: boolean;
  actividad_realizada?: string;
  notas?: string;
  evidencia_url?: string; // URL de foto/video como evidencia
  puntos_ganados: number;
  created_at: string;
}

export interface RegistrarProgresoData {
  participante_id: string;
  reto_id: string;
  dia_numero: number;
  completado: boolean;
  actividad_realizada?: string;
  notas?: string;
  evidencia_url?: string;
  puntos_ganados: number;
}

// Obtener progreso de un participante
export async function getProgresoByParticipante(participanteId: string) {
  try {
    const { data, error } = await supabase
      .from('eventos_progreso')
      .select('*')
      .eq('participante_id', participanteId)
      .order('dia_numero', { ascending: true });

    if (error) throw error;
    return { data: data as RegistroProgreso[], error: null };
  } catch (error) {
    console.error('Error al obtener progreso:', error);
    return { data: null, error };
  }
}

// Obtener progreso de un reto
export async function getProgresoByReto(retoId: string) {
  try {
    const { data, error } = await supabase
      .from('eventos_progreso')
      .select('*')
      .eq('reto_id', retoId)
      .order('fecha', { ascending: false });

    if (error) throw error;
    return { data: data as RegistroProgreso[], error: null };
  } catch (error) {
    console.error('Error al obtener progreso del reto:', error);
    return { data: null, error };
  }
}

// Registrar progreso diario
export async function registrarProgreso(progresoData: RegistrarProgresoData) {
  try {
    // Verificar si ya existe registro para ese día
    const { data: existente } = await supabase
      .from('eventos_progreso')
      .select('id')
      .eq('participante_id', progresoData.participante_id)
      .eq('dia_numero', progresoData.dia_numero)
      .single();

    if (existente) {
      return { data: null, error: new Error('Ya existe un registro para este día') };
    }

    const { data, error } = await supabase
      .from('eventos_progreso')
      .insert([{
        ...progresoData,
        fecha: new Date().toISOString(),
      }])
      .select()
      .single();

    if (error) throw error;

    // Actualizar progreso del participante
    if (data) {
      await actualizarProgresoParticipante(progresoData.participante_id);
    }

    return { data: data as RegistroProgreso, error: null };
  } catch (error) {
    console.error('Error al registrar progreso:', error);
    return { data: null, error };
  }
}

// Actualizar registro de progreso
export async function actualizarRegistroProgreso(
  id: string,
  actualizaciones: Partial<RegistrarProgresoData>
) {
  try {
    const { data, error } = await supabase
      .from('eventos_progreso')
      .update(actualizaciones)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return { data: data as RegistroProgreso, error: null };
  } catch (error) {
    console.error('Error al actualizar progreso:', error);
    return { data: null, error };
  }
}

// Eliminar registro de progreso
export async function eliminarRegistroProgreso(id: string) {
  try {
    const { error } = await supabase
      .from('eventos_progreso')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return { error: null };
  } catch (error) {
    console.error('Error al eliminar progreso:', error);
    return { error };
  }
}

// Actualizar progreso total del participante
async function actualizarProgresoParticipante(participanteId: string) {
  try {
    // Obtener todos los registros del participante
    const { data: registros } = await supabase
      .from('eventos_progreso')
      .select('completado, puntos_ganados')
      .eq('participante_id', participanteId);

    if (!registros) return;

    // Calcular totales
    const diasCompletados = registros.filter(r => r.completado).length;
    const puntosTotal = registros.reduce((acc, r) => acc + r.puntos_ganados, 0);

    // Obtener datos del reto para calcular progreso
    const { data: participante } = await supabase
      .from('eventos_participantes')
      .select('reto_id')
      .eq('id', participanteId)
      .single();

    if (!participante) return;

    const { data: reto } = await supabase
      .from('eventos_retos')
      .select('duracion_dias')
      .eq('id', participante.reto_id)
      .single();

    if (!reto) return;

    const progreso = Math.round((diasCompletados / reto.duracion_dias) * 100);

    // Actualizar participante
    await supabase
      .from('eventos_participantes')
      .update({
        dias_completados: diasCompletados,
        puntos: puntosTotal,
        progreso: progreso,
        estado: progreso === 100 ? 'completado' : 'activo',
        updated_at: new Date().toISOString(),
      })
      .eq('id', participanteId);

  } catch (error) {
    console.error('Error al actualizar progreso del participante:', error);
  }
}

// Obtener estadísticas de progreso de un reto
export async function getEstadisticasProgreso(retoId: string) {
  try {
    const { data: registros, error } = await supabase
      .from('eventos_progreso')
      .select('completado, dia_numero, fecha')
      .eq('reto_id', retoId);

    if (error) throw error;

    // Calcular estadísticas
    const totalRegistros = registros?.length || 0;
    const registrosCompletados = registros?.filter(r => r.completado).length || 0;
    const tasaCompletacion = totalRegistros > 0 ? (registrosCompletados / totalRegistros) * 100 : 0;

    // Progreso por día
    const progresoPorDia = registros?.reduce((acc: Record<number, number>, r) => {
      acc[r.dia_numero] = (acc[r.dia_numero] || 0) + (r.completado ? 1 : 0);
      return acc;
    }, {}) || {};

    return {
      data: {
        totalRegistros,
        registrosCompletados,
        tasaCompletacion,
        progresoPorDia,
      },
      error: null,
    };
  } catch (error) {
    console.error('Error al obtener estadísticas de progreso:', error);
    return { data: null, error };
  }
}

// Obtener resumen de progreso de un participante
export async function getResumenProgresoParticipante(participanteId: string) {
  try {
    const { data: registros, error } = await supabase
      .from('eventos_progreso')
      .select('completado, puntos_ganados, dia_numero')
      .eq('participante_id', participanteId)
      .order('dia_numero', { ascending: true });

    if (error) throw error;

    const diasCompletados = registros?.filter(r => r.completado).length || 0;
    const diasPendientes = registros?.filter(r => !r.completado).length || 0;
    const puntosTotal = registros?.reduce((acc, r) => acc + r.puntos_ganados, 0) || 0;
    const racha = calcularRacha(registros || []);

    return {
      data: {
        diasCompletados,
        diasPendientes,
        puntosTotal,
        racha,
        ultimoDiaCompletado: registros?.filter(r => r.completado).pop()?.dia_numero || 0,
      },
      error: null,
    };
  } catch (error) {
    console.error('Error al obtener resumen de progreso:', error);
    return { data: null, error };
  }
}

// Calcular racha de días consecutivos
function calcularRacha(registros: RegistroProgreso[]): number {
  if (!registros.length) return 0;

  const completados = registros
    .filter(r => r.completado)
    .sort((a, b) => b.dia_numero - a.dia_numero);

  let racha = 0;
  let diaEsperado = completados[0]?.dia_numero;

  for (const registro of completados) {
    if (registro.dia_numero === diaEsperado) {
      racha++;
      diaEsperado--;
    } else {
      break;
    }
  }

  return racha;
}

