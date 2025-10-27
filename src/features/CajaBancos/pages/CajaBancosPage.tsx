import { useState } from 'react';
import { Wallet, Calculator, Building2, CreditCard } from 'lucide-react';
import CajaManager from '../components/CajaManager';
import ArqueoCaja from '../components/ArqueoCaja';
import ConciliacionBancaria from '../components/ConciliacionBancaria';
import ControlTPV from '../components/ControlTPV';
import { Card } from '../../../components/ui';

type TabType = 'resumen' | 'arqueo' | 'conciliacion' | 'tpv';

/**
 * CajaBancosPage - Sistema de gestión de caja y bancos
 * Actualizado para usar el sistema de diseño FitOffice
 */
export default function CajaBancosPage() {
  const [activeTab, setActiveTab] = useState<TabType>('resumen');

  const tabs = [
    { id: 'resumen' as TabType, label: 'Resumen', icon: Wallet },
    { id: 'arqueo' as TabType, label: 'Arqueo de Caja', icon: Calculator },
    { id: 'conciliacion' as TabType, label: 'Conciliación Bancaria', icon: Building2 },
    { id: 'tpv' as TabType, label: 'Control TPV', icon: CreditCard }
  ];

  return (
    <div className="flex-1 overflow-auto bg-surface">
      <div className="p-8">
        {/* Header según sistema de diseño */}
        <div className="mb-8">
          <h1 className="text-h1 text-text-primary mb-2">
            💰 Caja & Bancos
          </h1>
          <p className="text-body text-text-secondary">
            Sistema de gestión de caja física y bancos para el control de efectivo y transacciones
          </p>
        </div>

        {/* Tabs con sistema de diseño */}
        <Card className="mb-6">
          <div className="flex flex-wrap gap-2 p-4 border-b border-border">
            {tabs.map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-normal ${
                    activeTab === tab.id
                      ? 'bg-primary text-white hover:bg-primary-600 shadow-md'
                      : 'bg-surface text-text-primary hover:bg-primary-50 border border-border'
                  }`}
                >
                  <Icon className="w-icon-md h-icon-md" />
                  {tab.label}
                </button>
              );
            })}
          </div>

          <div className="p-6">
            {activeTab === 'resumen' && <CajaManager />}
            {activeTab === 'arqueo' && <ArqueoCaja />}
            {activeTab === 'conciliacion' && <ConciliacionBancaria />}
            {activeTab === 'tpv' && <ControlTPV />}
          </div>
        </Card>
      </div>
    </div>
  );
}

