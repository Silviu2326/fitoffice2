import { FileText, Download, Calendar, Filter, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';

interface TipoReporte {
  id: string;
  nombre: string;
  descripcion: string;
  formato: 'PDF' | 'Excel' | 'CSV';
}

interface ReportesPersonalizadosProps {
  tipoUsuario: 'entrenador' | 'gimnasio';
}

export default function ReportesPersonalizados({ tipoUsuario }: ReportesPersonalizadosProps) {
  const [reporteSeleccionado, setReporteSeleccionado] = useState<string>('');
  const [periodoInicio, setPeriodoInicio] = useState<string>('');
  const [periodoFin, setPeriodoFin] = useState<string>('');

  const reportesEntrenador: TipoReporte[] = [
    {
      id: 'ingresos-personales',
      nombre: 'Ingresos Personales',
      descripcion: 'Detalle completo de ingresos por servicio y cliente',
      formato: 'PDF'
    },
    {
      id: 'clientes-pagos',
      nombre: 'Estado de Pagos de Clientes',
      descripcion: 'Listado de clientes con estado de sus pagos',
      formato: 'Excel'
    },
    {
      id: 'rendimiento-mensual',
      nombre: 'Rendimiento Mensual',
      descripcion: 'Análisis comparativo de rendimiento mes a mes',
      formato: 'PDF'
    }
  ];

  const reportesGimnasio: TipoReporte[] = [
    {
      id: 'facturacion-total',
      nombre: 'Facturación Total del Centro',
      descripcion: 'Resumen completo de facturación por todas las líneas',
      formato: 'PDF'
    },
    {
      id: 'analisis-lineas',
      nombre: 'Análisis por Líneas de Negocio',
      descripcion: 'Desglose detallado: cuotas, PT, tienda, etc.',
      formato: 'Excel'
    },
    {
      id: 'costes-estructurales',
      nombre: 'Reporte de Costes Estructurales',
      descripcion: 'Análisis de gastos fijos y variables del centro',
      formato: 'Excel'
    },
    {
      id: 'rentabilidad',
      nombre: 'Análisis de Rentabilidad',
      descripcion: 'Métricas de eficiencia y rentabilidad por departamento',
      formato: 'PDF'
    }
  ];

  const reportes = tipoUsuario === 'entrenador' ? reportesEntrenador : reportesGimnasio;

  const handleGenerarReporte = () => {
    if (!reporteSeleccionado || !periodoInicio || !periodoFin) {
      alert('Por favor completa todos los campos');
      return;
    }
    // Aquí iría la lógica para generar el reporte
    alert(`Generando reporte: ${reporteSeleccionado}`);
  };

  return (
    <div className="bg-white rounded-2xl p-6 border border-[#E2E8F0] shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),_0_2px_4px_-1px_rgba(0,0,0,0.06)]">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-[#6366F1] p-2 rounded-xl">
          <FileText className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="text-[20px] leading-[28px] font-semibold text-[#0F172A]">Reportes Personalizados</h3>
          <p className="text-[14px] leading-[20px] text-[#64748B]">Genera análisis específicos según tus necesidades</p>
        </div>
      </div>

      {/* Selector de tipo de reporte */}
      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-[14px] leading-[20px] font-medium text-[#0F172A] mb-2">
            Tipo de Reporte
          </label>
          <select
            value={reporteSeleccionado}
            onChange={(e) => setReporteSeleccionado(e.target.value)}
            className="w-full bg-white border border-[#E2E8F0] text-[#0F172A] rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#6366F1] focus:border-[#6366F1] transition-all duration-200"
          >
            <option value="">Selecciona un reporte...</option>
            {reportes.map((reporte) => (
              <option key={reporte.id} value={reporte.id}>
                {reporte.nombre} ({reporte.formato})
              </option>
            ))}
          </select>
        </div>

        {reporteSeleccionado && (
          <div className="bg-[#EEF2FF] border border-[#6366F1] rounded-xl p-4">
            <p className="text-[14px] leading-[20px] text-[#6366F1]">
              {reportes.find(r => r.id === reporteSeleccionado)?.descripcion}
            </p>
          </div>
        )}

        {/* Selector de período */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-[14px] leading-[20px] font-medium text-[#0F172A] mb-2">
              Fecha Inicio
            </label>
            <div className="relative">
              <input
                type="date"
                value={periodoInicio}
                onChange={(e) => setPeriodoInicio(e.target.value)}
                className="w-full bg-white border border-[#E2E8F0] text-[#0F172A] rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#6366F1] focus:border-[#6366F1] transition-all duration-200"
              />
              <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#64748B] pointer-events-none" />
            </div>
          </div>
          <div>
            <label className="block text-[14px] leading-[20px] font-medium text-[#0F172A] mb-2">
              Fecha Fin
            </label>
            <div className="relative">
              <input
                type="date"
                value={periodoFin}
                onChange={(e) => setPeriodoFin(e.target.value)}
                className="w-full bg-white border border-[#E2E8F0] text-[#0F172A] rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#6366F1] focus:border-[#6366F1] transition-all duration-200"
              />
              <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#64748B] pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      {/* Reportes disponibles */}
      <div className="space-y-3 mb-6">
        <h4 className="text-[14px] leading-[20px] font-medium text-[#0F172A] flex items-center gap-2">
          <Filter className="w-4 h-4" />
          Reportes Disponibles
        </h4>
        {reportes.map((reporte) => (
          <div
            key={reporte.id}
            className={`bg-[#F8FAFC] rounded-xl p-4 cursor-pointer transition-all duration-200 border ${
              reporteSeleccionado === reporte.id
                ? 'ring-2 ring-[#6366F1] border-[#6366F1] bg-[#EEF2FF]'
                : 'border-[#E2E8F0] hover:bg-white hover:border-[#6366F1]'
            }`}
            onClick={() => setReporteSeleccionado(reporte.id)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-[#EEF2FF] p-2 rounded-xl">
                  <FileText className="w-4 h-4 text-[#6366F1]" />
                </div>
                <div>
                  <p className="font-medium text-[#0F172A] text-[16px] leading-[24px]">{reporte.nombre}</p>
                  <p className="text-[12px] leading-[16px] text-[#64748B]">{reporte.descripcion}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[12px] leading-[16px] font-medium px-3 py-1 bg-[#EEF2FF] text-[#6366F1] rounded-full">
                  {reporte.formato}
                </span>
                {reporteSeleccionado === reporte.id && (
                  <CheckCircle2 className="w-5 h-5 text-[#6366F1]" />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Botón de generación */}
      <button
        onClick={handleGenerarReporte}
        disabled={!reporteSeleccionado || !periodoInicio || !periodoFin}
        className="w-full bg-[#6366F1] hover:bg-[#4F46E5] active:bg-[#4338CA] disabled:bg-[#94A3B8] disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),_0_2px_4px_-1px_rgba(0,0,0,0.06)] hover:shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1),_0_4px_6px_-2px_rgba(0,0,0,0.05)]"
      >
        <Download className="w-5 h-5" />
        Generar y Descargar Reporte
      </button>

      <p className="text-[12px] leading-[16px] text-[#94A3B8] text-center mt-3">
        El reporte se generará en formato {reportes.find(r => r.id === reporteSeleccionado)?.formato || 'seleccionado'} y se descargará automáticamente
      </p>
    </div>
  );
}

