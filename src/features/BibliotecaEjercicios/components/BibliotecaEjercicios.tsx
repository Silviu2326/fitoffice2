import { useState, useEffect } from 'react';
import { Play, Star, Dumbbell, Heart, TrendingUp } from 'lucide-react';

interface BibliotecaEjerciciosProps {
  searchTerm: string;
  filters: any;
  onSelectEjercicio: (ejercicio: any) => void;
}

export default function BibliotecaEjercicios({ searchTerm, filters, onSelectEjercicio }: BibliotecaEjerciciosProps) {
  const [ejercicios, setEjercicios] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [favoritos, setFavoritos] = useState<string[]>([]);

  // Datos de ejemplo
  useEffect(() => {
    // TODO: Integrar con API real
    const ejerciciosEjemplo = [
      {
        id: '1',
        nombre: 'Press de Banca',
        grupoMuscular: 'Pecho',
        equipamiento: 'Barra',
        dificultad: 'Intermedio',
        descripcion: 'Ejercicio fundamental para desarrollo de pecho',
        videoUrl: 'https://example.com/video1.mp4',
        thumbnail: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
        instrucciones: ['Acostarse en banco', 'Bajar barra controladamente', 'Empujar hacia arriba'],
        advertencias: ['No arquear excesivamente la espalda', 'Mantener pies firmes en el suelo']
      },
      {
        id: '2',
        nombre: 'Sentadilla Profunda',
        grupoMuscular: 'Piernas',
        equipamiento: 'Barra',
        dificultad: 'Avanzado',
        descripcion: 'Ejercicio compuesto para desarrollo de piernas',
        videoUrl: 'https://example.com/video2.mp4',
        thumbnail: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=400&h=300&fit=crop',
        instrucciones: ['Posicionar barra en trapecios', 'Descender manteniendo espalda recta', 'Subir con fuerza'],
        advertencias: ['Precaución con rodillas lesionadas', 'Mantener core activado']
      },
      {
        id: '3',
        nombre: 'Peso Muerto',
        grupoMuscular: 'Espalda',
        equipamiento: 'Barra',
        dificultad: 'Avanzado',
        descripcion: 'Ejercicio fundamental para cadena posterior',
        videoUrl: 'https://example.com/video3.mp4',
        thumbnail: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400&h=300&fit=crop',
        instrucciones: ['Agarre de barra', 'Mantener espalda neutra', 'Extensión de cadera'],
        advertencias: ['Crítico mantener espalda recta', 'No recomendado con lesiones lumbares']
      },
      {
        id: '4',
        nombre: 'Dominadas',
        grupoMuscular: 'Espalda',
        equipamiento: 'Barra fija',
        dificultad: 'Intermedio',
        descripcion: 'Ejercicio de peso corporal para dorsales',
        videoUrl: 'https://example.com/video4.mp4',
        thumbnail: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=300&fit=crop',
        instrucciones: ['Agarre pronado', 'Retracción escapular', 'Subir hasta barbilla'],
        advertencias: ['Precaución con hombros lesionados', 'Evitar balanceo excesivo']
      },
      {
        id: '5',
        nombre: 'Curl de Bíceps',
        grupoMuscular: 'Brazos',
        equipamiento: 'Mancuernas',
        dificultad: 'Principiante',
        descripcion: 'Ejercicio de aislamiento para bíceps',
        videoUrl: 'https://example.com/video5.mp4',
        thumbnail: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=400&h=300&fit=crop',
        instrucciones: ['Codos pegados al cuerpo', 'Flexión controlada', 'Extensión completa'],
        advertencias: ['No balancear el cuerpo', 'Control en fase excéntrica']
      },
      {
        id: '6',
        nombre: 'Press Militar',
        grupoMuscular: 'Hombros',
        equipamiento: 'Barra',
        dificultad: 'Intermedio',
        descripcion: 'Ejercicio compuesto para deltoides',
        videoUrl: 'https://example.com/video6.mp4',
        thumbnail: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&h=300&fit=crop',
        instrucciones: ['Barra a altura de hombros', 'Empuje vertical', 'Control en descenso'],
        advertencias: ['Precaución con lesiones de hombro', 'No arquear espalda excesivamente']
      }
    ];

    setTimeout(() => {
      setEjercicios(ejerciciosEjemplo);
      setLoading(false);
    }, 500);
  }, []);

  // Filtrar ejercicios
  const ejerciciosFiltrados = ejercicios.filter(ej => {
    const matchesSearch = ej.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ej.grupoMuscular.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGrupo = !filters.grupoMuscular || ej.grupoMuscular === filters.grupoMuscular;
    const matchesEquipamiento = !filters.equipamiento || ej.equipamiento === filters.equipamiento;
    const matchesDificultad = !filters.dificultad || ej.dificultad === filters.dificultad;
    
    return matchesSearch && matchesGrupo && matchesEquipamiento && matchesDificultad;
  });

  const toggleFavorito = (id: string) => {
    setFavoritos(prev => 
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  };

  const getDificultadColor = (dificultad: string) => {
    switch(dificultad) {
      case 'Principiante': return 'bg-[#D1FAE5] text-[#10B981] border border-[#10B981]/30';
      case 'Intermedio': return 'bg-[#FEF3C7] text-[#F59E0B] border border-[#F59E0B]/30';
      case 'Avanzado': return 'bg-[#FEE2E2] text-[#EF4444] border border-[#EF4444]/30';
      default: return 'bg-[#F1F5F9] text-[#64748B] border border-[#E2E8F0]';
    }
  };

  if (loading) {
    return (
      <div className="bg-[#1E1E2E] rounded-xl p-8 text-center border border-[#334155]">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#6366F1] border-t-transparent mx-auto"></div>
        <p className="text-[#94A3B8] mt-4">Cargando ejercicios...</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-[#F1F5F9]">
          {ejerciciosFiltrados.length} Ejercicios Disponibles
        </h2>
      </div>

      {ejerciciosFiltrados.map((ejercicio) => (
        <div
          key={ejercicio.id}
          onClick={() => onSelectEjercicio(ejercicio)}
          className="bg-[#1E1E2E] border border-[#334155] rounded-xl p-4 hover:border-[#6366F1] hover:shadow-lg transition-all duration-200 ease-out cursor-pointer group"
        >
          <div className="flex gap-4">
            {/* Thumbnail */}
            <div className="relative w-32 h-24 rounded-lg overflow-hidden flex-shrink-0">
              <img 
                src={ejercicio.thumbnail} 
                alt={ejercicio.nombre}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <Play className="w-8 h-8 text-white opacity-80" />
              </div>
            </div>

            {/* Información */}
            <div className="flex-1">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="text-lg font-bold text-[#F1F5F9] group-hover:text-[#6366F1] transition-colors duration-200 ease-out">
                    {ejercicio.nombre}
                  </h3>
                  <p className="text-sm text-[#94A3B8]">{ejercicio.descripcion}</p>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorito(ejercicio.id);
                  }}
                  className={`p-2 rounded-lg transition-all duration-200 ease-out ${
                    favoritos.includes(ejercicio.id)
                      ? 'text-[#EF4444] bg-[#FEE2E2]'
                      : 'text-[#94A3B8] hover:text-[#EF4444] hover:bg-[#2A2A3A]'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${favoritos.includes(ejercicio.id) ? 'fill-current' : ''}`} />
                </button>
              </div>

              {/* Badges */}
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 rounded-full bg-[#EEF2FF] text-[#6366F1] text-xs font-medium border border-[#6366F1]/30">
                  <Dumbbell className="w-3 h-3 inline mr-1" />
                  {ejercicio.grupoMuscular}
                </span>
                <span className="px-3 py-1 rounded-full bg-[#DBEAFE] text-[#3B82F6] text-xs font-medium border border-[#3B82F6]/30">
                  {ejercicio.equipamiento}
                </span>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getDificultadColor(ejercicio.dificultad)}`}>
                  <TrendingUp className="w-3 h-3 inline mr-1" />
                  {ejercicio.dificultad}
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}

      {ejerciciosFiltrados.length === 0 && (
        <div className="bg-[#1E1E2E] border border-[#334155] rounded-xl p-12 text-center">
          <Dumbbell className="w-16 h-16 text-[#64748B] mx-auto mb-4" />
          <h3 className="text-xl font-bold text-[#94A3B8] mb-2">No se encontraron ejercicios</h3>
          <p className="text-[#64748B]">Intenta ajustar los filtros o el término de búsqueda</p>
        </div>
      )}
    </div>
  );
}

