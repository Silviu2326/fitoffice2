import { Users, UserCheck, UserX, TrendingUp } from 'lucide-react';
import { Card, CardHeader, CardTitle } from '../../../components/ui';

/**
 * ClientStatus - Estado de clientes y actividad reciente
 * Actualizado según guía de estilos FitOffice v2.0
 */
export default function ClientStatus() {
  const clientStats = {
    total: 45,
    active: 42,
    inactive: 3,
    newThisMonth: 7
  };

  const recentClients = [
    { name: 'María González', status: 'active', lastActivity: 'Hoy', sessions: 12 },
    { name: 'Juan Pérez', status: 'active', lastActivity: 'Hoy', sessions: 8 },
    { name: 'Ana Martínez', status: 'active', lastActivity: 'Ayer', sessions: 15 },
    { name: 'Carlos Ruiz', status: 'active', lastActivity: 'Hace 2 días', sessions: 5 },
    { name: 'Laura López', status: 'inactive', lastActivity: 'Hace 7 días', sessions: 3 }
  ];

  return (
    <Card className="bg-[#1E1E2E] border-[#334155]">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Users className="w-5 h-5 text-[#6366F1]" />
          <CardTitle className="text-[#F1F5F9]">Estado de Clientes</CardTitle>
        </div>
      </CardHeader>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <div className="bg-[#2A2A3A] rounded-xl p-4 border border-[#334155]">
          <div className="flex items-center gap-2 mb-2">
            <Users className="w-4 h-4 text-[#3B82F6]" />
            <p className="text-[#94A3B8] text-xs font-medium">Total</p>
          </div>
          <p className="text-[#F1F5F9] text-2xl font-bold">{clientStats.total}</p>
        </div>
        <div className="bg-[#2A2A3A] rounded-xl p-4 border border-[#334155]">
          <div className="flex items-center gap-2 mb-2">
            <UserCheck className="w-4 h-4 text-[#10B981]" />
            <p className="text-[#94A3B8] text-xs font-medium">Activos</p>
          </div>
          <p className="text-[#F1F5F9] text-2xl font-bold">{clientStats.active}</p>
        </div>
        <div className="bg-[#2A2A3A] rounded-xl p-4 border border-[#334155]">
          <div className="flex items-center gap-2 mb-2">
            <UserX className="w-4 h-4 text-[#EF4444]" />
            <p className="text-[#94A3B8] text-xs font-medium">Inactivos</p>
          </div>
          <p className="text-[#F1F5F9] text-2xl font-bold">{clientStats.inactive}</p>
        </div>
        <div className="bg-gradient-to-br from-[#6366F1] to-[#4F46E5] rounded-xl p-4 shadow-md">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4 text-white" />
            <p className="text-[#EEF2FF] text-xs font-medium">Nuevos</p>
          </div>
          <p className="text-white text-2xl font-bold">{clientStats.newThisMonth}</p>
        </div>
      </div>

      {/* Recent Clients */}
      <div>
        <h3 className="text-[#F1F5F9] font-semibold text-sm mb-3">Clientes Recientes</h3>
        <div className="space-y-2">
          {recentClients.map((client, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 bg-[#2A2A3A] rounded-xl border border-[#334155] hover:border-[#6366F1] transition-all duration-200 cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-[#6366F1] to-[#4F46E5] rounded-full flex items-center justify-center shadow-sm">
                  <span className="text-white text-xs font-bold">
                    {client.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <p className="text-[#F1F5F9] text-sm font-medium">{client.name}</p>
                  <p className="text-[#94A3B8] text-xs">{client.lastActivity}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className={`w-2 h-2 rounded-full ${
                    client.status === 'active' ? 'bg-[#10B981]' : 'bg-[#EF4444]'
                  }`}
                />
                <span className="text-[#94A3B8] text-xs">{client.sessions} sesiones</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}

