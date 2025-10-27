import { CheckCircle, Clock, XCircle, AlertTriangle, Download, Send } from 'lucide-react';
import ExportPDF from './ExportPDF';

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

interface SeguimientoEstadosProps {
  facturas: Factura[];
  onActualizarEstado: (id: string, nuevoEstado: Factura['estado']) => void;
}

export default function SeguimientoEstados({ facturas, onActualizarEstado }: SeguimientoEstadosProps) {
  const getEstadoBadge = (estado: Factura['estado']) => {
    const configs = {
      pendiente: {
        bg: 'bg-[#FEF3C7]',
        text: 'text-[#F59E0B]',
        icon: Clock,
        label: 'Pendiente'
      },
      pagada: {
        bg: 'bg-[#D1FAE5]',
        text: 'text-[#10B981]',
        icon: CheckCircle,
        label: 'Pagada'
      },
      vencida: {
        bg: 'bg-[#FEE2E2]',
        text: 'text-[#EF4444]',
        icon: AlertTriangle,
        label: 'Vencida'
      },
      cancelada: {
        bg: 'bg-[#E2E8F0]',
        text: 'text-[#64748B]',
        icon: XCircle,
        label: 'Cancelada'
      }
    };

    const config = configs[estado];
    const Icon = config.icon;

    return (
      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-[12px] leading-[16px] font-medium ${config.bg} ${config.text}`}>
        <Icon className="w-3 h-3" />
        {config.label}
      </span>
    );
  };

  const totalFacturas = facturas.length;
  const totalPagadas = facturas.filter(f => f.estado === 'pagada').length;
  const totalPendientes = facturas.filter(f => f.estado === 'pendiente').length;
  const totalVencidas = facturas.filter(f => f.estado === 'vencida').length;

  const facturado = facturas.reduce((sum, f) => sum + f.importe, 0);
  const cobrado = facturas.filter(f => f.estado === 'pagada').reduce((sum, f) => sum + f.importe, 0);
  const porCobrar = facturas.filter(f => f.estado === 'pendiente' || f.estado === 'vencida').reduce((sum, f) => sum + f.importe, 0);

  return (
    <div className="space-y-6">
      {/* Resumen de estados */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-[#1E1E2E] border border-[#334155] rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[16px] text-[#94A3B8]">Total Facturas</span>
            <CheckCircle className="w-5 h-5 text-[#64748B]" />
          </div>
          <div className="text-[30px] leading-[38px] font-bold text-[#F1F5F9]">{totalFacturas}</div>
          <p className="text-[14px] leading-[20px] text-[#10B981] mt-1">€{facturado.toFixed(2)} facturado</p>
        </div>

        <div className="bg-[#1E1E2E] border border-[#10B981]/30 rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[16px] text-[#94A3B8]">Pagadas</span>
            <CheckCircle className="w-5 h-5 text-[#10B981]" />
          </div>
          <div className="text-[30px] leading-[38px] font-bold text-[#F1F5F9]">{totalPagadas}</div>
          <p className="text-[14px] leading-[20px] text-[#10B981] mt-1">€{cobrado.toFixed(2)} cobrado</p>
        </div>

        <div className="bg-[#1E1E2E] border border-[#F59E0B]/30 rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[16px] text-[#94A3B8]">Pendientes</span>
            <Clock className="w-5 h-5 text-[#F59E0B]" />
          </div>
          <div className="text-[30px] leading-[38px] font-bold text-[#F1F5F9]">{totalPendientes}</div>
          <p className="text-[14px] leading-[20px] text-[#F59E0B] mt-1">En espera de pago</p>
        </div>

        <div className="bg-[#1E1E2E] border border-[#EF4444]/30 rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[16px] text-[#94A3B8]">Vencidas</span>
            <AlertTriangle className="w-5 h-5 text-[#EF4444]" />
          </div>
          <div className="text-[30px] leading-[38px] font-bold text-[#F1F5F9]">{totalVencidas}</div>
          <p className="text-[14px] leading-[20px] text-[#EF4444] mt-1">€{porCobrar.toFixed(2)} por cobrar</p>
        </div>
      </div>

      {/* Tabla de facturas */}
      <div className="bg-[#1E1E2E] border border-[#334155] rounded-2xl overflow-hidden shadow-md">
        <div className="p-6 border-b border-[#334155]">
          <h3 className="text-[20px] leading-[28px] font-semibold text-[#F1F5F9]">Todas las Facturas</h3>
          <p className="text-[14px] leading-[20px] text-[#94A3B8]">Seguimiento completo del ciclo de vida</p>
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
                  Fecha
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
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#334155]">
              {facturas.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-6 py-8 text-center text-[#94A3B8]">
                    <CheckCircle className="w-12 h-12 mx-auto mb-2 text-[#64748B]" />
                    <p className="text-[16px]">No hay facturas registradas</p>
                  </td>
                </tr>
              ) : (
                facturas.map((factura) => (
                  <tr key={factura.id} className="hover:bg-[#2A2A3A] transition-all duration-200">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-[14px] leading-[20px] font-medium text-[#F1F5F9]">{factura.numeroFactura}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-[14px] leading-[20px] text-[#F1F5F9]">{factura.cliente}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-[14px] leading-[20px] text-[#F1F5F9] max-w-xs truncate">{factura.concepto}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-[14px] leading-[20px] text-[#94A3B8]">{factura.fecha}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-[14px] leading-[20px] text-[#94A3B8]">{factura.vencimiento}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-[14px] leading-[20px] font-semibold text-[#F1F5F9]">€{factura.importe.toFixed(2)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getEstadoBadge(factura.estado)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="flex items-center justify-end gap-2">
                        <ExportPDF facturaId={factura.id} numeroFactura={factura.numeroFactura} />
                        {(factura.estado === 'pendiente' || factura.estado === 'vencida') && (
                          <button
                            className="inline-flex items-center gap-1 px-3 py-2 bg-[#2A2A3A] text-[#94A3B8] text-[14px] rounded-lg hover:bg-[#334155] hover:text-[#F1F5F9] transition-all duration-200"
                            title="Enviar recordatorio"
                          >
                            <Send className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

