import { CheckCircle, XCircle, AlertCircle, Euro, Calendar } from 'lucide-react';

interface Factura {
  id: string;
  numeroFactura: string;
  cliente: string;
  fecha: string;
  vencimiento: string;
  importe: number;
  estado: 'pendiente' | 'pagada' | 'vencida' | 'cancelada';
  concepto: string;
}

interface GestorCobrosProps {
  facturas: Factura[];
  onActualizarEstado: (id: string, nuevoEstado: Factura['estado']) => void;
}

export default function GestorCobros({ facturas, onActualizarEstado }: GestorCobrosProps) {
  const facturasPendientes = facturas.filter(f => f.estado === 'pendiente' || f.estado === 'vencida');
  
  const totalPendiente = facturasPendientes.reduce((sum, f) => sum + f.importe, 0);
  const facturasVencidas = facturas.filter(f => f.estado === 'vencida').length;
  const facturasProximasVencer = facturas.filter(f => {
    if (f.estado !== 'pendiente') return false;
    const diasHastaVencimiento = Math.ceil((new Date(f.vencimiento).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
    return diasHastaVencimiento <= 7 && diasHastaVencimiento >= 0;
  }).length;

  const marcarComoPagada = (id: string) => {
    onActualizarEstado(id, 'pagada');
  };

  const diasHastaVencimiento = (fecha: string) => {
    return Math.ceil((new Date(fecha).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
  };

  return (
    <div className="space-y-6">
      {/* Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-[#1E1E2E] border border-[#334155] rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[16px] text-[#94A3B8]">Total Pendiente</span>
            <Euro className="w-5 h-5 text-[#F59E0B]" />
          </div>
          <div className="text-[30px] leading-[38px] font-bold text-[#F1F5F9]">€{totalPendiente.toFixed(2)}</div>
          <p className="text-[14px] leading-[20px] text-[#94A3B8] mt-1">{facturasPendientes.length} facturas</p>
        </div>

        <div className="bg-[#1E1E2E] border border-[#334155] rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[16px] text-[#94A3B8]">Facturas Vencidas</span>
            <XCircle className="w-5 h-5 text-[#EF4444]" />
          </div>
          <div className="text-[30px] leading-[38px] font-bold text-[#F1F5F9]">{facturasVencidas}</div>
          <p className="text-[14px] leading-[20px] text-[#94A3B8] mt-1">Requieren seguimiento</p>
        </div>

        <div className="bg-[#1E1E2E] border border-[#334155] rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[16px] text-[#94A3B8]">Próximas a Vencer</span>
            <Calendar className="w-5 h-5 text-[#F59E0B]" />
          </div>
          <div className="text-[30px] leading-[38px] font-bold text-[#F1F5F9]">{facturasProximasVencer}</div>
          <p className="text-[14px] leading-[20px] text-[#94A3B8] mt-1">En los próximos 7 días</p>
        </div>
      </div>

      {/* Lista de facturas pendientes */}
      <div className="bg-[#1E1E2E] border border-[#334155] rounded-2xl overflow-hidden shadow-md">
        <div className="p-6 border-b border-[#334155]">
          <h3 className="text-[20px] leading-[28px] font-semibold text-[#F1F5F9]">Gestión de Cobros</h3>
          <p className="text-[14px] leading-[20px] text-[#94A3B8]">Facturas pendientes de pago</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#0F0F23]">
              <tr>
                <th className="px-6 py-3 text-left text-[12px] leading-[16px] font-medium text-[#94A3B8] uppercase tracking-wider">
                  Factura
                </th>
                <th className="px-6 py-3 text-left text-[12px] leading-[16px] font-medium text-[#94A3B8] uppercase tracking-wider">
                  Cliente
                </th>
                <th className="px-6 py-3 text-left text-[12px] leading-[16px] font-medium text-[#94A3B8] uppercase tracking-wider">
                  Concepto
                </th>
                <th className="px-6 py-3 text-left text-[12px] leading-[16px] font-medium text-[#94A3B8] uppercase tracking-wider">
                  Vencimiento
                </th>
                <th className="px-6 py-3 text-left text-[12px] leading-[16px] font-medium text-[#94A3B8] uppercase tracking-wider">
                  Importe
                </th>
                <th className="px-6 py-3 text-left text-[12px] leading-[16px] font-medium text-[#94A3B8] uppercase tracking-wider">
                  Estado
                </th>
                <th className="px-6 py-3 text-right text-[12px] leading-[16px] font-medium text-[#94A3B8] uppercase tracking-wider">
                  Acción
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#334155]">
              {facturasPendientes.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center text-[#94A3B8]">
                    <CheckCircle className="w-12 h-12 mx-auto mb-2 text-[#10B981]" />
                    <p className="text-[18px] leading-[28px]">¡Todas las facturas están cobradas!</p>
                  </td>
                </tr>
              ) : (
                facturasPendientes.map((factura) => {
                  const dias = diasHastaVencimiento(factura.vencimiento);
                  const urgencia = dias < 0 ? 'vencida' : dias <= 3 ? 'urgente' : dias <= 7 ? 'proximo' : 'normal';

                  return (
                    <tr key={factura.id} className="hover:bg-[#2A2A3A] transition-all duration-200">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-[14px] leading-[20px] font-medium text-[#F1F5F9]">{factura.numeroFactura}</div>
                        <div className="text-[12px] leading-[16px] text-[#94A3B8]">{factura.fecha}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-[14px] leading-[20px] text-[#F1F5F9]">{factura.cliente}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-[14px] leading-[20px] text-[#F1F5F9] max-w-xs truncate">{factura.concepto}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-[14px] leading-[20px] text-[#F1F5F9]">{factura.vencimiento}</div>
                        <div className={`text-[12px] leading-[16px] ${
                          urgencia === 'vencida' ? 'text-[#EF4444]' :
                          urgencia === 'urgente' ? 'text-[#F59E0B]' :
                          urgencia === 'proximo' ? 'text-[#F59E0B]' :
                          'text-[#94A3B8]'
                        }`}>
                          {dias < 0 ? `Vencida hace ${Math.abs(dias)} días` : `Vence en ${dias} días`}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-[14px] leading-[20px] font-semibold text-[#F1F5F9]">€{factura.importe.toFixed(2)}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-[12px] leading-[16px] font-medium ${
                          factura.estado === 'vencida'
                            ? 'bg-[#FEE2E2] text-[#EF4444]'
                            : 'bg-[#FEF3C7] text-[#F59E0B]'
                        }`}>
                          {factura.estado === 'vencida' ? (
                            <AlertCircle className="w-3 h-3" />
                          ) : (
                            <Calendar className="w-3 h-3" />
                          )}
                          {factura.estado === 'vencida' ? 'Vencida' : 'Pendiente'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <button
                          onClick={() => marcarComoPagada(factura.id)}
                          className="inline-flex items-center gap-1 px-4 py-2 bg-[#10B981] text-white text-[14px] font-medium rounded-lg hover:bg-[#059669] active:scale-[0.98] transition-all duration-200 shadow-md hover:shadow-lg"
                        >
                          <CheckCircle className="w-4 h-4" />
                          Marcar Pagada
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

