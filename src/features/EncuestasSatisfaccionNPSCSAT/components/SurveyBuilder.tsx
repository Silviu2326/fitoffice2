import { useState } from 'react';
import { Plus, Trash2, GripVertical, Save } from 'lucide-react';

interface Question {
  id: string;
  type: 'nps' | 'csat' | 'text';
  text: string;
  required: boolean;
}

export default function SurveyBuilder() {
  const [surveyTitle, setSurveyTitle] = useState('');
  const [surveyType, setSurveyType] = useState<'nps' | 'csat'>('nps');
  const [questions, setQuestions] = useState<Question[]>([
    { id: '1', type: 'nps', text: '¿Qué tan probable es que recomiendes nuestro servicio?', required: true }
  ]);

  const addQuestion = (type: 'nps' | 'csat' | 'text') => {
    const newQuestion: Question = {
      id: Date.now().toString(),
      type,
      text: '',
      required: false
    };
    setQuestions([...questions, newQuestion]);
  };

  const updateQuestion = (id: string, field: keyof Question, value: any) => {
    setQuestions(questions.map(q => 
      q.id === id ? { ...q, [field]: value } : q
    ));
  };

  const removeQuestion = (id: string) => {
    setQuestions(questions.filter(q => q.id !== id));
  };

  const handleSave = () => {
    console.log('Survey:', { title: surveyTitle, type: surveyType, questions });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#0F172A]">Constructor de Encuestas</h2>
          <p className="text-[#64748B] mt-1">Crea encuestas personalizadas para tus clientes</p>
        </div>
        <button 
          onClick={handleSave}
          className="flex items-center gap-2 px-4 py-2 bg-[#6366F1] hover:bg-[#4F46E5] text-white rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-200"
        >
          <Save className="w-5 h-5" />
          Guardar Encuesta
        </button>
      </div>

      {/* Survey Settings */}
      <div className="bg-white rounded-xl border border-[#E2E8F0] p-6 shadow-md">
        <h3 className="text-lg font-semibold text-[#0F172A] mb-4">Configuración General</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-[#0F172A] font-semibold mb-2">Título de la Encuesta</label>
            <input
              type="text"
              value={surveyTitle}
              onChange={(e) => setSurveyTitle(e.target.value)}
              className="w-full px-4 py-3 bg-white border border-[#E2E8F0] rounded-lg text-[#0F172A] placeholder-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#6366F1] focus:border-transparent transition-all duration-200"
              placeholder="Ej: Encuesta de Satisfacción General"
            />
          </div>
          <div>
            <label className="block text-[#0F172A] font-semibold mb-2">Tipo Principal</label>
            <div className="flex gap-4">
              <button
                onClick={() => setSurveyType('nps')}
                className={`flex-1 px-4 py-3 rounded-lg border-2 transition-all duration-200 ${
                  surveyType === 'nps'
                    ? 'border-[#6366F1] bg-[#EEF2FF] text-[#6366F1] shadow-sm'
                    : 'border-[#E2E8F0] text-[#64748B] hover:border-[#6366F1]'
                }`}
              >
                <div className="font-semibold">NPS</div>
                <div className="text-xs">Net Promoter Score</div>
              </button>
              <button
                onClick={() => setSurveyType('csat')}
                className={`flex-1 px-4 py-3 rounded-lg border-2 transition-all duration-200 ${
                  surveyType === 'csat'
                    ? 'border-[#3B82F6] bg-[#DBEAFE] text-[#3B82F6] shadow-sm'
                    : 'border-[#E2E8F0] text-[#64748B] hover:border-[#3B82F6]'
                }`}
              >
                <div className="font-semibold">CSAT</div>
                <div className="text-xs">Customer Satisfaction</div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Questions */}
      <div className="bg-white rounded-xl border border-[#E2E8F0] p-6 shadow-md">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-[#0F172A]">Preguntas</h3>
          <div className="flex gap-2">
            <button
              onClick={() => addQuestion('nps')}
              className="px-3 py-2 bg-[#6366F1] hover:bg-[#4F46E5] text-white text-sm rounded-lg font-medium shadow-sm hover:shadow-md transition-all duration-200"
            >
              + NPS
            </button>
            <button
              onClick={() => addQuestion('csat')}
              className="px-3 py-2 bg-[#3B82F6] hover:bg-[#2563EB] text-white text-sm rounded-lg font-medium shadow-sm hover:shadow-md transition-all duration-200"
            >
              + CSAT
            </button>
            <button
              onClick={() => addQuestion('text')}
              className="px-3 py-2 bg-[#64748B] hover:bg-[#475569] text-white text-sm rounded-lg font-medium shadow-sm hover:shadow-md transition-all duration-200"
            >
              + Texto
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {questions.map((question, index) => (
            <div
              key={question.id}
              className="bg-[#F8FAFC] rounded-lg border border-[#E2E8F0] p-4"
            >
              <div className="flex items-start gap-3">
                <button className="mt-2 text-[#94A3B8] hover:text-[#64748B] cursor-move">
                  <GripVertical className="w-5 h-5" />
                </button>
                
                <div className="flex-1 space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="text-[#64748B] font-semibold">#{index + 1}</span>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      question.type === 'nps' ? 'bg-[#EEF2FF] text-[#6366F1]' :
                      question.type === 'csat' ? 'bg-[#DBEAFE] text-[#3B82F6]' :
                      'bg-[#F1F5F9] text-[#64748B]'
                    }`}>
                      {question.type.toUpperCase()}
                    </span>
                  </div>
                  
                  <input
                    type="text"
                    value={question.text}
                    onChange={(e) => updateQuestion(question.id, 'text', e.target.value)}
                    className="w-full px-4 py-2 bg-white border border-[#E2E8F0] rounded-lg text-[#0F172A] placeholder-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#6366F1] focus:border-transparent transition-all duration-200"
                    placeholder="Escribe tu pregunta aquí..."
                  />
                  
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id={`required-${question.id}`}
                      checked={question.required}
                      onChange={(e) => updateQuestion(question.id, 'required', e.target.checked)}
                      className="w-4 h-4 rounded border-[#E2E8F0] bg-white text-[#6366F1] focus:ring-2 focus:ring-[#6366F1]"
                    />
                    <label htmlFor={`required-${question.id}`} className="text-sm text-[#64748B]">
                      Pregunta obligatoria
                    </label>
                  </div>
                </div>
                
                <button
                  onClick={() => removeQuestion(question.id)}
                  className="mt-2 text-[#EF4444] hover:text-[#DC2626] transition-all duration-200"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Preview */}
      <div className="bg-white rounded-xl border border-[#E2E8F0] p-6 shadow-md">
        <h3 className="text-lg font-semibold text-[#0F172A] mb-4">Vista Previa</h3>
        <div className="bg-[#F8FAFC] rounded-lg p-6 border border-[#E2E8F0]">
          <h4 className="text-xl font-bold text-[#0F172A] mb-4">
            {surveyTitle || 'Título de la encuesta'}
          </h4>
          <div className="space-y-4">
            {questions.map((question, index) => (
              <div key={question.id} className="text-[#64748B]">
                <p className="text-[#0F172A] font-medium">
                  {index + 1}. {question.text || 'Pregunta sin título'}
                  {question.required && <span className="text-[#EF4444] ml-1">*</span>}
                </p>
                <p className="text-sm mt-1">
                  {question.type === 'nps' && 'Escala 0-10'}
                  {question.type === 'csat' && 'Escala 1-5 estrellas'}
                  {question.type === 'text' && 'Respuesta de texto'}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

