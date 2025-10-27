import { UserPlus, Search } from 'lucide-react';
import { useState } from 'react';

export default function AsignacionDieta() {
  const [tipoDieta, setTipoDieta] = useState<'individual' | 'plan-estandar'>('individual');

  return (
    <div className="bg-[#1E1E2E] rounded-2xl p-6 border border-[#334155] shadow-md">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-[#EEF2FF] p-3 rounded-xl">
          <UserPlus className="w-6 h-6 text-[#6366F1]" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-[#F1F5F9]">Asignar Nueva Dieta</h2>
          <p className="text-sm text-[#94A3B8]">Crea y asigna dietas personalizadas o planes estándar</p>
        </div>
      </div>

      {/* Selector de tipo de dieta */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-[#F1F5F9] mb-3">Tipo de Dieta</label>
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => setTipoDieta('individual')}
            className={`p-5 rounded-xl border-2 transition-all duration-200 ${
              tipoDieta === 'individual'
                ? 'border-[#6366F1] bg-[#EEF2FF]'
                : 'border-[#334155] bg-[#0F0F23] hover:border-[#475569]'
            }`}
          >
            <p className={`font-semibold mb-1 ${tipoDieta === 'individual' ? 'text-[#6366F1]' : 'text-[#F1F5F9]'}`}>Dieta Individual</p>
            <p className={`text-xs ${tipoDieta === 'individual' ? 'text-[#6366F1]' : 'text-[#94A3B8]'}`}>Para entrenadores personales</p>
            <p className={`text-xs ${tipoDieta === 'individual' ? 'text-[#6366F1]' : 'text-[#94A3B8]'}`}>Macros personalizados por cliente</p>
          </button>
          <button
            onClick={() => setTipoDieta('plan-estandar')}
            className={`p-5 rounded-xl border-2 transition-all duration-200 ${
              tipoDieta === 'plan-estandar'
                ? 'border-[#6366F1] bg-[#EEF2FF]'
                : 'border-[#334155] bg-[#0F0F23] hover:border-[#475569]'
            }`}
          >
            <p className={`font-semibold mb-1 ${tipoDieta === 'plan-estandar' ? 'text-[#6366F1]' : 'text-[#F1F5F9]'}`}>Plan Estándar</p>
            <p className={`text-xs ${tipoDieta === 'plan-estandar' ? 'text-[#6366F1]' : 'text-[#94A3B8]'}`}>Para gimnasios y centros</p>
            <p className={`text-xs ${tipoDieta === 'plan-estandar' ? 'text-[#6366F1]' : 'text-[#94A3B8]'}`}>Packs semanales estructurados</p>
          </button>
        </div>
      </div>

      {/* Selección de cliente */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-[#F1F5F9] mb-2">Cliente</label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#64748B]" />
          <input
            type="text"
            placeholder="Buscar cliente..."
            className="w-full bg-[#0F0F23] border border-[#334155] rounded-xl pl-10 pr-4 py-3 text-[#F1F5F9] placeholder-[#64748B] focus:outline-none focus:border-[#6366F1] focus:ring-2 focus:ring-[#6366F1]/20 transition-all duration-200"
          />
        </div>
      </div>

      {tipoDieta === 'individual' ? (
        <>
          {/* Formulario para dieta individual */}
          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-sm font-semibold text-[#F1F5F9] mb-2">Objetivo</label>
              <select className="w-full bg-[#0F0F23] border border-[#334155] rounded-xl px-4 py-3 text-[#F1F5F9] focus:outline-none focus:border-[#6366F1] focus:ring-2 focus:ring-[#6366F1]/20 transition-all duration-200">
                <option>Pérdida de grasa</option>
                <option>Ganancia muscular</option>
                <option>Mantenimiento</option>
                <option>Recomposición corporal</option>
              </select>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-semibold text-[#F1F5F9] mb-2">Proteínas (g)</label>
                <input
                  type="number"
                  placeholder="140"
                  className="w-full bg-[#0F0F23] border border-[#334155] rounded-xl px-4 py-3 text-[#F1F5F9] placeholder-[#64748B] focus:outline-none focus:border-[#6366F1] focus:ring-2 focus:ring-[#6366F1]/20 transition-all duration-200"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#F1F5F9] mb-2">Carbohidratos (g)</label>
                <input
                  type="number"
                  placeholder="180"
                  className="w-full bg-[#0F0F23] border border-[#334155] rounded-xl px-4 py-3 text-[#F1F5F9] placeholder-[#64748B] focus:outline-none focus:border-[#6366F1] focus:ring-2 focus:ring-[#6366F1]/20 transition-all duration-200"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#F1F5F9] mb-2">Grasas (g)</label>
                <input
                  type="number"
                  placeholder="60"
                  className="w-full bg-[#0F0F23] border border-[#334155] rounded-xl px-4 py-3 text-[#F1F5F9] placeholder-[#64748B] focus:outline-none focus:border-[#6366F1] focus:ring-2 focus:ring-[#6366F1]/20 transition-all duration-200"
                />
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          {/* Formulario para plan estándar */}
          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-sm font-semibold text-[#F1F5F9] mb-2">Plan Estándar</label>
              <select className="w-full bg-[#0F0F23] border border-[#334155] rounded-xl px-4 py-3 text-[#F1F5F9] focus:outline-none focus:border-[#6366F1] focus:ring-2 focus:ring-[#6366F1]/20 transition-all duration-200">
                <option>Plan pérdida grasa nivel 1</option>
                <option>Plan pérdida grasa nivel 2</option>
                <option>Plan ganancia muscular nivel 1</option>
                <option>Plan mantenimiento saludable</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#F1F5F9] mb-2">Duración (semanas)</label>
              <input
                type="number"
                placeholder="4"
                className="w-full bg-[#0F0F23] border border-[#334155] rounded-xl px-4 py-3 text-[#F1F5F9] placeholder-[#64748B] focus:outline-none focus:border-[#6366F1] focus:ring-2 focus:ring-[#6366F1]/20 transition-all duration-200"
              />
            </div>
          </div>
        </>
      )}

      {/* Botones de acción */}
      <div className="flex gap-3">
        <button className="flex-1 px-6 py-3 bg-[#6366F1] hover:bg-[#4F46E5] active:bg-[#4338CA] text-white rounded-xl font-semibold transition-all duration-200 shadow-md hover:shadow-lg">
          Asignar Dieta
        </button>
        <button className="px-6 py-3 bg-[#F8FAFC] hover:bg-[#F1F5F9] text-[#0F172A] border border-[#E2E8F0] rounded-xl font-semibold transition-all duration-200">
          Cancelar
        </button>
      </div>
    </div>
  );
}

