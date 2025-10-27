// API para gestión de categorías de recetas
import { supabase } from '../../../lib/supabase';

export interface Categoria {
  id: string;
  nombre: string;
  icono: string;
  count: number;
}

/**
 * Obtiene todas las categorías disponibles con conteo de recetas
 */
export async function getCategorias(): Promise<Categoria[]> {
  try {
    // Obtener conteos de recetas por categoría
    const { data: recetas, error } = await supabase
      .from('recetas')
      .select('categoria');

    if (error) throw error;

    // Contar recetas por categoría
    const conteos: Record<string, number> = {};
    recetas?.forEach((receta) => {
      conteos[receta.categoria] = (conteos[receta.categoria] || 0) + 1;
    });

    return getCategoriasMock(conteos);
  } catch (error) {
    console.error('Error al obtener categorías:', error);
    return getCategoriasMock();
  }
}

/**
 * Obtiene categorías mock con conteos
 */
function getCategoriasMock(conteos: Record<string, number> = {}): Categoria[] {
  return [
    {
      id: 'desayuno',
      nombre: 'Desayuno',
      icono: '🌅',
      count: conteos['desayuno'] || 0,
    },
    {
      id: 'almuerzo',
      nombre: 'Almuerzo',
      icono: '☕',
      count: conteos['almuerzo'] || 0,
    },
    {
      id: 'comida',
      nombre: 'Comida',
      icono: '🍽️',
      count: conteos['comida'] || 0,
    },
    {
      id: 'merienda',
      nombre: 'Merienda',
      icono: '🍪',
      count: conteos['merienda'] || 0,
    },
    {
      id: 'cena',
      nombre: 'Cena',
      icono: '🌙',
      count: conteos['cena'] || 0,
    },
    {
      id: 'snack',
      nombre: 'Snack',
      icono: '🥜',
      count: conteos['snack'] || 0,
    },
  ];
}

/**
 * Obtiene una categoría por ID
 */
export async function getCategoriaById(id: string): Promise<Categoria | null> {
  const categorias = await getCategorias();
  return categorias.find((cat) => cat.id === id) || null;
}

