import { useState } from 'react';
import { Building2, List, Users, Lock, Package, Calendar, Wrench, BarChart3 } from 'lucide-react';
import GestorRecursos from '../components/GestorRecursos';
import SalasDisponibles from '../components/SalasDisponibles';
import ControlAforo from '../components/ControlAforo';
import BloqueosMantenimiento from '../components/BloqueosMantenimiento';
import MaterialDisponible from '../components/MaterialDisponible';
import ReservasSalas from '../components/ReservasSalas';
import MantenimientoPreventivo from '../components/MantenimientoPreventivo';
import AnalyticsRecursos from '../components/AnalyticsRecursos';
import { type Recurso } from '../api/recursos';

type TabType = 'gestor' | 'salas' | 'aforo' | 'bloqueos' | 'material' | 'reservas' | 'mantenimiento' | 'analytics';

export default function RecursosSalasMaterialPage() {
  const [activeTab, setActiveTab] = useState<TabType>('gestor');
  const [recursoSeleccionado, setRecursoSeleccionado] = useState<Recurso | null>(null);

  const tabs = [
    { id: 'gestor' as TabType, label: 'Gestión', icon: List },
    { id: 'salas' as TabType, label: 'Salas Disponibles', icon: Building2 },
    { id: 'aforo' as TabType, label: 'Control Aforo', icon: Users },
    { id: 'bloqueos' as TabType, label: 'Bloqueos', icon: Lock },
    { id: 'material' as TabType, label: 'Material', icon: Package },
    { id: 'reservas' as TabType, label: 'Reservas', icon: Calendar },
    { id: 'mantenimiento' as TabType, label: 'Mantenimiento', icon: Wrench },
    { id: 'analytics' as TabType, label: 'Analytics', icon: BarChart3 }
  ];

  const handleCrearRecurso = () => {
    // Lógica para crear recurso
    console.log('Crear nuevo recurso');
  };

  const handleEditarRecurso = (recurso: Recurso) => {
    setRecursoSeleccionado(recurso);
    console.log('Editar recurso:', recurso);
  };

  return (
    <div className="flex-1 overflow-auto bg-[#F8FAFC]">
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-[30px] leading-[38px] font-bold text-[#0F172A] mb-2">Recursos, Salas & Material</h1>
          <p className="text-[16px] leading-6 text-[#64748B]">
            Sistema de gestión de recursos físicos, salas y material para gimnasios y centros
          </p>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl border border-[#E2E8F0] mb-6" style={{ boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' }}>
          <div className="flex flex-wrap gap-2 p-4 border-b border-[#E2E8F0]">
            {tabs.map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'bg-[#6366F1] text-white hover:bg-[#4F46E5]'
                      : 'bg-[#F8FAFC] text-[#64748B] hover:bg-[#F1F5F9]'
                  }`}
                  style={activeTab === tab.id ? { boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' } : {}}
                >
                  <Icon className="w-5 h-5" />
                  {tab.label}
                </button>
              );
            })}
          </div>

          <div className="p-6">
            {/* Contenido de las tabs */}
            {activeTab === 'gestor' && (
              <GestorRecursos 
                onCrearRecurso={handleCrearRecurso}
                onEditarRecurso={handleEditarRecurso}
              />
            )}

            {activeTab === 'salas' && <SalasDisponibles />}

            {activeTab === 'aforo' && <ControlAforo />}

            {activeTab === 'bloqueos' && <BloqueosMantenimiento />}

            {activeTab === 'material' && <MaterialDisponible />}

            {activeTab === 'reservas' && <ReservasSalas />}

            {activeTab === 'mantenimiento' && <MantenimientoPreventivo />}

            {activeTab === 'analytics' && <AnalyticsRecursos />}
          </div>
        </div>

        {/* Info adicional */}
        <div className="bg-gradient-to-r from-[#DBEAFE] to-[#EEF2FF] rounded-2xl border border-[#3B82F6] p-6">
          <h3 className="font-semibold text-[20px] leading-7 text-[#0F172A] mb-2 flex items-center gap-2">
            <Building2 className="w-5 h-5 text-[#3B82F6]" />
            Información del Módulo
          </h3>
          <p className="text-[#0F172A] text-[14px] leading-5">
            <strong>Nota:</strong> El módulo de Recursos / Salas / Material es específico para gimnasios y centros 
            que manejan múltiples espacios físicos y equipamiento. Los entrenadores personales que trabajan solos 
            no necesitan este módulo porque no gestionan salas ni material compartido. El sistema optimiza la 
            utilización de espacios, controla el aforo según normativas, gestiona mantenimientos y asegura que 
            los recursos estén disponibles cuando se necesiten.
          </p>
        </div>
      </div>
    </div>
  );
}

