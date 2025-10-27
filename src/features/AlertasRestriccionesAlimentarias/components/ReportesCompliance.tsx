import { FileCheck, Download, TrendingUp, CheckCircle, AlertTriangle } from 'lucide-react';

export default function ReportesCompliance() {
  // Datos mock
  const metricas = {
    complianceScore: 100,
    violaciones: 0,
    alertasBloqueadas: 156,
    restriccionesActivas: 47,
    ingredientesValidados: 1247,
    sustitucionesRealizadas: 89
  };

  const reportes = [
    {
      id: '1',
      nombre: 'Reporte Mensual de Compliance - Octubre 2024',
      fecha: '2024-10-26',
      tipo: 'Mensual',
      estado: 'Aprobado',
      violaciones: 0
    },
    {
      id: '2',
      nombre: 'Auditoría de Seguridad Alimentaria - Q3 2024',
      fecha: '2024-09-30',
      tipo: 'Trimestral',
      estado: 'Aprobado',
      violaciones: 0
    },
    {
      id: '3',
      nombre: 'Reporte Mensual de Compliance - Septiembre 2024',
      fecha: '2024-09-26',
      tipo: 'Mensual',
      estado: 'Aprobado',
      violaciones: 0
    }
  ];

  const certificaciones = [
    {
      nombre: 'Cumplimiento RGPD',
      estado: 'Vigente',
      vencimiento: '2025-12-31',
      descripcion: 'Protección de datos de restricciones alimentarias'
    },
    {
      nombre: 'ISO 22000 - Seguridad Alimentaria',
      estado: 'Vigente',
      vencimiento: '2025-06-30',
      descripcion: 'Sistema de gestión de seguridad alimentaria'
    },
    {
      nombre: 'Certificación Halal',
      estado: 'Vigente',
      vencimiento: '2025-03-15',
      descripcion: 'Cumplimiento de restricciones religiosas'
    }
  ];

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-[#0F172A] mb-2">Reportes de Compliance</h2>
        <p className="text-[#64748B]">
          Cumplimiento legal y sanitario del sistema de restricciones alimentarias
        </p>
      </div>

      {/* Score de Compliance */}
      <div className="bg-gradient-to-br from-[#D1FAE5] to-[#A7F3D0] border-2 border-[#10B981] rounded-xl p-8 mb-8 text-center shadow-lg">
        <div className="flex items-center justify-center gap-4 mb-4">
          <div className="p-4 bg-white/50 rounded-2xl">
            <FileCheck className="w-12 h-12 text-[#10B981]" />
          </div>
          <div>
            <div className="text-6xl font-bold text-[#10B981] mb-2">
              {metricas.complianceScore}%
            </div>
            <div className="text-[#059669] text-xl font-bold">
              Compliance Score
            </div>
          </div>
        </div>
        <p className="text-[#0F172A] font-medium">
          ✓ Sistema en cumplimiento total de normativas sanitarias y legales
        </p>
      </div>

      {/* Métricas principales */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-[#FEE2E2] rounded-lg">
              <AlertTriangle className="w-5 h-5 text-[#EF4444]" />
            </div>
            <div>
              <div className="text-3xl font-bold text-[#0F172A]">{metricas.violaciones}</div>
              <div className="text-[#64748B] text-sm font-medium">Violaciones</div>
            </div>
          </div>
        </div>

        <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-[#D1FAE5] rounded-lg">
              <CheckCircle className="w-5 h-5 text-[#10B981]" />
            </div>
            <div>
              <div className="text-3xl font-bold text-[#0F172A]">{metricas.alertasBloqueadas}</div>
              <div className="text-[#64748B] text-sm font-medium">Alertas Bloqueadas</div>
            </div>
          </div>
        </div>

        <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-[#DBEAFE] rounded-lg">
              <TrendingUp className="w-5 h-5 text-[#3B82F6]" />
            </div>
            <div>
              <div className="text-3xl font-bold text-[#0F172A]">{metricas.restriccionesActivas}</div>
              <div className="text-[#64748B] text-sm font-medium">Restricciones Activas</div>
            </div>
          </div>
        </div>

        <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-[#EEF2FF] rounded-lg">
              <CheckCircle className="w-5 h-5 text-[#6366F1]" />
            </div>
            <div>
              <div className="text-3xl font-bold text-[#0F172A]">{metricas.ingredientesValidados}</div>
              <div className="text-[#64748B] text-sm font-medium">Ingredientes Validados</div>
            </div>
          </div>
        </div>

        <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-[#FEF3C7] rounded-lg">
              <TrendingUp className="w-5 h-5 text-[#F59E0B]" />
            </div>
            <div>
              <div className="text-3xl font-bold text-[#0F172A]">{metricas.sustitucionesRealizadas}</div>
              <div className="text-[#64748B] text-sm font-medium">Sustituciones</div>
            </div>
          </div>
        </div>

        <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-[#D1FAE5] rounded-lg">
              <FileCheck className="w-5 h-5 text-[#10B981]" />
            </div>
            <div>
              <div className="text-3xl font-bold text-[#10B981]">100%</div>
              <div className="text-[#64748B] text-sm font-medium">Efectividad</div>
            </div>
          </div>
        </div>
      </div>

      {/* Certificaciones */}
      <div className="mb-8">
        <h3 className="text-xl font-bold text-[#0F172A] mb-4">Certificaciones y Cumplimiento</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {certificaciones.map((cert, idx) => (
            <div key={idx} className="bg-white rounded-xl p-6 border border-[#10B981]/30 shadow-sm">
              <div className="flex items-start gap-3 mb-3">
                <CheckCircle className="w-6 h-6 text-[#10B981] flex-shrink-0" />
                <div>
                  <h4 className="text-[#0F172A] font-bold mb-1">{cert.nombre}</h4>
                  <span className="px-2 py-1 bg-[#D1FAE5] text-[#10B981] rounded text-xs font-semibold">
                    {cert.estado}
                  </span>
                </div>
              </div>
              <p className="text-[#64748B] text-sm mb-3">{cert.descripcion}</p>
              <p className="text-[#94A3B8] text-xs">
                Vence: {new Date(cert.vencimiento).toLocaleDateString('es-ES')}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Historial de reportes */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-[#0F172A]">Historial de Reportes</h3>
          <button className="px-4 py-2 bg-[#6366F1] hover:bg-[#4F46E5] active:bg-[#4338CA] text-white rounded-lg font-semibold transition-all duration-200 flex items-center gap-2 shadow-md hover:shadow-lg">
            <Download className="w-4 h-4" />
            Generar Nuevo Reporte
          </button>
        </div>

        <div className="space-y-3">
          {reportes.map((reporte) => (
            <div
              key={reporte.id}
              className="bg-white rounded-xl p-6 border border-[#E2E8F0] hover:border-[#6366F1] hover:shadow-lg transition-all duration-200"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-[#D1FAE5] rounded-lg">
                    <FileCheck className="w-6 h-6 text-[#10B981]" />
                  </div>
                  <div>
                    <h4 className="text-[#0F172A] font-bold mb-1">{reporte.nombre}</h4>
                    <div className="flex items-center gap-3 text-sm">
                      <span className="text-[#64748B]">
                        {new Date(reporte.fecha).toLocaleDateString('es-ES')}
                      </span>
                      <span className="px-2 py-1 bg-[#DBEAFE] text-[#3B82F6] rounded text-xs font-medium">
                        {reporte.tipo}
                      </span>
                      <span className="px-2 py-1 bg-[#D1FAE5] text-[#10B981] rounded text-xs font-medium">
                        {reporte.estado}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="text-2xl font-bold text-[#10B981]">
                      {reporte.violaciones}
                    </div>
                    <div className="text-[#64748B] text-sm">Violaciones</div>
                  </div>
                  <button className="px-4 py-2 bg-[#F8FAFC] border border-[#E2E8F0] hover:bg-[#F1F5F9] text-[#64748B] hover:text-[#0F172A] rounded-lg font-medium transition-all duration-200 flex items-center gap-2">
                    <Download className="w-4 h-4" />
                    Descargar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

