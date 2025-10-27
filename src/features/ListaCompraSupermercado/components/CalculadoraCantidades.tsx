import { Calculator, Users, TrendingUp } from 'lucide-react';

export default function CalculadoraCantidades() {
  return (
    <div className="bg-white rounded-2xl border border-[#E2E8F0] overflow-hidden shadow-md">
      {/* Header */}
      <div className="bg-[#F8FAFC] px-6 py-4 border-b border-[#E2E8F0]">
        <div className="flex items-center gap-3">
          <div className="bg-[#DBEAFE] p-2 rounded-lg">
            <Calculator className="w-5 h-5 text-[#3B82F6]" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-[#0F172A]">Calculadora de Cantidades</h2>
            <p className="text-sm text-[#64748B]">
              Cálculo automático basado en porciones y número de personas
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Personas */}
          <div className="bg-[#DBEAFE] border border-[#BFDBFE] rounded-xl p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-white p-2 rounded-lg">
                <Users className="w-5 h-5 text-[#3B82F6]" />
              </div>
              <div className="text-lg font-semibold text-[#0F172A]">Personas</div>
            </div>
            <div className="text-3xl font-bold text-[#3B82F6] mb-1">1</div>
            <div className="text-sm text-[#64748B]">Número de personas en el hogar</div>
          </div>

          {/* Porciones Semanales */}
          <div className="bg-[#D1FAE5] border border-[#A7F3D0] rounded-xl p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-white p-2 rounded-lg">
                <TrendingUp className="w-5 h-5 text-[#10B981]" />
              </div>
              <div className="text-lg font-semibold text-[#0F172A]">Porciones</div>
            </div>
            <div className="text-3xl font-bold text-[#10B981] mb-1">21</div>
            <div className="text-sm text-[#64748B]">Comidas para la semana (3/día)</div>
          </div>

          {/* Factor Multiplicador */}
          <div className="bg-[#EEF2FF] border border-[#E0E7FF] rounded-xl p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-white p-2 rounded-lg">
                <Calculator className="w-5 h-5 text-[#6366F1]" />
              </div>
              <div className="text-lg font-semibold text-[#0F172A]">Ajuste</div>
            </div>
            <div className="text-3xl font-bold text-[#6366F1] mb-1">×1.0</div>
            <div className="text-sm text-[#64748B]">Factor de multiplicación</div>
          </div>
        </div>

        {/* Info */}
        <div className="mt-6 bg-[#DBEAFE] border border-[#BFDBFE] rounded-xl p-4">
          <p className="text-sm text-[#3B82F6] font-medium mb-2">
            💡 Las cantidades se calculan automáticamente según:
          </p>
          <ul className="space-y-1 text-sm text-[#0F172A] ml-6">
            <li>• Número de personas en el hogar del cliente</li>
            <li>• Porciones necesarias según el plan nutricional</li>
            <li>• Ingredientes de las recetas asignadas</li>
            <li>• Ajustes personalizados del entrenador</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

