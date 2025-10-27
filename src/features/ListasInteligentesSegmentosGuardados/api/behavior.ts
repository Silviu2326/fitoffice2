import { supabase } from '../../../lib/supabase';

export interface BehaviorPattern {
  id: string;
  pattern_name: string;
  description: string;
  frequency: number;
  impact: 'high' | 'medium' | 'low';
  trend: number;
  detected_at: string;
}

export interface ClientBehavior {
  client_id: string;
  event_type: string;
  event_data: Record<string, any>;
  timestamp: string;
}

/**
 * Obtiene los patrones de comportamiento detectados
 */
export async function getBehaviorPatterns() {
  const { data, error } = await supabase
    .from('behavior_patterns')
    .select('*')
    .order('frequency', { ascending: false });

  if (error) {
    console.error('Error fetching behavior patterns:', error);
    throw error;
  }

  return data;
}

/**
 * Analiza el comportamiento de los clientes
 */
export async function analyzeBehavior(clientId?: string) {
  const query = supabase
    .from('client_behaviors')
    .select('*')
    .order('timestamp', { ascending: false })
    .limit(1000);

  if (clientId) {
    query.eq('client_id', clientId);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error analyzing behavior:', error);
    throw error;
  }

  return data;
}

/**
 * Registra un evento de comportamiento del cliente
 */
export async function trackClientBehavior(behaviorData: Omit<ClientBehavior, 'timestamp'>) {
  const { data, error } = await supabase
    .from('client_behaviors')
    .insert([{
      ...behaviorData,
      timestamp: new Date().toISOString()
    }])
    .select()
    .single();

  if (error) {
    console.error('Error tracking behavior:', error);
    throw error;
  }

  return data;
}

/**
 * Obtiene el historial de comportamiento de un cliente
 */
export async function getClientBehaviorHistory(clientId: string, limit = 50) {
  const { data, error } = await supabase
    .from('client_behaviors')
    .select('*')
    .eq('client_id', clientId)
    .order('timestamp', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('Error fetching client behavior history:', error);
    throw error;
  }

  return data;
}

/**
 * Identifica clientes en riesgo de abandono
 */
export async function identifyChurnRisk() {
  // En una implementación real, esto ejecutaría análisis predictivo
  // basado en patrones de comportamiento
  const { data, error } = await supabase
    .from('client_behaviors')
    .select('client_id, event_type, timestamp')
    .gte('timestamp', new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString());

  if (error) {
    console.error('Error identifying churn risk:', error);
    throw error;
  }

  // Análisis simplificado de actividad
  const clientActivity = new Map<string, number>();
  data.forEach(event => {
    clientActivity.set(event.client_id, (clientActivity.get(event.client_id) || 0) + 1);
  });

  const atRiskClients = Array.from(clientActivity.entries())
    .filter(([_, count]) => count < 3)
    .map(([clientId]) => clientId);

  return atRiskClients;
}

