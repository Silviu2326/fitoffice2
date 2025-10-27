import { supabase } from '../../../lib/supabase';

export interface HorarioDisponible {
  id: string;
  entrenador_id: string;
  dia_semana: 0 | 1 | 2 | 3 | 4 | 5 | 6; // 0 = Domingo, 6 = Sábado
  hora_inicio: string; // formato HH:MM
  hora_fin: string; // formato HH:MM
  activo: boolean;
  created_at: string;
  updated_at: string;
}

export interface BloqueoAgenda {
  id: string;
  entrenador_id: string;
  titulo: string;
  descripcion?: string;
  fecha_inicio: string;
  fecha_fin: string;
  tipo: 'vacaciones' | 'dia_libre' | 'mantenimiento' | 'evento';
  created_at: string;
  updated_at: string;
}

/**
 * Obtiene los horarios de disponibilidad de un entrenador
 */
export async function obtenerHorariosDisponibles(
  entrenadorId: string
): Promise<HorarioDisponible[]> {
  try {
    const { data, error } = await supabase
      .from('horarios_disponibles')
      .select('*')
      .eq('entrenador_id', entrenadorId)
      .order('dia_semana', { ascending: true })
      .order('hora_inicio', { ascending: true });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error al obtener horarios disponibles:', error);
    throw error;
  }
}

/**
 * Crea un nuevo horario de disponibilidad
 */
export async function crearHorarioDisponible(
  horario: Omit<HorarioDisponible, 'id' | 'created_at' | 'updated_at'>
): Promise<HorarioDisponible> {
  try {
    const { data, error } = await supabase
      .from('horarios_disponibles')
      .insert([horario])
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error al crear horario disponible:', error);
    throw error;
  }
}

/**
 * Actualiza un horario de disponibilidad
 */
export async function actualizarHorarioDisponible(
  id: string,
  actualizaciones: Partial<HorarioDisponible>
): Promise<HorarioDisponible> {
  try {
    const { data, error } = await supabase
      .from('horarios_disponibles')
      .update({ ...actualizaciones, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error al actualizar horario disponible:', error);
    throw error;
  }
}

/**
 * Elimina un horario de disponibilidad
 */
export async function eliminarHorarioDisponible(id: string): Promise<void> {
  try {
    const { error } = await supabase
      .from('horarios_disponibles')
      .delete()
      .eq('id', id);

    if (error) throw error;
  } catch (error) {
    console.error('Error al eliminar horario disponible:', error);
    throw error;
  }
}

/**
 * Obtiene los bloqueos de agenda de un entrenador
 */
export async function obtenerBloqueosAgenda(
  entrenadorId: string
): Promise<BloqueoAgenda[]> {
  try {
    const { data, error } = await supabase
      .from('bloqueos_agenda')
      .select('*')
      .eq('entrenador_id', entrenadorId)
      .order('fecha_inicio', { ascending: true });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error al obtener bloqueos de agenda:', error);
    throw error;
  }
}

/**
 * Crea un nuevo bloqueo de agenda
 */
export async function crearBloqueoAgenda(
  bloqueo: Omit<BloqueoAgenda, 'id' | 'created_at' | 'updated_at'>
): Promise<BloqueoAgenda> {
  try {
    const { data, error } = await supabase
      .from('bloqueos_agenda')
      .insert([bloqueo])
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error al crear bloqueo de agenda:', error);
    throw error;
  }
}

/**
 * Actualiza un bloqueo de agenda
 */
export async function actualizarBloqueoAgenda(
  id: string,
  actualizaciones: Partial<BloqueoAgenda>
): Promise<BloqueoAgenda> {
  try {
    const { data, error } = await supabase
      .from('bloqueos_agenda')
      .update({ ...actualizaciones, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error al actualizar bloqueo de agenda:', error);
    throw error;
  }
}

/**
 * Elimina un bloqueo de agenda
 */
export async function eliminarBloqueoAgenda(id: string): Promise<void> {
  try {
    const { error } = await supabase
      .from('bloqueos_agenda')
      .delete()
      .eq('id', id);

    if (error) throw error;
  } catch (error) {
    console.error('Error al eliminar bloqueo de agenda:', error);
    throw error;
  }
}

/**
 * Verifica si un horario está disponible para una fecha y hora específica
 */
export async function verificarDisponibilidad(
  entrenadorId: string,
  fecha: Date,
  hora: string,
  duracion: number
): Promise<boolean> {
  try {
    // Obtener día de la semana
    const diaSemana = fecha.getDay();
    
    // Verificar horarios de disponibilidad
    const { data: horarios, error: errorHorarios } = await supabase
      .from('horarios_disponibles')
      .select('*')
      .eq('entrenador_id', entrenadorId)
      .eq('dia_semana', diaSemana)
      .eq('activo', true);

    if (errorHorarios) throw errorHorarios;
    
    if (!horarios || horarios.length === 0) return false;

    // Verificar si está dentro del horario disponible
    const horaDisponible = horarios.some(h => {
      return hora >= h.hora_inicio && hora < h.hora_fin;
    });

    if (!horaDisponible) return false;

    // Verificar bloqueos de agenda
    const fechaStr = fecha.toISOString().split('T')[0];
    const { data: bloqueos, error: errorBloqueos } = await supabase
      .from('bloqueos_agenda')
      .select('*')
      .eq('entrenador_id', entrenadorId)
      .lte('fecha_inicio', fechaStr)
      .gte('fecha_fin', fechaStr);

    if (errorBloqueos) throw errorBloqueos;
    
    if (bloqueos && bloqueos.length > 0) return false;

    // Verificar citas existentes
    const { data: citas, error: errorCitas } = await supabase
      .from('citas')
      .select('*')
      .eq('entrenador_id', entrenadorId)
      .eq('fecha', fechaStr)
      .in('estado', ['confirmada', 'pendiente']);

    if (errorCitas) throw errorCitas;

    if (citas && citas.length > 0) {
      // Verificar conflictos de horario
      const tieneConflicto = citas.some(c => {
        const horaExistente = c.hora;
        const duracionExistente = c.duracion;
        
        // Calcular hora fin de la cita existente
        const [horasE, minutosE] = horaExistente.split(':').map(Number);
        const minutosFinE = horasE * 60 + minutosE + duracionExistente;
        
        // Calcular hora fin de la nueva cita
        const [horasN, minutosN] = hora.split(':').map(Number);
        const minutosInicioN = horasN * 60 + minutosN;
        const minutosFinN = minutosInicioN + duracion;
        
        // Verificar solapamiento
        return (
          (minutosInicioN >= horasE * 60 + minutosE && minutosInicioN < minutosFinE) ||
          (minutosFinN > horasE * 60 + minutosE && minutosFinN <= minutosFinE) ||
          (minutosInicioN <= horasE * 60 + minutosE && minutosFinN >= minutosFinE)
        );
      });
      
      return !tieneConflicto;
    }

    return true;
  } catch (error) {
    console.error('Error al verificar disponibilidad:', error);
    throw error;
  }
}

