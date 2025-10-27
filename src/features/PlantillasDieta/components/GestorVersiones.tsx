import { GitBranch, Clock, CheckCircle, ArrowRight, Eye, Download } from 'lucide-react';

export default function GestorVersiones() {
  const versiones = [
    {
      version: 3,
      fecha: '2025-02-20',
      cambios: [
        'Incremento de proteínas en el desayuno (+20g)',
        'Ajuste de carbohidratos en la cena (-30g)',
        'Añadido snack post-entreno opcional',
      ],
      autor: 'Dr. Juan Pérez',
      estado: 'actual',
      usos: 15,
      efectividad: 94,
    },
    {
      version: 2,
      fecha: '2025-02-01',
      cambios: [
        'Optimización de distribución de macros',
        'Mejora en timing de carbohidratos',
        'Añadidas alternativas para alimentos',
      ],
      autor: 'Dr. Juan Pérez',
      estado: 'anterior',
      usos: 25,
      efectividad: 92,
    },
    {
      version: 1,
      fecha: '2025-01-15',
      cambios: [
        'Versión inicial de la plantilla',
        'Estructura básica de comidas',
        'Definición de macros objetivo',
      ],
      autor: 'Dr. Juan Pérez',
      estado: 'archivo',
      usos: 8,
      efectividad: 88,
    },
  ];

  const estadoColors = {
    actual: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    anterior: 'bg-blue-100 text-blue-700 border-blue-200',
    archivo: 'bg-slate-100 text-slate-700 border-slate-200',
  };

  const estadoLabels = {
    actual: 'Versión Actual',
    anterior: 'Versión Anterior',
    archivo: 'Archivo',
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-md border border-[#E2E8F0] p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <GitBranch className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-[#0F172A]">Control de Versiones</h2>
              <p className="text-sm text-[#94A3B8] mt-1">
                Gestiona el historial de cambios de tus plantillas
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-[#94A3B8]">Versión actual</p>
            <p className="text-2xl font-bold text-purple-600">v{versiones[0].version}</p>
          </div>
        </div>
      </div>

      {/* Seleccionar Plantilla */}
      <div className="bg-white rounded-xl shadow-md border border-[#E2E8F0] p-6">
        <label className="block text-sm font-semibold text-[#0F172A] mb-2">
          Seleccionar Plantilla
        </label>
        <select className="w-full h-12 px-4 py-3 border border-[#E2E8F0] rounded-xl focus:ring-2 focus:ring-[#6366F1] focus:border-transparent transition-all duration-200 ease-out">
          <option value="1">Déficit Suave 2-3kg/mes</option>
          <option value="2">Vegetariana 1800 kcal</option>
          <option value="3">Volumen Limpio 3000 kcal</option>
          <option value="4">Keto Estricta 1500 kcal</option>
        </select>
      </div>

      {/* Timeline de Versiones */}
      <div className="bg-white rounded-xl shadow-md border border-[#E2E8F0] p-6">
        <h3 className="text-lg font-bold text-[#0F172A] mb-6">Historial de Versiones</h3>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-[#E2E8F0]"></div>

          <div className="space-y-8">
            {versiones.map((version, index) => (
              <div key={version.version} className="relative pl-16">
                {/* Timeline Dot */}
                <div
                  className={`absolute left-0 w-12 h-12 rounded-full flex items-center justify-center ${
                    version.estado === 'actual'
                      ? 'bg-emerald-100 border-4 border-emerald-500'
                      : version.estado === 'anterior'
                      ? 'bg-blue-100 border-4 border-blue-400'
                      : 'bg-[#F8FAFC] border-4 border-[#E2E8F0]'
                  }`}
                >
                  {version.estado === 'actual' ? (
                    <CheckCircle className="w-5 h-5 text-emerald-600" />
                  ) : (
                    <GitBranch className="w-5 h-5 text-[#94A3B8]" />
                  )}
                </div>

                {/* Content */}
                <div className="bg-[#F8FAFC] rounded-xl border border-[#E2E8F0] p-5">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="text-lg font-bold text-[#0F172A]">Versión {version.version}</h4>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium border ${
                            estadoColors[version.estado as keyof typeof estadoColors]
                          }`}
                        >
                          {estadoLabels[version.estado as keyof typeof estadoLabels]}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-[#94A3B8]">
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{version.fecha}</span>
                        </div>
                        <span>•</span>
                        <span>Por {version.autor}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button className="p-2 hover:bg-white rounded-xl transition-all duration-200 ease-out" title="Ver">
                        <Eye className="w-4 h-4 text-[#94A3B8]" />
                      </button>
                      <button className="p-2 hover:bg-white rounded-xl transition-all duration-200 ease-out" title="Restaurar">
                        <Download className="w-4 h-4 text-[#94A3B8]" />
                      </button>
                    </div>
                  </div>

                  {/* Cambios */}
                  <div className="mb-4">
                    <p className="text-sm font-semibold text-[#0F172A] mb-2">Cambios realizados:</p>
                    <ul className="space-y-1">
                      {version.cambios.map((cambio, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-[#94A3B8]">
                          <ArrowRight className="w-4 h-4 text-purple-500 mt-0.5 flex-shrink-0" />
                          <span>{cambio}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Stats */}
                  <div className="flex gap-6 pt-4 border-t border-[#E2E8F0]">
                    <div>
                      <p className="text-xs text-[#94A3B8]">Usos</p>
                      <p className="text-lg font-bold text-[#0F172A]">{version.usos}</p>
                    </div>
                    <div>
                      <p className="text-xs text-[#94A3B8]">Efectividad</p>
                      <p className="text-lg font-bold text-emerald-600">{version.efectividad}%</p>
                    </div>
                    {index > 0 && (
                      <div>
                        <p className="text-xs text-[#94A3B8]">Mejora</p>
                        <p className="text-lg font-bold text-blue-600">
                          +{version.efectividad - versiones[index - 1].efectividad}%
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Comparar Versiones */}
      <div className="bg-white rounded-xl shadow-md border border-[#E2E8F0] p-6">
        <h3 className="text-lg font-bold text-[#0F172A] mb-4">Comparar Versiones</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-[#0F172A] mb-2">Versión A</label>
            <select className="w-full h-12 px-4 py-3 border border-[#E2E8F0] rounded-xl focus:ring-2 focus:ring-[#6366F1] focus:border-transparent transition-all duration-200 ease-out">
              <option value="3">v3 - Actual</option>
              <option value="2">v2 - 2025-02-01</option>
              <option value="1">v1 - 2025-01-15</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-[#0F172A] mb-2">Versión B</label>
            <select className="w-full h-12 px-4 py-3 border border-[#E2E8F0] rounded-xl focus:ring-2 focus:ring-[#6366F1] focus:border-transparent transition-all duration-200 ease-out">
              <option value="2">v2 - 2025-02-01</option>
              <option value="3">v3 - Actual</option>
              <option value="1">v1 - 2025-01-15</option>
            </select>
          </div>
        </div>
        <button className="mt-4 w-full px-6 py-3 bg-[#6366F1] text-white rounded-xl hover:bg-[#4F46E5] active:bg-[#4338CA] transition-all duration-200 ease-out font-semibold shadow-md hover:shadow-lg">
          Comparar Versiones
        </button>
      </div>

      {/* Crear Nueva Versión */}
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-xl p-6">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-white rounded-lg shadow-sm">
            <GitBranch className="w-6 h-6 text-purple-600" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-[#0F172A] mb-2">Crear Nueva Versión</h3>
            <p className="text-sm text-[#94A3B8] mb-4">
              Crea una nueva versión de esta plantilla con mejoras o ajustes basados en los resultados
              obtenidos.
            </p>
            <button className="px-6 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 active:bg-purple-800 transition-all duration-200 ease-out font-semibold shadow-md hover:shadow-lg">
              Nueva Versión
            </button>
          </div>
        </div>
      </div>

      {/* Tips */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
        <h3 className="text-sm font-bold text-blue-900 mb-2">💡 Buenas Prácticas de Versionado</h3>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Documenta claramente los cambios realizados en cada versión</li>
          <li>• Compara métricas de efectividad entre versiones para validar mejoras</li>
          <li>• Mantén al menos 3 versiones anteriores como respaldo</li>
          <li>• Crea una nueva versión cuando hagas cambios significativos (no para ajustes menores)</li>
        </ul>
      </div>
    </div>
  );
}

