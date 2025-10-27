import { useState, useEffect } from 'react';
import { BarChart3, TrendingDown, AlertCircle, DollarSign, Users, Clock } from 'lucide-react';
import { EstadisticasMorosidad, obtenerEstadisticasMorosidad, PagoVencido, obtenerPagosVencidos } from '../api/morosidad';
import { obtenerAccionesPendientes } from '../api/seguimiento';

export default function DashboardMorosidad() {
  const [estadisticas, setEstadisticas] = useState<EstadisticasMorosidad | null>(null);
  const [pagosVencidos, setPagosVencidos] = useState<PagoVencido[]>([]);
  const [accionesPendientes, setAccionesPendientes] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    try {
      setLoading(true);
      const [estadisticasData, pagosData, accionesData] = await Promise.all([
        obtenerEstadisticasMorosidad(),
        obtenerPagosVencidos(),
        obtenerAccionesPendientes()
      ]);
      setEstadisticas(estadisticasData);
      setPagosVencidos(pagosData);
      setAccionesPendientes(accionesData.length);
    } catch (error) {
      console.error('Error al cargar datos:', error);
    } finally {
      setLoading(false);
    }
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

  if (!estadisticas) return null;

  const casosCriticos = estadisticas.casos_por_nivel.rojo + estadisticas.casos_por_nivel.negro;
  const montoCritico = estadisticas.monto_por_nivel.rojo + estadisticas.monto_por_nivel.negro;

  return (
    <div className="space-y-6">
      {/* Header con Métricas Principales */}
      <div className="bg-gradient-to-br from-[#0F172A] to-[#1E293B] rounded-[16px] shadow-xl p-8 text-white">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-white bg-opacity-20 rounded-[12px] backdrop-blur-sm">
            <BarChart3 className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-[30px] leading-[38px] font-bold">Dashboard de Morosidad</h1>
            <p className="text-[#94A3B8] text-[16px] leading-[24px]">Vista general de la situación de cobros</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-[12px] p-4 border border-white border-opacity-20">
            <div className="flex items-center gap-2 mb-2">
              <DollarSign className="w-5 h-5 text-[#FCA5A5]" />
              <span className="text-[14px] leading-[20px] font-medium text-[#F1F5F9]">Total Pendiente</span>
            </div>
            <div className="text-[30px] leading-[38px] font-bold">{estadisticas.total_pendiente.toFixed(2)}€</div>
          </div>

          <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-[12px] p-4 border border-white border-opacity-20">
            <div className="flex items-center gap-2 mb-2">
              <Users className="w-5 h-5 text-[#FED7AA]" />
              <span className="text-[14px] leading-[20px] font-medium text-[#F1F5F9]">Casos Activos</span>
            </div>
            <div className="text-[30px] leading-[38px] font-bold">{estadisticas.total_casos}</div>
          </div>

          <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-[12px] p-4 border border-white border-opacity-20">
            <div className="flex items-center gap-2 mb-2">
              <AlertCircle className="w-5 h-5 text-[#FCA5A5]" />
              <span className="text-[14px] leading-[20px] font-medium text-[#F1F5F9]">Casos Críticos</span>
            </div>
            <div className="text-[30px] leading-[38px] font-bold text-[#FCA5A5]">{casosCriticos}</div>
          </div>

          <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-[12px] p-4 border border-white border-opacity-20">
            <div className="flex items-center gap-2 mb-2">
              <TrendingDown className="w-5 h-5 text-[#93C5FD]" />
              <span className="text-[14px] leading-[20px] font-medium text-[#F1F5F9]">Tasa Recuperación</span>
            </div>
            <div className="text-[30px] leading-[38px] font-bold text-[#86EFAC]">{estadisticas.tasa_recuperacion.toFixed(1)}%</div>
          </div>
        </div>
      </div>

      {/* Alertas Críticas */}
      {casosCriticos > 0 && (
        <div className="bg-[#FEE2E2] border-l-4 border-[#EF4444] rounded-[12px] p-6">
          <div className="flex items-start gap-4">
            <AlertCircle className="w-6 h-6 text-[#EF4444] flex-shrink-0 mt-1" />
            <div className="flex-1">
              <h3 className="text-[18px] leading-[28px] font-bold text-[#991B1B] mb-2">⚠️ Atención Inmediata Requerida</h3>
              <p className="text-[#991B1B] mb-3 text-[16px] leading-[24px]">
                Tienes <strong>{casosCriticos} casos críticos</strong> (más de 30 días de retraso) con un monto total de <strong>{montoCritico.toFixed(2)}€</strong>.
                Estos casos requieren acción inmediata para evitar mayores pérdidas.
              </p>
              <div className="flex gap-3">
                <button className="px-4 py-2 bg-[#EF4444] text-white rounded-[12px] text-[14px] leading-[20px] font-semibold hover:bg-[#DC2626] transition-all duration-200 shadow-md hover:shadow-lg">
                  Ver Casos Críticos
                </button>
                <button className="px-4 py-2 bg-white text-[#EF4444] border border-[#FCA5A5] rounded-[12px] text-[14px] leading-[20px] font-semibold hover:bg-[#FEF2F2] transition-all duration-200">
                  Iniciar Seguimiento
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Distribución por Nivel */}
        <div className="bg-white rounded-[16px] shadow-md border border-[#E2E8F0] p-6">
          <h3 className="text-[18px] leading-[28px] font-semibold text-[#0F172A] mb-4 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-[#6366F1]" />
            Distribución por Nivel
          </h3>
          <div className="space-y-3">
            {Object.entries(estadisticas.casos_por_nivel).map(([nivel, casos]) => {
              const monto = estadisticas.monto_por_nivel[nivel as keyof typeof estadisticas.monto_por_nivel];
              const porcentaje = estadisticas.total_casos > 0 ? (casos / estadisticas.total_casos) * 100 : 0;
              
              const colores = {
                verde: { bg: 'bg-[#10B981]', text: 'text-[#10B981]', light: 'bg-[#D1FAE5]' },
                amarillo: { bg: 'bg-[#F59E0B]', text: 'text-[#F59E0B]', light: 'bg-[#FEF3C7]' },
                naranja: { bg: 'bg-[#F59E0B]', text: 'text-[#F59E0B]', light: 'bg-[#FED7AA]' },
                rojo: { bg: 'bg-[#EF4444]', text: 'text-[#EF4444]', light: 'bg-[#FEE2E2]' },
                negro: { bg: 'bg-[#0F172A]', text: 'text-[#0F172A]', light: 'bg-[#E2E8F0]' },
              };
              
              const color = colores[nivel as keyof typeof colores];
              
              return (
                <div key={nivel}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[14px] leading-[20px] font-medium text-[#0F172A] capitalize">{nivel}</span>
                    <span className={`text-[14px] leading-[20px] font-semibold ${color.text}`}>
                      {casos} casos • {monto.toFixed(2)}€
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-[#F1F5F9] rounded-full h-2 overflow-hidden">
                      <div
                        className={`${color.bg} h-full transition-all duration-500`}
                        style={{ width: `${porcentaje}%` }}
                      ></div>
                    </div>
                    <span className="text-[12px] leading-[16px] font-medium text-[#64748B] w-12 text-right">
                      {porcentaje.toFixed(0)}%
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Acciones Pendientes */}
        <div className="bg-white rounded-[16px] shadow-md border border-[#E2E8F0] p-6">
          <h3 className="text-[18px] leading-[28px] font-semibold text-[#0F172A] mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5 text-[#F59E0B]" />
            Acciones Pendientes
          </h3>
          <div className="space-y-3">
            <div className="bg-[#FEF3C7] border border-[#F59E0B] rounded-[12px] p-4">
              <div className="text-[36px] leading-[44px] font-bold text-[#F59E0B] mb-2">{accionesPendientes}</div>
              <div className="text-[14px] leading-[20px] text-[#92400E]">Acciones de seguimiento pendientes</div>
            </div>
            <div className="bg-[#DBEAFE] border border-[#3B82F6] rounded-[12px] p-4">
              <div className="text-[36px] leading-[44px] font-bold text-[#3B82F6] mb-2">{pagosVencidos.length}</div>
              <div className="text-[14px] leading-[20px] text-[#1E40AF]">Clientes que necesitan recordatorio</div>
            </div>
            <div className="bg-[#E0E7FF] border border-[#6366F1] rounded-[12px] p-4">
              <div className="text-[36px] leading-[44px] font-bold text-[#6366F1] mb-2">{casosCriticos}</div>
              <div className="text-[14px] leading-[20px] text-[#3730A3]">Casos que requieren escalación</div>
            </div>
          </div>
        </div>
      </div>

      {/* Top 5 Deudores */}
      <div className="bg-white rounded-[16px] shadow-md border border-[#E2E8F0]">
        <div className="p-6 border-b border-[#E2E8F0]">
          <h3 className="text-[18px] leading-[28px] font-semibold text-[#0F172A] flex items-center gap-2">
            <Users className="w-5 h-5 text-[#EF4444]" />
            Top 5 Deudores (Mayor Monto)
          </h3>
        </div>
        <div className="p-6">
          <div className="space-y-3">
            {pagosVencidos
              .sort((a, b) => b.monto_pendiente - a.monto_pendiente)
              .slice(0, 5)
              .map((pago, index) => (
                <div key={pago.id} className="flex items-center justify-between p-4 bg-[#F8FAFC] rounded-[12px] border border-[#E2E8F0] hover:border-[#6366F1] transition-all duration-200">
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 bg-[#E2E8F0] rounded-full flex items-center justify-center font-bold text-[#64748B]">
                      {index + 1}
                    </div>
                    <div>
                      <div className="font-semibold text-[#0F172A] text-[16px] leading-[24px]">{pago.cliente_nombre}</div>
                      <div className="text-[14px] leading-[20px] text-[#64748B]">{pago.descripcion}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-[20px] leading-[28px] font-bold text-[#EF4444]">{pago.monto_pendiente.toFixed(2)}€</div>
                    <div className="text-[14px] leading-[20px] text-[#64748B]">{pago.dias_retraso} días de retraso</div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

