import { supabase } from '../../../lib/supabase';

export interface Categoria {
  id: string;
  nombre: string;
  tipo: 'grupo_muscular' | 'equipamiento' | 'dificultad';
  descripcion?: string;
  icono?: string;
}

/**
 * Obtener todas las categorías
 */
export async function getCategorias() {
  try {
    const { data, error } = await supabase
      .from('ejercicios_categorias')
      .select('*')
      .order('tipo', { ascending: true })
      .order('nombre', { ascending: true });

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error al obtener categorías:', error);
    return { data: null, error };
  }
}

/**
 * Obtener categorías por tipo
 */
export async function getCategoriasPorTipo(tipo: string) {
  try {
    const { data, error } = await supabase
      .from('ejercicios_categorias')
      .select('*')
      .eq('tipo', tipo)
      .order('nombre', { ascending: true });

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error al obtener categorías por tipo:', error);
    return { data: null, error };
  }
}

/**
 * Obtener grupos musculares
 */
export async function getGruposMusculares() {
  return getCategoriasPorTipo('grupo_muscular');
}

/**
 * Obtener tipos de equipamiento
 */
export async function getEquipamientos() {
  return getCategoriasPorTipo('equipamiento');
}

/**
 * Obtener niveles de dificultad
 */
export async function getDificultades() {
  return getCategoriasPorTipo('dificultad');
}

/**
 * Crear nueva categoría
 */
export async function crearCategoria(categoria: Omit<Categoria, 'id'>) {
  try {
    const { data, error } = await supabase
      .from('ejercicios_categorias')
      .insert([categoria])
      .select()
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error al crear categoría:', error);
    return { data: null, error };
  }
}

/**
 * Actualizar categoría
 */
export async function actualizarCategoria(id: string, categoria: Partial<Categoria>) {
  try {
    const { data, error } = await supabase
      .from('ejercicios_categorias')
      .update(categoria)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error al actualizar categoría:', error);
    return { data: null, error };
  }
}

/**
 * Eliminar categoría
 */
export async function eliminarCategoria(id: string) {
  try {
    const { error } = await supabase
      .from('ejercicios_categorias')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return { error: null };
  } catch (error) {
    console.error('Error al eliminar categoría:', error);
    return { error };
  }
}

