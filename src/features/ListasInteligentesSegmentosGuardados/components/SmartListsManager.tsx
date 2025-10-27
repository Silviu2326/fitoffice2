import { List, Users, RefreshCw, TrendingUp, MoreVertical } from 'lucide-react';
import { useState } from 'react';

interface SmartList {
  id: string;
  name: string;
  criteria: string;
  count: number;
  trend: number;
  lastUpdate: string;
  autoUpdate: boolean;
}

export default function SmartListsManager() {
  const [smartLists] = useState<SmartList[]>([
    {
      id: '1',
      name: 'Mujeres 30-45 Bono Caducando',
      criteria: 'Género: Mujer, Edad: 30-45, Suscripción: Vence en 7 días',
      count: 23,
      trend: 5,
      lastUpdate: 'Hace 5 min',
      autoUpdate: true
    },
    {
      id: '2',
      name: 'Alta Adherencia - Upsell',
      criteria: 'Asistencia: >80%, Antigüedad: >6 meses',
      count: 45,
      trend: -2,
      lastUpdate: 'Hace 10 min',
      autoUpdate: true
    },
    {
      id: '3',
      name: 'Riesgo de Abandono',
      criteria: 'Asistencia: <30%, Últimos 30 días: 0 visitas',
      count: 18,
      trend: 3,
      lastUpdate: 'Hace 15 min',
      autoUpdate: true
    },
    {
      id: '4',
      name: 'Nuevos Miembros - Onboarding',
      criteria: 'Antigüedad: <30 días',
      count: 31,
      trend: 8,
      lastUpdate: 'Hace 1 min',
      autoUpdate: true
    }
  ]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-[24px] leading-8 font-semibold text-[#0F172A] flex items-center gap-2">
            <List className="w-6 h-6 text-[#6366F1]" />
            Listas Inteligentes
          </h2>
          <p className="text-[#64748B] mt-1 text-[14px] leading-5">
            Segmentos dinámicos que se actualizan automáticamente
          </p>
        </div>
        <button className="inline-flex items-center justify-center px-6 py-3 bg-[#6366F1] hover:bg-[#4F46E5] text-white rounded-xl transition-all duration-200 shadow-md hover:shadow-lg gap-2 font-semibold focus:outline-none focus:ring-2 focus:ring-[#6366F1] focus:ring-offset-2">
          <List className="w-5 h-5" />
          Nueva Lista
        </button>
      </div>

      {/* Smart Lists Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {smartLists.map((list) => (
          <div
            key={list.id}
            className="bg-[#FFFFFF] rounded-2xl p-6 border border-[#E2E8F0] hover:border-[#6366F1] transition-all duration-200 shadow-md hover:shadow-lg"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-[#EEF2FF]">
                  <Users className="w-5 h-5 text-[#6366F1]" />
                </div>
                <div>
                  <h3 className="text-[18px] leading-7 font-semibold text-[#0F172A]">{list.name}</h3>
                  <p className="text-[12px] leading-4 text-[#64748B] mt-1">{list.criteria}</p>
                </div>
              </div>
              <button className="p-2 hover:bg-[#F8FAFC] rounded-lg transition-colors duration-100">
                <MoreVertical className="w-4 h-4 text-[#64748B]" />
              </button>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[#64748B] text-[14px] leading-5">Clientes en lista</span>
                <div className="flex items-center gap-2">
                  <span className="text-[24px] leading-8 font-bold text-[#0F172A]">{list.count}</span>
                  <div className={`flex items-center gap-1 ${list.trend > 0 ? 'text-[#10B981]' : 'text-[#EF4444]'}`}>
                    <TrendingUp className={`w-4 h-4 ${list.trend < 0 ? 'rotate-180' : ''}`} />
                    <span className="text-[14px] leading-5">{Math.abs(list.trend)}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-[#E2E8F0]">
                <div className="flex items-center gap-2 text-[#64748B] text-[14px] leading-5">
                  <RefreshCw className="w-4 h-4" />
                  <span>{list.lastUpdate}</span>
                </div>
                {list.autoUpdate && (
                  <span className="px-3 py-1 bg-[#DBEAFE] text-[#3B82F6] rounded-full text-[12px] leading-4 font-medium">
                    Auto-actualización
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

