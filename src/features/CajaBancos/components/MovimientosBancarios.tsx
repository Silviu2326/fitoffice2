import { useState } from 'react';
import { ArrowUpRight, ArrowDownRight, Filter, Calendar } from 'lucide-react';

interface Movimiento {
  id: string;
  fecha: string;
  concepto: string;
  monto: number;
  tipo: 'ingreso' | 'gasto';
  categoria: string;
  cuenta: string;
  metodo: 'efectivo' | 'transferencia' | 'tarjeta';
}

export default function MovimientosBancarios() {
  const [movimientos] = useState<Movimiento[]>([
    {
      id: 'MOV-001',
      fecha: '2025-10-26',
      concepto: 'Pago suscripción mensual',
      monto: 500.00,
      tipo: 'ingreso',
      categoria: 'Suscripciones',
      cuenta: 'Cuenta Principal',
      metodo: 'transferencia'
    },
    {
      id: 'MOV-002',
      fecha: '2025-10-25',
      concepto: 'Compra material deportivo',
      monto: 350.00,
      tipo: 'gasto',
      categoria: 'Material',
      cuenta: 'Cuenta Principal',
      metodo: 'tarjeta'
    },
    {
      id: 'MOV-003',
      fecha: '2025-10-25',
      concepto: 'Pago clase personal',
      monto: 80.00,
      tipo: 'ingreso',
      categoria: 'Entrenamientos',
      cuenta: 'Caja',
      metodo: 'efectivo'
    },
    {
      id: 'MOV-004',
      fecha: '2025-10-24',
      concepto: 'Pago alquiler local',
      monto: 1200.00,
      tipo: 'gasto',
      categoria: 'Gastos Fijos',
      cuenta: 'Cuenta Principal',
      metodo: 'transferencia'
    }
  ]);

  const totalIngresos = movimientos
    .filter(m => m.tipo === 'ingreso')
    .reduce((sum, m) => sum + m.monto, 0);

  const totalGastos = movimientos
    .filter(m => m.tipo === 'gasto')
    .reduce((sum, m) => sum + m.monto, 0);

  const balance = totalIngresos - totalGastos;

  return (
    <div className="space-y-6">
      {/* Resumen de Movimientos */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div 
          className="rounded-2xl p-6 text-white" 
          style={{ 
            background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
          }}
        >
          <div className="flex items-center justify-between mb-4">
            <ArrowUpRight className="w-8 h-8" />
            <span className="text-sm font-medium opacity-90" style={{ fontSize: '14px', lineHeight: '20px', fontWeight: 500 }}>Ingresos</span>
          </div>
          <p className="text-3xl font-bold" style={{ fontSize: '30px', lineHeight: '38px', fontWeight: 700 }}>
            ${totalIngresos.toFixed(2)}
          </p>
          <p className="text-sm opacity-90 mt-1" style={{ fontSize: '14px', lineHeight: '20px' }}>
            {movimientos.filter(m => m.tipo === 'ingreso').length} movimientos
          </p>
        </div>

        <div 
          className="rounded-2xl p-6 text-white" 
          style={{ 
            background: 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
          }}
        >
          <div className="flex items-center justify-between mb-4">
            <ArrowDownRight className="w-8 h-8" />
            <span className="text-sm font-medium opacity-90" style={{ fontSize: '14px', lineHeight: '20px', fontWeight: 500 }}>Gastos</span>
          </div>
          <p className="text-3xl font-bold" style={{ fontSize: '30px', lineHeight: '38px', fontWeight: 700 }}>
            ${totalGastos.toFixed(2)}
          </p>
          <p className="text-sm opacity-90 mt-1" style={{ fontSize: '14px', lineHeight: '20px' }}>
            {movimientos.filter(m => m.tipo === 'gasto').length} movimientos
          </p>
        </div>

        <div 
          className="rounded-2xl p-6 text-white"
          style={{ 
            background: balance >= 0 
              ? 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)' 
              : 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
          }}
        >
          <div className="flex items-center justify-between mb-4">
            <Calendar className="w-8 h-8" />
            <span className="text-sm font-medium opacity-90" style={{ fontSize: '14px', lineHeight: '20px', fontWeight: 500 }}>Balance</span>
          </div>
          <p className="text-3xl font-bold" style={{ fontSize: '30px', lineHeight: '38px', fontWeight: 700 }}>
            ${Math.abs(balance).toFixed(2)}
          </p>
          <p className="text-sm opacity-90 mt-1" style={{ fontSize: '14px', lineHeight: '20px' }}>
            {balance >= 0 ? 'Positivo' : 'Negativo'}
          </p>
        </div>
      </div>

      {/* Filtros */}
      <div 
        className="bg-white rounded-2xl border border-[#E2E8F0] p-6" 
        style={{ boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)' }}
      >
        <div className="flex items-center gap-4">
          <Filter className="w-5 h-5 text-[#64748B]" />
          <h3 className="text-lg font-semibold text-[#0F172A]" style={{ fontSize: '20px', lineHeight: '28px', fontWeight: 600 }}>Filtros</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
          <div>
            <label className="text-sm font-medium text-[#64748B] mb-2 block" style={{ fontSize: '14px', lineHeight: '20px', fontWeight: 500 }}>Tipo</label>
            <select 
              className="w-full px-3 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6366F1] focus:border-[#6366F1] transition-all duration-200"
              style={{ height: '40px' }}
            >
              <option value="">Todos</option>
              <option value="ingreso">Ingresos</option>
              <option value="gasto">Gastos</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-medium text-[#64748B] mb-2 block" style={{ fontSize: '14px', lineHeight: '20px', fontWeight: 500 }}>Método</label>
            <select 
              className="w-full px-3 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6366F1] focus:border-[#6366F1] transition-all duration-200"
              style={{ height: '40px' }}
            >
              <option value="">Todos</option>
              <option value="efectivo">Efectivo</option>
              <option value="transferencia">Transferencia</option>
              <option value="tarjeta">Tarjeta</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-medium text-[#64748B] mb-2 block" style={{ fontSize: '14px', lineHeight: '20px', fontWeight: 500 }}>Fecha Desde</label>
            <input 
              type="date" 
              className="w-full px-3 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6366F1] focus:border-[#6366F1] transition-all duration-200"
              style={{ height: '40px' }}
            />
          </div>
          <div>
            <label className="text-sm font-medium text-[#64748B] mb-2 block" style={{ fontSize: '14px', lineHeight: '20px', fontWeight: 500 }}>Fecha Hasta</label>
            <input 
              type="date" 
              className="w-full px-3 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6366F1] focus:border-[#6366F1] transition-all duration-200"
              style={{ height: '40px' }}
            />
          </div>
        </div>
      </div>

      {/* Lista de Movimientos */}
      <div 
        className="bg-white rounded-2xl border border-[#E2E8F0]" 
        style={{ boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)' }}
      >
        <div className="p-6 border-b border-[#E2E8F0] flex justify-between items-center">
          <h3 className="text-lg font-semibold text-[#0F172A]" style={{ fontSize: '20px', lineHeight: '28px', fontWeight: 600 }}>
            Movimientos Bancarios
          </h3>
          <button 
            className="bg-[#6366F1] hover:bg-[#4F46E5] active:bg-[#4338CA] text-white font-semibold px-4 py-2 rounded-lg transition-all duration-200"
            style={{ 
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
              fontSize: '16px',
              lineHeight: '24px',
              fontWeight: 600
            }}
          >
            Nuevo Movimiento
          </button>
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
                  Categoría
                </th>
                <th className="px-6 py-3 text-left text-[#64748B] uppercase tracking-wider" style={{ fontSize: '12px', lineHeight: '16px', fontWeight: 500 }}>
                  Método
                </th>
                <th className="px-6 py-3 text-left text-[#64748B] uppercase tracking-wider" style={{ fontSize: '12px', lineHeight: '16px', fontWeight: 500 }}>
                  Cuenta
                </th>
                <th className="px-6 py-3 text-left text-[#64748B] uppercase tracking-wider" style={{ fontSize: '12px', lineHeight: '16px', fontWeight: 500 }}>
                  Monto
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
                    <div className="flex items-center gap-2">
                      {movimiento.tipo === 'ingreso' ? (
                        <ArrowUpRight className="w-4 h-4 text-[#10B981]" />
                      ) : (
                        <ArrowDownRight className="w-4 h-4 text-[#EF4444]" />
                      )}
                      {movimiento.concepto}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-[#0F172A]">
                    <span 
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-[#F1F5F9] text-[#64748B]" 
                      style={{ fontSize: '12px', lineHeight: '16px', fontWeight: 500 }}
                    >
                      {movimiento.categoria}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-[#0F172A] capitalize" style={{ fontSize: '14px', lineHeight: '20px' }}>
                    {movimiento.metodo}
                  </td>
                  <td className="px-6 py-4 text-sm text-[#0F172A]" style={{ fontSize: '14px', lineHeight: '20px' }}>
                    {movimiento.cuenta}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold">
                    <span 
                      className={movimiento.tipo === 'ingreso' ? 'text-[#10B981]' : 'text-[#EF4444]'}
                      style={{ fontSize: '14px', lineHeight: '20px', fontWeight: 600 }}
                    >
                      {movimiento.tipo === 'ingreso' ? '+' : '-'}${movimiento.monto.toFixed(2)}
                    </span>
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

