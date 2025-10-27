// API para gestión de recetas
import { supabase } from '../../../lib/supabase';

export interface Ingrediente {
  nombre: string;
  cantidad: number;
  unidad: string;
}

export interface ValorNutricional {
  calorias: number;
  proteinas: number;
  carbohidratos: number;
  grasas: number;
  fibra: number;
}

export interface Receta {
  id: string;
  nombre: string;
  descripcion: string;
  categoria: 'desayuno' | 'almuerzo' | 'comida' | 'merienda' | 'cena' | 'snack';
  tiempo_preparacion: number;
  dificultad: 'facil' | 'media' | 'dificil';
  porciones: number;
  ingredientes: Ingrediente[];
  instrucciones: string[];
  valor_nutricional: ValorNutricional;
  tags: string[];
  favorito: boolean;
  veces_usado: number;
  foto_url?: string;
  created_at?: string;
  updated_at?: string;
}

export interface RecetaCreate extends Omit<Receta, 'id' | 'veces_usado' | 'created_at' | 'updated_at'> {}

/**
 * Obtiene todas las recetas
 */
export async function getRecetas(): Promise<Receta[]> {
  try {
    const { data, error } = await supabase
      .from('recetas')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    return data || [];
  } catch (error) {
    console.error('Error al obtener recetas:', error);
    // Retornar datos de ejemplo para desarrollo
    return getMockRecetas();
  }
}

/**
 * Obtiene una receta por ID
 */
export async function getRecetaById(id: string): Promise<Receta | null> {
  try {
    const { data, error } = await supabase
      .from('recetas')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;

    return data;
  } catch (error) {
    console.error('Error al obtener receta:', error);
    return null;
  }
}

/**
 * Crea una nueva receta
 */
export async function createReceta(receta: RecetaCreate): Promise<Receta | null> {
  try {
    const { data, error } = await supabase
      .from('recetas')
      .insert([{ ...receta, veces_usado: 0 }])
      .select()
      .single();

    if (error) throw error;

    return data;
  } catch (error) {
    console.error('Error al crear receta:', error);
    return null;
  }
}

/**
 * Actualiza una receta existente
 */
export async function updateReceta(id: string, receta: Partial<RecetaCreate>): Promise<Receta | null> {
  try {
    const { data, error } = await supabase
      .from('recetas')
      .update(receta)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    return data;
  } catch (error) {
    console.error('Error al actualizar receta:', error);
    return null;
  }
}

/**
 * Elimina una receta
 */
export async function deleteReceta(id: string): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('recetas')
      .delete()
      .eq('id', id);

    if (error) throw error;

    return true;
  } catch (error) {
    console.error('Error al eliminar receta:', error);
    return false;
  }
}

/**
 * Incrementa el contador de veces usado
 */
export async function incrementarVecesUsado(id: string): Promise<void> {
  try {
    const { error } = await supabase.rpc('incrementar_veces_usado_receta', { receta_id: id });

    if (error) throw error;
  } catch (error) {
    console.error('Error al incrementar veces usado:', error);
  }
}

/**
 * Datos mock para desarrollo
 */
function getMockRecetas(): Receta[] {
  return [
    {
      id: '1',
      nombre: 'Pollo al horno con vegetales',
      descripcion: 'Receta saludable de pollo con vegetales asados al horno',
      categoria: 'comida',
      tiempo_preparacion: 45,
      dificultad: 'media',
      porciones: 4,
      ingredientes: [
        { nombre: 'Pechuga de pollo', cantidad: 500, unidad: 'g' },
        { nombre: 'Brócoli', cantidad: 300, unidad: 'g' },
        { nombre: 'Zanahoria', cantidad: 200, unidad: 'g' },
        { nombre: 'Aceite de oliva', cantidad: 2, unidad: 'cucharada' },
      ],
      instrucciones: [
        'Precalentar el horno a 180°C',
        'Cortar el pollo en trozos medianos y salpimentar',
        'Cortar los vegetales en trozos grandes',
        'Mezclar todo con aceite de oliva y especias',
        'Hornear durante 35-40 minutos hasta que el pollo esté dorado',
      ],
      valor_nutricional: {
        calorias: 320,
        proteinas: 35,
        carbohidratos: 15,
        grasas: 12,
        fibra: 5,
      },
      tags: ['Alto en proteína', 'Fitness', 'Bajo en carbohidratos'],
      favorito: false,
      veces_usado: 12,
    },
    {
      id: '2',
      nombre: 'Ensalada de quinoa',
      descripcion: 'Ensalada nutritiva con quinoa, aguacate y vegetales frescos',
      categoria: 'almuerzo',
      tiempo_preparacion: 20,
      dificultad: 'facil',
      porciones: 2,
      ingredientes: [
        { nombre: 'Quinoa cocida', cantidad: 200, unidad: 'g' },
        { nombre: 'Aguacate', cantidad: 1, unidad: 'unidad' },
        { nombre: 'Tomate cherry', cantidad: 150, unidad: 'g' },
        { nombre: 'Pepino', cantidad: 100, unidad: 'g' },
      ],
      instrucciones: [
        'Cocinar la quinoa según instrucciones del paquete',
        'Cortar todos los vegetales en trozos pequeños',
        'Mezclar la quinoa con los vegetales',
        'Aliñar con limón y aceite de oliva',
      ],
      valor_nutricional: {
        calorias: 280,
        proteinas: 8,
        carbohidratos: 35,
        grasas: 14,
        fibra: 8,
      },
      tags: ['Vegetariano', 'Vegano', 'Sin gluten', 'Fitness'],
      favorito: true,
      veces_usado: 25,
    },
    {
      id: '3',
      nombre: 'Batido proteico de plátano',
      descripcion: 'Batido energético perfecto para después del entrenamiento',
      categoria: 'snack',
      tiempo_preparacion: 5,
      dificultad: 'facil',
      porciones: 1,
      ingredientes: [
        { nombre: 'Plátano', cantidad: 1, unidad: 'unidad' },
        { nombre: 'Proteína en polvo', cantidad: 30, unidad: 'g' },
        { nombre: 'Leche de almendras', cantidad: 250, unidad: 'ml' },
        { nombre: 'Avena', cantidad: 30, unidad: 'g' },
      ],
      instrucciones: [
        'Agregar todos los ingredientes en la licuadora',
        'Licuar hasta obtener una consistencia suave',
        'Servir inmediatamente',
      ],
      valor_nutricional: {
        calorias: 350,
        proteinas: 28,
        carbohidratos: 45,
        grasas: 6,
        fibra: 6,
      },
      tags: ['Alto en proteína', 'Fitness', 'Bajo en calorías'],
      favorito: true,
      veces_usado: 45,
    },
  ];
}

