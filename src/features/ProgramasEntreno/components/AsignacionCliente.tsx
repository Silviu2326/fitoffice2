import { X, Search, UserCheck } from 'lucide-react';
import { useState } from 'react';

interface Cliente {
  id: string;
  nombre: string;
  email: string;
  avatar?: string;
  programasActivos: number;
}

interface AsignacionClienteProps {
  programa: {
    id: string;
    nombre: string;
  };
  onClose: () => void;
  onAsignar: (clienteId: string) => void;
}

export default function AsignacionCliente({ programa, onClose, onAsignar }: AsignacionClienteProps) {
  const [busqueda, setBusqueda] = useState('');
  const [seleccionados, setSeleccionados] = useState<string[]>([]);

  // Datos de ejemplo
  const clientes: Cliente[] = [
    {
      id: '1',
      nombre: 'Carla Martínez',
      email: 'carla@example.com',
      programasActivos: 1
    },
    {
      id: '2',
      nombre: 'Miguel Sánchez',
      email: 'miguel@example.com',
      programasActivos: 2
    },
    {
      id: '3',
      nombre: 'Laura Pérez',
      email: 'laura@example.com',
      programasActivos: 0
    },
    {
      id: '4',
      nombre: 'David García',
      email: 'david@example.com',
      programasActivos: 1
    }
  ];

  const clientesFiltrados = clientes.filter(c =>
    c.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
    c.email.toLowerCase().includes(busqueda.toLowerCase())
  );

  const toggleSeleccion = (clienteId: string) => {
    setSeleccionados(prev =>
      prev.includes(clienteId)
        ? prev.filter(id => id !== clienteId)
        : [...prev, clienteId]
    );
  };

  const handleAsignar = () => {
    seleccionados.forEach(id => onAsignar(id));
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#E2E8F0]">
          <div>
            <h2 className="text-xl font-semibold text-[#0F172A]">Asignar Programa</h2>
            <p className="text-sm text-[#64748B] mt-1">{programa.nombre}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-[#F8FAFC] rounded-lg transition-all duration-200"
          >
            <X className="w-5 h-5 text-[#64748B]" />
          </button>
        </div>

        {/* Búsqueda */}
        <div className="p-6 border-b border-[#E2E8F0]">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748B]" />
            <input
              type="text"
              placeholder="Buscar clientes..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="w-full h-10 pl-10 pr-4 py-2 bg-white border border-[#E2E8F0] rounded-xl text-[#0F172A] placeholder-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#6366F1] focus:border-[#6366F1] transition-all duration-200"
            />
          </div>
        </div>

        {/* Lista de clientes */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-2">
            {clientesFiltrados.map((cliente) => (
              <div
                key={cliente.id}
                onClick={() => toggleSeleccion(cliente.id)}
                className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all duration-200 ${
                  seleccionados.includes(cliente.id)
                    ? 'bg-[#EEF2FF] border-[#6366F1] shadow-sm'
                    : 'bg-white border-[#E2E8F0] hover:border-[#6366F1] hover:shadow-sm'
                }`}
              >
                <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-200 ${
                  seleccionados.includes(cliente.id)
                    ? 'bg-[#6366F1] border-[#6366F1]'
                    : 'border-[#94A3B8]'
                }`}>
                  {seleccionados.includes(cliente.id) && (
                    <UserCheck className="w-3 h-3 text-white" />
                  )}
                </div>
                <div className="flex-1">
                  <h4 className="text-[#0F172A] font-semibold">{cliente.nombre}</h4>
                  <p className="text-sm text-[#64748B]">{cliente.email}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-[#94A3B8] font-medium">Programas activos</p>
                  <p className="text-sm font-semibold text-[#0F172A]">{cliente.programasActivos}</p>
                </div>
              </div>
            ))}
          </div>

          {clientesFiltrados.length === 0 && (
            <div className="text-center py-8">
              <p className="text-[#64748B]">No se encontraron clientes</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-[#E2E8F0] flex justify-between items-center">
          <p className="text-sm text-[#64748B] font-medium">
            {seleccionados.length} cliente{seleccionados.length !== 1 ? 's' : ''} seleccionado{seleccionados.length !== 1 ? 's' : ''}
          </p>
          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 text-[#64748B] hover:text-[#6366F1] hover:bg-[#EEF2FF] rounded-xl font-medium transition-all duration-200"
            >
              Cancelar
            </button>
            <button
              onClick={handleAsignar}
              disabled={seleccionados.length === 0}
              className="px-4 py-2 bg-[#6366F1] hover:bg-[#4F46E5] disabled:bg-[#94A3B8] disabled:cursor-not-allowed text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-200"
            >
              Asignar Programa
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

