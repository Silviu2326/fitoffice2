import { supabase } from '../../../lib/supabase';

export interface Proveedor {
  id: string;
  nombre: string;
  razon_social?: string;
  cif_nif?: string;
  tipo: 'producto' | 'servicio' | 'mixto';
  email?: string;
  telefono?: string;
  direccion?: string;
  codigo_postal?: string;
  ciudad?: string;
  provincia?: string;
  pais?: string;
  contacto_principal?: string;
  sitio_web?: string;
  notas?: string;
  calificacion?: number;
  estado: 'activo' | 'inactivo' | 'bloqueado';
  created_at: string;
  updated_at: string;
}

export interface CreateProveedorData {
  nombre: string;
  razon_social?: string;
  cif_nif?: string;
  tipo: 'producto' | 'servicio' | 'mixto';
  email?: string;
  telefono?: string;
  direccion?: string;
  codigo_postal?: string;
  ciudad?: string;
  provincia?: string;
  pais?: string;
  contacto_principal?: string;
  sitio_web?: string;
  notas?: string;
  estado?: 'activo' | 'inactivo' | 'bloqueado';
}

export interface EvaluacionProveedor {
  id: string;
  proveedor_id: string;
  calidad: number; // 1-5
  puntualidad: number; // 1-5
  precio: number; // 1-5
  servicio: number; // 1-5
  comentarios?: string;
  fecha: string;
  created_at: string;
}

// Obtener todos los proveedores
export async function getProveedores(): Promise<Proveedor[]> {
  const { data, error } = await supabase
    .from('proveedores')
    .select('*')
    .order('nombre', { ascending: true });

  if (error) {
    console.error('Error al obtener proveedores:', error);
    throw error;
  }

  return data || [];
}

// Obtener proveedores activos
export async function getProveedoresActivos(): Promise<Proveedor[]> {
  const { data, error } = await supabase
    .from('proveedores')
    .select('*')
    .eq('estado', 'activo')
    .order('nombre', { ascending: true });

  if (error) {
    console.error('Error al obtener proveedores activos:', error);
    throw error;
  }

  return data || [];
}

// Obtener un proveedor por ID
export async function getProveedorById(id: string): Promise<Proveedor> {
  const { data, error } = await supabase
    .from('proveedores')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error al obtener proveedor:', error);
    throw error;
  }

  return data;
}

// Crear un nuevo proveedor
export async function createProveedor(proveedorData: CreateProveedorData): Promise<Proveedor> {
  const { data, error } = await supabase
    .from('proveedores')
    .insert([{ ...proveedorData, estado: proveedorData.estado || 'activo' }])
    .select()
    .single();

  if (error) {
    console.error('Error al crear proveedor:', error);
    throw error;
  }

  return data;
}

// Actualizar un proveedor
export async function updateProveedor(
  id: string,
  proveedorData: Partial<CreateProveedorData>
): Promise<Proveedor> {
  const { data, error } = await supabase
    .from('proveedores')
    .update({ ...proveedorData, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error al actualizar proveedor:', error);
    throw error;
  }

  return data;
}

// Eliminar un proveedor
export async function deleteProveedor(id: string): Promise<void> {
  const { error } = await supabase
    .from('proveedores')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error al eliminar proveedor:', error);
    throw error;
  }
}

// Crear evaluación de proveedor
export async function createEvaluacionProveedor(
  evaluacion: Omit<EvaluacionProveedor, 'id' | 'created_at'>
): Promise<EvaluacionProveedor> {
  const { data, error } = await supabase
    .from('evaluaciones_proveedores')
    .insert([evaluacion])
    .select()
    .single();

  if (error) {
    console.error('Error al crear evaluación:', error);
    throw error;
  }

  // Actualizar calificación promedio del proveedor
  await updateCalificacionProveedor(evaluacion.proveedor_id);

  return data;
}

// Obtener evaluaciones de un proveedor
export async function getEvaluacionesProveedor(proveedorId: string): Promise<EvaluacionProveedor[]> {
  const { data, error } = await supabase
    .from('evaluaciones_proveedores')
    .select('*')
    .eq('proveedor_id', proveedorId)
    .order('fecha', { ascending: false });

  if (error) {
    console.error('Error al obtener evaluaciones:', error);
    throw error;
  }

  return data || [];
}

// Actualizar calificación promedio de un proveedor
async function updateCalificacionProveedor(proveedorId: string): Promise<void> {
  const evaluaciones = await getEvaluacionesProveedor(proveedorId);
  
  if (evaluaciones.length === 0) return;

  const promedio = evaluaciones.reduce((acc, ev) => {
    return acc + (ev.calidad + ev.puntualidad + ev.precio + ev.servicio) / 4;
  }, 0) / evaluaciones.length;

  await updateProveedor(proveedorId, { calificacion: promedio } as any);
}

// Buscar proveedores por tipo
export async function getProveedoresByTipo(tipo: 'producto' | 'servicio' | 'mixto'): Promise<Proveedor[]> {
  const { data, error } = await supabase
    .from('proveedores')
    .select('*')
    .eq('tipo', tipo)
    .eq('estado', 'activo')
    .order('nombre', { ascending: true });

  if (error) {
    console.error('Error al obtener proveedores por tipo:', error);
    throw error;
  }

  return data || [];
}

