import { Plus, X, Filter } from 'lucide-react';
import { useState } from 'react';

interface Rule {
  id: string;
  field: string;
  operator: string;
  value: string;
}

export default function SegmentBuilder() {
  const [rules, setRules] = useState<Rule[]>([
    { id: '1', field: 'edad', operator: 'entre', value: '30-45' }
  ]);

  const fields = [
    { value: 'edad', label: 'Edad' },
    { value: 'genero', label: 'Género' },
    { value: 'suscripcion', label: 'Tipo de Suscripción' },
    { value: 'asistencia', label: 'Asistencia (%)' },
    { value: 'antiguedad', label: 'Antigüedad (meses)' },
    { value: 'gasto', label: 'Gasto Total' },
    { value: 'ultimo_acceso', label: 'Último Acceso' }
  ];

  const operators = [
    { value: 'igual', label: 'Igual a' },
    { value: 'diferente', label: 'Diferente de' },
    { value: 'mayor', label: 'Mayor que' },
    { value: 'menor', label: 'Menor que' },
    { value: 'entre', label: 'Entre' },
    { value: 'contiene', label: 'Contiene' }
  ];

  const addRule = () => {
    setRules([
      ...rules,
      { id: Date.now().toString(), field: 'edad', operator: 'igual', value: '' }
    ]);
  };

  const removeRule = (id: string) => {
    setRules(rules.filter(rule => rule.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-[24px] leading-8 font-semibold text-[#0F172A] flex items-center gap-2">
            <Filter className="w-6 h-6 text-[#6366F1]" />
            Constructor de Segmentos
          </h2>
          <p className="text-[#64748B] mt-1 text-[14px] leading-5">
            Crea reglas de segmentación complejas con criterios personalizados
          </p>
        </div>
      </div>

      <div className="bg-[#FFFFFF] rounded-2xl p-6 border border-[#E2E8F0] shadow-md">
        <div className="space-y-4">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-[18px] leading-7 font-semibold text-[#0F172A]">Reglas de Segmentación</h3>
            <button
              onClick={addRule}
              className="inline-flex items-center justify-center px-6 py-3 bg-[#6366F1] hover:bg-[#4F46E5] text-white rounded-xl transition-all duration-200 shadow-md hover:shadow-lg gap-2 font-semibold focus:outline-none focus:ring-2 focus:ring-[#6366F1] focus:ring-offset-2"
            >
              <Plus className="w-5 h-5" />
              Agregar Regla
            </button>
          </div>

          {rules.map((rule, index) => (
            <div key={rule.id} className="space-y-4">
              {index > 0 && (
                <div className="flex items-center gap-2">
                  <div className="h-px bg-[#E2E8F0] flex-1"></div>
                  <span className="px-3 py-1 bg-[#F1F5F9] text-[#64748B] rounded-lg text-[14px] leading-5 font-medium">
                    Y
                  </span>
                  <div className="h-px bg-[#E2E8F0] flex-1"></div>
                </div>
              )}

              <div className="flex items-center gap-4">
                <select
                  value={rule.field}
                  className="flex-1 bg-[#FFFFFF] border border-[#E2E8F0] rounded-xl px-4 py-3 text-[#0F172A] text-[16px] leading-6 focus:border-[#6366F1] focus:outline-none focus:ring-2 focus:ring-[#6366F1] focus:ring-offset-0 transition-all duration-200"
                >
                  {fields.map(field => (
                    <option key={field.value} value={field.value}>
                      {field.label}
                    </option>
                  ))}
                </select>

                <select
                  value={rule.operator}
                  className="flex-1 bg-[#FFFFFF] border border-[#E2E8F0] rounded-xl px-4 py-3 text-[#0F172A] text-[16px] leading-6 focus:border-[#6366F1] focus:outline-none focus:ring-2 focus:ring-[#6366F1] focus:ring-offset-0 transition-all duration-200"
                >
                  {operators.map(op => (
                    <option key={op.value} value={op.value}>
                      {op.label}
                    </option>
                  ))}
                </select>

                <input
                  type="text"
                  value={rule.value}
                  placeholder="Valor"
                  className="flex-1 bg-[#FFFFFF] border border-[#E2E8F0] rounded-xl px-4 py-3 text-[#0F172A] text-[16px] leading-6 placeholder-[#94A3B8] focus:border-[#6366F1] focus:outline-none focus:ring-2 focus:ring-[#6366F1] focus:ring-offset-0 transition-all duration-200"
                />

                <button
                  onClick={() => removeRule(rule.id)}
                  className="p-2 text-[#EF4444] hover:bg-[#FEE2E2] rounded-lg transition-colors duration-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-6 border-t border-[#E2E8F0]">
          <div className="flex items-center justify-between">
            <div className="text-[#0F172A]">
              <span className="text-[14px] leading-5 text-[#64748B]">Estimación de clientes que coinciden:</span>
              <span className="ml-2 text-[24px] leading-8 font-bold text-[#6366F1]">23</span>
            </div>
            <button className="inline-flex items-center justify-center px-6 py-3 bg-[#6366F1] hover:bg-[#4F46E5] text-white rounded-xl transition-all duration-200 shadow-md hover:shadow-lg font-semibold focus:outline-none focus:ring-2 focus:ring-[#6366F1] focus:ring-offset-2">
              Guardar Segmento
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

