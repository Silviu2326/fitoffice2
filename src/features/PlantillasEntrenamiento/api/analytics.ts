// API Mock para analytics de plantillas

export interface PlantillaMetrica {
  id: string;
  nombre: string;
  usos: number;
  efectividad: number;
  tasaFinalizacion: number;
  satisfaccion: number;
  tendencia: 'up' | 'down' | 'neutral';
}

export interface MetricaGeneral {
  totalUsos: number;
  efectividadPromedio: number;
  tasaFinalizacionPromedio: number;
  satisfaccionMedia: number;
}

export interface PlantillaUsage {
  plantillaId: string;
  fecha: string;
  usos: number;
}

class AnalyticsAPI {
  // GET /api/entrenamiento/plantillas/analytics
  async getMetricasGenerales(): Promise<MetricaGeneral> {
    await new Promise(resolve => setTimeout(resolve, 300));

    return {
      totalUsos: 191,
      efectividadPromedio: 87.4,
      tasaFinalizacionPromedio: 83,
      satisfaccionMedia: 4.6
    };
  }

  // GET /api/entrenamiento/plantillas/analytics/plantillas
  async getMetricasPorPlantilla(): Promise<PlantillaMetrica[]> {
    await new Promise(resolve => setTimeout(resolve, 300));

    return [
      {
        id: '1',
        nombre: 'Full Body 3 Días',
        usos: 67,
        efectividad: 90,
        tasaFinalizacion: 89,
        satisfaccion: 4.7,
        tendencia: 'up'
      },
      {
        id: '2',
        nombre: 'Hipertrofia 12 Semanas',
        usos: 45,
        efectividad: 92,
        tasaFinalizacion: 78,
        satisfaccion: 4.8,
        tendencia: 'up'
      },
      {
        id: '3',
        nombre: 'Pierna 2x/Semana',
        usos: 32,
        efectividad: 88,
        tasaFinalizacion: 85,
        satisfaccion: 4.6,
        tendencia: 'neutral'
      },
      {
        id: '4',
        nombre: 'Cardio HIIT Intensivo',
        usos: 28,
        efectividad: 85,
        tasaFinalizacion: 72,
        satisfaccion: 4.3,
        tendencia: 'down'
      },
      {
        id: '5',
        nombre: 'Movilidad y Flexibilidad',
        usos: 19,
        efectividad: 82,
        tasaFinalizacion: 91,
        satisfaccion: 4.5,
        tendencia: 'up'
      }
    ];
  }

  // GET /api/entrenamiento/plantillas/analytics/uso-historico
  async getUsoHistorico(plantillaId?: string): Promise<PlantillaUsage[]> {
    await new Promise(resolve => setTimeout(resolve, 300));

    const datos: PlantillaUsage[] = [];
    const fechaInicio = new Date('2025-09-01');
    const fechaFin = new Date('2025-10-26');

    for (let d = new Date(fechaInicio); d <= fechaFin; d.setDate(d.getDate() + 1)) {
      datos.push({
        plantillaId: plantillaId || 'all',
        fecha: d.toISOString().split('T')[0],
        usos: Math.floor(Math.random() * 10) + 1
      });
    }

    return datos;
  }

  // GET /api/entrenamiento/plantillas/analytics/top-performers
  async getTopPerformers(limit: number = 5): Promise<PlantillaMetrica[]> {
    await new Promise(resolve => setTimeout(resolve, 200));

    const todas = await this.getMetricasPorPlantilla();
    return todas
      .sort((a, b) => b.efectividad - a.efectividad)
      .slice(0, limit);
  }
}

export const analyticsAPI = new AnalyticsAPI();

