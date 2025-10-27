import { supabase } from '../../../lib/supabase';
import { calculateNPS } from './nps';
import { calculateCSAT } from './csat';

export interface AnalyticsOverview {
  nps: number;
  csat: number;
  responseRate: number;
  totalSurveys: number;
  totalResponses: number;
  trend: 'up' | 'down' | 'stable';
}

/**
 * Obtiene el resumen general de analytics
 */
export async function getAnalyticsOverview(): Promise<AnalyticsOverview> {
  // Obtener todas las respuestas
  const { data: responses, error } = await supabase
    .from('survey_responses')
    .select('score, survey_type');

  if (error) throw error;

  const npsScores = responses.filter(r => r.survey_type === 'NPS').map(r => r.score);
  const csatScores = responses.filter(r => r.survey_type === 'CSAT').map(r => r.score);

  const npsMetrics = calculateNPS(npsScores);
  const csatMetrics = calculateCSAT(csatScores);

  return {
    nps: npsMetrics.npsScore,
    csat: csatMetrics.averageScore,
    responseRate: 68, // TODO: Calcular basado en enviados vs recibidos
    totalSurveys: 15,
    totalResponses: responses.length,
    trend: 'up'
  };
}

/**
 * Obtiene palabras clave más mencionadas en feedback
 */
export async function getTopKeywords(limit: number = 10) {
  const { data, error } = await supabase
    .from('survey_responses')
    .select('feedback')
    .not('feedback', 'is', null);

  if (error) throw error;

  // Análisis básico de texto
  const wordCounts: Record<string, number> = {};
  
  data.forEach(response => {
    if (response.feedback) {
      const words = response.feedback
        .toLowerCase()
        .split(/\s+/)
        .filter(word => word.length > 3); // Filtrar palabras cortas
      
      words.forEach(word => {
        wordCounts[word] = (wordCounts[word] || 0) + 1;
      });
    }
  });

  // Convertir a array y ordenar
  const keywords = Object.entries(wordCounts)
    .map(([word, count]) => ({ word, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, limit);

  return keywords;
}

/**
 * Obtiene análisis de sentimiento general
 */
export async function getSentimentAnalysis() {
  const { data, error } = await supabase
    .from('survey_responses')
    .select('score, feedback, survey_type');

  if (error) throw error;

  let positive = 0;
  let neutral = 0;
  let negative = 0;

  data.forEach(response => {
    if (response.survey_type === 'NPS') {
      if (response.score >= 9) positive++;
      else if (response.score >= 7) neutral++;
      else negative++;
    } else if (response.survey_type === 'CSAT') {
      if (response.score >= 4) positive++;
      else if (response.score === 3) neutral++;
      else negative++;
    }
  });

  const total = data.length;
  
  return {
    positive: Math.round((positive / total) * 100),
    neutral: Math.round((neutral / total) * 100),
    negative: Math.round((negative / total) * 100),
    totalResponses: total
  };
}

/**
 * Obtiene comparación entre equipos
 */
export async function getTeamComparison() {
  // TODO: Implementar cuando se tenga la relación con equipos
  // Por ahora retornamos datos de ejemplo
  
  return [
    { team: 'Equipo A', nps: 48, csat: 4.5, responses: 45 },
    { team: 'Equipo B', nps: 42, csat: 4.2, responses: 38 },
    { team: 'Equipo C', nps: 38, csat: 4.0, responses: 32 }
  ];
}

/**
 * Obtiene comparación por departamento
 */
export async function getDepartmentComparison() {
  const departments = ['Clases', 'Instalaciones', 'Atención', 'Equipamiento'];
  
  const comparisons = await Promise.all(
    departments.map(async (dept) => {
      const { data, error } = await supabase
        .from('survey_responses')
        .select('score, survey_type')
        .eq('category', dept);

      if (error) return null;

      const npsScores = data.filter(r => r.survey_type === 'NPS').map(r => r.score);
      const csatScores = data.filter(r => r.survey_type === 'CSAT').map(r => r.score);

      const npsMetrics = calculateNPS(npsScores);
      const csatMetrics = calculateCSAT(csatScores);

      return {
        department: dept,
        nps: npsMetrics.npsScore,
        csat: csatMetrics.averageScore,
        responses: data.length
      };
    })
  );

  return comparisons.filter(c => c !== null);
}

/**
 * Exporta datos de analytics a CSV
 */
export async function exportAnalyticsToCSV() {
  const { data, error } = await supabase
    .from('survey_responses')
    .select('*, surveys(title), clients(name, email)')
    .order('created_at', { ascending: false });

  if (error) throw error;

  // Convertir a formato CSV
  const headers = ['Fecha', 'Cliente', 'Encuesta', 'Tipo', 'Puntuación', 'Feedback'];
  const rows = data.map(r => [
    r.created_at,
    r.clients?.name || '',
    r.surveys?.title || '',
    r.survey_type,
    r.score,
    r.feedback || ''
  ]);

  const csv = [
    headers.join(','),
    ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
  ].join('\n');

  return csv;
}

/**
 * Obtiene acciones recomendadas basadas en métricas
 */
export async function getRecommendedActions() {
  const overview = await getAnalyticsOverview();
  const sentiment = await getSentimentAnalysis();

  const actions = [];

  // Analizar detractores
  if (sentiment.negative > 15) {
    actions.push({
      type: 'critical',
      icon: 'alert',
      title: `${sentiment.negative}% de respuestas negativas`,
      description: 'Contactar clientes insatisfechos para resolver problemas',
      priority: 'high'
    });
  }

  // Analizar promotores
  if (sentiment.positive > 50) {
    actions.push({
      type: 'opportunity',
      icon: 'star',
      title: `${sentiment.positive}% de respuestas positivas`,
      description: 'Solicitar testimonios y referencias de clientes promotores',
      priority: 'medium'
    });
  }

  // Analizar tasa de respuesta
  if (overview.responseRate < 60) {
    actions.push({
      type: 'improvement',
      icon: 'target',
      title: `Tasa de respuesta del ${overview.responseRate}%`,
      description: 'Considerar incentivos para aumentar participación',
      priority: 'medium'
    });
  }

  return actions;
}

