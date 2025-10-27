import { supabase } from '../../../lib/supabase';

export interface Gasto {
  id: string;
  concepto: string;
  descripcion?: string;
  monto: number;
  fecha: string;
  categoria_id: string;
  proveedor_id?: string;
  estado: 'pendiente' | 'aprobado' | 'pagado' | 'rechazado';
  metodo_pago?: string;
  numero_factura?: string;
  notas?: string;
  created_at: string;
  updated_at: string;
}

export interface CreateGastoData {
  concepto: string;
  descripcion?: string;
  monto: number;
  fecha: string;
  categoria_id: string;
  proveedor_id?: string;
  estado?: 'pendiente' | 'aprobado' | 'pagado' | 'rechazado';
  metodo_pago?: string;
  numero_factura?: string;
  notas?: string;
}

// Obtener todos los gastos
export async function getGastos(): Promise<Gasto[]> {
  const { data, error } = await supabase
    .from('gastos')
    .select('*')
    .order('fecha', { ascending: false });

  if (error) {
    console.error('Error al obtener gastos:', error);
    throw error;
  }

  return data || [];
}

// Obtener gastos por rango de fechas
export async function getGastosByDateRange(
  fechaInicio: string,
  fechaFin: string
): Promise<Gasto[]> {
  const { data, error } = await supabase
    .from('gastos')
    .select('*')
    .gte('fecha', fechaInicio)
    .lte('fecha', fechaFin)
    .order('fecha', { ascending: false });

  if (error) {
    console.error('Error al obtener gastos por fecha:', error);
    throw error;
  }

  return data || [];
}

// Obtener gastos por categoría
export async function getGastosByCategoria(categoriaId: string): Promise<Gasto[]> {
  const { data, error } = await supabase
    .from('gastos')
    .select('*')
    .eq('categoria_id', categoriaId)
    .order('fecha', { ascending: false });

  if (error) {
    console.error('Error al obtener gastos por categoría:', error);
    throw error;
  }

  return data || [];
}

// Obtener gastos por proveedor
export async function getGastosByProveedor(proveedorId: string): Promise<Gasto[]> {
  const { data, error } = await supabase
    .from('gastos')
    .select('*')
    .eq('proveedor_id', proveedorId)
    .order('fecha', { ascending: false });

  if (error) {
    console.error('Error al obtener gastos por proveedor:', error);
    throw error;
  }

  return data || [];
}

// Crear un nuevo gasto
export async function createGasto(gastoData: CreateGastoData): Promise<Gasto> {
  const { data, error } = await supabase
    .from('gastos')
    .insert([gastoData])
    .select()
    .single();

  if (error) {
    console.error('Error al crear gasto:', error);
    throw error;
  }

  return data;
}

// Actualizar un gasto
export async function updateGasto(
  id: string,
  gastoData: Partial<CreateGastoData>
): Promise<Gasto> {
  const { data, error } = await supabase
    .from('gastos')
    .update({ ...gastoData, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error al actualizar gasto:', error);
    throw error;
  }

  return data;
}

// Eliminar un gasto
export async function deleteGasto(id: string): Promise<void> {
  const { error } = await supabase
    .from('gastos')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error al eliminar gasto:', error);
    throw error;
  }
}

// Calcular total de gastos por período
export async function getTotalGastosByPeriodo(
  fechaInicio: string,
  fechaFin: string
): Promise<number> {
  const { data, error } = await supabase
    .from('gastos')
    .select('monto')
    .gte('fecha', fechaInicio)
    .lte('fecha', fechaFin)
    .eq('estado', 'pagado');

  if (error) {
    console.error('Error al calcular total de gastos:', error);
    throw error;
  }

  return data?.reduce((total, gasto) => total + gasto.monto, 0) || 0;
}

// Obtener estadísticas de gastos
export async function getEstadisticasGastos(mes: string, anio: string) {
  const { data, error } = await supabase
    .from('gastos')
    .select('categoria_id, monto, estado')
    .gte('fecha', `${anio}-${mes}-01`)
    .lt('fecha', `${anio}-${String(Number(mes) + 1).padStart(2, '0')}-01`);

  if (error) {
    console.error('Error al obtener estadísticas:', error);
    throw error;
  }

  return data || [];
}

