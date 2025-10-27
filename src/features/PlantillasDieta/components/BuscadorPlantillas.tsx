import { Search, Filter, X, Star, Clock } from 'lucide-react';
import { useState } from 'react';

export default function BuscadorPlantillas() {
  const [filtrosAplicados, setFiltrosAplicados] = useState<string[]>([]);

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

  const categorias = ['Vegetariana', 'Vegana', 'Cetogénica', 'Pérdida de Peso', 'Ganancia Muscular', 'Mediterránea'];
  const objetivos = ['Déficit Calórico', 'Superávit Calórico', 'Mantenimiento', 'Recomposición'];

  const agregarFiltro = (filtro: string) => {
    if (!filtrosAplicados.includes(filtro)) {
      setFiltrosAplicados([...filtrosAplicados, filtro]);
    }
  };

  const quitarFiltro = (filtro: string) => {
    setFiltrosAplicados(filtrosAplicados.filter(f => f !== filtro));
  };

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <div className="bg-white rounded-xl shadow-md border border-[#E2E8F0] p-6">
        <div className="flex items-center gap-4">
          <div className="flex-1 relative">
            <Search className="w-5 h-5 text-[#94A3B8] absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar plantillas por nombre, objetivo o ingredientes..."
              className="w-full h-12 pl-12 pr-4 py-3 border border-[#E2E8F0] rounded-xl focus:ring-2 focus:ring-[#6366F1] focus:border-transparent transition-all duration-200 ease-out"
            />
          </div>
          <button className="px-6 py-3 bg-[#6366F1] text-white rounded-xl hover:bg-[#4F46E5] active:bg-[#4338CA] transition-all duration-200 ease-out font-semibold shadow-md hover:shadow-lg">
            Buscar
          </button>
        </div>
      </div>

      {/* Filtros Avanzados */}
      <div className="bg-white rounded-xl shadow-md border border-[#E2E8F0] p-6">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="w-5 h-5 text-[#6366F1]" />
          <h3 className="text-lg font-bold text-[#0F172A]">Filtros Avanzados</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Categoría */}
          <div>
            <label className="block text-sm font-semibold text-[#0F172A] mb-2">Categoría</label>
            <select 
              className="w-full h-12 px-4 py-3 border border-[#E2E8F0] rounded-xl focus:ring-2 focus:ring-[#6366F1] focus:border-transparent transition-all duration-200 ease-out"
              onChange={(e) => e.target.value && agregarFiltro(`Cat: ${e.target.value}`)}
            >
              <option value="">Todas las categorías</option>
              {categorias.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Objetivo */}
          <div>
            <label className="block text-sm font-semibold text-[#0F172A] mb-2">Objetivo</label>
            <select 
              className="w-full h-12 px-4 py-3 border border-[#E2E8F0] rounded-xl focus:ring-2 focus:ring-[#6366F1] focus:border-transparent transition-all duration-200 ease-out"
              onChange={(e) => e.target.value && agregarFiltro(`Obj: ${e.target.value}`)}
            >
              <option value="">Todos los objetivos</option>
              {objetivos.map((obj) => (
                <option key={obj} value={obj}>{obj}</option>
              ))}
            </select>
          </div>

          {/* Calorías Mínimas */}
          <div>
            <label className="block text-sm font-semibold text-[#0F172A] mb-2">Calorías Mín.</label>
            <input
              type="number"
              placeholder="1200"
              className="w-full h-12 px-4 py-3 border border-[#E2E8F0] rounded-xl focus:ring-2 focus:ring-[#6366F1] focus:border-transparent transition-all duration-200 ease-out"
            />
          </div>

          {/* Calorías Máximas */}
          <div>
            <label className="block text-sm font-semibold text-[#0F172A] mb-2">Calorías Máx.</label>
            <input
              type="number"
              placeholder="3000"
              className="w-full h-12 px-4 py-3 border border-[#E2E8F0] rounded-xl focus:ring-2 focus:ring-[#6366F1] focus:border-transparent transition-all duration-200 ease-out"
            />
          </div>
        </div>

        {/* Filtros Aplicados */}
        {filtrosAplicados.length > 0 && (
          <div className="mt-4 pt-4 border-t border-[#E2E8F0]">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm font-semibold text-[#0F172A]">Filtros activos:</span>
              {filtrosAplicados.map((filtro) => (
                <span
                  key={filtro}
                  className="flex items-center gap-2 px-3 py-1 bg-[#EEF2FF] text-[#6366F1] rounded-full text-sm font-medium"
                >
                  {filtro}
                  <button onClick={() => quitarFiltro(filtro)}>
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
              <button
                onClick={() => setFiltrosAplicados([])}
                className="text-sm text-[#94A3B8] hover:text-[#0F172A] underline transition-colors duration-200 ease-out"
              >
                Limpiar todo
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Ordenar */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-[#94A3B8]">
          Mostrando <span className="font-semibold text-[#0F172A]">{plantillas.length}</span> plantillas
        </p>
        <div className="flex items-center gap-2">
          <span className="text-sm text-[#94A3B8]">Ordenar por:</span>
          <select className="h-12 px-4 py-3 border border-[#E2E8F0] rounded-xl text-sm focus:ring-2 focus:ring-[#6366F1] focus:border-transparent transition-all duration-200 ease-out">
            <option value="recientes">Más recientes</option>
            <option value="usadas">Más usadas</option>
            <option value="efectivas">Más efectivas</option>
            <option value="nombre">Nombre (A-Z)</option>
            <option value="calorias">Calorías (menor a mayor)</option>
          </select>
        </div>
      </div>

      {/* Resultados Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {plantillas.map((plantilla) => (
          <div
            key={plantilla.id}
            className="bg-white rounded-xl shadow-md border border-[#E2E8F0] p-6 hover:shadow-lg transition-all duration-200 ease-out cursor-pointer"
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="font-bold text-[#0F172A] mb-1">{plantilla.nombre}</h3>
                <span className="px-2 py-1 bg-[#EEF2FF] text-[#6366F1] rounded text-xs font-medium">
                  {plantilla.categoria}
                </span>
              </div>
              <div className="flex items-center gap-1 text-amber-500">
                <Star className="w-4 h-4 fill-current" />
                <span className="text-sm font-semibold">{plantilla.efectividad}%</span>
              </div>
            </div>

            {/* Stats */}
            <div className="space-y-3 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-[#94A3B8]">Objetivo:</span>
                <span className="font-medium text-[#0F172A]">{plantilla.objetivo}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[#94A3B8]">Calorías:</span>
                <span className="font-semibold text-[#0F172A]">{plantilla.calorias} kcal</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[#94A3B8]">Macros:</span>
                <div className="flex gap-2 text-xs">
                  <span className="text-blue-600 font-medium">{plantilla.macros.proteinas}g</span>
                  <span className="text-amber-600 font-medium">{plantilla.macros.carbohidratos}g</span>
                  <span className="text-red-600 font-medium">{plantilla.macros.grasas}g</span>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between pt-4 border-t border-[#E2E8F0]">
              <div className="flex items-center gap-1 text-[#94A3B8] text-sm">
                <Clock className="w-4 h-4" />
                <span>{plantilla.usos} usos</span>
              </div>
              <button className="text-sm font-semibold text-[#6366F1] hover:text-[#4F46E5] transition-colors duration-200 ease-out">
                Ver detalles →
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Tips de Búsqueda */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
        <h3 className="text-sm font-bold text-blue-900 mb-2">💡 Consejos de Búsqueda</h3>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Usa filtros combinados para encontrar plantillas específicas</li>
          <li>• Ordena por "Más usadas" para ver las plantillas más populares</li>
          <li>• Busca por ingredientes específicos si tienes restricciones</li>
          <li>• Revisa la efectividad para identificar plantillas con mejores resultados</li>
        </ul>
      </div>
    </div>
  );
}

