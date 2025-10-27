import { Bell, CheckCheck, AlertTriangle, Info, Clock } from 'lucide-react';
import { Alert, AlertType } from '../types';
import { Button, Card } from '../../../components/ui';

interface AlertsPanelProps {
  alerts: Alert[];
  onMarkAsRead: (alertId: string) => void;
  onClearAll: () => void;
}

export default function AlertsPanel({ alerts, onMarkAsRead, onClearAll }: AlertsPanelProps) {
  const getAlertIcon = (tipo: AlertType) => {
    switch (tipo) {
      case 'pago_pendiente':
      case 'factura_vencida':
        return <AlertTriangle className="w-icon-md h-icon-md text-error" />;
      case 'cliente_sin_checkin':
      case 'lead_sin_seguimiento':
        return <Clock className="w-icon-md h-icon-md text-warning" />;
      case 'equipo_roto':
        return <AlertTriangle className="w-icon-md h-icon-md text-warning" />;
      case 'clase_supera_aforo':
        return <AlertTriangle className="w-icon-md h-icon-md text-error" />;
      default:
        return <Info className="w-icon-md h-icon-md text-info" />;
    }
  };

  const alertasNoLeidas = alerts.filter(a => !a.leida);

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="bg-primary-50 p-2 rounded-lg">
            <Bell className="w-icon-md h-icon-md text-primary" />
          </div>
          <div>
            <h2 className="text-h2 text-text-primary">Alertas</h2>
            <p className="text-body-small text-text-secondary">
              {alertasNoLeidas.length} sin leer
            </p>
          </div>
        </div>

        {alertasNoLeidas.length > 0 && (
          <Button
            variant="secondary"
            onClick={onClearAll}
          >
            <CheckCheck className="w-icon-sm h-icon-sm mr-2" />
            Marcar todas como leídas
          </Button>
        )}
      </div>

      <div className="space-y-3 max-h-[600px] overflow-y-auto custom-scrollbar">
        {alerts.length === 0 ? (
          <div className="text-center py-12 text-text-muted">
            <Bell className="w-icon-2xl h-icon-2xl mx-auto mb-4 opacity-50" />
            <p className="text-body">No hay alertas en este momento</p>
          </div>
        ) : (
          alerts.map((alert) => (
            <div
              key={alert.id}
              className={`p-4 rounded-lg border transition-normal cursor-pointer ${
                alert.leida
                  ? 'bg-surface opacity-60 border-border'
                  : 'bg-background border-primary hover:bg-surface'
              }`}
              onClick={() => !alert.leida && onMarkAsRead(alert.id)}
            >
              <div className="flex items-start gap-3">
                <div className="mt-1">
                  {getAlertIcon(alert.tipo)}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-body font-semibold text-text-primary">{alert.titulo}</h3>
                    {!alert.leida && (
                      <span className="w-2 h-2 bg-primary rounded-full"></span>
                    )}
                  </div>
                  <p className="text-body-small text-text-secondary mt-1">{alert.mensaje}</p>
                  <p className="text-caption text-text-muted mt-2">
                    {new Date(alert.fecha).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </Card>
  );
}

