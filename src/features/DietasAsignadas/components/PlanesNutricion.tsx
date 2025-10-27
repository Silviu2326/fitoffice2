import { BookOpen, Plus, Edit2, Copy } from 'lucide-react';

interface PlanNutricion {
  id: string;
  nombre: string;
  descripcion: string;
  tipo: 'perdida-grasa' | 'ganancia-muscular' | 'mantenimiento';
  nivel: number;
  clientesAsignados: number;
}

export default function PlanesNutricion() {
  const planes: PlanNutricion[] = [
    {
      id: '1',
      nombre: 'Plan pérdida grasa nivel 1',
      descripcion: 'Plan básico para iniciación en pérdida de grasa',
      tipo: 'perdida-grasa',
      nivel: 1,
      clientesAsignados: 12
    },
    {
      id: '2',
      nombre: 'Plan ganancia muscular nivel 1',
      descripcion: 'Plan para ganar masa muscular de forma saludable',
      tipo: 'ganancia-muscular',
      nivel: 1,
      clientesAsignados: 8
    },
    {
      id: '3',
      nombre: 'Plan mantenimiento saludable',
      descripcion: 'Mantén tu peso ideal con una alimentación balanceada',
      tipo: 'mantenimiento',
      nivel: 1,
      clientesAsignados: 5
    }
  ];

  const getTipoBadge = (tipo: string) => {
    const styles = {
      'perdida-grasa': 'bg-[#FEE2E2] text-[#EF4444]',
      'ganancia-muscular': 'bg-[#DBEAFE] text-[#3B82F6]',
      'mantenimiento': 'bg-[#D1FAE5] text-[#10B981]'
    };
    return styles[tipo as keyof typeof styles] || styles.mantenimiento;
  };

  const getTipoNombre = (tipo: string) => {
    const nombres = {
      'perdida-grasa': 'Pérdida de Grasa',
      'ganancia-muscular': 'Ganancia Muscular',
      'mantenimiento': 'Mantenimiento'
    };
    return nombres[tipo as keyof typeof nombres] || tipo;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-[#EEF2FF] p-3 rounded-xl">
            <BookOpen className="w-6 h-6 text-[#6366F1]" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-[#F1F5F9]">Planes de Nutrición</h2>
            <p className="text-sm text-[#94A3B8]">Planes estándar para gimnasios y centros</p>
          </div>
        </div>
        <button className="flex items-center gap-2 px-4 py-3 bg-[#6366F1] hover:bg-[#4F46E5] text-white rounded-xl font-semibold transition-all duration-200 shadow-md hover:shadow-lg">
          <Plus className="w-5 h-5" />
          Nuevo Plan
        </button>
      </div>

      {/* Lista de planes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
        {planes.map((plan) => (
          <div
            key={plan.id}
            className="bg-[#1E1E2E] rounded-2xl p-6 border border-[#334155] hover:border-[#6366F1] hover:shadow-lg transition-all duration-200"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-[#F1F5F9] mb-2">
                  {plan.nombre}
                </h3>
                <p className="text-sm text-[#94A3B8] mb-3">{plan.descripcion}</p>
              </div>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-[#94A3B8]">Tipo:</span>
                <span className={`px-3 py-1.5 rounded-full text-xs font-medium ${getTipoBadge(plan.tipo)}`}>
                  {getTipoNombre(plan.tipo)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-[#94A3B8]">Nivel:</span>
                <span className="text-[#F1F5F9] font-medium">{plan.nivel}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-[#94A3B8]">Clientes asignados:</span>
                <span className="text-[#10B981] font-semibold">{plan.clientesAsignados}</span>
              </div>
            </div>

            <div className="flex gap-2">
              <button className="flex-1 px-3 py-2.5 bg-[#6366F1] hover:bg-[#4F46E5] text-white rounded-xl text-sm font-semibold transition-all duration-200 flex items-center justify-center gap-2 shadow-md">
                <Edit2 className="w-4 h-4" />
                Editar
              </button>
              <button className="px-3 py-2.5 bg-[#F8FAFC] hover:bg-[#F1F5F9] text-[#0F172A] border border-[#E2E8F0] rounded-xl text-sm font-semibold transition-all duration-200">
                <Copy className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Estadísticas */}
      <div className="bg-[#1E1E2E] rounded-2xl p-6 border border-[#334155] shadow-md">
        <h3 className="text-lg font-semibold text-[#F1F5F9] mb-4">Estadísticas de Planes</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-[#0F0F23] rounded-xl p-5">
            <p className="text-3xl font-bold text-[#6366F1]">{planes.length}</p>
            <p className="text-sm text-[#94A3B8] mt-1">Planes totales</p>
          </div>
          <div className="bg-[#0F0F23] rounded-xl p-5">
            <p className="text-3xl font-bold text-[#3B82F6]">
              {planes.reduce((sum, plan) => sum + plan.clientesAsignados, 0)}
            </p>
            <p className="text-sm text-[#94A3B8] mt-1">Clientes en planes</p>
          </div>
          <div className="bg-[#0F0F23] rounded-xl p-5">
            <p className="text-3xl font-bold text-[#F59E0B]">
              {(planes.reduce((sum, plan) => sum + plan.clientesAsignados, 0) / planes.length).toFixed(1)}
            </p>
            <p className="text-sm text-[#94A3B8] mt-1">Promedio por plan</p>
          </div>
        </div>
      </div>
    </div>
  );
}

