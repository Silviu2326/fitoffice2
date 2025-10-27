import { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, Target, DollarSign, Users, Award } from 'lucide-react';
import { getPerformanceMetrics, getDashboardData, PerformanceMetric, DashboardData } from '../api/performance';
import { Card, CardHeader, CardTitle, CardContent } from '../../../components/ui';

export default function PerformanceDashboard() {
  const [metrics, setMetrics] = useState<PerformanceMetric[]>([]);
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const metricsData = await getPerformanceMetrics();
    const dashboard = await getDashboardData();
    setMetrics(metricsData);
    setDashboardData(dashboard);
  };

  const getTrendIcon = (tendencia: string) => {
    if (tendencia === 'up') return <TrendingUp className="w-5 h-5 text-success" />;
    if (tendencia === 'down') return <TrendingDown className="w-5 h-5 text-error" />;
    return <TrendingUp className="w-5 h-5 text-text-muted" />;
  };

  const getTrendColor = (tendencia: string) => {
    if (tendencia === 'up') return 'text-success';
    if (tendencia === 'down') return 'text-error';
    return 'text-text-secondary';
  };

  if (!dashboardData) {
    return <div className="text-text-secondary">Cargando...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Resumen ejecutivo */}
      <Card>
        <CardHeader>
          <CardTitle>Dashboard de Rendimiento</CardTitle>
        </CardHeader>
        <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-success-light to-success-light/50 p-6 rounded-xl border border-success-light">
            <div className="flex items-center gap-4">
              <div className="bg-success p-3 rounded-lg">
                <DollarSign className="w-icon-lg h-icon-lg text-white" />
              </div>
              <div>
                <p className="text-body-small text-text-secondary font-medium">Facturación Mensual</p>
                <p className="text-h2 font-bold text-text-primary">{dashboardData.facturacionMensual.toLocaleString('es-ES')}€</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-info-light to-info-light/50 p-6 rounded-xl border border-info-light">
            <div className="flex items-center gap-4">
              <div className="bg-info p-3 rounded-lg">
                <Users className="w-icon-lg h-icon-lg text-white" />
              </div>
              <div>
                <p className="text-body-small text-text-secondary font-medium">Clientes Activos</p>
                <p className="text-h2 font-bold text-text-primary">{dashboardData.clientesActivos}</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-primary-50 to-primary-50/50 p-6 rounded-xl border border-primary-50">
            <div className="flex items-center gap-4">
              <div className="bg-primary p-3 rounded-lg">
                <Target className="w-icon-lg h-icon-lg text-white" />
              </div>
              <div>
                <p className="text-body-small text-text-secondary font-medium">Adherencia Promedio</p>
                <p className="text-h2 font-bold text-text-primary">{dashboardData.adherenciaPromedio}%</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-warning-light to-warning-light/50 p-6 rounded-xl border border-warning-light">
            <div className="flex items-center gap-4">
              <div className="bg-warning p-3 rounded-lg">
                <Award className="w-icon-lg h-icon-lg text-white" />
              </div>
              <div>
                <p className="text-body-small text-text-secondary font-medium">Tasa de Retención</p>
                <p className="text-h2 font-bold text-text-primary">{dashboardData.tasaRetencion}%</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-success-light to-success-light/50 p-6 rounded-xl border border-success-light">
            <div className="flex items-center gap-4">
              <div className="bg-success p-3 rounded-lg">
                <Target className="w-icon-lg h-icon-lg text-white" />
              </div>
              <div>
                <p className="text-body-small text-text-secondary font-medium">Objetivos Alcanzados</p>
                <p className="text-h2 font-bold text-text-primary">
                  {dashboardData.objetivosCompletados}/{dashboardData.objetivosTotales}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-primary-50 to-primary-50/50 p-6 rounded-xl border border-primary-50">
            <div className="flex items-center gap-4">
              <div className="bg-primary p-3 rounded-lg">
                <Award className="w-icon-lg h-icon-lg text-white" />
              </div>
              <div>
                <p className="text-body-small text-text-secondary font-medium">Tasa de Éxito</p>
                <p className="text-h2 font-bold text-text-primary">
                  {((dashboardData.objetivosCompletados / dashboardData.objetivosTotales) * 100).toFixed(0)}%
                </p>
              </div>
            </div>
          </div>
        </div>
        </CardContent>
      </Card>

      {/* Métricas con tendencias */}
      <Card>
        <CardHeader>
          <CardTitle>Métricas Clave con Tendencias</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {metrics.map((metric) => (
              <div key={metric.id} className="p-5 bg-surface rounded-lg border border-border">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h4 className="text-h3 font-semibold text-text-primary">{metric.nombre}</h4>
                    <p className="text-body-small text-text-secondary">vs. período anterior</p>
                  </div>
                  {getTrendIcon(metric.tendencia)}
                </div>

                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-h2 font-bold text-text-primary">
                      {metric.valor.toLocaleString('es-ES')}{metric.unidad}
                    </p>
                    <p className="text-body-small text-text-secondary mt-1">
                      Anterior: {metric.valorAnterior.toLocaleString('es-ES')}{metric.unidad}
                    </p>
                  </div>
                  <div className={`text-right ${getTrendColor(metric.tendencia)}`}>
                    <p className="text-h3 font-bold">
                      {metric.tendencia === 'up' ? '+' : metric.tendencia === 'down' ? '-' : ''}
                      {Math.abs(metric.porcentajeCambio).toFixed(1)}%
                    </p>
                    <p className="text-caption font-medium">cambio</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Gráfico de progreso semanal (placeholder) */}
      <Card>
        <CardHeader>
          <CardTitle>Progreso Semanal</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex items-center justify-center bg-surface rounded-lg border-2 border-dashed border-border">
            <p className="text-text-muted">Gráfico de progreso semanal (próximamente)</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

