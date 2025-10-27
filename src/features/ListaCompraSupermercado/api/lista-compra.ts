import { supabase } from '../../../lib/supabase';

export interface ListaCompra {
  id: string;
  cliente_id: string;
  fecha_creacion: string;
  fecha_compra: string;
  num_personas: number;
  estado: 'pendiente' | 'enviada' | 'completada';
  supermercado: string;
  ingredientes: Ingrediente[];
  ingredientes_extra?: string[];
  restricciones?: string[];
}

export interface Ingrediente {
  id: string;
  nombre: string;
  cantidad: string;
  seccion: string;
  precio_estimado?: number;
  comprado?: boolean;
}

/**
 * Obtener todas las listas de compra
 */
export async function getListasCompra(): Promise<ListaCompra[]> {
  try {
    const { data, error } = await supabase
      .from('listas_compra')
      .select('*')
      .order('fecha_creacion', { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error al obtener listas de compra:', error);
    throw error;
  }
}

/**
 * Obtener lista de compra por ID
 */
export async function getListaCompraById(id: string): Promise<ListaCompra | null> {
  try {
    const { data, error } = await supabase
      .from('listas_compra')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error al obtener lista de compra:', error);
    throw error;
  }
}

/**
 * Obtener listas de compra por cliente
 */
export async function getListasCompraByCliente(clienteId: string): Promise<ListaCompra[]> {
  try {
    const { data, error } = await supabase
      .from('listas_compra')
      .select('*')
      .eq('cliente_id', clienteId)
      .order('fecha_creacion', { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error al obtener listas del cliente:', error);
    throw error;
  }
}

/**
 * Crear una nueva lista de compra
 */
export async function createListaCompra(
  listaData: Omit<ListaCompra, 'id' | 'fecha_creacion'>
): Promise<ListaCompra> {
  try {
    const { data, error } = await supabase
      .from('listas_compra')
      .insert([
        {
          ...listaData,
          fecha_creacion: new Date().toISOString(),
        },
      ])
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error al crear lista de compra:', error);
    throw error;
  }
}

/**
 * Actualizar lista de compra
 */
export async function updateListaCompra(
  id: string,
  updates: Partial<ListaCompra>
): Promise<ListaCompra> {
  try {
    const { data, error } = await supabase
      .from('listas_compra')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error al actualizar lista de compra:', error);
    throw error;
  }
}

/**
 * Eliminar lista de compra
 */
export async function deleteListaCompra(id: string): Promise<void> {
  try {
    const { error } = await supabase
      .from('listas_compra')
      .delete()
      .eq('id', id);

    if (error) throw error;
  } catch (error) {
    console.error('Error al eliminar lista de compra:', error);
    throw error;
  }
}

/**
 * Generar lista de compra basada en la dieta del cliente
 */
export async function generarListaDesdeDialta(
  clienteId: string,
  fechaCompra: string,
  numPersonas: number = 1,
  incluyeBase: boolean = true
): Promise<ListaCompra> {
  try {
    // TODO: Implementar lógica de generación desde dieta
    // 1. Obtener dieta asignada al cliente
    // 2. Extraer ingredientes de las recetas
    // 3. Calcular cantidades según número de personas
    // 4. Añadir ingredientes base si está activado
    // 5. Organizar por secciones del supermercado
    
    // Por ahora, devolvemos una lista de ejemplo
    const listaGenerada: Omit<ListaCompra, 'id' | 'fecha_creacion'> = {
      cliente_id: clienteId,
      fecha_compra: fechaCompra,
      num_personas: numPersonas,
      estado: 'pendiente',
      supermercado: 'Mercadona',
      ingredientes: [],
    };

    return await createListaCompra(listaGenerada);
  } catch (error) {
    console.error('Error al generar lista desde dieta:', error);
    throw error;
  }
}

/**
 * Marcar ingrediente como comprado
 */
export async function marcarIngredienteComprado(
  listaId: string,
  ingredienteId: string,
  comprado: boolean
): Promise<void> {
  try {
    // TODO: Implementar actualización de estado de ingrediente
    console.log(`Marcando ingrediente ${ingredienteId} como ${comprado ? 'comprado' : 'pendiente'}`);
  } catch (error) {
    console.error('Error al marcar ingrediente:', error);
    throw error;
  }
}

