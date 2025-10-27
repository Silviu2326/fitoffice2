import { useState } from 'react';
import { Save, Plus, Trash2 } from 'lucide-react';

interface Comida {
  id: string;
  nombre: string;
  horario: string;
  alimentos: Alimento[];
}

interface Alimento {
  id: string;
  nombre: string;
  cantidad: number;
  unidad: string;
  proteinas: number;
  carbohidratos: number;
  grasas: number;
  calorias: number;
}

interface EditorDietaProps {
  onSave?: (dieta: any) => void;
}

export default function EditorDieta({ onSave }: EditorDietaProps) {
  const [nombreDieta, setNombreDieta] = useState('');
  const [objetivo, setObjetivo] = useState('');
  const [comidas, setComidas] = useState<Comida[]>([]);

  const agregarComida = () => {
    const nuevaComida: Comida = {
      id: Date.now().toString(),
      nombre: `Comida ${comidas.length + 1}`,
      horario: '12:00',
      alimentos: []
    };
    setComidas([...comidas, nuevaComida]);
  };

  const eliminarComida = (id: string) => {
    setComidas(comidas.filter(c => c.id !== id));
  };

  const calcularTotales = () => {
    let totalProteinas = 0;
    let totalCarbohidratos = 0;
    let totalGrasas = 0;
    let totalCalorias = 0;

    comidas.forEach(comida => {
      comida.alimentos.forEach(alimento => {
        totalProteinas += alimento.proteinas;
        totalCarbohidratos += alimento.carbohidratos;
        totalGrasas += alimento.grasas;
        totalCalorias += alimento.calorias;
      });
    });

    return {
      proteinas: totalProteinas,
      carbohidratos: totalCarbohidratos,
      grasas: totalGrasas,
      calorias: totalCalorias
    };
  };

  const totales = calcularTotales();

  const handleGuardar = () => {
    const dieta = {
      nombre: nombreDieta,
      objetivo,
      comidas,
      totales
    };
    onSave?.(dieta);
  };

  return (
    <div className="bg-white rounded-xl shadow-md border border-[#E2E8F0] p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-[#0F172A]">Editor de Dieta</h2>
        <button
          onClick={handleGuardar}
          className="flex items-center gap-2 bg-[#6366F1] hover:bg-[#4F46E5] active:bg-[#4338CA] text-white px-6 py-3 rounded-xl transition-all duration-200 ease-out font-semibold shadow-md hover:shadow-lg"
        >
          <Save className="w-4 h-4" />
          Guardar Dieta
        </button>
      </div>

      {/* Información básica */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-[#0F172A] mb-2">
            Nombre de la Dieta
          </label>
          <input
            type="text"
            value={nombreDieta}
            onChange={(e) => setNombreDieta(e.target.value)}
            className="w-full h-12 px-4 py-3 border border-[#E2E8F0] rounded-xl focus:ring-2 focus:ring-[#6366F1] focus:border-transparent transition-all duration-200 ease-out"
            placeholder="Ej: Plan de Definición"
          />
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
            <option value="">Seleccionar objetivo</option>
            <option value="perdida-peso">Pérdida de Peso</option>
            <option value="ganancia-muscular">Ganancia Muscular</option>
            <option value="mantenimiento">Mantenimiento</option>
            <option value="definicion">Definición</option>
          </select>
        </div>
      </div>

      {/* Resumen de Macros */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-4">
          <div className="text-sm font-semibold text-[#94A3B8]">Calorías</div>
          <div className="text-2xl font-bold text-[#0F172A]">{totales.calorias.toFixed(0)}</div>
          <div className="text-xs text-[#94A3B8]">kcal</div>
        </div>
        <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-4">
          <div className="text-sm font-semibold text-[#94A3B8]">Proteínas</div>
          <div className="text-2xl font-bold text-blue-600">{totales.proteinas.toFixed(1)}</div>
          <div className="text-xs text-[#94A3B8]">gramos</div>
        </div>
        <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-4">
          <div className="text-sm font-semibold text-[#94A3B8]">Carbohidratos</div>
          <div className="text-2xl font-bold text-amber-600">{totales.carbohidratos.toFixed(1)}</div>
          <div className="text-xs text-[#94A3B8]">gramos</div>
        </div>
        <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-4">
          <div className="text-sm font-semibold text-[#94A3B8]">Grasas</div>
          <div className="text-2xl font-bold text-red-600">{totales.grasas.toFixed(1)}</div>
          <div className="text-xs text-[#94A3B8]">gramos</div>
        </div>
      </div>

      {/* Lista de Comidas */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-[#0F172A]">Comidas del Día</h3>
          <button
            onClick={agregarComida}
            className="flex items-center gap-2 bg-[#F8FAFC] hover:bg-[#F1F5F9] text-[#0F172A] border border-[#E2E8F0] px-4 py-2 rounded-xl transition-all duration-200 ease-out font-semibold"
          >
            <Plus className="w-4 h-4" />
            Agregar Comida
          </button>
        </div>

        {comidas.length === 0 ? (
          <div className="text-center py-12 text-[#94A3B8]">
            No hay comidas agregadas. Haz clic en "Agregar Comida" para empezar.
          </div>
        ) : (
          <div className="space-y-3">
            {comidas.map((comida) => (
              <div key={comida.id} className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 flex-1">
                    <input
                      type="text"
                      value={comida.nombre}
                      onChange={(e) => {
                        const nuevasComidas = comidas.map(c =>
                          c.id === comida.id ? { ...c, nombre: e.target.value } : c
                        );
                        setComidas(nuevasComidas);
                      }}
                      className="h-10 px-3 py-2 border border-[#E2E8F0] rounded-xl focus:ring-2 focus:ring-[#6366F1] focus:border-transparent transition-all duration-200 ease-out"
                    />
                    <input
                      type="time"
                      value={comida.horario}
                      onChange={(e) => {
                        const nuevasComidas = comidas.map(c =>
                          c.id === comida.id ? { ...c, horario: e.target.value } : c
                        );
                        setComidas(nuevasComidas);
                      }}
                      className="h-10 px-3 py-2 border border-[#E2E8F0] rounded-xl focus:ring-2 focus:ring-[#6366F1] focus:border-transparent transition-all duration-200 ease-out"
                    />
                    <span className="text-sm text-[#94A3B8] font-medium">
                      {comida.alimentos.length} alimentos
                    </span>
                  </div>
                  <button
                    onClick={() => eliminarComida(comida.id)}
                    className="text-[#EF4444] hover:bg-[#FEE2E2] p-2 rounded-xl transition-all duration-200 ease-out"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

