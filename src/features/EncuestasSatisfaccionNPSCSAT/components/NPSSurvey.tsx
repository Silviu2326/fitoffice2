import { useState } from 'react';
import { ThumbsUp, ThumbsDown, Minus } from 'lucide-react';

export default function NPSSurvey() {
  const [selectedScore, setSelectedScore] = useState<number | null>(null);
  const [feedback, setFeedback] = useState('');

  const scores = Array.from({ length: 11 }, (_, i) => i);

  const getScoreColor = (score: number) => {
    if (score <= 6) return 'text-[#EF4444] border-[#EF4444]';
    if (score <= 8) return 'text-[#F59E0B] border-[#F59E0B]';
    return 'text-[#10B981] border-[#10B981]';
  };

  const getScoreCategory = (score: number) => {
    if (score <= 6) return { icon: ThumbsDown, label: 'Detractor', color: 'text-[#EF4444]' };
    if (score <= 8) return { icon: Minus, label: 'Neutral', color: 'text-[#F59E0B]' };
    return { icon: ThumbsUp, label: 'Promotor', color: 'text-[#10B981]' };
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('NPS Score:', selectedScore, 'Feedback:', feedback);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] rounded-xl p-6 shadow-lg">
        <h2 className="text-2xl font-bold text-white mb-2">Encuesta NPS - Net Promoter Score</h2>
        <p className="text-white/90">Queremos saber qué tan probable es que recomiendes nuestro gimnasio</p>
      </div>

      {/* Survey Form */}
      <div className="bg-white rounded-xl border border-[#E2E8F0] p-6 shadow-md">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Question */}
          <div>
            <label className="block text-[#0F172A] font-semibold mb-4 text-lg">
              ¿Qué tan probable es que recomiendes nuestro gimnasio a un amigo o colega?
            </label>
            <p className="text-[#64748B] text-sm mb-4">
              Selecciona un número del 0 (nada probable) al 10 (extremadamente probable)
            </p>

            {/* Score Selection */}
            <div className="grid grid-cols-11 gap-2 mb-4">
              {scores.map((score) => (
                <button
                  key={score}
                  type="button"
                  onClick={() => setSelectedScore(score)}
                  className={`
                    aspect-square rounded-lg border-2 font-bold text-lg
                    transition-all duration-200 hover:scale-110
                    ${selectedScore === score 
                      ? `${getScoreColor(score)} bg-[#F8FAFC] shadow-sm` 
                      : 'border-[#E2E8F0] text-[#64748B] hover:border-[#6366F1]'
                    }
                  `}
                >
                  {score}
                </button>
              ))}
            </div>

            {/* Labels */}
            <div className="flex justify-between text-sm text-[#64748B]">
              <span>Nada probable</span>
              <span>Extremadamente probable</span>
            </div>
          </div>

          {/* Category Display */}
          {selectedScore !== null && (
            <div className="bg-[#F8FAFC] rounded-lg p-4 border border-[#E2E8F0]">
              <div className="flex items-center gap-3">
                {(() => {
                  const category = getScoreCategory(selectedScore);
                  const Icon = category.icon;
                  return (
                    <>
                      <Icon className={`w-6 h-6 ${category.color}`} />
                      <div>
                        <p className="text-[#0F172A] font-semibold">
                          Puntuación: {selectedScore} - {category.label}
                        </p>
                        <p className="text-[#64748B] text-sm">
                          {selectedScore <= 6 && 'Identifica áreas de mejora críticas'}
                          {selectedScore > 6 && selectedScore <= 8 && 'Cliente satisfecho pero no entusiasta'}
                          {selectedScore > 8 && '¡Cliente promotor de tu marca!'}
                        </p>
                      </div>
                    </>
                  );
                })()}
              </div>
            </div>
          )}

          {/* Feedback */}
          <div>
            <label className="block text-[#0F172A] font-semibold mb-2">
              ¿Qué podríamos mejorar? (Opcional)
            </label>
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              className="w-full px-4 py-3 bg-white border border-[#E2E8F0] rounded-lg text-[#0F172A] placeholder-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#6366F1] focus:border-transparent transition-all duration-200"
              rows={4}
              placeholder="Comparte tus comentarios y sugerencias..."
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={selectedScore === null}
            className="w-full px-6 py-3 bg-[#6366F1] hover:bg-[#4F46E5] disabled:bg-[#94A3B8] disabled:cursor-not-allowed text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
          >
            Enviar Encuesta
          </button>
        </form>
      </div>

      {/* Info Card */}
      <div className="bg-[#EEF2FF] rounded-xl border border-[#6366F1]/20 p-4">
        <h3 className="text-[#0F172A] font-semibold mb-2">Sobre la Escala NPS</h3>
        <div className="space-y-2 text-sm text-[#64748B]">
          <p><span className="text-[#EF4444] font-semibold">0-6 Detractores:</span> Clientes insatisfechos que pueden dañar la reputación</p>
          <p><span className="text-[#F59E0B] font-semibold">7-8 Neutrales:</span> Clientes satisfechos pero no entusiastas</p>
          <p><span className="text-[#10B981] font-semibold">9-10 Promotores:</span> Clientes leales que recomendarán activamente</p>
        </div>
      </div>
    </div>
  );
}

