import { AlertTriangle, Bell, User, Calendar, TrendingDown } from 'lucide-react';

interface Alerta {
  id: string;
  tipo: 'baja_adherencia' | 'sesiones_pendientes' | 'inactividad' | 'tendencia_negativa';
  cliente: string;
  mensaje: string;
  prioridad: 'alta' | 'media' | 'baja';
  fecha: string;
  datos?: {
    adherencia?: number;
    diasInactivo?: number;
    sesionesPendientes?: number;
  };
}

export default function AlertasAdherencia() {
  // Datos de ejemplo
  const alertas: Alerta[] = [
    {
      id: '1',
      tipo: 'baja_adherencia',
      cliente: 'Carlos López',
      mensaje: 'Adherencia crítica por debajo del 50%',
      prioridad: 'alta',
      fecha: '2025-10-26',
      datos: { adherencia: 45 }
    },
    {
      id: '2',
      tipo: 'inactividad',
      cliente: 'Ana Martínez',
      mensaje: 'Sin actividad en los últimos 7 días',
      prioridad: 'alta',
      fecha: '2025-10-26',
      datos: { diasInactivo: 7 }
    },
    {
      id: '3',
      tipo: 'sesiones_pendientes',
      cliente: 'Pedro Sánchez',
      mensaje: '5 sesiones pendientes acumuladas',
      prioridad: 'media',
      fecha: '2025-10-25',
      datos: { sesionesPendientes: 5 }
    },
    {
      id: '4',
      tipo: 'tendencia_negativa',
      cliente: 'Laura Rodríguez',
      mensaje: 'Adherencia descendente últimas 3 semanas',
      prioridad: 'media',
      fecha: '2025-10-25',
      datos: { adherencia: 62 }
    },
    {
      id: '5',
      tipo: 'baja_adherencia',
      cliente: 'Miguel Torres',
      mensaje: 'Adherencia por debajo del objetivo (68%)',
      prioridad: 'baja',
      fecha: '2025-10-24',
      datos: { adherencia: 68 }
    }
  ];

  const getPrioridadColor = (prioridad: string) => {
    switch (prioridad) {
      case 'alta':
        return 'border-[#EF4444]/30 bg-[#FEE2E2]';
      case 'media':
        return 'border-[#F59E0B]/30 bg-[#FEF3C7]';
      case 'baja':
        return 'border-[#3B82F6]/30 bg-[#DBEAFE]';
      default:
        return 'border-[#E2E8F0] bg-[#F8FAFC]';
    }
  };

  const getPrioridadBadge = (prioridad: string) => {
    switch (prioridad) {
      case 'alta':
        return 'bg-[#EF4444] text-white';
      case 'media':
        return 'bg-[#F59E0B] text-white';
      case 'baja':
        return 'bg-[#3B82F6] text-white';
      default:
        return 'bg-[#94A3B8] text-white';
    }
  };

  const getTipoIcon = (tipo: string) => {
    switch (tipo) {
      case 'baja_adherencia':
        return <AlertTriangle className="w-5 h-5 text-[#EF4444]" />;
      case 'inactividad':
        return <Calendar className="w-5 h-5 text-[#F97316]" />;
      case 'sesiones_pendientes':
        return <Bell className="w-5 h-5 text-[#F59E0B]" />;
      case 'tendencia_negativa':
        return <TrendingDown className="w-5 h-5 text-[#F59E0B]" />;
      default:
        return <AlertTriangle className="w-5 h-5 text-[#64748B]" />;
    }
  };

  const alertasAlta = alertas.filter(a => a.prioridad === 'alta').length;
  const alertasMedia = alertas.filter(a => a.prioridad === 'media').length;

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-[#E2E8F0] p-6 hover:shadow-xl transition-all duration-200">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-[20px] leading-7 font-semibold text-[#0F172A]">Alertas de Adherencia</h3>
          <p className="text-[14px] leading-5 text-[#64748B] mt-1">Notificaciones automáticas de bajo cumplimiento</p>
        </div>
        <Bell className="w-6 h-6 text-[#EF4444]" />
      </div>

      {/* Resumen de Alertas */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-[#FEE2E2] rounded-xl p-4 border border-[#EF4444]/20">
          <p className="text-[12px] leading-4 font-medium text-[#64748B] mb-1">Prioridad Alta</p>
          <p className="text-[32px] leading-10 font-bold text-[#EF4444]">{alertasAlta}</p>
        </div>
        <div className="bg-[#FEF3C7] rounded-xl p-4 border border-[#F59E0B]/20">
          <p className="text-[12px] leading-4 font-medium text-[#64748B] mb-1">Prioridad Media</p>
          <p className="text-[32px] leading-10 font-bold text-[#F59E0B]">{alertasMedia}</p>
        </div>
        <div className="bg-[#F8FAFC] rounded-xl p-4 border border-[#E2E8F0]">
          <p className="text-[12px] leading-4 font-medium text-[#64748B] mb-1">Total Alertas</p>
          <p className="text-[32px] leading-10 font-bold text-[#0F172A]">{alertas.length}</p>
        </div>
      </div>

      {/* Lista de Alertas */}
      <div className="space-y-3">
        {alertas.map((alerta) => (
          <div key={alerta.id} className={`border rounded-xl p-4 ${getPrioridadColor(alerta.prioridad)} transition-all duration-200 hover:shadow-md`}>
            <div className="flex items-start gap-3">
              <div className="mt-1">{getTipoIcon(alerta.tipo)}</div>
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <User className="w-4 h-4 text-[#64748B]" />
                      <h4 className="font-semibold text-[#0F172A] text-[16px]">{alerta.cliente}</h4>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] leading-4 font-semibold uppercase ${getPrioridadBadge(alerta.prioridad)}`}>
                        {alerta.prioridad}
                      </span>
                    </div>
                    <p className="text-[14px] leading-5 text-[#0F172A]">{alerta.mensaje}</p>
                  </div>
                </div>

                {/* Datos adicionales */}
                {alerta.datos && (
                  <div className="flex items-center gap-4 mt-2 text-[14px] leading-5">
                    {alerta.datos.adherencia !== undefined && (
                      <span className="text-[#64748B]">
                        <strong className="text-[#0F172A]">Adherencia:</strong> {alerta.datos.adherencia}%
                      </span>
                    )}
                    {alerta.datos.diasInactivo !== undefined && (
                      <span className="text-[#64748B]">
                        <strong className="text-[#0F172A]">Días inactivo:</strong> {alerta.datos.diasInactivo}
                      </span>
                    )}
                    {alerta.datos.sesionesPendientes !== undefined && (
                      <span className="text-[#64748B]">
                        <strong className="text-[#0F172A]">Sesiones pendientes:</strong> {alerta.datos.sesionesPendientes}
                      </span>
                    )}
                  </div>
                )}

                <div className="flex items-center justify-between mt-3 pt-3 border-t border-[#E2E8F0]">
                  <span className="text-[12px] leading-4 text-[#94A3B8]">{alerta.fecha}</span>
                  <button className="text-[12px] leading-4 font-semibold text-[#6366F1] hover:text-[#4F46E5] transition-colors duration-200">
                    Ver detalles →
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
