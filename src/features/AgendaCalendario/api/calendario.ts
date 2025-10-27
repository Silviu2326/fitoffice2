import { supabase } from '../../../lib/supabase';

export interface EventoCalendario {
  id: string;
  titulo: string;
  descripcion?: string;
  fecha_inicio: string;
  fecha_fin: string;
  tipo: 'sesion' | 'clase' | 'evaluacion' | 'bloqueo';
  estado: 'confirmado' | 'pendiente' | 'cancelado';
  cliente_id?: string;
  entrenador_id: string;
  sala_id?: string;
  created_at: string;
  updated_at: string;
}

/**
 * Obtiene los eventos del calendario para un rango de fechas
 */
export async function obtenerEventosCalendario(
  fechaInicio: Date,
  fechaFin: Date,
  entrenadorId: string
): Promise<EventoCalendario[]> {
  try {
    const { data, error } = await supabase
      .from('eventos_calendario')
      .select('*')
      .eq('entrenador_id', entrenadorId)
      .gte('fecha_inicio', fechaInicio.toISOString())
      .lte('fecha_fin', fechaFin.toISOString())
      .order('fecha_inicio', { ascending: true });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error al obtener eventos del calendario:', error);
    throw error;
  }
}

/**
 * Obtiene los eventos de un día específico
 */
export async function obtenerEventosPorDia(
  fecha: Date,
  entrenadorId: string
): Promise<EventoCalendario[]> {
  try {
    const inicioDia = new Date(fecha);
    inicioDia.setHours(0, 0, 0, 0);
    
    const finDia = new Date(fecha);
    finDia.setHours(23, 59, 59, 999);

    const { data, error } = await supabase
      .from('eventos_calendario')
      .select('*')
      .eq('entrenador_id', entrenadorId)
      .gte('fecha_inicio', inicioDia.toISOString())
      .lte('fecha_inicio', finDia.toISOString())
      .order('fecha_inicio', { ascending: true });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error al obtener eventos del día:', error);
    throw error;
  }
}

/**
 * Crea un nuevo evento en el calendario
 */
export async function crearEventoCalendario(
  evento: Omit<EventoCalendario, 'id' | 'created_at' | 'updated_at'>
): Promise<EventoCalendario> {
  try {
    const { data, error } = await supabase
      .from('eventos_calendario')
      .insert([evento])
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error al crear evento:', error);
    throw error;
  }
}

/**
 * Actualiza un evento existente
 */
export async function actualizarEventoCalendario(
  id: string,
  actualizaciones: Partial<EventoCalendario>
): Promise<EventoCalendario> {
  try {
    const { data, error } = await supabase
      .from('eventos_calendario')
      .update({ ...actualizaciones, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error al actualizar evento:', error);
    throw error;
  }
}

/**
 * Elimina un evento del calendario
 */
export async function eliminarEventoCalendario(id: string): Promise<void> {
  try {
    const { error } = await supabase
      .from('eventos_calendario')
      .delete()
      .eq('id', id);

    if (error) throw error;
  } catch (error) {
    console.error('Error al eliminar evento:', error);
    throw error;
  }
}

