import { supabase } from '../../../lib/supabase';

export interface Reto {
  id: string;
  tipo: 'personal' | 'grupal';
  nombre: string;
  descripcion: string;
  duracion_dias: number;
  fecha_inicio: string;
  fecha_fin: string;
  objetivos: string[];
  reglas: string[];
  estado: 'borrador' | 'publicado' | 'activo' | 'finalizado';
  max_participantes?: number;
  categoria: 'duracion' | 'objetivo' | 'actividad' | 'estacional' | 'tematico' | 'grupo' | 'especialidad';
  imagen_url?: string;
  created_at: string;
  updated_at: string;
}

export interface CrearRetoData {
  tipo: 'personal' | 'grupal';
  nombre: string;
  descripcion: string;
  duracion_dias: number;
  fecha_inicio: string;
  objetivos: string[];
  reglas: string[];
  max_participantes?: number;
  categoria: 'duracion' | 'objetivo' | 'actividad' | 'estacional' | 'tematico' | 'grupo' | 'especialidad';
  imagen_url?: string;
}

// Obtener todos los retos
export async function getRetos(filtros?: {
  tipo?: 'personal' | 'grupal';
  estado?: string;
  categoria?: string;
}) {
  try {
    let query = supabase
      .from('eventos_retos')
      .select('*')
      .order('fecha_inicio', { ascending: false });

    if (filtros?.tipo) {
      query = query.eq('tipo', filtros.tipo);
    }
    if (filtros?.estado) {
      query = query.eq('estado', filtros.estado);
    }
    if (filtros?.categoria) {
      query = query.eq('categoria', filtros.categoria);
    }

    const { data, error } = await query;

    if (error) throw error;
    return { data: data as Reto[], error: null };
  } catch (error) {
    console.error('Error al obtener retos:', error);
    return { data: null, error };
  }
}

// Obtener un reto por ID
export async function getRetoById(id: string) {
  try {
    const { data, error } = await supabase
      .from('eventos_retos')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return { data: data as Reto, error: null };
  } catch (error) {
    console.error('Error al obtener reto:', error);
    return { data: null, error };
  }
}

// Crear nuevo reto
export async function crearReto(retoData: CrearRetoData) {
  try {
    const fecha_fin = new Date(retoData.fecha_inicio);
    fecha_fin.setDate(fecha_fin.getDate() + retoData.duracion_dias);

    const { data, error } = await supabase
      .from('eventos_retos')
      .insert([{
        ...retoData,
        fecha_fin: fecha_fin.toISOString(),
        estado: 'borrador',
      }])
      .select()
      .single();

    if (error) throw error;
    return { data: data as Reto, error: null };
  } catch (error) {
    console.error('Error al crear reto:', error);
    return { data: null, error };
  }
}

// Actualizar reto
export async function actualizarReto(id: string, actualizaciones: Partial<CrearRetoData>) {
  try {
    const updateData: any = {
      ...actualizaciones,
      updated_at: new Date().toISOString(),
    };

    if (actualizaciones.fecha_inicio && actualizaciones.duracion_dias) {
      const fecha_fin = new Date(actualizaciones.fecha_inicio);
      fecha_fin.setDate(fecha_fin.getDate() + actualizaciones.duracion_dias);
      updateData.fecha_fin = fecha_fin.toISOString();
    }

    const { data, error } = await supabase
      .from('eventos_retos')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return { data: data as Reto, error: null };
  } catch (error) {
    console.error('Error al actualizar reto:', error);
    return { data: null, error };
  }
}

// Eliminar reto
export async function eliminarReto(id: string) {
  try {
    const { error } = await supabase
      .from('eventos_retos')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return { error: null };
  } catch (error) {
    console.error('Error al eliminar reto:', error);
    return { error };
  }
}

// Publicar reto
export async function publicarReto(id: string) {
  try {
    const { data, error } = await supabase
      .from('eventos_retos')
      .update({ estado: 'publicado', updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return { data: data as Reto, error: null };
  } catch (error) {
    console.error('Error al publicar reto:', error);
    return { data: null, error };
  }
}

// Iniciar reto
export async function iniciarReto(id: string) {
  try {
    const { data, error } = await supabase
      .from('eventos_retos')
      .update({ estado: 'activo', updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return { data: data as Reto, error: null };
  } catch (error) {
    console.error('Error al iniciar reto:', error);
    return { data: null, error };
  }
}

// Finalizar reto
export async function finalizarReto(id: string) {
  try {
    const { data, error } = await supabase
      .from('eventos_retos')
      .update({ estado: 'finalizado', updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return { data: data as Reto, error: null };
  } catch (error) {
    console.error('Error al finalizar reto:', error);
    return { data: null, error };
  }
}

