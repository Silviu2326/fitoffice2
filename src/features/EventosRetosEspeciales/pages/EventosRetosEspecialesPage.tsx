import { useState } from 'react';
import { Target, List, Users, TrendingUp, Trophy, Heart, Gift, BarChart3 } from 'lucide-react';
import EventosList from '../components/EventosList';
import CreadorReto from '../components/CreadorReto';
import Participantes from '../components/Participantes';
import SeguimientoProgreso from '../components/SeguimientoProgreso';
import RankingRetos from '../components/RankingRetos';
import ContenidoMotivacional from '../components/ContenidoMotivacional';
import PremiosReconocimientos from '../components/PremiosReconocimientos';
import AnalyticsEventos from '../components/AnalyticsEventos';
import { type Reto } from '../api/retos';

type TabType = 'eventos' | 'participantes' | 'progreso' | 'ranking' | 'motivacion' | 'premios' | 'analytics';

export default function EventosRetosEspecialesPage() {
  const [activeTab, setActiveTab] = useState<TabType>('eventos');
  const [mostrarCreador, setMostrarCreador] = useState(false);
  const [retoEditar, setRetoEditar] = useState<Reto | null>(null);
  const [retoSeleccionado, setRetoSeleccionado] = useState<{ id: string; nombre: string } | null>(null);

  const tabs = [
    { id: 'eventos' as TabType, label: 'Eventos & Retos', icon: List },
    { id: 'participantes' as TabType, label: 'Participantes', icon: Users },
    { id: 'progreso' as TabType, label: 'Seguimiento', icon: TrendingUp },
    { id: 'ranking' as TabType, label: 'Ranking', icon: Trophy },
    { id: 'motivacion' as TabType, label: 'Motivación', icon: Heart },
    { id: 'premios' as TabType, label: 'Premios', icon: Gift },
    { id: 'analytics' as TabType, label: 'Analytics', icon: BarChart3 }
  ];

  const handleCrearNuevo = () => {
    setRetoEditar(null);
    setMostrarCreador(true);
  };

  const handleEditarReto = (reto: Reto) => {
    setRetoEditar(reto);
    setMostrarCreador(true);
  };

  const handleGuardarReto = () => {
    setMostrarCreador(false);
    setRetoEditar(null);
    // Recargar lista
  };

  const handleCerrarCreador = () => {
    setMostrarCreador(false);
    setRetoEditar(null);
  };

  // Para las pestañas que necesitan un reto seleccionado
  const necesitaRetoSeleccionado = ['participantes', 'progreso', 'ranking', 'motivacion', 'premios', 'analytics'].includes(activeTab);

  return (
    <div className="flex-1 overflow-auto bg-[#F8FAFC]">
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#0F172A] mb-2">🎯 Eventos & Retos Especiales</h1>
          <p className="text-[#64748B]">
            Sistema de gestión de eventos especiales y retos para fomentar la participación y engagement
          </p>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-lg border border-[#E2E8F0] mb-6">
          <div className="flex flex-wrap gap-2 p-4 border-b border-[#E2E8F0]">
            {tabs.map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'bg-[#6366F1] text-white shadow-md hover:bg-[#4F46E5]'
                      : 'bg-[#F8FAFC] text-[#64748B] hover:bg-[#F1F5F9]'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {tab.label}
                </button>
              );
            })}
          </div>

          <div className="p-6">
            {/* Selector de reto para tabs que lo necesitan */}
            {necesitaRetoSeleccionado && !retoSeleccionado && (
              <div className="text-center py-12">
                <Target className="w-16 h-16 text-[#94A3B8] mx-auto mb-4" />
                <p className="text-[#64748B] text-lg mb-4">
                  Selecciona un reto para ver esta información
                </p>
                <button
                  onClick={() => setActiveTab('eventos')}
                  className="px-6 py-3 bg-[#6366F1] text-white rounded-xl hover:bg-[#4F46E5] active:bg-[#4338CA] transition-all duration-200 font-semibold shadow-md hover:shadow-lg"
                >
                  Ir a Eventos & Retos
                </button>
              </div>
            )}

            {/* Contenido de las tabs */}
            {activeTab === 'eventos' && (
              <EventosList 
                onCrearNuevo={handleCrearNuevo}
                onEditarReto={handleEditarReto}
              />
            )}

            {activeTab === 'participantes' && retoSeleccionado && (
              <Participantes 
                retoId={retoSeleccionado.id}
                retoNombre={retoSeleccionado.nombre}
              />
            )}

            {activeTab === 'progreso' && retoSeleccionado && (
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-[#EEF2FF] to-[#DBEAFE] rounded-xl p-4 mb-4 border border-[#E2E8F0]">
                  <p className="text-sm text-[#0F172A]">
                    💡 <strong>Nota:</strong> Selecciona un participante específico para ver su progreso detallado.
                    Por ahora, este módulo muestra el componente de seguimiento de ejemplo.
                  </p>
                </div>
                <SeguimientoProgreso 
                  participanteId="ejemplo-id"
                  nombreParticipante="Participante de ejemplo"
                />
              </div>
            )}

            {activeTab === 'ranking' && retoSeleccionado && (
              <RankingRetos 
                retoId={retoSeleccionado.id}
                retoNombre={retoSeleccionado.nombre}
              />
            )}

            {activeTab === 'motivacion' && retoSeleccionado && (
              <ContenidoMotivacional 
                retoId={retoSeleccionado.id}
                retoNombre={retoSeleccionado.nombre}
              />
            )}

            {activeTab === 'premios' && retoSeleccionado && (
              <PremiosReconocimientos 
                retoId={retoSeleccionado.id}
                retoNombre={retoSeleccionado.nombre}
              />
            )}

            {activeTab === 'analytics' && retoSeleccionado && (
              <AnalyticsEventos 
                retoId={retoSeleccionado.id}
                retoNombre={retoSeleccionado.nombre}
              />
            )}
          </div>
        </div>

        {/* Selector de reto flotante */}
        {necesitaRetoSeleccionado && (
          <div className="fixed bottom-8 right-8 bg-white rounded-2xl shadow-2xl border-2 border-[#6366F1] p-4 max-w-sm">
            <div className="flex items-center gap-2 mb-3">
              <Target className="w-5 h-5 text-[#6366F1]" />
              <span className="font-bold text-[#0F172A]">Reto Actual</span>
            </div>
            {retoSeleccionado ? (
              <div>
                <p className="text-sm text-[#0F172A] mb-2">{retoSeleccionado.nombre}</p>
                <button
                  onClick={() => setRetoSeleccionado(null)}
                  className="text-sm text-[#EF4444] hover:text-[#DC2626] font-medium"
                >
                  Cambiar reto
                </button>
              </div>
            ) : (
              <button
                onClick={() => setActiveTab('eventos')}
                className="w-full px-4 py-2 bg-[#6366F1] text-white rounded-xl hover:bg-[#4F46E5] active:bg-[#4338CA] transition-all duration-200 text-sm font-semibold shadow-md"
              >
                Seleccionar Reto
              </button>
            )}
          </div>
        )}
      </div>

      {/* Modal de creador */}
      {mostrarCreador && (
        <CreadorReto
          onCerrar={handleCerrarCreador}
          onGuardar={handleGuardarReto}
          retoEditar={retoEditar}
        />
      )}
    </div>
  );
}

