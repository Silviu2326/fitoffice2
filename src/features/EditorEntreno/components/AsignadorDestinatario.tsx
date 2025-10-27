import { useState, useEffect } from 'react';
import { X, Users, Target, Search, Check } from 'lucide-react';

interface AsignadorDestinatarioProps {
  modoAsignacion: 'individual' | 'grupal';
  sesion: any;
  onClose: () => void;
  onAsignar: (destinatarios: any[]) => void;
}

export default function AsignadorDestinatario({ modoAsignacion, sesion, onClose, onAsignar }: AsignadorDestinatarioProps) {
  const [destinatarios, setDestinatarios] = useState<any[]>([]);
  const [seleccionados, setSeleccionados] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Integrar con API real
    const datosEjemplo = modoAsignacion === 'individual' 
      ? [
          { id: '1', nombre: 'Juan Pérez', tipo: 'cliente', programa: 'Fuerza', avatar: '👨' },
          { id: '2', nombre: 'María García', tipo: 'cliente', programa: 'Hipertrofia', avatar: '👩' },
          { id: '3', nombre: 'Carlos López', tipo: 'cliente', programa: 'Funcional', avatar: '👨' },
          { id: '4', nombre: 'Ana Martínez', tipo: 'cliente', programa: 'Pérdida de peso', avatar: '👩' },
        ]
      : [
          { id: 'g1', nombre: 'Clase de CrossFit - Mañana', tipo: 'grupo', miembros: 12, avatar: '🏋️' },
          { id: 'g2', nombre: 'Entrenamiento Funcional - Tarde', tipo: 'grupo', miembros: 8, avatar: '🤸' },
          { id: 'g3', nombre: 'Fuerza Avanzada - Noche', tipo: 'grupo', miembros: 6, avatar: '💪' },
          { id: 'g4', nombre: 'Programa Hipertrofia', tipo: 'grupo', miembros: 15, avatar: '🎯' },
        ];

    setTimeout(() => {
      setDestinatarios(datosEjemplo);
      setLoading(false);
    }, 500);
  }, [modoAsignacion]);

  const toggleSeleccion = (id: string) => {
    setSeleccionados(prev =>
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  const destinatariosFiltrados = destinatarios.filter(dest =>
    dest.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAsignar = () => {
    const destinatariosSeleccionados = destinatarios.filter(d => seleccionados.includes(d.id));
    onAsignar(destinatariosSeleccionados);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[80vh] flex flex-col border border-[#E2E8F0] shadow-2xl">
        {/* Header */}
        <div className="p-6 border-b border-[#E2E8F0]">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              {modoAsignacion === 'individual' ? (
                <Users className="w-6 h-6 text-[#6366F1]" />
              ) : (
                <Target className="w-6 h-6 text-[#6366F1]" />
              )}
              <div>
                <h2 className="text-2xl font-bold text-[#0F172A]">
                  {modoAsignacion === 'individual' ? 'Asignar a Clientes' : 'Asignar a Grupos'}
                </h2>
                <p className="text-sm text-[#64748B]">
                  Selecciona los destinatarios para esta sesión
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-[#F8FAFC] rounded-lg transition-all duration-200"
            >
              <X className="w-6 h-6 text-[#64748B]" />
            </button>
          </div>
          
          {/* Buscador */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#94A3B8]" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={modoAsignacion === 'individual' ? 'Buscar cliente...' : 'Buscar grupo...'}
              className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl pl-12 pr-4 py-3 text-[#0F172A] placeholder-[#94A3B8] focus:outline-none focus:border-[#6366F1] focus:ring-2 focus:ring-[#6366F1]/20 transition-all duration-200"
            />
          </div>
        </div>

        {/* Lista de destinatarios */}
        <div className="flex-1 overflow-y-auto p-6">
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#6366F1] border-t-transparent mx-auto"></div>
              <p className="text-[#64748B] mt-4">Cargando destinatarios...</p>
            </div>
          ) : destinatariosFiltrados.length === 0 ? (
            <div className="text-center py-12">
              <Users className="w-16 h-16 text-[#94A3B8] mx-auto mb-4" />
              <h3 className="text-xl font-bold text-[#64748B] mb-2">No se encontraron destinatarios</h3>
              <p className="text-[#94A3B8]">Intenta con otro término de búsqueda</p>
            </div>
          ) : (
            <div className="space-y-2">
              {destinatariosFiltrados.map((dest) => {
                const isSelected = seleccionados.includes(dest.id);
                
                return (
                  <button
                    key={dest.id}
                    onClick={() => toggleSeleccion(dest.id)}
                    className={`w-full p-4 rounded-xl border-2 transition-all duration-200 text-left ${
                      isSelected
                        ? 'border-[#10B981] bg-[#D1FAE5]'
                        : 'border-[#E2E8F0] bg-white hover:border-[#6366F1]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="text-3xl">{dest.avatar}</div>
                        <div>
                          <h3 className={`font-bold ${isSelected ? 'text-[#10B981]' : 'text-[#0F172A]'}`}>
                            {dest.nombre}
                          </h3>
                          <p className="text-sm text-[#64748B]">
                            {modoAsignacion === 'individual' 
                              ? `Programa: ${dest.programa}`
                              : `${dest.miembros} miembros`}
                          </p>
                        </div>
                      </div>
                      {isSelected && (
                        <div className="flex-shrink-0">
                          <div className="w-6 h-6 rounded-full bg-[#10B981] flex items-center justify-center">
                            <Check className="w-4 h-4 text-white" />
                          </div>
                        </div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-[#E2E8F0]">
          <div className="flex items-center justify-between">
            <p className="text-sm text-[#64748B]">
              {seleccionados.length} {modoAsignacion === 'individual' ? 'cliente(s)' : 'grupo(s)'} seleccionado(s)
            </p>
            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="px-6 py-3 rounded-xl font-semibold bg-white border border-[#E2E8F0] text-[#0F172A] hover:bg-[#F8FAFC] transition-all duration-200"
              >
                Cancelar
              </button>
              <button
                onClick={handleAsignar}
                disabled={seleccionados.length === 0}
                className="px-6 py-3 rounded-xl font-semibold bg-[#6366F1] text-white hover:bg-[#4F46E5] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
              >
                Asignar Sesión
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

