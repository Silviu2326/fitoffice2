import { supabase } from '../../../lib/supabase';

export interface Ejercicio {
  id: string;
  nombre: string;
  descripcion: string;
  grupoMuscular: string;
  equipamiento: string;
  dificultad: 'Principiante' | 'Intermedio' | 'Avanzado';
  videoUrl: string;
  thumbnail: string;
  instrucciones: string[];
  advertencias: string[];
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Obtener todos los ejercicios
 */
export async function getEjercicios() {
  try {
    const { data, error } = await supabase
      .from('ejercicios')
      .select('*')
      .order('nombre', { ascending: true });

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error al obtener ejercicios:', error);
    return { data: null, error };
  }
}

/**
 * Obtener un ejercicio por ID
 */
export async function getEjercicioById(id: string) {
  try {
    const { data, error } = await supabase
      .from('ejercicios')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error al obtener ejercicio:', error);
    return { data: null, error };
  }
}

/**
 * Buscar ejercicios por término
 */
export async function buscarEjercicios(searchTerm: string, filters?: {
  grupoMuscular?: string;
  equipamiento?: string;
  dificultad?: string;
}) {
  try {
    let query = supabase
      .from('ejercicios')
      .select('*');

    // Aplicar búsqueda por texto
    if (searchTerm) {
      query = query.or(`nombre.ilike.%${searchTerm}%,descripcion.ilike.%${searchTerm}%`);
    }

    // Aplicar filtros
    if (filters?.grupoMuscular) {
      query = query.eq('grupo_muscular', filters.grupoMuscular);
    }
    if (filters?.equipamiento) {
      query = query.eq('equipamiento', filters.equipamiento);
    }
    if (filters?.dificultad) {
      query = query.eq('dificultad', filters.dificultad);
    }

    const { data, error } = await query.order('nombre', { ascending: true });

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error al buscar ejercicios:', error);
    return { data: null, error };
  }
}

/**
 * Crear nuevo ejercicio
 */
export async function crearEjercicio(ejercicio: Omit<Ejercicio, 'id' | 'createdAt' | 'updatedAt'>) {
  try {
    const { data, error } = await supabase
      .from('ejercicios')
      .insert([ejercicio])
      .select()
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error al crear ejercicio:', error);
    return { data: null, error };
  }
}

/**
 * Actualizar ejercicio
 */
export async function actualizarEjercicio(id: string, ejercicio: Partial<Ejercicio>) {
  try {
    const { data, error } = await supabase
      .from('ejercicios')
      .update(ejercicio)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error al actualizar ejercicio:', error);
    return { data: null, error };
  }
}

/**
 * Eliminar ejercicio
 */
export async function eliminarEjercicio(id: string) {
  try {
    const { error } = await supabase
      .from('ejercicios')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return { error: null };
  } catch (error) {
    console.error('Error al eliminar ejercicio:', error);
    return { error };
  }
}

/**
 * Obtener analytics de uso de ejercicios
 */
export async function getAnalyticsEjercicios() {
  try {
    const { data, error } = await supabase
      .from('ejercicios_analytics')
      .select('*');

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error al obtener analytics:', error);
    return { data: null, error };
  }
}

