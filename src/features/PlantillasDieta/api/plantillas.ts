import { supabase } from '../../../lib/supabase';

export interface Plantilla {
  id: string;
  nombre: string;
  categoria: string;
  objetivo: string;
  calorias: number;
  macros: {
    proteinas: number;
    carbohidratos: number;
    grasas: number;
  };
  alimentos: any[];
  comidas: any[];
  horarios: any[];
  descripcion?: string;
  version: number;
  usos: number;
  efectividad: number;
  creador_id: string;
  fecha_creacion: string;
  fecha_actualizacion: string;
  activa: boolean;
}

/**
 * GET /api/nutricion/plantillas
 * Obtiene todas las plantillas nutricionales
 */
export async function obtenerPlantillas() {
  const { data, error } = await supabase
    .from('plantillas_dieta')
    .select('*')
    .eq('activa', true)
    .order('fecha_creacion', { ascending: false });

  if (error) throw error;
  return data;
}

/**
 * POST /api/nutricion/plantillas
 * Crea una nueva plantilla nutricional
 */
export async function crearPlantilla(plantilla: Omit<Plantilla, 'id' | 'fecha_creacion' | 'fecha_actualizacion'>) {
  const { data, error } = await supabase
    .from('plantillas_dieta')
    .insert([{
      ...plantilla,
      fecha_creacion: new Date().toISOString(),
      fecha_actualizacion: new Date().toISOString(),
    }])
    .select()
    .single();

  if (error) throw error;
  return data;
}

/**
 * PUT /api/nutricion/plantillas/:id
 * Actualiza una plantilla existente
 */
export async function actualizarPlantilla(id: string, cambios: Partial<Plantilla>) {
  const { data, error } = await supabase
    .from('plantillas_dieta')
    .update({
      ...cambios,
      fecha_actualizacion: new Date().toISOString(),
    })
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

/**
 * DELETE /api/nutricion/plantillas/:id
 * Elimina una plantilla (soft delete)
 */
export async function eliminarPlantilla(id: string) {
  const { data, error } = await supabase
    .from('plantillas_dieta')
    .update({ activa: false })
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

/**
 * POST /api/nutricion/plantillas/duplicar
 * Duplica una plantilla existente
 */
export async function duplicarPlantilla(plantillaId: string, nuevoNombre?: string) {
  // Primero obtenemos la plantilla original
  const { data: original, error: fetchError } = await supabase
    .from('plantillas_dieta')
    .select('*')
    .eq('id', plantillaId)
    .single();

  if (fetchError) throw fetchError;

  // Creamos la copia
  const { data, error } = await supabase
    .from('plantillas_dieta')
    .insert([{
      ...original,
      id: undefined, // Se generará un nuevo ID
      nombre: nuevoNombre || `${original.nombre} (Copia)`,
      version: 1,
      usos: 0,
      fecha_creacion: new Date().toISOString(),
      fecha_actualizacion: new Date().toISOString(),
    }])
    .select()
    .single();

  if (error) throw error;
  return data;
}

/**
 * GET /api/nutricion/plantillas/buscar
 * Busca plantillas con filtros avanzados
 */
export async function buscarPlantillas(filtros: {
  categoria?: string;
  objetivo?: string;
  caloriasMin?: number;
  caloriasMax?: number;
  query?: string;
}) {
  let query = supabase
    .from('plantillas_dieta')
    .select('*')
    .eq('activa', true);

  if (filtros.categoria) {
    query = query.eq('categoria', filtros.categoria);
  }

  if (filtros.objetivo) {
    query = query.eq('objetivo', filtros.objetivo);
  }

  if (filtros.caloriasMin) {
    query = query.gte('calorias', filtros.caloriasMin);
  }

  if (filtros.caloriasMax) {
    query = query.lte('calorias', filtros.caloriasMax);
  }

  if (filtros.query) {
    query = query.ilike('nombre', `%${filtros.query}%`);
  }

  const { data, error } = await query.order('fecha_creacion', { ascending: false });

  if (error) throw error;
  return data;
}

/**
 * POST /api/nutricion/plantillas/compartir
 * Comparte una plantilla con otros usuarios
 */
export async function compartirPlantilla(plantillaId: string, usuarioIds: string[]) {
  const compartidos = usuarioIds.map(usuarioId => ({
    plantilla_id: plantillaId,
    usuario_id: usuarioId,
    fecha_compartido: new Date().toISOString(),
  }));

  const { data, error } = await supabase
    .from('plantillas_compartidas')
    .insert(compartidos)
    .select();

  if (error) throw error;
  return data;
}

/**
 * Incrementa el contador de usos de una plantilla
 */
export async function incrementarUsos(plantillaId: string) {
  const { data, error } = await supabase.rpc('incrementar_usos_plantilla', {
    plantilla_id: plantillaId
  });

  if (error) throw error;
  return data;
}

/**
 * Actualiza la efectividad de una plantilla basada en resultados
 */
export async function actualizarEfectividad(plantillaId: string, nuevaEfectividad: number) {
  const { data, error } = await supabase
    .from('plantillas_dieta')
    .update({ 
      efectividad: nuevaEfectividad,
      fecha_actualizacion: new Date().toISOString(),
    })
    .eq('id', plantillaId)
    .select()
    .single();

  if (error) throw error;
  return data;
}

