import { User, Video, ClipboardCheck, Clock } from 'lucide-react';

interface Cita {
  id: string;
  cliente: string;
  tipo: 'sesion' | 'videollamada' | 'evaluacion';
  hora: string;
  duracion: number;
  estado: 'confirmada' | 'pendiente' | 'cancelada';
}

export default function VistaPersonal() {
  // Datos de ejemplo
  const citasDelDia: Cita[] = [
    {
      id: '1',
      cliente: 'María García',
      tipo: 'sesion',
      hora: '09:00',
      duracion: 60,
      estado: 'confirmada'
    },
    {
      id: '2',
      cliente: 'Juan Pérez',
      tipo: 'videollamada',
      hora: '11:00',
      duracion: 45,
      estado: 'confirmada'
    },
    {
      id: '3',
      cliente: 'Ana Martínez',
      tipo: 'evaluacion',
      hora: '14:00',
      duracion: 90,
      estado: 'pendiente'
    },
    {
      id: '4',
      cliente: 'Carlos López',
      tipo: 'sesion',
      hora: '16:30',
      duracion: 60,
      estado: 'confirmada'
    }
  ];

  const getTipoIcon = (tipo: string) => {
    switch (tipo) {
      case 'sesion':
        return <User className="w-5 h-5" />;
      case 'videollamada':
        return <Video className="w-5 h-5" />;
      case 'evaluacion':
        return <ClipboardCheck className="w-5 h-5" />;
      default:
        return <Clock className="w-5 h-5" />;
    }
  };

  const getTipoLabel = (tipo: string) => {
    switch (tipo) {
      case 'sesion':
        return 'Sesión 1 a 1';
      case 'videollamada':
        return 'Videollamada';
      case 'evaluacion':
        return 'Evaluación';
      default:
        return tipo;
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] rounded-2xl p-6 text-white shadow-lg">
        <h2 className="text-[24px] leading-[32px] font-semibold mb-2">Mi Agenda Personal</h2>
        <p className="text-[14px] leading-[20px] text-[#EEF2FF]">Gestiona tus sesiones 1 a 1, videollamadas y evaluaciones</p>
      </div>

      {/* Resumen del día */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl p-6 border border-[#E2E8F0] shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[14px] leading-[20px] text-[#64748B]">Citas Hoy</p>
              <p className="text-[24px] leading-[32px] font-semibold text-[#0F172A]">{citasDelDia.length}</p>
            </div>
            <div className="bg-[#EEF2FF] p-3 rounded-xl">
              <Clock className="w-6 h-6 text-[#6366F1]" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-[#E2E8F0] shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[14px] leading-[20px] text-[#64748B]">Confirmadas</p>
              <p className="text-[24px] leading-[32px] font-semibold text-[#0F172A]">
                {citasDelDia.filter(c => c.estado === 'confirmada').length}
              </p>
            </div>
            <div className="bg-[#D1FAE5] p-3 rounded-xl">
              <User className="w-6 h-6 text-[#10B981]" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-[#E2E8F0] shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[14px] leading-[20px] text-[#64748B]">Horas Totales</p>
              <p className="text-[24px] leading-[32px] font-semibold text-[#0F172A]">
                {citasDelDia.reduce((acc, c) => acc + c.duracion, 0) / 60}h
              </p>
            </div>
            <div className="bg-[#DBEAFE] p-3 rounded-xl">
              <Clock className="w-6 h-6 text-[#3B82F6]" />
            </div>
          </div>
        </div>
      </div>

      {/* Lista de citas */}
      <div className="bg-white rounded-2xl shadow-lg border border-[#E2E8F0]">
        <div className="p-6 border-b border-[#E2E8F0]">
          <h3 className="text-[20px] leading-[28px] font-semibold text-[#0F172A]">Citas de Hoy</h3>
          <p className="text-[14px] leading-[20px] text-[#64748B]">Lunes, 26 de Octubre 2025</p>
        </div>

        <div className="divide-y divide-[#E2E8F0]">
          {citasDelDia.map(cita => (
            <div key={cita.id} className="p-6 hover:bg-[#F8FAFC] transition-all duration-200">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  {/* Hora */}
                  <div className="text-center min-w-[60px]">
                    <p className="text-[18px] leading-[28px] font-bold text-[#0F172A]">{cita.hora}</p>
                    <p className="text-[12px] leading-[16px] text-[#94A3B8]">{cita.duracion} min</p>
                  </div>

                  {/* Icono del tipo */}
                  <div className="bg-[#EEF2FF] p-3 rounded-xl text-[#6366F1]">
                    {getTipoIcon(cita.tipo)}
                  </div>

                  {/* Información */}
                  <div>
                    <h4 className="font-semibold text-[16px] text-[#0F172A] mb-1">{cita.cliente}</h4>
                    <p className="text-[14px] leading-[20px] text-[#64748B] mb-2">{getTipoLabel(cita.tipo)}</p>
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-[12px] leading-[16px] font-medium border ${getEstadoColor(
                        cita.estado
                      )}`}
                    >
                      {cita.estado.charAt(0).toUpperCase() + cita.estado.slice(1)}
                    </span>
                  </div>
                </div>

                {/* Acciones */}
                <div className="flex gap-2">
                  <button className="px-4 py-2 bg-[#10B981] text-white rounded-xl hover:bg-[#059669] transition-all duration-200 text-[14px] font-semibold shadow-md">
                    Iniciar
                  </button>
                  <button className="px-4 py-2 border border-[#E2E8F0] text-[#0F172A] rounded-xl hover:bg-[#F8FAFC] transition-all duration-200 text-[14px] font-semibold">
                    Detalles
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

