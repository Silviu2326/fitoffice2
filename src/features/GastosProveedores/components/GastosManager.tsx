import { useState } from 'react';
import { Plus, Search, DollarSign, Calendar, Tag, Trash2, Edit2 } from 'lucide-react';

interface Gasto {
  id: string;
  concepto: string;
  monto: number;
  fecha: string;
  categoria: string;
  proveedor: string;
  estado: 'pendiente' | 'pagado' | 'cancelado';
}

export default function GastosManager() {
  const [gastos, setGastos] = useState<Gasto[]>([
    {
      id: '1',
      concepto: 'Suplementos proteína',
      monto: 450.00,
      fecha: '2025-10-20',
      categoria: 'Suplementos',
      proveedor: 'NutriPro',
      estado: 'pagado'
    },
    {
      id: '2',
      concepto: 'Luz - Octubre',
      monto: 280.50,
      fecha: '2025-10-15',
      categoria: 'Servicios',
      proveedor: 'Iberdrola',
      estado: 'pagado'
    },
    {
      id: '3',
      concepto: 'Mantenimiento máquinas',
      monto: 350.00,
      fecha: '2025-10-25',
      categoria: 'Mantenimiento',
      proveedor: 'TechFit',
      estado: 'pendiente'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);

  const filteredGastos = gastos.filter(gasto =>
    gasto.concepto.toLowerCase().includes(searchTerm.toLowerCase()) ||
    gasto.proveedor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case 'pagado':
        return 'bg-[#D1FAE5] text-[#10B981]';
      case 'pendiente':
        return 'bg-[#FEF3C7] text-[#F59E0B]';
      case 'cancelado':
        return 'bg-[#FEE2E2] text-[#EF4444]';
      default:
        return 'bg-[#F1F5F9] text-[#64748B]';
    }
  };

  const totalGastos = gastos.reduce((sum, gasto) => sum + gasto.monto, 0);
  const gastosPendientes = gastos.filter(g => g.estado === 'pendiente').reduce((sum, g) => sum + g.monto, 0);

  return (
    <div className="bg-white rounded-xl shadow-md border border-[#E2E8F0]">
      {/* Header con estadísticas */}
      <div className="p-6 border-b border-[#E2E8F0]">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-[#0F172A]">Gestión de Gastos</h2>
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-2 px-4 py-2 bg-[#6366F1] text-white rounded-lg font-semibold hover:bg-[#4F46E5] hover:shadow-lg active:bg-[#4338CA] transition-all duration-200 shadow-md"
          >
            <Plus className="w-5 h-5" />
            Nuevo Gasto
          </button>
        </div>

        {/* Estadísticas rápidas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-[#EEF2FF] p-5 rounded-xl border border-[#6366F1]/20">
            <div className="flex items-center gap-3">
              <div className="bg-[#6366F1] p-3 rounded-lg shadow-sm">
                <DollarSign className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-[#64748B] font-medium">Total Gastos</p>
                <p className="text-xl font-bold text-[#0F172A]">€{totalGastos.toFixed(2)}</p>
              </div>
            </div>
          </div>

          <div className="bg-[#FEF3C7] p-5 rounded-xl border border-[#F59E0B]/20">
            <div className="flex items-center gap-3">
              <div className="bg-[#F59E0B] p-3 rounded-lg shadow-sm">
                <Calendar className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-[#64748B] font-medium">Pendientes</p>
                <p className="text-xl font-bold text-[#0F172A]">€{gastosPendientes.toFixed(2)}</p>
              </div>
            </div>
          </div>

          <div className="bg-[#DBEAFE] p-5 rounded-xl border border-[#3B82F6]/20">
            <div className="flex items-center gap-3">
              <div className="bg-[#3B82F6] p-3 rounded-lg shadow-sm">
                <Tag className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-[#64748B] font-medium">Total Registros</p>
                <p className="text-xl font-bold text-[#0F172A]">{gastos.length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Buscador */}
        <div className="mt-6 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#94A3B8]" />
          <input
            type="text"
            placeholder="Buscar gastos por concepto o proveedor..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full h-12 pl-10 pr-4 py-3 border border-[#E2E8F0] rounded-xl text-[#0F172A] placeholder:text-[#94A3B8] focus:ring-2 focus:ring-[#6366F1] focus:border-[#6366F1] transition-all duration-200"
          />
        </div>
      </div>

      {/* Formulario de nuevo gasto */}
      {showForm && (
        <div className="p-6 bg-[#F8FAFC] border-b border-[#E2E8F0]">
          <h3 className="text-lg font-semibold text-[#0F172A] mb-4">Registrar Nuevo Gasto</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Concepto del gasto"
              className="h-12 px-4 py-3 border border-[#E2E8F0] rounded-xl text-[#0F172A] placeholder:text-[#94A3B8] focus:ring-2 focus:ring-[#6366F1] focus:border-[#6366F1] transition-all duration-200"
            />
            <input
              type="number"
              placeholder="Monto (€)"
              className="h-12 px-4 py-3 border border-[#E2E8F0] rounded-xl text-[#0F172A] placeholder:text-[#94A3B8] focus:ring-2 focus:ring-[#6366F1] focus:border-[#6366F1] transition-all duration-200"
            />
            <input
              type="date"
              className="h-12 px-4 py-3 border border-[#E2E8F0] rounded-xl text-[#0F172A] focus:ring-2 focus:ring-[#6366F1] focus:border-[#6366F1] transition-all duration-200"
            />
            <select className="h-12 px-4 py-3 border border-[#E2E8F0] rounded-xl text-[#0F172A] focus:ring-2 focus:ring-[#6366F1] focus:border-[#6366F1] transition-all duration-200">
              <option value="">Seleccionar categoría</option>
              <option value="servicios">Servicios</option>
              <option value="suplementos">Suplementos</option>
              <option value="mantenimiento">Mantenimiento</option>
              <option value="nominas">Nóminas</option>
              <option value="otros">Otros</option>
            </select>
            <input
              type="text"
              placeholder="Proveedor"
              className="h-12 px-4 py-3 border border-[#E2E8F0] rounded-xl text-[#0F172A] placeholder:text-[#94A3B8] focus:ring-2 focus:ring-[#6366F1] focus:border-[#6366F1] transition-all duration-200"
            />
            <select className="h-12 px-4 py-3 border border-[#E2E8F0] rounded-xl text-[#0F172A] focus:ring-2 focus:ring-[#6366F1] focus:border-[#6366F1] transition-all duration-200">
              <option value="pendiente">Pendiente</option>
              <option value="pagado">Pagado</option>
              <option value="cancelado">Cancelado</option>
            </select>
          </div>
          <div className="mt-4 flex gap-3">
            <button className="px-6 py-3 bg-[#6366F1] text-white rounded-lg font-semibold hover:bg-[#4F46E5] hover:shadow-lg active:bg-[#4338CA] transition-all duration-200 shadow-md">
              Guardar Gasto
            </button>
            <button
              onClick={() => setShowForm(false)}
              className="px-6 py-3 bg-white text-[#0F172A] border border-[#E2E8F0] rounded-lg font-semibold hover:bg-[#F8FAFC] hover:border-[#6366F1] transition-all duration-200"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

      {/* Lista de gastos */}
      <div className="p-6">
        <div className="space-y-3">
          {filteredGastos.map((gasto) => (
            <div
              key={gasto.id}
              className="flex items-center justify-between p-5 bg-white border border-[#E2E8F0] rounded-xl hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
            >
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <h3 className="font-semibold text-[#0F172A]">{gasto.concepto}</h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getEstadoColor(gasto.estado)}`}>
                    {gasto.estado}
                  </span>
                </div>
                <div className="flex items-center gap-4 mt-2 text-sm text-[#64748B]">
                  <span className="flex items-center gap-1">
                    <Tag className="w-4 h-4" />
                    {gasto.categoria}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {new Date(gasto.fecha).toLocaleDateString('es-ES')}
                  </span>
                  <span>{gasto.proveedor}</span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-xl font-bold text-[#0F172A]">€{gasto.monto.toFixed(2)}</span>
                <div className="flex gap-2">
                  <button className="p-2 text-[#3B82F6] hover:bg-[#DBEAFE] rounded-lg transition-all duration-200">
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-[#EF4444] hover:bg-[#FEE2E2] rounded-lg transition-all duration-200">
                    <Trash2 className="w-4 h-4" />
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
