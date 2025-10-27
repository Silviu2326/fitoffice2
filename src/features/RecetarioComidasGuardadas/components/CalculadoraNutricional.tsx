import { useState } from 'react';
import { Calculator, Plus, Minus } from 'lucide-react';

export default function CalculadoraNutricional() {
  const [porciones, setPorciones] = useState(1);
  const [valorBase] = useState({
    calorias: 450,
    proteinas: 25,
    carbohidratos: 40,
    grasas: 15,
    fibra: 8,
  });

  const calcularValor = (base: number) => Math.round(base * porciones);

  return (
    <div className="bg-white rounded-2xl shadow-md border border-[#E2E8F0] p-6 space-y-6">
      <div className="flex items-center gap-3">
        <Calculator className="w-6 h-6 text-[#6366F1]" />
        <h3 className="text-xl font-bold text-[#0F172A]">Calculadora Nutricional</h3>
      </div>

      <div className="flex items-center justify-between bg-[#F8FAFC] rounded-xl p-4">
        <span className="text-[#0F172A] font-semibold">Número de porciones:</span>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setPorciones(Math.max(1, porciones - 1))}
            className="bg-white border border-[#E2E8F0] p-2 rounded-lg hover:bg-[#F8FAFC] hover:border-[#6366F1] transition-all duration-200 ease-out"
          >
            <Minus className="w-4 h-4 text-[#0F172A]" />
          </button>
          <span className="text-2xl font-bold text-[#0F172A] w-12 text-center">
            {porciones}
          </span>
          <button
            onClick={() => setPorciones(porciones + 1)}
            className="bg-white border border-[#E2E8F0] p-2 rounded-lg hover:bg-[#F8FAFC] hover:border-[#6366F1] transition-all duration-200 ease-out"
          >
            <Plus className="w-4 h-4 text-[#0F172A]" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="bg-gradient-to-br from-[#EEF2FF] to-[#E0E7FF] rounded-xl p-4 text-center shadow-sm">
          <p className="text-sm text-[#64748B] mb-1">Calorías</p>
          <p className="text-3xl font-bold text-[#6366F1]">{calcularValor(valorBase.calorias)}</p>
          <p className="text-xs text-[#94A3B8] mt-1">kcal</p>
        </div>
        <div className="bg-gradient-to-br from-[#DBEAFE] to-[#BFDBFE] rounded-xl p-4 text-center shadow-sm">
          <p className="text-sm text-[#64748B] mb-1">Proteínas</p>
          <p className="text-3xl font-bold text-[#3B82F6]">{calcularValor(valorBase.proteinas)}</p>
          <p className="text-xs text-[#94A3B8] mt-1">gramos</p>
        </div>
        <div className="bg-gradient-to-br from-[#D1FAE5] to-[#A7F3D0] rounded-xl p-4 text-center shadow-sm">
          <p className="text-sm text-[#64748B] mb-1">Carbohidratos</p>
          <p className="text-3xl font-bold text-[#10B981]">{calcularValor(valorBase.carbohidratos)}</p>
          <p className="text-xs text-[#94A3B8] mt-1">gramos</p>
        </div>
        <div className="bg-gradient-to-br from-[#FEF3C7] to-[#FDE68A] rounded-xl p-4 text-center shadow-sm">
          <p className="text-sm text-[#64748B] mb-1">Grasas</p>
          <p className="text-3xl font-bold text-[#F59E0B]">{calcularValor(valorBase.grasas)}</p>
          <p className="text-xs text-[#94A3B8] mt-1">gramos</p>
        </div>
        <div className="bg-gradient-to-br from-[#D1FAE5] to-[#A7F3D0] rounded-xl p-4 text-center shadow-sm">
          <p className="text-sm text-[#64748B] mb-1">Fibra</p>
          <p className="text-3xl font-bold text-[#10B981]">{calcularValor(valorBase.fibra)}</p>
          <p className="text-xs text-[#94A3B8] mt-1">gramos</p>
        </div>
      </div>

      <div className="bg-[#DBEAFE] border border-[#93C5FD] rounded-xl p-4">
        <p className="text-sm text-[#1E40AF]">
          <strong>Nota:</strong> Los valores nutricionales son aproximados y pueden variar según
          los ingredientes específicos utilizados.
        </p>
      </div>
    </div>
  );
}


