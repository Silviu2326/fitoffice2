import { useState } from 'react';
import { RefreshCw, CheckCircle, AlertCircle, Clock, Settings } from 'lucide-react';

interface Renovacion {
  id: string;
  cliente: string;
  plan: string;
  fecha_renovacion: string;
  metodo_pago: string;
  monto: number;
  estado: 'programada' | 'exitosa' | 'fallida' | 'pendiente';
  dias_restantes: number;
}

export default function RenovacionesAutomaticas() {
  const [renovaciones] = useState<Renovacion[]>([
    {
      id: '1',
      cliente: 'Carlos Fernández',
      plan: 'Plan Premium',
      fecha_renovacion: '2025-11-05',
      metodo_pago: 'Tarjeta VISA ****4532',
      monto: 79,
      estado: 'programada',
      dias_restantes: 9
    },
    {
      id: '2',
      cliente: 'Laura Martínez',
      plan: '8 Sesiones PT/Mes',
      fecha_renovacion: '2025-11-01',
      metodo_pago: 'Domiciliación Bancaria',
      monto: 200,
      estado: 'exitosa',
      dias_restantes: 0
    },
    {
      id: '3',
      cliente: 'Pedro Sánchez',
      plan: 'Plan Básico',
      fecha_renovacion: '2025-10-28',
      metodo_pago: 'Tarjeta MASTERCARD ****8765',
      monto: 49,
      estado: 'fallida',
      dias_restantes: -2
    },
    {
      id: '4',
      cliente: 'Ana García',
      plan: 'Plan VIP',
      fecha_renovacion: '2025-11-10',
      metodo_pago: 'Tarjeta VISA ****1234',
      monto: 129,
      estado: 'programada',
      dias_restantes: 14
    }
  ]);

  const [filtroEstado, setFiltroEstado] = useState<string>('todas');

  const renovacionesFiltradas = renovaciones.filter(r => 
    filtroEstado === 'todas' || r.estado === filtroEstado
  );

  const getEstadoBadge = (estado: Renovacion['estado']) => {
    const badges = {
      programada: { 
        color: 'bg-[#DBEAFE] text-[#3B82F6] border-[#3B82F6]/20',
        icon: Clock,
        label: 'Programada'
      },
      exitosa: {
        color: 'bg-[#D1FAE5] text-[#10B981] border-[#10B981]/20',
        icon: CheckCircle,
        label: 'Exitosa'
      },
      fallida: {
        color: 'bg-[#FEE2E2] text-[#EF4444] border-[#EF4444]/20',
        icon: AlertCircle,
        label: 'Fallida'
      },
      pendiente: {
        color: 'bg-[#FEF3C7] text-[#F59E0B] border-[#F59E0B]/20',
        icon: Clock,
        label: 'Pendiente'
      }
    };
    const badge = badges[estado];
    const Icon = badge.icon;
    return (
      <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border ${badge.color}`}>
        <Icon className="w-3.5 h-3.5" />
        {badge.label}
      </span>
    );
  };

  const totales = {
    programadas: renovaciones.filter(r => r.estado === 'programada').length,
    exitosas: renovaciones.filter(r => r.estado === 'exitosa').length,
    fallidas: renovaciones.filter(r => r.estado === 'fallida').length,
    ingresosEstimados: renovaciones
      .filter(r => r.estado === 'programada')
      .reduce((sum, r) => sum + r.monto, 0)
  };

  return (
    <div className="space-y-6">
      {/* Encabezado */}
      <div>
        <h2 className="text-2xl font-bold text-[#0F172A]">Renovaciones Automáticas</h2>
        <p className="text-[#64748B] mt-1">Gestión y seguimiento de renovaciones programadas</p>
      </div>

      {/* Información */}
      <div className="bg-[#EEF2FF] border border-[#6366F1]/20 rounded-xl p-5">
        <div className="flex gap-3">
          <div className="bg-white p-2 rounded-lg flex-shrink-0">
            <RefreshCw className="w-5 h-5 text-[#6366F1]" />
          </div>
          <div>
            <h3 className="font-bold text-[#0F172A] mb-2">Sistema de Renovación Automática</h3>
            <p className="text-sm text-[#64748B] leading-relaxed">
              Las renovaciones automáticas procesan los pagos recurrentes según la fecha programada. 
              El sistema intenta el cobro hasta 3 veces antes de marcar una renovación como fallida.
            </p>
          </div>
        </div>
      </div>

      {/* Resumen */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-200">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-[#DBEAFE] p-3 rounded-xl">
              <Clock className="w-6 h-6 text-[#3B82F6]" />
            </div>
            <span className="text-sm font-semibold text-[#64748B]">Programadas</span>
          </div>
          <p className="text-3xl font-bold text-[#0F172A]">{totales.programadas}</p>
        </div>

        <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-200">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-[#D1FAE5] p-3 rounded-xl">
              <CheckCircle className="w-6 h-6 text-[#10B981]" />
            </div>
            <span className="text-sm font-semibold text-[#64748B]">Exitosas</span>
          </div>
          <p className="text-3xl font-bold text-[#0F172A]">{totales.exitosas}</p>
        </div>

        <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-200">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-[#FEE2E2] p-3 rounded-xl">
              <AlertCircle className="w-6 h-6 text-[#EF4444]" />
            </div>
            <span className="text-sm font-semibold text-[#64748B]">Fallidas</span>
          </div>
          <p className="text-3xl font-bold text-[#0F172A]">{totales.fallidas}</p>
        </div>

        <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-200">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-[#D1FAE5] p-3 rounded-xl">
              <RefreshCw className="w-6 h-6 text-[#10B981]" />
            </div>
            <span className="text-sm font-semibold text-[#64748B]">Ingresos Estimados</span>
          </div>
          <p className="text-3xl font-bold text-[#0F172A]">€{totales.ingresosEstimados}</p>
        </div>
      </div>

      {/* Filtros */}
      <div className="flex gap-3 flex-wrap">
        <button
          onClick={() => setFiltroEstado('todas')}
          className={`px-5 py-2.5 rounded-xl font-semibold transition-all duration-200 ${
            filtroEstado === 'todas'
              ? 'bg-[#6366F1] text-white shadow-md'
              : 'bg-white text-[#64748B] border border-[#E2E8F0] hover:bg-[#F8FAFC] hover:border-[#6366F1]'
          }`}
        >
          Todas
        </button>
        <button
          onClick={() => setFiltroEstado('programada')}
          className={`px-5 py-2.5 rounded-xl font-semibold transition-all duration-200 ${
            filtroEstado === 'programada'
              ? 'bg-[#3B82F6] text-white shadow-md'
              : 'bg-white text-[#64748B] border border-[#E2E8F0] hover:bg-[#F8FAFC] hover:border-[#3B82F6]'
          }`}
        >
          Programadas
        </button>
        <button
          onClick={() => setFiltroEstado('exitosa')}
          className={`px-5 py-2.5 rounded-xl font-semibold transition-all duration-200 ${
            filtroEstado === 'exitosa'
              ? 'bg-[#10B981] text-white shadow-md'
              : 'bg-white text-[#64748B] border border-[#E2E8F0] hover:bg-[#F8FAFC] hover:border-[#10B981]'
          }`}
        >
          Exitosas
        </button>
        <button
          onClick={() => setFiltroEstado('fallida')}
          className={`px-5 py-2.5 rounded-xl font-semibold transition-all duration-200 ${
            filtroEstado === 'fallida'
              ? 'bg-[#EF4444] text-white shadow-md'
              : 'bg-white text-[#64748B] border border-[#E2E8F0] hover:bg-[#F8FAFC] hover:border-[#EF4444]'
          }`}
        >
          Fallidas
        </button>
      </div>

      {/* Lista de renovaciones */}
      <div className="space-y-4">
        {renovacionesFiltradas.map(renovacion => (
          <div key={renovacion.id} className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-200">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3 flex-wrap">
                  <h3 className="text-lg font-bold text-[#0F172A]">{renovacion.cliente}</h3>
                  {getEstadoBadge(renovacion.estado)}
                  {renovacion.dias_restantes > 0 && (
                    <span className="text-xs font-medium text-[#64748B] bg-[#F8FAFC] px-3 py-1.5 rounded-full border border-[#E2E8F0]">
                      En {renovacion.dias_restantes} días
                    </span>
                  )}
                </div>

                <p className="text-[#64748B] mb-3 font-semibold">{renovacion.plan}</p>

                <div className="flex flex-wrap gap-4 text-sm font-medium">
                  <span className="text-[#64748B]">
                    Fecha: <span className="text-[#0F172A] font-semibold">{new Date(renovacion.fecha_renovacion).toLocaleDateString()}</span>
                  </span>
                  <span className="text-[#64748B]">
                    Método: <span className="text-[#0F172A] font-semibold">{renovacion.metodo_pago}</span>
                  </span>
                  <span className="text-[#10B981] font-bold">
                    €{renovacion.monto}
                  </span>
                </div>
              </div>

              {renovacion.estado === 'fallida' && (
                <button className="bg-[#6366F1] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#4F46E5] active:bg-[#4338CA] transition-all duration-200 shadow-md hover:shadow-lg flex items-center gap-2">
                  <RefreshCw className="w-4 h-4" />
                  Reintentar
                </button>
              )}
              {renovacion.estado === 'programada' && (
                <button className="text-[#64748B] hover:text-[#6366F1] transition-colors duration-200">
                  <Settings className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {renovacionesFiltradas.length === 0 && (
        <div className="text-center py-12 bg-white rounded-xl border border-[#E2E8F0]">
          <div className="bg-[#F8FAFC] rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <RefreshCw className="w-8 h-8 text-[#94A3B8]" />
          </div>
          <h3 className="text-[#0F172A] text-lg font-semibold mb-2">No hay renovaciones</h3>
          <p className="text-[#64748B]">No hay renovaciones que coincidan con los filtros seleccionados</p>
        </div>
      )}
    </div>
  );
}

