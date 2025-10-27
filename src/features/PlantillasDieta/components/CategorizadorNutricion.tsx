import { FolderTree, Plus, Edit, Trash2 } from 'lucide-react';

export default function CategorizadorNutricion() {
  const categorias = [
    {
      id: 1,
      nombre: 'Vegetariana',
      descripcion: 'Planes sin carne ni pescado',
      plantillas: 8,
      color: 'green',
    },
    {
      id: 2,
      nombre: 'Cetogénica',
      descripcion: 'Alta en grasas, baja en carbohidratos',
      plantillas: 5,
      color: 'purple',
    },
    {
      id: 3,
      nombre: 'Pérdida de Peso',
      descripcion: 'Déficit calórico controlado',
      plantillas: 12,
      color: 'red',
    },
    {
      id: 4,
      nombre: 'Ganancia Muscular',
      descripcion: 'Superávit calórico con alta proteína',
      plantillas: 9,
      color: 'blue',
    },
    {
      id: 5,
      nombre: 'Mediterránea',
      descripcion: 'Basada en dieta mediterránea',
      plantillas: 6,
      color: 'amber',
    },
    {
      id: 6,
      nombre: 'Vegana',
      descripcion: 'Sin productos de origen animal',
      plantillas: 4,
      color: 'emerald',
    },
  ];

  const colorClasses = {
    green: 'bg-green-100 text-green-700 border-green-200',
    purple: 'bg-purple-100 text-purple-700 border-purple-200',
    red: 'bg-red-100 text-red-700 border-red-200',
    blue: 'bg-blue-100 text-blue-700 border-blue-200',
    amber: 'bg-amber-100 text-amber-700 border-amber-200',
    emerald: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-md border border-[#E2E8F0] p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-[#0F172A]">Categorías Nutricionales</h2>
            <p className="text-sm text-[#94A3B8] mt-1">Organiza tus plantillas por tipo de dieta</p>
          </div>
          <button className="flex items-center gap-2 px-6 py-3 bg-[#6366F1] text-white rounded-xl hover:bg-[#4F46E5] active:bg-[#4338CA] transition-all duration-200 ease-out font-semibold shadow-md hover:shadow-lg">
            <Plus className="w-4 h-4" />
            Nueva Categoría
          </button>
        </div>
      </div>

      {/* Categorías Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categorias.map((categoria) => (
          <div
            key={categoria.id}
            className={`rounded-xl border-2 p-6 transition-all duration-200 ease-out hover:shadow-lg ${
              colorClasses[categoria.color as keyof typeof colorClasses]
            }`}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 bg-white rounded-lg shadow-sm">
                <FolderTree className="w-6 h-6" />
              </div>
              <div className="flex gap-1">
                <button className="p-2 hover:bg-white/50 rounded-xl transition-all duration-200 ease-out">
                  <Edit className="w-4 h-4" />
                </button>
                <button className="p-2 hover:bg-white/50 rounded-xl transition-all duration-200 ease-out">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <h3 className="text-lg font-bold mb-2">{categoria.nombre}</h3>
            <p className="text-sm opacity-80 mb-4">{categoria.descripcion}</p>

            <div className="flex items-center justify-between pt-4 border-t border-current/20">
              <span className="text-sm font-semibold">{categoria.plantillas} plantillas</span>
              <button className="text-sm font-semibold hover:underline">Ver todas →</button>
            </div>
          </div>
        ))}
      </div>

      {/* Stats */}
      <div className="bg-white rounded-xl shadow-md border border-[#E2E8F0] p-6">
        <h3 className="text-lg font-bold text-[#0F172A] mb-4">Estadísticas de Categorías</h3>
        <div className="space-y-3">
          {categorias.map((categoria) => (
            <div key={categoria.id} className="flex items-center gap-4">
              <div className="w-40 text-sm font-semibold text-[#0F172A]">{categoria.nombre}</div>
              <div className="flex-1 bg-[#E2E8F0] rounded-full h-3">
                <div
                  className={`h-3 rounded-full transition-all duration-200 ease-out ${
                    categoria.color === 'green' ? 'bg-green-500' :
                    categoria.color === 'purple' ? 'bg-purple-500' :
                    categoria.color === 'red' ? 'bg-red-500' :
                    categoria.color === 'blue' ? 'bg-blue-500' :
                    categoria.color === 'amber' ? 'bg-amber-500' :
                    'bg-emerald-500'
                  }`}
                  style={{ width: `${(categoria.plantillas / 12) * 100}%` }}
                ></div>
              </div>
              <div className="w-16 text-right text-sm font-semibold text-[#0F172A]">
                {categoria.plantillas}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

