import { supabase } from '../../../lib/supabase';

export interface CategoriaNutricional {
  id: string;
  nombre: string;
  descripcion: string;
  color: string;
  icono: string;
  contador_plantillas: number;
  activa: boolean;
}

/**
 * GET /api/nutricion/plantillas/categorias
 * Obtiene todas las categorías nutricionales
 */
export async function obtenerCategorias() {
  const { data, error } = await supabase
    .from('categorias_nutricionales')
    .select('*')
    .eq('activa', true)
    .order('nombre');

  if (error) throw error;
  return data;
}

/**
 * POST /api/nutricion/plantillas/categorias
 * Crea una nueva categoría nutricional
 */
export async function crearCategoria(categoria: Omit<CategoriaNutricional, 'id' | 'contador_plantillas'>) {
  const { data, error } = await supabase
    .from('categorias_nutricionales')
    .insert([{
      ...categoria,
      contador_plantillas: 0,
    }])
    .select()
    .single();

  if (error) throw error;
  return data;
}

/**
 * PUT /api/nutricion/plantillas/categorias/:id
 * Actualiza una categoría existente
 */
export async function actualizarCategoria(id: string, cambios: Partial<CategoriaNutricional>) {
  const { data, error } = await supabase
    .from('categorias_nutricionales')
    .update(cambios)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

/**
 * DELETE /api/nutricion/plantillas/categorias/:id
 * Elimina una categoría (soft delete)
 */
export async function eliminarCategoria(id: string) {
  const { data, error } = await supabase
    .from('categorias_nutricionales')
    .update({ activa: false })
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

/**
 * Obtiene el conteo de plantillas por categoría
 */
export async function obtenerEstadisticasCategorias() {
  const { data, error } = await supabase
    .from('categorias_nutricionales')
    .select(`
      *,
      plantillas_dieta(count)
    `)
    .eq('activa', true);

  if (error) throw error;
  return data;
}

/**
 * Categorías predefinidas comunes
 */
export const CATEGORIAS_PREDEFINIDAS = [
  { nombre: 'Vegetariana', descripcion: 'Dietas basadas en vegetales', color: '#10b981', icono: '🥗' },
  { nombre: 'Vegana', descripcion: 'Dietas 100% vegetales', color: '#22c55e', icono: '🌱' },
  { nombre: 'Pérdida de Peso', descripcion: 'Déficit calórico controlado', color: '#ef4444', icono: '📉' },
  { nombre: 'Ganancia Muscular', descripcion: 'Superávit para hipertrofia', color: '#3b82f6', icono: '💪' },
  { nombre: 'Cetogénica', descripcion: 'Alta en grasas, baja en carbohidratos', color: '#8b5cf6', icono: '🥑' },
  { nombre: 'Mediterránea', descripcion: 'Basada en la dieta mediterránea', color: '#f59e0b', icono: '🫒' },
  { nombre: 'Deportista', descripcion: 'Optimizada para rendimiento', color: '#06b6d4', icono: '🏃' },
  { nombre: 'Sin Gluten', descripcion: 'Libre de gluten', color: '#ec4899', icono: '🌾' },
  { nombre: 'Baja en Sodio', descripcion: 'Reducida en sal', color: '#64748b', icono: '🧂' },
  { nombre: 'Diabética', descripcion: 'Control glucémico', color: '#14b8a6', icono: '🩺' },
];

