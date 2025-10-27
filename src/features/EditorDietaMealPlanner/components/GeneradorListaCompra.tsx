import { useState } from 'react';
import { ShoppingCart, Download, Printer, Mail } from 'lucide-react';

interface ItemCompra {
  id: string;
  nombre: string;
  cantidad: number;
  unidad: string;
  categoria: string;
  comprado: boolean;
}

const itemsEjemplo: ItemCompra[] = [
  { id: '1', nombre: 'Pechuga de Pollo', cantidad: 1, unidad: 'kg', categoria: 'Proteínas', comprado: false },
  { id: '2', nombre: 'Arroz Blanco', cantidad: 500, unidad: 'g', categoria: 'Carbohidratos', comprado: false },
  { id: '3', nombre: 'Huevos', cantidad: 12, unidad: 'unidades', categoria: 'Proteínas', comprado: false },
  { id: '4', nombre: 'Avena', cantidad: 500, unidad: 'g', categoria: 'Carbohidratos', comprado: false },
  { id: '5', nombre: 'Aceite de Oliva', cantidad: 250, unidad: 'ml', categoria: 'Grasas', comprado: false },
  { id: '6', nombre: 'Brócoli', cantidad: 500, unidad: 'g', categoria: 'Verduras', comprado: false },
  { id: '7', nombre: 'Plátanos', cantidad: 6, unidad: 'unidades', categoria: 'Frutas', comprado: false },
  { id: '8', nombre: 'Salmón', cantidad: 400, unidad: 'g', categoria: 'Proteínas', comprado: false },
  { id: '9', nombre: 'Batata', cantidad: 1, unidad: 'kg', categoria: 'Carbohidratos', comprado: false },
  { id: '10', nombre: 'Aguacate', cantidad: 3, unidad: 'unidades', categoria: 'Grasas', comprado: false },
];

export default function GeneradorListaCompra() {
  const [items, setItems] = useState<ItemCompra[]>(itemsEjemplo);
  const [categoriaFiltro, setCategoriaFiltro] = useState<string>('todas');

  const categorias = ['todas', 'Proteínas', 'Carbohidratos', 'Grasas', 'Verduras', 'Frutas'];

  const toggleComprado = (id: string) => {
    setItems(items.map(item =>
      item.id === id ? { ...item, comprado: !item.comprado } : item
    ));
  };

  const itemsFiltrados = items.filter(item =>
    categoriaFiltro === 'todas' || item.categoria === categoriaFiltro
  );

  const totalItems = items.length;
  const itemsComprados = items.filter(i => i.comprado).length;
  const progreso = totalItems > 0 ? (itemsComprados / totalItems) * 100 : 0;

  const agruparPorCategoria = () => {
    const grupos: Record<string, ItemCompra[]> = {};
    itemsFiltrados.forEach(item => {
      if (!grupos[item.categoria]) {
        grupos[item.categoria] = [];
      }
      grupos[item.categoria].push(item);
    });
    return grupos;
  };

  const grupos = agruparPorCategoria();

  const exportarLista = () => {
    let texto = '=== LISTA DE LA COMPRA ===\n\n';
    Object.entries(grupos).forEach(([categoria, items]) => {
      texto += `${categoria}:\n`;
      items.forEach(item => {
        texto += `  ${item.comprado ? '☑' : '☐'} ${item.nombre} - ${item.cantidad} ${item.unidad}\n`;
      });
      texto += '\n';
    });
    
    const blob = new Blob([texto], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'lista-compra.txt';
    a.click();
  };

  return (
    <div className="bg-slate-800 rounded-lg p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-indigo-600 p-2 rounded-lg">
            <ShoppingCart className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-xl font-bold text-white">Lista de la Compra</h2>
        </div>
        <div className="flex gap-2">
          <button
            onClick={exportarLista}
            className="flex items-center gap-2 bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <Download className="w-4 h-4" />
            Exportar
          </button>
          <button className="flex items-center gap-2 bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg transition-colors">
            <Printer className="w-4 h-4" />
            Imprimir
          </button>
          <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors">
            <Mail className="w-4 h-4" />
            Enviar
          </button>
        </div>
      </div>

      {/* Progreso de compra */}
      <div className="bg-slate-700 rounded-lg p-4 space-y-3">
        <div className="flex justify-between items-center">
          <div>
            <div className="text-sm text-slate-400">Progreso de Compra</div>
            <div className="text-2xl font-bold text-white">
              {itemsComprados} / {totalItems} items
            </div>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-indigo-400">{progreso.toFixed(0)}%</div>
            <div className="text-xs text-slate-500">completado</div>
          </div>
        </div>
        <div className="relative h-3 bg-slate-600 rounded-full overflow-hidden">
          <div
            className="absolute h-full bg-indigo-600 transition-all duration-500"
            style={{ width: `${progreso}%` }}
          />
        </div>
      </div>

      {/* Filtros por categoría */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {categorias.map((categoria) => (
          <button
            key={categoria}
            onClick={() => setCategoriaFiltro(categoria)}
            className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
              categoriaFiltro === categoria
                ? 'bg-indigo-600 text-white'
                : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
            }`}
          >
            {categoria}
            {categoria !== 'todas' && (
              <span className="ml-2 bg-slate-600 px-2 py-0.5 rounded text-xs">
                {items.filter(i => i.categoria === categoria).length}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Lista de items agrupados por categoría */}
      <div className="space-y-4">
        {Object.entries(grupos).map(([categoria, itemsCategoria]) => (
          <div key={categoria} className="space-y-2">
            <h3 className="text-white font-semibold text-lg flex items-center gap-2">
              {categoria}
              <span className="text-sm text-slate-400 font-normal">
                ({itemsCategoria.filter(i => i.comprado).length}/{itemsCategoria.length})
              </span>
            </h3>
            <div className="space-y-2">
              {itemsCategoria.map((item) => (
                <div
                  key={item.id}
                  className={`bg-slate-700 rounded-lg p-3 flex items-center justify-between transition-all ${
                    item.comprado ? 'opacity-50' : ''
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={item.comprado}
                      onChange={() => toggleComprado(item.id)}
                      className="w-5 h-5 text-indigo-600 rounded focus:ring-2 focus:ring-indigo-500"
                    />
                    <div>
                      <div className={`text-white font-medium ${item.comprado ? 'line-through' : ''}`}>
                        {item.nombre}
                      </div>
                      <div className="text-sm text-slate-400">
                        {item.cantidad} {item.unidad}
                      </div>
                    </div>
                  </div>
                  <div className="text-sm text-slate-500">
                    {item.categoria}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {itemsFiltrados.length === 0 && (
        <div className="text-center py-8 text-slate-400">
          No hay items en esta categoría
        </div>
      )}

      {/* Información adicional */}
      <div className="bg-blue-900/30 border border-blue-700/50 rounded-lg p-4">
        <div className="flex gap-3">
          <div className="text-blue-400 mt-1">
            <ShoppingCart className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-blue-300 font-medium mb-1">Lista Generada Automáticamente</h4>
            <p className="text-sm text-slate-300">
              Esta lista se genera automáticamente a partir de los alimentos en tu plan de dieta.
              Puedes marcar los items a medida que los compres y exportar o enviar la lista a tu cliente.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

