import { Plus, Save, X } from 'lucide-react';

export default function CreadorPlantilla() {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-md border border-[#E2E8F0] p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-[#0F172A]">Crear Nueva Plantilla Nutricional</h2>
            <p className="text-sm text-[#94A3B8] mt-1">Define una plantilla de dieta reutilizable</p>
          </div>
          <button className="flex items-center gap-2 px-6 py-3 bg-[#6366F1] text-white rounded-xl hover:bg-[#4F46E5] active:bg-[#4338CA] transition-all duration-200 ease-out font-semibold shadow-md hover:shadow-lg">
            <Save className="w-4 h-4" />
            Guardar Plantilla
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Información Básica */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-[#0F172A] mb-2">
                Nombre de la Plantilla
              </label>
              <input
                type="text"
                placeholder="Ej: Vegetariana 1800 kcal"
                className="w-full h-12 px-4 py-3 border border-[#E2E8F0] rounded-xl focus:ring-2 focus:ring-[#6366F1] focus:border-transparent transition-all duration-200 ease-out"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#0F172A] mb-2">
                Categoría Nutricional
              </label>
              <select className="w-full h-12 px-4 py-3 border border-[#E2E8F0] rounded-xl focus:ring-2 focus:ring-[#6366F1] focus:border-transparent transition-all duration-200 ease-out">
                <option value="">Seleccionar categoría</option>
                <option value="vegetariana">Vegetariana</option>
                <option value="vegana">Vegana</option>
                <option value="cetogenica">Cetogénica</option>
                <option value="paleo">Paleo</option>
                <option value="mediterranea">Mediterránea</option>
                <option value="perdida-peso">Pérdida de Peso</option>
                <option value="ganancia-muscular">Ganancia Muscular</option>
                <option value="mantenimiento">Mantenimiento</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#0F172A] mb-2">
                Objetivo
              </label>
              <select className="w-full h-12 px-4 py-3 border border-[#E2E8F0] rounded-xl focus:ring-2 focus:ring-[#6366F1] focus:border-transparent transition-all duration-200 ease-out">
                <option value="">Seleccionar objetivo</option>
                <option value="deficit">Déficit Calórico</option>
                <option value="mantenimiento">Mantenimiento</option>
                <option value="superavit">Superávit Calórico</option>
                <option value="recomposicion">Recomposición Corporal</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#0F172A] mb-2">
                Descripción
              </label>
              <textarea
                rows={4}
                placeholder="Describe el propósito y características de esta plantilla..."
                className="w-full px-4 py-3 border border-[#E2E8F0] rounded-xl focus:ring-2 focus:ring-[#6366F1] focus:border-transparent transition-all duration-200 ease-out"
              />
            </div>
          </div>

          {/* Configuración Nutricional */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-[#0F172A] mb-2">
                Calorías Totales (kcal)
              </label>
              <input
                type="number"
                placeholder="1800"
                className="w-full h-12 px-4 py-3 border border-[#E2E8F0] rounded-xl focus:ring-2 focus:ring-[#6366F1] focus:border-transparent transition-all duration-200 ease-out"
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-semibold text-[#0F172A] mb-2">
                  Proteínas (g)
                </label>
                <input
                  type="number"
                  placeholder="120"
                  className="w-full h-12 px-4 py-3 border border-[#E2E8F0] rounded-xl focus:ring-2 focus:ring-[#6366F1] focus:border-transparent transition-all duration-200 ease-out"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#0F172A] mb-2">
                  Carbohidratos (g)
                </label>
                <input
                  type="number"
                  placeholder="180"
                  className="w-full h-12 px-4 py-3 border border-[#E2E8F0] rounded-xl focus:ring-2 focus:ring-[#6366F1] focus:border-transparent transition-all duration-200 ease-out"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#0F172A] mb-2">
                  Grasas (g)
                </label>
                <input
                  type="number"
                  placeholder="60"
                  className="w-full h-12 px-4 py-3 border border-[#E2E8F0] rounded-xl focus:ring-2 focus:ring-[#6366F1] focus:border-transparent transition-all duration-200 ease-out"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#0F172A] mb-2">
                Número de Comidas
              </label>
              <select className="w-full h-12 px-4 py-3 border border-[#E2E8F0] rounded-xl focus:ring-2 focus:ring-[#6366F1] focus:border-transparent transition-all duration-200 ease-out">
                <option value="3">3 comidas</option>
                <option value="4">4 comidas</option>
                <option value="5">5 comidas</option>
                <option value="6">6 comidas</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#0F172A] mb-2">
                Distribución de Comidas
              </label>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="desayuno" defaultChecked className="rounded" />
                  <label htmlFor="desayuno" className="text-sm text-[#0F172A]">Desayuno</label>
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="almuerzo" defaultChecked className="rounded" />
                  <label htmlFor="almuerzo" className="text-sm text-[#0F172A]">Almuerzo</label>
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="cena" defaultChecked className="rounded" />
                  <label htmlFor="cena" className="text-sm text-[#0F172A]">Cena</label>
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="snacks" className="rounded" />
                  <label htmlFor="snacks" className="text-sm text-[#0F172A]">Snacks</label>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tags */}
        <div className="mt-6 pt-6 border-t border-[#E2E8F0]">
          <label className="block text-sm font-semibold text-[#0F172A] mb-2">
            Etiquetas
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Añadir etiqueta..."
              className="flex-1 h-12 px-4 py-3 border border-[#E2E8F0] rounded-xl focus:ring-2 focus:ring-[#6366F1] focus:border-transparent transition-all duration-200 ease-out"
            />
            <button className="px-4 py-3 bg-[#F8FAFC] text-[#0F172A] border border-[#E2E8F0] rounded-xl hover:bg-[#F1F5F9] transition-all duration-200 ease-out">
              <Plus className="w-4 h-4" />
            </button>
          </div>
          <div className="flex flex-wrap gap-2 mt-3">
            <span className="px-3 py-1 bg-[#EEF2FF] text-[#6366F1] rounded-full text-sm font-medium flex items-center gap-1">
              Alta en Proteína
              <X className="w-3 h-3 cursor-pointer" />
            </span>
            <span className="px-3 py-1 bg-[#EEF2FF] text-[#6366F1] rounded-full text-sm font-medium flex items-center gap-1">
              Sin Lactosa
              <X className="w-3 h-3 cursor-pointer" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

