import { useState } from 'react';
import { ChefHat, BookOpen, Star, Search, Calculator, Plus, Grid, ShoppingCart } from 'lucide-react';
import RecetarioList from '../components/RecetarioList';
import VisorReceta from '../components/VisorReceta';
import BuscadorRecetas from '../components/BuscadorRecetas';
import FavoritosComida from '../components/FavoritosComida';
import CalculadoraNutricional from '../components/CalculadoraNutricional';
import CreadorReceta from '../components/CreadorReceta';
import CategorizadorRecetas from '../components/CategorizadorRecetas';
import GeneradorListaCompra from '../components/GeneradorListaCompra';
import { Receta } from '../api/recetas';

export default function RecetarioComidasGuardadasPage() {
  const [activeTab, setActiveTab] = useState<'catalogo' | 'favoritos' | 'buscar' | 'calculadora' | 'crear' | 'lista'>('catalogo');
  const [recetaSeleccionada, setRecetaSeleccionada] = useState<Receta | null>(null);
  const [filtros, setFiltros] = useState<any>({});
  const [recetasParaLista, setRecetasParaLista] = useState<Receta[]>([]);

  const tabs = [
    { id: 'catalogo', label: 'Catálogo', icon: Grid },
    { id: 'favoritos', label: 'Favoritos', icon: Star },
    { id: 'buscar', label: 'Buscar', icon: Search },
    { id: 'calculadora', label: 'Calculadora', icon: Calculator },
    { id: 'crear', label: 'Nueva Receta', icon: Plus },
    { id: 'lista', label: 'Lista de Compra', icon: ShoppingCart },
  ] as const;

  const handleBuscar = (nuevosFiltros: any) => {
    setFiltros(nuevosFiltros);
    setActiveTab('catalogo');
  };

  const handleSelectReceta = (receta: Receta) => {
    setRecetaSeleccionada(receta);
  };

  const handleToggleFavorito = async (id: string) => {
    // Actualizar estado local si es necesario
    if (recetaSeleccionada && recetaSeleccionada.id === id) {
      setRecetaSeleccionada({
        ...recetaSeleccionada,
        favorito: !recetaSeleccionada.favorito
      });
    }
  };

  const handleGenerarListaCompra = (receta: Receta) => {
    setRecetasParaLista([receta]);
    setActiveTab('lista');
    setRecetaSeleccionada(null);
  };

  const handleRecetaCreada = () => {
    setActiveTab('catalogo');
    setFiltros({});
  };

  return (
    <div className="flex-1 overflow-y-auto bg-[#F8FAFC]">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-white p-8">
        <div className="flex items-center gap-4 mb-4">
          <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl">
            <ChefHat className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Recetario & Comidas Guardadas</h1>
            <p className="text-[#EEF2FF]">Catálogo reutilizable de recetas con valor nutricional completo</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mt-6 overflow-x-auto pb-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl whitespace-nowrap transition-all duration-200 ease-out font-semibold ${
                  activeTab === tab.id
                    ? 'bg-white text-[#6366F1] shadow-lg'
                    : 'bg-white/20 text-white hover:bg-white/30'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Content */}
      <div className="p-8">
        <div className="max-w-7xl mx-auto">
          {activeTab === 'catalogo' && (
            <div className="space-y-6">
              <CategorizadorRecetas 
                onSelectCategoria={(categoria) => setFiltros({ ...filtros, categoria })} 
              />
              <RecetarioList 
                filtros={filtros} 
                onSelectReceta={handleSelectReceta}
              />
            </div>
          )}

          {activeTab === 'favoritos' && (
            <FavoritosComida onSelectReceta={handleSelectReceta} />
          )}

          {activeTab === 'buscar' && (
            <BuscadorRecetas onBuscar={handleBuscar} />
          )}

          {activeTab === 'calculadora' && (
            <CalculadoraNutricional />
          )}

          {activeTab === 'crear' && (
            <CreadorReceta onRecetaCreada={handleRecetaCreada} />
          )}

          {activeTab === 'lista' && recetasParaLista.length > 0 && (
            <GeneradorListaCompra 
              recetas={recetasParaLista}
              onClose={() => setActiveTab('catalogo')}
            />
          )}

          {activeTab === 'lista' && recetasParaLista.length === 0 && (
            <div className="text-center py-12 bg-white rounded-xl border border-[#E2E8F0]">
              <ShoppingCart className="w-12 h-12 text-[#94A3B8] mx-auto mb-4" />
              <p className="text-[#64748B] font-medium">No hay recetas seleccionadas para la lista de compra</p>
              <p className="text-sm text-[#94A3B8] mt-1">
                Selecciona una receta y genera su lista de compra
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Modal de receta */}
      {recetaSeleccionada && (
        <VisorReceta
          receta={recetaSeleccionada}
          onClose={() => setRecetaSeleccionada(null)}
          onToggleFavorito={handleToggleFavorito}
          onGenerarListaCompra={handleGenerarListaCompra}
        />
      )}
    </div>
  );
}