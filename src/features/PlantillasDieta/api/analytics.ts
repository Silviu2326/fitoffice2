import { supabase } from '../../../lib/supabase';

export interface AnalyticsPlantilla {
  plantilla_id: string;
  total_usos: number;
  total_asignaciones: number;
  tasa_completitud: number;
  efectividad_promedio: number;
  clientes_satisfechos: number;
  tiempo_promedio_uso: number;
}

export interface MetricasGlobales {
  total_plantillas: number;
  plantilla_mas_usada: string;
  efectividad_media: number;
  total_categorias: number;
  plantillas_activas: number;
  plantillas_mes_actual: number;
}

/**
 * GET /api/nutricion/plantillas/analytics
 * Obtiene analytics generales de las plantillas
 */
export async function obtenerAnalyticsGlobales(): Promise<MetricasGlobales> {
  // Total de plantillas
  const { count: totalPlantillas } = await supabase
    .from('plantillas_dieta')
    .select('*', { count: 'exact', head: true })
    .eq('activa', true);

  // Plantilla más usada
  const { data: masUsada } = await supabase
    .from('plantillas_dieta')
    .select('nombre')
    .eq('activa', true)
    .order('usos', { ascending: false })
    .limit(1)
    .single();

  // Efectividad media
  const { data: plantillas } = await supabase
    .from('plantillas_dieta')
    .select('efectividad')
    .eq('activa', true);

  const efectividadMedia = plantillas && plantillas.length > 0
    ? plantillas.reduce((sum, p) => sum + (p.efectividad || 0), 0) / plantillas.length
    : 0;

  // Total de categorías
  const { count: totalCategorias } = await supabase
    .from('categorias_nutricionales')
    .select('*', { count: 'exact', head: true })
    .eq('activa', true);

  // Plantillas del mes actual
  const primerDiaMes = new Date();
  primerDiaMes.setDate(1);
  primerDiaMes.setHours(0, 0, 0, 0);

  const { count: plantillasMes } = await supabase
    .from('plantillas_dieta')
    .select('*', { count: 'exact', head: true })
    .eq('activa', true)
    .gte('fecha_creacion', primerDiaMes.toISOString());

  return {
    total_plantillas: totalPlantillas || 0,
    plantilla_mas_usada: masUsada?.nombre || 'N/A',
    efectividad_media: Math.round(efectividadMedia * 100) / 100,
    total_categorias: totalCategorias || 0,
    plantillas_activas: totalPlantillas || 0,
    plantillas_mes_actual: plantillasMes || 0,
  };
}

/**
 * Obtiene analytics específicos de una plantilla
 */
export async function obtenerAnalyticsPlantilla(plantillaId: string): Promise<AnalyticsPlantilla> {
  const { data: plantilla, error } = await supabase
    .from('plantillas_dieta')
    .select(`
      *,
      asignaciones_dieta(
        id,
        completada,
        satisfaccion,
        fecha_inicio,
        fecha_fin
      )
    `)
    .eq('id', plantillaId)
    .single();

  if (error) throw error;

  const asignaciones = (plantilla as any).asignaciones_dieta || [];
  const totalAsignaciones = asignaciones.length;
  const asignacionesCompletadas = asignaciones.filter((a: any) => a.completada).length;
  const tasaCompletitud = totalAsignaciones > 0 ? (asignacionesCompletadas / totalAsignaciones) * 100 : 0;

  // Calcular satisfacción promedio
  const satisfacciones = asignaciones
    .filter((a: any) => a.satisfaccion !== null)
    .map((a: any) => a.satisfaccion);
  const clientesSatisfechos = satisfacciones.filter((s: number) => s >= 4).length;

  // Tiempo promedio de uso
  const tiemposUso = asignaciones
    .filter((a: any) => a.fecha_inicio && a.fecha_fin)
    .map((a: any) => {
      const inicio = new Date(a.fecha_inicio);
      const fin = new Date(a.fecha_fin);
      return (fin.getTime() - inicio.getTime()) / (1000 * 60 * 60 * 24); // días
    });
  
  const tiempoPromedioUso = tiemposUso.length > 0
    ? tiemposUso.reduce((sum, t) => sum + t, 0) / tiemposUso.length
    : 0;

  return {
    plantilla_id: plantillaId,
    total_usos: plantilla.usos || 0,
    total_asignaciones: totalAsignaciones,
    tasa_completitud: Math.round(tasaCompletitud * 100) / 100,
    efectividad_promedio: plantilla.efectividad || 0,
    clientes_satisfechos: clientesSatisfechos,
    tiempo_promedio_uso: Math.round(tiempoPromedioUso * 10) / 10,
  };
}

/**
 * Obtiene tendencias de uso de plantillas por período
 */
export async function obtenerTendenciasUso(diasAtras: number = 30) {
  const fechaInicio = new Date();
  fechaInicio.setDate(fechaInicio.getDate() - diasAtras);

  const { data, error } = await supabase
    .from('plantillas_dieta')
    .select(`
      id,
      nombre,
      usos,
      fecha_creacion,
      asignaciones_dieta(
        fecha_inicio
      )
    `)
    .eq('activa', true)
    .gte('asignaciones_dieta.fecha_inicio', fechaInicio.toISOString());

  if (error) throw error;

  // Procesar datos para tendencias
  const tendencias = data?.map((plantilla: any) => {
    const asignacionesRecientes = (plantilla.asignaciones_dieta || [])
      .filter((a: any) => new Date(a.fecha_inicio) >= fechaInicio);

    return {
      plantilla_id: plantilla.id,
      nombre: plantilla.nombre,
      usos_recientes: asignacionesRecientes.length,
      usos_totales: plantilla.usos,
      tendencia: asignacionesRecientes.length > 0 ? 'creciente' : 'estable',
    };
  });

  return tendencias;
}

/**
 * Obtiene comparativa de efectividad entre plantillas
 */
export async function obtenerComparativaEfectividad() {
  const { data, error } = await supabase
    .from('plantillas_dieta')
    .select('id, nombre, categoria, efectividad, usos')
    .eq('activa', true)
    .order('efectividad', { ascending: false })
    .limit(10);

  if (error) throw error;
  return data;
}

/**
 * Obtiene distribución de plantillas por categoría
 */
export async function obtenerDistribucionCategorias() {
  const { data, error } = await supabase
    .from('plantillas_dieta')
    .select('categoria')
    .eq('activa', true);

  if (error) throw error;

  // Contar por categoría
  const distribucion = data?.reduce((acc: any, plantilla: any) => {
    const categoria = plantilla.categoria || 'Sin categoría';
    acc[categoria] = (acc[categoria] || 0) + 1;
    return acc;
  }, {});

  return Object.entries(distribucion || {}).map(([categoria, count]) => ({
    categoria,
    total: count,
  }));
}

/**
 * Obtiene reporte de rendimiento mensual
 */
export async function obtenerReporteMensual(mes: number, año: number) {
  const fechaInicio = new Date(año, mes - 1, 1);
  const fechaFin = new Date(año, mes, 0, 23, 59, 59);

  const { data: nuevasPlantillas, error: errorNuevas } = await supabase
    .from('plantillas_dieta')
    .select('*')
    .gte('fecha_creacion', fechaInicio.toISOString())
    .lte('fecha_creacion', fechaFin.toISOString());

  const { data: asignaciones, error: errorAsignaciones } = await supabase
    .from('asignaciones_dieta')
    .select('*, plantillas_dieta(*)')
    .gte('fecha_inicio', fechaInicio.toISOString())
    .lte('fecha_inicio', fechaFin.toISOString());

  if (errorNuevas || errorAsignaciones) {
    throw errorNuevas || errorAsignaciones;
  }

  return {
    plantillas_creadas: nuevasPlantillas?.length || 0,
    asignaciones_realizadas: asignaciones?.length || 0,
    plantillas_mas_asignadas: asignaciones
      ? Object.entries(
          asignaciones.reduce((acc: any, a: any) => {
            const nombre = a.plantillas_dieta?.nombre || 'Desconocida';
            acc[nombre] = (acc[nombre] || 0) + 1;
            return acc;
          }, {})
        )
          .sort(([, a], [, b]) => (b as number) - (a as number))
          .slice(0, 5)
          .map(([nombre, count]) => ({ nombre, asignaciones: count }))
      : [],
  };
}

