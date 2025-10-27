import { useState } from 'react';
import { Building2, Upload, CheckCircle, XCircle } from 'lucide-react';

interface MovimientoBancario {
  id: string;
  fecha: string;
  concepto: string;
  monto: number;
  tipo: 'ingreso' | 'gasto';
  conciliado: boolean;
}

export default function ConciliacionBancaria() {
  const [movimientos] = useState<MovimientoBancario[]>([
    {
      id: '1',
      fecha: '2025-10-25',
      concepto: 'Pago suscripción cliente',
      monto: 500.00,
      tipo: 'ingreso',
      conciliado: true
    },
    {
      id: '2',
      fecha: '2025-10-24',
      concepto: 'Compra material deportivo',
      monto: 350.00,
      tipo: 'gasto',
      conciliado: true
    },
    {
      id: '3',
      fecha: '2025-10-23',
      concepto: 'Transferencia pendiente',
      monto: 200.00,
      tipo: 'ingreso',
      conciliado: false
    }
  ]);

  const totalConciliado = movimientos
    .filter(m => m.conciliado)
    .reduce((sum, m) => sum + (m.tipo === 'ingreso' ? m.monto : -m.monto), 0);

  const pendientesConciliar = movimientos.filter(m => !m.conciliado).length;

  return (
    <div className="space-y-6">
      {/* Resumen */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div 
          className="bg-white rounded-2xl p-6 border border-[#E2E8F0]" 
          style={{ boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)' }}
        >
          <div className="flex items-center justify-between mb-4">
            <Building2 className="w-8 h-8 text-[#3B82F6]" />
            <span className="text-sm font-medium text-[#64748B]" style={{ fontSize: '14px', lineHeight: '20px', fontWeight: 500 }}>Saldo Conciliado</span>
          </div>
          <p className="text-3xl font-bold text-[#0F172A]" style={{ fontSize: '30px', lineHeight: '38px', fontWeight: 700 }}>
            ${totalConciliado.toFixed(2)}
          </p>
        </div>

        <div 
          className="bg-white rounded-2xl p-6 border border-[#E2E8F0]" 
          style={{ boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)' }}
        >
          <div className="flex items-center justify-between mb-4">
            <CheckCircle className="w-8 h-8 text-[#10B981]" />
            <span className="text-sm font-medium text-[#64748B]" style={{ fontSize: '14px', lineHeight: '20px', fontWeight: 500 }}>Conciliados</span>
          </div>
          <p className="text-3xl font-bold text-[#0F172A]" style={{ fontSize: '30px', lineHeight: '38px', fontWeight: 700 }}>
            {movimientos.filter(m => m.conciliado).length}
          </p>
        </div>

        <div 
          className="bg-white rounded-2xl p-6 border border-[#E2E8F0]" 
          style={{ boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)' }}
        >
          <div className="flex items-center justify-between mb-4">
            <XCircle className="w-8 h-8 text-[#F59E0B]" />
            <span className="text-sm font-medium text-[#64748B]" style={{ fontSize: '14px', lineHeight: '20px', fontWeight: 500 }}>Pendientes</span>
          </div>
          <p className="text-3xl font-bold text-[#0F172A]" style={{ fontSize: '30px', lineHeight: '38px', fontWeight: 700 }}>
            {pendientesConciliar}
          </p>
        </div>
      </div>

      {/* Importar Extracto */}
      <div 
        className="bg-white rounded-2xl border border-[#E2E8F0]" 
        style={{ boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)' }}
      >
        <div className="p-6 border-b border-[#E2E8F0]">
          <h3 className="text-lg font-semibold text-[#0F172A]" style={{ fontSize: '20px', lineHeight: '28px', fontWeight: 600 }}>
            Importar Extracto Bancario
          </h3>
        </div>
        <div className="p-6">
          <div className="border-2 border-dashed border-[#E2E8F0] rounded-lg p-8 text-center">
            <Upload className="w-12 h-12 text-[#94A3B8] mx-auto mb-4" />
            <p className="text-[#64748B] mb-2" style={{ fontSize: '16px', lineHeight: '24px' }}>
              Arrastra tu extracto bancario o haz clic para seleccionar
            </p>
            <p className="text-sm text-[#94A3B8]" style={{ fontSize: '14px', lineHeight: '20px' }}>Formatos: CSV, XLS, XLSX</p>
            <button 
              className="mt-4 bg-[#6366F1] hover:bg-[#4F46E5] active:bg-[#4338CA] text-white font-semibold px-6 py-2 rounded-lg transition-all duration-200"
              style={{ 
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                fontSize: '16px',
                lineHeight: '24px',
                fontWeight: 600
              }}
            >
              Seleccionar Archivo
            </button>
          </div>
        </div>
      </div>

      {/* Lista de Movimientos */}
      <div 
        className="bg-white rounded-2xl border border-[#E2E8F0]" 
        style={{ boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)' }}
      >
        <div className="p-6 border-b border-[#E2E8F0]">
          <h3 className="text-lg font-semibold text-[#0F172A]" style={{ fontSize: '20px', lineHeight: '28px', fontWeight: 600 }}>
            Movimientos Bancarios
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#F8FAFC] border-b border-[#E2E8F0]">
              <tr>
                <th className="px-6 py-3 text-left text-[#64748B] uppercase tracking-wider" style={{ fontSize: '12px', lineHeight: '16px', fontWeight: 500 }}>
                  Fecha
                </th>
                <th className="px-6 py-3 text-left text-[#64748B] uppercase tracking-wider" style={{ fontSize: '12px', lineHeight: '16px', fontWeight: 500 }}>
                  Concepto
                </th>
                <th className="px-6 py-3 text-left text-[#64748B] uppercase tracking-wider" style={{ fontSize: '12px', lineHeight: '16px', fontWeight: 500 }}>
                  Monto
                </th>
                <th className="px-6 py-3 text-left text-[#64748B] uppercase tracking-wider" style={{ fontSize: '12px', lineHeight: '16px', fontWeight: 500 }}>
                  Estado
                </th>
                <th className="px-6 py-3 text-left text-[#64748B] uppercase tracking-wider" style={{ fontSize: '12px', lineHeight: '16px', fontWeight: 500 }}>
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-[#E2E8F0]">
              {movimientos.map(movimiento => (
                <tr key={movimiento.id} className="hover:bg-[#F8FAFC] transition-colors duration-200">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-[#0F172A]" style={{ fontSize: '14px', lineHeight: '20px' }}>
                    {movimiento.fecha}
                  </td>
                  <td className="px-6 py-4 text-sm text-[#0F172A]" style={{ fontSize: '14px', lineHeight: '20px' }}>
                    {movimiento.concepto}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold">
                    <span 
                      className={movimiento.tipo === 'ingreso' ? 'text-[#10B981]' : 'text-[#EF4444]'}
                      style={{ fontSize: '14px', lineHeight: '20px', fontWeight: 600 }}
                    >
                      {movimiento.tipo === 'ingreso' ? '+' : '-'}${movimiento.monto.toFixed(2)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {movimiento.conciliado ? (
                      <span 
                        className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#D1FAE5] text-[#10B981]" 
                        style={{ fontSize: '12px', lineHeight: '16px', fontWeight: 500 }}
                      >
                        <CheckCircle className="w-3 h-3" />
                        Conciliado
                      </span>
                    ) : (
                      <span 
                        className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#FEF3C7] text-[#F59E0B]" 
                        style={{ fontSize: '12px', lineHeight: '16px', fontWeight: 500 }}
                      >
                        <XCircle className="w-3 h-3" />
                        Pendiente
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {!movimiento.conciliado && (
                      <button 
                        className="text-[#6366F1] hover:text-[#4F46E5] font-medium transition-colors duration-200"
                        style={{ fontSize: '14px', lineHeight: '20px', fontWeight: 500 }}
                      >
                        Conciliar
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

