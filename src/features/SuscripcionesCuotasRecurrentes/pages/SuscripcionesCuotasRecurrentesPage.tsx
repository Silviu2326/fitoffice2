import { useState } from 'react';
import { RefreshCw, TrendingUp, Users, DollarSign } from 'lucide-react';
import SuscripcionesManager from '../components/SuscripcionesManager';
import GestorCuotas from '../components/GestorCuotas';
import UpgradeDowngrade from '../components/UpgradeDowngrade';
import FreezeSuscripcion from '../components/FreezeSuscripcion';
import Multisesion from '../components/Multisesion';
import ControlAcceso from '../components/ControlAcceso';
import RenovacionesAutomaticas from '../components/RenovacionesAutomaticas';
import AnalyticsSuscripciones from '../components/AnalyticsSuscripciones';

export default function SuscripcionesCuotasRecurrentesPage() {
  const [activeTab, setActiveTab] = useState('suscripciones');

  // Datos de ejemplo para las estadísticas
  const stats = [
    {
      title: 'Suscripciones Activas',
      value: '248',
      change: '+12%',
      icon: Users,
      color: 'emerald'
    },
    {
      title: 'Ingresos Recurrentes',
      value: '€15,240',
      change: '+8%',
      icon: DollarSign,
      color: 'blue'
    },
    {
      title: 'Tasa de Renovación',
      value: '94.2%',
      change: '+2.1%',
      icon: RefreshCw,
      color: 'purple'
    },
    {
      title: 'Tasa de Retención',
      value: '89.5%',
      change: '+1.5%',
      icon: TrendingUp,
      color: 'amber'
    }
  ];

  const tabs = [
    { id: 'suscripciones', label: 'Gestión de Suscripciones' },
    { id: 'cuotas', label: 'Cuotas Recurrentes' },
    { id: 'upgrade', label: 'Upgrade/Downgrade' },
    { id: 'freeze', label: 'Freeze de Suscripción' },
    { id: 'multisesion', label: 'Multisesión' },
    { id: 'acceso', label: 'Control de Acceso' },
    { id: 'renovaciones', label: 'Renovaciones Automáticas' },
    { id: 'analytics', label: 'Analytics' }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      emerald: 'from-emerald-500 to-teal-600',
      blue: 'from-blue-500 to-cyan-600',
      purple: 'from-purple-500 to-pink-600',
      amber: 'from-amber-500 to-orange-600'
    };
    return colors[color as keyof typeof colors] || colors.emerald;
  };

  return (
    <div className="flex-1 overflow-auto bg-[#F8FAFC]">
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-2">
            <div className="bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] p-3 rounded-xl shadow-lg">
              <RefreshCw className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-[#0F172A] leading-tight">
                Suscripciones & Cuotas Recurrentes
              </h1>
              <p className="text-[#64748B] mt-1 text-base">
                Sistema de gestión de suscripciones y cuotas recurrentes con lógica diferenciada
              </p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 border border-[#E2E8F0] hover:shadow-lg transition-all duration-200"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`bg-gradient-to-br ${getColorClasses(stat.color)} p-3 rounded-lg shadow-md`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-[#10B981] text-sm font-semibold">
                    {stat.change}
                  </span>
                </div>
                <h3 className="text-[#64748B] text-sm font-medium mb-1">
                  {stat.title}
                </h3>
                <p className="text-3xl font-bold text-[#0F172A]">{stat.value}</p>
              </div>
            );
          })}
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl border border-[#E2E8F0] mb-6 shadow-sm">
          <div className="flex overflow-x-auto scrollbar-hide">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-4 text-sm font-semibold whitespace-nowrap transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'text-[#6366F1] border-b-2 border-[#6366F1] bg-[#EEF2FF]'
                    : 'text-[#64748B] hover:text-[#0F172A] hover:bg-[#F8FAFC]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-sm">
          {activeTab === 'suscripciones' && <SuscripcionesManager />}
          {activeTab === 'cuotas' && <GestorCuotas />}
          {activeTab === 'upgrade' && <UpgradeDowngrade />}
          {activeTab === 'freeze' && <FreezeSuscripcion />}
          {activeTab === 'multisesion' && <Multisesion />}
          {activeTab === 'acceso' && <ControlAcceso />}
          {activeTab === 'renovaciones' && <RenovacionesAutomaticas />}
          {activeTab === 'analytics' && <AnalyticsSuscripciones />}
        </div>
      </div>
    </div>
  );
}
