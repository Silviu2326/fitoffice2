import { BarChart3, TrendingUp, Users, Clock } from 'lucide-react';

export default function AnalyticsPersonal() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-[#F1F5F9]">Analytics de Personal</h2>
        <select className="px-4 py-2 bg-[#2A2A3A] text-[#F1F5F9] rounded-lg border border-[#475569] font-medium shadow-sm hover:bg-[#334155] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#6366F1] focus:ring-offset-2">
          <option>Último mes</option>
          <option>Últimos 3 meses</option>
          <option>Último año</option>
        </select>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <div className="bg-[#1E1E2E] rounded-xl p-4 border border-[#334155] shadow-md transition-all duration-200 hover:shadow-lg">
          <div className="flex items-center gap-3 mb-2">
            <Users className="w-5 h-5 text-[#6366F1]" />
            <h3 className="text-[#94A3B8] text-sm font-medium">Personal Total</h3>
          </div>
          <p className="text-3xl font-bold text-[#F1F5F9]">12</p>
          <p className="text-sm text-[#10B981] mt-1 font-medium">+2 este mes</p>
        </div>
        
        <div className="bg-[#1E1E2E] rounded-xl p-4 border border-[#334155] shadow-md transition-all duration-200 hover:shadow-lg">
          <div className="flex items-center gap-3 mb-2">
            <Clock className="w-5 h-5 text-[#3B82F6]" />
            <h3 className="text-[#94A3B8] text-sm font-medium">Horas Totales</h3>
          </div>
          <p className="text-3xl font-bold text-[#F1F5F9]">385</p>
          <p className="text-sm text-[#10B981] mt-1 font-medium">+15h vs anterior</p>
        </div>
        
        <div className="bg-[#1E1E2E] rounded-xl p-4 border border-[#334155] shadow-md transition-all duration-200 hover:shadow-lg">
          <div className="flex items-center gap-3 mb-2">
            <TrendingUp className="w-5 h-5 text-[#8B5CF6]" />
            <h3 className="text-[#94A3B8] text-sm font-medium">Ocupación</h3>
          </div>
          <p className="text-3xl font-bold text-[#F1F5F9]">87%</p>
          <p className="text-sm text-[#10B981] mt-1 font-medium">+5% vs anterior</p>
        </div>
        
        <div className="bg-[#1E1E2E] rounded-xl p-4 border border-[#334155] shadow-md transition-all duration-200 hover:shadow-lg">
          <div className="flex items-center gap-3 mb-2">
            <BarChart3 className="w-5 h-5 text-[#F59E0B]" />
            <h3 className="text-[#94A3B8] text-sm font-medium">Ausencias</h3>
          </div>
          <p className="text-3xl font-bold text-[#F1F5F9]">5</p>
          <p className="text-sm text-[#EF4444] mt-1 font-medium">+2 vs anterior</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-[#1E1E2E] rounded-xl p-6 border border-[#334155] shadow-md">
          <h3 className="text-lg font-semibold text-[#F1F5F9] mb-4">Rendimiento por Personal</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-[#F1F5F9] font-medium">Ana García</span>
                <span className="text-[#94A3B8] font-semibold">95%</span>
              </div>
              <div className="w-full bg-[#2A2A3A] rounded-full h-2 overflow-hidden">
                <div className="bg-gradient-to-r from-[#10B981] to-[#059669] h-2 rounded-full transition-all duration-300" style={{ width: '95%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-[#F1F5F9] font-medium">Carlos Martínez</span>
                <span className="text-[#94A3B8] font-semibold">88%</span>
              </div>
              <div className="w-full bg-[#2A2A3A] rounded-full h-2 overflow-hidden">
                <div className="bg-gradient-to-r from-[#10B981] to-[#059669] h-2 rounded-full transition-all duration-300" style={{ width: '88%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-[#F1F5F9] font-medium">Laura Rodríguez</span>
                <span className="text-[#94A3B8] font-semibold">92%</span>
              </div>
              <div className="w-full bg-[#2A2A3A] rounded-full h-2 overflow-hidden">
                <div className="bg-gradient-to-r from-[#10B981] to-[#059669] h-2 rounded-full transition-all duration-300" style={{ width: '92%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-[#F1F5F9] font-medium">Miguel Sánchez</span>
                <span className="text-[#94A3B8] font-semibold">78%</span>
              </div>
              <div className="w-full bg-[#2A2A3A] rounded-full h-2 overflow-hidden">
                <div className="bg-gradient-to-r from-[#F59E0B] to-[#D97706] h-2 rounded-full transition-all duration-300" style={{ width: '78%' }}></div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[#1E1E2E] rounded-xl p-6 border border-[#334155] shadow-md">
          <h3 className="text-lg font-semibold text-[#F1F5F9] mb-4">Distribución de Turnos</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#10B981] shadow-sm"></div>
                <span className="text-[#F1F5F9]">Turno Mañana</span>
              </div>
              <span className="text-[#F1F5F9] font-semibold">42%</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#6366F1] shadow-sm"></div>
                <span className="text-[#F1F5F9]">Turno Tarde</span>
              </div>
              <span className="text-[#F1F5F9] font-semibold">38%</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#8B5CF6] shadow-sm"></div>
                <span className="text-[#F1F5F9]">Turno Noche</span>
              </div>
              <span className="text-[#F1F5F9] font-semibold">20%</span>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-[#334155]">
            <h4 className="text-sm font-semibold text-[#94A3B8] mb-3">Estadísticas</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-[#94A3B8]">Total de turnos:</span>
                <span className="text-[#F1F5F9] font-semibold">156</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#94A3B8]">Cambios de turno:</span>
                <span className="text-[#F1F5F9] font-semibold">8</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#94A3B8]">Reemplazos:</span>
                <span className="text-[#F1F5F9] font-semibold">3</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#1E1E2E] rounded-xl p-6 border border-[#334155] shadow-md">
        <h3 className="text-lg font-semibold text-[#F1F5F9] mb-4">Métricas de Cobertura</h3>
        <div className="grid grid-cols-7 gap-2">
          {['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'].map((dia, index) => (
            <div key={index} className="text-center">
              <p className="text-[#94A3B8] text-xs font-medium mb-2">{dia}</p>
              <div className="space-y-1">
                <div className="bg-gradient-to-t from-[#10B981] to-[#059669] h-12 rounded-lg shadow-sm"></div>
                <div className="bg-gradient-to-t from-[#6366F1] to-[#4F46E5] h-10 rounded-lg shadow-sm"></div>
                <div className="bg-gradient-to-t from-[#8B5CF6] to-[#7C3AED] h-8 rounded-lg shadow-sm"></div>
              </div>
              <p className="text-[#F1F5F9] text-sm font-semibold mt-2">100%</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

