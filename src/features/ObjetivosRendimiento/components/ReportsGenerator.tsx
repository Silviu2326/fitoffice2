import { useState, useEffect } from 'react';
import { FileText, Download, Calendar } from 'lucide-react';
import { getReports, Report } from '../api/reports';
import { Card, CardHeader, CardTitle, CardContent, Button, Badge } from '../../../components/ui';

export default function ReportsGenerator() {
  const [reportes, setReportes] = useState<Report[]>([]);
  const [selectedTipo, setSelectedTipo] = useState<Report['tipo']>('mensual');

  useEffect(() => {
    loadReports();
  }, []);

  const loadReports = async () => {
    const data = await getReports();
    setReportes(data);
  };

  const getTipoBadgeVariant = (tipo: Report['tipo']): 'success' | 'warning' | 'error' | 'info' | 'default' => {
    switch (tipo) {
      case 'mensual':
        return 'info';
      case 'trimestral':
        return 'default';
      case 'anual':
        return 'success';
      case 'personalizado':
        return 'warning';
      default:
        return 'default';
    }
  };

  return (
    <div className="space-y-6">
      {/* Generador de reportes */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Generador de Reportes</CardTitle>
              <p className="text-body text-text-secondary mt-1">Crea reportes automáticos de rendimiento</p>
            </div>
            <FileText className="w-icon-lg h-icon-lg text-primary" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="bg-surface rounded-lg p-6 border border-border">
            <h3 className="text-h3 font-semibold text-text-primary mb-4">Generar Nuevo Reporte</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-body-small font-medium text-text-primary mb-2">Tipo de Reporte</label>
                <select
                  value={selectedTipo}
                  onChange={(e) => setSelectedTipo(e.target.value as Report['tipo'])}
                  className="input-base input-md"
                >
                  <option value="mensual">Mensual</option>
                  <option value="trimestral">Trimestral</option>
                  <option value="anual">Anual</option>
                  <option value="personalizado">Personalizado</option>
                </select>
              </div>

              <div>
                <label className="block text-body-small font-medium text-text-primary mb-2">Fecha Inicio</label>
                <input
                  type="date"
                  className="input-base input-md"
                />
              </div>

              <div>
                <label className="block text-body-small font-medium text-text-primary mb-2">Fecha Fin</label>
                <input
                  type="date"
                  className="input-base input-md"
                />
              </div>
            </div>

            <Button variant="primary" className="w-full">
              <FileText className="w-5 h-5 mr-2" />
              Generar Reporte
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Lista de reportes generados */}
      <Card>
        <CardHeader>
          <CardTitle>Reportes Generados</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {reportes.map((reporte) => (
              <div
                key={reporte.id}
                className="p-5 bg-surface rounded-lg hover:bg-surface-2 transition-all duration-normal border border-border"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="text-h3 font-semibold text-text-primary">{reporte.nombre}</h4>
                      <Badge variant={getTipoBadgeVariant(reporte.tipo)}>
                        {reporte.tipo.toUpperCase()}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-body-small text-text-secondary">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>Generado: {new Date(reporte.fechaGeneracion).toLocaleDateString('es-ES')}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>
                          Período: {new Date(reporte.periodo.inicio).toLocaleDateString('es-ES')} - {new Date(reporte.periodo.fin).toLocaleDateString('es-ES')}
                        </span>
                      </div>
                    </div>
                  </div>
                  <Button variant="primary" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Descargar
                  </Button>
                </div>

                {/* Resumen del reporte */}
                <div className="mb-4 p-4 bg-background rounded-lg border border-border">
                  <p className="text-body-small text-text-secondary">{reporte.resumen}</p>
                </div>

                {/* Métricas del reporte */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {reporte.metricas.map((metrica, index) => (
                    <div key={index} className="bg-background p-3 rounded-lg border border-border">
                      <p className="text-caption text-text-secondary mb-1">{metrica.nombre}</p>
                      <p className="text-body-large font-bold text-text-primary">
                        {metrica.valor.toLocaleString('es-ES')}{metrica.unidad}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {reportes.length === 0 && (
            <div className="text-center py-12">
              <FileText className="w-16 h-16 text-text-muted mx-auto mb-4" />
              <p className="text-body-large text-text-secondary">No hay reportes generados</p>
              <p className="text-body-small text-text-muted mt-2">Genera tu primer reporte para ver el historial</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

