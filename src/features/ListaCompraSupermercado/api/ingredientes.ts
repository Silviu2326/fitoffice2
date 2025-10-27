import { supabase } from '../../../lib/supabase';

export interface IngredienteBase {
  id: string;
  nombre: string;
  categoria: string;
  seccion: string;
  unidad_medida: string;
  precio_promedio?: number;
  calorias_por_100g?: number;
  proteinas_por_100g?: number;
  carbohidratos_por_100g?: number;
  grasas_por_100g?: number;
}

export interface SeccionSupermercado {
  id: string;
  nombre: string;
  orden: number;
  icono?: string;
  color?: string;
}

/**
 * Obtener todos los ingredientes base
 */
export async function getIngredientesBase(): Promise<IngredienteBase[]> {
  try {
    const { data, error } = await supabase
      .from('ingredientes_base')
      .select('*')
      .order('nombre');

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error al obtener ingredientes base:', error);
    throw error;
  }
}

/**
 * Obtener ingredientes por categoría
 */
export async function getIngredientesByCategoria(categoria: string): Promise<IngredienteBase[]> {
  try {
    const { data, error } = await supabase
      .from('ingredientes_base')
      .select('*')
      .eq('categoria', categoria)
      .order('nombre');

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error al obtener ingredientes por categoría:', error);
    throw error;
  }
}

/**
 * Obtener ingredientes por sección
 */
export async function getIngredientesBySeccion(seccion: string): Promise<IngredienteBase[]> {
  try {
    const { data, error } = await supabase
      .from('ingredientes_base')
      .select('*')
      .eq('seccion', seccion)
      .order('nombre');

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error al obtener ingredientes por sección:', error);
    throw error;
  }
}

/**
 * Buscar ingredientes por nombre
 */
export async function buscarIngredientes(query: string): Promise<IngredienteBase[]> {
  try {
    const { data, error } = await supabase
      .from('ingredientes_base')
      .select('*')
      .ilike('nombre', `%${query}%`)
      .order('nombre')
      .limit(20);

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error al buscar ingredientes:', error);
    throw error;
  }
}

/**
 * Obtener todas las secciones del supermercado
 */
export async function getSeccionesSupermercado(): Promise<SeccionSupermercado[]> {
  try {
    const { data, error } = await supabase
      .from('secciones_supermercado')
      .select('*')
      .order('orden');

    if (error) throw error;
    
    // Si no hay datos en la base de datos, devolver secciones por defecto
    if (!data || data.length === 0) {
      return [
        { id: '1', nombre: 'Frutas y Verduras', orden: 1, icono: 'Apple', color: 'emerald' },
        { id: '2', nombre: 'Carnes y Pescados', orden: 2, icono: 'Beef', color: 'red' },
        { id: '3', nombre: 'Lácteos y Huevos', orden: 3, icono: 'Milk', color: 'blue' },
        { id: '4', nombre: 'Panadería y Cereales', orden: 4, icono: 'Bread', color: 'yellow' },
        { id: '5', nombre: 'Condimentos y Especias', orden: 5, icono: 'Package', color: 'purple' },
        { id: '6', nombre: 'Congelados', orden: 6, icono: 'Snowflake', color: 'cyan' },
        { id: '7', nombre: 'Conservas', orden: 7, icono: 'Package', color: 'orange' },
      ];
    }
    
    return data;
  } catch (error) {
    console.error('Error al obtener secciones del supermercado:', error);
    
    // Devolver secciones por defecto en caso de error
    return [
      { id: '1', nombre: 'Frutas y Verduras', orden: 1, icono: 'Apple', color: 'emerald' },
      { id: '2', nombre: 'Carnes y Pescados', orden: 2, icono: 'Beef', color: 'red' },
      { id: '3', nombre: 'Lácteos y Huevos', orden: 3, icono: 'Milk', color: 'blue' },
      { id: '4', nombre: 'Panadería y Cereales', orden: 4, icono: 'Bread', color: 'yellow' },
      { id: '5', nombre: 'Condimentos y Especias', orden: 5, icono: 'Package', color: 'purple' },
      { id: '6', nombre: 'Congelados', orden: 6, icono: 'Snowflake', color: 'cyan' },
      { id: '7', nombre: 'Conservas', orden: 7, icono: 'Package', color: 'orange' },
    ];
  }
}

/**
 * Extraer ingredientes de una receta
 */
export async function extraerIngredientesDeReceta(recetaId: string): Promise<IngredienteBase[]> {
  try {
    // TODO: Implementar lógica de extracción desde recetas
    const { data, error } = await supabase
      .from('receta_ingredientes')
      .select(`
        cantidad,
        unidad,
        ingredientes_base (*)
      `)
      .eq('receta_id', recetaId);

    if (error) throw error;
    
    // Mapear los datos a la estructura de IngredienteBase
    return data?.map((item: any) => item.ingredientes_base) || [];
  } catch (error) {
    console.error('Error al extraer ingredientes de receta:', error);
    return [];
  }
}

/**
 * Calcular cantidad de ingrediente según porciones
 */
export function calcularCantidad(
  cantidadBase: number,
  porcionesBase: number,
  porcionesDeseadas: number,
  numPersonas: number = 1
): number {
  return (cantidadBase / porcionesBase) * porcionesDeseadas * numPersonas;
}

/**
 * Obtener ingredientes de despensa base (siempre necesarios)
 */
export async function getIngredientesDespensaBase(): Promise<IngredienteBase[]> {
  try {
    const { data, error } = await supabase
      .from('ingredientes_base')
      .select('*')
      .eq('es_despensa_base', true)
      .order('nombre');

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error al obtener ingredientes de despensa base:', error);
    return [];
  }
}

