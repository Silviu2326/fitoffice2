import { useState } from 'react';
import { AlertCircle, XCircle, Clock, DollarSign, FileText } from 'lucide-react';

interface Ausencia {
  id: string;
  socio: string;
  clase: string;
  fecha: string;
  hora: string;
  tipo: 'cancelacion' | 'no_show' | 'tardanza';
  avisoHoras?: number;
  penalizacion: number;
  estado: 'registrada' | 'penalizada' | 'justificada';
  justificacion?: string;
}

export default function GestorAusencias() {
  const [ausencias] = useState<Ausencia[]>([
    {
      id: '1',
      socio: 'Pedro Sánchez',
      clase: 'Spinning',
      fecha: '2025-10-26',
      hora: '09:00',
      tipo: 'no_show',
      penalizacion: 10.00,
      estado: 'penalizada'
    },
    {
      id: '2',
      socio: 'Laura Fernández',
      clase: 'Pilates',
      fecha: '2025-10-26',
      hora: '10:00',
      tipo: 'cancelacion',
      avisoHoras: 1,
      penalizacion: 5.00,
      estado: 'penalizada'
    },
    {
      id: '3',
      socio: 'Miguel Torres',
      clase: 'Yoga',
      fecha: '2025-10-25',
      hora: '18:00',
      tipo: 'no_show',
      penalizacion: 10.00,
      estado: 'justificada',
      justificacion: 'Emergencia médica'
    },
    {
      id: '4',
      socio: 'Carmen Ruiz',
      clase: 'CrossFit',
      fecha: '2025-10-25',
      hora: '19:00',
      tipo: 'cancelacion',
      avisoHoras: 0.5,
      penalizacion: 5.00,
      estado: 'registrada'
    }
  ]);

  const [filtro, setFiltro] = useState<'todas' | 'no_show' | 'cancelacion' | 'tardanza'>('todas');

  const getTipoBadge = (tipo: string) => {
    switch (tipo) {
      case 'no_show':
        return (
          <span className="px-3 py-1 bg-[#FEE2E2] text-[#EF4444] text-xs font-medium rounded-full">
            No Show
          </span>
        );
      case 'cancelacion':
        return (
          <span className="px-3 py-1 bg-[#FEF3C7] text-[#F59E0B] text-xs font-medium rounded-full">
            Cancelación
          </span>
        );
      case 'tardanza':
        return (
          <span className="px-3 py-1 bg-[#FEF3C7] text-[#F59E0B] text-xs font-medium rounded-full">
            Tardanza
          </span>
        );
      default:
        return null;
    }
  };

  const getEstadoBadge = (estado: string) => {
    switch (estado) {
      case 'registrada':
        return (
          <span className="px-3 py-1 bg-[#DBEAFE] text-[#3B82F6] text-xs font-medium rounded-full">
            Registrada
          </span>
        );
      case 'penalizada':
        return (
          <span className="px-3 py-1 bg-[#EEF2FF] text-[#6366F1] text-xs font-medium rounded-full">
            Penalizada
          </span>
        );
      case 'justificada':
        return (
          <span className="px-3 py-1 bg-[#D1FAE5] text-[#10B981] text-xs font-medium rounded-full">
            Justificada
          </span>
        );
      default:
        return null;
    }
  };

  const ausenciasFiltradas = filtro === 'todas' 
    ? ausencias 
    : ausencias.filter(a => a.tipo === filtro);

  const totalNoShow = ausencias.filter(a => a.tipo === 'no_show').length;
  const totalCancelaciones = ausencias.filter(a => a.tipo === 'cancelacion').length;
  const totalPenalizaciones = ausencias
    .filter(a => a.estado === 'penalizada')
    .reduce((sum, a) => sum + a.penalizacion, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-[#0F172A]">Gestión de Ausencias</h2>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-[#6366F1] hover:bg-[#4F46E5] text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#6366F1] focus:ring-offset-2">
            Registrar Asistencia
          </button>
          <button className="px-4 py-2 bg-[#F8FAFC] hover:bg-[#F1F5F9] text-[#0F172A] font-semibold rounded-lg border border-[#E2E8F0] transition-all duration-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#6366F1] focus:ring-offset-2">
            Exportar Reporte
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-[#F8FAFC] rounded-xl p-6 border border-[#E2E8F0] shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <XCircle className="w-5 h-5 text-[#EF4444]" />
            <h3 className="text-[#0F172A] font-semibold">No Show</h3>
          </div>
          <p className="text-3xl font-bold text-[#0F172A]">{totalNoShow}</p>
          <p className="text-sm text-[#64748B] mt-1">Últimos 7 días</p>
        </div>

        <div className="bg-[#F8FAFC] rounded-xl p-6 border border-[#E2E8F0] shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <AlertCircle className="w-5 h-5 text-[#F59E0B]" />
            <h3 className="text-[#0F172A] font-semibold">Cancelaciones</h3>
          </div>
          <p className="text-3xl font-bold text-[#0F172A]">{totalCancelaciones}</p>
          <p className="text-sm text-[#64748B] mt-1">Con y sin aviso</p>
        </div>

        <div className="bg-[#F8FAFC] rounded-xl p-6 border border-[#E2E8F0] shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <DollarSign className="w-5 h-5 text-[#6366F1]" />
            <h3 className="text-[#0F172A] font-semibold">Penalizaciones</h3>
          </div>
          <p className="text-3xl font-bold text-[#0F172A]">${totalPenalizaciones.toFixed(2)}</p>
          <p className="text-sm text-[#64748B] mt-1">Total acumulado</p>
        </div>
      </div>

      {/* Filtros */}
      <div className="flex gap-2">
        <button
          onClick={() => setFiltro('todas')}
          className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200 ${
            filtro === 'todas'
              ? 'bg-[#6366F1] text-white shadow-md'
              : 'bg-[#F1F5F9] text-[#64748B] hover:bg-[#E2E8F0]'
          }`}
        >
          Todas
        </button>
        <button
          onClick={() => setFiltro('no_show')}
          className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200 ${
            filtro === 'no_show'
              ? 'bg-[#6366F1] text-white shadow-md'
              : 'bg-[#F1F5F9] text-[#64748B] hover:bg-[#E2E8F0]'
          }`}
        >
          No Show
        </button>
        <button
          onClick={() => setFiltro('cancelacion')}
          className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200 ${
            filtro === 'cancelacion'
              ? 'bg-[#6366F1] text-white shadow-md'
              : 'bg-[#F1F5F9] text-[#64748B] hover:bg-[#E2E8F0]'
          }`}
        >
          Cancelaciones
        </button>
        <button
          onClick={() => setFiltro('tardanza')}
          className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200 ${
            filtro === 'tardanza'
              ? 'bg-[#6366F1] text-white shadow-md'
              : 'bg-[#F1F5F9] text-[#64748B] hover:bg-[#E2E8F0]'
          }`}
        >
          Tardanzas
        </button>
      </div>

      {/* Lista de ausencias */}
      <div className="space-y-3">
        {ausenciasFiltradas.map((ausencia) => (
          <div
            key={ausencia.id}
            className="bg-white rounded-xl p-6 border border-[#E2E8F0] hover:shadow-lg transition-all duration-200"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <h4 className="text-lg font-semibold text-[#0F172A]">{ausencia.socio}</h4>
                  {getTipoBadge(ausencia.tipo)}
                  {getEstadoBadge(ausencia.estado)}
                </div>
                
                <div className="grid grid-cols-2 gap-3 text-sm mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-[#64748B]">Clase:</span>
                    <span className="text-[#0F172A] font-medium">{ausencia.clase}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[#64748B]">Fecha:</span>
                    <span className="text-[#0F172A] font-medium">{ausencia.fecha}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[#64748B]">Hora:</span>
                    <span className="text-[#0F172A] font-medium">{ausencia.hora}</span>
                  </div>
                  {ausencia.avisoHoras !== undefined && (
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-[#64748B]" />
                      <span className="text-[#0F172A] font-medium">Aviso: {ausencia.avisoHoras}h antes</span>
                    </div>
                  )}
                </div>

                {ausencia.penalizacion > 0 && (
                  <div className="flex items-center gap-2 text-sm">
                    <DollarSign className="w-4 h-4 text-[#6366F1]" />
                    <span className="text-[#6366F1] font-semibold">
                      Penalización: ${ausencia.penalizacion.toFixed(2)}
                    </span>
                  </div>
                )}

                {ausencia.justificacion && (
                  <div className="mt-3 p-4 bg-[#D1FAE5] rounded-lg border border-[#10B981]/20">
                    <div className="flex items-center gap-2 mb-1">
                      <FileText className="w-4 h-4 text-[#10B981]" />
                      <span className="text-sm font-semibold text-[#10B981]">Justificación:</span>
                    </div>
                    <p className="text-sm text-[#0F172A]">{ausencia.justificacion}</p>
                  </div>
                )}
              </div>

              <div className="flex gap-2 ml-4">
                {ausencia.estado === 'registrada' && (
                  <>
                    <button className="px-4 py-2 bg-[#6366F1] hover:bg-[#4F46E5] text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#6366F1] focus:ring-offset-2">
                      Aplicar Penalización
                    </button>
                    <button className="px-4 py-2 bg-[#10B981] hover:bg-[#059669] text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#10B981] focus:ring-offset-2">
                      Justificar
                    </button>
                  </>
                )}
                {ausencia.estado === 'penalizada' && (
                  <button className="px-4 py-2 bg-[#F59E0B] hover:bg-[#D97706] text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#F59E0B] focus:ring-offset-2">
                    Revertir
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

