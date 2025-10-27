import { useState } from 'react';
import { Shield, CheckCircle, XCircle, Clock, User, Calendar } from 'lucide-react';

interface RegistroAcceso {
  id: string;
  cliente: string;
  plan: string;
  tipo_acceso: 'entrada' | 'salida';
  fecha_hora: string;
  ubicacion: string;
  estado_suscripcion: 'activa' | 'vencida' | 'pausada';
  sesiones_restantes?: number;
  acceso_permitido: boolean;
}

export default function ControlAcceso() {
  const [registros] = useState<RegistroAcceso[]>([
    {
      id: '1',
      cliente: 'María López',
      plan: 'Plan Premium',
      tipo_acceso: 'entrada',
      fecha_hora: '2025-10-26 08:30',
      ubicacion: 'Entrada Principal',
      estado_suscripcion: 'activa',
      acceso_permitido: true
    },
    {
      id: '2',
      cliente: 'Juan Pérez',
      plan: '8 Sesiones PT/Mes',
      tipo_acceso: 'entrada',
      fecha_hora: '2025-10-26 09:15',
      ubicacion: 'Sala de PT',
      estado_suscripcion: 'activa',
      sesiones_restantes: 2,
      acceso_permitido: true
    },
    {
      id: '3',
      cliente: 'Pedro Martínez',
      plan: 'Plan Básico',
      tipo_acceso: 'entrada',
      fecha_hora: '2025-10-26 10:00',
      ubicacion: 'Entrada Principal',
      estado_suscripcion: 'vencida',
      acceso_permitido: false
    },
    {
      id: '4',
      cliente: 'Ana García',
      plan: 'Plan VIP',
      tipo_acceso: 'entrada',
      fecha_hora: '2025-10-26 11:45',
      ubicacion: 'Entrada VIP',
      estado_suscripcion: 'activa',
      acceso_permitido: true
    },
    {
      id: '5',
      cliente: 'Carlos Ruiz',
      plan: '4 Sesiones PT/Mes',
      tipo_acceso: 'entrada',
      fecha_hora: '2025-10-26 14:20',
      ubicacion: 'Sala de PT',
      estado_suscripcion: 'activa',
      sesiones_restantes: 0,
      acceso_permitido: false
    }
  ]);

  const [filtroAcceso, setFiltroAcceso] = useState<string>('todos');

  const registrosFiltrados = registros.filter(r => {
    if (filtroAcceso === 'todos') return true;
    if (filtroAcceso === 'permitidos') return r.acceso_permitido;
    if (filtroAcceso === 'denegados') return !r.acceso_permitido;
    return true;
  });

  const getEstadoSuscripcionBadge = (estado: RegistroAcceso['estado_suscripcion']) => {
    const badges = {
      activa: {
        color: 'bg-[#D1FAE5] text-[#10B981] border-[#10B981]/20',
        label: 'Activa'
      },
      vencida: {
        color: 'bg-[#FEE2E2] text-[#EF4444] border-[#EF4444]/20',
        label: 'Vencida'
      },
      pausada: {
        color: 'bg-[#FEF3C7] text-[#F59E0B] border-[#F59E0B]/20',
        label: 'Pausada'
      }
    };
    const badge = badges[estado];
    return (
      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border ${badge.color}`}>
        {badge.label}
      </span>
    );
  };

  const totales = {
    total_accesos: registros.length,
    permitidos: registros.filter(r => r.acceso_permitido).length,
    denegados: registros.filter(r => !r.acceso_permitido).length,
    hoy: registros.filter(r => {
      const fecha = new Date(r.fecha_hora);
      const hoy = new Date();
      return fecha.toDateString() === hoy.toDateString();
    }).length
  };

  return (
    <div className="space-y-6">
      {/* Encabezado */}
      <div>
        <h2 className="text-2xl font-bold text-[#0F172A]">Control de Acceso</h2>
        <p className="text-[#64748B] mt-1">Monitoreo y validación de accesos por suscripción</p>
      </div>

      {/* Información */}
      <div className="bg-[#D1FAE5] border border-[#10B981]/20 rounded-xl p-5">
        <div className="flex gap-3">
          <div className="bg-white p-2 rounded-lg flex-shrink-0">
            <Shield className="w-5 h-5 text-[#10B981]" />
          </div>
          <div>
            <h3 className="font-bold text-[#0F172A] mb-2">Sistema de Control de Acceso</h3>
            <p className="text-sm text-[#64748B] leading-relaxed">
              El sistema verifica automáticamente el estado de la suscripción y las sesiones disponibles 
              antes de permitir el acceso. Los accesos denegados quedan registrados para seguimiento.
            </p>
          </div>
        </div>
      </div>

      {/* Resumen */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-200">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-[#EEF2FF] p-3 rounded-xl">
              <Shield className="w-6 h-6 text-[#6366F1]" />
            </div>
            <span className="text-sm font-semibold text-[#64748B]">Total Accesos</span>
          </div>
          <p className="text-3xl font-bold text-[#0F172A]">{totales.total_accesos}</p>
        </div>

        <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-200">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-[#D1FAE5] p-3 rounded-xl">
              <CheckCircle className="w-6 h-6 text-[#10B981]" />
            </div>
            <span className="text-sm font-semibold text-[#64748B]">Permitidos</span>
          </div>
          <p className="text-3xl font-bold text-[#0F172A]">{totales.permitidos}</p>
        </div>

        <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-200">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-[#FEE2E2] p-3 rounded-xl">
              <XCircle className="w-6 h-6 text-[#EF4444]" />
            </div>
            <span className="text-sm font-semibold text-[#64748B]">Denegados</span>
          </div>
          <p className="text-3xl font-bold text-[#0F172A]">{totales.denegados}</p>
        </div>

        <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-200">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-[#DBEAFE] p-3 rounded-xl">
              <Calendar className="w-6 h-6 text-[#3B82F6]" />
            </div>
            <span className="text-sm font-semibold text-[#64748B]">Hoy</span>
          </div>
          <p className="text-3xl font-bold text-[#0F172A]">{totales.hoy}</p>
        </div>
      </div>

      {/* Filtros */}
      <div className="flex gap-3 flex-wrap">
        <button
          onClick={() => setFiltroAcceso('todos')}
          className={`px-5 py-2.5 rounded-xl font-semibold transition-all duration-200 ${
            filtroAcceso === 'todos'
              ? 'bg-[#6366F1] text-white shadow-md'
              : 'bg-white text-[#64748B] border border-[#E2E8F0] hover:bg-[#F8FAFC] hover:border-[#6366F1]'
          }`}
        >
          Todos
        </button>
        <button
          onClick={() => setFiltroAcceso('permitidos')}
          className={`px-5 py-2.5 rounded-xl font-semibold transition-all duration-200 ${
            filtroAcceso === 'permitidos'
              ? 'bg-[#10B981] text-white shadow-md'
              : 'bg-white text-[#64748B] border border-[#E2E8F0] hover:bg-[#F8FAFC] hover:border-[#10B981]'
          }`}
        >
          Permitidos
        </button>
        <button
          onClick={() => setFiltroAcceso('denegados')}
          className={`px-5 py-2.5 rounded-xl font-semibold transition-all duration-200 ${
            filtroAcceso === 'denegados'
              ? 'bg-[#EF4444] text-white shadow-md'
              : 'bg-white text-[#64748B] border border-[#E2E8F0] hover:bg-[#F8FAFC] hover:border-[#EF4444]'
          }`}
        >
          Denegados
        </button>
      </div>

      {/* Lista de registros */}
      <div className="space-y-4">
        {registrosFiltrados.map(registro => (
          <div key={registro.id} className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-200">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3 flex-wrap">
                  <div className="flex items-center gap-2">
                    <div className="bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] p-2 rounded-lg shadow-sm">
                      <User className="w-4 h-4 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-[#0F172A]">{registro.cliente}</h3>
                  </div>
                  {getEstadoSuscripcionBadge(registro.estado_suscripcion)}
                  {registro.acceso_permitido ? (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#D1FAE5] text-[#10B981] border border-[#10B981]/20 rounded-full text-xs font-semibold">
                      <CheckCircle className="w-3.5 h-3.5" />
                      Acceso Permitido
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#FEE2E2] text-[#EF4444] border border-[#EF4444]/20 rounded-full text-xs font-semibold">
                      <XCircle className="w-3.5 h-3.5" />
                      Acceso Denegado
                    </span>
                  )}
                </div>

                <p className="text-[#64748B] mb-3 font-semibold">{registro.plan}</p>

                <div className="flex flex-wrap gap-4 text-sm font-medium">
                  <span className="text-[#64748B] flex items-center gap-1.5">
                    <Clock className="w-4 h-4" />
                    {registro.fecha_hora}
                  </span>
                  <span className="text-[#64748B]">
                    Ubicación: <span className="text-[#0F172A] font-semibold">{registro.ubicacion}</span>
                  </span>
                  {registro.sesiones_restantes !== undefined && (
                    <span className={`font-bold ${
                      registro.sesiones_restantes === 0 ? 'text-[#EF4444]' : 'text-[#10B981]'
                    }`}>
                      {registro.sesiones_restantes} sesiones restantes
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {registrosFiltrados.length === 0 && (
        <div className="text-center py-12 bg-white rounded-xl border border-[#E2E8F0]">
          <div className="bg-[#F8FAFC] rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <Shield className="w-8 h-8 text-[#94A3B8]" />
          </div>
          <h3 className="text-[#0F172A] text-lg font-semibold mb-2">No hay registros</h3>
          <p className="text-[#64748B]">No hay registros de acceso que coincidan con los filtros</p>
        </div>
      )}
    </div>
  );
}

