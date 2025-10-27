import { useState } from 'react';
import GastosManager from '../components/GastosManager';
import ProveedoresList from '../components/ProveedoresList';
import CategoriasGastos from '../components/CategoriasGastos';
import OrdenesCompra from '../components/OrdenesCompra';
import MantenimientoCostos from '../components/MantenimientoCostos';
import ControlPresupuesto from '../components/ControlPresupuesto';
import EvaluacionProveedores from '../components/EvaluacionProveedores';
import ReportesGastos from '../components/ReportesGastos';
import { DollarSign, Users, Tag, FileText, Wrench, PieChart, Star, BarChart3 } from 'lucide-react';

type TabType = 'gastos' | 'proveedores' | 'categorias' | 'ordenes' | 'mantenimiento' | 'presupuesto' | 'evaluacion' | 'reportes';

export default function GastosProveedoresPage() {
  const [activeTab, setActiveTab] = useState<TabType>('gastos');

  const tabs = [
    { id: 'gastos' as TabType, label: 'Gastos', icon: DollarSign },
    { id: 'proveedores' as TabType, label: 'Proveedores', icon: Users },
    { id: 'categorias' as TabType, label: 'Categorías', icon: Tag },
    { id: 'ordenes' as TabType, label: 'Órdenes de Compra', icon: FileText },
    { id: 'mantenimiento' as TabType, label: 'Mantenimiento', icon: Wrench },
    { id: 'presupuesto' as TabType, label: 'Presupuesto', icon: PieChart },
    { id: 'evaluacion' as TabType, label: 'Evaluación', icon: Star },
    { id: 'reportes' as TabType, label: 'Reportes', icon: BarChart3 }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'gastos':
        return <GastosManager />;
      case 'proveedores':
        return <ProveedoresList />;
      case 'categorias':
        return <CategoriasGastos />;
      case 'ordenes':
        return <OrdenesCompra />;
      case 'mantenimiento':
        return <MantenimientoCostos />;
      case 'presupuesto':
        return <ControlPresupuesto />;
      case 'evaluacion':
        return <EvaluacionProveedores />;
      case 'reportes':
        return <ReportesGastos />;
      default:
        return <GastosManager />;
    }
  };

  return (
    <div className="flex-1 flex flex-col h-screen overflow-hidden">
      <div className="bg-white border-b border-[#E2E8F0] px-8 py-6">
        <div className="flex items-center gap-4">
          <div className="bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] p-3 rounded-xl shadow-md">
            <DollarSign className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-[#0F172A]">Gastos & Proveedores</h1>
            <p className="text-[#64748B] mt-1">Sistema completo de gestión de gastos y proveedores</p>
          </div>
        </div>
        <div className="mt-6 flex gap-2 overflow-x-auto pb-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-semibold transition-all duration-200 whitespace-nowrap ${
                  isActive 
                    ? 'bg-[#6366F1] text-white shadow-md hover:shadow-lg hover:bg-[#4F46E5]' 
                    : 'bg-[#F8FAFC] text-[#64748B] border border-[#E2E8F0] hover:bg-[#F1F5F9] hover:border-[#6366F1]'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>
      <div className="flex-1 overflow-y-auto bg-[#F8FAFC] p-8">
        <div className="max-w-7xl mx-auto">{renderContent()}</div>
      </div>
    </div>
  );
}

