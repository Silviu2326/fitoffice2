import { BarChart3, TrendingUp, TrendingDown, Users, Award } from 'lucide-react';

export default function ComparisonReports() {
  const teamComparison = [
    { team: 'Equipo A - Mañanas', nps: 48, csat: 4.5, responses: 45, trend: 'up' },
    { team: 'Equipo B - Tardes', nps: 42, csat: 4.2, responses: 38, trend: 'up' },
    { team: 'Equipo C - Noches', nps: 38, csat: 4.0, responses: 32, trend: 'down' },
    { team: 'Equipo D - Fines de Semana', nps: 45, csat: 4.3, responses: 28, trend: 'up' }
  ];

  const departmentComparison = [
    { dept: 'Clases Grupales', nps: 52, csat: 4.6, improvement: '+8%' },
    { dept: 'Entrenamiento Personal', nps: 58, csat: 4.8, improvement: '+12%' },
    { dept: 'Recepción', nps: 40, csat: 4.1, improvement: '+3%' },
    { dept: 'Mantenimiento', nps: 35, csat: 3.9, improvement: '-2%' },
    { dept: 'Nutrición', nps: 55, csat: 4.7, improvement: '+10%' }
  ];

  const periodComparison = [
    { period: 'Q1 2025', nps: 35, csat: 3.8, responses: 120 },
    { period: 'Q2 2025', nps: 38, csat: 4.0, responses: 145 },
    { period: 'Q3 2025', nps: 42, csat: 4.2, responses: 168 },
    { period: 'Q4 2025 (Actual)', nps: 45, csat: 4.4, responses: 77 }
  ];

  const getNPSColor = (score: number) => {
    if (score < 30) return 'text-[#EF4444]';
    if (score < 50) return 'text-[#F59E0B]';
    return 'text-[#10B981]';
  };

  const getCSATColor = (score: number) => {
    if (score < 3.5) return 'text-[#EF4444]';
    if (score < 4.2) return 'text-[#F59E0B]';
    return 'text-[#10B981]';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-[#0F172A]">Reportes Comparativos</h2>
        <p className="text-[#64748B] mt-1">Compara el rendimiento entre equipos, departamentos y períodos</p>
      </div>

      {/* Overall Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-4 border border-[#E2E8F0] shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <Users className="w-5 h-5 text-[#3B82F6]" />
            <p className="text-[#64748B] text-sm">Equipos Activos</p>
          </div>
          <p className="text-2xl font-bold text-[#0F172A]">4</p>
        </div>

        <div className="bg-white rounded-xl p-4 border border-[#E2E8F0] shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <Award className="w-5 h-5 text-[#10B981]" />
            <p className="text-[#64748B] text-sm">Mejor NPS</p>
          </div>
          <p className="text-2xl font-bold text-[#0F172A]">+58</p>
          <p className="text-xs text-[#64748B] mt-1">Entrenamiento Personal</p>
        </div>

        <div className="bg-white rounded-xl p-4 border border-[#E2E8F0] shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <Award className="w-5 h-5 text-[#6366F1]" />
            <p className="text-[#64748B] text-sm">Mejor CSAT</p>
          </div>
          <p className="text-2xl font-bold text-[#0F172A]">4.8</p>
          <p className="text-xs text-[#64748B] mt-1">Entrenamiento Personal</p>
        </div>

        <div className="bg-white rounded-xl p-4 border border-[#E2E8F0] shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-5 h-5 text-[#10B981]" />
            <p className="text-[#64748B] text-sm">Mejora Promedio</p>
          </div>
          <p className="text-2xl font-bold text-[#0F172A]">+6.2%</p>
          <p className="text-xs text-[#64748B] mt-1">vs trimestre anterior</p>
        </div>
      </div>

      {/* Team Comparison */}
      <div className="bg-white rounded-xl border border-[#E2E8F0] p-6 shadow-md">
        <div className="flex items-center gap-2 mb-6">
          <Users className="w-5 h-5 text-[#10B981]" />
          <h3 className="text-lg font-semibold text-[#0F172A]">Comparación por Equipos</h3>
        </div>
        <div className="space-y-4">
          {teamComparison.map((team, index) => (
            <div key={index} className="bg-[#F8FAFC] rounded-lg p-4 border border-[#E2E8F0]">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span className="text-[#0F172A] font-semibold">{team.team}</span>
                  {team.trend === 'up' ? (
                    <TrendingUp className="w-4 h-4 text-[#10B981]" />
                  ) : (
                    <TrendingDown className="w-4 h-4 text-[#EF4444]" />
                  )}
                </div>
                <span className="text-[#64748B] text-sm">{team.responses} respuestas</span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[#64748B] text-sm">NPS</span>
                    <span className={`font-bold ${getNPSColor(team.nps)}`}>+{team.nps}</span>
                  </div>
                  <div className="w-full bg-[#F1F5F9] rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] rounded-full h-2 transition-all duration-200"
                      style={{ width: `${(team.nps / 60) * 100}%` }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[#64748B] text-sm">CSAT</span>
                    <span className={`font-bold ${getCSATColor(team.csat)}`}>{team.csat}</span>
                  </div>
                  <div className="w-full bg-[#F1F5F9] rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-[#10B981] to-[#059669] rounded-full h-2 transition-all duration-200"
                      style={{ width: `${(team.csat / 5) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Department Comparison */}
      <div className="bg-white rounded-xl border border-[#E2E8F0] p-6 shadow-md">
        <div className="flex items-center gap-2 mb-6">
          <BarChart3 className="w-5 h-5 text-[#3B82F6]" />
          <h3 className="text-lg font-semibold text-[#0F172A]">Comparación por Departamentos</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#E2E8F0]">
                <th className="text-left py-3 px-4 text-[#64748B] font-semibold">Departamento</th>
                <th className="text-center py-3 px-4 text-[#64748B] font-semibold">NPS</th>
                <th className="text-center py-3 px-4 text-[#64748B] font-semibold">CSAT</th>
                <th className="text-center py-3 px-4 text-[#64748B] font-semibold">Mejora</th>
                <th className="text-center py-3 px-4 text-[#64748B] font-semibold">Ranking</th>
              </tr>
            </thead>
            <tbody>
              {departmentComparison
                .sort((a, b) => b.nps - a.nps)
                .map((dept, index) => (
                  <tr key={index} className="border-b border-[#F1F5F9] hover:bg-[#F8FAFC] transition-all duration-200">
                    <td className="py-3 px-4 text-[#0F172A] font-semibold">{dept.dept}</td>
                    <td className="text-center py-3 px-4">
                      <span className={`font-bold ${getNPSColor(dept.nps)}`}>+{dept.nps}</span>
                    </td>
                    <td className="text-center py-3 px-4">
                      <span className={`font-bold ${getCSATColor(dept.csat)}`}>{dept.csat}</span>
                    </td>
                    <td className="text-center py-3 px-4">
                      <span className={dept.improvement.startsWith('+') ? 'text-[#10B981] font-semibold' : 'text-[#EF4444] font-semibold'}>
                        {dept.improvement}
                      </span>
                    </td>
                    <td className="text-center py-3 px-4">
                      {index === 0 && (
                        <span className="inline-flex items-center gap-1 px-3 py-1 bg-[#D1FAE5] text-[#10B981] rounded-full text-xs font-medium">
                          <Award className="w-3 h-3" />
                          #1
                        </span>
                      )}
                      {index === 1 && (
                        <span className="px-3 py-1 bg-[#DBEAFE] text-[#3B82F6] rounded-full text-xs font-medium">
                          #2
                        </span>
                      )}
                      {index === 2 && (
                        <span className="px-3 py-1 bg-[#FEF3C7] text-[#F59E0B] rounded-full text-xs font-medium">
                          #3
                        </span>
                      )}
                      {index > 2 && (
                        <span className="text-[#64748B] text-xs">#{index + 1}</span>
                      )}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Period Comparison */}
      <div className="bg-white rounded-xl border border-[#E2E8F0] p-6 shadow-md">
        <div className="flex items-center gap-2 mb-6">
          <TrendingUp className="w-5 h-5 text-[#10B981]" />
          <h3 className="text-lg font-semibold text-[#0F172A]">Evolución Trimestral</h3>
        </div>
        <div className="space-y-4">
          {periodComparison.map((period, index) => (
            <div key={index} className="flex items-center gap-4">
              <div className="w-32">
                <p className="text-[#0F172A] font-semibold">{period.period}</p>
                <p className="text-[#64748B] text-sm">{period.responses} resp.</p>
              </div>
              <div className="flex-1 grid grid-cols-2 gap-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[#64748B] text-sm">NPS</span>
                    <span className={`font-bold ${getNPSColor(period.nps)}`}>+{period.nps}</span>
                  </div>
                  <div className="w-full bg-[#F1F5F9] rounded-full h-3">
                    <div 
                      className="bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] rounded-full h-3 transition-all duration-200"
                      style={{ width: `${(period.nps / 60) * 100}%` }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[#64748B] text-sm">CSAT</span>
                    <span className={`font-bold ${getCSATColor(period.csat)}`}>{period.csat}/5</span>
                  </div>
                  <div className="w-full bg-[#F1F5F9] rounded-full h-3">
                    <div 
                      className="bg-gradient-to-r from-[#10B981] to-[#059669] rounded-full h-3 transition-all duration-200"
                      style={{ width: `${(period.csat / 5) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

