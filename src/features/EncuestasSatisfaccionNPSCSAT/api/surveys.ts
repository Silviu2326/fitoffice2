import { supabase } from '../../../lib/supabase';

export interface Survey {
  id: string;
  title: string;
  type: 'NPS' | 'CSAT';
  status: 'draft' | 'active' | 'completed';
  questions: any[];
  created_at: string;
  updated_at: string;
  responses_count: number;
}

export interface SurveyResponse {
  id: string;
  survey_id: string;
  client_id: string;
  responses: any;
  score: number;
  feedback?: string;
  created_at: string;
}

/**
 * Obtiene todas las encuestas
 */
export async function getSurveys() {
  const { data, error } = await supabase
    .from('surveys')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data as Survey[];
}

/**
 * Obtiene una encuesta por ID
 */
export async function getSurveyById(id: string) {
  const { data, error } = await supabase
    .from('surveys')
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw error;
  return data as Survey;
}

/**
 * Crea una nueva encuesta
 */
export async function createSurvey(survey: Partial<Survey>) {
  const { data, error } = await supabase
    .from('surveys')
    .insert([survey])
    .select()
    .single();

  if (error) throw error;
  return data as Survey;
}

/**
 * Actualiza una encuesta existente
 */
export async function updateSurvey(id: string, updates: Partial<Survey>) {
  const { data, error } = await supabase
    .from('surveys')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data as Survey;
}

/**
 * Elimina una encuesta
 */
export async function deleteSurvey(id: string) {
  const { error } = await supabase
    .from('surveys')
    .delete()
    .eq('id', id);

  if (error) throw error;
}

/**
 * Envía una encuesta a clientes
 */
export async function sendSurvey(surveyId: string, clientIds: string[]) {
  // TODO: Implementar lógica de envío de encuestas
  // Esto podría integrar con servicios de email, SMS, WhatsApp, etc.
  console.log('Sending survey', surveyId, 'to clients', clientIds);
  return { success: true, sent: clientIds.length };
}

/**
 * Obtiene respuestas de una encuesta
 */
export async function getSurveyResponses(surveyId: string) {
  const { data, error } = await supabase
    .from('survey_responses')
    .select('*')
    .eq('survey_id', surveyId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data as SurveyResponse[];
}

/**
 * Registra una respuesta de encuesta
 */
export async function submitSurveyResponse(response: Partial<SurveyResponse>) {
  const { data, error } = await supabase
    .from('survey_responses')
    .insert([response])
    .select()
    .single();

  if (error) throw error;
  return data as SurveyResponse;
}

