import { useState } from 'react';
import { ShoppingCart, Check, Printer, Download } from 'lucide-react';
import { Receta } from '../api/recetas';

interface GeneradorListaCompraProps {
  recetas: Receta[];
  onClose?: () => void;
}

export default function GeneradorListaCompra({ recetas, onClose }: GeneradorListaCompraProps) {
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());

  const consolidarIngredientes = () => {
    const ingredientesMap = new Map<string, { cantidad: number; unidad: string }>();

    recetas.forEach((receta) => {
      receta.ingredientes.forEach((ing) => {
        const key = `${ing.nombre.toLowerCase()}-${ing.unidad}`;
        const existing = ingredientesMap.get(key);
        if (existing) {
          ingredientesMap.set(key, {
            cantidad: existing.cantidad + ing.cantidad,
            unidad: ing.unidad,
          });
        } else {
          ingredientesMap.set(key, { cantidad: ing.cantidad, unidad: ing.unidad });
        }
      });
    });

    return Array.from(ingredientesMap.entries()).map(([key, value]) => ({
      nombre: key.split('-')[0],
      cantidad: value.cantidad,
      unidad: value.unidad,
    }));
  };

  const ingredientes = consolidarIngredientes();

  const toggleCheck = (nombre: string) => {
    const newChecked = new Set(checkedItems);
    if (newChecked.has(nombre)) {
      newChecked.delete(nombre);
    } else {
      newChecked.add(nombre);
    }
    setCheckedItems(newChecked);
  };

  const handleImprimir = () => {
    window.print();
  };

  return (
    <div className="bg-white rounded-2xl shadow-md border border-[#E2E8F0] p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <ShoppingCart className="w-6 h-6 text-[#6366F1]" />
          <div>
            <h3 className="text-xl font-bold text-[#0F172A]">Lista de Compra</h3>
            <p className="text-sm text-[#64748B]">
              {recetas.length} receta{recetas.length !== 1 ? 's' : ''} seleccionada{recetas.length !== 1 ? 's' : ''}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleImprimir}
            className="flex items-center gap-2 bg-[#F8FAFC] text-[#0F172A] border border-[#E2E8F0] px-4 py-2 rounded-xl hover:bg-[#F1F5F9] transition-all duration-200 ease-out font-semibold"
          >
            <Printer className="w-4 h-4" />
            <span>Imprimir</span>
          </button>
          <button
            onClick={handleImprimir}
            className="flex items-center gap-2 bg-[#6366F1] text-white px-4 py-2 rounded-xl hover:bg-[#4F46E5] active:bg-[#4338CA] transition-all duration-200 ease-out font-semibold shadow-md hover:shadow-lg"
          >
            <Download className="w-4 h-4" />
            <span>Exportar</span>
          </button>
        </div>
      </div>

      <div className="mb-6">
        <h4 className="text-sm font-semibold text-[#0F172A] mb-3">Recetas incluidas:</h4>
        <div className="flex flex-wrap gap-2">
          {recetas.map((receta) => (
            <span
              key={receta.id}
              className="bg-[#EEF2FF] text-[#6366F1] px-3 py-1.5 rounded-full text-sm font-semibold"
            >
              {receta.nombre}
            </span>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <h4 className="text-sm font-semibold text-[#0F172A] mb-3">
          Ingredientes necesarios ({ingredientes.length} items):
        </h4>
        {ingredientes.map((ing, index) => (
          <div
            key={index}
            className={`flex items-start gap-3 p-3 rounded-xl border transition-all duration-200 ease-out cursor-pointer ${
              checkedItems.has(ing.nombre)
                ? 'bg-[#D1FAE5] border-[#10B981]'
                : 'bg-[#F8FAFC] border-[#E2E8F0] hover:bg-[#F1F5F9]'
            }`}
            onClick={() => toggleCheck(ing.nombre)}
          >
            <div
              className={`flex-shrink-0 mt-0.5 w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-200 ease-out ${
                checkedItems.has(ing.nombre)
                  ? 'bg-[#10B981] border-[#10B981]'
                  : 'border-[#E2E8F0]'
              }`}
            >
              {checkedItems.has(ing.nombre) && (
                <Check className="w-4 h-4 text-white" />
              )}
            </div>
            <div className="flex-1">
              <span
                className={`font-semibold capitalize ${
                  checkedItems.has(ing.nombre)
                    ? 'line-through text-[#64748B]'
                    : 'text-[#0F172A]'
                }`}
              >
                {ing.nombre}
              </span>
              <span className="text-[#64748B] ml-2">
                - {ing.cantidad} {ing.unidad}
              </span>
            </div>
          </div>
        ))}
      </div>

      {onClose && (
        <button
          onClick={onClose}
          className="w-full mt-6 bg-[#F8FAFC] text-[#0F172A] border border-[#E2E8F0] py-3 rounded-xl hover:bg-[#F1F5F9] transition-all duration-200 ease-out font-semibold"
        >
          Cerrar
        </button>
      )}
    </div>
  );
}


