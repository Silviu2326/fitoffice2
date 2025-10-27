import { TrendingUp, TrendingDown, Users, Target, BarChart3, Award } from 'lucide-react';

export default function SatisfactionDashboard() {
  const npsScore = 42;
  const csatScore = 4.2;
  const responseRate = 68;

  const getNPSColor = (score: number) => {
    if (score < 0) return 'text-red-500';
    if (score < 50) return 'text-yellow-500';
    return 'text-emerald-500';
  };

  const trendsData = [
    { month: 'Jun', nps: 35, csat: 3.8 },
    { month: 'Jul', nps: 38, csat: 4.0 },
    { month: 'Ago', nps: 40, csat: 4.1 },
    { month: 'Sep', nps: 42, csat: 4.2 }
  ];

  const categoryScores = [
    { category: 'Clases', score: 4.5, responses: 45, trend: 'up' },
    { category: 'Instalaciones', score: 4.0, responses: 43, trend: 'up' },
    { category: 'Atención', score: 4.3, responses: 40, trend: 'down' },
    { category: 'Equipamiento', score: 3.8, responses: 38, trend: 'up' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-[#0F172A]">Dashboard de Satisfacción</h2>
        <p className="text-[#64748B] mt-1">Métricas y tendencias de satisfacción del cliente</p>
      </div>

      {/* Main Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* NPS Card */}
        <div className="bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] rounded-xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-white/20 p-3 rounded-lg">
              <Target className="w-6 h-6 text-white" />
            </div>
            <div className="flex items-center gap-1 text-white/80 text-sm">
              <TrendingUp className="w-4 h-4" />
              <span>+5% vs mes anterior</span>
            </div>
          </div>
          <h3 className="text-white/80 text-sm mb-1">Net Promoter Score</h3>
          <div className="flex items-end gap-2">
            <span className={`text-5xl font-bold text-white`}>{npsScore > 0 ? '+' : ''}{npsScore}</span>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-2 text-sm">
            <div>
              <p className="text-white/60">Promotores</p>
              <p className="text-white font-bold">58%</p>
            </div>
            <div>
              <p className="text-white/60">Neutrales</p>
              <p className="text-white font-bold">26%</p>
            </div>
            <div>
              <p className="text-white/60">Detractores</p>
              <p className="text-white font-bold">16%</p>
            </div>
          </div>
        </div>

        {/* CSAT Card */}
        <div className="bg-gradient-to-br from-[#10B981] to-[#059669] rounded-xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-white/20 p-3 rounded-lg">
              <Award className="w-6 h-6 text-white" />
            </div>
            <div className="flex items-center gap-1 text-white/80 text-sm">
              <TrendingUp className="w-4 h-4" />
              <span>+0.3 vs mes anterior</span>
            </div>
          </div>
          <h3 className="text-white/80 text-sm mb-1">CSAT Score</h3>
          <div className="flex items-end gap-2">
            <span className="text-5xl font-bold text-white">{csatScore}</span>
            <span className="text-2xl text-white/80 mb-1">/5.0</span>
          </div>
          <div className="mt-4">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-white/60">Satisfacción promedio</span>
              <span className="text-white font-bold">{(csatScore / 5 * 100).toFixed(0)}%</span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-2">
              <div 
                className="bg-white rounded-full h-2 transition-all duration-200"
                style={{ width: `${(csatScore / 5 * 100)}%` }}
              />
            </div>
          </div>
        </div>

        {/* Response Rate Card */}
        <div className="bg-gradient-to-br from-[#3B82F6] to-[#2563EB] rounded-xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-white/20 p-3 rounded-lg">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div className="flex items-center gap-1 text-white/80 text-sm">
              <TrendingUp className="w-4 h-4" />
              <span>+8% vs mes anterior</span>
            </div>
          </div>
          <h3 className="text-white/80 text-sm mb-1">Tasa de Respuesta</h3>
          <div className="flex items-end gap-2">
            <span className="text-5xl font-bold text-white">{responseRate}</span>
            <span className="text-2xl text-white/80 mb-1">%</span>
          </div>
          <div className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-white/60">Encuestas enviadas</span>
              <span className="text-white font-bold">113</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/60">Respuestas recibidas</span>
              <span className="text-white font-bold">77</span>
            </div>
          </div>
        </div>
      </div>

      {/* Trends Chart */}
      <div className="bg-white rounded-xl border border-[#E2E8F0] p-6 shadow-md">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-[#0F172A]">Tendencia de Métricas</h3>
          <div className="flex gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#6366F1]" />
              <span className="text-[#64748B]">NPS</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#10B981]" />
              <span className="text-[#64748B]">CSAT</span>
            </div>
          </div>
        </div>
        <div className="flex items-end justify-between gap-4 h-48">
          {trendsData.map((data, index) => (
            <div key={index} className="flex-1 flex flex-col items-center gap-2">
              <div className="w-full flex flex-col items-center gap-1">
                <div className="w-full bg-[#EEF2FF] rounded-t-lg flex flex-col justify-end" style={{ height: `${data.nps * 2}px` }}>
                  <div className="bg-[#6366F1] rounded-t-lg h-full flex items-start justify-center pt-2">
                    <span className="text-white text-xs font-bold">{data.nps}</span>
                  </div>
                </div>
                <div className="w-full bg-[#D1FAE5] rounded-t-lg flex flex-col justify-end" style={{ height: `${data.csat * 30}px` }}>
                  <div className="bg-[#10B981] rounded-t-lg h-full flex items-start justify-center pt-2">
                    <span className="text-white text-xs font-bold">{data.csat}</span>
                  </div>
                </div>
              </div>
              <span className="text-[#64748B] text-sm">{data.month}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Category Scores */}
      <div className="bg-white rounded-xl border border-[#E2E8F0] p-6 shadow-md">
        <h3 className="text-lg font-semibold text-[#0F172A] mb-4">Satisfacción por Categoría</h3>
        <div className="space-y-4">
          {categoryScores.map((item, index) => (
            <div key={index} className="flex items-center gap-4">
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <span className="text-[#0F172A] font-medium">{item.category}</span>
                    {item.trend === 'up' ? (
                      <TrendingUp className="w-4 h-4 text-[#10B981]" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-[#EF4444]" />
                    )}
                  </div>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="text-[#64748B]">{item.responses} respuestas</span>
                    <span className="text-[#0F172A] font-bold">{item.score}/5.0</span>
                  </div>
                </div>
                <div className="w-full bg-[#F1F5F9] rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-[#10B981] to-[#059669] rounded-full h-2 transition-all duration-200"
                    style={{ width: `${(item.score / 5 * 100)}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

