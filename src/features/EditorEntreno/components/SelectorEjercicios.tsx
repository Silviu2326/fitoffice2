import { useState, useEffect } from 'react';
import { X, Search, Dumbbell, Play } from 'lucide-react';

interface SelectorEjerciciosProps {
  onSelect: (ejercicio: any) => void;
  onClose: () => void;
}

export default function SelectorEjercicios({ onSelect, onClose }: SelectorEjerciciosProps) {
  const [ejercicios, setEjercicios] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Integrar con API real de biblioteca de ejercicios
    const ejerciciosEjemplo = [
      {
        nombre: 'Press de Banca',
        grupoMuscular: 'Pecho',
        equipamiento: 'Barra',
        descripcion: 'Ejercicio fundamental para desarrollo de pecho',
        thumbnail: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop'
      },
      {
        nombre: 'Sentadilla Profunda',
        grupoMuscular: 'Piernas',
        equipamiento: 'Barra',
        descripcion: 'Ejercicio compuesto para desarrollo de piernas',
        thumbnail: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=400&h=300&fit=crop'
      },
      {
        nombre: 'Peso Muerto',
        grupoMuscular: 'Espalda',
        equipamiento: 'Barra',
        descripcion: 'Ejercicio fundamental para cadena posterior',
        thumbnail: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400&h=300&fit=crop'
      },
      {
        nombre: 'Dominadas',
        grupoMuscular: 'Espalda',
        equipamiento: 'Barra fija',
        descripcion: 'Ejercicio de peso corporal para dorsales',
        thumbnail: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=300&fit=crop'
      },
      {
        nombre: 'Press Militar',
        grupoMuscular: 'Hombros',
        equipamiento: 'Barra',
        descripcion: 'Ejercicio compuesto para deltoides',
        thumbnail: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&h=300&fit=crop'
      }
    ];

    setTimeout(() => {
      setEjercicios(ejerciciosEjemplo);
      setLoading(false);
    }, 500);
  }, []);

  const ejerciciosFiltrados = ejercicios.filter(ej =>
    ej.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ej.grupoMuscular.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[80vh] flex flex-col border border-[#E2E8F0] shadow-2xl">
        {/* Header */}
        <div className="p-6 border-b border-[#E2E8F0]">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-[#0F172A]">Seleccionar Ejercicio</h2>
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
              placeholder="Buscar ejercicio..."
              className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl pl-12 pr-4 py-3 text-[#0F172A] placeholder-[#94A3B8] focus:outline-none focus:border-[#6366F1] focus:ring-2 focus:ring-[#6366F1]/20 transition-all duration-200"
              autoFocus
            />
          </div>
        </div>

        {/* Lista de ejercicios */}
        <div className="flex-1 overflow-y-auto p-6">
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#6366F1] border-t-transparent mx-auto"></div>
              <p className="text-[#64748B] mt-4">Cargando ejercicios...</p>
            </div>
          ) : ejerciciosFiltrados.length === 0 ? (
            <div className="text-center py-12">
              <Dumbbell className="w-16 h-16 text-[#94A3B8] mx-auto mb-4" />
              <h3 className="text-xl font-bold text-[#64748B] mb-2">No se encontraron ejercicios</h3>
              <p className="text-[#94A3B8]">Intenta con otro término de búsqueda</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {ejerciciosFiltrados.map((ejercicio, index) => (
                <button
                  key={index}
                  onClick={() => onSelect(ejercicio)}
                  className="bg-white border border-[#E2E8F0] rounded-xl p-4 hover:border-[#6366F1] hover:shadow-md transition-all duration-200 text-left group"
                >
                  <div className="flex gap-4">
                    <div className="relative w-24 h-20 rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={ejercicio.thumbnail}
                        alt={ejercicio.nombre}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-200"
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <Play className="w-6 h-6 text-white opacity-80" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-[#0F172A] group-hover:text-[#6366F1] transition-colors duration-200">
                        {ejercicio.nombre}
                      </h3>
                      <p className="text-sm text-[#64748B] mt-1">{ejercicio.descripcion}</p>
                      <div className="flex gap-2 mt-2">
                        <span className="px-2 py-1 rounded-full bg-[#EEF2FF] text-[#6366F1] text-xs font-medium">
                          {ejercicio.grupoMuscular}
                        </span>
                        <span className="px-2 py-1 rounded-full bg-[#DBEAFE] text-[#3B82F6] text-xs font-medium">
                          {ejercicio.equipamiento}
                        </span>
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

