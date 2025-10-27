import { useState } from 'react';
import { Users, CheckCircle, XCircle, DollarSign } from 'lucide-react';

interface MultisesionCliente {
  id: string;
  cliente_principal: string;
  usuarios_adicionales: string[];
  plan: string;
  max_usuarios: number;
  precio_base: number;
  precio_por_adicional: number;
  estado: 'activo' | 'inactivo';
}

export default function Multisesion() {
  const [multisesiones] = useState<MultisesionCliente[]>([
    {
      id: '1',
      cliente_principal: 'Familia García',
      usuarios_adicionales: ['María García', 'Pedro García', 'Ana García'],
      plan: 'Plan Familiar Premium',
      max_usuarios: 5,
      precio_base: 99,
      precio_por_adicional: 15,
      estado: 'activo'
    },
    {
      id: '2',
      cliente_principal: 'Empresa TechCorp',
      usuarios_adicionales: ['Juan López', 'Laura Martínez', 'Carlos Ruiz', 'Sofia Pérez'],
      plan: 'Plan Corporativo',
      max_usuarios: 10,
      precio_base: 299,
      precio_por_adicional: 20,
      estado: 'activo'
    }
  ]);

  const calcularPrecioTotal = (ms: MultisesionCliente): number => {
    return ms.precio_base + (ms.usuarios_adicionales.length * ms.precio_por_adicional);
  };

  const agregarUsuario = (id: string) => {
    alert(`Agregando nuevo usuario a multisesión ${id}`);
  };

  return (
    <div className="space-y-6">
      {/* Encabezado */}
      <div>
        <h2 className="text-2xl font-bold text-[#0F172A]">Multisesión</h2>
        <p className="text-[#64748B] mt-1">Gestión de acceso a múltiples servicios y usuarios</p>
      </div>

      {/* Información */}
      <div className="bg-[#EEF2FF] border border-[#6366F1]/20 rounded-xl p-5">
        <div className="flex gap-3">
          <div className="bg-white p-2 rounded-lg flex-shrink-0">
            <Users className="w-5 h-5 text-[#6366F1]" />
          </div>
          <div>
            <h3 className="font-bold text-[#0F172A] mb-2">¿Qué es Multisesión?</h3>
            <p className="text-sm text-[#64748B] leading-relaxed">
              La multisesión permite que varios usuarios accedan a los servicios bajo una misma 
              suscripción. Ideal para familias, parejas o empresas que quieren compartir beneficios 
              y optimizar costos.
            </p>
          </div>
        </div>
      </div>

      {/* Resumen */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-200">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-[#EEF2FF] p-3 rounded-xl">
              <Users className="w-6 h-6 text-[#6366F1]" />
            </div>
            <span className="text-sm font-semibold text-[#64748B]">Total Cuentas</span>
          </div>
          <p className="text-3xl font-bold text-[#0F172A]">
            {multisesiones.filter(m => m.estado === 'activo').length}
          </p>
        </div>

        <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-200">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-[#D1FAE5] p-3 rounded-xl">
              <CheckCircle className="w-6 h-6 text-[#10B981]" />
            </div>
            <span className="text-sm font-semibold text-[#64748B]">Usuarios Activos</span>
          </div>
          <p className="text-3xl font-bold text-[#0F172A]">
            {multisesiones.reduce((sum, m) => sum + m.usuarios_adicionales.length + 1, 0)}
          </p>
        </div>

        <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-200">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-[#D1FAE5] p-3 rounded-xl">
              <DollarSign className="w-6 h-6 text-[#10B981]" />
            </div>
            <span className="text-sm font-semibold text-[#64748B]">Ingresos Totales</span>
          </div>
          <p className="text-3xl font-bold text-[#0F172A]">
            €{multisesiones.reduce((sum, m) => sum + calcularPrecioTotal(m), 0)}
          </p>
        </div>
      </div>

      {/* Lista de multisesiones */}
      <div className="space-y-4">
        {multisesiones.map(ms => {
          const precioTotal = calcularPrecioTotal(ms);
          const espaciosDisponibles = ms.max_usuarios - (ms.usuarios_adicionales.length + 1);

          return (
            <div key={ms.id} className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-200">
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="text-lg font-bold text-[#0F172A]">{ms.cliente_principal}</h3>
                    <span className={`px-3 py-1.5 rounded-full text-xs font-semibold border ${
                      ms.estado === 'activo' 
                        ? 'bg-[#D1FAE5] text-[#10B981] border-[#10B981]/20' 
                        : 'bg-[#F1F5F9] text-[#64748B] border-[#E2E8F0]'
                    }`}>
                      {ms.estado === 'activo' ? 'Activo' : 'Inactivo'}
                    </span>
                  </div>

                  <p className="text-[#64748B] mb-4 font-semibold">{ms.plan}</p>

                  <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-4 mb-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-bold text-[#0F172A]">
                        Usuarios ({ms.usuarios_adicionales.length + 1}/{ms.max_usuarios})
                      </span>
                      <span className="text-sm text-[#64748B] font-medium">
                        {espaciosDisponibles} espacios disponibles
                      </span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-[#6366F1]" />
                        <span className="font-semibold text-[#0F172A]">{ms.cliente_principal} <span className="text-[#64748B] font-normal">(Principal)</span></span>
                      </div>
                      {ms.usuarios_adicionales.map((usuario, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-sm">
                          <CheckCircle className="w-4 h-4 text-[#10B981]" />
                          <span className="text-[#0F172A] font-medium">{usuario}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-4 text-sm font-medium">
                    <span className="text-[#64748B]">
                      Base: <span className="text-[#0F172A] font-bold">€{ms.precio_base}</span>
                    </span>
                    <span className="text-[#64748B]">
                      Por adicional: <span className="text-[#0F172A] font-bold">€{ms.precio_por_adicional}</span>
                    </span>
                    <span className="text-[#10B981] font-bold">
                      Total: €{precioTotal}/mes
                    </span>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => agregarUsuario(ms.id)}
                    disabled={espaciosDisponibles === 0}
                    className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 shadow-md ${
                      espaciosDisponibles > 0
                        ? 'bg-[#6366F1] text-white hover:bg-[#4F46E5] active:bg-[#4338CA] hover:shadow-lg'
                        : 'bg-[#E2E8F0] text-[#94A3B8] cursor-not-allowed'
                    }`}
                  >
                    {espaciosDisponibles > 0 ? 'Agregar Usuario' : 'Límite Alcanzado'}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {multisesiones.length === 0 && (
        <div className="text-center py-12 bg-white rounded-xl border border-[#E2E8F0]">
          <div className="bg-[#F8FAFC] rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <Users className="w-8 h-8 text-[#94A3B8]" />
          </div>
          <h3 className="text-[#0F172A] text-lg font-semibold mb-2">No hay cuentas multisesión</h3>
          <p className="text-[#64748B]">No hay cuentas multisesión configuradas en el sistema</p>
        </div>
      )}
    </div>
  );
}

