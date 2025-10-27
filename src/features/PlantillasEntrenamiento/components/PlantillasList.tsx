import { useState } from 'react';
import { Plus, Copy, Eye, Edit, Trash2, Star, TrendingUp } from 'lucide-react';

interface Plantilla {
  id: string;
  nombre: string;
  tipo: string;
  descripcion: string;
  duracion: string;
  nivel: string;
  categoria: string;
  usos: number;
  efectividad: number;
  version: string;
}

interface Props {
  onNuevaPlantilla: () => void;
  onEditarPlantilla: (plantilla: Plantilla) => void;
  onDuplicarPlantilla: (plantilla: Plantilla) => void;
  onVerPlantilla: (plantilla: Plantilla) => void;
  categoriaFiltro: string;
  terminoBusqueda: string;
}

export default function PlantillasList({
  onNuevaPlantilla,
  onEditarPlantilla,
  onDuplicarPlantilla,
  onVerPlantilla
}: Props) {
  const [plantillas] = useState<Plantilla[]>([
    {
      id: '1',
      nombre: 'Hipertrofia 12 Semanas',
      tipo: 'Fuerza',
      descripcion: 'Programa completo de hipertrofia muscular de 12 semanas',
      duracion: '12 semanas',
      nivel: 'Intermedio',
      categoria: 'Fuerza',
      usos: 45,
      efectividad: 92,
      version: '2.1'
    },
    {
      id: '2',
      nombre: 'Pierna 2x/Semana',
      tipo: 'Fuerza',
      descripcion: 'Rutina especializada de piernas dos veces por semana',
      duracion: '8 semanas',
      nivel: 'Avanzado',
      categoria: 'Fuerza',
      usos: 32,
      efectividad: 88,
      version: '1.5'
    },
    {
      id: '3',
      nombre: 'Cardio HIIT Intensivo',
      tipo: 'Cardio',
      descripcion: 'Programa de alta intensidad para pérdida de grasa',
      duracion: '6 semanas',
      nivel: 'Intermedio',
      categoria: 'Cardio',
      usos: 28,
      efectividad: 85,
      version: '1.0'
    },
    {
      id: '4',
      nombre: 'Full Body 3 Días',
      tipo: 'Fuerza',
      descripcion: 'Entrenamiento de cuerpo completo 3 días por semana',
      duracion: '10 semanas',
      nivel: 'Principiante',
      categoria: 'Fuerza',
      usos: 67,
      efectividad: 90,
      version: '3.0'
    },
    {
      id: '5',
      nombre: 'Movilidad y Flexibilidad',
      tipo: 'Movilidad',
      descripcion: 'Programa de mejora de movilidad y rango de movimiento',
      duracion: '4 semanas',
      nivel: 'Todos',
      categoria: 'Movilidad',
      usos: 19,
      efectividad: 82,
      version: '1.2'
    }
  ]);

  const getNivelColor = (nivel: string) => {
    switch (nivel.toLowerCase()) {
      case 'principiante':
        return 'text-green-400 bg-green-500/20';
      case 'intermedio':
        return 'text-yellow-400 bg-yellow-500/20';
      case 'avanzado':
        return 'text-red-400 bg-red-500/20';
      default:
        return 'text-blue-400 bg-blue-500/20';
    }
  };

  return (
    <div>
      {/* Header con botón de nueva plantilla */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-bold text-[#F1F5F9]">Catálogo de Plantillas</h2>
          <p className="text-[#94A3B8] text-sm mt-1">
            {plantillas.length} plantillas disponibles
          </p>
        </div>
        <button
          onClick={onNuevaPlantilla}
          className="flex items-center gap-2 px-6 py-3 bg-[#6366F1] text-white rounded-xl hover:bg-[#4F46E5] active:bg-[#4338CA] transition-all duration-200 font-semibold shadow-md hover:shadow-lg active:scale-98"
        >
          <Plus className="w-5 h-5" />
          Nueva Plantilla
        </button>
      </div>

      {/* Lista de plantillas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {plantillas.map((plantilla) => (
          <div
            key={plantilla.id}
            className="bg-[#1E1E2E] border border-[#334155] rounded-2xl p-6 hover:border-[#6366F1]/50 transition-all duration-200 shadow-md hover:shadow-xl hover:-translate-y-1"
          >
            {/* Header de la tarjeta */}
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-lg font-bold text-[#F1F5F9]">{plantilla.nombre}</h3>
                  <span className="text-xs text-[#94A3B8] px-2 py-1 bg-[#2A2A3A] rounded-md font-medium">
                    v{plantilla.version}
                  </span>
                </div>
                <p className="text-[#94A3B8] text-sm">{plantilla.descripcion}</p>
              </div>
            </div>

            {/* Información de la plantilla */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-xs text-[#64748B] mb-1 font-medium">Nivel</p>
                <span className={`text-xs px-3 py-1.5 rounded-lg font-medium ${getNivelColor(plantilla.nivel)}`}>
                  {plantilla.nivel}
                </span>
              </div>
              <div>
                <p className="text-xs text-[#64748B] mb-1 font-medium">Duración</p>
                <p className="text-sm text-[#F1F5F9] font-semibold">{plantilla.duracion}</p>
              </div>
            </div>

            {/* Métricas */}
            <div className="flex gap-4 mb-4 p-4 bg-[#0F0F23]/50 rounded-xl border border-[#334155]">
              <div className="flex items-center gap-2">
                <Copy className="w-4 h-4 text-[#3B82F6]" />
                <div>
                  <p className="text-xs text-[#64748B] font-medium">Usos</p>
                  <p className="text-sm font-semibold text-[#F1F5F9]">{plantilla.usos}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-[#10B981]" />
                <div>
                  <p className="text-xs text-[#64748B] font-medium">Efectividad</p>
                  <p className="text-sm font-semibold text-[#F1F5F9]">{plantilla.efectividad}%</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-[#F59E0B]" />
                <div>
                  <p className="text-xs text-[#64748B] font-medium">Categoría</p>
                  <p className="text-sm font-semibold text-[#F1F5F9]">{plantilla.categoria}</p>
                </div>
              </div>
            </div>

            {/* Acciones */}
            <div className="flex gap-2">
              <button
                onClick={() => onVerPlantilla(plantilla)}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-[#3B82F6] text-white rounded-xl hover:bg-[#2563EB] transition-all duration-200 text-sm font-semibold shadow-sm hover:shadow-md"
              >
                <Eye className="w-4 h-4" />
                Ver
              </button>
              <button
                onClick={() => onDuplicarPlantilla(plantilla)}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-[#8B5CF6] text-white rounded-xl hover:bg-[#7C3AED] transition-all duration-200 text-sm font-semibold shadow-sm hover:shadow-md"
              >
                <Copy className="w-4 h-4" />
                Duplicar
              </button>
              <button
                onClick={() => onEditarPlantilla(plantilla)}
                className="flex items-center justify-center gap-2 px-3 py-2.5 bg-[#2A2A3A] text-[#F1F5F9] rounded-xl hover:bg-[#334155] transition-all duration-200 text-sm border border-[#334155]"
              >
                <Edit className="w-4 h-4" />
              </button>
              <button
                onClick={() => console.log('Eliminar', plantilla.id)}
                className="flex items-center justify-center gap-2 px-3 py-2.5 bg-[#EF4444]/10 text-[#EF4444] rounded-xl hover:bg-[#EF4444]/20 transition-all duration-200 text-sm border border-[#EF4444]/30"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

