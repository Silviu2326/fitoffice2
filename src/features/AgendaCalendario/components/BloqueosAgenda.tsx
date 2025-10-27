import { Ban, Plus, Calendar, Trash2 } from 'lucide-react';
import { useState } from 'react';

interface Bloqueo {
  id: string;
  titulo: string;
  fechaInicio: string;
  fechaFin: string;
  tipo: 'vacaciones' | 'dia_libre' | 'mantenimiento' | 'evento';
  descripcion: string;
}

export default function BloqueosAgenda() {
  const [bloqueos, setBloqueos] = useState<Bloqueo[]>([
    {
      id: '1',
      titulo: 'Vacaciones de Verano',
      fechaInicio: '2025-08-01',
      fechaFin: '2025-08-15',
      tipo: 'vacaciones',
      descripcion: 'Vacaciones anuales programadas'
    },
    {
      id: '2',
      titulo: 'Mantenimiento de Equipos',
      fechaInicio: '2025-11-05',
      fechaFin: '2025-11-05',
      tipo: 'mantenimiento',
      descripcion: 'Revisión y mantenimiento anual de equipos'
    },
    {
      id: '3',
      titulo: 'Evento Especial - Maratón',
      fechaInicio: '2025-11-20',
      fechaFin: '2025-11-20',
      tipo: 'evento',
      descripcion: 'Participación en maratón local'
    }
  ]);

  const getTipoColor = (tipo: string) => {
    switch (tipo) {
      case 'vacaciones':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'dia_libre':
        return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'mantenimiento':
        return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'evento':
        return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  const getTipoLabel = (tipo: string) => {
    switch (tipo) {
      case 'vacaciones':
        return 'Vacaciones';
      case 'dia_libre':
        return 'Día Libre';
      case 'mantenimiento':
        return 'Mantenimiento';
      case 'evento':
        return 'Evento';
      default:
        return tipo;
    }
  };

  const formatearFecha = (fecha: string) => {
    const date = new Date(fecha);
    return date.toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' });
  };

  const calcularDias = (inicio: string, fin: string) => {
    const fechaInicio = new Date(inicio);
    const fechaFin = new Date(fin);
    const dias = Math.ceil((fechaFin.getTime() - fechaInicio.getTime()) / (1000 * 60 * 60 * 24)) + 1;
    return dias;
  };

  const eliminarBloqueo = (id: string) => {
    setBloqueos(prev => prev.filter(b => b.id !== id));
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-[#E2E8F0]">
      <div className="p-6 border-b border-[#E2E8F0]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Ban className="w-6 h-6 text-[#EF4444]" />
            <div>
              <h3 className="text-[20px] leading-[28px] font-semibold text-[#0F172A]">Bloqueos de Agenda</h3>
              <p className="text-[14px] leading-[20px] text-[#64748B]">Gestiona vacaciones, días libres y mantenimiento</p>
            </div>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-[#EF4444] text-white rounded-xl hover:bg-[#DC2626] transition-all duration-200 shadow-md">
            <Plus className="w-4 h-4" />
            <span className="font-semibold text-[14px]">Nuevo Bloqueo</span>
          </button>
        </div>
      </div>

      <div className="p-6">
        {bloqueos.length === 0 ? (
          <div className="text-center py-12">
            <Ban className="w-16 h-16 text-[#E2E8F0] mx-auto mb-4" />
            <p className="text-[16px] text-[#64748B] mb-2">No hay bloqueos programados</p>
            <p className="text-[14px] text-[#94A3B8]">
              Agrega vacaciones o días libres para bloquear tu agenda
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {bloqueos.map(bloqueo => {
              const dias = calcularDias(bloqueo.fechaInicio, bloqueo.fechaFin);
              return (
                <div
                  key={bloqueo.id}
                  className="p-4 border-2 border-[#E2E8F0] rounded-xl hover:border-[#6366F1] transition-all duration-200"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4 flex-1">
                      <div className="bg-[#FEE2E2] p-3 rounded-xl">
                        <Calendar className="w-5 h-5 text-[#EF4444]" />
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-semibold text-[16px] text-[#0F172A]">{bloqueo.titulo}</h4>
                          <span
                            className={`px-2 py-1 rounded-full text-[12px] leading-[16px] font-medium border ${getTipoColor(
                              bloqueo.tipo
                            )}`}
                          >
                            {getTipoLabel(bloqueo.tipo)}
                          </span>
                        </div>

                        <p className="text-[14px] leading-[20px] text-[#64748B] mb-3">{bloqueo.descripcion}</p>

                        <div className="flex items-center gap-4 text-[14px]">
                          <div className="flex items-center gap-2 text-[#64748B]">
                            <Calendar className="w-4 h-4" />
                            <span>
                              {formatearFecha(bloqueo.fechaInicio)} - {formatearFecha(bloqueo.fechaFin)}
                            </span>
                          </div>
                          <span className="text-[#10B981] font-medium">
                            {dias} {dias === 1 ? 'día' : 'días'}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button className="px-3 py-2 border border-[#E2E8F0] text-[#0F172A] rounded-xl hover:bg-[#F8FAFC] transition-all duration-200 text-[14px] font-semibold">
                        Editar
                      </button>
                      <button
                        onClick={() => eliminarBloqueo(bloqueo.id)}
                        className="p-2 text-[#EF4444] hover:bg-[#FEE2E2] rounded-xl transition-all duration-200"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <div className="mt-6 p-4 bg-[#FEF3C7] border border-[#F59E0B] rounded-xl">
          <p className="text-[14px] leading-[20px] text-[#0F172A]">
            <span className="font-semibold">⚠️ Importante:</span> Los bloqueos de agenda impedirán que
            tus clientes puedan reservar citas durante esos períodos. Asegúrate de notificar con
            anticipación.
          </p>
        </div>
      </div>
    </div>
  );
}

