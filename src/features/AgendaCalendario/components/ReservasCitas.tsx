import { CalendarCheck, User, Clock, CheckCircle, XCircle } from 'lucide-react';

interface Reserva {
  id: string;
  cliente: string;
  fecha: string;
  hora: string;
  servicio: string;
  estado: 'confirmada' | 'pendiente' | 'cancelada';
  metodoPago: string;
}

export default function ReservasCitas() {
  // Datos de ejemplo
  const reservas: Reserva[] = [
    {
      id: '1',
      cliente: 'María García',
      fecha: '2025-10-28',
      hora: '09:00',
      servicio: 'Sesión Personal Training',
      estado: 'confirmada',
      metodoPago: 'Tarjeta'
    },
    {
      id: '2',
      cliente: 'Juan Pérez',
      fecha: '2025-10-28',
      hora: '11:00',
      servicio: 'Evaluación Física',
      estado: 'pendiente',
      metodoPago: 'Efectivo'
    },
    {
      id: '3',
      cliente: 'Ana Martínez',
      fecha: '2025-10-29',
      hora: '14:00',
      servicio: 'Sesión Online',
      estado: 'confirmada',
      metodoPago: 'Transferencia'
    },
    {
      id: '4',
      cliente: 'Carlos López',
      fecha: '2025-10-29',
      hora: '16:30',
      servicio: 'Consulta Nutricional',
      estado: 'pendiente',
      metodoPago: 'Tarjeta'
    },
    {
      id: '5',
      cliente: 'Laura Rodríguez',
      fecha: '2025-10-30',
      hora: '10:00',
      servicio: 'Sesión Personal Training',
      estado: 'cancelada',
      metodoPago: 'Efectivo'
    }
  ];

  const getEstadoIcon = (estado: string) => {
    switch (estado) {
      case 'confirmada':
        return <CheckCircle className="w-5 h-5 text-[#10B981]" />;
      case 'pendiente':
        return <Clock className="w-5 h-5 text-[#F59E0B]" />;
      case 'cancelada':
        return <XCircle className="w-5 h-5 text-[#EF4444]" />;
      default:
        return null;
    }
  };

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case 'confirmada':
        return 'bg-[#D1FAE5] text-[#10B981] border-[#10B981]';
      case 'pendiente':
        return 'bg-[#FEF3C7] text-[#F59E0B] border-[#F59E0B]';
      case 'cancelada':
        return 'bg-[#FEE2E2] text-[#EF4444] border-[#EF4444]';
      default:
        return 'bg-[#F1F5F9] text-[#64748B] border-[#E2E8F0]';
    }
  };

  const formatearFecha = (fecha: string) => {
    const date = new Date(fecha);
    return date.toLocaleDateString('es-ES', { 
      weekday: 'long', 
      day: 'numeric', 
      month: 'long' 
    });
  };

  const reservasConfirmadas = reservas.filter(r => r.estado === 'confirmada').length;
  const reservasPendientes = reservas.filter(r => r.estado === 'pendiente').length;
  const reservasCanceladas = reservas.filter(r => r.estado === 'cancelada').length;

  return (
    <div className="space-y-6">
      {/* Resumen de reservas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl p-6 border-2 border-[#10B981] shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[14px] leading-[20px] text-[#64748B]">Confirmadas</p>
              <p className="text-[30px] leading-[38px] font-bold text-[#10B981]">{reservasConfirmadas}</p>
            </div>
            <CheckCircle className="w-8 h-8 text-[#10B981]" />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border-2 border-[#F59E0B] shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[14px] leading-[20px] text-[#64748B]">Pendientes</p>
              <p className="text-[30px] leading-[38px] font-bold text-[#F59E0B]">{reservasPendientes}</p>
            </div>
            <Clock className="w-8 h-8 text-[#F59E0B]" />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border-2 border-[#EF4444] shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[14px] leading-[20px] text-[#64748B]">Canceladas</p>
              <p className="text-[30px] leading-[38px] font-bold text-[#EF4444]">{reservasCanceladas}</p>
            </div>
            <XCircle className="w-8 h-8 text-[#EF4444]" />
          </div>
        </div>
      </div>

      {/* Lista de reservas */}
      <div className="bg-white rounded-2xl shadow-lg border border-[#E2E8F0]">
        <div className="p-6 border-b border-[#E2E8F0]">
          <div className="flex items-center gap-3">
            <CalendarCheck className="w-6 h-6 text-[#10B981]" />
            <div>
              <h3 className="text-[20px] leading-[28px] font-semibold text-[#0F172A]">Reservas y Citas</h3>
              <p className="text-[14px] leading-[20px] text-[#64748B]">Gestión de todas las reservas de clientes</p>
            </div>
          </div>
        </div>

        <div className="divide-y divide-[#E2E8F0]">
          {reservas.map(reserva => (
            <div key={reserva.id} className="p-6 hover:bg-[#F8FAFC] transition-all duration-200">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4 flex-1">
                  {/* Estado Icon */}
                  <div className="mt-1">
                    {getEstadoIcon(reserva.estado)}
                  </div>

                  {/* Información de la reserva */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="font-semibold text-[16px] text-[#0F172A]">{reserva.cliente}</h4>
                      <span
                        className={`px-3 py-1 rounded-full text-[12px] leading-[16px] font-medium border ${getEstadoColor(
                          reserva.estado
                        )}`}
                      >
                        {reserva.estado.charAt(0).toUpperCase() + reserva.estado.slice(1)}
                      </span>
                    </div>

                    <p className="text-[14px] leading-[20px] text-[#64748B] mb-3">{reserva.servicio}</p>

                    <div className="flex items-center gap-4 text-[14px] text-[#64748B]">
                      <div className="flex items-center gap-1">
                        <CalendarCheck className="w-4 h-4" />
                        <span>{formatearFecha(reserva.fecha)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{reserva.hora}</span>
                      </div>
                      <div className="px-2 py-1 bg-[#F1F5F9] rounded-md text-[12px] font-medium">
                        {reserva.metodoPago}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Acciones */}
                <div className="flex gap-2">
                  {reserva.estado === 'pendiente' && (
                    <>
                      <button className="px-4 py-2 bg-[#10B981] text-white rounded-xl hover:bg-[#059669] transition-all duration-200 text-[14px] font-semibold shadow-md">
                        Confirmar
                      </button>
                      <button className="px-4 py-2 bg-[#EF4444] text-white rounded-xl hover:bg-[#DC2626] transition-all duration-200 text-[14px] font-semibold shadow-md">
                        Cancelar
                      </button>
                    </>
                  )}
                  {reserva.estado === 'confirmada' && (
                    <>
                      <button className="px-4 py-2 border border-[#E2E8F0] text-[#0F172A] rounded-xl hover:bg-[#F8FAFC] transition-all duration-200 text-[14px] font-semibold">
                        Ver Detalles
                      </button>
                      <button className="px-4 py-2 border border-[#EF4444] text-[#EF4444] rounded-xl hover:bg-[#FEE2E2] transition-all duration-200 text-[14px] font-semibold">
                        Cancelar
                      </button>
                    </>
                  )}
                  {reserva.estado === 'cancelada' && (
                    <button className="px-4 py-2 border border-[#E2E8F0] text-[#0F172A] rounded-xl hover:bg-[#F8FAFC] transition-all duration-200 text-[14px] font-semibold">
                      Ver Detalles
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

