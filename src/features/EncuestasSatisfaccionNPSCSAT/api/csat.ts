import { supabase } from '../../../lib/supabase';

export interface CSATMetrics {
  averageScore: number;
  totalResponses: number;
  satisfactionRate: number;
  distribution: {
    score1: number;
    score2: number;
    score3: number;
    score4: number;
    score5: number;
  };
}

/**
 * Calcula las métricas CSAT
 * CSAT es el porcentaje de clientes satisfechos (score 4-5 de 5)
 */
export function calculateCSAT(scores: number[]): CSATMetrics {
  if (scores.length === 0) {
    return {
      averageScore: 0,
      totalResponses: 0,
      satisfactionRate: 0,
      distribution: {
        score1: 0,
        score2: 0,
        score3: 0,
        score4: 0,
        score5: 0
      }
    };
  }

  const total = scores.length;
  const sum = scores.reduce((acc, score) => acc + score, 0);
  const averageScore = sum / total;
  
  // CSAT = (Respuestas 4-5) / Total * 100
  const satisfied = scores.filter(s => s >= 4).length;
  const satisfactionRate = (satisfied / total) * 100;

  const distribution = {
    score1: scores.filter(s => s === 1).length,
    score2: scores.filter(s => s === 2).length,
    score3: scores.filter(s => s === 3).length,
    score4: scores.filter(s => s === 4).length,
    score5: scores.filter(s => s === 5).length
  };

  return {
    averageScore: Math.round(averageScore * 10) / 10,
    totalResponses: total,
    satisfactionRate: Math.round(satisfactionRate),
    distribution
  };
}

/**
 * Obtiene métricas CSAT de la base de datos
 */
export async function getCSATMetrics(filters?: {
  startDate?: string;
  endDate?: string;
  surveyId?: string;
  category?: string;
}) {
  let query = supabase
    .from('survey_responses')
    .select('score, category')
    .eq('survey_type', 'CSAT');

  if (filters?.startDate) {
    query = query.gte('created_at', filters.startDate);
  }
  if (filters?.endDate) {
    query = query.lte('created_at', filters.endDate);
  }
  if (filters?.surveyId) {
    query = query.eq('survey_id', filters.surveyId);
  }
  if (filters?.category) {
    query = query.eq('category', filters.category);
  }

  const { data, error } = await query;

  if (error) throw error;

  const scores = data.map(r => r.score);
  return calculateCSAT(scores);
}

/**
 * Obtiene métricas CSAT por categoría
 */
export async function getCSATByCategory() {
  const categories = ['Clases', 'Instalaciones', 'Atención', 'Equipamiento'];
  
  const metricsPromises = categories.map(async (category) => {
    const metrics = await getCSATMetrics({ category });
    return {
      category,
      ...metrics
    };
  });

  return Promise.all(metricsPromises);
}

/**
 * Obtiene la tendencia de CSAT por período
 */
export async function getCSATTrend(period: 'week' | 'month' | 'quarter') {
  // TODO: Implementar lógica de agregación por período
  
  // Mock data para demostración
  return [
    { period: 'Q1', csat: 3.8 },
    { period: 'Q2', csat: 4.0 },
    { period: 'Q3', csat: 4.2 },
    { period: 'Q4', csat: 4.4 }
  ];
}

/**
 * Clasifica un score CSAT
 */
export function classifyCSATScore(score: number): 'very_satisfied' | 'satisfied' | 'neutral' | 'dissatisfied' | 'very_dissatisfied' {
  if (score === 5) return 'very_satisfied';
  if (score === 4) return 'satisfied';
  if (score === 3) return 'neutral';
  if (score === 2) return 'dissatisfied';
  return 'very_dissatisfied';
}

/**
 * Obtiene respuestas CSAT recientes
 */
export async function getCSATResponses(limit: number = 50) {
  const { data, error } = await supabase
    .from('survey_responses')
    .select('*, clients(name, email)')
    .eq('survey_type', 'CSAT')
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) throw error;

  return data.map(response => ({
    ...response,
    classification: classifyCSATScore(response.score)
  }));
}

/**
 * Compara CSAT entre períodos
 */
export async function compareCSATPeriods(
  period1: { start: string; end: string },
  period2: { start: string; end: string }
) {
  const [metrics1, metrics2] = await Promise.all([
    getCSATMetrics({ startDate: period1.start, endDate: period1.end }),
    getCSATMetrics({ startDate: period2.start, endDate: period2.end })
  ]);

  const improvement = metrics2.averageScore - metrics1.averageScore;
  const improvementPercentage = ((improvement / metrics1.averageScore) * 100).toFixed(1);

  return {
    period1: metrics1,
    period2: metrics2,
    improvement,
    improvementPercentage: `${improvement > 0 ? '+' : ''}${improvementPercentage}%`
  };
}

