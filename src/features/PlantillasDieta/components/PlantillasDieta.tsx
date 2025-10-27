import { BookOpen, Copy, Edit, Trash2, Eye, Star } from 'lucide-react';

export default function PlantillasDieta() {
  // Datos de ejemplo
  const plantillas = [
    {
      id: 1,
      nombre: 'Vegetariana 1800 kcal',
      categoria: 'Vegetariana',
      objetivo: 'Mantenimiento',
      calorias: 1800,
      macros: { proteinas: 90, carbohidratos: 220, grasas: 60 },
      usos: 12,
      efectividad: 85,
      fechaCreacion: '2025-01-15',
    },
    {
      id: 2,
      nombre: 'Déficit Suave 2-3kg/mes',
      categoria: 'Pérdida de Peso',
      objetivo: 'Déficit Calórico',
      calorias: 1600,
      macros: { proteinas: 120, carbohidratos: 150, grasas: 50 },
      usos: 25,
      efectividad: 92,
      fechaCreacion: '2025-02-01',
    },
    {
      id: 3,
      nombre: 'Volumen Limpio 3000 kcal',
      categoria: 'Ganancia Muscular',
      objetivo: 'Superávit Calórico',
      calorias: 3000,
      macros: { proteinas: 180, carbohidratos: 400, grasas: 80 },
      usos: 18,
      efectividad: 88,
      fechaCreacion: '2025-01-20',
    },
    {
      id: 4,
      nombre: 'Keto Estricta 1500 kcal',
      categoria: 'Cetogénica',
      objetivo: 'Pérdida de Peso',
      calorias: 1500,
      macros: { proteinas: 100, carbohidratos: 30, grasas: 110 },
      usos: 8,
      efectividad: 78,
      fechaCreacion: '2025-02-10',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-md border border-[#E2E8F0]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[#94A3B8] text-sm font-semibold">Total Plantillas</span>
            <BookOpen className="w-5 h-5 text-[#6366F1]" />
          </div>
          <p className="text-3xl font-bold text-[#0F172A]">24</p>
          <p className="text-xs text-[#94A3B8] mt-1">+3 este mes</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-md border border-[#E2E8F0]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[#94A3B8] text-sm font-semibold">Más Usada</span>
            <Star className="w-5 h-5 text-amber-500" />
          </div>
          <p className="text-lg font-bold text-[#0F172A]">Déficit Suave</p>
          <p className="text-xs text-[#94A3B8] mt-1">25 usos</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-md border border-[#E2E8F0]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[#94A3B8] text-sm font-semibold">Efectividad Media</span>
            <BarChart className="w-5 h-5 text-emerald-500" />
          </div>
          <p className="text-3xl font-bold text-[#0F172A]">86%</p>
          <p className="text-xs text-[#94A3B8] mt-1">+2% vs mes anterior</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-md border border-[#E2E8F0]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[#94A3B8] text-sm font-semibold">Categorías</span>
            <Copy className="w-5 h-5 text-[#6366F1]" />
          </div>
          <p className="text-3xl font-bold text-[#0F172A]">8</p>
          <p className="text-xs text-[#94A3B8] mt-1">Diferentes tipos</p>
        </div>
      </div>

      {/* Plantillas List */}
      <div className="bg-white rounded-xl shadow-md border border-[#E2E8F0]">
        <div className="p-6 border-b border-[#E2E8F0]">
          <h2 className="text-xl font-bold text-[#0F172A]">Catálogo de Plantillas Nutricionales</h2>
          <p className="text-sm text-[#94A3B8] mt-1">Biblioteca completa de planes nutricionales reutilizables</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#F8FAFC] border-b border-[#E2E8F0]">
              <tr>
                <th className="text-left px-6 py-3 text-xs font-semibold text-[#94A3B8] uppercase tracking-wider">
                  Plantilla
                </th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-[#94A3B8] uppercase tracking-wider">
                  Categoría
                </th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-[#94A3B8] uppercase tracking-wider">
                  Calorías
                </th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-[#94A3B8] uppercase tracking-wider">
                  Macros (P/C/G)
                </th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-[#94A3B8] uppercase tracking-wider">
                  Usos
                </th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-[#94A3B8] uppercase tracking-wider">
                  Efectividad
                </th>
                <th className="text-right px-6 py-3 text-xs font-semibold text-[#94A3B8] uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8F0]">
              {plantillas.map((plantilla) => (
                <tr key={plantilla.id} className="hover:bg-[#F8FAFC] transition-all duration-200 ease-out">
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-semibold text-[#0F172A]">{plantilla.nombre}</p>
                      <p className="text-sm text-[#94A3B8]">{plantilla.objetivo}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-[#EEF2FF] text-[#6366F1]">
                      {plantilla.categoria}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-semibold text-[#0F172A]">{plantilla.calorias}</span>
                    <span className="text-[#94A3B8] text-sm ml-1">kcal</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2 text-sm">
                      <span className="text-blue-600 font-medium">{plantilla.macros.proteinas}g</span>
                      <span className="text-[#94A3B8]">/</span>
                      <span className="text-amber-600 font-medium">{plantilla.macros.carbohidratos}g</span>
                      <span className="text-[#94A3B8]">/</span>
                      <span className="text-red-600 font-medium">{plantilla.macros.grasas}g</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-semibold text-[#0F172A]">{plantilla.usos}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-[#E2E8F0] rounded-full h-2 max-w-[100px]">
                        <div
                          className="bg-emerald-500 h-2 rounded-full transition-all duration-200 ease-out"
                          style={{ width: `${plantilla.efectividad}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-semibold text-[#0F172A]">{plantilla.efectividad}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 hover:bg-[#F1F5F9] rounded-xl transition-all duration-200 ease-out" title="Ver">
                        <Eye className="w-4 h-4 text-[#94A3B8]" />
                      </button>
                      <button className="p-2 hover:bg-[#F1F5F9] rounded-xl transition-all duration-200 ease-out" title="Duplicar">
                        <Copy className="w-4 h-4 text-[#94A3B8]" />
                      </button>
                      <button className="p-2 hover:bg-[#F1F5F9] rounded-xl transition-all duration-200 ease-out" title="Editar">
                        <Edit className="w-4 h-4 text-[#94A3B8]" />
                      </button>
                      <button className="p-2 hover:bg-[#FEE2E2] rounded-xl transition-all duration-200 ease-out" title="Eliminar">
                        <Trash2 className="w-4 h-4 text-[#EF4444]" />
                      </button>
                    </div>
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

// Componente auxiliar para el gráfico de barras
function BarChart({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      viewBox="0 0 24 24"
    >
      <line x1="12" y1="20" x2="12" y2="10"></line>
      <line x1="18" y1="20" x2="18" y2="4"></line>
      <line x1="6" y1="20" x2="6" y2="16"></line>
    </svg>
  );
}

