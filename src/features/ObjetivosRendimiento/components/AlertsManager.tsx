import { Bell, AlertTriangle, CheckCircle, XCircle, Clock } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, Badge } from '../../../components/ui';

interface Alert {
  id: string;
  tipo: 'warning' | 'success' | 'error' | 'info';
  titulo: string;
  mensaje: string;
  fecha: string;
  leida: boolean;
}

export default function AlertsManager() {
  const alertas: Alert[] = [
    {
      id: '1',
      tipo: 'success',
      titulo: 'Objetivo Alcanzado',
      mensaje: 'Has alcanzado el objetivo de adherencia mensual (88%). ¡Felicidades!',
      fecha: '2025-10-26',
      leida: false
    },
    {
      id: '2',
      tipo: 'warning',
      titulo: 'Objetivo en Riesgo',
      mensaje: 'El objetivo de nuevos clientes está al 75%. Faltan 5 días para el cierre.',
      fecha: '2025-10-25',
      leida: false
    },
    {
      id: '3',
      tipo: 'error',
      titulo: 'Desviación Detectada',
      mensaje: 'La tasa de retención ha bajado un 5% respecto al mes anterior.',
      fecha: '2025-10-24',
      leida: true
    },
    {
      id: '4',
      tipo: 'info',
      titulo: 'Reporte Disponible',
      mensaje: 'El reporte mensual de octubre está disponible para descarga.',
      fecha: '2025-10-23',
      leida: true
    }
  ];

  const getAlertIcon = (tipo: Alert['tipo']) => {
    switch (tipo) {
      case 'success':
        return <CheckCircle className="w-6 h-6 text-success" />;
      case 'warning':
        return <AlertTriangle className="w-6 h-6 text-warning" />;
      case 'error':
        return <XCircle className="w-6 h-6 text-error" />;
      case 'info':
        return <Bell className="w-6 h-6 text-info" />;
    }
  };

  const getAlertColor = (tipo: Alert['tipo']) => {
    switch (tipo) {
      case 'success':
        return 'border-success-light bg-success-light';
      case 'warning':
        return 'border-warning-light bg-warning-light';
      case 'error':
        return 'border-error-light bg-error-light';
      case 'info':
        return 'border-info-light bg-info-light';
    }
  };

  const alertasNoLeidas = alertas.filter(a => !a.leida).length;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Alertas de Rendimiento</CardTitle>
            <p className="text-body text-text-secondary mt-1">Notificaciones sobre el estado de tus objetivos</p>
          </div>
          <div className="relative">
            <Bell className="w-icon-lg h-icon-lg text-primary" />
            {alertasNoLeidas > 0 && (
              <span className="absolute -top-1 -right-1 bg-error text-white text-caption font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {alertasNoLeidas}
              </span>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {/* Filtros rápidos */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2 custom-scrollbar">
          <button className="px-4 py-2 bg-gradient-to-br from-primary to-[#8B5CF6] text-white rounded-lg font-medium text-body-small whitespace-nowrap transition-all duration-normal">
            Todas
          </button>
          <button className="px-4 py-2 bg-surface text-text-secondary hover:bg-surface-2 rounded-lg font-medium text-body-small whitespace-nowrap transition-all duration-normal">
            No leídas
          </button>
          <button className="px-4 py-2 bg-surface text-text-secondary hover:bg-surface-2 rounded-lg font-medium text-body-small whitespace-nowrap transition-all duration-normal">
            Importantes
          </button>
          <button className="px-4 py-2 bg-surface text-text-secondary hover:bg-surface-2 rounded-lg font-medium text-body-small whitespace-nowrap transition-all duration-normal">
            Leídas
          </button>
        </div>

        {/* Lista de alertas */}
        <div className="space-y-3">
          {alertas.map((alerta) => (
            <div
              key={alerta.id}
              className={`p-5 rounded-lg border-2 transition-all duration-normal ${getAlertColor(alerta.tipo)} ${
                !alerta.leida ? 'shadow-md' : 'opacity-75'
              }`}
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 mt-1">
                  {getAlertIcon(alerta.tipo)}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <h3 className="text-h3 font-semibold text-text-primary">{alerta.titulo}</h3>
                      {!alerta.leida && (
                        <Badge variant="success">
                          NUEVA
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-body-small text-text-secondary">
                      <Clock className="w-4 h-4" />
                      <span>{new Date(alerta.fecha).toLocaleDateString('es-ES')}</span>
                    </div>
                  </div>
                  
                  <p className="text-body text-text-secondary mb-3">{alerta.mensaje}</p>
                  
                  <div className="flex gap-2">
                    {!alerta.leida && (
                      <button className="px-3 py-1.5 bg-background text-success border border-success rounded-lg hover:bg-success-light transition-colors text-body-small font-medium">
                        Marcar como leída
                      </button>
                    )}
                    <button className="px-3 py-1.5 bg-background text-text-secondary border border-border rounded-lg hover:bg-surface transition-colors text-body-small font-medium">
                      Ver detalles
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {alertas.length === 0 && (
          <div className="text-center py-12">
            <Bell className="w-16 h-16 text-text-muted mx-auto mb-4" />
            <p className="text-body-large text-text-secondary">No hay alertas</p>
            <p className="text-body-small text-text-muted mt-2">Las notificaciones aparecerán aquí</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

