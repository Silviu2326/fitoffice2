import { useState } from 'react';
import { Heart, MessageCircle, Send, Zap, Star, Smile } from 'lucide-react';

interface ContenidoMotivacionalProps {
  retoId: string;
  retoNombre: string;
}

export default function ContenidoMotivacional({ retoId, retoNombre }: ContenidoMotivacionalProps) {
  const [mensajeMotivacional, setMensajeMotivacional] = useState('');

  // Frases motivacionales predefinidas
  const frasesMotivacionales = [
    "¡No te rindas! Cada día es una nueva oportunidad para mejorar 💪",
    "El éxito es la suma de pequeños esfuerzos repetidos día tras día 🌟",
    "Tu único límite eres tú mismo. ¡Rompe barreras! 🚀",
    "El dolor de hoy es la fuerza de mañana 🔥",
    "No cuentes los días, haz que los días cuenten ⚡",
    "¡Estás haciendo un trabajo increíble! Sigue así 🎯",
    "La consistencia es la clave del éxito 🗝️",
    "Cree en ti mismo y todo será posible ✨",
  ];

  const consejosPracticos = [
    {
      titulo: "Establece rutinas",
      descripcion: "Crea hábitos diarios que te ayuden a mantener la constancia",
      icono: "📅",
    },
    {
      titulo: "Descansa adecuadamente",
      descripcion: "El descanso es parte fundamental del progreso",
      icono: "😴",
    },
    {
      titulo: "Hidrátate bien",
      descripcion: "Mantén tu cuerpo hidratado durante todo el día",
      icono: "💧",
    },
    {
      titulo: "Celebra pequeños logros",
      descripcion: "Cada paso cuenta, reconoce tu esfuerzo",
      icono: "🎉",
    },
  ];

  const handleEnviarMensaje = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí se implementaría el envío del mensaje
    alert(`Mensaje enviado: ${mensajeMotivacional}`);
    setMensajeMotivacional('');
  };

  const usarFrase = (frase: string) => {
    setMensajeMotivacional(frase);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#FEE2E2] to-[#FECACA] rounded-2xl p-6 border border-[#E2E8F0]">
        <div className="flex items-center gap-3 mb-2">
          <Heart className="w-8 h-8 text-[#EF4444]" />
          <h3 className="text-2xl font-bold text-[#0F172A]">Contenido Motivacional</h3>
        </div>
        <p className="text-[#64748B]">{retoNombre}</p>
      </div>

      {/* Enviar mensaje motivacional */}
      <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-md">
        <h4 className="font-bold text-[#0F172A] mb-4 flex items-center gap-2">
          <MessageCircle className="w-5 h-5 text-[#6366F1]" />
          Enviar Mensaje Motivacional
        </h4>
        <form onSubmit={handleEnviarMensaje} className="space-y-4">
          <div>
            <textarea
              value={mensajeMotivacional}
              onChange={(e) => setMensajeMotivacional(e.target.value)}
              placeholder="Escribe un mensaje motivacional para los participantes..."
              rows={4}
              className="w-full px-4 py-3 border border-[#E2E8F0] rounded-xl focus:ring-2 focus:ring-[#6366F1] focus:border-[#6366F1] text-[#0F172A] placeholder:text-[#94A3B8] transition-all duration-200"
            />
          </div>
          <button
            type="submit"
            disabled={!mensajeMotivacional.trim()}
            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-[#6366F1] text-white rounded-xl hover:bg-[#4F46E5] active:bg-[#4338CA] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed font-semibold shadow-md hover:shadow-lg"
          >
            <Send className="w-5 h-5" />
            Enviar a Todos los Participantes
          </button>
        </form>
      </div>

      {/* Frases motivacionales predefinidas */}
      <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-md">
        <h4 className="font-bold text-[#0F172A] mb-4 flex items-center gap-2">
          <Zap className="w-5 h-5 text-[#F59E0B]" />
          Frases Motivacionales
        </h4>
        <p className="text-sm text-[#64748B] mb-4">
          Haz clic en una frase para usarla en tu mensaje
        </p>
        <div className="grid gap-3">
          {frasesMotivacionales.map((frase, index) => (
            <button
              key={index}
              onClick={() => usarFrase(frase)}
              className="text-left p-4 bg-gradient-to-r from-[#EEF2FF] to-[#E0E7FF] border border-[#6366F1] rounded-xl hover:shadow-md transition-all duration-200 hover:scale-[1.02]"
            >
              <p className="text-[#0F172A]">{frase}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Consejos prácticos */}
      <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-md">
        <h4 className="font-bold text-[#0F172A] mb-4 flex items-center gap-2">
          <Star className="w-5 h-5 text-[#F59E0B]" />
          Consejos Prácticos
        </h4>
        <div className="grid md:grid-cols-2 gap-4">
          {consejosPracticos.map((consejo, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-[#F8FAFC] to-[#F1F5F9] border border-[#E2E8F0] rounded-xl p-4 hover:shadow-md transition-all duration-200"
            >
              <div className="flex items-start gap-3">
                <span className="text-3xl">{consejo.icono}</span>
                <div>
                  <h5 className="font-bold text-[#0F172A] mb-1">{consejo.titulo}</h5>
                  <p className="text-sm text-[#64748B]">{consejo.descripcion}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tips de engagement */}
      <div className="bg-gradient-to-br from-[#EEF2FF] to-[#E0E7FF] border border-[#6366F1] rounded-2xl p-6 shadow-md">
        <h4 className="font-bold text-[#0F172A] mb-4 flex items-center gap-2">
          <Smile className="w-5 h-5 text-[#6366F1]" />
          Tips para Mantener el Engagement
        </h4>
        <ul className="space-y-3">
          <li className="flex items-start gap-3">
            <span className="text-[#6366F1] font-bold">1.</span>
            <span className="text-[#0F172A]">
              <strong>Comunicación regular:</strong> Envía mensajes motivacionales al menos 2-3 veces por semana
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-blue-600 font-bold">2.</span>
            <span className="text-slate-700">
              <strong>Reconoce logros:</strong> Celebra públicamente los hitos alcanzados por los participantes
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-blue-600 font-bold">3.</span>
            <span className="text-slate-700">
              <strong>Crea comunidad:</strong> Fomenta la interacción entre participantes
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-blue-600 font-bold">4.</span>
            <span className="text-slate-700">
              <strong>Personaliza mensajes:</strong> Menciona nombres y logros específicos cuando sea posible
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-blue-600 font-bold">5.</span>
            <span className="text-slate-700">
              <strong>Mantén la energía:</strong> Usa emojis y un tono positivo en tus comunicaciones
            </span>
          </li>
        </ul>
      </div>

      {/* Ideas de contenido */}
      <div className="bg-white border border-slate-200 rounded-xl p-6">
        <h4 className="font-bold text-slate-900 mb-4">Ideas de Contenido Motivacional</h4>
        <div className="space-y-3">
          <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg">
            <h5 className="font-semibold text-purple-900 mb-1">📸 Historias de Éxito</h5>
            <p className="text-sm text-purple-700">Comparte testimonios y transformaciones de participantes</p>
          </div>
          <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
            <h5 className="font-semibold text-green-900 mb-1">🎥 Videos Motivacionales</h5>
            <p className="text-sm text-green-700">Graba mensajes en video para conexión más personal</p>
          </div>
          <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
            <h5 className="font-semibold text-orange-900 mb-1">📊 Progreso del Grupo</h5>
            <p className="text-sm text-orange-700">Muestra estadísticas generales para inspirar competencia saludable</p>
          </div>
          <div className="p-3 bg-pink-50 border border-pink-200 rounded-lg">
            <h5 className="font-semibold text-pink-900 mb-1">🎯 Desafíos Semanales</h5>
            <p className="text-sm text-pink-700">Propón retos adicionales para mantener el interés</p>
          </div>
        </div>
      </div>
    </div>
  );
}

