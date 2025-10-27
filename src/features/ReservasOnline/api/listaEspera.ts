// API para gestión de lista de espera

export interface PersonaListaEspera {
  id: string;
  cliente_id: string;
  servicio: string;
  fecha_deseada: string;
  hora_deseada: string;
  prioridad: 'alta' | 'media' | 'baja';
  notificado: boolean;
  fecha_registro: string;
  created_at: string;
}

/**
 * GET /api/agenda/lista-espera
 * Obtiene la lista de espera
 */
export async function obtenerListaEspera(): Promise<PersonaListaEspera[]> {
  try {
    // TODO: Implementar llamada a Supabase
    // const { data, error } = await supabase
    //   .from('lista_espera')
    //   .select('*')
    //   .order('prioridad', { ascending: false })
    //   .order('fecha_registro', { ascending: true });
    
    // if (error) throw error;
    // return data;
    
    return [];
  } catch (error) {
    console.error('Error al obtener lista de espera:', error);
    throw error;
  }
}

/**
 * POST /api/agenda/lista-espera
 * Añade una persona a la lista de espera
 */
export async function añadirListaEspera(
  persona: Omit<PersonaListaEspera, 'id' | 'created_at'>
): Promise<PersonaListaEspera> {
  try {
    // TODO: Implementar llamada a Supabase
    // const { data, error } = await supabase
    //   .from('lista_espera')
    //   .insert([persona])
    //   .select()
    //   .single();
    
    // if (error) throw error;
    // return data;
    
    return { ...persona, id: '1', created_at: new Date().toISOString() };
  } catch (error) {
    console.error('Error al añadir a lista de espera:', error);
    throw error;
  }
}

/**
 * DELETE /api/agenda/lista-espera/:id
 * Elimina una persona de la lista de espera
 */
export async function eliminarListaEspera(id: string): Promise<void> {
  try {
    // TODO: Implementar llamada a Supabase
    // const { error } = await supabase
    //   .from('lista_espera')
    //   .delete()
    //   .eq('id', id);
    
    // if (error) throw error;
  } catch (error) {
    console.error('Error al eliminar de lista de espera:', error);
    throw error;
  }
}

/**
 * POST /api/agenda/lista-espera/:id/notificar
 * Notifica a una persona de la lista de espera
 */
export async function notificarPersonaEspera(id: string): Promise<void> {
  try {
    // TODO: Implementar llamada a Supabase
    // const { error } = await supabase
    //   .from('lista_espera')
    //   .update({ notificado: true })
    //   .eq('id', id);
    
    // if (error) throw error;
  } catch (error) {
    console.error('Error al notificar persona en espera:', error);
    throw error;
  }
}

