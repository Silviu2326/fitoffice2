import { useState } from 'react';
import { Package, Search, AlertCircle, CheckCircle2, Wrench } from 'lucide-react';
import { type Material } from '../api/recursos';

export default function MaterialDisponible() {
  const [busqueda, setBusqueda] = useState('');
  const [filtroEstado, setFiltroEstado] = useState<'todos' | 'disponible' | 'mantenimiento'>('todos');

  // Datos de ejemplo
  const materialMock: Material[] = [
    {
      id: '1',
      nombre: 'Bicicletas Estáticas',
      tipo: 'material',
      estado: 'disponible',
      categoria: 'Cardio',
      cantidad: 20,
      cantidadDisponible: 18,
      ubicacion: 'Sala de Spinning',
      fechaCreacion: new Date(),
      ultimoMantenimiento: new Date('2025-10-15'),
      proximoMantenimiento: new Date('2025-11-15')
    },
    {
      id: '2',
      nombre: 'Esterillas de Yoga',
      tipo: 'material',
      estado: 'disponible',
      categoria: 'Yoga',
      cantidad: 30,
      cantidadDisponible: 30,
      ubicacion: 'Sala de Yoga',
      fechaCreacion: new Date(),
      ultimoMantenimiento: new Date('2025-10-20')
    },
    {
      id: '3',
      nombre: 'Mancuernas (Set completo)',
      tipo: 'material',
      estado: 'disponible',
      categoria: 'Musculación',
      cantidad: 50,
      cantidadDisponible: 48,
      ubicacion: 'Sala de Musculación',
      fechaCreacion: new Date()
    },
    {
      id: '4',
      nombre: 'Guantes de Boxeo',
      tipo: 'material',
      estado: 'mantenimiento',
      categoria: 'Boxeo',
      cantidad: 25,
      cantidadDisponible: 0,
      ubicacion: 'Sala de Boxeo',
      fechaCreacion: new Date(),
      ultimoMantenimiento: new Date('2025-10-25'),
      proximoMantenimiento: new Date('2025-10-28')
    },
    {
      id: '5',
      nombre: 'Balones Medicinales',
      tipo: 'material',
      estado: 'disponible',
      categoria: 'Funcional',
      cantidad: 15,
      cantidadDisponible: 12,
      ubicacion: 'Sala de CrossFit',
      fechaCreacion: new Date()
    },
    {
      id: '6',
      nombre: 'Cintas de Correr',
      tipo: 'material',
      estado: 'disponible',
      categoria: 'Cardio',
      cantidad: 10,
      cantidadDisponible: 9,
      ubicacion: 'Sala de Cardio',
      fechaCreacion: new Date(),
      ultimoMantenimiento: new Date('2025-10-10'),
      proximoMantenimiento: new Date('2025-11-10')
    }
  ];

  const materialFiltrado = materialMock.filter(item => {
    const coincideBusqueda = item.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
                              item.categoria?.toLowerCase().includes(busqueda.toLowerCase());
    const coincideEstado = filtroEstado === 'todos' || item.estado === filtroEstado;
    return coincideBusqueda && coincideEstado;
  });

  const getDisponibilidadColor = (item: Material) => {
    const porcentaje = (item.cantidadDisponible / item.cantidad) * 100;
    if (item.estado === 'mantenimiento') return 'text-amber-600';
    if (porcentaje === 0) return 'text-red-600';
    if (porcentaje < 50) return 'text-orange-600';
    if (porcentaje < 80) return 'text-blue-600';
    return 'text-emerald-600';
  };

  const getEstadoBadge = (estado: string) => {
    switch (estado) {
      case 'disponible':
        return (
          <span className="flex items-center gap-1 px-2 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-medium">
            <CheckCircle2 className="w-3 h-3" />
            Disponible
          </span>
        );
      case 'mantenimiento':
        return (
          <span className="flex items-center gap-1 px-2 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-medium">
            <Wrench className="w-3 h-3" />
            Mantenimiento
          </span>
        );
      case 'dañado':
        return (
          <span className="flex items-center gap-1 px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs font-medium">
            <AlertCircle className="w-3 h-3" />
            Dañado
          </span>
        );
      default:
        return null;
    }
  };

  const totalMaterial = materialMock.reduce((sum, item) => sum + item.cantidad, 0);
  const totalDisponible = materialMock.reduce((sum, item) => sum + item.cantidadDisponible, 0);
  const porcentajeDisponibilidad = Math.round((totalDisponible / totalMaterial) * 100);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-[24px] leading-8 font-semibold text-[#0F172A]">Material Disponible</h2>
        <p className="text-[#64748B] text-[14px] leading-5 mt-1">Control de inventario y disponibilidad de equipamiento</p>
      </div>

      {/* Resumen global */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-[#10B981] to-[#059669] rounded-2xl p-6 text-white" style={{ boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)' }}>
          <div className="flex items-center justify-between mb-3">
            <Package className="w-8 h-8" />
          </div>
          <div className="text-[36px] leading-[44px] font-bold mb-1">
            {totalDisponible} / {totalMaterial}
          </div>
          <div className="text-[#D1FAE5] text-[14px] leading-5">Unidades Disponibles</div>
        </div>

        <div className="bg-gradient-to-br from-[#3B82F6] to-[#6366F1] rounded-2xl p-6 text-white" style={{ boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)' }}>
          <div className="flex items-center justify-between mb-3">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <div className="text-[36px] leading-[44px] font-bold mb-1">{porcentajeDisponibilidad}%</div>
          <div className="text-[#DBEAFE] text-[14px] leading-5">Disponibilidad</div>
        </div>

        <div className="bg-gradient-to-br from-[#A855F7] to-[#EC4899] rounded-2xl p-6 text-white" style={{ boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)' }}>
          <div className="flex items-center justify-between mb-3">
            <Wrench className="w-8 h-8" />
          </div>
          <div className="text-[36px] leading-[44px] font-bold mb-1">
            {materialMock.filter(m => m.estado === 'mantenimiento').length}
          </div>
          <div className="text-[#F3E8FF] text-[14px] leading-5">En Mantenimiento</div>
        </div>
      </div>

      {/* Búsqueda y filtros */}
      <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#94A3B8]" />
            <input
              type="text"
              placeholder="Buscar material..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="w-full h-12 pl-10 pr-4 py-2 border border-[#E2E8F0] rounded-xl text-[16px] focus:outline-none focus:ring-2 focus:ring-[#6366F1] focus:border-[#6366F1] transition-all duration-200"
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setFiltroEstado('todos')}
              className={`px-4 py-2 rounded-xl font-semibold transition-all duration-200 ${
                filtroEstado === 'todos'
                  ? 'bg-[#6366F1] text-white hover:bg-[#4F46E5]'
                  : 'bg-[#F1F5F9] text-[#64748B] hover:bg-[#E2E8F0]'
              }`}
            >
              Todos
            </button>
            <button
              onClick={() => setFiltroEstado('disponible')}
              className={`px-4 py-2 rounded-xl font-semibold transition-all duration-200 ${
                filtroEstado === 'disponible'
                  ? 'bg-[#6366F1] text-white hover:bg-[#4F46E5]'
                  : 'bg-[#F1F5F9] text-[#64748B] hover:bg-[#E2E8F0]'
              }`}
            >
              Disponibles
            </button>
            <button
              onClick={() => setFiltroEstado('mantenimiento')}
              className={`px-4 py-2 rounded-xl font-semibold transition-all duration-200 ${
                filtroEstado === 'mantenimiento'
                  ? 'bg-[#6366F1] text-white hover:bg-[#4F46E5]'
                  : 'bg-[#F1F5F9] text-[#64748B] hover:bg-[#E2E8F0]'
              }`}
            >
              Mantenimiento
            </button>
          </div>
        </div>
      </div>

      {/* Lista de material */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {materialFiltrado.map(item => {
          const porcentajeDisp = (item.cantidadDisponible / item.cantidad) * 100;
          return (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-[#E2E8F0] p-6 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
              style={{ boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)' }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-3">
                  <div className="p-3 bg-[#F3E8FF] rounded-xl">
                    <Package className="w-6 h-6 text-[#A855F7]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[18px] leading-7 text-[#0F172A]">{item.nombre}</h3>
                    <p className="text-[14px] leading-5 text-[#64748B]">{item.categoria}</p>
                  </div>
                </div>
                {getEstadoBadge(item.estado)}
              </div>

              <div className="space-y-3">
                {/* Disponibilidad */}
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-slate-600">Disponibilidad</span>
                    <span className={`text-lg font-bold ${getDisponibilidadColor(item)}`}>
                      {item.cantidadDisponible} / {item.cantidad}
                    </span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                    <div
                      className={`h-full transition-all duration-500 ${
                        porcentajeDisp > 80 ? 'bg-emerald-500' :
                        porcentajeDisp > 50 ? 'bg-blue-500' :
                        porcentajeDisp > 0 ? 'bg-orange-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${porcentajeDisp}%` }}
                    />
                  </div>
                </div>

                {/* Ubicación */}
                {item.ubicacion && (
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Ubicación:</span>
                    <span className="font-medium text-slate-900">{item.ubicacion}</span>
                  </div>
                )}

                {/* Mantenimiento */}
                {item.proximoMantenimiento && (
                  <div className="pt-3 border-t border-slate-200">
                    <div className="flex items-center gap-2 text-sm text-slate-600 mb-1">
                      <Wrench className="w-4 h-4" />
                      <span>Próximo mantenimiento</span>
                    </div>
                    <div className="text-sm font-medium text-slate-900">
                      {new Date(item.proximoMantenimiento).toLocaleDateString('es-ES', {
                        day: '2-digit',
                        month: 'long',
                        year: 'numeric'
                      })}
                    </div>
                  </div>
                )}

                {/* Alertas */}
                {item.cantidadDisponible === 0 && item.estado !== 'mantenimiento' && (
                  <div className="flex items-center gap-2 p-2 bg-red-50 border border-red-200 rounded text-sm text-red-700">
                    <AlertCircle className="w-4 h-4" />
                    <span className="font-medium">Sin unidades disponibles</span>
                  </div>
                )}
                {porcentajeDisp < 30 && porcentajeDisp > 0 && (
                  <div className="flex items-center gap-2 p-2 bg-amber-50 border border-amber-200 rounded text-sm text-amber-700">
                    <AlertCircle className="w-4 h-4" />
                    <span className="font-medium">Stock bajo</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {materialFiltrado.length === 0 && (
        <div className="text-center py-12">
          <Package className="w-16 h-16 text-slate-300 mx-auto mb-4" />
          <p className="text-slate-600 text-lg">No se encontró material</p>
        </div>
      )}
    </div>
  );
}

