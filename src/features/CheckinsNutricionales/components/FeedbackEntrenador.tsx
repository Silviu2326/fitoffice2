import { useState, useEffect } from 'react';
import { MessageCircle, Send, User, Clock, ThumbsUp, Star } from 'lucide-react';
import { getFeedbacks, enviarFeedback } from '../api/checkins';

interface Feedback {
  id: string;
  cliente_id: string;
  cliente_nombre: string;
  entrenador_nombre: string;
  mensaje: string;
  tipo: 'positivo' | 'neutral' | 'alerta';
  fecha: string;
  hora: string;
  leido: boolean;
}

export default function FeedbackEntrenador() {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    cliente_nombre: '',
    mensaje: '',
    tipo: 'neutral' as 'positivo' | 'neutral' | 'alerta',
  });

  useEffect(() => {
    loadFeedbacks();
  }, []);

  const loadFeedbacks = async () => {
    setLoading(true);
    try {
      const data = await getFeedbacks();
      setFeedbacks(data);
    } catch (error) {
      console.error('Error al cargar feedbacks:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await enviarFeedback({
        ...formData,
        entrenador_nombre: 'Entrenador Actual',
        fecha: new Date().toISOString().split('T')[0],
        hora: new Date().toTimeString().split(' ')[0],
      });
      await loadFeedbacks();
      setShowForm(false);
      setFormData({ cliente_nombre: '', mensaje: '', tipo: 'neutral' });
    } catch (error) {
      console.error('Error al enviar feedback:', error);
    }
  };

  const getTipoIcon = (tipo: string) => {
    switch (tipo) {
      case 'positivo':
        return <ThumbsUp className="w-5 h-5 text-green-600" />;
      case 'alerta':
        return <Star className="w-5 h-5 text-red-600" />;
      default:
        return <MessageCircle className="w-5 h-5 text-blue-600" />;
    }
  };

  const getTipoColor = (tipo: string) => {
    switch (tipo) {
      case 'positivo':
        return 'bg-green-100 border-green-200';
      case 'alerta':
        return 'bg-red-100 border-red-200';
      default:
        return 'bg-blue-100 border-blue-200';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-green-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Feedback del Entrenador</h2>
          <p className="text-slate-600 mt-1">Comentarios y ajustes personalizados</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
        >
          <Send className="w-5 h-5" />
          <span>Nuevo Feedback</span>
        </button>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Total Feedbacks</p>
              <p className="text-3xl font-bold text-slate-900 mt-1">{feedbacks.length}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <MessageCircle className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Positivos</p>
              <p className="text-3xl font-bold text-green-600 mt-1">
                {feedbacks.filter(f => f.tipo === 'positivo').length}
              </p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <ThumbsUp className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Alertas</p>
              <p className="text-3xl font-bold text-red-600 mt-1">
                {feedbacks.filter(f => f.tipo === 'alerta').length}
              </p>
            </div>
            <div className="bg-red-100 p-3 rounded-lg">
              <Star className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Formulario */}
      {showForm && (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Enviar Feedback</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Cliente
                </label>
                <input
                  type="text"
                  value={formData.cliente_nombre}
                  onChange={(e) => setFormData({ ...formData, cliente_nombre: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Nombre del cliente"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Tipo de Feedback
                </label>
                <select
                  value={formData.tipo}
                  onChange={(e) => setFormData({ ...formData, tipo: e.target.value as any })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="positivo">👍 Positivo / Felicitación</option>
                  <option value="neutral">💬 Neutral / Comentario</option>
                  <option value="alerta">⚠️ Alerta / Ajuste Necesario</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Mensaje
              </label>
              <textarea
                value={formData.mensaje}
                onChange={(e) => setFormData({ ...formData, mensaje: e.target.value })}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                rows={4}
                placeholder="Escribe tu feedback aquí..."
                required
              />
            </div>
            <div className="flex gap-3">
              <button
                type="submit"
                className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors"
              >
                Enviar Feedback
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-6 bg-slate-200 text-slate-700 py-2 rounded-lg hover:bg-slate-300 transition-colors"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Lista de feedbacks */}
      <div className="space-y-4">
        {feedbacks.map((feedback) => (
          <div
            key={feedback.id}
            className={`rounded-xl p-6 shadow-sm border-2 ${getTipoColor(feedback.tipo)}`}
          >
            <div className="flex items-start gap-4">
              <div className="bg-white p-3 rounded-lg">
                {getTipoIcon(feedback.tipo)}
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="font-semibold text-slate-900">{feedback.cliente_nombre}</h4>
                    <p className="text-sm text-slate-600">
                      De: {feedback.entrenador_nombre}
                    </p>
                  </div>
                  <div className="text-right text-sm text-slate-600">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{feedback.fecha}</span>
                    </div>
                    <span>{feedback.hora}</span>
                  </div>
                </div>
                <p className="text-slate-800 leading-relaxed">{feedback.mensaje}</p>
                {!feedback.leido && (
                  <div className="mt-3">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                      Nuevo
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}

        {feedbacks.length === 0 && (
          <div className="text-center py-12 bg-white rounded-xl border border-slate-200">
            <MessageCircle className="w-12 h-12 text-slate-400 mx-auto mb-4" />
            <p className="text-slate-600">No hay feedbacks registrados</p>
            <p className="text-sm text-slate-500 mt-1">Envía el primer feedback a tus clientes</p>
          </div>
        )}
      </div>

      {/* Plantillas de feedback */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">💡 Plantillas de Feedback</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <ThumbsUp className="w-4 h-4 text-green-600" />
              <h4 className="font-semibold text-green-900">Positivo</h4>
            </div>
            <p className="text-sm text-slate-600">
              "¡Excelente trabajo esta semana! Tu adherencia ha sido del 95% y se nota en los resultados. Sigue así 💪"
            </p>
          </div>
          <div className="bg-white rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <MessageCircle className="w-4 h-4 text-blue-600" />
              <h4 className="font-semibold text-blue-900">Neutral</h4>
            </div>
            <p className="text-sm text-slate-600">
              "Recuerda registrar tus comidas diarias y tu peso por las mañanas. Esto me ayuda a ajustar tu plan."
            </p>
          </div>
          <div className="bg-white rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Star className="w-4 h-4 text-red-600" />
              <h4 className="font-semibold text-red-900">Alerta</h4>
            </div>
            <p className="text-sm text-slate-600">
              "He notado que tu adherencia ha bajado. ¿Hay algún obstáculo? Vamos a ajustar el plan juntos."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

