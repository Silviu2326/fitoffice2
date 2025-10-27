import { BarChart3, TrendingUp, PieChart } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../../../components/ui';

export default function MetricsChart() {
  const chartData = [
    { mes: 'Jun', facturacion: 8200, clientes: 38, adherencia: 82 },
    { mes: 'Jul', facturacion: 8500, clientes: 40, adherencia: 84 },
    { mes: 'Ago', facturacion: 9100, clientes: 42, adherencia: 85 },
    { mes: 'Sep', facturacion: 9300, clientes: 43, adherencia: 86 },
    { mes: 'Oct', facturacion: 9800, clientes: 45, adherencia: 88 }
  ];

  const maxFacturacion = Math.max(...chartData.map(d => d.facturacion));

  return (
    <div className="space-y-6">
      {/* Gráfico de barras de facturación */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Gráficos de Métricas</CardTitle>
              <p className="text-body text-text-secondary mt-1">Evolución de las métricas principales</p>
            </div>
            <BarChart3 className="w-icon-lg h-icon-lg text-primary" />
          </div>
        </CardHeader>
        <CardContent>

          <div className="mb-8">
            <h3 className="text-h3 font-semibold text-text-primary mb-4">Facturación Mensual</h3>
            <div className="flex items-end justify-between gap-4 h-64">
              {chartData.map((data, index) => (
                <div key={index} className="flex-1 flex flex-col items-center gap-2">
                  <div className="w-full flex items-end justify-center h-full">
                    <div 
                      className="w-full bg-gradient-to-t from-success to-success/70 rounded-t-lg transition-all duration-normal hover:from-success-600 hover:to-success/80"
                      style={{ height: `${(data.facturacion / maxFacturacion) * 100}%` }}
                      title={`${data.facturacion}€`}
                    />
                  </div>
                  <div className="text-center">
                    <p className="text-body-small font-semibold text-text-primary">{data.mes}</p>
                    <p className="text-caption text-text-secondary">{data.facturacion.toLocaleString()}€</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Evolución de clientes */}
            <div>
              <h3 className="text-h3 font-semibold text-text-primary mb-4">Clientes Activos</h3>
              <div className="flex items-end justify-between gap-3 h-40">
                {chartData.map((data, index) => (
                  <div key={index} className="flex-1 flex flex-col items-center gap-2">
                    <div className="w-full flex items-end justify-center h-full">
                      <div 
                        className="w-full bg-gradient-to-t from-info to-info/70 rounded-t-lg transition-all duration-normal"
                        style={{ height: `${(data.clientes / 50) * 100}%` }}
                      />
                    </div>
                    <div className="text-center">
                      <p className="text-caption font-semibold text-text-primary">{data.mes}</p>
                      <p className="text-caption text-text-secondary">{data.clientes}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Evolución de adherencia */}
            <div>
              <h3 className="text-h3 font-semibold text-text-primary mb-4">Adherencia (%)</h3>
              <div className="flex items-end justify-between gap-3 h-40">
                {chartData.map((data, index) => (
                  <div key={index} className="flex-1 flex flex-col items-center gap-2">
                    <div className="w-full flex items-end justify-center h-full">
                      <div 
                        className="w-full bg-gradient-to-t from-primary to-primary/70 rounded-t-lg transition-all duration-normal"
                        style={{ height: `${data.adherencia}%` }}
                      />
                    </div>
                    <div className="text-center">
                      <p className="text-caption font-semibold text-text-primary">{data.mes}</p>
                      <p className="text-caption text-text-secondary">{data.adherencia}%</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tarjetas de tendencias */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent>
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-success-light p-2 rounded-lg">
                <TrendingUp className="w-6 h-6 text-success" />
              </div>
              <h3 className="text-h3 font-semibold text-text-primary">Crecimiento</h3>
            </div>
            <p className="text-h2 font-bold text-success mb-2">+19.5%</p>
            <p className="text-body-small text-text-secondary">vs. período anterior</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-info-light p-2 rounded-lg">
                <PieChart className="w-6 h-6 text-info" />
              </div>
              <h3 className="text-h3 font-semibold text-text-primary">Distribución</h3>
            </div>
            <p className="text-body-small text-text-secondary mb-2">
              <span className="font-semibold text-text-primary">Personal 60%</span> • 
              Comercial 25% • Operacional 15%
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-primary-50 p-2 rounded-lg">
                <BarChart3 className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-h3 font-semibold text-text-primary">Predicción</h3>
            </div>
            <p className="text-h2 font-bold text-primary mb-2">10.2K€</p>
            <p className="text-body-small text-text-secondary">Proyección próximo mes</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

