import { supabase } from '../../../lib/supabase';

export interface SegmentAnalytics {
  segment_id: string;
  segment_name: string;
  size: number;
  conversion_rate: number;
  revenue: number;
  engagement: number;
  retention_rate: number;
  period: string;
}

export interface PredictiveInsight {
  segment_id: string;
  prediction_type: string;
  confidence: number;
  predicted_value: number;
  recommendation: string;
}

/**
 * Obtiene analytics de un segmento específico
 */
export async function getSegmentAnalytics(segmentId: string, period = '30d') {
  const { data, error } = await supabase
    .from('segment_analytics')
    .select('*')
    .eq('segment_id', segmentId)
    .eq('period', period)
    .single();

  if (error) {
    console.error('Error fetching segment analytics:', error);
    throw error;
  }

  return data;
}

/**
 * Obtiene analytics comparativos de todos los segmentos
 */
export async function getAllSegmentsAnalytics(period = '30d') {
  const { data, error } = await supabase
    .from('segment_analytics')
    .select('*')
    .eq('period', period)
    .order('revenue', { ascending: false });

  if (error) {
    console.error('Error fetching all segments analytics:', error);
    throw error;
  }

  return data;
}

/**
 * Compara dos segmentos
 */
export async function compareSegments(segmentIdA: string, segmentIdB: string, period = '30d') {
  const { data, error } = await supabase
    .from('segment_analytics')
    .select('*')
    .in('segment_id', [segmentIdA, segmentIdB])
    .eq('period', period);

  if (error) {
    console.error('Error comparing segments:', error);
    throw error;
  }

  return data;
}

/**
 * Obtiene insights predictivos para un segmento
 */
export async function getPredictiveInsights(segmentId: string) {
  const { data, error } = await supabase
    .from('predictive_insights')
    .select('*')
    .eq('segment_id', segmentId)
    .order('confidence', { ascending: false });

  if (error) {
    console.error('Error fetching predictive insights:', error);
    throw error;
  }

  return data;
}

/**
 * Genera un reporte de rendimiento de segmentos
 */
export async function generateSegmentReport(segmentId: string, dateRange: { from: string; to: string }) {
  // En una implementación real, esto generaría un reporte completo
  const { data: analytics, error: analyticsError } = await supabase
    .from('segment_analytics')
    .select('*')
    .eq('segment_id', segmentId)
    .gte('created_at', dateRange.from)
    .lte('created_at', dateRange.to);

  if (analyticsError) {
    console.error('Error generating segment report:', analyticsError);
    throw analyticsError;
  }

  const { data: insights, error: insightsError } = await supabase
    .from('predictive_insights')
    .select('*')
    .eq('segment_id', segmentId);

  if (insightsError) {
    console.error('Error fetching insights for report:', insightsError);
    throw insightsError;
  }

  return {
    analytics,
    insights,
    generated_at: new Date().toISOString()
  };
}

/**
 * Calcula el ROI de un segmento
 */
export async function calculateSegmentROI(segmentId: string, period = '30d') {
  const analytics = await getSegmentAnalytics(segmentId, period);
  
  // Cálculo simplificado del ROI
  // En una implementación real, esto consideraría costos de adquisición, retención, etc.
  const roi = {
    segment_id: segmentId,
    revenue: analytics.revenue,
    estimated_cost: analytics.size * 50, // Coste estimado por cliente
    roi_percentage: ((analytics.revenue - (analytics.size * 50)) / (analytics.size * 50)) * 100,
    period
  };

  return roi;
}

