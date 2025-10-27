import { useState, useEffect } from 'react';
import { Target, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { getObjectives, Objective } from '../api/objectives';
import { Card, CardHeader, CardTitle, CardContent, Badge } from '../../../components/ui';

export default function GoalTracker() {
  const [objetivos, setObjetivos] = useState<Objective[]>([]);

  useEffect(() => {
    loadObjectives();
  }, []);

  const loadObjectives = async () => {
    const data = await getObjectives();
    setObjetivos(data.filter(o => o.estado === 'en_progreso'));
  };

  const getStatusIcon = (progreso: number) => {
    if (progreso >= 100) return <CheckCircle className="w-6 h-6 text-success" />;
    if (progreso >= 75) return <Target className="w-6 h-6 text-info" />;
    if (progreso >= 50) return <Clock className="w-6 h-6 text-warning" />;
    return <AlertCircle className="w-6 h-6 text-error" />;
  };

  const getStatusColor = (progreso: number) => {
    if (progreso >= 100) return 'border-success-light bg-success-light';
    if (progreso >= 75) return 'border-info-light bg-info-light';
    if (progreso >= 50) return 'border-warning-light bg-warning-light';
    return 'border-error-light bg-error-light';
  };

  const getProgressColor = (progreso: number) => {
    if (progreso >= 100) return 'bg-success';
    if (progreso >= 75) return 'bg-info';
    if (progreso >= 50) return 'bg-warning';
    return 'bg-error';
  };

  const diasRestantes = (fechaFin: string) => {
    const hoy = new Date();
    const fin = new Date(fechaFin);
    const diff = fin.getTime() - hoy.getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Seguimiento de Objetivos</CardTitle>
            <p className="text-body text-text-secondary mt-1">Monitoreo en tiempo real del progreso</p>
          </div>
          <Target className="w-icon-lg h-icon-lg text-primary" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {objetivos.map((objetivo) => {
            const dias = diasRestantes(objetivo.fechaFin);
            return (
              <div 
                key={objetivo.id}
                className={`p-6 rounded-xl border-2 transition-all duration-normal ${getStatusColor(objetivo.progreso)}`}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    {getStatusIcon(objetivo.progreso)}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-h3 font-semibold text-text-primary mb-1">{objetivo.nombre}</h3>
                        <p className="text-body-small text-text-secondary">{objetivo.descripcion}</p>
                      </div>
                      <div className="text-right ml-4">
                        <p className="text-h3 font-bold text-text-primary">{objetivo.progreso.toFixed(0)}%</p>
                        <p className="text-caption text-text-secondary">completado</p>
                      </div>
                    </div>

                    {/* Barra de progreso */}
                    <div className="mb-4">
                      <div className="w-full bg-background rounded-full h-4 border border-border">
                        <div 
                          className={`h-full rounded-full transition-all duration-normal ${getProgressColor(objetivo.progreso)}`}
                          style={{ width: `${Math.min(objetivo.progreso, 100)}%` }}
                        />
                      </div>
                    </div>

                    {/* Métricas */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                      <div className="bg-background p-3 rounded-lg border border-border">
                        <p className="text-caption text-text-secondary mb-1">Objetivo</p>
                        <p className="text-body-large font-bold text-text-primary">
                          {objetivo.metricaObjetivo} {objetivo.unidad}
                        </p>
                      </div>
                      <div className="bg-background p-3 rounded-lg border border-border">
                        <p className="text-caption text-text-secondary mb-1">Actual</p>
                        <p className="text-body-large font-bold text-text-primary">
                          {objetivo.metricaActual} {objetivo.unidad}
                        </p>
                      </div>
                      <div className="bg-background p-3 rounded-lg border border-border">
                        <p className="text-caption text-text-secondary mb-1">Restante</p>
                        <p className="text-body-large font-bold text-text-primary">
                          {Math.max(0, objetivo.metricaObjetivo - objetivo.metricaActual)} {objetivo.unidad}
                        </p>
                      </div>
                    </div>

                    {/* Información adicional */}
                    <div className="flex items-center justify-between text-body-small">
                      <div className="flex items-center gap-4">
                        <span className="text-text-secondary">
                          <span className="font-medium">Responsable:</span> {objetivo.responsable}
                        </span>
                        <Badge variant="info">
                          {objetivo.tipo.toUpperCase()}
                        </Badge>
                      </div>
                      <div className={`font-semibold ${dias < 7 ? 'text-error' : dias < 14 ? 'text-warning' : 'text-success'}`}>
                        {dias > 0 ? `${dias} días restantes` : 'Vencido'}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {objetivos.length === 0 && (
          <div className="text-center py-12">
            <Target className="w-16 h-16 text-text-muted mx-auto mb-4" />
            <p className="text-body-large text-text-secondary">No hay objetivos en progreso</p>
            <p className="text-body-small text-text-muted mt-2">Crea un nuevo objetivo para comenzar el seguimiento</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

