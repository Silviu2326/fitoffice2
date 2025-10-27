import { supabase } from '../../../lib/supabase';

export interface CategoriaGasto {
  id: string;
  nombre: string;
  descripcion?: string;
  color: string;
  icono?: string;
  tipo_usuario: 'entrenador' | 'gimnasio' | 'ambos';
  tipo_gasto: 'operativo' | 'inversion' | 'mantenimiento' | 'otro';
  presupuesto_mensual?: number;
  estado: 'activo' | 'inactivo';
  created_at: string;
  updated_at: string;
}

export interface CreateCategoriaData {
  nombre: string;
  descripcion?: string;
  color: string;
  icono?: string;
  tipo_usuario: 'entrenador' | 'gimnasio' | 'ambos';
  tipo_gasto: 'operativo' | 'inversion' | 'mantenimiento' | 'otro';
  presupuesto_mensual?: number;
  estado?: 'activo' | 'inactivo';
}

export interface OrdenCompra {
  id: string;
  numero_orden: string;
  proveedor_id: string;
  fecha_orden: string;
  fecha_entrega_estimada?: string;
  estado: 'pendiente' | 'enviada' | 'recibida' | 'cancelada';
  items: OrdenCompraItem[];
  subtotal: number;
  iva: number;
  total: number;
  notas?: string;
  created_at: string;
  updated_at: string;
}

export interface OrdenCompraItem {
  descripcion: string;
  cantidad: number;
  precio_unitario: number;
  total: number;
}

// Obtener todas las categorías
export async function getCategorias(): Promise<CategoriaGasto[]> {
  const { data, error } = await supabase
    .from('categorias_gastos')
    .select('*')
    .order('nombre', { ascending: true });

  if (error) {
    console.error('Error al obtener categorías:', error);
    throw error;
  }

  return data || [];
}

// Obtener categorías activas
export async function getCategoriasActivas(): Promise<CategoriaGasto[]> {
  const { data, error } = await supabase
    .from('categorias_gastos')
    .select('*')
    .eq('estado', 'activo')
    .order('nombre', { ascending: true });

  if (error) {
    console.error('Error al obtener categorías activas:', error);
    throw error;
  }

  return data || [];
}

// Obtener categorías por tipo de usuario
export async function getCategoriasByTipoUsuario(
  tipoUsuario: 'entrenador' | 'gimnasio' | 'ambos'
): Promise<CategoriaGasto[]> {
  const { data, error } = await supabase
    .from('categorias_gastos')
    .select('*')
    .in('tipo_usuario', [tipoUsuario, 'ambos'])
    .eq('estado', 'activo')
    .order('nombre', { ascending: true });

  if (error) {
    console.error('Error al obtener categorías por tipo:', error);
    throw error;
  }

  return data || [];
}

// Crear una nueva categoría
export async function createCategoria(categoriaData: CreateCategoriaData): Promise<CategoriaGasto> {
  const { data, error } = await supabase
    .from('categorias_gastos')
    .insert([{ ...categoriaData, estado: categoriaData.estado || 'activo' }])
    .select()
    .single();

  if (error) {
    console.error('Error al crear categoría:', error);
    throw error;
  }

  return data;
}

// Actualizar una categoría
export async function updateCategoria(
  id: string,
  categoriaData: Partial<CreateCategoriaData>
): Promise<CategoriaGasto> {
  const { data, error } = await supabase
    .from('categorias_gastos')
    .update({ ...categoriaData, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error al actualizar categoría:', error);
    throw error;
  }

  return data;
}

// Eliminar una categoría
export async function deleteCategoria(id: string): Promise<void> {
  const { error } = await supabase
    .from('categorias_gastos')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error al eliminar categoría:', error);
    throw error;
  }
}

// === ÓRDENES DE COMPRA ===

// Obtener todas las órdenes de compra
export async function getOrdenesCompra(): Promise<OrdenCompra[]> {
  const { data, error } = await supabase
    .from('ordenes_compra')
    .select('*')
    .order('fecha_orden', { ascending: false });

  if (error) {
    console.error('Error al obtener órdenes de compra:', error);
    throw error;
  }

  return data || [];
}

// Crear una nueva orden de compra
export async function createOrdenCompra(
  ordenData: Omit<OrdenCompra, 'id' | 'created_at' | 'updated_at'>
): Promise<OrdenCompra> {
  const { data, error } = await supabase
    .from('ordenes_compra')
    .insert([ordenData])
    .select()
    .single();

  if (error) {
    console.error('Error al crear orden de compra:', error);
    throw error;
  }

  return data;
}

// Actualizar estado de orden de compra
export async function updateEstadoOrdenCompra(
  id: string,
  estado: OrdenCompra['estado']
): Promise<OrdenCompra> {
  const { data, error } = await supabase
    .from('ordenes_compra')
    .update({ estado, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error al actualizar orden de compra:', error);
    throw error;
  }

  return data;
}

// Generar número de orden automático
export async function generarNumeroOrden(): Promise<string> {
  const year = new Date().getFullYear();
  const { data, error } = await supabase
    .from('ordenes_compra')
    .select('numero_orden')
    .like('numero_orden', `OC-${year}-%`)
    .order('numero_orden', { ascending: false })
    .limit(1);

  if (error) {
    console.error('Error al generar número de orden:', error);
    throw error;
  }

  if (!data || data.length === 0) {
    return `OC-${year}-0001`;
  }

  const lastNumber = parseInt(data[0].numero_orden.split('-')[2]);
  const newNumber = lastNumber + 1;
  return `OC-${year}-${String(newNumber).padStart(4, '0')}`;
}

