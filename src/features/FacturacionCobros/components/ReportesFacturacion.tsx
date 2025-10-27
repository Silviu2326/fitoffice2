import { TrendingUp, TrendingDown, DollarSign, Calendar, PieChart, BarChart3 } from 'lucide-react';

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

interface ReportesFacturacionProps {
  facturas: Factura[];
}

export default function ReportesFacturacion({ facturas }: ReportesFacturacionProps) {
  // Cálculos de métricas
  const totalFacturado = facturas.reduce((sum, f) => sum + f.importe, 0);
  const totalCobrado = facturas.filter(f => f.estado === 'pagada').reduce((sum, f) => sum + f.importe, 0);
  const totalPendiente = facturas.filter(f => f.estado === 'pendiente' || f.estado === 'vencida').reduce((sum, f) => sum + f.importe, 0);
  const totalVencido = facturas.filter(f => f.estado === 'vencida').reduce((sum, f) => sum + f.importe, 0);

  const tasaCobro = totalFacturado > 0 ? (totalCobrado / totalFacturado) * 100 : 0;
  const tasaMorosidad = totalFacturado > 0 ? (totalVencido / totalFacturado) * 100 : 0;

  // Datos del mes actual
  const mesActual = new Date().getMonth();
  const facturasMesActual = facturas.filter(f => new Date(f.fecha).getMonth() === mesActual);
  const facturadoMesActual = facturasMesActual.reduce((sum, f) => sum + f.importe, 0);
  const cobradoMesActual = facturasMesActual.filter(f => f.estado === 'pagada').reduce((sum, f) => sum + f.importe, 0);

  // Simulación de comparación con mes anterior (en una app real vendría de la base de datos)
  const cambioFacturacion = 12.5; // +12.5%
  const cambioCobros = 8.3; // +8.3%

  return (
    <div className="space-y-6">
      {/* Métricas principales */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-[#1E1E2E] border border-[#334155] rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[16px] text-[#94A3B8]">Total Facturado</span>
            <DollarSign className="w-5 h-5 text-[#3B82F6]" />
          </div>
          <div className="text-[30px] leading-[38px] font-bold text-[#F1F5F9]">€{totalFacturado.toFixed(2)}</div>
          <div className="flex items-center gap-1 mt-2">
            <TrendingUp className="w-4 h-4 text-[#10B981]" />
            <span className="text-[14px] text-[#10B981]">+{cambioFacturacion}% vs mes anterior</span>
          </div>
        </div>

        <div className="bg-[#1E1E2E] border border-[#10B981]/30 rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[16px] text-[#94A3B8]">Total Cobrado</span>
            <DollarSign className="w-5 h-5 text-[#10B981]" />
          </div>
          <div className="text-[30px] leading-[38px] font-bold text-[#F1F5F9]">€{totalCobrado.toFixed(2)}</div>
          <div className="flex items-center gap-1 mt-2">
            <TrendingUp className="w-4 h-4 text-[#10B981]" />
            <span className="text-[14px] text-[#10B981]">+{cambioCobros}% vs mes anterior</span>
          </div>
        </div>

        <div className="bg-[#1E1E2E] border border-[#334155] rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[16px] text-[#94A3B8]">Tasa de Cobro</span>
            <PieChart className="w-5 h-5 text-[#F59E0B]" />
          </div>
          <div className="text-[30px] leading-[38px] font-bold text-[#F1F5F9]">{tasaCobro.toFixed(1)}%</div>
          <div className="w-full bg-[#2A2A3A] rounded-full h-2 mt-2">
            <div
              className="bg-[#10B981] h-2 rounded-full transition-all duration-500"
              style={{ width: `${tasaCobro}%` }}
            />
          </div>
        </div>

        <div className="bg-[#1E1E2E] border border-[#334155] rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[16px] text-[#94A3B8]">Tasa de Morosidad</span>
            <BarChart3 className="w-5 h-5 text-[#EF4444]" />
          </div>
          <div className="text-[30px] leading-[38px] font-bold text-[#F1F5F9]">{tasaMorosidad.toFixed(1)}%</div>
          <div className="w-full bg-[#2A2A3A] rounded-full h-2 mt-2">
            <div
              className="bg-[#EF4444] h-2 rounded-full transition-all duration-500"
              style={{ width: `${tasaMorosidad}%` }}
            />
          </div>
        </div>
      </div>

      {/* Mes actual */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-[#1E1E2E] border border-[#334155] rounded-2xl p-6 shadow-md">
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="w-5 h-5 text-[#3B82F6]" />
            <h3 className="text-[20px] leading-[28px] font-semibold text-[#F1F5F9]">Mes Actual</h3>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-[16px] text-[#94A3B8]">Facturas emitidas:</span>
              <span className="text-[24px] leading-[32px] font-bold text-[#F1F5F9]">{facturasMesActual.length}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[16px] text-[#94A3B8]">Facturado:</span>
              <span className="text-[24px] leading-[32px] font-bold text-[#10B981]">€{facturadoMesActual.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[16px] text-[#94A3B8]">Cobrado:</span>
              <span className="text-[24px] leading-[32px] font-bold text-[#10B981]">€{cobradoMesActual.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <div className="bg-[#1E1E2E] border border-[#334155] rounded-2xl p-6 shadow-md">
          <div className="flex items-center gap-2 mb-4">
            <PieChart className="w-5 h-5 text-[#8B5CF6]" />
            <h3 className="text-[20px] leading-[28px] font-semibold text-[#F1F5F9]">Distribución por Estado</h3>
          </div>
          <div className="space-y-3">
            {[
              { estado: 'Pagadas', cantidad: facturas.filter(f => f.estado === 'pagada').length, color: 'bg-[#10B981]' },
              { estado: 'Pendientes', cantidad: facturas.filter(f => f.estado === 'pendiente').length, color: 'bg-[#F59E0B]' },
              { estado: 'Vencidas', cantidad: facturas.filter(f => f.estado === 'vencida').length, color: 'bg-[#EF4444]' },
              { estado: 'Canceladas', cantidad: facturas.filter(f => f.estado === 'cancelada').length, color: 'bg-[#64748B]' }
            ].map((item) => {
              const porcentaje = facturas.length > 0 ? (item.cantidad / facturas.length) * 100 : 0;
              return (
                <div key={item.estado}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-[14px] text-[#F1F5F9]">{item.estado}</span>
                    <span className="text-[14px] font-semibold text-[#F1F5F9]">{item.cantidad} ({porcentaje.toFixed(0)}%)</span>
                  </div>
                  <div className="w-full bg-[#2A2A3A] rounded-full h-2">
                    <div
                      className={`${item.color} h-2 rounded-full transition-all duration-500`}
                      style={{ width: `${porcentaje}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Resumen financiero */}
      <div className="bg-[#1E1E2E] border border-[#334155] rounded-2xl p-6 shadow-md">
        <h3 className="text-[20px] leading-[28px] font-semibold text-[#F1F5F9] mb-6">Resumen Financiero</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-[#3B82F6] rounded-full"></div>
              <span className="text-[16px] text-[#94A3B8]">Total Facturado</span>
            </div>
            <div className="text-[30px] leading-[38px] font-bold text-[#F1F5F9]">€{totalFacturado.toFixed(2)}</div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-[#10B981] rounded-full"></div>
              <span className="text-[16px] text-[#94A3B8]">Total Cobrado</span>
            </div>
            <div className="text-[30px] leading-[38px] font-bold text-[#10B981]">€{totalCobrado.toFixed(2)}</div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-[#F59E0B] rounded-full"></div>
              <span className="text-[16px] text-[#94A3B8]">Pendiente de Cobro</span>
            </div>
            <div className="text-[30px] leading-[38px] font-bold text-[#F59E0B]">€{totalPendiente.toFixed(2)}</div>
          </div>
        </div>
      </div>

      {/* Top clientes */}
      <div className="bg-[#1E1E2E] border border-[#334155] rounded-2xl p-6 shadow-md">
        <h3 className="text-[20px] leading-[28px] font-semibold text-[#F1F5F9] mb-4">Top Clientes por Facturación</h3>
        <div className="space-y-3">
          {(() => {
            // Agrupar facturas por cliente
            const clientesMap = new Map<string, number>();
            facturas.forEach(f => {
              const total = clientesMap.get(f.cliente) || 0;
              clientesMap.set(f.cliente, total + f.importe);
            });

            // Convertir a array y ordenar
            const topClientes = Array.from(clientesMap.entries())
              .sort((a, b) => b[1] - a[1])
              .slice(0, 5);

            const maxImporte = topClientes[0]?.[1] || 1;

            return topClientes.map(([cliente, importe]) => {
              const porcentaje = (importe / maxImporte) * 100;
              return (
                <div key={cliente}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-[14px] text-[#F1F5F9]">{cliente}</span>
                    <span className="text-[14px] font-semibold text-[#F1F5F9]">€{importe.toFixed(2)}</span>
                  </div>
                  <div className="w-full bg-[#2A2A3A] rounded-full h-2">
                    <div
                      className="bg-[#10B981] h-2 rounded-full transition-all duration-500"
                      style={{ width: `${porcentaje}%` }}
                    />
                  </div>
                </div>
              );
            });
          })()}
        </div>
      </div>
    </div>
  );
}

