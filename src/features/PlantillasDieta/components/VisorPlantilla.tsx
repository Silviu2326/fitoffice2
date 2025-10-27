import { Eye, Clock, Utensils, Apple, Calendar, Star, Users } from 'lucide-react';

export default function VisorPlantilla() {
  const plantilla = {
    id: 1,
    nombre: 'Déficit Suave 2-3kg/mes',
    categoria: 'Pérdida de Peso',
    objetivo: 'Déficit Calórico',
    descripcion: 'Plan nutricional diseñado para una pérdida de peso gradual y sostenible de 2-3kg por mes. Ideal para personas que buscan reducir grasa corporal sin pasar hambre.',
    calorias: 1600,
    macros: {
      proteinas: 120,
      carbohidratos: 150,
      grasas: 50,
    },
    distribucion: {
      proteinas: 30,
      carbohidratos: 38,
      grasas: 28,
    },
    usos: 25,
    efectividad: 92,
    version: 2,
    creador: 'Dr. Juan Pérez',
    fechaCreacion: '2025-02-01',
    fechaActualizacion: '2025-02-15',
  };

  const comidas = [
    {
      id: 1,
      nombre: 'Desayuno',
      hora: '08:00',
      calorias: 400,
      alimentos: [
        { nombre: 'Avena', cantidad: '50g', calorias: 190 },
        { nombre: 'Proteína en polvo', cantidad: '30g', calorias: 120 },
        { nombre: 'Plátano', cantidad: '1 unidad', calorias: 90 },
      ],
    },
    {
      id: 2,
      nombre: 'Almuerzo',
      hora: '13:00',
      calorias: 500,
      alimentos: [
        { nombre: 'Pechuga de pollo', cantidad: '150g', calorias: 250 },
        { nombre: 'Arroz integral', cantidad: '80g', calorias: 150 },
        { nombre: 'Brócoli', cantidad: '150g', calorias: 50 },
        { nombre: 'Aceite de oliva', cantidad: '10ml', calorias: 90 },
      ],
    },
    {
      id: 3,
      nombre: 'Merienda',
      hora: '17:00',
      calorias: 250,
      alimentos: [
        { nombre: 'Yogur griego', cantidad: '150g', calorias: 130 },
        { nombre: 'Frutos secos', cantidad: '20g', calorias: 120 },
      ],
    },
    {
      id: 4,
      nombre: 'Cena',
      hora: '20:00',
      calorias: 450,
      alimentos: [
        { nombre: 'Salmón', cantidad: '150g', calorias: 280 },
        { nombre: 'Batata', cantidad: '100g', calorias: 90 },
        { nombre: 'Espárragos', cantidad: '150g', calorias: 30 },
        { nombre: 'Aguacate', cantidad: '30g', calorias: 50 },
      ],
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-md border border-[#E2E8F0] p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-[#EEF2FF] rounded-lg">
                <Eye className="w-5 h-5 text-[#6366F1]" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-[#0F172A]">{plantilla.nombre}</h2>
                <span className="px-3 py-1 bg-[#FEE2E2] text-red-700 rounded-full text-sm font-medium">
                  {plantilla.categoria}
                </span>
              </div>
            </div>
            <p className="text-[#94A3B8] mt-2">{plantilla.descripcion}</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 text-amber-500">
              <Star className="w-5 h-5 fill-current" />
              <span className="text-lg font-bold">{plantilla.efectividad}%</span>
            </div>
          </div>
        </div>

        {/* Metadata */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-[#E2E8F0]">
          <div className="flex items-center gap-2 text-sm">
            <Users className="w-4 h-4 text-[#94A3B8]" />
            <div>
              <p className="text-[#94A3B8]">Usos</p>
              <p className="font-semibold text-[#0F172A]">{plantilla.usos} veces</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="w-4 h-4 text-[#94A3B8]" />
            <div>
              <p className="text-[#94A3B8]">Creada</p>
              <p className="font-semibold text-[#0F172A]">{plantilla.fechaCreacion}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Clock className="w-4 h-4 text-[#94A3B8]" />
            <div>
              <p className="text-[#94A3B8]">Versión</p>
              <p className="font-semibold text-[#0F172A]">v{plantilla.version}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Users className="w-4 h-4 text-[#94A3B8]" />
            <div>
              <p className="text-[#94A3B8]">Creador</p>
              <p className="font-semibold text-[#0F172A]">{plantilla.creador}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Macros Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-md border border-[#E2E8F0] p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[#94A3B8] text-sm font-semibold">Calorías Totales</span>
            <Apple className="w-5 h-5 text-[#6366F1]" />
          </div>
          <p className="text-3xl font-bold text-[#0F172A]">{plantilla.calorias}</p>
          <p className="text-xs text-[#94A3B8] mt-1">kcal/día</p>
        </div>

        <div className="bg-white rounded-xl shadow-md border border-[#E2E8F0] p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[#94A3B8] text-sm font-semibold">Proteínas</span>
            <div className="w-5 h-5 rounded-full bg-blue-500"></div>
          </div>
          <p className="text-3xl font-bold text-blue-600">{plantilla.macros.proteinas}g</p>
          <p className="text-xs text-[#94A3B8] mt-1">{plantilla.distribucion.proteinas}% del total</p>
        </div>

        <div className="bg-white rounded-xl shadow-md border border-[#E2E8F0] p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[#94A3B8] text-sm font-semibold">Carbohidratos</span>
            <div className="w-5 h-5 rounded-full bg-amber-500"></div>
          </div>
          <p className="text-3xl font-bold text-amber-600">{plantilla.macros.carbohidratos}g</p>
          <p className="text-xs text-[#94A3B8] mt-1">{plantilla.distribucion.carbohidratos}% del total</p>
        </div>

        <div className="bg-white rounded-xl shadow-md border border-[#E2E8F0] p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[#94A3B8] text-sm font-semibold">Grasas</span>
            <div className="w-5 h-5 rounded-full bg-red-500"></div>
          </div>
          <p className="text-3xl font-bold text-red-600">{plantilla.macros.grasas}g</p>
          <p className="text-xs text-[#94A3B8] mt-1">{plantilla.distribucion.grasas}% del total</p>
        </div>
      </div>

      {/* Distribución de Macros */}
      <div className="bg-white rounded-xl shadow-md border border-[#E2E8F0] p-6">
        <h3 className="text-lg font-bold text-[#0F172A] mb-4">Distribución de Macronutrientes</h3>
        <div className="space-y-3">
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-semibold text-blue-700">Proteínas</span>
              <span className="text-sm font-bold text-blue-900">{plantilla.distribucion.proteinas}%</span>
            </div>
            <div className="w-full bg-[#E2E8F0] rounded-full h-3">
              <div
                className="bg-blue-500 h-3 rounded-full transition-all duration-200 ease-out"
                style={{ width: `${plantilla.distribucion.proteinas}%` }}
              ></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-semibold text-amber-700">Carbohidratos</span>
              <span className="text-sm font-bold text-amber-900">{plantilla.distribucion.carbohidratos}%</span>
            </div>
            <div className="w-full bg-[#E2E8F0] rounded-full h-3">
              <div
                className="bg-amber-500 h-3 rounded-full transition-all duration-200 ease-out"
                style={{ width: `${plantilla.distribucion.carbohidratos}%` }}
              ></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-semibold text-red-700">Grasas</span>
              <span className="text-sm font-bold text-red-900">{plantilla.distribucion.grasas}%</span>
            </div>
            <div className="w-full bg-[#E2E8F0] rounded-full h-3">
              <div
                className="bg-red-500 h-3 rounded-full transition-all duration-200 ease-out"
                style={{ width: `${plantilla.distribucion.grasas}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Plan de Comidas */}
      <div className="bg-white rounded-xl shadow-md border border-[#E2E8F0] p-6">
        <div className="flex items-center gap-2 mb-6">
          <Utensils className="w-5 h-5 text-[#6366F1]" />
          <h3 className="text-lg font-bold text-[#0F172A]">Plan de Comidas</h3>
        </div>

        <div className="space-y-4">
          {comidas.map((comida) => (
            <div
              key={comida.id}
              className="border border-[#E2E8F0] rounded-xl p-4 hover:border-[#6366F1] transition-all duration-200 ease-out"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-[#EEF2FF] rounded-lg">
                    <Utensils className="w-4 h-4 text-[#6366F1]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#0F172A]">{comida.nombre}</h4>
                    <div className="flex items-center gap-2 text-sm text-[#94A3B8]">
                      <Clock className="w-3 h-3" />
                      <span>{comida.hora}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-[#0F172A]">{comida.calorias}</p>
                  <p className="text-xs text-[#94A3B8]">kcal</p>
                </div>
              </div>

              <div className="space-y-2">
                {comida.alimentos.map((alimento, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between py-2 px-3 bg-[#F8FAFC] rounded"
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-[#6366F1] rounded-full"></div>
                      <span className="text-sm text-[#0F172A]">{alimento.nombre}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-[#94A3B8]">{alimento.cantidad}</span>
                      <span className="text-sm font-semibold text-[#0F172A] w-16 text-right">
                        {alimento.calorias} kcal
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Acciones */}
      <div className="flex gap-4">
        <button className="flex-1 px-6 py-3 bg-[#6366F1] text-white rounded-xl hover:bg-[#4F46E5] active:bg-[#4338CA] transition-all duration-200 ease-out font-semibold shadow-md hover:shadow-lg">
          Duplicar Plantilla
        </button>
        <button className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 active:bg-blue-800 transition-all duration-200 ease-out font-semibold shadow-md hover:shadow-lg">
          Asignar a Cliente
        </button>
        <button className="px-6 py-3 border border-[#E2E8F0] text-[#0F172A] rounded-xl hover:bg-[#F8FAFC] transition-all duration-200 ease-out font-semibold">
          Editar
        </button>
      </div>
    </div>
  );
}

