import { supabase } from '../../../lib/supabase';

/**
 * API para el Editor de Entrenamiento
 * Gestiona las operaciones del editor universal de entrenamiento
 */

export interface EditorConfig {
  id?: string;
  user_id: string;
  preferences: {
    unidades: 'metric' | 'imperial';
    vistaDefecto: 'lista' | 'tarjeta';
    autoguardado: boolean;
  };
  created_at?: string;
  updated_at?: string;
}

/**
 * Obtiene la configuración del editor para el usuario actual
 */
export const getEditorConfig = async (userId: string): Promise<EditorConfig | null> => {
  try {
    const { data, error } = await supabase
      .from('editor_config')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        // No existe configuración, retornar null
        return null;
      }
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error al obtener configuración del editor:', error);
    throw error;
  }
};

/**
 * Actualiza la configuración del editor
 */
export const updateEditorConfig = async (userId: string, config: Partial<EditorConfig>): Promise<EditorConfig> => {
  try {
    const { data, error } = await supabase
      .from('editor_config')
      .upsert({
        user_id: userId,
        ...config,
        updated_at: new Date().toISOString()
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error al actualizar configuración del editor:', error);
    throw error;
  }
};

/**
 * Obtiene las plantillas de sesión disponibles
 */
export const getPlantillasSesion = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from('plantillas_sesion')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error al obtener plantillas:', error);
    throw error;
  }
};

/**
 * Duplica una sesión existente
 */
export const duplicarSesion = async (sesionId: string, userId: string) => {
  try {
    // Obtener la sesión original
    const { data: sesionOriginal, error: fetchError } = await supabase
      .from('sesiones_entrenamiento')
      .select('*')
      .eq('id', sesionId)
      .single();

    if (fetchError) throw fetchError;

    // Crear copia sin el ID
    const { id, created_at, updated_at, ...sesionData } = sesionOriginal;
    const nuevaSesion = {
      ...sesionData,
      nombre: `${sesionData.nombre} (Copia)`,
      user_id: userId
    };

    const { data, error } = await supabase
      .from('sesiones_entrenamiento')
      .insert(nuevaSesion)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error al duplicar sesión:', error);
    throw error;
  }
};

