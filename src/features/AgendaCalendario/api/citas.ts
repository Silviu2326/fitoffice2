import { supabase } from '../../../lib/supabase';

export interface Cita {
  id: string;
  cliente_id: string;
  entrenador_id: string;
  fecha: string;
  hora: string;
  duracion: number; // en minutos
  tipo: 'sesion' | 'videollamada' | 'evaluacion';
  estado: 'confirmada' | 'pendiente' | 'cancelada' | 'completada';
  notas?: string;
  precio?: number;
  metodo_pago?: string;
  created_at: string;
  updated_at: string;
}

export interface CitaConCliente extends Cita {
  cliente: {
    id: string;
    nombre: string;
    email: string;
    telefono?: string;
  };
}

/**
 * Obtiene todas las citas de un entrenador
 */
export async function obtenerCitas(entrenadorId: string): Promise<CitaConCliente[]> {
  try {
    const { data, error } = await supabase
      .from('citas')
      .select(`
        *,
        cliente:clientes(id, nombre, email, telefono)
      `)
      .eq('entrenador_id', entrenadorId)
      .order('fecha', { ascending: true })
      .order('hora', { ascending: true });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error al obtener citas:', error);
    throw error;
  }
}

/**
 * Obtiene las citas de un día específico
 */
export async function obtenerCitasPorDia(
  fecha: Date,
  entrenadorId: string
): Promise<CitaConCliente[]> {
  try {
    const fechaStr = fecha.toISOString().split('T')[0];
    
    const { data, error } = await supabase
      .from('citas')
      .select(`
        *,
        cliente:clientes(id, nombre, email, telefono)
      `)
      .eq('entrenador_id', entrenadorId)
      .eq('fecha', fechaStr)
      .order('hora', { ascending: true });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error al obtener citas del día:', error);
    throw error;
  }
}

/**
 * Crea una nueva cita
 */
export async function crearCita(
  cita: Omit<Cita, 'id' | 'created_at' | 'updated_at'>
): Promise<Cita> {
  try {
    const { data, error } = await supabase
      .from('citas')
      .insert([cita])
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error al crear cita:', error);
    throw error;
  }
}

/**
 * Actualiza una cita existente
 */
export async function actualizarCita(
  id: string,
  actualizaciones: Partial<Cita>
): Promise<Cita> {
  try {
    const { data, error } = await supabase
      .from('citas')
      .update({ ...actualizaciones, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error al actualizar cita:', error);
    throw error;
  }
}

/**
 * Cancela una cita
 */
export async function cancelarCita(id: string, motivo?: string): Promise<Cita> {
  try {
    const { data, error } = await supabase
      .from('citas')
      .update({
        estado: 'cancelada',
        notas: motivo ? `Cancelada: ${motivo}` : 'Cancelada',
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error al cancelar cita:', error);
    throw error;
  }
}

/**
 * Confirma una cita pendiente
 */
export async function confirmarCita(id: string): Promise<Cita> {
  try {
    const { data, error } = await supabase
      .from('citas')
      .update({
        estado: 'confirmada',
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error al confirmar cita:', error);
    throw error;
  }
}

/**
 * Marca una cita como completada
 */
export async function completarCita(id: string, notas?: string): Promise<Cita> {
  try {
    const { data, error } = await supabase
      .from('citas')
      .update({
        estado: 'completada',
        notas: notas,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error al completar cita:', error);
    throw error;
  }
}

/**
 * Elimina una cita
 */
export async function eliminarCita(id: string): Promise<void> {
  try {
    const { error } = await supabase
      .from('citas')
      .delete()
      .eq('id', id);

    if (error) throw error;
  } catch (error) {
    console.error('Error al eliminar cita:', error);
    throw error;
  }
}

