import { useState } from 'react';
import { Plus, X, ChefHat } from 'lucide-react';
import { createReceta, Ingrediente } from '../api/recetas';

interface CreadorRecetaProps {
  onRecetaCreada?: () => void;
}

export default function CreadorReceta({ onRecetaCreada }: CreadorRecetaProps) {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    categoria: 'comida' as const,
    tiempo_preparacion: 30,
    dificultad: 'media' as const,
    porciones: 2,
    tags: [] as string[],
  });

  const [ingredientes, setIngredientes] = useState<Ingrediente[]>([
    { nombre: '', cantidad: 0, unidad: 'g' }
  ]);

  const [instrucciones, setInstrucciones] = useState<string[]>(['']);
  const [valorNutricional, setValorNutricional] = useState({
    calorias: 0,
    proteinas: 0,
    carbohidratos: 0,
    grasas: 0,
    fibra: 0,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createReceta({
        ...formData,
        ingredientes: ingredientes.filter(i => i.nombre && i.cantidad),
        instrucciones: instrucciones.filter(i => i.trim()),
        valor_nutricional: valorNutricional,
        favorito: false,
      });
      setShowForm(false);
      onRecetaCreada?.();
      // Reset form
      setFormData({
        nombre: '',
        descripcion: '',
        categoria: 'comida',
        tiempo_preparacion: 30,
        dificultad: 'media',
        porciones: 2,
        tags: [],
      });
      setIngredientes([{ nombre: '', cantidad: 0, unidad: 'g' }]);
      setInstrucciones(['']);
      setValorNutricional({ calorias: 0, proteinas: 0, carbohidratos: 0, grasas: 0, fibra: 0 });
    } catch (error) {
      console.error('Error al crear receta:', error);
    }
  };

  const addIngrediente = () => {
    setIngredientes([...ingredientes, { nombre: '', cantidad: 0, unidad: 'g' }]);
  };

  const removeIngrediente = (index: number) => {
    setIngredientes(ingredientes.filter((_, i) => i !== index));
  };

  const updateIngrediente = (index: number, field: keyof Ingrediente, value: any) => {
    const updated = [...ingredientes];
    updated[index] = { ...updated[index], [field]: value };
    setIngredientes(updated);
  };

  const addInstruccion = () => {
    setInstrucciones([...instrucciones, '']);
  };

  const removeInstruccion = (index: number) => {
    setInstrucciones(instrucciones.filter((_, i) => i !== index));
  };

  const updateInstruccion = (index: number, value: string) => {
    const updated = [...instrucciones];
    updated[index] = value;
    setInstrucciones(updated);
  };

  if (!showForm) {
    return (
      <div className="text-center py-12">
        <button
          onClick={() => setShowForm(true)}
          className="inline-flex items-center gap-2 bg-[#6366F1] text-white px-6 py-3 rounded-xl hover:bg-[#4F46E5] active:bg-[#4338CA] transition-all duration-200 ease-out font-semibold shadow-md hover:shadow-lg"
        >
          <Plus className="w-5 h-5" />
          Crear Nueva Receta
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-md border border-[#E2E8F0] p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <ChefHat className="w-6 h-6 text-[#6366F1]" />
          <h3 className="text-xl font-bold text-[#0F172A]">Nueva Receta</h3>
        </div>
        <button
          onClick={() => setShowForm(false)}
          className="text-[#94A3B8] hover:text-[#0F172A] transition-colors duration-200 ease-out"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-[#0F172A] mb-2">Nombre de la Receta</label>
            <input
              type="text"
              required
              value={formData.nombre}
              onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
              className="w-full h-12 px-4 py-3 border border-[#E2E8F0] rounded-xl focus:ring-2 focus:ring-[#6366F1] focus:border-transparent transition-all duration-200 ease-out"
              placeholder="Ej: Pollo al horno con vegetales"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-[#0F172A] mb-2">Descripción</label>
            <textarea
              required
              value={formData.descripcion}
              onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
              className="w-full px-4 py-3 border border-[#E2E8F0] rounded-xl focus:ring-2 focus:ring-[#6366F1] focus:border-transparent transition-all duration-200 ease-out"
              rows={2}
              placeholder="Breve descripción de la receta"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#0F172A] mb-2">Categoría</label>
            <select
              value={formData.categoria}
              onChange={(e) => setFormData({ ...formData, categoria: e.target.value as any })}
              className="w-full h-12 px-4 py-3 border border-[#E2E8F0] rounded-xl focus:ring-2 focus:ring-[#6366F1] focus:border-transparent transition-all duration-200 ease-out"
            >
              <option value="desayuno">🌅 Desayuno</option>
              <option value="almuerzo">☕ Almuerzo</option>
              <option value="comida">🍽️ Comida</option>
              <option value="merienda">🍪 Merienda</option>
              <option value="cena">🌙 Cena</option>
              <option value="snack">🥜 Snack</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#0F172A] mb-2">Dificultad</label>
            <select
              value={formData.dificultad}
              onChange={(e) => setFormData({ ...formData, dificultad: e.target.value as any })}
              className="w-full h-12 px-4 py-3 border border-[#E2E8F0] rounded-xl focus:ring-2 focus:ring-[#6366F1] focus:border-transparent transition-all duration-200 ease-out"
            >
              <option value="facil">Fácil</option>
              <option value="media">Media</option>
              <option value="dificil">Difícil</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#0F172A] mb-2">Tiempo (minutos)</label>
            <input
              type="number"
              required
              min="1"
              value={formData.tiempo_preparacion}
              onChange={(e) => setFormData({ ...formData, tiempo_preparacion: parseInt(e.target.value) })}
              className="w-full h-12 px-4 py-3 border border-[#E2E8F0] rounded-xl focus:ring-2 focus:ring-[#6366F1] focus:border-transparent transition-all duration-200 ease-out"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#0F172A] mb-2">Porciones</label>
            <input
              type="number"
              required
              min="1"
              value={formData.porciones}
              onChange={(e) => setFormData({ ...formData, porciones: parseInt(e.target.value) })}
              className="w-full h-12 px-4 py-3 border border-[#E2E8F0] rounded-xl focus:ring-2 focus:ring-[#6366F1] focus:border-transparent transition-all duration-200 ease-out"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-[#0F172A] mb-2">Ingredientes</label>
          <div className="space-y-2">
            {ingredientes.map((ing, index) => (
              <div key={index} className="flex gap-2">
                <input
                  type="text"
                  value={ing.nombre}
                  onChange={(e) => updateIngrediente(index, 'nombre', e.target.value)}
                  className="flex-1 h-12 px-4 py-3 border border-[#E2E8F0] rounded-xl focus:ring-2 focus:ring-[#6366F1] transition-all duration-200 ease-out"
                  placeholder="Nombre del ingrediente"
                />
                <input
                  type="number"
                  value={ing.cantidad}
                  onChange={(e) => updateIngrediente(index, 'cantidad', parseFloat(e.target.value))}
                  className="w-24 h-12 px-4 py-3 border border-[#E2E8F0] rounded-xl focus:ring-2 focus:ring-[#6366F1] transition-all duration-200 ease-out"
                  placeholder="Cantidad"
                />
                <select
                  value={ing.unidad}
                  onChange={(e) => updateIngrediente(index, 'unidad', e.target.value)}
                  className="w-24 h-12 px-4 py-3 border border-[#E2E8F0] rounded-xl focus:ring-2 focus:ring-[#6366F1] transition-all duration-200 ease-out"
                >
                  <option value="g">g</option>
                  <option value="kg">kg</option>
                  <option value="ml">ml</option>
                  <option value="l">l</option>
                  <option value="unidad">unidad</option>
                  <option value="cucharada">cdta</option>
                </select>
                {ingredientes.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeIngrediente(index)}
                    className="p-2 text-[#EF4444] hover:bg-[#FEE2E2] rounded-xl transition-all duration-200 ease-out"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={addIngrediente}
              className="text-[#6366F1] hover:text-[#4F46E5] text-sm font-semibold flex items-center gap-1 transition-colors duration-200 ease-out"
            >
              <Plus className="w-4 h-4" />
              Agregar ingrediente
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-[#0F172A] mb-2">Instrucciones</label>
          <div className="space-y-2">
            {instrucciones.map((inst, index) => (
              <div key={index} className="flex gap-2">
                <span className="bg-[#6366F1] text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm flex-shrink-0 mt-1">
                  {index + 1}
                </span>
                <textarea
                  value={inst}
                  onChange={(e) => updateInstruccion(index, e.target.value)}
                  className="flex-1 px-4 py-3 border border-[#E2E8F0] rounded-xl focus:ring-2 focus:ring-[#6366F1] transition-all duration-200 ease-out"
                  rows={2}
                  placeholder="Describe el paso..."
                />
                {instrucciones.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeInstruccion(index)}
                    className="p-2 text-[#EF4444] hover:bg-[#FEE2E2] rounded-xl transition-all duration-200 ease-out flex-shrink-0"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={addInstruccion}
              className="text-[#6366F1] hover:text-[#4F46E5] text-sm font-semibold flex items-center gap-1 transition-colors duration-200 ease-out"
            >
              <Plus className="w-4 h-4" />
              Agregar paso
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div>
            <label className="block text-sm font-semibold text-[#0F172A] mb-2">Calorías</label>
            <input
              type="number"
              value={valorNutricional.calorias}
              onChange={(e) => setValorNutricional({ ...valorNutricional, calorias: parseInt(e.target.value) || 0 })}
              className="w-full h-12 px-4 py-3 border border-[#E2E8F0] rounded-xl focus:ring-2 focus:ring-[#6366F1] transition-all duration-200 ease-out"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-[#0F172A] mb-2">Proteínas (g)</label>
            <input
              type="number"
              value={valorNutricional.proteinas}
              onChange={(e) => setValorNutricional({ ...valorNutricional, proteinas: parseInt(e.target.value) || 0 })}
              className="w-full h-12 px-4 py-3 border border-[#E2E8F0] rounded-xl focus:ring-2 focus:ring-[#6366F1] transition-all duration-200 ease-out"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-[#0F172A] mb-2">Carbohidratos (g)</label>
            <input
              type="number"
              value={valorNutricional.carbohidratos}
              onChange={(e) => setValorNutricional({ ...valorNutricional, carbohidratos: parseInt(e.target.value) || 0 })}
              className="w-full h-12 px-4 py-3 border border-[#E2E8F0] rounded-xl focus:ring-2 focus:ring-[#6366F1] transition-all duration-200 ease-out"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-[#0F172A] mb-2">Grasas (g)</label>
            <input
              type="number"
              value={valorNutricional.grasas}
              onChange={(e) => setValorNutricional({ ...valorNutricional, grasas: parseInt(e.target.value) || 0 })}
              className="w-full h-12 px-4 py-3 border border-[#E2E8F0] rounded-xl focus:ring-2 focus:ring-[#6366F1] transition-all duration-200 ease-out"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-[#0F172A] mb-2">Fibra (g)</label>
            <input
              type="number"
              value={valorNutricional.fibra}
              onChange={(e) => setValorNutricional({ ...valorNutricional, fibra: parseInt(e.target.value) || 0 })}
              className="w-full h-12 px-4 py-3 border border-[#E2E8F0] rounded-xl focus:ring-2 focus:ring-[#6366F1] transition-all duration-200 ease-out"
            />
          </div>
        </div>

        <div className="flex gap-3 pt-4 border-t border-[#E2E8F0]">
          <button
            type="submit"
            className="flex-1 bg-[#6366F1] text-white py-3 rounded-xl hover:bg-[#4F46E5] active:bg-[#4338CA] transition-all duration-200 ease-out font-semibold shadow-md hover:shadow-lg"
          >
            Guardar Receta
          </button>
          <button
            type="button"
            onClick={() => setShowForm(false)}
            className="px-6 bg-[#F8FAFC] text-[#0F172A] border border-[#E2E8F0] py-3 rounded-xl hover:bg-[#F1F5F9] transition-all duration-200 ease-out font-semibold"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}


