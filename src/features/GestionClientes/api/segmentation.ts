import { supabase } from '../../../lib/supabase';

export interface Segmento {
  id: string;
  nombre: string;
  descripcion: string;
  criterios: CriterioSegmentacion[];
  numeroClientes: number;
  fechaCreacion: string;
  activo: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface CriterioSegmentacion {
  campo: string;
  operador: 'igual' | 'diferente' | 'mayor' | 'menor' | 'contiene' | 'en_rango';
  valor: any;
  categoria?: string;
}

export interface ClienteSegmentado {
  clienteId: string;
  segmentoId: string;
  fechaAsignacion: string;
}

/**
 * Obtiene todos los segmentos
 */
export async function getSegmentos(): Promise<Segmento[]> {
  const { data, error } = await supabase
    .from('segmentos_clientes')
    .select('*')
    .order('fechaCreacion', { ascending: false });

  if (error) {
    console.error('Error fetching segmentos:', error);
    throw error;
  }

  return data || [];
}

/**
 * Obtiene segmentos activos
 */
export async function getSegmentosActivos(): Promise<Segmento[]> {
  const { data, error } = await supabase
    .from('segmentos_clientes')
    .select('*')
    .eq('activo', true)
    .order('nombre', { ascending: true });

  if (error) {
    console.error('Error fetching segmentos activos:', error);
    throw error;
  }

  return data || [];
}

/**
 * Crea un nuevo segmento
 */
export async function createSegmento(
  segmento: Omit<Segmento, 'id' | 'numeroClientes' | 'created_at' | 'updated_at'>
): Promise<Segmento> {
  // Calcular número de clientes que cumplen los criterios
  const numeroClientes = await calcularClientesSegmento(segmento.criterios);
  
  const { data, error } = await supabase
    .from('segmentos_clientes')
    .insert([{ ...segmento, numeroClientes }])
    .select()
    .single();

  if (error) {
    console.error('Error creating segmento:', error);
    throw error;
  }

  return data;
}

/**
 * Actualiza un segmento
 */
export async function updateSegmento(
  id: string,
  updates: Partial<Segmento>
): Promise<Segmento> {
  // Si se actualizan los criterios, recalcular número de clientes
  if (updates.criterios) {
    updates.numeroClientes = await calcularClientesSegmento(updates.criterios);
  }
  
  const { data, error } = await supabase
    .from('segmentos_clientes')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating segmento:', error);
    throw error;
  }

  return data;
}

/**
 * Elimina un segmento
 */
export async function deleteSegmento(id: string): Promise<void> {
  const { error } = await supabase
    .from('segmentos_clientes')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting segmento:', error);
    throw error;
  }
}

/**
 * Obtiene clientes de un segmento específico
 */
export async function getClientesBySegmento(segmentoId: string): Promise<any[]> {
  const { data: segmento, error: segmentoError } = await supabase
    .from('segmentos_clientes')
    .select('criterios')
    .eq('id', segmentoId)
    .single();

  if (segmentoError) {
    console.error('Error fetching segmento:', segmentoError);
    throw segmentoError;
  }

  // Aplicar criterios para filtrar clientes
  return await filtrarClientesPorCriterios(segmento.criterios);
}

/**
 * Calcula cuántos clientes cumplen los criterios
 */
async function calcularClientesSegmento(criterios: CriterioSegmentacion[]): Promise<number> {
  const clientes = await filtrarClientesPorCriterios(criterios);
  return clientes.length;
}

/**
 * Filtra clientes basándose en criterios
 */
async function filtrarClientesPorCriterios(criterios: CriterioSegmentacion[]): Promise<any[]> {
  let query = supabase.from('clientes').select('*');

  // Aplicar cada criterio
  criterios.forEach(criterio => {
    switch (criterio.operador) {
      case 'igual':
        query = query.eq(criterio.campo, criterio.valor);
        break;
      case 'diferente':
        query = query.neq(criterio.campo, criterio.valor);
        break;
      case 'mayor':
        query = query.gt(criterio.campo, criterio.valor);
        break;
      case 'menor':
        query = query.lt(criterio.campo, criterio.valor);
        break;
      case 'contiene':
        query = query.ilike(criterio.campo, `%${criterio.valor}%`);
        break;
      // en_rango se manejaría con múltiples criterios
    }
  });

  const { data, error } = await query;

  if (error) {
    console.error('Error filtering clientes:', error);
    throw error;
  }

  return data || [];
}

/**
 * Asigna automáticamente clientes a segmentos
 */
export async function asignarClientesASegmentos(): Promise<{
  segmentosActualizados: number;
  clientesAsignados: number;
}> {
  const segmentos = await getSegmentosActivos();
  let clientesAsignados = 0;

  for (const segmento of segmentos) {
    const clientes = await getClientesBySegmento(segmento.id);
    
    // Guardar asignaciones
    const asignaciones = clientes.map(cliente => ({
      clienteId: cliente.id,
      segmentoId: segmento.id,
      fechaAsignacion: new Date().toISOString()
    }));

    if (asignaciones.length > 0) {
      // Primero eliminar asignaciones anteriores
      await supabase
        .from('clientes_segmentos')
        .delete()
        .eq('segmentoId', segmento.id);

      // Insertar nuevas asignaciones
      const { error } = await supabase
        .from('clientes_segmentos')
        .insert(asignaciones);

      if (!error) {
        clientesAsignados += asignaciones.length;
      }
    }

    // Actualizar contador de clientes en el segmento
    await updateSegmento(segmento.id, { numeroClientes: clientes.length });
  }

  return {
    segmentosActualizados: segmentos.length,
    clientesAsignados
  };
}

/**
 * Obtiene segmentos a los que pertenece un cliente
 */
export async function getSegmentosByCliente(clienteId: string): Promise<Segmento[]> {
  const { data, error } = await supabase
    .from('clientes_segmentos')
    .select('segmentoId, segmentos_clientes(*)')
    .eq('clienteId', clienteId);

  if (error) {
    console.error('Error fetching segmentos del cliente:', error);
    throw error;
  }

  return data?.map(item => item.segmentos_clientes) || [];
}

/**
 * Exporta clientes de un segmento
 */
export async function exportarSegmento(segmentoId: string, formato: 'csv' | 'json'): Promise<string> {
  const clientes = await getClientesBySegmento(segmentoId);
  
  if (formato === 'csv') {
    // Convertir a CSV
    const headers = Object.keys(clientes[0] || {}).join(',');
    const rows = clientes.map(cliente => 
      Object.values(cliente).join(',')
    ).join('\n');
    
    return `${headers}\n${rows}`;
  } else {
    // Retornar JSON
    return JSON.stringify(clientes, null, 2);
  }
}

/**
 * Sugiere segmentos basándose en patrones de datos
 */
export async function sugerirSegmentos(): Promise<Segmento[]> {
  // TODO: Implementar análisis automático para sugerir segmentos útiles
  // basándose en patrones como:
  // - Agrupaciones por comportamiento similar
  // - Clustering de clientes
  // - Análisis de cohortes
  
  return [];
}

