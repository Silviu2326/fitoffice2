import { Users, TrendingUp, Calendar, DollarSign } from 'lucide-react';
import { Card } from '../../../components/ui';

interface DashboardOverviewProps {
  metrics: any;
}

/**
 * DashboardOverview - Métricas principales del dashboard
 * Actualizado según guía de estilos FitOffice v2.0
 */
export default function DashboardOverview({ metrics }: DashboardOverviewProps) {
  const stats = [
    {
      title: 'Clientes Activos',
      value: metrics?.activeClients || '45',
      change: '+12%',
      icon: Users,
      bgColor: 'bg-[#DBEAFE]',
      iconColor: 'text-[#3B82F6]'
    },
    {
      title: 'Sesiones de Hoy',
      value: metrics?.todaySessions || '8',
      change: '+5%',
      icon: Calendar,
      bgColor: 'bg-[#D1FAE5]',
      iconColor: 'text-[#10B981]'
    },
    {
      title: 'Ingresos del Mes',
      value: metrics?.monthlyRevenue || '€4,250',
      change: '+18%',
      icon: DollarSign,
      bgColor: 'bg-[#EEF2FF]',
      iconColor: 'text-[#6366F1]'
    },
    {
      title: 'Tasa de Adherencia',
      value: metrics?.adherenceRate || '87%',
      change: '+3%',
      icon: TrendingUp,
      bgColor: 'bg-[#FEF3C7]',
      iconColor: 'text-[#F59E0B]'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {stats.map((stat, index) => (
        <Card
          key={index}
          hover
          className="bg-[#1E1E2E] border-[#334155] hover:border-[#6366F1] transition-all duration-200"
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[#94A3B8] text-sm font-medium mb-1">{stat.title}</p>
              <h3 className="text-3xl font-bold text-[#F1F5F9] mb-2">{stat.value}</h3>
              <span className="text-[#10B981] text-sm font-semibold">{stat.change}</span>
            </div>
            <div className={`${stat.bgColor} p-3 rounded-xl shadow-sm`}>
              <stat.icon className={`w-6 h-6 ${stat.iconColor}`} />
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}

