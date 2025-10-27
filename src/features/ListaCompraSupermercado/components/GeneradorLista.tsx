import { useState } from 'react';
import { Wand2, User, Calendar, Users, CheckCircle } from 'lucide-react';

interface GeneradorListaProps {
  onListaGenerada?: (lista: any) => void;
}

export default function GeneradorLista({ onListaGenerada }: GeneradorListaProps) {
  const [clienteSeleccionado, setClienteSeleccionado] = useState('');
  const [fechaCompra, setFechaCompra] = useState('');
  const [numPersonas, setNumPersonas] = useState(1);
  const [incluyeBase, setIncluyeBase] = useState(true);
  const [generando, setGenerando] = useState(false);

  const clientes = [
    { id: '1', nombre: 'María García López', dietaAsignada: true },
    { id: '2', nombre: 'Juan Pérez Martínez', dietaAsignada: true },
    { id: '3', nombre: 'Ana Rodríguez Sánchez', dietaAsignada: false },
    { id: '4', nombre: 'Carlos Fernández Ruiz', dietaAsignada: true },
  ];

  const handleGenerar = async () => {
    if (!clienteSeleccionado || !fechaCompra) return;

    setGenerando(true);
    
    // Simular generación de lista
    setTimeout(() => {
      const listaGenerada = {
        id: Date.now().toString(),
        clienteId: clienteSeleccionado,
        fechaCompra,
        numPersonas,
        ingredientes: [],
        estado: 'pendiente',
      };
      
      setGenerando(false);
      onListaGenerada?.(listaGenerada);
    }, 2000);
  };

  return (
    <div className="bg-white rounded-2xl border border-[#E2E8F0] overflow-hidden shadow-md">
      {/* Header */}
      <div className="bg-[#F8FAFC] px-6 py-4 border-b border-[#E2E8F0]">
        <div className="flex items-center gap-3">
          <div className="bg-[#EEF2FF] p-2 rounded-lg">
            <Wand2 className="w-5 h-5 text-[#6366F1]" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-[#0F172A]">Generar Lista de Compra</h2>
            <p className="text-sm text-[#64748B]">
              Crea una lista personalizada basada en la dieta del cliente
            </p>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="p-6 space-y-6">
        {/* Selector de Cliente */}
        <div>
          <label className="block text-sm font-medium text-[#0F172A] mb-2">
            <User className="w-4 h-4 inline mr-2" />
            Seleccionar Cliente
          </label>
          <select
            value={clienteSeleccionado}
            onChange={(e) => setClienteSeleccionado(e.target.value)}
            className="w-full h-12 bg-white border border-[#E2E8F0] rounded-xl px-4 py-3 text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#6366F1] focus:border-[#6366F1] transition-all duration-200"
          >
            <option value="">-- Selecciona un cliente --</option>
            {clientes.map((cliente) => (
              <option key={cliente.id} value={cliente.id} disabled={!cliente.dietaAsignada}>
                {cliente.nombre} {!cliente.dietaAsignada && '(Sin dieta asignada)'}
              </option>
            ))}
          </select>
          <p className="text-xs text-[#94A3B8] mt-2">
            Solo se muestran clientes con dieta asignada
          </p>
        </div>

        {/* Fecha de Compra */}
        <div>
          <label className="block text-sm font-medium text-[#0F172A] mb-2">
            <Calendar className="w-4 h-4 inline mr-2" />
            Fecha de Compra
          </label>
          <input
            type="date"
            value={fechaCompra}
            onChange={(e) => setFechaCompra(e.target.value)}
            className="w-full h-12 bg-white border border-[#E2E8F0] rounded-xl px-4 py-3 text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#6366F1] focus:border-[#6366F1] transition-all duration-200"
          />
        </div>

        {/* Número de Personas */}
        <div>
          <label className="block text-sm font-medium text-[#0F172A] mb-2">
            <Users className="w-4 h-4 inline mr-2" />
            Número de Personas en el Hogar
          </label>
          <input
            type="number"
            min="1"
            value={numPersonas}
            onChange={(e) => setNumPersonas(parseInt(e.target.value))}
            className="w-full h-12 bg-white border border-[#E2E8F0] rounded-xl px-4 py-3 text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#6366F1] focus:border-[#6366F1] transition-all duration-200"
          />
          <p className="text-xs text-[#94A3B8] mt-2">
            Las cantidades se ajustarán según el número de personas
          </p>
        </div>

        {/* Opciones */}
        <div className="space-y-3">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={incluyeBase}
              onChange={(e) => setIncluyeBase(e.target.checked)}
              className="w-5 h-5 rounded border-[#E2E8F0] bg-white text-[#6366F1] focus:ring-[#6366F1] focus:ring-2 transition-all duration-200"
            />
            <div>
              <div className="text-sm font-medium text-[#0F172A]">
                Incluir ingredientes base de despensa
              </div>
              <div className="text-xs text-[#64748B]">
                Añade productos básicos que el cliente debe tener siempre
              </div>
            </div>
          </label>
        </div>

        {/* Botón Generar */}
        <button
          onClick={handleGenerar}
          disabled={!clienteSeleccionado || !fechaCompra || generando}
          className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 bg-[#6366F1] hover:bg-[#4F46E5] active:bg-[#4338CA] text-white rounded-lg transition-all duration-200 font-semibold shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-[#6366F1] focus:ring-offset-2"
        >
          {generando ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
              Generando lista...
            </>
          ) : (
            <>
              <CheckCircle className="w-5 h-5" />
              Generar Lista Personalizada
            </>
          )}
        </button>

        {/* Info */}
        <div className="bg-[#EEF2FF] border border-[#E0E7FF] rounded-xl p-4">
          <p className="text-sm text-[#6366F1]">
            💡 La lista se generará automáticamente basándose en el plan nutricional 
            asignado al cliente, calculando las cantidades exactas y organizando los 
            ingredientes por secciones del supermercado.
          </p>
        </div>
      </div>
    </div>
  );
}

