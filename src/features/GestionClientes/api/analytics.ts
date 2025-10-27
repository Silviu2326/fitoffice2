import { supabase } from '../../../lib/supabase';

export interface ChurnMetrics {
  churnRate: number;
  clientesPerdidosMes: number;
  valorPerdidoMes: number;
  tasaRetencion: number;
  tiempoVidaPromedio: number;
  valorTotalVida: number;
}

export interface MotivoBaja {
  motivo: string;
  cantidad: number;
  porcentaje: number;
}

export interface TendenciaMensual {
  mes: string;
  año: number;
  churnRate: number;
  nuevosClientes: number;
  clientesPerdidos: number;
  clientesActivos: number;
}

export interface SegmentoRiesgo {
  segmento: string;
  clientesTotales: number;
  clientesRiesgo: number;
  porcentajeRiesgo: number;
  tasaRetencion: number;
}

/**
 * Obtiene las métricas principales de churn
 */
export async function getChurnMetrics(): Promise<ChurnMetrics> {
  // TODO: Implementar cálculos reales con datos de la base de datos
  
  // Ejemplo de consultas que se necesitarían:
  // - Total de clientes al inicio del mes
  // - Total de clientes perdidos este mes
  // - Valor promedio por cliente
  // - Tiempo promedio como cliente antes de la baja
  
  return {
    churnRate: 8.5,
    clientesPerdidosMes: 12,
    valorPerdidoMes: 2400,
    tasaRetencion: 91.5,
    tiempoVidaPromedio: 18,
    valorTotalVida: 3200
  };
}

/**
 * Obtiene el análisis de motivos de baja
 */
export async function getMotivosBaja(): Promise<MotivoBaja[]> {
  const { data, error } = await supabase
    .from('clientes')
    .select('motivo_baja')
    .eq('estado', 'perdido')
    .not('motivo_baja', 'is', null);

  if (error) {
    console.error('Error fetching motivos baja:', error);
    throw error;
  }

  // Agrupar y contar motivos
  const motivosCount: Record<string, number> = {};
  data?.forEach(item => {
    const motivo = item.motivo_baja;
    motivosCount[motivo] = (motivosCount[motivo] || 0) + 1;
  });

  const total = data?.length || 1;
  
  return Object.entries(motivosCount).map(([motivo, cantidad]) => ({
    motivo,
    cantidad,
    porcentaje: (cantidad / total) * 100
  })).sort((a, b) => b.cantidad - a.cantidad);
}

/**
 * Obtiene la tendencia mensual de churn
 */
export async function getTendenciaMensual(meses: number = 6): Promise<TendenciaMensual[]> {
  // TODO: Implementar consultas para obtener datos históricos mensuales
  
  // Ejemplo de datos que se retornarían
  return [
    { mes: 'Mayo', año: 2025, churnRate: 7.2, nuevosClientes: 25, clientesPerdidos: 10, clientesActivos: 139 },
    { mes: 'Junio', año: 2025, churnRate: 6.8, nuevosClientes: 30, clientesPerdidos: 9, clientesActivos: 160 },
    { mes: 'Julio', año: 2025, churnRate: 8.1, nuevosClientes: 22, clientesPerdidos: 11, clientesActivos: 171 },
    { mes: 'Agosto', año: 2025, churnRate: 9.5, nuevosClientes: 18, clientesPerdidos: 14, clientesActivos: 175 },
    { mes: 'Septiembre', año: 2025, churnRate: 7.8, nuevosClientes: 28, clientesPerdidos: 10, clientesActivos: 193 },
    { mes: 'Octubre', año: 2025, churnRate: 8.5, nuevosClientes: 24, clientesPerdidos: 12, clientesActivos: 205 }
  ];
}

/**
 * Obtiene el análisis de segmentos de riesgo
 */
export async function getSegmentosRiesgo(): Promise<SegmentoRiesgo[]> {
  // TODO: Implementar análisis por segmentos temporales
  
  return [
    { 
      segmento: 'Menos de 3 meses',
      clientesTotales: 45,
      clientesRiesgo: 25,
      porcentajeRiesgo: 56,
      tasaRetencion: 44
    },
    { 
      segmento: '3-6 meses',
      clientesTotales: 38,
      clientesRiesgo: 12,
      porcentajeRiesgo: 32,
      tasaRetencion: 68
    },
    { 
      segmento: '6-12 meses',
      clientesTotales: 52,
      clientesRiesgo: 8,
      porcentajeRiesgo: 15,
      tasaRetencion: 85
    },
    { 
      segmento: 'Más de 1 año',
      clientesTotales: 120,
      clientesRiesgo: 10,
      porcentajeRiesgo: 8,
      tasaRetencion: 92
    }
  ];
}

/**
 * Calcula el Customer Lifetime Value (CLV)
 */
export async function calculateCLV(clienteId?: string): Promise<number> {
  // TODO: Implementar cálculo real de CLV
  // CLV = (Valor promedio de compra) × (Número de transacciones) × (Tiempo de vida del cliente)
  
  return 3200;
}

/**
 * Obtiene predicción de churn para un cliente específico
 */
export async function predictChurn(clienteId: string): Promise<{
  probabilidad: number;
  nivel: 'bajo' | 'medio' | 'alto';
  factores: string[];
}> {
  // TODO: Implementar modelo de predicción basado en:
  // - Adherencia actual vs histórica
  // - Frecuencia de cancelaciones
  // - Tiempo sin actividad
  // - Estado de pagos
  // - Engagement con el contenido
  
  return {
    probabilidad: 0,
    nivel: 'bajo',
    factores: []
  };
}

/**
 * Genera reporte de retención completo
 */
export async function generateRetentionReport(periodo: 'mes' | 'trimestre' | 'año'): Promise<{
  metricas: ChurnMetrics;
  motivosBaja: MotivoBaja[];
  tendencia: TendenciaMensual[];
  segmentos: SegmentoRiesgo[];
  recomendaciones: string[];
}> {
  const metricas = await getChurnMetrics();
  const motivosBaja = await getMotivosBaja();
  const tendencia = await getTendenciaMensual();
  const segmentos = await getSegmentosRiesgo();
  
  // Generar recomendaciones basadas en los datos
  const recomendaciones = generateRecommendations(metricas, motivosBaja, segmentos);
  
  return {
    metricas,
    motivosBaja,
    tendencia,
    segmentos,
    recomendaciones
  };
}

/**
 * Genera recomendaciones automáticas
 */
function generateRecommendations(
  metricas: ChurnMetrics,
  motivosBaja: MotivoBaja[],
  segmentos: SegmentoRiesgo[]
): string[] {
  const recomendaciones: string[] = [];
  
  // Analizar churn rate
  if (metricas.churnRate > 10) {
    recomendaciones.push('Churn rate elevado - Implementar programa de retención urgente');
  }
  
  // Analizar motivos de baja
  const motivoPrincipal = motivosBaja[0];
  if (motivoPrincipal && motivoPrincipal.porcentaje > 30) {
    recomendaciones.push(`Foco en ${motivoPrincipal.motivo} - representa el ${motivoPrincipal.porcentaje.toFixed(1)}% de las bajas`);
  }
  
  // Analizar segmentos de riesgo
  const segmentoMayorRiesgo = segmentos.sort((a, b) => b.porcentajeRiesgo - a.porcentajeRiesgo)[0];
  if (segmentoMayorRiesgo && segmentoMayorRiesgo.porcentajeRiesgo > 40) {
    recomendaciones.push(`Mejorar onboarding para ${segmentoMayorRiesgo.segmento} - ${segmentoMayorRiesgo.porcentajeRiesgo}% en riesgo`);
  }
  
  return recomendaciones;
}

