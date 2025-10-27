import { Dumbbell, Eye, Download, Star } from 'lucide-react';

interface PlanSala {
  id: string;
  nombre: string;
  descripcion: string;
  categoria: string;
  nivel: 'principiante' | 'intermedio' | 'avanzado';
  duracion: string;
  ejercicios: number;
  usuariosActivos: number;
  valoracion: number;
}

export default function PlanSala() {
  // Datos de ejemplo
  const planesSala: PlanSala[] = [
    {
      id: '1',
      nombre: 'Plan de Sala - Hipertrofia',
      descripcion: 'Rutina de 4 días enfocada en ganancia muscular',
      categoria: 'Hipertrofia',
      nivel: 'intermedio',
      duracion: '4 semanas',
      ejercicios: 32,
      usuariosActivos: 23,
      valoracion: 4.5
    },
    {
      id: '2',
      nombre: 'Plan Definición Muscular',
      descripcion: 'Programa de 6 semanas para definición',
      categoria: 'Definición',
      nivel: 'avanzado',
      duracion: '6 semanas',
      ejercicios: 45,
      usuariosActivos: 18,
      valoracion: 4.8
    },
    {
      id: '3',
      nombre: 'Iniciación al Gimnasio',
      descripcion: 'Plan perfecto para principiantes en sala',
      categoria: 'Iniciación',
      nivel: 'principiante',
      duracion: '8 semanas',
      ejercicios: 24,
      usuariosActivos: 31,
      valoracion: 4.3
    }
  ];

  const getNivelColor = (nivel: string) => {
    switch (nivel) {
      case 'principiante':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'intermedio':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'avanzado':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      default:
        return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-[#0F172A]">Planes de Sala</h3>
        <span className="text-sm text-[#64748B] font-medium">{planesSala.length} planes disponibles</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {planesSala.map((plan) => (
          <div
            key={plan.id}
            className="bg-white border border-[#E2E8F0] rounded-xl overflow-hidden hover:border-[#6366F1] hover:shadow-lg transition-all duration-200"
          >
            {/* Header con gradiente */}
            <div className="bg-[#6366F1] p-4">
              <div className="flex items-start justify-between mb-2">
                <Dumbbell className="w-6 h-6 text-white" />
                <span className={`px-3 py-1 text-xs font-medium rounded-full border bg-white/20 text-white border-white/30`}>
                  {plan.nivel}
                </span>
              </div>
              <h4 className="text-lg font-semibold text-white mb-1">{plan.nombre}</h4>
              <p className="text-sm text-white/90">{plan.descripcion}</p>
            </div>

            {/* Body */}
            <div className="p-4 space-y-4">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(plan.valoracion)
                        ? 'text-[#F59E0B] fill-[#F59E0B]'
                        : 'text-[#E2E8F0]'
                    }`}
                  />
                ))}
                <span className="ml-2 text-sm text-[#64748B] font-medium">
                  {plan.valoracion.toFixed(1)}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-xs text-[#94A3B8] font-medium mb-1">Duración</p>
                  <p className="text-sm font-semibold text-[#0F172A]">{plan.duracion}</p>
                </div>
                <div>
                  <p className="text-xs text-[#94A3B8] font-medium mb-1">Ejercicios</p>
                  <p className="text-sm font-semibold text-[#0F172A]">{plan.ejercicios}</p>
                </div>
                <div>
                  <p className="text-xs text-[#94A3B8] font-medium mb-1">Categoría</p>
                  <p className="text-sm font-semibold text-[#0F172A]">{plan.categoria}</p>
                </div>
                <div>
                  <p className="text-xs text-[#94A3B8] font-medium mb-1">Usuarios</p>
                  <p className="text-sm font-semibold text-[#0F172A]">{plan.usuariosActivos}</p>
                </div>
              </div>

              {/* Botones */}
              <div className="flex gap-2 pt-2">
                <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-[#6366F1] hover:bg-[#4F46E5] text-white text-sm font-semibold rounded-xl shadow-sm transition-all duration-200">
                  <Eye className="w-4 h-4" />
                  Ver Plan
                </button>
                <button className="px-3 py-2 bg-[#F8FAFC] hover:bg-[#F1F5F9] border border-[#E2E8F0] text-[#0F172A] rounded-xl transition-all duration-200">
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

