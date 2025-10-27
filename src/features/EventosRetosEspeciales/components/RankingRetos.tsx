import { useState, useEffect } from 'react';
import { Trophy, Medal, Award, TrendingUp, Users } from 'lucide-react';
import { getRankingReto, type Participante } from '../api/participantes';

interface RankingRetosProps {
  retoId: string;
  retoNombre: string;
}

export default function RankingRetos({ retoId, retoNombre }: RankingRetosProps) {
  const [ranking, setRanking] = useState<Participante[]>([]);
  const [loading, setLoading] = useState(true);
  const [limite, setLimite] = useState(10);

  useEffect(() => {
    cargarRanking();
  }, [retoId, limite]);

  const cargarRanking = async () => {
    setLoading(true);
    const { data } = await getRankingReto(retoId, limite);
    if (data) setRanking(data);
    setLoading(false);
  };

  const getMedalIcon = (posicion: number) => {
    if (posicion === 1) return <Trophy className="w-8 h-8 text-yellow-500" />;
    if (posicion === 2) return <Medal className="w-8 h-8 text-slate-400" />;
    if (posicion === 3) return <Award className="w-8 h-8 text-amber-700" />;
    return <span className="text-2xl font-bold text-slate-400">#{posicion}</span>;
  };

  const getPositionBackground = (posicion: number) => {
    if (posicion === 1) return 'bg-gradient-to-r from-yellow-100 to-amber-100 border-yellow-300';
    if (posicion === 2) return 'bg-gradient-to-r from-slate-100 to-gray-100 border-slate-300';
    if (posicion === 3) return 'bg-gradient-to-r from-amber-100 to-orange-100 border-amber-300';
    return 'bg-white border-slate-200';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#6366F1] border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#FEF3C7] to-[#FDE68A] rounded-2xl p-6 border border-[#E2E8F0]">
        <div className="flex items-center gap-3 mb-2">
          <Trophy className="w-8 h-8 text-[#F59E0B]" />
          <h3 className="text-2xl font-bold text-[#0F172A]">Ranking del Reto</h3>
        </div>
        <p className="text-[#64748B]">{retoNombre}</p>
      </div>

      {/* Selector de límite */}
      <div className="flex items-center gap-3">
        <label className="text-sm font-semibold text-[#0F172A]">Mostrar:</label>
        <select
          value={limite}
          onChange={(e) => setLimite(parseInt(e.target.value))}
          className="px-4 py-3 border border-[#E2E8F0] rounded-xl focus:ring-2 focus:ring-[#6366F1] focus:border-[#6366F1] text-[#0F172A] bg-white transition-all duration-200 font-semibold"
        >
          <option value={5}>Top 5</option>
          <option value={10}>Top 10</option>
          <option value={20}>Top 20</option>
          <option value={50}>Top 50</option>
        </select>
      </div>

      {/* Podio para los 3 primeros */}
      {ranking.length >= 3 && (
        <div className="grid grid-cols-3 gap-4 mb-6">
          {/* 2do lugar */}
          <div className="order-1 pt-8">
            <div className="bg-gradient-to-br from-slate-100 to-gray-100 border-2 border-slate-300 rounded-xl p-4 text-center">
              <Medal className="w-12 h-12 text-slate-400 mx-auto mb-2" />
              <div className="w-16 h-16 bg-gradient-to-br from-slate-400 to-gray-500 rounded-full mx-auto mb-3 flex items-center justify-center text-white font-bold text-2xl">
                {ranking[1].nombre_usuario.charAt(0).toUpperCase()}
              </div>
              <h4 className="font-bold text-slate-900 mb-1">{ranking[1].nombre_usuario}</h4>
              <div className="text-2xl font-bold text-slate-600 mb-1">{ranking[1].puntos}</div>
              <div className="text-xs text-slate-600">puntos</div>
              <div className="mt-2 text-sm text-slate-600">
                {ranking[1].progreso}% completado
              </div>
            </div>
          </div>

          {/* 1er lugar */}
          <div className="order-2">
            <div className="bg-gradient-to-br from-yellow-100 to-amber-100 border-2 border-yellow-400 rounded-xl p-4 text-center shadow-lg">
              <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-2 animate-bounce" />
              <div className="w-20 h-20 bg-gradient-to-br from-yellow-500 to-amber-600 rounded-full mx-auto mb-3 flex items-center justify-center text-white font-bold text-3xl">
                {ranking[0].nombre_usuario.charAt(0).toUpperCase()}
              </div>
              <h4 className="font-bold text-slate-900 text-lg mb-1">{ranking[0].nombre_usuario}</h4>
              <div className="text-3xl font-bold text-yellow-600 mb-1">{ranking[0].puntos}</div>
              <div className="text-sm text-slate-600">puntos</div>
              <div className="mt-2 text-sm text-slate-600">
                {ranking[0].progreso}% completado
              </div>
            </div>
          </div>

          {/* 3er lugar */}
          <div className="order-3 pt-16">
            <div className="bg-gradient-to-br from-amber-100 to-orange-100 border-2 border-amber-400 rounded-xl p-4 text-center">
              <Award className="w-10 h-10 text-amber-700 mx-auto mb-2" />
              <div className="w-14 h-14 bg-gradient-to-br from-amber-700 to-orange-600 rounded-full mx-auto mb-3 flex items-center justify-center text-white font-bold text-xl">
                {ranking[2].nombre_usuario.charAt(0).toUpperCase()}
              </div>
              <h4 className="font-bold text-slate-900 mb-1 text-sm">{ranking[2].nombre_usuario}</h4>
              <div className="text-xl font-bold text-amber-700 mb-1">{ranking[2].puntos}</div>
              <div className="text-xs text-slate-600">puntos</div>
              <div className="mt-2 text-xs text-slate-600">
                {ranking[2].progreso}% completado
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Lista completa del ranking */}
      <div>
        <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
          <Users className="w-5 h-5" />
          Clasificación General
        </h4>
        {ranking.length === 0 ? (
          <div className="text-center py-12 bg-slate-50 rounded-lg">
            <Trophy className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <p className="text-slate-600">No hay participantes en el ranking aún</p>
          </div>
        ) : (
          <div className="space-y-2">
            {ranking.map((participante, index) => (
              <div
                key={participante.id}
                className={`border-2 rounded-lg p-4 flex items-center gap-4 hover:shadow-md transition-shadow ${getPositionBackground(index + 1)}`}
              >
                {/* Posición */}
                <div className="flex items-center justify-center w-16">
                  {getMedalIcon(index + 1)}
                </div>

                {/* Avatar */}
                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg ${
                  index === 0 ? 'bg-gradient-to-br from-yellow-500 to-amber-600' :
                  index === 1 ? 'bg-gradient-to-br from-slate-400 to-gray-500' :
                  index === 2 ? 'bg-gradient-to-br from-amber-700 to-orange-600' :
                  'bg-gradient-to-br from-emerald-500 to-teal-600'
                }`}>
                  {participante.nombre_usuario.charAt(0).toUpperCase()}
                </div>

                {/* Info */}
                <div className="flex-1">
                  <h4 className="font-bold text-slate-900">{participante.nombre_usuario}</h4>
                  <div className="flex items-center gap-4 text-sm text-slate-600">
                    <span>📅 {participante.dias_completados} días</span>
                    <span>📊 {participante.progreso}%</span>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                      participante.estado === 'completado' ? 'bg-emerald-100 text-emerald-800' :
                      participante.estado === 'activo' ? 'bg-blue-100 text-blue-800' :
                      'bg-slate-100 text-slate-800'
                    }`}>
                      {participante.estado}
                    </span>
                  </div>
                </div>

                {/* Puntos */}
                <div className="text-right">
                  <div className="text-2xl font-bold text-purple-600">{participante.puntos}</div>
                  <div className="text-xs text-slate-600">puntos</div>
                </div>

                {/* Tendencia */}
                <div className="text-emerald-600">
                  <TrendingUp className="w-6 h-6" />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

