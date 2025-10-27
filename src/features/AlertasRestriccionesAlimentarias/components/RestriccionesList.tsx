import { Plus, Edit, AlertTriangle, Shield, Eye } from 'lucide-react';

interface Restriccion {
  id: string;
  clienteId: string;
  clienteNombre: string;
  tipo: 'alergia' | 'intolerancia' | 'religiosa' | 'cultural';
  descripcion: string;
  severidad: 'leve' | 'moderada' | 'severa';
  ingredientes: string[];
  fechaRegistro: string;
  activa: boolean;
}

interface RestriccionesListProps {
  onNuevaRestriccion: () => void;
  onEditarRestriccion: (restriccion: Restriccion) => void;
  onVerAlertas: (restriccion: Restriccion) => void;
  onVerSustituciones: (restriccion: Restriccion) => void;
}

export default function RestriccionesList({
  onNuevaRestriccion,
  onEditarRestriccion,
  onVerAlertas,
  onVerSustituciones
}: RestriccionesListProps) {
  // Datos mock
  const restricciones: Restriccion[] = [
    {
      id: '1',
      clienteId: 'C001',
      clienteNombre: 'María García',
      tipo: 'alergia',
      descripcion: 'Alergia al maní y frutos secos',
      severidad: 'severa',
      ingredientes: ['maní', 'almendras', 'nueces', 'avellanas'],
      fechaRegistro: '2024-01-15',
      activa: true
    },
    {
      id: '2',
      clienteId: 'C002',
      clienteNombre: 'Juan Pérez',
      tipo: 'intolerancia',
      descripcion: 'Intolerancia a la lactosa',
      severidad: 'moderada',
      ingredientes: ['leche', 'queso', 'yogur', 'mantequilla'],
      fechaRegistro: '2024-02-20',
      activa: true
    },
    {
      id: '3',
      clienteId: 'C003',
      clienteNombre: 'Ahmed Hassan',
      tipo: 'religiosa',
      descripcion: 'Restricción Halal',
      severidad: 'severa',
      ingredientes: ['cerdo', 'alcohol', 'gelatina de cerdo'],
      fechaRegistro: '2024-03-10',
      activa: true
    }
  ];

  const getTipoColor = (tipo: string) => {
    switch (tipo) {
      case 'alergia': return 'red';
      case 'intolerancia': return 'orange';
      case 'religiosa': return 'purple';
      case 'cultural': return 'blue';
      default: return 'gray';
    }
  };

  const getSeveridadColor = (severidad: string) => {
    switch (severidad) {
      case 'severa': return 'red';
      case 'moderada': return 'orange';
      case 'leve': return 'yellow';
      default: return 'gray';
    }
  };

  return (
    <div>
      {/* Header con botón de nueva restricción */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-[#0F172A]">Restricciones Alimentarias Registradas</h2>
          <p className="text-[#64748B] mt-1">
            Gestión completa de alergias, intolerancias y restricciones
          </p>
        </div>
        <button
          onClick={onNuevaRestriccion}
          className="px-6 py-3 bg-[#6366F1] hover:bg-[#4F46E5] active:bg-[#4338CA] text-white rounded-lg font-semibold transition-all duration-200 flex items-center gap-2 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
        >
          <Plus className="w-5 h-5" />
          Nueva Restricción
        </button>
      </div>

      {/* Lista de restricciones */}
      <div className="space-y-4">
        {restricciones.map((restriccion) => {
          const tipoColor = getTipoColor(restriccion.tipo);
          const severidadColor = getSeveridadColor(restriccion.severidad);
          
          return (
            <div
              key={restriccion.id}
              className="bg-white border border-[#E2E8F0] rounded-xl p-6 hover:border-[#6366F1] hover:shadow-lg transition-all duration-200"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  {/* Cliente y tipo */}
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="text-xl font-bold text-[#0F172A]">
                      {restriccion.clienteNombre}
                    </h3>
                    <span className={`px-3 py-1 bg-${tipoColor}-500/20 text-${tipoColor}-400 rounded-full text-sm font-medium`}>
                      {restriccion.tipo}
                    </span>
                    <span className={`px-3 py-1 bg-${severidadColor}-500/20 text-${severidadColor}-400 rounded-full text-sm font-medium flex items-center gap-1`}>
                      <AlertTriangle className="w-3 h-3" />
                      {restriccion.severidad}
                    </span>
                  </div>

                  {/* Descripción */}
                  <p className="text-[#64748B] mb-4">
                    {restriccion.descripcion}
                  </p>

                  {/* Ingredientes bloqueados */}
                  <div className="mb-4">
                    <p className="text-[#64748B] text-sm mb-2 font-medium">Ingredientes bloqueados:</p>
                    <div className="flex flex-wrap gap-2">
                      {restriccion.ingredientes.map((ingrediente, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-[#FEE2E2] text-[#EF4444] rounded-lg text-sm border border-[#FEE2E2]"
                        >
                          {ingrediente}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Fecha de registro */}
                  <p className="text-[#94A3B8] text-sm">
                    Registrado el: {new Date(restriccion.fechaRegistro).toLocaleDateString('es-ES')}
                  </p>
                </div>

                {/* Acciones */}
                <div className="flex flex-col gap-2 ml-4">
                  <button
                    onClick={() => onEditarRestriccion(restriccion)}
                    className="p-2 bg-[#F8FAFC] hover:bg-[#F1F5F9] text-[#64748B] hover:text-[#0F172A] border border-[#E2E8F0] rounded-lg transition-all duration-200"
                    title="Editar restricción"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onVerAlertas(restriccion)}
                    className="p-2 bg-[#FEE2E2] hover:bg-[#FCA5A5] text-[#EF4444] hover:text-[#DC2626] rounded-lg transition-all duration-200"
                    title="Ver alertas"
                  >
                    <AlertTriangle className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onVerSustituciones(restriccion)}
                    className="p-2 bg-[#D1FAE5] hover:bg-[#10B981] text-[#10B981] hover:text-white rounded-lg transition-all duration-200"
                    title="Ver sustituciones"
                  >
                    <Shield className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Mensaje si no hay restricciones */}
      {restricciones.length === 0 && (
        <div className="text-center py-12">
          <AlertTriangle className="w-16 h-16 text-[#94A3B8] mx-auto mb-4" />
          <h3 className="text-xl font-bold text-[#64748B] mb-2">
            No hay restricciones registradas
          </h3>
          <p className="text-[#94A3B8] mb-6">
            Comienza registrando las restricciones alimentarias de tus clientes
          </p>
          <button
            onClick={onNuevaRestriccion}
            className="px-6 py-3 bg-[#6366F1] hover:bg-[#4F46E5] active:bg-[#4338CA] text-white rounded-lg font-semibold transition-all duration-200 inline-flex items-center gap-2 shadow-md hover:shadow-lg"
          >
            <Plus className="w-5 h-5" />
            Registrar Primera Restricción
          </button>
        </div>
      )}
    </div>
  );
}

