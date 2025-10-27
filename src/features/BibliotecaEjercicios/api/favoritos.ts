import { supabase } from '../../../lib/supabase';

export interface Favorito {
  id: string;
  userId: string;
  ejercicioId: string;
  createdAt: Date;
}

/**
 * Obtener ejercicios favoritos del usuario
 */
export async function getFavoritos(userId: string) {
  try {
    const { data, error } = await supabase
      .from('ejercicios_favoritos')
      .select(`
        *,
        ejercicio:ejercicios (*)
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error al obtener favoritos:', error);
    return { data: null, error };
  }
}

/**
 * Verificar si un ejercicio es favorito
 */
export async function esFavorito(userId: string, ejercicioId: string) {
  try {
    const { data, error } = await supabase
      .from('ejercicios_favoritos')
      .select('id')
      .eq('user_id', userId)
      .eq('ejercicio_id', ejercicioId)
      .single();

    if (error && error.code !== 'PGRST116') throw error; // PGRST116 = no rows returned
    return { esFavorito: !!data, error: null };
  } catch (error) {
    console.error('Error al verificar favorito:', error);
    return { esFavorito: false, error };
  }
}

/**
 * Agregar ejercicio a favoritos
 */
export async function agregarFavorito(userId: string, ejercicioId: string) {
  try {
    const { data, error } = await supabase
      .from('ejercicios_favoritos')
      .insert([{
        user_id: userId,
        ejercicio_id: ejercicioId
      }])
      .select()
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error al agregar favorito:', error);
    return { data: null, error };
  }
}

/**
 * Eliminar ejercicio de favoritos
 */
export async function eliminarFavorito(userId: string, ejercicioId: string) {
  try {
    const { error } = await supabase
      .from('ejercicios_favoritos')
      .delete()
      .eq('user_id', userId)
      .eq('ejercicio_id', ejercicioId);

    if (error) throw error;
    return { error: null };
  } catch (error) {
    console.error('Error al eliminar favorito:', error);
    return { error };
  }
}

/**
 * Toggle favorito (agregar o eliminar)
 */
export async function toggleFavorito(userId: string, ejercicioId: string) {
  try {
    const { esFavorito } = await esFavorito(userId, ejercicioId);
    
    if (esFavorito) {
      return eliminarFavorito(userId, ejercicioId);
    } else {
      return agregarFavorito(userId, ejercicioId);
    }
  } catch (error) {
    console.error('Error al toggle favorito:', error);
    return { error };
  }
}

/**
 * Obtener conteo de favoritos por ejercicio
 */
export async function getConteoFavoritos(ejercicioId: string) {
  try {
    const { count, error } = await supabase
      .from('ejercicios_favoritos')
      .select('*', { count: 'exact', head: true })
      .eq('ejercicio_id', ejercicioId);

    if (error) throw error;
    return { count: count || 0, error: null };
  } catch (error) {
    console.error('Error al obtener conteo de favoritos:', error);
    return { count: 0, error };
  }
}

