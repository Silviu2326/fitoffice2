import { FileText, Search, Filter } from 'lucide-react';

interface Dieta {
  id: string;
  clienteNombre: string;
  tipo: 'individual' | 'plan-estandar';
  objetivo: string;
  fechaAsignacion: string;
  estado: 'activa' | 'pausada' | 'finalizada';
  macros?: {
    proteinas: number;
    carbohidratos: number;
    grasas: number;
  };
}

export default function DietasList() {
  const dietasEjemplo: Dieta[] = [
    {
      id: '1',
      clienteNombre: 'Ana García',
      tipo: 'individual',
      objetivo: 'Pérdida de grasa',
      fechaAsignacion: '2025-10-15',
      estado: 'activa',
      macros: { proteinas: 140, carbohidratos: 180, grasas: 60 }
    },
    {
      id: '2',
      clienteNombre: 'Carlos Ruiz',
      tipo: 'plan-estandar',
      objetivo: 'Plan pérdida grasa nivel 1',
      fechaAsignacion: '2025-10-20',
      estado: 'activa'
    }
  ];

  const getEstadoBadge = (estado: string) => {
    const styles = {
      activa: 'bg-[#D1FAE5] text-[#10B981]',
      pausada: 'bg-[#FEF3C7] text-[#F59E0B]',
      finalizada: 'bg-[#F1F5F9] text-[#64748B]'
    };
    return styles[estado as keyof typeof styles] || styles.activa;
  };

  return (
    <div className="space-y-6">
      {/* Barra de búsqueda y filtros */}
      <div className="bg-[#1E1E2E] rounded-2xl p-6 border border-[#334155] shadow-md">
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#64748B]" />
            <input
              type="text"
              placeholder="Buscar por cliente o tipo de dieta..."
              className="w-full bg-[#0F0F23] border border-[#334155] rounded-xl pl-10 pr-4 py-3 text-[#F1F5F9] placeholder-[#64748B] focus:outline-none focus:border-[#6366F1] focus:ring-2 focus:ring-[#6366F1]/20 transition-all duration-200"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-3 bg-[#F8FAFC] text-[#0F172A] border border-[#E2E8F0] rounded-xl hover:bg-[#F1F5F9] hover:border-[#6366F1] transition-all duration-200 font-semibold">
            <Filter className="w-5 h-5" />
            Filtros
          </button>
        </div>
      </div>

      {/* Lista de dietas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {dietasEjemplo.map((dieta) => (
          <div
            key={dieta.id}
            className="bg-[#1E1E2E] rounded-2xl p-6 border border-[#334155] hover:border-[#6366F1] hover:shadow-lg transition-all duration-200 cursor-pointer"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-[#F1F5F9] mb-1">
                  {dieta.clienteNombre}
                </h3>
                <p className="text-sm text-[#94A3B8]">{dieta.objetivo}</p>
              </div>
              <span className={`px-3 py-1.5 rounded-full text-xs font-medium ${getEstadoBadge(dieta.estado)}`}>
                {dieta.estado}
              </span>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-[#94A3B8]">Tipo:</span>
                <span className="text-[#F1F5F9] font-medium">
                  {dieta.tipo === 'individual' ? 'Individual' : 'Plan Estándar'}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-[#94A3B8]">Fecha asignación:</span>
                <span className="text-[#F1F5F9]">{dieta.fechaAsignacion}</span>
              </div>
            </div>

            {dieta.macros && (
              <div className="mt-4 pt-4 border-t border-[#334155]">
                <p className="text-xs text-[#94A3B8] mb-3 font-medium">Macros diarios:</p>
                <div className="flex gap-4">
                  <div className="text-center">
                    <p className="text-[#10B981] font-semibold text-base">{dieta.macros.proteinas}g</p>
                    <p className="text-xs text-[#94A3B8]">Proteínas</p>
                  </div>
                  <div className="text-center">
                    <p className="text-[#3B82F6] font-semibold text-base">{dieta.macros.carbohidratos}g</p>
                    <p className="text-xs text-[#94A3B8]">Carbos</p>
                  </div>
                  <div className="text-center">
                    <p className="text-[#F59E0B] font-semibold text-base">{dieta.macros.grasas}g</p>
                    <p className="text-xs text-[#94A3B8]">Grasas</p>
                  </div>
                </div>
              </div>
            )}

            <div className="mt-4 flex gap-2">
              <button className="flex-1 px-4 py-2.5 bg-[#6366F1] hover:bg-[#4F46E5] active:bg-[#4338CA] text-white rounded-xl text-sm font-semibold transition-all duration-200 shadow-md hover:shadow-lg">
                Ver Detalles
              </button>
              <button className="px-4 py-2.5 bg-[#F8FAFC] hover:bg-[#F1F5F9] text-[#0F172A] border border-[#E2E8F0] rounded-xl text-sm font-semibold transition-all duration-200">
                <FileText className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

