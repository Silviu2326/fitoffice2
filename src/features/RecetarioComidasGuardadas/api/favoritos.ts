// API para gestión de favoritos de recetas
import { supabase } from '../../../lib/supabase';

/**
 * Marca o desmarca una receta como favorita
 */
export async function toggleFavorito(recetaId: string): Promise<boolean> {
  try {
    // Obtener el estado actual
    const { data: receta, error: fetchError } = await supabase
      .from('recetas')
      .select('favorito')
      .eq('id', recetaId)
      .single();

    if (fetchError) throw fetchError;

    // Invertir el estado
    const nuevoEstado = !receta?.favorito;

    const { error: updateError } = await supabase
      .from('recetas')
      .update({ favorito: nuevoEstado })
      .eq('id', recetaId);

    if (updateError) throw updateError;

    return nuevoEstado;
  } catch (error) {
    console.error('Error al toggle favorito:', error);
    return false;
  }
}

/**
 * Obtiene todas las recetas marcadas como favoritas
 */
export async function getFavoritos(): Promise<any[]> {
  try {
    const { data, error } = await supabase
      .from('recetas')
      .select('*')
      .eq('favorito', true)
      .order('nombre', { ascending: true });

    if (error) throw error;

    return data || [];
  } catch (error) {
    console.error('Error al obtener favoritos:', error);
    return [];
  }
}

/**
 * Marca una receta como favorita
 */
export async function marcarFavorito(recetaId: string): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('recetas')
      .update({ favorito: true })
      .eq('id', recetaId);

    if (error) throw error;

    return true;
  } catch (error) {
    console.error('Error al marcar favorito:', error);
    return false;
  }
}

/**
 * Desmarca una receta como favorita
 */
export async function desmarcarFavorito(recetaId: string): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('recetas')
      .update({ favorito: false })
      .eq('id', recetaId);

    if (error) throw error;

    return true;
  } catch (error) {
    console.error('Error al desmarcar favorito:', error);
    return false;
  }
}

