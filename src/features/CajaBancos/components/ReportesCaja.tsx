import { useState } from 'react';
import { BarChart3, Download, Calendar, TrendingUp, TrendingDown, DollarSign } from 'lucide-react';

interface ReporteSummary {
  periodo: string;
  totalIngresos: number;
  totalGastos: number;
  balance: number;
  transacciones: number;
}

export default function ReportesCaja() {
  const [reporteSummary] = useState<ReporteSummary>({
    periodo: 'Octubre 2025',
    totalIngresos: 15420.50,
    totalGastos: 8750.30,
    balance: 6670.20,
    transacciones: 127
  });

  const [reportes] = useState([
    {
      id: 'REP-001',
      nombre: 'Reporte Semanal',
      periodo: '20-26 Oct 2025',
      fecha: '2025-10-26',
      tipo: 'semanal'
    },
    {
      id: 'REP-002',
      nombre: 'Reporte Mensual',
      periodo: 'Octubre 2025',
      fecha: '2025-10-01',
      tipo: 'mensual'
    },
    {
      id: 'REP-003',
      nombre: 'Reporte Anual',
      periodo: '2025',
      fecha: '2025-01-01',
      tipo: 'anual'
    }
  ]);

  return (
    <div className="space-y-6">
      {/* Resumen del Periodo */}
      <div 
        className="rounded-2xl p-6 text-white" 
        style={{ 
          background: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)',
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
        }}
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-2xl font-bold" style={{ fontSize: '24px', lineHeight: '32px', fontWeight: 700 }}>
              {reporteSummary.periodo}
            </h3>
            <p className="text-sm opacity-90" style={{ fontSize: '14px', lineHeight: '20px' }}>Resumen de actividad</p>
          </div>
          <BarChart3 className="w-12 h-12 opacity-80" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white/10 rounded-lg p-3 backdrop-blur-sm">
            <p className="text-xs opacity-90 mb-1" style={{ fontSize: '12px', lineHeight: '16px' }}>Ingresos</p>
            <p className="text-xl font-bold" style={{ fontSize: '20px', lineHeight: '28px', fontWeight: 700 }}>
              ${reporteSummary.totalIngresos.toFixed(2)}
            </p>
          </div>
          <div className="bg-white/10 rounded-lg p-3 backdrop-blur-sm">
            <p className="text-xs opacity-90 mb-1" style={{ fontSize: '12px', lineHeight: '16px' }}>Gastos</p>
            <p className="text-xl font-bold" style={{ fontSize: '20px', lineHeight: '28px', fontWeight: 700 }}>
              ${reporteSummary.totalGastos.toFixed(2)}
            </p>
          </div>
          <div className="bg-white/10 rounded-lg p-3 backdrop-blur-sm">
            <p className="text-xs opacity-90 mb-1" style={{ fontSize: '12px', lineHeight: '16px' }}>Balance</p>
            <p className="text-xl font-bold" style={{ fontSize: '20px', lineHeight: '28px', fontWeight: 700 }}>
              ${reporteSummary.balance.toFixed(2)}
            </p>
          </div>
          <div className="bg-white/10 rounded-lg p-3 backdrop-blur-sm">
            <p className="text-xs opacity-90 mb-1" style={{ fontSize: '12px', lineHeight: '16px' }}>Transacciones</p>
            <p className="text-xl font-bold" style={{ fontSize: '20px', lineHeight: '28px', fontWeight: 700 }}>
              {reporteSummary.transacciones}
            </p>
          </div>
        </div>
      </div>

      {/* Métricas Clave */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div 
          className="bg-white rounded-2xl p-6 border border-[#E2E8F0]" 
          style={{ boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)' }}
        >
          <div className="flex items-center justify-between mb-4">
            <TrendingUp className="w-8 h-8 text-[#10B981]" />
            <span className="text-sm font-medium text-[#64748B]" style={{ fontSize: '14px', lineHeight: '20px', fontWeight: 500 }}>Ingresos</span>
          </div>
          <p className="text-3xl font-bold text-[#0F172A]" style={{ fontSize: '30px', lineHeight: '38px', fontWeight: 700 }}>
            ${reporteSummary.totalIngresos.toFixed(2)}
          </p>
          <p className="text-sm text-[#10B981] mt-2" style={{ fontSize: '14px', lineHeight: '20px' }}>↑ 12.5% vs mes anterior</p>
        </div>

        <div 
          className="bg-white rounded-2xl p-6 border border-[#E2E8F0]" 
          style={{ boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)' }}
        >
          <div className="flex items-center justify-between mb-4">
            <TrendingDown className="w-8 h-8 text-[#EF4444]" />
            <span className="text-sm font-medium text-[#64748B]" style={{ fontSize: '14px', lineHeight: '20px', fontWeight: 500 }}>Gastos</span>
          </div>
          <p className="text-3xl font-bold text-[#0F172A]" style={{ fontSize: '30px', lineHeight: '38px', fontWeight: 700 }}>
            ${reporteSummary.totalGastos.toFixed(2)}
          </p>
          <p className="text-sm text-[#EF4444] mt-2" style={{ fontSize: '14px', lineHeight: '20px' }}>↑ 5.2% vs mes anterior</p>
        </div>

        <div 
          className="bg-white rounded-2xl p-6 border border-[#E2E8F0]" 
          style={{ boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)' }}
        >
          <div className="flex items-center justify-between mb-4">
            <DollarSign className="w-8 h-8 text-[#3B82F6]" />
            <span className="text-sm font-medium text-[#64748B]" style={{ fontSize: '14px', lineHeight: '20px', fontWeight: 500 }}>Balance Neto</span>
          </div>
          <p className="text-3xl font-bold text-[#0F172A]" style={{ fontSize: '30px', lineHeight: '38px', fontWeight: 700 }}>
            ${reporteSummary.balance.toFixed(2)}
          </p>
          <p className="text-sm text-[#3B82F6] mt-2" style={{ fontSize: '14px', lineHeight: '20px' }}>↑ 18.3% vs mes anterior</p>
        </div>
      </div>

      {/* Generar Nuevo Reporte */}
      <div 
        className="bg-white rounded-2xl border border-[#E2E8F0]" 
        style={{ boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)' }}
      >
        <div className="p-6 border-b border-[#E2E8F0]">
          <div className="flex items-center gap-3">
            <Calendar className="w-6 h-6 text-[#6366F1]" />
            <h3 className="text-lg font-semibold text-[#0F172A]" style={{ fontSize: '20px', lineHeight: '28px', fontWeight: 600 }}>
              Generar Nuevo Reporte
            </h3>
          </div>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="text-sm font-medium text-[#64748B] mb-2 block" style={{ fontSize: '14px', lineHeight: '20px', fontWeight: 500 }}>
                Tipo de Reporte
              </label>
              <select 
                className="w-full px-3 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6366F1] focus:border-[#6366F1] transition-all duration-200"
                style={{ height: '40px' }}
              >
                <option value="diario">Reporte Diario</option>
                <option value="semanal">Reporte Semanal</option>
                <option value="mensual">Reporte Mensual</option>
                <option value="trimestral">Reporte Trimestral</option>
                <option value="anual">Reporte Anual</option>
                <option value="personalizado">Período Personalizado</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-[#64748B] mb-2 block" style={{ fontSize: '14px', lineHeight: '20px', fontWeight: 500 }}>
                Fecha Inicio
              </label>
              <input 
                type="date" 
                className="w-full px-3 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6366F1] focus:border-[#6366F1] transition-all duration-200"
                style={{ height: '40px' }}
              />
            </div>
            <div>
              <label className="text-sm font-medium text-[#64748B] mb-2 block" style={{ fontSize: '14px', lineHeight: '20px', fontWeight: 500 }}>
                Fecha Fin
              </label>
              <input 
                type="date" 
                className="w-full px-3 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6366F1] focus:border-[#6366F1] transition-all duration-200"
                style={{ height: '40px' }}
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="text-sm font-medium text-[#64748B] mb-2 block" style={{ fontSize: '14px', lineHeight: '20px', fontWeight: 500 }}>
              Incluir en el Reporte
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <label className="flex items-center gap-2">
                <input type="checkbox" defaultChecked className="rounded text-[#6366F1] focus:ring-[#6366F1]" />
                <span className="text-sm text-[#0F172A]" style={{ fontSize: '14px', lineHeight: '20px' }}>Movimientos</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" defaultChecked className="rounded text-[#6366F1] focus:ring-[#6366F1]" />
                <span className="text-sm text-[#0F172A]" style={{ fontSize: '14px', lineHeight: '20px' }}>Arqueos</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" defaultChecked className="rounded text-[#6366F1] focus:ring-[#6366F1]" />
                <span className="text-sm text-[#0F172A]" style={{ fontSize: '14px', lineHeight: '20px' }}>TPV</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded text-[#6366F1] focus:ring-[#6366F1]" />
                <span className="text-sm text-[#0F172A]" style={{ fontSize: '14px', lineHeight: '20px' }}>Diferencias</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded text-[#6366F1] focus:ring-[#6366F1]" />
                <span className="text-sm text-[#0F172A]" style={{ fontSize: '14px', lineHeight: '20px' }}>Conciliación</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded text-[#6366F1] focus:ring-[#6366F1]" />
                <span className="text-sm text-[#0F172A]" style={{ fontSize: '14px', lineHeight: '20px' }}>Gráficos</span>
              </label>
            </div>
          </div>
          <button 
            className="w-full bg-[#6366F1] hover:bg-[#4F46E5] active:bg-[#4338CA] text-white font-semibold py-3 rounded-lg transition-all duration-200"
            style={{ 
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
              fontSize: '16px',
              lineHeight: '24px',
              fontWeight: 600
            }}
          >
            Generar Reporte
          </button>
        </div>
      </div>

      {/* Reportes Guardados */}
      <div 
        className="bg-white rounded-2xl border border-[#E2E8F0]" 
        style={{ boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)' }}
      >
        <div className="p-6 border-b border-[#E2E8F0]">
          <h3 className="text-lg font-semibold text-[#0F172A]" style={{ fontSize: '20px', lineHeight: '28px', fontWeight: 600 }}>
            Reportes Guardados
          </h3>
        </div>
        <div className="divide-y divide-[#E2E8F0]">
          {reportes.map(reporte => (
            <div key={reporte.id} className="p-6 hover:bg-[#F8FAFC] transition-colors duration-200">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-[#0F172A] mb-1" style={{ fontSize: '16px', lineHeight: '24px', fontWeight: 600 }}>
                    {reporte.nombre}
                  </h4>
                  <div className="flex items-center gap-4 text-sm text-[#64748B]" style={{ fontSize: '14px', lineHeight: '20px' }}>
                    <span>📅 {reporte.periodo}</span>
                    <span>• Generado el {reporte.fecha}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button 
                    className="flex items-center gap-2 bg-[#6366F1] hover:bg-[#4F46E5] active:bg-[#4338CA] text-white font-medium px-4 py-2 rounded-lg transition-all duration-200"
                    style={{ 
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                      fontSize: '14px',
                      lineHeight: '20px',
                      fontWeight: 500
                    }}
                  >
                    <Download className="w-4 h-4" />
                    Descargar PDF
                  </button>
                  <button 
                    className="flex items-center gap-2 bg-[#10B981] hover:bg-[#059669] text-white font-medium px-4 py-2 rounded-lg transition-all duration-200"
                    style={{ 
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                      fontSize: '14px',
                      lineHeight: '20px',
                      fontWeight: 500
                    }}
                  >
                    <Download className="w-4 h-4" />
                    Excel
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

