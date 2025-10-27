import { useState } from 'react';
import { Calendar, Users, Clock, CheckCircle, XCircle } from 'lucide-react';
import ReservasOnline from '../components/ReservasOnline';
import SelectorHuecos from '../components/SelectorHuecos';
import ConfirmacionReserva from '../components/ConfirmacionReserva';
import HistorialReservas from '../components/HistorialReservas';
import Cancelaciones from '../components/Cancelaciones';
import ListaEspera from '../components/ListaEspera';
import RecordatoriosReserva from '../components/RecordatoriosReserva';
import AnalyticsReservas from '../components/AnalyticsReservas';

type TabType = 'reservas' | 'historial' | 'cancelaciones' | 'lista-espera' | 'recordatorios' | 'analytics';

export default function ReservasOnlinePage() {
  const [activeTab, setActiveTab] = useState<TabType>('reservas');
  const [showSelector, setShowSelector] = useState(false);
  const [showConfirmacion, setShowConfirmacion] = useState(false);

  const tabs = [
    { id: 'reservas' as TabType, label: 'Reservas Online', icon: Calendar },
    { id: 'historial' as TabType, label: 'Historial', icon: Clock },
    { id: 'cancelaciones' as TabType, label: 'Cancelaciones', icon: XCircle },
    { id: 'lista-espera' as TabType, label: 'Lista de Espera', icon: Users },
    { id: 'recordatorios' as TabType, label: 'Recordatorios', icon: CheckCircle },
  ];

  const handleNuevaReserva = () => {
    setShowSelector(true);
  };

  const handleSeleccionHueco = (fecha: Date, hora: string) => {
    setShowSelector(false);
    setShowConfirmacion(true);
  };

  const handleConfirmarReserva = () => {
    setShowConfirmacion(false);
    // Aquí se procesaría la reserva
  };

  return (
    <div className="flex-1 overflow-auto bg-[#F8FAFC]">
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] p-3 rounded-2xl shadow-lg">
              <Calendar className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-[#0F172A]">Reservas Online</h1>
              <p className="text-[#64748B] mt-1 text-base">
                📱 Sistema de reservas online diferenciado: sesiones 1 a 1 para entrenadores, clases grupales para gimnasios
              </p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-md border border-[#E2E8F0] mb-6">
          <div className="flex gap-2 p-2 overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-200 whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'bg-[#6366F1] text-white shadow-md hover:bg-[#4F46E5]'
                      : 'text-[#64748B] hover:bg-[#F8FAFC]'
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
        <div className="space-y-6">
          {activeTab === 'reservas' && (
            <>
              {!showSelector && !showConfirmacion && (
                <ReservasOnline onNuevaReserva={handleNuevaReserva} />
              )}
              {showSelector && (
                <SelectorHuecos 
                  onSeleccionar={handleSeleccionHueco}
                  onCancelar={() => setShowSelector(false)}
                />
              )}
              {showConfirmacion && (
                <ConfirmacionReserva
                  onConfirmar={handleConfirmarReserva}
                  onCancelar={() => setShowConfirmacion(false)}
                />
              )}
            </>
          )}
          
          {activeTab === 'historial' && <HistorialReservas />}
          {activeTab === 'cancelaciones' && <Cancelaciones />}
          {activeTab === 'lista-espera' && <ListaEspera />}
          {activeTab === 'recordatorios' && <RecordatoriosReserva />}
        </div>

        {/* Analytics Section - Siempre visible al final */}
        <div className="mt-8">
          <AnalyticsReservas />
        </div>
      </div>
    </div>
  );
}

