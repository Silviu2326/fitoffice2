import { supabase } from '../../../lib/supabase';

export interface NPSMetrics {
  npsScore: number;
  promoters: number;
  neutrals: number;
  detractors: number;
  totalResponses: number;
  responseRate: number;
}

/**
 * Calcula el Net Promoter Score
 * NPS = % Promotores (9-10) - % Detractores (0-6)
 */
export function calculateNPS(scores: number[]): NPSMetrics {
  if (scores.length === 0) {
    return {
      npsScore: 0,
      promoters: 0,
      neutrals: 0,
      detractors: 0,
      totalResponses: 0,
      responseRate: 0
    };
  }

  const promoters = scores.filter(s => s >= 9).length;
  const neutrals = scores.filter(s => s === 7 || s === 8).length;
  const detractors = scores.filter(s => s <= 6).length;
  const total = scores.length;

  const promoterPercentage = (promoters / total) * 100;
  const detractorPercentage = (detractors / total) * 100;
  const npsScore = Math.round(promoterPercentage - detractorPercentage);

  return {
    npsScore,
    promoters: Math.round((promoters / total) * 100),
    neutrals: Math.round((neutrals / total) * 100),
    detractors: Math.round((detractors / total) * 100),
    totalResponses: total,
    responseRate: 100 // This should be calculated based on sent vs received
  };
}

/**
 * Obtiene métricas NPS de la base de datos
 */
export async function getNPSMetrics(filters?: {
  startDate?: string;
  endDate?: string;
  surveyId?: string;
}) {
  let query = supabase
    .from('survey_responses')
    .select('score')
    .eq('survey_type', 'NPS');

  if (filters?.startDate) {
    query = query.gte('created_at', filters.startDate);
  }
  if (filters?.endDate) {
    query = query.lte('created_at', filters.endDate);
  }
  if (filters?.surveyId) {
    query = query.eq('survey_id', filters.surveyId);
  }

  const { data, error } = await query;

  if (error) throw error;

  const scores = data.map(r => r.score);
  return calculateNPS(scores);
}

/**
 * Obtiene la tendencia de NPS por período
 */
export async function getNPSTrend(period: 'week' | 'month' | 'quarter') {
  // TODO: Implementar lógica de agregación por período
  // Esto requiere consultas más complejas con agrupación por fecha
  
  // Mock data para demostración
  return [
    { period: 'Q1', nps: 35 },
    { period: 'Q2', nps: 38 },
    { period: 'Q3', nps: 42 },
    { period: 'Q4', nps: 45 }
  ];
}

/**
 * Clasifica un score NPS en categoría
 */
export function classifyNPSScore(score: number): 'promoter' | 'neutral' | 'detractor' {
  if (score >= 9) return 'promoter';
  if (score >= 7) return 'neutral';
  return 'detractor';
}

/**
 * Obtiene respuestas NPS con análisis de sentimiento
 */
export async function getNPSResponsesWithSentiment() {
  const { data, error } = await supabase
    .from('survey_responses')
    .select('*, clients(name, email)')
    .eq('survey_type', 'NPS')
    .order('created_at', { ascending: false })
    .limit(50);

  if (error) throw error;

  return data.map(response => ({
    ...response,
    category: classifyNPSScore(response.score),
    sentiment: analyzeSentiment(response.feedback)
  }));
}

/**
 * Análisis básico de sentimiento de texto
 */
function analyzeSentiment(text?: string): 'positive' | 'neutral' | 'negative' {
  if (!text) return 'neutral';
  
  const positiveWords = ['excelente', 'bueno', 'genial', 'perfecto', 'increíble', 'maravilloso'];
  const negativeWords = ['malo', 'terrible', 'pésimo', 'decepcionante', 'horrible', 'deficiente'];
  
  const textLower = text.toLowerCase();
  const positiveCount = positiveWords.filter(word => textLower.includes(word)).length;
  const negativeCount = negativeWords.filter(word => textLower.includes(word)).length;
  
  if (positiveCount > negativeCount) return 'positive';
  if (negativeCount > positiveCount) return 'negative';
  return 'neutral';
}

