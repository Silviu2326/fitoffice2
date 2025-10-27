import { Copy, ArrowRight, Check } from 'lucide-react';

export default function DuplicadorPlan() {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-md border border-[#E2E8F0] p-6">
        <h2 className="text-xl font-bold text-[#0F172A] mb-2">Duplicar y Personalizar Plantilla</h2>
        <p className="text-sm text-[#94A3B8]">Crea una copia de una plantilla existente y personalizala</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Plantilla Original */}
        <div className="bg-white rounded-xl shadow-md border border-[#E2E8F0] p-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Copy className="w-5 h-5 text-blue-600" />
            </div>
            <h3 className="text-lg font-bold text-[#0F172A]">Plantilla Original</h3>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-[#0F172A] mb-2">
                Seleccionar Plantilla
              </label>
              <select className="w-full h-12 px-4 py-3 border border-[#E2E8F0] rounded-xl focus:ring-2 focus:ring-[#6366F1] focus:border-transparent transition-all duration-200 ease-out">
                <option value="">Selecciona una plantilla...</option>
                <option value="1">Vegetariana 1800 kcal</option>
                <option value="2">Déficit Suave 2-3kg/mes</option>
                <option value="3">Volumen Limpio 3000 kcal</option>
                <option value="4">Keto Estricta 1500 kcal</option>
              </select>
            </div>

            {/* Preview de plantilla seleccionada */}
            <div className="bg-[#F8FAFC] rounded-xl p-4 border border-[#E2E8F0]">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-[#94A3B8]">Nombre:</span>
                  <span className="text-sm font-semibold text-[#0F172A]">Déficit Suave 2-3kg/mes</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-[#94A3B8]">Categoría:</span>
                  <span className="px-2 py-1 bg-[#FEE2E2] text-red-700 rounded text-xs font-medium">
                    Pérdida de Peso
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-[#94A3B8]">Calorías:</span>
                  <span className="text-sm font-semibold text-[#0F172A]">1600 kcal</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-[#94A3B8]">Macros:</span>
                  <div className="flex gap-2 text-xs">
                    <span className="text-blue-600 font-medium">120g P</span>
                    <span className="text-amber-600 font-medium">150g C</span>
                    <span className="text-red-600 font-medium">50g G</span>
                  </div>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-[#94A3B8]">Usos:</span>
                  <span className="text-sm font-semibold text-[#0F172A]">25 veces</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-[#94A3B8]">Efectividad:</span>
                  <span className="text-sm font-semibold text-emerald-600">92%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Arrow */}
        <div className="hidden lg:flex items-center justify-center">
          <div className="p-4 bg-[#EEF2FF] rounded-full">
            <ArrowRight className="w-8 h-8 text-[#6366F1]" />
          </div>
        </div>

        {/* Plantilla Duplicada */}
        <div className="bg-white rounded-xl shadow-md border border-[#E2E8F0] p-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="p-2 bg-[#EEF2FF] rounded-lg">
              <Check className="w-5 h-5 text-[#6366F1]" />
            </div>
            <h3 className="text-lg font-bold text-[#0F172A]">Plantilla Duplicada</h3>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-[#0F172A] mb-2">
                Nuevo Nombre
              </label>
              <input
                type="text"
                placeholder="Déficit Suave 2-3kg/mes (Copia)"
                className="w-full h-12 px-4 py-3 border border-[#E2E8F0] rounded-xl focus:ring-2 focus:ring-[#6366F1] focus:border-transparent transition-all duration-200 ease-out"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#0F172A] mb-2">
                Ajustar Calorías
              </label>
              <input
                type="number"
                placeholder="1600"
                className="w-full h-12 px-4 py-3 border border-[#E2E8F0] rounded-xl focus:ring-2 focus:ring-[#6366F1] focus:border-transparent transition-all duration-200 ease-out"
              />
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="block text-xs font-semibold text-[#0F172A] mb-1">
                  Proteínas (g)
                </label>
                <input
                  type="number"
                  placeholder="120"
                  className="w-full h-12 px-3 py-3 border border-[#E2E8F0] rounded-xl text-sm focus:ring-2 focus:ring-[#6366F1] focus:border-transparent transition-all duration-200 ease-out"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#0F172A] mb-1">
                  Carbos (g)
                </label>
                <input
                  type="number"
                  placeholder="150"
                  className="w-full h-12 px-3 py-3 border border-[#E2E8F0] rounded-xl text-sm focus:ring-2 focus:ring-[#6366F1] focus:border-transparent transition-all duration-200 ease-out"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#0F172A] mb-1">
                  Grasas (g)
                </label>
                <input
                  type="number"
                  placeholder="50"
                  className="w-full h-12 px-3 py-3 border border-[#E2E8F0] rounded-xl text-sm focus:ring-2 focus:ring-[#6366F1] focus:border-transparent transition-all duration-200 ease-out"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#0F172A] mb-2">
                Personalizar Categoría
              </label>
              <select className="w-full h-12 px-4 py-3 border border-[#E2E8F0] rounded-xl focus:ring-2 focus:ring-[#6366F1] focus:border-transparent transition-all duration-200 ease-out">
                <option value="perdida-peso">Pérdida de Peso</option>
                <option value="vegetariana">Vegetariana</option>
                <option value="cetogenica">Cetogénica</option>
                <option value="ganancia-muscular">Ganancia Muscular</option>
              </select>
            </div>

            <div className="pt-4">
              <button className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-[#6366F1] text-white rounded-xl hover:bg-[#4F46E5] active:bg-[#4338CA] transition-all duration-200 ease-out font-semibold shadow-md hover:shadow-lg">
                <Copy className="w-4 h-4" />
                Crear Plantilla Duplicada
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tips */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
        <h3 className="text-sm font-bold text-blue-900 mb-2">💡 Consejos para Duplicar Plantillas</h3>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• La duplicación mantiene toda la estructura de comidas y alimentos</li>
          <li>• Puedes ajustar los macros proporcionalmente al cambio de calorías</li>
          <li>• Es útil para crear variantes de plantillas exitosas</li>
          <li>• Las plantillas duplicadas son independientes de la original</li>
        </ul>
      </div>
    </div>
  );
}

