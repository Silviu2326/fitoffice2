import { Bell, Settings, Filter } from 'lucide-react';
import { Alert } from '../types';
import { Card } from '../../../components/ui';

interface NotificationCenterProps {
  alerts: Alert[];
  onMarkAsRead: (alertId: string) => void;
}

export default function NotificationCenter({ alerts, onMarkAsRead }: NotificationCenterProps) {
  const alertasRecientes = alerts.slice(0, 5);
  const sinLeer = alerts.filter(a => !a.leida).length;

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Bell className="w-icon-lg h-icon-lg text-primary" />
            {sinLeer > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-error text-white text-caption rounded-full flex items-center justify-center">
                {sinLeer}
              </span>
            )}
          </div>
          <div>
            <h2 className="text-h2 text-text-primary">Centro de Notificaciones</h2>
            <p className="text-body-small text-text-secondary">{sinLeer} notificaciones sin leer</p>
          </div>
        </div>

        <div className="flex gap-2">
          <button className="p-2 bg-surface hover:bg-surface-2 rounded-lg transition-fast">
            <Filter className="w-icon-md h-icon-md text-text-secondary" />
          </button>
          <button className="p-2 bg-surface hover:bg-surface-2 rounded-lg transition-fast">
            <Settings className="w-icon-md h-icon-md text-text-secondary" />
          </button>
        </div>
      </div>

      <div className="space-y-2">
        {alertasRecientes.map((alert) => (
          <div
            key={alert.id}
            onClick={() => !alert.leida && onMarkAsRead(alert.id)}
            className={`p-4 rounded-lg border cursor-pointer transition-normal ${
              alert.leida
                ? 'bg-surface opacity-60 border-border'
                : 'bg-background border-primary hover:bg-surface'
            }`}
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-body font-semibold text-text-primary">{alert.titulo}</h3>
                <p className="text-body-small text-text-secondary mt-1">{alert.mensaje}</p>
                <p className="text-caption text-text-muted mt-2">
                  {new Date(alert.fecha).toLocaleString()}
                </p>
              </div>
              {!alert.leida && (
                <span className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-2"></span>
              )}
            </div>
          </div>
        ))}
      </div>

      {alerts.length === 0 && (
        <div className="text-center py-12 text-text-muted">
          <Bell className="w-icon-2xl h-icon-2xl mx-auto mb-4 opacity-50" />
          <p className="text-body">No hay notificaciones</p>
        </div>
      )}
    </Card>
  );
}

