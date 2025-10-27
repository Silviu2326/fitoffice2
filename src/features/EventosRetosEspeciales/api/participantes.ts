import { supabase } from '../../../lib/supabase';

export interface Participante {
  id: string;
  reto_id: string;
  usuario_id: string;
  nombre_usuario: string;
  email_usuario: string;
  fecha_inscripcion: string;
  estado: 'inscrito' | 'activo' | 'completado' | 'abandonado';
  progreso: number; // 0-100
  dias_completados: number;
  puntos: number;
  created_at: string;
  updated_at: string;
}

export interface InscribirParticipanteData {
  reto_id: string;
  usuario_id: string;
  nombre_usuario: string;
  email_usuario: string;
}

// Obtener participantes de un reto
export async function getParticipantesByReto(retoId: string) {
  try {
    const { data, error } = await supabase
      .from('eventos_participantes')
      .select('*')
      .eq('reto_id', retoId)
      .order('puntos', { ascending: false });

    if (error) throw error;
    return { data: data as Participante[], error: null };
  } catch (error) {
    console.error('Error al obtener participantes:', error);
    return { data: null, error };
  }
}

// Inscribir participante en un reto
export async function inscribirParticipante(inscripcionData: InscribirParticipanteData) {
  try {
    // Verificar si el usuario ya está inscrito
    const { data: existente } = await supabase
      .from('eventos_participantes')
      .select('id')
      .eq('reto_id', inscripcionData.reto_id)
      .eq('usuario_id', inscripcionData.usuario_id)
      .single();

    if (existente) {
      return { data: null, error: new Error('El usuario ya está inscrito en este reto') };
    }

    // Verificar cupos disponibles
    const { data: reto } = await supabase
      .from('eventos_retos')
      .select('max_participantes')
      .eq('id', inscripcionData.reto_id)
      .single();

    if (reto?.max_participantes) {
      const { count } = await supabase
        .from('eventos_participantes')
        .select('id', { count: 'exact', head: true })
        .eq('reto_id', inscripcionData.reto_id);

      if (count && count >= reto.max_participantes) {
        return { data: null, error: new Error('No hay cupos disponibles') };
      }
    }

    const { data, error } = await supabase
      .from('eventos_participantes')
      .insert([{
        ...inscripcionData,
        estado: 'inscrito',
        progreso: 0,
        dias_completados: 0,
        puntos: 0,
      }])
      .select()
      .single();

    if (error) throw error;
    return { data: data as Participante, error: null };
  } catch (error) {
    console.error('Error al inscribir participante:', error);
    return { data: null, error };
  }
}

// Obtener participante por ID
export async function getParticipanteById(id: string) {
  try {
    const { data, error } = await supabase
      .from('eventos_participantes')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return { data: data as Participante, error: null };
  } catch (error) {
    console.error('Error al obtener participante:', error);
    return { data: null, error };
  }
}

// Actualizar estado de participante
export async function actualizarEstadoParticipante(
  id: string,
  estado: Participante['estado']
) {
  try {
    const { data, error } = await supabase
      .from('eventos_participantes')
      .update({ estado, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return { data: data as Participante, error: null };
  } catch (error) {
    console.error('Error al actualizar estado:', error);
    return { data: null, error };
  }
}

// Actualizar progreso de participante
export async function actualizarProgresoParticipante(
  id: string,
  progreso: number,
  diasCompletados: number,
  puntos: number
) {
  try {
    const { data, error } = await supabase
      .from('eventos_participantes')
      .update({
        progreso,
        dias_completados: diasCompletados,
        puntos,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return { data: data as Participante, error: null };
  } catch (error) {
    console.error('Error al actualizar progreso:', error);
    return { data: null, error };
  }
}

// Eliminar participante
export async function eliminarParticipante(id: string) {
  try {
    const { error } = await supabase
      .from('eventos_participantes')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return { error: null };
  } catch (error) {
    console.error('Error al eliminar participante:', error);
    return { error };
  }
}

// Obtener ranking de un reto
export async function getRankingReto(retoId: string, limite: number = 10) {
  try {
    const { data, error } = await supabase
      .from('eventos_participantes')
      .select('*')
      .eq('reto_id', retoId)
      .order('puntos', { ascending: false })
      .limit(limite);

    if (error) throw error;
    return { data: data as Participante[], error: null };
  } catch (error) {
    console.error('Error al obtener ranking:', error);
    return { data: null, error };
  }
}

// Obtener estadísticas de participación
export async function getEstadisticasParticipacion(retoId: string) {
  try {
    const { data: participantes, error } = await supabase
      .from('eventos_participantes')
      .select('estado, progreso')
      .eq('reto_id', retoId);

    if (error) throw error;

    const stats = {
      total: participantes?.length || 0,
      inscritos: participantes?.filter(p => p.estado === 'inscrito').length || 0,
      activos: participantes?.filter(p => p.estado === 'activo').length || 0,
      completados: participantes?.filter(p => p.estado === 'completado').length || 0,
      abandonados: participantes?.filter(p => p.estado === 'abandonado').length || 0,
      progresoPromedio: participantes?.reduce((acc, p) => acc + p.progreso, 0) / (participantes?.length || 1) || 0,
    };

    return { data: stats, error: null };
  } catch (error) {
    console.error('Error al obtener estadísticas:', error);
    return { data: null, error };
  }
}

