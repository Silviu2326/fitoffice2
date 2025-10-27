import { XCircle, Calendar, Clock, AlertTriangle, DollarSign, CheckCircle } from 'lucide-react';
import { useState } from 'react';

interface Cancelacion {
  id: string;
  reservaId: string;
  cliente: string;
  servicio: string;
  fecha: string;
  hora: string;
  motivoCancelacion: string;
  canceladoPor: 'cliente' | 'entrenador' | 'sistema';
  fechaCancelacion: string;
  reembolso: number;
  penalizacion: number;
}

export default function Cancelaciones() {
  const [filtro, setFiltro] = useState<string>('todos');

  // Datos de ejemplo
  const cancelaciones: Cancelacion[] = [
    {
      id: '1',
      reservaId: 'R001',
      cliente: 'María López',
      servicio: 'Consulta Rápida',
      fecha: '2025-10-28',
      hora: '16:00',
      motivoCancelacion: 'Emergencia familiar',
      canceladoPor: 'cliente',
      fechaCancelacion: '2025-10-26',
      reembolso: 25,
      penalizacion: 0,
    },
    {
      id: '2',
      reservaId: 'R002',
      cliente: 'Pedro Martínez',
      servicio: 'Evaluación Inicial',
      fecha: '2025-10-27',
      hora: '11:00',
      motivoCancelacion: 'Cambio de horario solicitado',
      canceladoPor: 'entrenador',
      fechaCancelacion: '2025-10-25',
      reembolso: 50,
      penalizacion: 0,
    },
    {
      id: '3',
      reservaId: 'R003',
      cliente: 'Laura Fernández',
      servicio: 'Seguimiento Mensual',
      fecha: '2025-10-27',
      hora: '09:00',
      motivoCancelacion: 'Cancelación tardía (menos de 24h)',
      canceladoPor: 'cliente',
      fechaCancelacion: '2025-10-26',
      reembolso: 20,
      penalizacion: 20,
    },
  ];

  const cancelacionesFiltradas = cancelaciones.filter((cancelacion) => {
    if (filtro === 'todos') return true;
    return cancelacion.canceladoPor === filtro;
  });

  const totalReembolsos = cancelacionesFiltradas.reduce((sum, c) => sum + c.reembolso, 0);
  const totalPenalizaciones = cancelacionesFiltradas.reduce((sum, c) => sum + c.penalizacion, 0);
  const cancelacionesCliente = cancelacionesFiltradas.filter(c => c.canceladoPor === 'cliente').length;
  const cancelacionesEntrenador = cancelacionesFiltradas.filter(c => c.canceladoPor === 'entrenador').length;

  const getColorCanceladoPor = (tipo: string) => {
    switch (tipo) {
      case 'cliente':
        return 'bg-[#FEF3C7] text-[#F59E0B] border-[#F59E0B]';
      case 'entrenador':
        return 'bg-[#DBEAFE] text-[#3B82F6] border-[#3B82F6]';
      case 'sistema':
        return 'bg-[#EEF2FF] text-[#6366F1] border-[#6366F1]';
      default:
        return 'bg-[#F1F5F9] text-[#64748B] border-[#E2E8F0]';
    }
  };

  return (
    <div className="space-y-6">
      {/* Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-md border border-[#E2E8F0] hover:shadow-lg transition-all duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[#64748B] text-sm font-medium">Total Cancelaciones</p>
              <p className="text-3xl font-bold text-[#0F172A] mt-2">{cancelacionesFiltradas.length}</p>
            </div>
            <div className="bg-[#FEE2E2] p-3 rounded-xl">
              <XCircle className="w-6 h-6 text-[#EF4444]" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-md border border-[#E2E8F0] hover:shadow-lg transition-all duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[#64748B] text-sm font-medium">Por Cliente</p>
              <p className="text-3xl font-bold text-[#F59E0B] mt-2">{cancelacionesCliente}</p>
            </div>
            <div className="bg-[#FEF3C7] p-3 rounded-xl">
              <AlertTriangle className="w-6 h-6 text-[#F59E0B]" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-md border border-[#E2E8F0] hover:shadow-lg transition-all duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[#64748B] text-sm font-medium">Por Entrenador</p>
              <p className="text-3xl font-bold text-[#3B82F6] mt-2">{cancelacionesEntrenador}</p>
            </div>
            <div className="bg-[#DBEAFE] p-3 rounded-xl">
              <CheckCircle className="w-6 h-6 text-[#3B82F6]" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-md border border-[#E2E8F0] hover:shadow-lg transition-all duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[#64748B] text-sm font-medium">Reembolsos</p>
              <p className="text-3xl font-bold text-[#10B981] mt-2">€{totalReembolsos}</p>
              {totalPenalizaciones > 0 && (
                <p className="text-xs text-[#EF4444] mt-1">-€{totalPenalizaciones} penalizaciones</p>
              )}
            </div>
            <div className="bg-[#D1FAE5] p-3 rounded-xl">
              <DollarSign className="w-6 h-6 text-[#10B981]" />
            </div>
          </div>
        </div>
      </div>

      {/* Filtros */}
      <div className="bg-white rounded-2xl p-6 shadow-md border border-[#E2E8F0]">
        <div className="flex items-center gap-4">
          <label className="text-sm font-semibold text-[#0F172A]">Filtrar por:</label>
          <select
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
            className="border border-[#E2E8F0] rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#6366F1] focus:border-transparent transition-all duration-200"
          >
            <option value="todos">Todas las cancelaciones</option>
            <option value="cliente">Canceladas por Cliente</option>
            <option value="entrenador">Canceladas por Entrenador</option>
            <option value="sistema">Canceladas por Sistema</option>
          </select>
        </div>
      </div>

      {/* Política de Cancelación */}
      <div className="bg-gradient-to-r from-[#EEF2FF] to-[#E0E7FF] rounded-2xl p-6 border border-[#6366F1]/20">
        <div className="flex items-start gap-4">
          <div className="bg-[#6366F1] p-3 rounded-xl shadow-md">
            <AlertTriangle className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-[#4338CA] mb-2">Política de Cancelación</h3>
            <ul className="space-y-2 text-sm text-[#4F46E5]">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span><strong>Más de 48h:</strong> Reembolso completo sin penalización</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span><strong>24-48h:</strong> Reembolso del 50% del importe</span>
              </li>
              <li className="flex items-start gap-2">
                <XCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span><strong>Menos de 24h:</strong> Sin reembolso - Penalización aplicada</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Lista de Cancelaciones */}
      <div className="bg-white rounded-2xl shadow-md border border-[#E2E8F0] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#F8FAFC] border-b border-[#E2E8F0]">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-[#64748B] uppercase tracking-wider">
                  Cliente
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-[#64748B] uppercase tracking-wider">
                  Servicio
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-[#64748B] uppercase tracking-wider">
                  Fecha Reserva
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-[#64748B] uppercase tracking-wider">
                  Cancelado Por
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-[#64748B] uppercase tracking-wider">
                  Motivo
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-[#64748B] uppercase tracking-wider">
                  Reembolso
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-[#64748B] uppercase tracking-wider">
                  Penalización
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8F0]">
              {cancelacionesFiltradas.map((cancelacion) => (
                <tr key={cancelacion.id} className="hover:bg-[#F8FAFC] transition-all duration-200">
                  <td className="px-6 py-4">
                    <p className="font-semibold text-[#0F172A]">{cancelacion.cliente}</p>
                    <p className="text-xs text-[#64748B] mt-1">ID: {cancelacion.reservaId}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-[#0F172A] font-medium">{cancelacion.servicio}</p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm text-[#64748B]">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(cancelacion.fecha).toLocaleDateString('es-ES')}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-[#64748B]">
                        <Clock className="w-4 h-4" />
                        <span>{cancelacion.hora}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium border ${getColorCanceladoPor(cancelacion.canceladoPor)}`}>
                      {cancelacion.canceladoPor === 'cliente' ? 'Cliente' : cancelacion.canceladoPor === 'entrenador' ? 'Entrenador' : 'Sistema'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-[#64748B] max-w-xs">{cancelacion.motivoCancelacion}</p>
                    <p className="text-xs text-[#94A3B8] mt-1">
                      {new Date(cancelacion.fechaCancelacion).toLocaleDateString('es-ES')}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-semibold text-[#10B981]">€{cancelacion.reembolso}</p>
                  </td>
                  <td className="px-6 py-4">
                    {cancelacion.penalizacion > 0 ? (
                      <p className="font-semibold text-[#EF4444]">-€{cancelacion.penalizacion}</p>
                    ) : (
                      <p className="text-[#94A3B8]">-</p>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {cancelacionesFiltradas.length === 0 && (
          <div className="p-12 text-center">
            <CheckCircle className="w-16 h-16 text-[#94A3B8] mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-[#0F172A] mb-2">No hay cancelaciones</h3>
            <p className="text-[#64748B]">No se encontraron cancelaciones con los filtros seleccionados</p>
          </div>
        )}
      </div>
    </div>
  );
}

