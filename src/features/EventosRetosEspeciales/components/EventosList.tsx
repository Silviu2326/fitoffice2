import { useState, useEffect } from 'react';
import { Calendar, Users, Target, Clock, Trophy, Plus, Edit2, Trash2, Play, CheckCircle } from 'lucide-react';
import { getRetos, eliminarReto, publicarReto, iniciarReto, finalizarReto, type Reto } from '../api/retos';

interface EventosListProps {
  onCrearNuevo: () => void;
  onEditarReto: (reto: Reto) => void;
}

export default function EventosList({ onCrearNuevo, onEditarReto }: EventosListProps) {
  const [retos, setRetos] = useState<Reto[]>([]);
  const [loading, setLoading] = useState(true);
  const [filtroTipo, setFiltroTipo] = useState<'todos' | 'personal' | 'grupal'>('todos');
  const [filtroEstado, setFiltroEstado] = useState<'todos' | string>('todos');

  useEffect(() => {
    cargarRetos();
  }, [filtroTipo, filtroEstado]);

  const cargarRetos = async () => {
    setLoading(true);
    const filtros: any = {};
    if (filtroTipo !== 'todos') filtros.tipo = filtroTipo;
    if (filtroEstado !== 'todos') filtros.estado = filtroEstado;

    const { data } = await getRetos(filtros);
    if (data) setRetos(data);
    setLoading(false);
  };

  const handleEliminar = async (id: string) => {
    if (!confirm('¿Estás seguro de eliminar este reto?')) return;
    await eliminarReto(id);
    cargarRetos();
  };

  const handleCambiarEstado = async (id: string, accion: 'publicar' | 'iniciar' | 'finalizar') => {
    if (accion === 'publicar') await publicarReto(id);
    if (accion === 'iniciar') await iniciarReto(id);
    if (accion === 'finalizar') await finalizarReto(id);
    cargarRetos();
  };

  const getEstadoBadge = (estado: string) => {
    const badges = {
      borrador: 'bg-gray-100 text-gray-800',
      publicado: 'bg-blue-100 text-blue-800',
      activo: 'bg-green-100 text-green-800',
      finalizado: 'bg-red-100 text-red-800',
    };
    return badges[estado as keyof typeof badges] || 'bg-gray-100 text-gray-800';
  };

  const getTipoBadge = (tipo: string) => {
    return tipo === 'personal' 
      ? 'bg-purple-100 text-purple-800' 
      : 'bg-orange-100 text-orange-800';
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
      {/* Header con filtros */}
      <div className="flex flex-wrap gap-4 items-center justify-between">
        <div className="flex gap-2">
          <select
            value={filtroTipo}
            onChange={(e) => setFiltroTipo(e.target.value as any)}
            className="px-4 py-2 border border-[#E2E8F0] rounded-xl focus:ring-2 focus:ring-[#6366F1] focus:border-[#6366F1] text-[#0F172A] bg-white transition-all duration-200"
          >
            <option value="todos">Todos los tipos</option>
            <option value="personal">Personal</option>
            <option value="grupal">Grupal</option>
          </select>
          <select
            value={filtroEstado}
            onChange={(e) => setFiltroEstado(e.target.value)}
            className="px-4 py-2 border border-[#E2E8F0] rounded-xl focus:ring-2 focus:ring-[#6366F1] focus:border-[#6366F1] text-[#0F172A] bg-white transition-all duration-200"
          >
            <option value="todos">Todos los estados</option>
            <option value="borrador">Borrador</option>
            <option value="publicado">Publicado</option>
            <option value="activo">Activo</option>
            <option value="finalizado">Finalizado</option>
          </select>
        </div>
        <button
          onClick={onCrearNuevo}
          className="flex items-center gap-2 px-4 py-2 bg-[#6366F1] text-white rounded-xl hover:bg-[#4F46E5] active:bg-[#4338CA] transition-all duration-200 font-semibold shadow-md hover:shadow-lg"
        >
          <Plus className="w-5 h-5" />
          Crear Nuevo Reto
        </button>
      </div>

      {/* Lista de retos */}
      {retos.length === 0 ? (
        <div className="text-center py-12">
          <Target className="w-16 h-16 text-[#94A3B8] mx-auto mb-4" />
          <p className="text-[#64748B] text-lg">No hay retos disponibles</p>
          <button
            onClick={onCrearNuevo}
            className="mt-4 text-[#6366F1] hover:text-[#4F46E5] font-semibold"
          >
            Crear tu primer reto
          </button>
        </div>
      ) : (
        <div className="grid gap-4">
          {retos.map((reto) => (
            <div
              key={reto.id}
              className="bg-white border border-[#E2E8F0] rounded-2xl p-6 hover:shadow-lg transition-all duration-200"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-xl font-bold text-[#0F172A]">{reto.nombre}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getTipoBadge(reto.tipo)}`}>
                      {reto.tipo === 'personal' ? '👤 Personal' : '👥 Grupal'}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getEstadoBadge(reto.estado)}`}>
                      {reto.estado}
                    </span>
                  </div>
                  <p className="text-[#64748B] mb-4">{reto.descripcion}</p>
                  <div className="flex flex-wrap gap-4 text-sm text-[#64748B]">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{reto.duracion_dias} días</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(reto.fecha_inicio).toLocaleDateString()}</span>
                    </div>
                    {reto.max_participantes && (
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        <span>Máx. {reto.max_participantes} participantes</span>
                      </div>
                    )}
                    <div className="flex items-center gap-1">
                      <Trophy className="w-4 h-4" />
                      <span className="capitalize">{reto.categoria}</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 ml-4">
                  {reto.estado === 'borrador' && (
                    <button
                      onClick={() => handleCambiarEstado(reto.id, 'publicar')}
                      className="p-2 text-[#3B82F6] hover:bg-[#DBEAFE] rounded-xl transition-all duration-200"
                      title="Publicar"
                    >
                      <Play className="w-5 h-5" />
                    </button>
                  )}
                  {reto.estado === 'publicado' && (
                    <button
                      onClick={() => handleCambiarEstado(reto.id, 'iniciar')}
                      className="p-2 text-[#10B981] hover:bg-[#D1FAE5] rounded-xl transition-all duration-200"
                      title="Iniciar"
                    >
                      <Play className="w-5 h-5" />
                    </button>
                  )}
                  {reto.estado === 'activo' && (
                    <button
                      onClick={() => handleCambiarEstado(reto.id, 'finalizar')}
                      className="p-2 text-[#EF4444] hover:bg-[#FEE2E2] rounded-xl transition-all duration-200"
                      title="Finalizar"
                    >
                      <CheckCircle className="w-5 h-5" />
                    </button>
                  )}
                  <button
                    onClick={() => onEditarReto(reto)}
                    className="p-2 text-[#6366F1] hover:bg-[#EEF2FF] rounded-xl transition-all duration-200"
                    title="Editar"
                  >
                    <Edit2 className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleEliminar(reto.id)}
                    className="p-2 text-[#EF4444] hover:bg-[#FEE2E2] rounded-xl transition-all duration-200"
                    title="Eliminar"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

