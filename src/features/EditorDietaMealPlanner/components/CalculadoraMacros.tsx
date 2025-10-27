import { useState } from 'react';
import { Calculator } from 'lucide-react';

interface ResultadosMacros {
  calorias: number;
  proteinas: number;
  carbohidratos: number;
  grasas: number;
}

export default function CalculadoraMacros() {
  const [peso, setPeso] = useState('');
  const [altura, setAltura] = useState('');
  const [edad, setEdad] = useState('');
  const [sexo, setSexo] = useState('hombre');
  const [actividadFisica, setActividadFisica] = useState('moderada');
  const [objetivo, setObjetivo] = useState('mantenimiento');
  const [resultados, setResultados] = useState<ResultadosMacros | null>(null);

  const calcularMacros = () => {
    const pesoNum = parseFloat(peso);
    const alturaNum = parseFloat(altura);
    const edadNum = parseInt(edad);

    if (!pesoNum || !alturaNum || !edadNum) return;

    // Fórmula de Harris-Benedict
    let tmb = 0;
    if (sexo === 'hombre') {
      tmb = 88.362 + (13.397 * pesoNum) + (4.799 * alturaNum) - (5.677 * edadNum);
    } else {
      tmb = 447.593 + (9.247 * pesoNum) + (3.098 * alturaNum) - (4.330 * edadNum);
    }

    // Factor de actividad
    const factoresActividad: Record<string, number> = {
      sedentaria: 1.2,
      ligera: 1.375,
      moderada: 1.55,
      intensa: 1.725,
      muyIntensa: 1.9
    };

    const calorias = tmb * factoresActividad[actividadFisica];

    // Ajustar según objetivo
    let caloriasFinales = calorias;
    if (objetivo === 'perdida-peso') {
      caloriasFinales = calorias * 0.85; // -15%
    } else if (objetivo === 'ganancia-muscular') {
      caloriasFinales = calorias * 1.15; // +15%
    }

    // Distribución de macros
    const proteinas = pesoNum * 2.2; // 2.2g por kg de peso
    const grasas = caloriasFinales * 0.25 / 9; // 25% de calorías de grasas
    const carbohidratos = (caloriasFinales - (proteinas * 4) - (grasas * 9)) / 4;

    setResultados({
      calorias: Math.round(caloriasFinales),
      proteinas: Math.round(proteinas),
      carbohidratos: Math.round(carbohidratos),
      grasas: Math.round(grasas)
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-md border border-[#E2E8F0] p-6 space-y-6">
      <div className="flex items-center gap-3">
        <div className="bg-[#6366F1] p-2 rounded-lg">
          <Calculator className="w-5 h-5 text-white" />
        </div>
        <h2 className="text-xl font-bold text-[#0F172A]">Calculadora de Macros</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-[#0F172A] mb-2">
            Peso (kg)
          </label>
          <input
            type="number"
            value={peso}
            onChange={(e) => setPeso(e.target.value)}
            className="w-full h-12 px-4 py-3 border border-[#E2E8F0] rounded-xl focus:ring-2 focus:ring-[#6366F1] focus:border-transparent transition-all duration-200 ease-out"
            placeholder="70"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-[#0F172A] mb-2">
            Altura (cm)
          </label>
          <input
            type="number"
            value={altura}
            onChange={(e) => setAltura(e.target.value)}
            className="w-full h-12 px-4 py-3 border border-[#E2E8F0] rounded-xl focus:ring-2 focus:ring-[#6366F1] focus:border-transparent transition-all duration-200 ease-out"
            placeholder="175"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-[#0F172A] mb-2">
            Edad (años)
          </label>
          <input
            type="number"
            value={edad}
            onChange={(e) => setEdad(e.target.value)}
            className="w-full h-12 px-4 py-3 border border-[#E2E8F0] rounded-xl focus:ring-2 focus:ring-[#6366F1] focus:border-transparent transition-all duration-200 ease-out"
            placeholder="30"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-[#0F172A] mb-2">
            Sexo
          </label>
          <select
            value={sexo}
            onChange={(e) => setSexo(e.target.value)}
            className="w-full h-12 px-4 py-3 border border-[#E2E8F0] rounded-xl focus:ring-2 focus:ring-[#6366F1] focus:border-transparent transition-all duration-200 ease-out"
          >
            <option value="hombre">Hombre</option>
            <option value="mujer">Mujer</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-[#0F172A] mb-2">
            Nivel de Actividad Física
          </label>
          <select
            value={actividadFisica}
            onChange={(e) => setActividadFisica(e.target.value)}
            className="w-full h-12 px-4 py-3 border border-[#E2E8F0] rounded-xl focus:ring-2 focus:ring-[#6366F1] focus:border-transparent transition-all duration-200 ease-out"
          >
            <option value="sedentaria">Sedentaria (poco o ningún ejercicio)</option>
            <option value="ligera">Ligera (1-3 días/semana)</option>
            <option value="moderada">Moderada (3-5 días/semana)</option>
            <option value="intensa">Intensa (6-7 días/semana)</option>
            <option value="muyIntensa">Muy Intensa (2 veces al día)</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-[#0F172A] mb-2">
            Objetivo
          </label>
          <select
            value={objetivo}
            onChange={(e) => setObjetivo(e.target.value)}
            className="w-full h-12 px-4 py-3 border border-[#E2E8F0] rounded-xl focus:ring-2 focus:ring-[#6366F1] focus:border-transparent transition-all duration-200 ease-out"
          >
            <option value="perdida-peso">Pérdida de Peso (-15%)</option>
            <option value="mantenimiento">Mantenimiento</option>
            <option value="ganancia-muscular">Ganancia Muscular (+15%)</option>
          </select>
        </div>
      </div>

      <button
        onClick={calcularMacros}
        className="w-full bg-[#6366F1] hover:bg-[#4F46E5] active:bg-[#4338CA] text-white font-semibold py-3 rounded-xl transition-all duration-200 ease-out shadow-md hover:shadow-lg"
      >
        Calcular Macros
      </button>

      {resultados && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-[#E2E8F0]">
          <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-4">
            <div className="text-sm font-semibold text-[#94A3B8] mb-1">Calorías Diarias</div>
            <div className="text-2xl font-bold text-[#0F172A]">{resultados.calorias}</div>
            <div className="text-xs text-[#94A3B8]">kcal</div>
          </div>
          <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-4">
            <div className="text-sm font-semibold text-[#94A3B8] mb-1">Proteínas</div>
            <div className="text-2xl font-bold text-blue-600">{resultados.proteinas}g</div>
            <div className="text-xs text-[#94A3B8]">{((resultados.proteinas * 4 / resultados.calorias) * 100).toFixed(0)}%</div>
          </div>
          <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-4">
            <div className="text-sm font-semibold text-[#94A3B8] mb-1">Carbohidratos</div>
            <div className="text-2xl font-bold text-amber-600">{resultados.carbohidratos}g</div>
            <div className="text-xs text-[#94A3B8]">{((resultados.carbohidratos * 4 / resultados.calorias) * 100).toFixed(0)}%</div>
          </div>
          <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-4">
            <div className="text-sm font-semibold text-[#94A3B8] mb-1">Grasas</div>
            <div className="text-2xl font-bold text-red-600">{resultados.grasas}g</div>
            <div className="text-xs text-[#94A3B8]">{((resultados.grasas * 9 / resultados.calorias) * 100).toFixed(0)}%</div>
          </div>
        </div>
      )}
    </div>
  );
}

