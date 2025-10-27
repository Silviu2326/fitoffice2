import { Settings, Plus, Minus, Edit2, Save } from 'lucide-react';
import { useState } from 'react';

interface PersonalizadorListaProps {
  listaActual: any;
  onActualizar?: (lista: any) => void;
}

export default function PersonalizadorLista({ listaActual, onActualizar }: PersonalizadorListaProps) {
  const [editando, setEditando] = useState(false);
  const [ingredientesExtra, setIngredientesExtra] = useState<string[]>([]);
  const [nuevoIngrediente, setNuevoIngrediente] = useState('');

  const handleAgregarIngrediente = () => {
    if (nuevoIngrediente.trim()) {
      setIngredientesExtra([...ingredientesExtra, nuevoIngrediente]);
      setNuevoIngrediente('');
    }
  };

  const handleEliminarIngrediente = (index: number) => {
    setIngredientesExtra(ingredientesExtra.filter((_, i) => i !== index));
  };

  const handleGuardar = () => {
    setEditando(false);
    onActualizar?.({ ...listaActual, ingredientesExtra });
  };

  return (
    <div className="bg-white rounded-2xl border border-[#E2E8F0] overflow-hidden shadow-md">
      {/* Header */}
      <div className="bg-[#F8FAFC] px-6 py-4 border-b border-[#E2E8F0]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-[#FFEDD5] p-2 rounded-lg">
              <Settings className="w-5 h-5 text-[#F97316]" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-[#0F172A]">Personalizar Lista</h2>
              <p className="text-sm text-[#64748B]">
                Ajusta la lista según preferencias del cliente
              </p>
            </div>
          </div>
          <button
            onClick={() => setEditando(!editando)}
            className={`inline-flex items-center px-4 py-2 font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
              editando
                ? 'bg-[#F1F5F9] text-[#64748B] border border-[#E2E8F0] hover:bg-[#E2E8F0] focus:ring-[#64748B]'
                : 'bg-[#6366F1] text-white hover:bg-[#4F46E5] shadow-md hover:shadow-lg focus:ring-[#6366F1]'
            }`}
          >
            {editando ? 'Cancelar' : 'Editar'}
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-6">
        {/* Restricciones Alimentarias */}
        <div>
          <h3 className="text-lg font-semibold text-[#0F172A] mb-3">Restricciones Alimentarias</h3>
          <div className="space-y-2">
            <label className="flex items-center gap-3 cursor-pointer p-3 rounded-lg hover:bg-[#F8FAFC] transition-all">
              <input
                type="checkbox"
                disabled={!editando}
                className="w-5 h-5 rounded border-[#E2E8F0] bg-white text-[#6366F1] focus:ring-[#6366F1] focus:ring-2 disabled:opacity-50 transition-all duration-200"
              />
              <span className="text-[#0F172A]">Sin lactosa</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer p-3 rounded-lg hover:bg-[#F8FAFC] transition-all">
              <input
                type="checkbox"
                disabled={!editando}
                className="w-5 h-5 rounded border-[#E2E8F0] bg-white text-[#6366F1] focus:ring-[#6366F1] focus:ring-2 disabled:opacity-50 transition-all duration-200"
              />
              <span className="text-[#0F172A]">Sin gluten</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer p-3 rounded-lg hover:bg-[#F8FAFC] transition-all">
              <input
                type="checkbox"
                disabled={!editando}
                className="w-5 h-5 rounded border-[#E2E8F0] bg-white text-[#6366F1] focus:ring-[#6366F1] focus:ring-2 disabled:opacity-50 transition-all duration-200"
              />
              <span className="text-[#0F172A]">Vegetariano</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer p-3 rounded-lg hover:bg-[#F8FAFC] transition-all">
              <input
                type="checkbox"
                disabled={!editando}
                className="w-5 h-5 rounded border-[#E2E8F0] bg-white text-[#6366F1] focus:ring-[#6366F1] focus:ring-2 disabled:opacity-50 transition-all duration-200"
              />
              <span className="text-[#0F172A]">Vegano</span>
            </label>
          </div>
        </div>

        {/* Preferencias de Supermercado */}
        <div>
          <h3 className="text-lg font-semibold text-[#0F172A] mb-3">Supermercado Preferido</h3>
          <select
            disabled={!editando}
            className="w-full h-12 bg-white border border-[#E2E8F0] rounded-xl px-4 py-3 text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#6366F1] focus:border-[#6366F1] disabled:opacity-50 transition-all duration-200"
          >
            <option>Mercadona</option>
            <option>Carrefour</option>
            <option>DIA</option>
            <option>Lidl</option>
            <option>Alcampo</option>
          </select>
        </div>

        {/* Ingredientes Extra */}
        <div>
          <h3 className="text-lg font-semibold text-[#0F172A] mb-3">Ingredientes Adicionales</h3>
          {editando && (
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                value={nuevoIngrediente}
                onChange={(e) => setNuevoIngrediente(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAgregarIngrediente()}
                placeholder="Añadir ingrediente extra..."
                className="flex-1 h-12 bg-white border border-[#E2E8F0] rounded-xl px-4 py-2 text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#6366F1] focus:border-[#6366F1] transition-all duration-200"
              />
              <button
                onClick={handleAgregarIngrediente}
                className="inline-flex items-center justify-center w-12 h-12 bg-[#6366F1] hover:bg-[#4F46E5] text-white rounded-xl transition-all duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#6366F1] focus:ring-offset-2"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>
          )}
          <div className="space-y-2">
            {ingredientesExtra.map((ingrediente, index) => (
              <div
                key={index}
                className="flex items-center justify-between bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg px-4 py-3"
              >
                <span className="text-[#0F172A]">{ingrediente}</span>
                {editando && (
                  <button
                    onClick={() => handleEliminarIngrediente(index)}
                    className="text-[#EF4444] hover:text-[#DC2626] transition-colors"
                  >
                    <Minus className="w-5 h-5" />
                  </button>
                )}
              </div>
            ))}
            {ingredientesExtra.length === 0 && (
              <div className="text-center py-8 text-[#94A3B8] bg-[#F8FAFC] rounded-lg border border-[#E2E8F0]">
                No hay ingredientes adicionales
              </div>
            )}
          </div>
        </div>

        {/* Botón Guardar */}
        {editando && (
          <button
            onClick={handleGuardar}
            className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 bg-[#6366F1] hover:bg-[#4F46E5] active:bg-[#4338CA] text-white rounded-lg transition-all duration-200 font-semibold shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#6366F1] focus:ring-offset-2"
          >
            <Save className="w-5 h-5" />
            Guardar Cambios
          </button>
        )}

        {/* Info */}
        <div className="bg-[#FFEDD5] border border-[#FED7AA] rounded-xl p-4">
          <p className="text-sm text-[#F97316]">
            💡 Personaliza la lista según las preferencias y restricciones alimentarias 
            de cada cliente para máxima adherencia nutricional.
          </p>
        </div>
      </div>
    </div>
  );
}
