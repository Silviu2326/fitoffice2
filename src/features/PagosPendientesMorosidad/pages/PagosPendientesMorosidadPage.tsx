import { useState } from 'react';
import { AlertCircle } from 'lucide-react';
import DashboardMorosidad from '../components/DashboardMorosidad';
import MorosidadList from '../components/MorosidadList';
import AlertasVencidos from '../components/AlertasVencidos';
import GestorRecordatorios from '../components/GestorRecordatorios';
import SeguimientoPagos from '../components/SeguimientoPagos';
import ReportesMorosidad from '../components/ReportesMorosidad';
import ClasificadorRiesgo from '../components/ClasificadorRiesgo';
import EstrategiasCobro from '../components/EstrategiasCobro';

type TabType = 
  | 'dashboard' 
  | 'lista' 
  | 'alertas' 
  | 'recordatorios' 
  | 'seguimiento' 
  | 'reportes' 
  | 'riesgo' 
  | 'estrategias';

export default function PagosPendientesMorosidadPage() {
  const [tabActiva, setTabActiva] = useState<TabType>('dashboard');

  const tabs: { id: TabType; label: string; icon: string }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'lista', label: 'Lista Morosidad', icon: '📋' },
    { id: 'alertas', label: 'Alertas', icon: '🔔' },
    { id: 'recordatorios', label: 'Recordatorios', icon: '📨' },
    { id: 'seguimiento', label: 'Seguimiento', icon: '📝' },
    { id: 'reportes', label: 'Reportes', icon: '📈' },
    { id: 'riesgo', label: 'Clasificador Riesgo', icon: '🛡️' },
    { id: 'estrategias', label: 'Estrategias', icon: '🎯' },
  ];

  const renderContent = () => {
    switch (tabActiva) {
      case 'dashboard':
        return <DashboardMorosidad />;
      case 'lista':
        return <MorosidadList />;
      case 'alertas':
        return <AlertasVencidos />;
      case 'recordatorios':
        return <GestorRecordatorios />;
      case 'seguimiento':
        return <SeguimientoPagos />;
      case 'reportes':
        return <ReportesMorosidad />;
      case 'riesgo':
        return <ClasificadorRiesgo />;
      case 'estrategias':
        return <EstrategiasCobro />;
      default:
        return <DashboardMorosidad />;
    }
  };

  return (
    <div className="flex-1 overflow-auto bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 bg-[#FEE2E2] rounded-[16px]">
              <AlertCircle className="w-8 h-8 text-[#EF4444]" />
            </div>
            <div>
              <h1 className="text-[30px] leading-[38px] font-bold text-[#0F172A]">Pagos Pendientes & Morosidad</h1>
              <p className="text-[16px] leading-[24px] text-[#64748B]">Sistema de gestión de morosidad y cobros pendientes</p>
            </div>
          </div>

          {/* Banner Informativo */}
          <div className="mt-4 bg-gradient-to-r from-[#EF4444] to-[#F59E0B] rounded-[16px] p-6 text-white shadow-md">
            <div className="flex items-start gap-4">
              <div className="text-4xl">⚠️</div>
              <div>
                <h3 className="text-[20px] leading-[28px] font-semibold mb-2">Sistema de Gestión de Morosidad</h3>
                <p className="text-white text-opacity-90 text-[16px] leading-[24px]">
                  <strong>¿Quién me debe dinero ahora mismo?</strong> Gestiona de forma eficiente todos tus pagos pendientes,
                  envía recordatorios automáticos, clasifica el riesgo de cada cliente y optimiza la recuperación de cobros.
                  "Le duele igual al entrenador y al gym" - Este módulo minimiza las pérdidas por morosidad.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs de Navegación */}
        <div className="mb-6 bg-white rounded-[16px] shadow-md border border-[#E2E8F0] p-2">
          <div className="flex flex-wrap gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setTabActiva(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-[12px] font-semibold transition-all duration-200 ${
                  tabActiva === tab.id
                    ? 'bg-[#6366F1] text-white shadow-md hover:bg-[#4F46E5]'
                    : 'text-[#64748B] hover:bg-[#F8FAFC]'
                }`}
              >
                <span className="text-lg">{tab.icon}</span>
                <span className="text-[14px] leading-[20px]">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Contenido Principal */}
        <div className="transition-all duration-200">
          {renderContent()}
        </div>

        {/* Footer Informativo */}
        <div className="mt-8 bg-[#DBEAFE] border border-[#3B82F6] rounded-[12px] p-4">
          <div className="flex items-start gap-3">
            <div className="text-2xl">💡</div>
            <div className="flex-1">
              <h4 className="font-semibold text-[#3B82F6] mb-1 text-[16px] leading-[24px]">Niveles de Morosidad</h4>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-2 text-[14px] leading-[20px]">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-[#10B981] rounded-full"></div>
                  <span className="text-[#0F172A]"><strong>Verde:</strong> 1-7 días</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-[#F59E0B] rounded-full"></div>
                  <span className="text-[#0F172A]"><strong>Amarillo:</strong> 8-15 días</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-[#F59E0B] rounded-full"></div>
                  <span className="text-[#0F172A]"><strong>Naranja:</strong> 16-30 días</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-[#EF4444] rounded-full"></div>
                  <span className="text-[#0F172A]"><strong>Rojo:</strong> 31-60 días</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-[#0F172A] rounded-full"></div>
                  <span className="text-[#0F172A]"><strong>Negro:</strong> +60 días</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

