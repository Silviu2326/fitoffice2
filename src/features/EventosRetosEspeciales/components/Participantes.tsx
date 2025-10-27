import { useState, useEffect } from 'react';
import { Users, UserPlus, Mail, Calendar, TrendingUp, X, Search } from 'lucide-react';
import { 
  getParticipantesByReto, 
  inscribirParticipante, 
  eliminarParticipante,
  type Participante 
} from '../api/participantes';

interface ParticipantesProps {
  retoId: string;
  retoNombre: string;
}

export default function Participantes({ retoId, retoNombre }: ParticipantesProps) {
  const [participantes, setParticipantes] = useState<Participante[]>([]);
  const [loading, setLoading] = useState(true);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [busqueda, setBusqueda] = useState('');
  const [nuevoParticipante, setNuevoParticipante] = useState({
    usuario_id: '',
    nombre_usuario: '',
    email_usuario: '',
  });

  useEffect(() => {
    cargarParticipantes();
  }, [retoId]);

  const cargarParticipantes = async () => {
    setLoading(true);
    const { data } = await getParticipantesByReto(retoId);
    if (data) setParticipantes(data);
    setLoading(false);
  };

  const handleInscribir = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await inscribirParticipante({
      reto_id: retoId,
      ...nuevoParticipante,
    });

    if (error) {
      alert('Error al inscribir participante');
      return;
    }

    setNuevoParticipante({
      usuario_id: '',
      nombre_usuario: '',
      email_usuario: '',
    });
    setMostrarFormulario(false);
    cargarParticipantes();
  };

  const handleEliminar = async (id: string) => {
    if (!confirm('¿Estás seguro de eliminar este participante?')) return;
    await eliminarParticipante(id);
    cargarParticipantes();
  };

  const getEstadoBadge = (estado: string) => {
    const badges = {
      inscrito: 'bg-blue-100 text-blue-800',
      activo: 'bg-green-100 text-green-800',
      completado: 'bg-emerald-100 text-emerald-800',
      abandonado: 'bg-red-100 text-red-800',
    };
    return badges[estado as keyof typeof badges] || 'bg-gray-100 text-gray-800';
  };

  const participantesFiltrados = participantes.filter(p =>
    p.nombre_usuario.toLowerCase().includes(busqueda.toLowerCase()) ||
    p.email_usuario.toLowerCase().includes(busqueda.toLowerCase())
  );

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
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold text-[#0F172A] mb-1">
            Participantes de: {retoNombre}
          </h3>
          <p className="text-[#64748B]">
            {participantes.length} participante{participantes.length !== 1 ? 's' : ''} inscrito{participantes.length !== 1 ? 's' : ''}
          </p>
        </div>
        <button
          onClick={() => setMostrarFormulario(true)}
          className="flex items-center gap-2 px-4 py-2 bg-[#6366F1] text-white rounded-xl hover:bg-[#4F46E5] active:bg-[#4338CA] transition-all duration-200 font-semibold shadow-md hover:shadow-lg"
        >
          <UserPlus className="w-5 h-5" />
          Inscribir Participante
        </button>
      </div>

      {/* Buscador */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#94A3B8]" />
        <input
          type="text"
          placeholder="Buscar participante..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border border-[#E2E8F0] rounded-xl focus:ring-2 focus:ring-[#6366F1] focus:border-[#6366F1] text-[#0F172A] placeholder:text-[#94A3B8] transition-all duration-200"
        />
      </div>

      {/* Lista de participantes */}
      {participantesFiltrados.length === 0 ? (
        <div className="text-center py-12">
          <Users className="w-16 h-16 text-[#94A3B8] mx-auto mb-4" />
          <p className="text-[#64748B] text-lg">No hay participantes inscritos</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {participantesFiltrados.map((participante) => (
            <div
              key={participante.id}
              className="bg-white border border-[#E2E8F0] rounded-2xl p-4 hover:shadow-lg transition-all duration-200"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md">
                      {participante.nombre_usuario.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h4 className="font-bold text-[#0F172A]">{participante.nombre_usuario}</h4>
                      <div className="flex items-center gap-1 text-sm text-[#64748B]">
                        <Mail className="w-4 h-4" />
                        {participante.email_usuario}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-4 text-sm">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getEstadoBadge(participante.estado)}`}>
                      {participante.estado}
                    </span>
                    <div className="flex items-center gap-1 text-slate-600">
                      <TrendingUp className="w-4 h-4" />
                      <span>Progreso: {participante.progreso}%</span>
                    </div>
                    <div className="flex items-center gap-1 text-slate-600">
                      <Calendar className="w-4 h-4" />
                      <span>Días: {participante.dias_completados}</span>
                    </div>
                    <div className="flex items-center gap-1 text-slate-600">
                      <span className="font-bold">🏆 {participante.puntos} pts</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => handleEliminar(participante.id)}
                  className="p-2 text-[#EF4444] hover:bg-[#FEE2E2] rounded-xl transition-all duration-200 ml-4"
                  title="Eliminar"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal de inscripción */}
      {mostrarFormulario && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full">
            <div className="flex items-center justify-between p-6 border-b border-[#E2E8F0]">
              <h3 className="text-xl font-bold text-[#0F172A]">Inscribir Participante</h3>
              <button
                onClick={() => setMostrarFormulario(false)}
                className="p-2 hover:bg-[#F8FAFC] rounded-xl transition-all duration-200"
              >
                <X className="w-6 h-6 text-[#64748B]" />
              </button>
            </div>
            <form onSubmit={handleInscribir} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-[#0F172A] mb-2">
                  ID de Usuario *
                </label>
                <input
                  type="text"
                  required
                  value={nuevoParticipante.usuario_id}
                  onChange={(e) => setNuevoParticipante({ ...nuevoParticipante, usuario_id: e.target.value })}
                  className="w-full px-4 py-3 border border-[#E2E8F0] rounded-xl focus:ring-2 focus:ring-[#6366F1] focus:border-[#6366F1] text-[#0F172A] transition-all duration-200"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#0F172A] mb-2">
                  Nombre *
                </label>
                <input
                  type="text"
                  required
                  value={nuevoParticipante.nombre_usuario}
                  onChange={(e) => setNuevoParticipante({ ...nuevoParticipante, nombre_usuario: e.target.value })}
                  className="w-full px-4 py-3 border border-[#E2E8F0] rounded-xl focus:ring-2 focus:ring-[#6366F1] focus:border-[#6366F1] text-[#0F172A] transition-all duration-200"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#0F172A] mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  required
                  value={nuevoParticipante.email_usuario}
                  onChange={(e) => setNuevoParticipante({ ...nuevoParticipante, email_usuario: e.target.value })}
                  className="w-full px-4 py-3 border border-[#E2E8F0] rounded-xl focus:ring-2 focus:ring-[#6366F1] focus:border-[#6366F1] text-[#0F172A] transition-all duration-200"
                />
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setMostrarFormulario(false)}
                  className="flex-1 px-6 py-3 border-2 border-[#E2E8F0] text-[#0F172A] rounded-xl hover:bg-[#F8FAFC] transition-all duration-200 font-semibold"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-[#6366F1] text-white rounded-xl hover:bg-[#4F46E5] active:bg-[#4338CA] transition-all duration-200 font-semibold shadow-md hover:shadow-lg"
                >
                  Inscribir
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

