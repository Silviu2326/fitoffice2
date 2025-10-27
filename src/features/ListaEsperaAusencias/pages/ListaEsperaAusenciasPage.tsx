import { useState } from 'react';
import { Users, Clock, Bell, BarChart3, TrendingUp, XCircle } from 'lucide-react';
import ListaEspera from '../components/ListaEspera';
import GestorAusencias from '../components/GestorAusencias';
import NotificacionesAutomaticas from '../components/NotificacionesAutomaticas';
import ControlAforo from '../components/ControlAforo';
import AnalyticsAusencias from '../components/AnalyticsAusencias';

type TabType = 'lista-espera' | 'ausencias' | 'notificaciones' | 'aforo' | 'analytics';

export default function ListaEsperaAusenciasPage() {
  const [activeTab, setActiveTab] = useState<TabType>('lista-espera');

  const tabs = [
    { id: 'lista-espera' as TabType, name: 'Lista de Espera', icon: Users },
    { id: 'ausencias' as TabType, name: 'Ausencias', icon: XCircle },
    { id: 'notificaciones' as TabType, name: 'Notificaciones', icon: Bell },
    { id: 'aforo' as TabType, name: 'Control de Aforo', icon: TrendingUp },
    { id: 'analytics' as TabType, name: 'Analytics', icon: BarChart3 },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'lista-espera':
        return <ListaEspera />;
      case 'ausencias':
        return <GestorAusencias />;
      case 'notificaciones':
        return <NotificacionesAutomaticas />;
      case 'aforo':
        return <ControlAforo />;
      case 'analytics':
        return <AnalyticsAusencias />;
      default:
        return <ListaEspera />;
    }
  };

  return (
    <div className="flex-1 overflow-auto bg-[#F8FAFC]">
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] p-3 rounded-xl shadow-md">
              <Clock className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-[#0F172A]">Lista de Espera & Ausencias</h1>
              <p className="text-[#64748B]">Gestión de lista de espera y control de asistencia</p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl p-6 border border-[#E2E8F0] shadow-md hover:shadow-lg transition-all duration-200">
            <div className="flex items-center gap-3 mb-2">
              <Users className="w-5 h-5 text-[#3B82F6]" />
              <h3 className="text-[#64748B] text-sm font-medium">En Lista de Espera</h3>
            </div>
            <p className="text-3xl font-bold text-[#0F172A]">8</p>
            <p className="text-sm text-[#94A3B8] mt-1">3 clases completas</p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-[#E2E8F0] shadow-md hover:shadow-lg transition-all duration-200">
            <div className="flex items-center gap-3 mb-2">
              <XCircle className="w-5 h-5 text-[#EF4444]" />
              <h3 className="text-[#64748B] text-sm font-medium">Ausencias Hoy</h3>
            </div>
            <p className="text-3xl font-bold text-[#0F172A]">3</p>
            <p className="text-sm text-[#94A3B8] mt-1">2 no-show</p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-[#E2E8F0] shadow-md hover:shadow-lg transition-all duration-200">
            <div className="flex items-center gap-3 mb-2">
              <Bell className="w-5 h-5 text-[#F59E0B]" />
              <h3 className="text-[#64748B] text-sm font-medium">Notificaciones</h3>
            </div>
            <p className="text-3xl font-bold text-[#0F172A]">12</p>
            <p className="text-sm text-[#94A3B8] mt-1">2 pendientes</p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-[#E2E8F0] shadow-md hover:shadow-lg transition-all duration-200">
            <div className="flex items-center gap-3 mb-2">
              <TrendingUp className="w-5 h-5 text-[#10B981]" />
              <h3 className="text-[#64748B] text-sm font-medium">Tasa de Asistencia</h3>
            </div>
            <p className="text-3xl font-bold text-[#0F172A]">87.5%</p>
            <p className="text-sm text-[#94A3B8] mt-1">+3.2% este mes</p>
          </div>
        </div>

        {/* Tabs Navigation */}
        <div className="mb-6 border-b border-[#E2E8F0]">
          <div className="flex gap-2 overflow-x-auto pb-px">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-3 font-semibold whitespace-nowrap transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'text-[#6366F1] border-b-2 border-[#6366F1]'
                      : 'text-[#64748B] hover:text-[#0F172A]'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {tab.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-xl p-6 border border-[#E2E8F0] shadow-md">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}

