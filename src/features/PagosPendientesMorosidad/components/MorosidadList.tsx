import { useState, useEffect } from 'react';
import { AlertCircle, Clock, TrendingUp, Users } from 'lucide-react';
import { PagoVencido, obtenerPagosVencidos } from '../api/morosidad';

export default function MorosidadList() {
  const [pagosVencidos, setPagosVencidos] = useState<PagoVencido[]>([]);
  const [filtroNivel, setFiltroNivel] = useState<string>('todos');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    cargarPagosVencidos();
  }, []);

  const cargarPagosVencidos = async () => {
    try {
      setLoading(true);
      const pagos = await obtenerPagosVencidos();
      setPagosVencidos(pagos);
    } catch (error) {
      console.error('Error al cargar pagos vencidos:', error);
    } finally {
      setLoading(false);
    }
  };

  const pagosFiltrados = filtroNivel === 'todos' 
    ? pagosVencidos 
    : pagosVencidos.filter(p => p.nivel_morosidad === filtroNivel);

  const getColorNivel = (nivel: string) => {
    const colores = {
      verde: 'bg-[#D1FAE5] text-[#10B981] border-[#10B981]',
      amarillo: 'bg-[#FEF3C7] text-[#F59E0B] border-[#F59E0B]',
      naranja: 'bg-[#FED7AA] text-[#F59E0B] border-[#F59E0B]',
      rojo: 'bg-[#FEE2E2] text-[#EF4444] border-[#EF4444]',
      negro: 'bg-[#0F172A] text-white border-[#0F172A]',
    };
    return colores[nivel as keyof typeof colores] || 'bg-[#E2E8F0] text-[#64748B]';
  };

  const getNombreNivel = (nivel: string) => {
    const nombres = {
      verde: 'Leve (1-7 días)',
      amarillo: 'Moderado (8-15 días)',
      naranja: 'Alto (16-30 días)',
      rojo: 'Crítico (31-60 días)',
      negro: 'Extremo (+60 días)',
    };
    return nombres[nivel as keyof typeof nombres] || nivel;
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
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#FEE2E2] rounded-[12px]">
              <AlertCircle className="w-6 h-6 text-[#EF4444]" />
            </div>
            <div>
              <h2 className="text-[20px] leading-[28px] font-semibold text-[#0F172A]">Lista de Morosidad</h2>
              <p className="text-[14px] leading-[20px] text-[#64748B]">¿Quién me debe dinero ahora mismo?</p>
            </div>
          </div>
          <div className="flex gap-2">
            {['todos', 'verde', 'amarillo', 'naranja', 'rojo', 'negro'].map((nivel) => (
              <button
                key={nivel}
                onClick={() => setFiltroNivel(nivel)}
                className={`px-3 py-1 rounded-[8px] text-[14px] leading-[20px] font-semibold transition-all duration-200 ${
                  filtroNivel === nivel
                    ? 'bg-[#6366F1] text-white shadow-md hover:bg-[#4F46E5]'
                    : 'bg-[#F1F5F9] text-[#64748B] hover:bg-[#E2E8F0]'
                }`}
              >
                {nivel === 'todos' ? 'Todos' : getNombreNivel(nivel).split(' ')[0]}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="bg-[#F8FAFC] rounded-[12px] p-4">
            <div className="flex items-center gap-2 text-[#64748B] mb-1">
              <Users className="w-4 h-4" />
              <span className="text-[14px] leading-[20px]">Total Casos</span>
            </div>
            <div className="text-[24px] leading-[32px] font-bold text-[#0F172A]">{pagosVencidos.length}</div>
          </div>
          <div className="bg-[#F8FAFC] rounded-[12px] p-4">
            <div className="flex items-center gap-2 text-[#64748B] mb-1">
              <TrendingUp className="w-4 h-4" />
              <span className="text-[14px] leading-[20px]">Total Pendiente</span>
            </div>
            <div className="text-[24px] leading-[32px] font-bold text-[#EF4444]">
              {pagosVencidos.reduce((sum, p) => sum + p.monto_pendiente, 0).toFixed(2)}€
            </div>
          </div>
          <div className="bg-[#F8FAFC] rounded-[12px] p-4">
            <div className="flex items-center gap-2 text-[#64748B] mb-1">
              <Clock className="w-4 h-4" />
              <span className="text-[14px] leading-[20px]">Días Promedio</span>
            </div>
            <div className="text-[24px] leading-[32px] font-bold text-[#F59E0B]">
              {pagosVencidos.length > 0
                ? Math.round(pagosVencidos.reduce((sum, p) => sum + p.dias_retraso, 0) / pagosVencidos.length)
                : 0}
            </div>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-[#F8FAFC] border-b border-[#E2E8F0]">
            <tr>
              <th className="px-6 py-3 text-left text-[10px] leading-[16px] font-semibold text-[#64748B] uppercase tracking-wider">
                Cliente
              </th>
              <th className="px-6 py-3 text-left text-[10px] leading-[16px] font-semibold text-[#64748B] uppercase tracking-wider">
                Descripción
              </th>
              <th className="px-6 py-3 text-left text-[10px] leading-[16px] font-semibold text-[#64748B] uppercase tracking-wider">
                Monto
              </th>
              <th className="px-6 py-3 text-left text-[10px] leading-[16px] font-semibold text-[#64748B] uppercase tracking-wider">
                Vencimiento
              </th>
              <th className="px-6 py-3 text-left text-[10px] leading-[16px] font-semibold text-[#64748B] uppercase tracking-wider">
                Días Retraso
              </th>
              <th className="px-6 py-3 text-left text-[10px] leading-[16px] font-semibold text-[#64748B] uppercase tracking-wider">
                Nivel
              </th>
              <th className="px-6 py-3 text-left text-[10px] leading-[16px] font-semibold text-[#64748B] uppercase tracking-wider">
                Estado
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E2E8F0]">
            {pagosFiltrados.map((pago) => (
              <tr key={pago.id} className="hover:bg-[#F8FAFC] transition-all duration-200">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="font-semibold text-[#0F172A] text-[16px] leading-[24px]">{pago.cliente_nombre}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-[14px] leading-[20px] text-[#64748B]">{pago.descripcion}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="font-semibold text-[#0F172A] text-[16px] leading-[24px]">{pago.monto_pendiente.toFixed(2)}€</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-[14px] leading-[20px] text-[#64748B]">
                    {new Date(pago.fecha_vencimiento).toLocaleDateString('es-ES')}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="font-semibold text-[#EF4444] text-[16px] leading-[24px]">{pago.dias_retraso} días</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-3 py-1 rounded-full text-[12px] leading-[16px] font-semibold border ${getColorNivel(pago.nivel_morosidad)}`}>
                    {getNombreNivel(pago.nivel_morosidad)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-3 py-1 rounded-full text-[12px] leading-[16px] font-semibold ${
                    pago.estado === 'pendiente' ? 'bg-[#FEF3C7] text-[#F59E0B]' :
                    pago.estado === 'en_gestion' ? 'bg-[#DBEAFE] text-[#3B82F6]' :
                    pago.estado === 'legal' ? 'bg-[#FEE2E2] text-[#EF4444]' :
                    'bg-[#D1FAE5] text-[#10B981]'
                  }`}>
                    {pago.estado}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {pagosFiltrados.length === 0 && (
          <div className="text-center py-12 text-[#64748B] text-[16px] leading-[24px]">
            No hay pagos vencidos en este filtro
          </div>
        )}
      </div>
    </div>
  );
}

