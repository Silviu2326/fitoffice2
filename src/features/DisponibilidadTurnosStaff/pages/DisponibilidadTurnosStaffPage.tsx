import { useState } from 'react';
import { Users, Calendar, Clock, BarChart3, UserCheck, UserX, Settings } from 'lucide-react';
import TurnosStaff from '../components/TurnosStaff';
import GestorPersonal from '../components/GestorPersonal';
import Cuadrantes from '../components/Cuadrantes';
import Vacaciones from '../components/Vacaciones';
import Disponibilidad from '../components/Disponibilidad';
import Reemplazos from '../components/Reemplazos';
import HorariosFlexibles from '../components/HorariosFlexibles';
import AnalyticsPersonal from '../components/AnalyticsPersonal';

type TabType = 'disponibilidad' | 'turnos' | 'cuadrantes' | 'vacaciones' | 'reemplazos' | 'horarios' | 'personal' | 'analytics';

export default function DisponibilidadTurnosStaffPage() {
  const [activeTab, setActiveTab] = useState<TabType>('disponibilidad');

  const tabs = [
    { id: 'disponibilidad' as TabType, name: 'Disponibilidad', icon: UserCheck },
    { id: 'turnos' as TabType, name: 'Turnos', icon: Clock },
    { id: 'cuadrantes' as TabType, name: 'Cuadrantes', icon: Calendar },
    { id: 'vacaciones' as TabType, name: 'Vacaciones', icon: UserX },
    { id: 'reemplazos' as TabType, name: 'Reemplazos', icon: Users },
    { id: 'horarios' as TabType, name: 'Horarios Flexibles', icon: Settings },
    { id: 'personal' as TabType, name: 'Personal', icon: Users },
    { id: 'analytics' as TabType, name: 'Analytics', icon: BarChart3 },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'disponibilidad':
        return <Disponibilidad />;
      case 'turnos':
        return <TurnosStaff />;
      case 'cuadrantes':
        return <Cuadrantes />;
      case 'vacaciones':
        return <Vacaciones />;
      case 'reemplazos':
        return <Reemplazos />;
      case 'horarios':
        return <HorariosFlexibles />;
      case 'personal':
        return <GestorPersonal />;
      case 'analytics':
        return <AnalyticsPersonal />;
      default:
        return <Disponibilidad />;
    }
  };

  return (
    <div className="flex-1 overflow-auto bg-[#0F0F23]">
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] p-3 rounded-xl shadow-lg">
              <Users className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-[#F1F5F9]">Disponibilidad & Turnos Staff</h1>
              <p className="text-[#94A3B8]">Sistema de gestión de turnos y disponibilidad del personal</p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          <div className="bg-[#1E1E2E] rounded-xl p-4 shadow-md border border-[#334155] transition-all duration-200 hover:shadow-lg">
            <div className="flex items-center gap-3 mb-2">
              <UserCheck className="w-5 h-5 text-[#10B981]" />
              <h3 className="text-[#94A3B8] text-sm font-medium">Personal Activo</h3>
            </div>
            <p className="text-3xl font-bold text-[#F1F5F9]">8</p>
            <p className="text-sm text-[#64748B] mt-1">de 12 total</p>
          </div>

          <div className="bg-[#1E1E2E] rounded-xl p-4 shadow-md border border-[#334155] transition-all duration-200 hover:shadow-lg">
            <div className="flex items-center gap-3 mb-2">
              <Clock className="w-5 h-5 text-[#6366F1]" />
              <h3 className="text-[#94A3B8] text-sm font-medium">Turnos Hoy</h3>
            </div>
            <p className="text-3xl font-bold text-[#F1F5F9]">15</p>
            <p className="text-sm text-[#64748B] mt-1">3 turnos activos</p>
          </div>

          <div className="bg-[#1E1E2E] rounded-xl p-4 shadow-md border border-[#334155] transition-all duration-200 hover:shadow-lg">
            <div className="flex items-center gap-3 mb-2">
              <UserX className="w-5 h-5 text-[#F59E0B]" />
              <h3 className="text-[#94A3B8] text-sm font-medium">Vacaciones</h3>
            </div>
            <p className="text-3xl font-bold text-[#F1F5F9]">2</p>
            <p className="text-sm text-[#64748B] mt-1">1 pendiente</p>
          </div>

          <div className="bg-[#1E1E2E] rounded-xl p-4 shadow-md border border-[#334155] transition-all duration-200 hover:shadow-lg">
            <div className="flex items-center gap-3 mb-2">
              <Users className="w-5 h-5 text-[#8B5CF6]" />
              <h3 className="text-[#94A3B8] text-sm font-medium">Reemplazos</h3>
            </div>
            <p className="text-3xl font-bold text-[#F1F5F9]">1</p>
            <p className="text-sm text-[#64748B] mt-1">Activos esta semana</p>
          </div>
        </div>

        {/* Tabs Navigation */}
        <div className="mb-6 border-b border-[#334155]">
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
                      : 'text-[#94A3B8] hover:text-[#F1F5F9]'
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
        <div className="bg-[#1E1E2E]/50 rounded-xl p-6 border border-[#334155]">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}

