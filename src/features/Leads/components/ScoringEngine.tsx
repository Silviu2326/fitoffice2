import { TrendingUp, Award, Target, Zap } from 'lucide-react';

export default function ScoringEngine() {
  const scoringCriteria = [
    {
      category: 'Engagement',
      icon: TrendingUp,
      color: 'text-[#3B82F6]',
      bgColor: 'bg-[#DBEAFE]',
      items: [
        { name: 'Abrió email', points: 5, active: true },
        { name: 'Clic en enlace', points: 10, active: true },
        { name: 'Respondió mensaje', points: 15, active: true },
        { name: 'Completó formulario', points: 20, active: false },
      ],
    },
    {
      category: 'Interacciones',
      icon: Target,
      color: 'text-[#8B5CF6]',
      bgColor: 'bg-[#EDE9FE]',
      items: [
        { name: 'Visita a landing page', points: 8, active: true },
        { name: 'Descarga de contenido', points: 12, active: false },
        { name: 'Asistió a webinar', points: 25, active: false },
        { name: 'Solicitud de demo', points: 30, active: false },
      ],
    },
    {
      category: 'Perfil',
      icon: Award,
      color: 'text-[#10B981]',
      bgColor: 'bg-[#D1FAE5]',
      items: [
        { name: 'Información completa', points: 10, active: true },
        { name: 'Email corporativo', points: 5, active: false },
        { name: 'LinkedIn conectado', points: 8, active: false },
        { name: 'Referido por cliente', points: 15, active: false },
      ],
    },
    {
      category: 'Timing',
      icon: Zap,
      color: 'text-[#F59E0B]',
      bgColor: 'bg-[#FEF3C7]',
      items: [
        { name: 'Lead reciente (< 7 días)', points: 10, active: true },
        { name: 'Interacción en 24h', points: 15, active: false },
        { name: 'Múltiples visitas', points: 12, active: false },
        { name: 'Actividad constante', points: 20, active: false },
      ],
    },
  ];

  const leadScores = [
    { range: '0-30', label: 'Frío', color: 'text-[#3B82F6]', bg: 'bg-[#DBEAFE]', count: 12 },
    { range: '31-60', label: 'Tibio', color: 'text-[#F59E0B]', bg: 'bg-[#FEF3C7]', count: 8 },
    { range: '61-100', label: 'Caliente', color: 'text-[#EF4444]', bg: 'bg-[#FEE2E2]', count: 5 },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-[#0F172A]">Motor de Puntuación</h2>
        <p className="text-[#64748B] mt-1">
          Sistema automático de scoring basado en comportamiento e interacciones
        </p>
      </div>

      {/* Score Distribution */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {leadScores.map((score) => (
          <div
            key={score.range}
            className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-200"
          >
            <div className="flex items-center justify-between mb-2">
              <span className={`text-sm font-semibold ${score.color}`}>{score.label}</span>
              <span className={`px-3 py-1 ${score.bg} ${score.color} rounded-full text-xs font-semibold`}>
                {score.count} leads
              </span>
            </div>
            <p className="text-3xl font-bold text-[#0F172A] mb-1">{score.range}</p>
            <p className="text-xs text-[#64748B]">puntos</p>
          </div>
        ))}
      </div>

      {/* Scoring Criteria */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {scoringCriteria.map((category) => {
          const Icon = category.icon;
          return (
            <div
              key={category.category}
              className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-md"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className={`p-2 ${category.bgColor} rounded-lg`}>
                  <Icon className={`w-5 h-5 ${category.color}`} />
                </div>
                <h3 className="text-lg font-semibold text-[#0F172A]">{category.category}</h3>
              </div>

              <div className="space-y-3">
                {category.items.map((item, index) => (
                  <div
                    key={index}
                    className={`flex items-center justify-between p-3 rounded-lg ${
                      item.active
                        ? 'bg-[#D1FAE5] border border-[#10B981]'
                        : 'bg-[#F8FAFC] border border-[#E2E8F0]'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          item.active ? 'bg-[#10B981]' : 'bg-[#94A3B8]'
                        }`}
                      ></div>
                      <span
                        className={`text-sm font-medium ${
                          item.active ? 'text-[#0F172A]' : 'text-[#64748B]'
                        }`}
                      >
                        {item.name}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-sm font-bold ${
                          item.active ? 'text-[#10B981]' : 'text-[#94A3B8]'
                        }`}
                      >
                        +{item.points}
                      </span>
                      <span className="text-xs text-[#94A3B8]">pts</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Auto-scoring Info */}
      <div className="bg-gradient-to-r from-[#D1FAE5] to-[#A7F3D0] border border-[#10B981] rounded-2xl p-6 shadow-md">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-[#10B981] rounded-lg">
            <Zap className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-[#0F172A] mb-2">
              Scoring Automático Activado
            </h3>
            <p className="text-[#0F172A] text-sm mb-4">
              El sistema está calculando y actualizando automáticamente los scores de los leads
              basándose en sus interacciones y comportamiento. Los leads con scores altos (70+)
              se marcarán automáticamente como "calientes" para seguimiento prioritario.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-white rounded-full text-xs text-[#0F172A] font-medium shadow-sm">
                ✓ Seguimiento en tiempo real
              </span>
              <span className="px-3 py-1 bg-white rounded-full text-xs text-[#0F172A] font-medium shadow-sm">
                ✓ Notificaciones automáticas
              </span>
              <span className="px-3 py-1 bg-white rounded-full text-xs text-[#0F172A] font-medium shadow-sm">
                ✓ Segmentación inteligente
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

