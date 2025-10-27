import { useState } from 'react';
import { Star, Frown, Meh, Smile, Laugh } from 'lucide-react';

interface Question {
  id: string;
  text: string;
  category: string;
}

export default function CSATSurvey() {
  const [ratings, setRatings] = useState<Record<string, number>>({});
  const [feedback, setFeedback] = useState('');

  const questions: Question[] = [
    { id: '1', text: '¿Qué tan satisfecho estás con la calidad de las clases?', category: 'Clases' },
    { id: '2', text: '¿Qué tan satisfechas están las instalaciones del gimnasio?', category: 'Instalaciones' },
    { id: '3', text: '¿Qué tan satisfecho estás con la atención de recepción?', category: 'Atención' },
    { id: '4', text: '¿Qué tan satisfecho estás con el equipamiento disponible?', category: 'Equipamiento' }
  ];

  const ratingIcons = [
    { value: 1, icon: Frown, label: 'Muy insatisfecho', color: 'text-[#EF4444]' },
    { value: 2, icon: Frown, label: 'Insatisfecho', color: 'text-[#F59E0B]' },
    { value: 3, icon: Meh, label: 'Neutral', color: 'text-[#F59E0B]' },
    { value: 4, icon: Smile, label: 'Satisfecho', color: 'text-[#10B981]' },
    { value: 5, icon: Laugh, label: 'Muy satisfecho', color: 'text-[#10B981]' }
  ];

  const handleRating = (questionId: string, rating: number) => {
    setRatings({ ...ratings, [questionId]: rating });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('CSAT Ratings:', ratings, 'Feedback:', feedback);
  };

  const getAverageRating = () => {
    const values = Object.values(ratings);
    if (values.length === 0) return 0;
    return (values.reduce((a, b) => a + b, 0) / values.length).toFixed(1);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#3B82F6] to-[#10B981] rounded-xl p-6 shadow-lg">
        <h2 className="text-2xl font-bold text-white mb-2">Encuesta CSAT - Customer Satisfaction</h2>
        <p className="text-white/90">Evalúa tu nivel de satisfacción con diferentes aspectos de nuestro servicio</p>
      </div>

      {/* Survey Form */}
      <div className="bg-white rounded-xl border border-[#E2E8F0] p-6 shadow-md">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Questions */}
          {questions.map((question) => (
            <div key={question.id} className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-[#0F172A] font-semibold">{question.text}</label>
                <span className="text-xs px-3 py-1 bg-[#DBEAFE] text-[#3B82F6] rounded-full font-medium">
                  {question.category}
                </span>
              </div>

              {/* Rating Options */}
              <div className="grid grid-cols-5 gap-3">
                {ratingIcons.map(({ value, icon: Icon, label, color }) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => handleRating(question.id, value)}
                    className={`
                      flex flex-col items-center gap-2 p-4 rounded-lg border-2
                      transition-all duration-200 hover:scale-105
                      ${ratings[question.id] === value
                        ? 'border-[#6366F1] bg-[#F8FAFC] shadow-sm'
                        : 'border-[#E2E8F0] hover:border-[#6366F1]'
                      }
                    `}
                  >
                    <Icon className={`w-8 h-8 ${ratings[question.id] === value ? color : 'text-[#94A3B8]'}`} />
                    <span className="text-xs text-[#64748B] text-center">{label}</span>
                  </button>
                ))}
              </div>
            </div>
          ))}

          {/* Average Display */}
          {Object.keys(ratings).length > 0 && (
            <div className="bg-[#F8FAFC] rounded-lg p-4 border border-[#E2E8F0]">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[#0F172A] font-semibold">Satisfacción Promedio</p>
                  <p className="text-[#64748B] text-sm">Basado en {Object.keys(ratings).length} respuestas</p>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-6 h-6 text-[#10B981] fill-[#10B981]" />
                  <span className="text-3xl font-bold text-[#0F172A]">{getAverageRating()}</span>
                  <span className="text-[#64748B]">/5</span>
                </div>
              </div>
            </div>
          )}

          {/* Feedback */}
          <div>
            <label className="block text-[#0F172A] font-semibold mb-2">
              Comentarios Adicionales (Opcional)
            </label>
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              className="w-full px-4 py-3 bg-white border border-[#E2E8F0] rounded-lg text-[#0F172A] placeholder-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#6366F1] focus:border-transparent transition-all duration-200"
              rows={4}
              placeholder="Comparte más detalles sobre tu experiencia..."
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={Object.keys(ratings).length === 0}
            className="w-full px-6 py-3 bg-[#6366F1] hover:bg-[#4F46E5] disabled:bg-[#94A3B8] disabled:cursor-not-allowed text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
          >
            Enviar Evaluación
          </button>
        </form>
      </div>

      {/* Info Card */}
      <div className="bg-[#EEF2FF] rounded-xl border border-[#6366F1]/20 p-4">
        <h3 className="text-[#0F172A] font-semibold mb-2">Sobre la Escala CSAT</h3>
        <p className="text-sm text-[#64748B]">
          La escala CSAT (Customer Satisfaction Score) evalúa la satisfacción en una escala del 1 al 5, 
          donde 1 es muy insatisfecho y 5 es muy satisfecho. Esta métrica ayuda a identificar 
          áreas específicas de mejora en el servicio.
        </p>
      </div>
    </div>
  );
}

