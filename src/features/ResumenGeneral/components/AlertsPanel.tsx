import { AlertTriangle, Bell, Info, CheckCircle } from 'lucide-react';
import { Card, CardHeader, CardTitle, Badge } from '../../../components/ui';

interface AlertsPanelProps {
  alerts: any[];
}

/**
 * AlertsPanel - Panel de alertas y notificaciones
 * Actualizado según guía de estilos FitOffice v2.0
 */
export default function AlertsPanel({ alerts }: AlertsPanelProps) {
  const defaultAlerts = [
    {
      type: 'warning',
      title: 'Pago Pendiente',
      message: 'Cliente Juan Pérez tiene 2 facturas vencidas',
      time: 'Hace 2 horas'
    },
    {
      type: 'info',
      title: 'Check-in Pendiente',
      message: '5 clientes sin check-in esta semana',
      time: 'Hace 4 horas'
    },
    {
      type: 'success',
      title: 'Objetivo Cumplido',
      message: 'Has alcanzado tu meta de ingresos mensuales',
      time: 'Hace 1 día'
    }
  ];

  const displayAlerts = alerts.length > 0 ? alerts : defaultAlerts;

  const getIcon = (type: string) => {
    switch (type) {
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-[#F59E0B]" />;
      case 'info':
        return <Info className="w-5 h-5 text-[#3B82F6]" />;
      case 'success':
        return <CheckCircle className="w-5 h-5 text-[#10B981]" />;
      default:
        return <Bell className="w-5 h-5 text-[#94A3B8]" />;
    }
  };

  return (
    <Card className="bg-[#1E1E2E] border-[#334155]">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-[#F1F5F9]">Alertas</CardTitle>
          <Badge variant="success">{displayAlerts.length}</Badge>
        </div>
      </CardHeader>
      <div className="space-y-3">
        {displayAlerts.map((alert, index) => (
          <div
            key={index}
            className="p-4 bg-[#2A2A3A] rounded-xl border border-[#334155] hover:border-[#6366F1] transition-all duration-200"
          >
            <div className="flex items-start gap-3">
              {getIcon(alert.type)}
              <div className="flex-1">
                <h3 className="text-[#F1F5F9] font-semibold text-sm mb-1">{alert.title}</h3>
                <p className="text-[#94A3B8] text-xs mb-2">{alert.message}</p>
                <span className="text-[#64748B] text-xs">{alert.time}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

