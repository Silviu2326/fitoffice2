import { useState } from 'react';
import { ShoppingCart, Package, Settings, Plus } from 'lucide-react';
import ListaCompra from '../components/ListaCompra';
import GeneradorLista from '../components/GeneradorLista';
import OrganizadorSecciones from '../components/OrganizadorSecciones';
import CalculadoraCantidades from '../components/CalculadoraCantidades';
import ExportLista from '../components/ExportLista';
import PersonalizadorLista from '../components/PersonalizadorLista';
import OptimizadorCompras from '../components/OptimizadorCompras';
import RecordatoriosLista from '../components/RecordatoriosLista';

export default function ListaCompraSupermercadoPage() {
  const [vistaActual, setVistaActual] = useState<'lista' | 'generar' | 'personalizar'>('lista');
  const [listaActual, setListaActual] = useState<any>(null);
  const [clienteSeleccionado, setClienteSeleccionado] = useState<string | null>(null);

  return (
    <div className="flex-1 overflow-auto bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <div className="bg-slate-900/50 backdrop-blur-sm border-b border-emerald-500/20 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-gradient-to-br from-emerald-500 to-teal-600 p-3 rounded-xl shadow-lg shadow-emerald-500/20">
                <ShoppingCart className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white mb-1">
                  🛒 Lista de la Compra & Supermercado
                </h1>
                <p className="text-slate-400">
                  Generador de listas de compra personalizadas cliente a cliente con valor percibido máximo
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setVistaActual('generar')}
                className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-all"
              >
                <Plus className="w-5 h-5" />
                Generar Lista
              </button>
              <button
                onClick={() => setVistaActual('personalizar')}
                className="flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-all"
              >
                <Settings className="w-5 h-5" />
                Personalizar
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mt-6">
            <button
              onClick={() => setVistaActual('lista')}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                vistaActual === 'lista'
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/20'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              <Package className="w-4 h-4 inline mr-2" />
              Listas Activas
            </button>
            <button
              onClick={() => setVistaActual('generar')}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                vistaActual === 'generar'
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/20'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              <Plus className="w-4 h-4 inline mr-2" />
              Generar Nueva
            </button>
            <button
              onClick={() => setVistaActual('personalizar')}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                vistaActual === 'personalizar'
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/20'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              <Settings className="w-4 h-4 inline mr-2" />
              Personalizar
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-8 py-8">
        {vistaActual === 'lista' && (
          <div className="space-y-6">
            <ListaCompra 
              onSeleccionarCliente={setClienteSeleccionado}
              onGenerarNueva={() => setVistaActual('generar')}
            />
            
            {listaActual && (
              <>
                <OrganizadorSecciones lista={listaActual} />
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <ExportLista lista={listaActual} />
                  <RecordatoriosLista clienteId={clienteSeleccionado} />
                </div>
              </>
            )}
          </div>
        )}

        {vistaActual === 'generar' && (
          <div className="space-y-6">
            <GeneradorLista 
              onListaGenerada={(lista) => {
                setListaActual(lista);
                setVistaActual('lista');
              }}
            />
            <CalculadoraCantidades />
            <OptimizadorCompras />
          </div>
        )}

        {vistaActual === 'personalizar' && (
          <div className="space-y-6">
            <PersonalizadorLista 
              listaActual={listaActual}
              onActualizar={setListaActual}
            />
          </div>
        )}
      </div>

      {/* Info Footer */}
      <div className="max-w-7xl mx-auto px-8 pb-8">
        <div className="bg-gradient-to-br from-emerald-900/30 to-teal-900/30 backdrop-blur-sm rounded-xl p-6 border border-emerald-500/20">
          <div className="flex items-start gap-4">
            <div className="bg-emerald-500/20 p-3 rounded-lg">
              <ShoppingCart className="w-6 h-6 text-emerald-400" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-white mb-2">
                💡 Valor Percibido Máximo
              </h3>
              <p className="text-slate-300 leading-relaxed">
                La Lista de la Compra / Supermercado es una funcionalidad de valor percibido máximo para 
                entrenadores personales, ya que elimina una de las principales barreras para la adherencia 
                nutricional: la dificultad de saber qué comprar. Sistema intuitivo para generar listas 
                automáticamente y fácil de usar para los clientes durante sus compras.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <div className="bg-slate-800/50 rounded-lg p-3">
                  <div className="text-emerald-400 font-semibold mb-1">Personalización Total</div>
                  <div className="text-sm text-slate-400">Listas basadas en la dieta específica de cada cliente</div>
                </div>
                <div className="bg-slate-800/50 rounded-lg p-3">
                  <div className="text-emerald-400 font-semibold mb-1">Cantidades Precisas</div>
                  <div className="text-sm text-slate-400">Cálculo automático por porción y número de personas</div>
                </div>
                <div className="bg-slate-800/50 rounded-lg p-3">
                  <div className="text-emerald-400 font-semibold mb-1">Organización por Secciones</div>
                  <div className="text-sm text-slate-400">Agrupación por áreas del supermercado</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

