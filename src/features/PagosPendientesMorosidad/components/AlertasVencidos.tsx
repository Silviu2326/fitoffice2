import { useState, useEffect } from 'react';
import { Bell, AlertTriangle, AlertOctagon, XCircle } from 'lucide-react';
import { PagoVencido, obtenerPagosVencidos } from '../api/morosidad';

interface Alerta {
  id: string;
  tipo: 'verde' | 'amarillo' | 'naranja' | 'rojo';
  titulo: string;
  descripcion: string;
  prioridad: number;
  pagos: PagoVencido[];
}

export default function AlertasVencidos() {
  const [alertas, setAlertas] = useState<Alerta[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    cargarAlertas();
  }, []);

  const cargarAlertas = async () => {
    try {
      setLoading(true);
      const pagos = await obtenerPagosVencidos();
      
      // Generar alertas por nivel de morosidad
      const alertasGeneradas: Alerta[] = [];

      const pagosRojo = pagos.filter(p => p.nivel_morosidad === 'rojo' || p.nivel_morosidad === 'negro');
      if (pagosRojo.length > 0) {
        alertasGeneradas.push({
          id: 'alerta-rojo',
          tipo: 'rojo',
          titulo: '🚨 ALERTA CRÍTICA - Morosidad Grave',
          descripcion: `${pagosRojo.length} cliente(s) con más de 30 días de retraso. Acción inmediata requerida.`,
          prioridad: 4,
          pagos: pagosRojo,
        });
      }

      const pagosNaranja = pagos.filter(p => p.nivel_morosidad === 'naranja');
      if (pagosNaranja.length > 0) {
        alertasGeneradas.push({
          id: 'alerta-naranja',
          tipo: 'naranja',
          titulo: '⚠️ ALERTA URGENTE - Morosidad Alta',
          descripcion: `${pagosNaranja.length} cliente(s) con 16-30 días de retraso. Enviar recordatorio urgente.`,
          prioridad: 3,
          pagos: pagosNaranja,
        });
      }

      const pagosAmarillo = pagos.filter(p => p.nivel_morosidad === 'amarillo');
      if (pagosAmarillo.length > 0) {
        alertasGeneradas.push({
          id: 'alerta-amarillo',
          tipo: 'amarillo',
          titulo: '⚡ ALERTA MODERADA - Seguimiento Requerido',
          descripcion: `${pagosAmarillo.length} cliente(s) con 8-15 días de retraso. Enviar recordatorio firme.`,
          prioridad: 2,
          pagos: pagosAmarillo,
        });
      }

      const pagosVerde = pagos.filter(p => p.nivel_morosidad === 'verde');
      if (pagosVerde.length > 0) {
        alertasGeneradas.push({
          id: 'alerta-verde',
          tipo: 'verde',
          titulo: 'ℹ️ ALERTA INFORMATIVA - Retraso Leve',
          descripcion: `${pagosVerde.length} cliente(s) con 1-7 días de retraso. Enviar recordatorio amigable.`,
          prioridad: 1,
          pagos: pagosVerde,
        });
      }

      // Ordenar por prioridad
      alertasGeneradas.sort((a, b) => b.prioridad - a.prioridad);
      setAlertas(alertasGeneradas);
    } catch (error) {
      console.error('Error al cargar alertas:', error);
    } finally {
      setLoading(false);
    }
  };

  const getColorAlerta = (tipo: string) => {
    const colores = {
      verde: 'border-[#10B981] bg-[#D1FAE5]',
      amarillo: 'border-[#F59E0B] bg-[#FEF3C7]',
      naranja: 'border-[#F59E0B] bg-[#FED7AA]',
      rojo: 'border-[#EF4444] bg-[#FEE2E2]',
    };
    return colores[tipo as keyof typeof colores] || 'border-[#E2E8F0] bg-[#F8FAFC]';
  };

  const getIconoAlerta = (tipo: string) => {
    const iconProps = { className: "w-6 h-6" };
    
    switch (tipo) {
      case 'rojo':
        return <XCircle {...iconProps} className="w-6 h-6 text-[#EF4444]" />;
      case 'naranja':
        return <AlertOctagon {...iconProps} className="w-6 h-6 text-[#F59E0B]" />;
      case 'amarillo':
        return <AlertTriangle {...iconProps} className="w-6 h-6 text-[#F59E0B]" />;
      default:
        return <Bell {...iconProps} className="w-6 h-6 text-[#10B981]" />;
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-[16px] shadow-md p-6 border border-[#E2E8F0]">
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-4 border-[#6366F1] border-t-transparent"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-[16px] shadow-md border border-[#E2E8F0]">
      <div className="p-6 border-b border-[#E2E8F0]">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-[#FED7AA] rounded-[12px]">
            <Bell className="w-6 h-6 text-[#F59E0B]" />
          </div>
          <div>
            <h2 className="text-[20px] leading-[28px] font-semibold text-[#0F172A]">Alertas de Morosidad</h2>
            <p className="text-[14px] leading-[20px] text-[#64748B]">Notificaciones automáticas por nivel de retraso</p>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-4">
        {alertas.length === 0 ? (
          <div className="text-center py-12">
            <Bell className="w-16 h-16 text-[#94A3B8] mx-auto mb-4" />
            <p className="text-[#64748B] font-medium text-[16px] leading-[24px]">¡Excelente! No hay alertas de morosidad</p>
            <p className="text-[14px] leading-[20px] text-[#94A3B8] mt-2">Todos los pagos están al día</p>
          </div>
        ) : (
          alertas.map((alerta) => (
            <div
              key={alerta.id}
              className={`border-l-4 rounded-[12px] p-4 ${getColorAlerta(alerta.tipo)}`}
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 mt-1">
                  {getIconoAlerta(alerta.tipo)}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-[#0F172A] mb-1 text-[18px] leading-[28px]">{alerta.titulo}</h3>
                  <p className="text-[14px] leading-[20px] text-[#64748B] mb-3">{alerta.descripcion}</p>
                  
                  <div className="space-y-2">
                    <div className="text-[12px] leading-[16px] font-semibold text-[#0F172A] mb-2">Clientes afectados:</div>
                    {alerta.pagos.slice(0, 5).map((pago) => (
                      <div key={pago.id} className="flex items-center justify-between bg-white bg-opacity-50 rounded-[8px] px-3 py-2">
                        <div className="flex items-center gap-3">
                          <span className="text-[14px] leading-[20px] font-medium text-[#0F172A]">{pago.cliente_nombre}</span>
                          <span className="text-[12px] leading-[16px] text-[#64748B]">{pago.descripcion}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-[14px] leading-[20px] font-semibold text-[#0F172A]">{pago.monto_pendiente.toFixed(2)}€</span>
                          <span className="text-[12px] leading-[16px] font-medium text-[#EF4444]">{pago.dias_retraso} días</span>
                        </div>
                      </div>
                    ))}
                    {alerta.pagos.length > 5 && (
                      <div className="text-[12px] leading-[16px] text-[#64748B] text-center py-1">
                        y {alerta.pagos.length - 5} cliente(s) más...
                      </div>
                    )}
                  </div>

                  <div className="mt-4 flex gap-2">
                    <button className="px-4 py-2 bg-[#6366F1] text-white rounded-[12px] text-[14px] leading-[20px] font-semibold hover:bg-[#4F46E5] transition-all duration-200 shadow-md hover:shadow-lg">
                      Enviar Recordatorios
                    </button>
                    <button className="px-4 py-2 bg-white text-[#64748B] border border-[#E2E8F0] rounded-[12px] text-[14px] leading-[20px] font-semibold hover:bg-[#F8FAFC] transition-all duration-200">
                      Ver Detalles
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

