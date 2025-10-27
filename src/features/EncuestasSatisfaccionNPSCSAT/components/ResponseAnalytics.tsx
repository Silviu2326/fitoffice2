import { MessageSquare, ThumbsUp, ThumbsDown, Minus, TrendingUp } from 'lucide-react';

export default function ResponseAnalytics() {
  const recentResponses = [
    {
      id: '1',
      client: 'Ana Martínez',
      type: 'NPS',
      score: 9,
      category: 'Promotor',
      comment: '¡Excelente servicio! Las instalaciones son perfectas y el personal muy atento.',
      date: '2025-10-24',
      area: 'General'
    },
    {
      id: '2',
      client: 'Carlos Ruiz',
      type: 'CSAT',
      score: 4,
      category: 'Satisfecho',
      comment: 'Buena experiencia en general, aunque el equipamiento podría mejorarse.',
      date: '2025-10-23',
      area: 'Equipamiento'
    },
    {
      id: '3',
      client: 'Laura Gómez',
      type: 'NPS',
      score: 5,
      category: 'Detractor',
      comment: 'Las clases están sobresaturadas y no se consigue plaza fácilmente.',
      date: '2025-10-23',
      area: 'Clases'
    },
    {
      id: '4',
      client: 'Miguel Torres',
      type: 'CSAT',
      score: 5,
      category: 'Muy Satisfecho',
      comment: 'Todo perfecto, especialmente la atención del staff.',
      date: '2025-10-22',
      area: 'Atención'
    }
  ];

  const sentimentAnalysis = {
    positive: 62,
    neutral: 24,
    negative: 14
  };

  const topKeywords = [
    { word: 'instalaciones', count: 28, sentiment: 'positive' },
    { word: 'clases', count: 24, sentiment: 'neutral' },
    { word: 'atención', count: 22, sentiment: 'positive' },
    { word: 'equipamiento', count: 18, sentiment: 'negative' },
    { word: 'limpieza', count: 15, sentiment: 'positive' }
  ];

  const getCategoryIcon = (category: string) => {
    if (category === 'Promotor' || category === 'Muy Satisfecho') {
      return <ThumbsUp className="w-5 h-5 text-[#10B981]" />;
    }
    if (category === 'Detractor') {
      return <ThumbsDown className="w-5 h-5 text-[#EF4444]" />;
    }
    return <Minus className="w-5 h-5 text-[#F59E0B]" />;
  };

  const getCategoryColor = (category: string) => {
    if (category === 'Promotor' || category === 'Muy Satisfecho') {
      return 'bg-[#D1FAE5] text-[#10B981] border-[#10B981]/30';
    }
    if (category === 'Detractor') {
      return 'bg-[#FEE2E2] text-[#EF4444] border-[#EF4444]/30';
    }
    return 'bg-[#FEF3C7] text-[#F59E0B] border-[#F59E0B]/30';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-[#0F172A]">Análisis de Respuestas</h2>
        <p className="text-[#64748B] mt-1">Insights y tendencias de las respuestas de clientes</p>
      </div>

      {/* Sentiment Analysis */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-[#10B981] to-[#059669] rounded-xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <ThumbsUp className="w-6 h-6 text-white" />
            <TrendingUp className="w-5 h-5 text-white/60" />
          </div>
          <p className="text-white/80 text-sm mb-1">Respuestas Positivas</p>
          <p className="text-3xl font-bold text-white">{sentimentAnalysis.positive}%</p>
        </div>

        <div className="bg-gradient-to-br from-[#F59E0B] to-[#D97706] rounded-xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <Minus className="w-6 h-6 text-white" />
            <span className="text-white/60 text-sm">Estable</span>
          </div>
          <p className="text-white/80 text-sm mb-1">Respuestas Neutrales</p>
          <p className="text-3xl font-bold text-white">{sentimentAnalysis.neutral}%</p>
        </div>

        <div className="bg-gradient-to-br from-[#EF4444] to-[#DC2626] rounded-xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <ThumbsDown className="w-6 h-6 text-white" />
            <span className="text-white/60 text-sm">Atención</span>
          </div>
          <p className="text-white/80 text-sm mb-1">Respuestas Negativas</p>
          <p className="text-3xl font-bold text-white">{sentimentAnalysis.negative}%</p>
        </div>
      </div>

      {/* Top Keywords */}
      <div className="bg-white rounded-xl border border-[#E2E8F0] p-6 shadow-md">
        <h3 className="text-lg font-semibold text-[#0F172A] mb-4">Palabras Clave Más Mencionadas</h3>
        <div className="space-y-3">
          {topKeywords.map((keyword, index) => (
            <div key={index} className="flex items-center gap-4">
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <span className="text-[#0F172A] font-semibold capitalize">{keyword.word}</span>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      keyword.sentiment === 'positive' ? 'bg-[#D1FAE5] text-[#10B981]' :
                      keyword.sentiment === 'negative' ? 'bg-[#FEE2E2] text-[#EF4444]' :
                      'bg-[#FEF3C7] text-[#F59E0B]'
                    }`}>
                      {keyword.sentiment === 'positive' ? 'Positivo' : 
                       keyword.sentiment === 'negative' ? 'Negativo' : 'Neutral'}
                    </span>
                  </div>
                  <span className="text-[#64748B] text-sm">{keyword.count} menciones</span>
                </div>
                <div className="w-full bg-[#F1F5F9] rounded-full h-2">
                  <div 
                    className={`rounded-full h-2 transition-all duration-200 ${
                      keyword.sentiment === 'positive' ? 'bg-[#10B981]' :
                      keyword.sentiment === 'negative' ? 'bg-[#EF4444]' :
                      'bg-[#F59E0B]'
                    }`}
                    style={{ width: `${(keyword.count / 30 * 100)}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Responses */}
      <div className="bg-white rounded-xl border border-[#E2E8F0] p-6 shadow-md">
        <h3 className="text-lg font-semibold text-[#0F172A] mb-4">Respuestas Recientes</h3>
        <div className="space-y-4">
          {recentResponses.map((response) => (
            <div
              key={response.id}
              className="bg-[#F8FAFC] rounded-lg p-4 border border-[#E2E8F0]"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] rounded-full flex items-center justify-center text-white font-bold shadow-sm">
                    {response.client.charAt(0)}
                  </div>
                  <div>
                    <p className="text-[#0F172A] font-semibold">{response.client}</p>
                    <p className="text-[#64748B] text-sm">{response.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {getCategoryIcon(response.category)}
                  <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getCategoryColor(response.category)}`}>
                    {response.type} {response.score}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 mb-2">
                <span className="px-3 py-1 bg-[#DBEAFE] text-[#3B82F6] rounded-full text-xs font-medium">
                  {response.area}
                </span>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(response.category)}`}>
                  {response.category}
                </span>
              </div>

              <div className="flex items-start gap-2 mt-3">
                <MessageSquare className="w-4 h-4 text-[#94A3B8] mt-0.5 flex-shrink-0" />
                <p className="text-[#64748B] text-sm italic">&ldquo;{response.comment}&rdquo;</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Action Items */}
      <div className="bg-white rounded-xl border border-[#E2E8F0] p-6 shadow-md">
        <h3 className="text-lg font-semibold text-[#0F172A] mb-4">Acciones Recomendadas</h3>
        <div className="space-y-3">
          <div className="flex items-start gap-3 p-4 bg-[#FEE2E2] border border-[#EF4444]/30 rounded-lg">
            <ThumbsDown className="w-5 h-5 text-[#EF4444] mt-0.5" />
            <div>
              <p className="text-[#0F172A] font-semibold">3 Detractores Requieren Atención</p>
              <p className="text-[#64748B] text-sm">Contactar clientes insatisfechos para resolver problemas</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 bg-[#D1FAE5] border border-[#10B981]/30 rounded-lg">
            <ThumbsUp className="w-5 h-5 text-[#10B981] mt-0.5" />
            <div>
              <p className="text-[#0F172A] font-semibold">12 Promotores Disponibles</p>
              <p className="text-[#64748B] text-sm">Solicitar testimonios y referencias de clientes promotores</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

