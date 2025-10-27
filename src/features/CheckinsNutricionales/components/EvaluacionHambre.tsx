import { useState } from 'react';
import { Heart, Smile, Meh, Frown } from 'lucide-react';

export default function EvaluacionHambre() {
  const [nivelHambre, setNivelHambre] = useState(5);
  const [nivelSaciedad, setNivelSaciedad] = useState(5);

  const getEmoji = (nivel: number) => {
    if (nivel <= 3) return <Frown className="w-6 h-6 text-red-500" />;
    if (nivel <= 6) return <Meh className="w-6 h-6 text-amber-500" />;
    return <Smile className="w-6 h-6 text-green-500" />;
  };

  const getColor = (nivel: number) => {
    if (nivel <= 3) return 'bg-red-500';
    if (nivel <= 6) return 'bg-amber-500';
    return 'bg-green-500';
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Evaluación de Hambre y Saciedad</h2>
        <p className="text-slate-600 mt-1">Escala de sensaciones alimentarias (1-10)</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Nivel de Hambre */}
        <div className="bg-white rounded-xl p-8 shadow-sm border border-slate-200">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="bg-red-100 p-3 rounded-lg">
                <Heart className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900">Nivel de Hambre</h3>
                <p className="text-sm text-slate-600">Antes de comer</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {getEmoji(nivelHambre)}
              <span className="text-3xl font-bold text-slate-900">{nivelHambre}</span>
            </div>
          </div>

          <div className="space-y-4">
            <input
              type="range"
              min="1"
              max="10"
              value={nivelHambre}
              onChange={(e) => setNivelHambre(parseInt(e.target.value))}
              className="w-full h-3 bg-slate-200 rounded-lg appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, #ef4444 0%, #f59e0b 50%, #10b981 100%)`
              }}
            />

            <div className="flex justify-between text-xs text-slate-500">
              <span>Sin hambre</span>
              <span>Normal</span>
              <span>Muy hambriento</span>
            </div>

            <div className="mt-6 space-y-2 text-sm">
              <div className="flex items-start gap-2">
                <span className="font-semibold text-red-600 min-w-[30px]">1-3:</span>
                <span className="text-slate-600">Sin apetito, poco hambre</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="font-semibold text-amber-600 min-w-[30px]">4-6:</span>
                <span className="text-slate-600">Hambre moderada, hora de comer</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="font-semibold text-green-600 min-w-[30px]">7-10:</span>
                <span className="text-slate-600">Mucha hambre, urgencia por comer</span>
              </div>
            </div>
          </div>

          {/* Barra visual */}
          <div className="mt-6">
            <div className="h-8 bg-slate-100 rounded-lg overflow-hidden">
              <div
                className={`h-full ${getColor(nivelHambre)} transition-all duration-300`}
                style={{ width: `${nivelHambre * 10}%` }}
              />
            </div>
          </div>
        </div>

        {/* Nivel de Saciedad */}
        <div className="bg-white rounded-xl p-8 shadow-sm border border-slate-200">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="bg-green-100 p-3 rounded-lg">
                <Heart className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900">Nivel de Saciedad</h3>
                <p className="text-sm text-slate-600">Después de comer</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {getEmoji(nivelSaciedad)}
              <span className="text-3xl font-bold text-slate-900">{nivelSaciedad}</span>
            </div>
          </div>

          <div className="space-y-4">
            <input
              type="range"
              min="1"
              max="10"
              value={nivelSaciedad}
              onChange={(e) => setNivelSaciedad(parseInt(e.target.value))}
              className="w-full h-3 bg-slate-200 rounded-lg appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, #ef4444 0%, #10b981 50%, #f59e0b 100%)`
              }}
            />

            <div className="flex justify-between text-xs text-slate-500">
              <span>Sin saciar</span>
              <span>Satisfecho</span>
              <span>Muy lleno</span>
            </div>

            <div className="mt-6 space-y-2 text-sm">
              <div className="flex items-start gap-2">
                <span className="font-semibold text-red-600 min-w-[30px]">1-3:</span>
                <span className="text-slate-600">Sin saciedad, todavía con hambre</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="font-semibold text-green-600 min-w-[30px]">4-7:</span>
                <span className="text-slate-600">Satisfecho, cómodo</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="font-semibold text-amber-600 min-w-[30px]">8-10:</span>
                <span className="text-slate-600">Muy lleno, incómodo</span>
              </div>
            </div>
          </div>

          {/* Barra visual */}
          <div className="mt-6">
            <div className="h-8 bg-slate-100 rounded-lg overflow-hidden">
              <div
                className={`h-full ${getColor(nivelSaciedad)} transition-all duration-300`}
                style={{ width: `${nivelSaciedad * 10}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Guía de interpretación */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-200">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">💡 Guía de Interpretación</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-blue-900 mb-2">Patrones Saludables</h4>
            <ul className="space-y-2 text-sm text-slate-700">
              <li className="flex items-start gap-2">
                <span className="text-green-600">✓</span>
                <span>Hambre antes: 5-7 (hambre moderada)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600">✓</span>
                <span>Saciedad después: 5-7 (cómodo, satisfecho)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600">✓</span>
                <span>Comer cuando hay hambre real</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600">✓</span>
                <span>Parar al 80% de capacidad</span>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-red-900 mb-2">Señales de Alerta</h4>
            <ul className="space-y-2 text-sm text-slate-700">
              <li className="flex items-start gap-2">
                <span className="text-red-600">✗</span>
                <span>Hambre extrema (9-10) - demasiado tiempo sin comer</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-600">✗</span>
                <span>Saciedad alta (9-10) - porciones excesivas</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-600">✗</span>
                <span>Sin hambre antes (1-2) - comida emocional</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-600">✗</span>
                <span>Sin saciedad después (1-3) - velocidad rápida</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Botón de guardar */}
      <div className="flex justify-end">
        <button className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition-colors font-medium">
          Guardar Evaluación
        </button>
      </div>
    </div>
  );
}

