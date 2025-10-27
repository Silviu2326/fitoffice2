import { useState, useEffect } from 'react';
import { Calendar, DollarSign, AlertCircle, CheckCircle2 } from 'lucide-react';

interface Cuota {
  id: string;
  cliente: string;
  monto: number;
  fecha_cobro: string;
  estado: 'pendiente' | 'procesado' | 'fallido';
  metodo_pago: string;
  intentos: number;
}

export default function GestorCuotas() {
  const [cuotas, setCuotas] = useState<Cuota[]>([]);
  const [filtroEstado, setFiltroEstado] = useState<string>('todas');

  useEffect(() => {
    const ejemploCuotas: Cuota[] = [
      {
        id: '1',
        cliente: 'Juan Pérez',
        monto: 120,
        fecha_cobro: '2025-11-01',
        estado: 'pendiente',
        metodo_pago: 'Tarjeta',
        intentos: 0
      },
      {
        id: '2',
        cliente: 'María García',
        monto: 79,
        fecha_cobro: '2025-11-15',
        estado: 'procesado',
        metodo_pago: 'Domiciliación',
        intentos: 1
      },
      {
        id: '3',
        cliente: 'Pedro Martínez',
        monto: 99,
        fecha_cobro: '2025-10-28',
        estado: 'fallido',
        metodo_pago: 'Tarjeta',
        intentos: 2
      }
    ];
    setCuotas(ejemploCuotas);
  }, []);

  const cuotasFiltradas = cuotas.filter(cuota => 
    filtroEstado === 'todas' || cuota.estado === filtroEstado
  );

  const getEstadoIcon = (estado: string) => {
    switch (estado) {
      case 'pendiente':
        return <Calendar className="w-5 h-5 text-[#F59E0B]" />;
      case 'procesado':
        return <CheckCircle2 className="w-5 h-5 text-[#10B981]" />;
      case 'fallido':
        return <AlertCircle className="w-5 h-5 text-[#EF4444]" />;
      default:
        return null;
    }
  };

  const getEstadoBadge = (estado: string) => {
    const styles = {
      pendiente: 'bg-[#FEF3C7] text-[#F59E0B] border border-[#F59E0B]/20',
      procesado: 'bg-[#D1FAE5] text-[#10B981] border border-[#10B981]/20',
      fallido: 'bg-[#FEE2E2] text-[#EF4444] border border-[#EF4444]/20'
    };
    return styles[estado as keyof typeof styles] || styles.pendiente;
  };

  const totalPendiente = cuotas
    .filter(c => c.estado === 'pendiente')
    .reduce((sum, c) => sum + c.monto, 0);

  const totalProcesado = cuotas
    .filter(c => c.estado === 'procesado')
    .reduce((sum, c) => sum + c.monto, 0);

  return (
    <div className="space-y-6">
      {/* Encabezado */}
      <div>
        <h2 className="text-2xl font-bold text-[#0F172A]">Gestor de Cuotas Recurrentes</h2>
        <p className="text-[#64748B] mt-1">Automatización de pagos periódicos</p>
      </div>

      {/* Resumen */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-200">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-[#FEF3C7] p-3 rounded-xl">
              <Calendar className="w-6 h-6 text-[#F59E0B]" />
            </div>
            <span className="text-sm font-semibold text-[#64748B]">Pendientes</span>
          </div>
          <p className="text-3xl font-bold text-[#0F172A]">€{totalPendiente.toFixed(2)}</p>
          <p className="text-sm text-[#64748B] mt-2">
            {cuotas.filter(c => c.estado === 'pendiente').length} cuotas
          </p>
        </div>

        <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-200">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-[#D1FAE5] p-3 rounded-xl">
              <CheckCircle2 className="w-6 h-6 text-[#10B981]" />
            </div>
            <span className="text-sm font-semibold text-[#64748B]">Procesadas</span>
          </div>
          <p className="text-3xl font-bold text-[#0F172A]">€{totalProcesado.toFixed(2)}</p>
          <p className="text-sm text-[#64748B] mt-2">
            {cuotas.filter(c => c.estado === 'procesado').length} cuotas
          </p>
        </div>

        <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-200">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-[#FEE2E2] p-3 rounded-xl">
              <AlertCircle className="w-6 h-6 text-[#EF4444]" />
            </div>
            <span className="text-sm font-semibold text-[#64748B]">Fallidas</span>
          </div>
          <p className="text-3xl font-bold text-[#0F172A]">
            {cuotas.filter(c => c.estado === 'fallido').length}
          </p>
          <p className="text-sm text-[#64748B] mt-2">Requieren atención</p>
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
          onClick={() => setFiltroEstado('pendiente')}
          className={`px-5 py-2.5 rounded-xl font-semibold transition-all duration-200 ${
            filtroEstado === 'pendiente'
              ? 'bg-[#F59E0B] text-white shadow-md'
              : 'bg-white text-[#64748B] border border-[#E2E8F0] hover:bg-[#F8FAFC] hover:border-[#F59E0B]'
          }`}
        >
          Pendientes
        </button>
        <button
          onClick={() => setFiltroEstado('procesado')}
          className={`px-5 py-2.5 rounded-xl font-semibold transition-all duration-200 ${
            filtroEstado === 'procesado'
              ? 'bg-[#10B981] text-white shadow-md'
              : 'bg-white text-[#64748B] border border-[#E2E8F0] hover:bg-[#F8FAFC] hover:border-[#10B981]'
          }`}
        >
          Procesadas
        </button>
        <button
          onClick={() => setFiltroEstado('fallido')}
          className={`px-5 py-2.5 rounded-xl font-semibold transition-all duration-200 ${
            filtroEstado === 'fallido'
              ? 'bg-[#EF4444] text-white shadow-md'
              : 'bg-white text-[#64748B] border border-[#E2E8F0] hover:bg-[#F8FAFC] hover:border-[#EF4444]'
          }`}
        >
          Fallidas
        </button>
      </div>

      {/* Lista de cuotas */}
      <div className="bg-white border border-[#E2E8F0] rounded-xl overflow-hidden shadow-sm">
        <table className="w-full">
          <thead className="bg-[#F8FAFC] border-b border-[#E2E8F0]">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-[#64748B] uppercase tracking-wider">
                Cliente
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-[#64748B] uppercase tracking-wider">
                Monto
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-[#64748B] uppercase tracking-wider">
                Fecha Cobro
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-[#64748B] uppercase tracking-wider">
                Método
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-[#64748B] uppercase tracking-wider">
                Estado
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-[#64748B] uppercase tracking-wider">
                Intentos
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E2E8F0]">
            {cuotasFiltradas.map(cuota => (
              <tr key={cuota.id} className="hover:bg-[#F8FAFC] transition-colors duration-200">
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="font-semibold text-[#0F172A]">{cuota.cliente}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-[#0F172A] font-bold">€{cuota.monto}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-[#64748B] font-medium">
                  {new Date(cuota.fecha_cobro).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-[#64748B] font-medium">
                  {cuota.metodo_pago}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    {getEstadoIcon(cuota.estado)}
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getEstadoBadge(cuota.estado)}`}>
                      {cuota.estado.charAt(0).toUpperCase() + cuota.estado.slice(1)}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-[#64748B] font-medium">
                  {cuota.intentos}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {cuotasFiltradas.length === 0 && (
        <div className="text-center py-12 bg-white rounded-xl border border-[#E2E8F0]">
          <div className="bg-[#F8FAFC] rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <DollarSign className="w-8 h-8 text-[#94A3B8]" />
          </div>
          <h3 className="text-[#0F172A] text-lg font-semibold mb-2">No se encontraron cuotas</h3>
          <p className="text-[#64748B]">No hay cuotas que coincidan con los filtros seleccionados</p>
        </div>
      )}
    </div>
  );
}

