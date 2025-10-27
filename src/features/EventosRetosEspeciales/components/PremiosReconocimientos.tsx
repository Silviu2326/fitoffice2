import { useState } from 'react';
import { Gift, Award, Star, Crown, Medal, Sparkles } from 'lucide-react';

interface PremiosReconocimientosProps {
  retoId: string;
  retoNombre: string;
}

export default function PremiosReconocimientos({ retoId, retoNombre }: PremiosReconocimientosProps) {
  const [premioSeleccionado, setPremioSeleccionado] = useState<string | null>(null);

  // Categorías de premios
  const categoriasPremios = [
    {
      id: 'completacion',
      titulo: 'Premio por Completar',
      descripcion: 'Para quienes completen el 100% del reto',
      icono: '🏆',
      color: 'from-yellow-400 to-amber-500',
      ideas: [
        'Descuento del 20% en próxima suscripción',
        'Sesión de entrenamiento personalizada gratis',
        'Producto de merchandising del gimnasio',
        'Certificado de logro personalizado',
      ],
    },
    {
      id: 'top3',
      titulo: 'Top 3 del Ranking',
      descripcion: 'Los 3 primeros lugares del ranking',
      icono: '🥇',
      color: 'from-purple-400 to-pink-500',
      ideas: [
        '1er lugar: 1 mes gratis de membresía',
        '2do lugar: 2 semanas gratis de membresía',
        '3er lugar: 1 semana gratis de membresía',
        'Reconocimiento en redes sociales',
      ],
    },
    {
      id: 'constancia',
      titulo: 'Premio a la Constancia',
      descripcion: 'Mayor racha de días consecutivos',
      icono: '🔥',
      color: 'from-orange-400 to-red-500',
      ideas: [
        'Botella de agua premium del gimnasio',
        'Plan nutricional personalizado gratis',
        'Bolsa de proteína o suplementos',
        'Toalla premium del gimnasio',
      ],
    },
    {
      id: 'mejora',
      titulo: 'Mayor Mejora',
      descripcion: 'Quien más ha mejorado durante el reto',
      icono: '📈',
      color: 'from-green-400 to-emerald-500',
      ideas: [
        'Evaluación física completa gratis',
        'Sesión con nutricionista',
        '5 clases grupales gratis',
        'Kit de recuperación muscular',
      ],
    },
    {
      id: 'participacion',
      titulo: 'Participación Activa',
      descripcion: 'Para los más participativos en la comunidad',
      icono: '⭐',
      color: 'from-blue-400 to-cyan-500',
      ideas: [
        'Entrada gratis a evento especial',
        'Acceso VIP por 1 mes',
        'Descuento en productos de la tienda',
        'Camiseta oficial del reto',
      ],
    },
  ];

  const reconocimientosDigitales = [
    {
      nombre: 'Badges Digitales',
      descripcion: 'Insignias coleccionables por logros',
      ejemplos: ['🏅 Completador', '🔥 Racha de Fuego', '⭐ MVP', '👑 Campeón'],
    },
    {
      nombre: 'Certificados',
      descripcion: 'Certificados descargables personalizados',
      ejemplos: ['PDF con diseño profesional', 'Incluir logotipo y firma', 'Compartible en LinkedIn'],
    },
    {
      nombre: 'Hall of Fame',
      descripcion: 'Muro de la fama en redes sociales',
      ejemplos: ['Post en Instagram', 'Story destacada', 'Mención en newsletter'],
    },
    {
      nombre: 'Puntos y Niveles',
      descripcion: 'Sistema de gamificación continuo',
      ejemplos: ['Puntos acumulables', 'Niveles desbloqueables', 'Beneficios por nivel'],
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#FEF3C7] to-[#FDE68A] rounded-2xl p-6 border border-[#E2E8F0]">
        <div className="flex items-center gap-3 mb-2">
          <Gift className="w-8 h-8 text-[#F59E0B]" />
          <h3 className="text-2xl font-bold text-[#0F172A]">Premios & Reconocimientos</h3>
        </div>
        <p className="text-[#64748B]">{retoNombre}</p>
      </div>

      {/* Categorías de premios */}
      <div>
        <h4 className="font-bold text-[#0F172A] mb-4 flex items-center gap-2">
          <Award className="w-5 h-5 text-[#F59E0B]" />
          Categorías de Premios
        </h4>
        <div className="grid md:grid-cols-2 gap-4">
          {categoriasPremios.map((categoria) => (
            <div
              key={categoria.id}
              className="bg-white border-2 border-[#E2E8F0] rounded-2xl p-6 hover:shadow-lg transition-all duration-200 cursor-pointer"
              onClick={() => setPremioSeleccionado(categoria.id === premioSeleccionado ? null : categoria.id)}
            >
              <div className="flex items-start gap-4 mb-3">
                <div className={`w-16 h-16 bg-gradient-to-br ${categoria.color} rounded-xl flex items-center justify-center text-3xl shadow-lg`}>
                  {categoria.icono}
                </div>
                <div className="flex-1">
                  <h5 className="font-bold text-slate-900 text-lg mb-1">{categoria.titulo}</h5>
                  <p className="text-sm text-slate-600">{categoria.descripcion}</p>
                </div>
              </div>

              {premioSeleccionado === categoria.id && (
                <div className="mt-4 pt-4 border-t border-slate-200 space-y-2">
                  <p className="text-sm font-medium text-slate-700 mb-2">Ideas de premios:</p>
                  {categoria.ideas.map((idea, index) => (
                    <div key={index} className="flex items-start gap-2 text-sm text-slate-700">
                      <Sparkles className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                      <span>{idea}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Reconocimientos digitales */}
      <div className="bg-white border border-slate-200 rounded-xl p-6">
        <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
          <Star className="w-5 h-5 text-yellow-500" />
          Reconocimientos Digitales
        </h4>
        <div className="grid md:grid-cols-2 gap-4">
          {reconocimientosDigitales.map((reconocimiento, index) => (
            <div key={index} className="bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200 rounded-lg p-4">
              <h5 className="font-bold text-slate-900 mb-2">{reconocimiento.nombre}</h5>
              <p className="text-sm text-slate-600 mb-3">{reconocimiento.descripcion}</p>
              <div className="space-y-1">
                {reconocimiento.ejemplos.map((ejemplo, idx) => (
                  <div key={idx} className="text-xs text-emerald-700 bg-emerald-50 px-2 py-1 rounded inline-block mr-2">
                    {ejemplo}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sistema de puntos */}
      <div className="bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200 rounded-xl p-6">
        <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
          <Crown className="w-5 h-5 text-purple-600" />
          Sistema de Puntos
        </h4>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-white rounded-lg">
            <span className="text-slate-700">Completar día del reto</span>
            <span className="font-bold text-emerald-600">+10 puntos</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-white rounded-lg">
            <span className="text-slate-700">Racha de 7 días consecutivos</span>
            <span className="font-bold text-orange-600">+50 puntos</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-white rounded-lg">
            <span className="text-slate-700">Subir evidencia (foto/video)</span>
            <span className="font-bold text-blue-600">+5 puntos</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-white rounded-lg">
            <span className="text-slate-700">Completar reto 100%</span>
            <span className="font-bold text-purple-600">+200 puntos</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-white rounded-lg">
            <span className="text-slate-700">Referir nuevo participante</span>
            <span className="font-bold text-pink-600">+30 puntos</span>
          </div>
        </div>
      </div>

      {/* Best practices */}
      <div className="bg-white border border-slate-200 rounded-xl p-6">
        <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
          <Medal className="w-5 h-5 text-blue-600" />
          Mejores Prácticas
        </h4>
        <ul className="space-y-3">
          <li className="flex items-start gap-3">
            <span className="text-2xl">✅</span>
            <div>
              <p className="font-medium text-slate-900">Anuncia los premios desde el inicio</p>
              <p className="text-sm text-slate-600">La claridad sobre recompensas aumenta la motivación inicial</p>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-2xl">✅</span>
            <div>
              <p className="font-medium text-slate-900">Combina premios físicos y digitales</p>
              <p className="text-sm text-slate-600">Ofrece variedad para satisfacer diferentes preferencias</p>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-2xl">✅</span>
            <div>
              <p className="font-medium text-slate-900">Reconoce el esfuerzo, no solo resultados</p>
              <p className="text-sm text-slate-600">Valora la constancia y la participación activa</p>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-2xl">✅</span>
            <div>
              <p className="font-medium text-slate-900">Crea ceremonia de premiación</p>
              <p className="text-sm text-slate-600">Un evento especial hace más memorables los logros</p>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-2xl">✅</span>
            <div>
              <p className="font-medium text-slate-900">Documenta y comparte</p>
              <p className="text-sm text-slate-600">Usa fotos y videos para marketing y motivación futura</p>
            </div>
          </li>
        </ul>
      </div>

      {/* CTA */}
      <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl p-6 text-white text-center">
        <h4 className="text-xl font-bold mb-2">💡 Consejo Pro</h4>
        <p className="mb-4">
          Los mejores premios no son necesariamente los más caros, sino los que tienen significado 
          y celebran el esfuerzo genuino de tus participantes.
        </p>
        <button className="px-6 py-3 bg-white text-emerald-600 rounded-lg font-bold hover:bg-slate-100 transition-colors">
          Configurar Premios del Reto
        </button>
      </div>
    </div>
  );
}

