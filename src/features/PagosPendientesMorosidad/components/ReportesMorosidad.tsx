import { useState, useEffect } from 'react';
import { FileText, Download, TrendingDown, DollarSign, Users, Calendar } from 'lucide-react';
import { EstadisticasMorosidad, obtenerEstadisticasMorosidad } from '../api/morosidad';

export default function ReportesMorosidad() {
  const [estadisticas, setEstadisticas] = useState<EstadisticasMorosidad | null>(null);
  const [loading, setLoading] = useState(true);
  const [periodoSeleccionado, setPeriodoSeleccionado] = useState('mes');

  useEffect(() => {
    cargarEstadisticas();
  }, [periodoSeleccionado]);

  const cargarEstadisticas = async () => {
    try {
      setLoading(true);
      const data = await obtenerEstadisticasMorosidad();
      setEstadisticas(data);
    } catch (error) {
      console.error('Error al cargar estadísticas:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleExportarReporte = () => {
    // Implementar exportación a PDF o Excel
    alert('Funcionalidad de exportación en desarrollo');
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

  return (
    <div className="bg-white rounded-[16px] shadow-md border border-[#E2E8F0]">
      <div className="p-6 border-b border-[#E2E8F0]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#E0E7FF] rounded-[12px]">
              <FileText className="w-6 h-6 text-[#6366F1]" />
            </div>
            <div>
              <h2 className="text-[20px] leading-[28px] font-semibold text-[#0F172A]">Reportes de Morosidad</h2>
              <p className="text-[14px] leading-[20px] text-[#64748B]">Análisis completo de la situación financiera</p>
            </div>
          </div>
          <div className="flex gap-2">
            <select
              value={periodoSeleccionado}
              onChange={(e) => setPeriodoSeleccionado(e.target.value)}
              className="px-3 py-2 border border-[#E2E8F0] rounded-[12px] focus:ring-2 focus:ring-[#6366F1] text-[14px] leading-[20px] text-[#0F172A]"
            >
              <option value="semana">Esta Semana</option>
              <option value="mes">Este Mes</option>
              <option value="trimestre">Este Trimestre</option>
              <option value="año">Este Año</option>
            </select>
            <button
              onClick={handleExportarReporte}
              className="px-4 py-2 bg-[#6366F1] text-white rounded-[12px] font-semibold hover:bg-[#4F46E5] transition-all duration-200 flex items-center gap-2 shadow-md hover:shadow-lg text-[14px] leading-[20px]"
            >
              <Download className="w-4 h-4" />
              Exportar
            </button>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Métricas Principales */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-gradient-to-br from-[#EF4444] to-[#DC2626] rounded-[16px] p-6 text-white shadow-md">
            <div className="flex items-center gap-2 mb-2">
              <DollarSign className="w-5 h-5" />
              <span className="text-[14px] leading-[20px] font-medium">Total Pendiente</span>
            </div>
            <div className="text-[30px] leading-[38px] font-bold">{estadisticas.total_pendiente.toFixed(2)}€</div>
            <div className="text-[14px] leading-[20px] mt-1 text-red-100">Monto total en morosidad</div>
          </div>

          <div className="bg-gradient-to-br from-[#F59E0B] to-[#D97706] rounded-[16px] p-6 text-white shadow-md">
            <div className="flex items-center gap-2 mb-2">
              <Users className="w-5 h-5" />
              <span className="text-[14px] leading-[20px] font-medium">Casos Activos</span>
            </div>
            <div className="text-[30px] leading-[38px] font-bold">{estadisticas.total_casos}</div>
            <div className="text-[14px] leading-[20px] mt-1 text-orange-100">Clientes en morosidad</div>
          </div>

          <div className="bg-gradient-to-br from-[#3B82F6] to-[#2563EB] rounded-[16px] p-6 text-white shadow-md">
            <div className="flex items-center gap-2 mb-2">
              <TrendingDown className="w-5 h-5" />
              <span className="text-[14px] leading-[20px] font-medium">Tasa de Recuperación</span>
            </div>
            <div className="text-[30px] leading-[38px] font-bold">{estadisticas.tasa_recuperacion.toFixed(1)}%</div>
            <div className="text-[14px] leading-[20px] mt-1 text-blue-100">Efectividad de cobros</div>
          </div>

          <div className="bg-gradient-to-br from-[#7C3AED] to-[#6D28D9] rounded-[16px] p-6 text-white shadow-md">
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="w-5 h-5" />
              <span className="text-[14px] leading-[20px] font-medium">Promedio Días</span>
            </div>
            <div className="text-[30px] leading-[38px] font-bold">
              {estadisticas.total_casos > 0 
                ? Math.round((
                    estadisticas.casos_por_nivel.verde * 4 +
                    estadisticas.casos_por_nivel.amarillo * 12 +
                    estadisticas.casos_por_nivel.naranja * 23 +
                    estadisticas.casos_por_nivel.rojo * 45 +
                    estadisticas.casos_por_nivel.negro * 75
                  ) / estadisticas.total_casos)
                : 0
              }
            </div>
            <div className="text-[14px] leading-[20px] mt-1 text-purple-100">Días promedio de retraso</div>
          </div>
        </div>

        {/* Distribución por Nivel */}
        <div className="mb-6">
          <h3 className="text-[18px] leading-[28px] font-semibold text-[#0F172A] mb-4">Distribución por Nivel de Morosidad</h3>
          <div className="space-y-3">
            {Object.entries(estadisticas.casos_por_nivel).map(([nivel, casos]) => {
              const monto = estadisticas.monto_por_nivel[nivel as keyof typeof estadisticas.monto_por_nivel];
              const porcentajeCasos = estadisticas.total_casos > 0 ? (casos / estadisticas.total_casos) * 100 : 0;
              const porcentajeMonto = estadisticas.total_pendiente > 0 ? (monto / estadisticas.total_pendiente) * 100 : 0;
              
              const colores = {
                verde: { bg: 'bg-[#10B981]', text: 'text-[#10B981]', light: 'bg-[#D1FAE5]' },
                amarillo: { bg: 'bg-[#F59E0B]', text: 'text-[#F59E0B]', light: 'bg-[#FEF3C7]' },
                naranja: { bg: 'bg-[#F59E0B]', text: 'text-[#F59E0B]', light: 'bg-[#FED7AA]' },
                rojo: { bg: 'bg-[#EF4444]', text: 'text-[#EF4444]', light: 'bg-[#FEE2E2]' },
                negro: { bg: 'bg-[#0F172A]', text: 'text-[#0F172A]', light: 'bg-[#E2E8F0]' },
              };
              
              const color = colores[nivel as keyof typeof colores];
              
              return (
                <div key={nivel} className={`${color.light} rounded-[12px] p-4`}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 ${color.bg} rounded-full`}></div>
                      <span className="font-semibold text-[#0F172A] capitalize text-[16px] leading-[24px]">{nivel}</span>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-[#0F172A] text-[16px] leading-[24px]">{casos} casos</div>
                      <div className={`text-[14px] leading-[20px] font-semibold ${color.text}`}>{monto.toFixed(2)}€</div>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-white bg-opacity-50 rounded-full h-2 overflow-hidden">
                        <div
                          className={`${color.bg} h-full transition-all duration-500`}
                          style={{ width: `${porcentajeCasos}%` }}
                        ></div>
                      </div>
                      <span className="text-[12px] leading-[16px] font-medium text-[#64748B] w-12 text-right">
                        {porcentajeCasos.toFixed(1)}%
                      </span>
                    </div>
                    <div className="text-[12px] leading-[16px] text-[#64748B]">
                      Representa el {porcentajeMonto.toFixed(1)}% del monto total pendiente
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Resumen Ejecutivo */}
        <div className="bg-[#F8FAFC] rounded-[12px] p-6 border border-[#E2E8F0]">
          <h3 className="text-[18px] leading-[28px] font-semibold text-[#0F172A] mb-4">Resumen Ejecutivo</h3>
          <div className="space-y-3 text-[14px] leading-[20px] text-[#0F172A]">
            <p>
              • <strong>Situación Actual:</strong> Hay {estadisticas.total_casos} casos activos de morosidad con un monto total de {estadisticas.total_pendiente.toFixed(2)}€ pendiente de cobro.
            </p>
            <p>
              • <strong>Casos Críticos:</strong> {estadisticas.casos_por_nivel.rojo + estadisticas.casos_por_nivel.negro} clientes requieren atención inmediata (más de 30 días de retraso).
            </p>
            <p>
              • <strong>Tasa de Recuperación:</strong> La tasa actual de recuperación de pagos es del {estadisticas.tasa_recuperacion.toFixed(1)}%.
            </p>
            <p>
              • <strong>Recomendación:</strong> Se recomienda priorizar el seguimiento de los casos en nivel rojo y negro, implementar recordatorios automáticos para niveles amarillo y naranja, y mantener comunicación amigable con casos en nivel verde.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

