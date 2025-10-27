import { useState } from 'react';
import { Search, Plus } from 'lucide-react';

interface Alimento {
  id: string;
  nombre: string;
  categoria: string;
  proteinas: number;
  carbohidratos: number;
  grasas: number;
  calorias: number;
  porcion: string;
}

const alimentosEjemplo: Alimento[] = [
  { id: '1', nombre: 'Pechuga de Pollo', categoria: 'Proteínas', proteinas: 31, carbohidratos: 0, grasas: 3.6, calorias: 165, porcion: '100g' },
  { id: '2', nombre: 'Arroz Blanco', categoria: 'Carbohidratos', proteinas: 2.7, carbohidratos: 28, grasas: 0.3, calorias: 130, porcion: '100g' },
  { id: '3', nombre: 'Aceite de Oliva', categoria: 'Grasas', proteinas: 0, carbohidratos: 0, grasas: 14, calorias: 120, porcion: '1 cda' },
  { id: '4', nombre: 'Huevo', categoria: 'Proteínas', proteinas: 6, carbohidratos: 0.6, grasas: 5, calorias: 78, porcion: '1 unidad' },
  { id: '5', nombre: 'Avena', categoria: 'Carbohidratos', proteinas: 13.2, carbohidratos: 67, grasas: 6.9, calorias: 389, porcion: '100g' },
  { id: '6', nombre: 'Salmón', categoria: 'Proteínas', proteinas: 20, carbohidratos: 0, grasas: 13, calorias: 208, porcion: '100g' },
  { id: '7', nombre: 'Batata', categoria: 'Carbohidratos', proteinas: 1.6, carbohidratos: 20, grasas: 0.1, calorias: 86, porcion: '100g' },
  { id: '8', nombre: 'Aguacate', categoria: 'Grasas', proteinas: 2, carbohidratos: 9, grasas: 15, calorias: 160, porcion: '100g' },
  { id: '9', nombre: 'Brócoli', categoria: 'Verduras', proteinas: 2.8, carbohidratos: 7, grasas: 0.4, calorias: 34, porcion: '100g' },
  { id: '10', nombre: 'Plátano', categoria: 'Frutas', proteinas: 1.1, carbohidratos: 23, grasas: 0.3, calorias: 89, porcion: '100g' },
];

interface SelectorAlimentosProps {
  onAgregarAlimento?: (alimento: Alimento, cantidad: number) => void;
}

export default function SelectorAlimentos({ onAgregarAlimento }: SelectorAlimentosProps) {
  const [busqueda, setBusqueda] = useState('');
  const [categoriaFiltro, setCategoriaFiltro] = useState('todas');
  const [cantidades, setCantidades] = useState<Record<string, number>>({});

  const categorias = ['todas', 'Proteínas', 'Carbohidratos', 'Grasas', 'Verduras', 'Frutas'];

  const alimentosFiltrados = alimentosEjemplo.filter((alimento) => {
    const coincideBusqueda = alimento.nombre.toLowerCase().includes(busqueda.toLowerCase());
    const coincideCategoria = categoriaFiltro === 'todas' || alimento.categoria === categoriaFiltro;
    return coincideBusqueda && coincideCategoria;
  });

  const handleAgregarAlimento = (alimento: Alimento) => {
    const cantidad = cantidades[alimento.id] || 1;
    onAgregarAlimento?.(alimento, cantidad);
  };

  return (
    <div className="bg-slate-800 rounded-lg p-6 space-y-4">
      <h2 className="text-xl font-bold text-white">Selector de Alimentos</h2>

      {/* Búsqueda y filtros */}
      <div className="space-y-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
          <input
            type="text"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            placeholder="Buscar alimentos..."
            className="w-full bg-slate-700 border border-slate-600 rounded-lg pl-10 pr-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2">
          {categorias.map((categoria) => (
            <button
              key={categoria}
              onClick={() => setCategoriaFiltro(categoria)}
              className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                categoriaFiltro === categoria
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
              }`}
            >
              {categoria}
            </button>
          ))}
        </div>
      </div>

      {/* Lista de alimentos */}
      <div className="space-y-2 max-h-96 overflow-y-auto">
        {alimentosFiltrados.map((alimento) => (
          <div
            key={alimento.id}
            className="bg-slate-700 rounded-lg p-4 flex items-center justify-between"
          >
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-white font-medium">{alimento.nombre}</h3>
                <span className="text-xs bg-slate-600 text-slate-300 px-2 py-1 rounded">
                  {alimento.categoria}
                </span>
              </div>
              <div className="grid grid-cols-4 gap-4 text-sm">
                <div>
                  <span className="text-slate-400">Proteínas:</span>
                  <span className="text-emerald-400 ml-1 font-medium">{alimento.proteinas}g</span>
                </div>
                <div>
                  <span className="text-slate-400">Carbos:</span>
                  <span className="text-blue-400 ml-1 font-medium">{alimento.carbohidratos}g</span>
                </div>
                <div>
                  <span className="text-slate-400">Grasas:</span>
                  <span className="text-yellow-400 ml-1 font-medium">{alimento.grasas}g</span>
                </div>
                <div>
                  <span className="text-slate-400">Calorías:</span>
                  <span className="text-white ml-1 font-medium">{alimento.calorias}</span>
                </div>
              </div>
              <div className="text-xs text-slate-500 mt-1">Por {alimento.porcion}</div>
            </div>
            <div className="flex items-center gap-2 ml-4">
              <input
                type="number"
                min="0.5"
                step="0.5"
                value={cantidades[alimento.id] || 1}
                onChange={(e) => setCantidades({
                  ...cantidades,
                  [alimento.id]: parseFloat(e.target.value) || 1
                })}
                className="w-16 bg-slate-600 border border-slate-500 rounded px-2 py-1 text-white text-center focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <button
                onClick={() => handleAgregarAlimento(alimento)}
                className="bg-emerald-600 hover:bg-emerald-700 text-white p-2 rounded-lg transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {alimentosFiltrados.length === 0 && (
        <div className="text-center py-8 text-slate-400">
          No se encontraron alimentos que coincidan con tu búsqueda
        </div>
      )}
    </div>
  );
}

