import { Search, AlertTriangle, CheckCircle, XCircle, Shield } from 'lucide-react';
import { useState } from 'react';

interface ResultadoValidacion {
  ingrediente: string;
  esSeguro: boolean;
  restricciones: string[];
  alternativas: string[];
}

export default function ValidacionIngredientes() {
  const [ingrediente, setIngrediente] = useState('');
  const [clienteSeleccionado, setClienteSeleccionado] = useState('');
  const [resultado, setResultado] = useState<ResultadoValidacion | null>(null);
  const [validando, setValidando] = useState(false);

  // Datos mock
  const clientes = [
    { id: 'C001', nombre: 'María García' },
    { id: 'C002', nombre: 'Juan Pérez' },
    { id: 'C003', nombre: 'Ahmed Hassan' }
  ];

  const handleValidar = () => {
    if (!ingrediente || !clienteSeleccionado) return;
    
    setValidando(true);
    
    // Simulación de validación
    setTimeout(() => {
      // Mock de resultado
      const ingredienteLower = ingrediente.toLowerCase();
      const esSeguro = !['maní', 'almendras', 'nueces', 'leche', 'cerdo'].includes(ingredienteLower);
      
      setResultado({
        ingrediente: ingrediente,
        esSeguro: esSeguro,
        restricciones: esSeguro ? [] : ['Alergia detectada', 'Restricción religiosa'],
        alternativas: esSeguro ? [] : ['Semillas de girasol', 'Copos de avena', 'Pollo']
      });
      
      setValidando(false);
    }, 1000);
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-[#0F172A] mb-2">Validación de Ingredientes</h2>
        <p className="text-[#64748B]">
          Verifica si un ingrediente es seguro para un cliente específico
        </p>
      </div>

      {/* Formulario de validación */}
      <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 mb-6 shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Selección de cliente */}
          <div>
            <label className="block text-sm font-semibold text-[#0F172A] mb-2">
              Seleccionar Cliente *
            </label>
            <select
              value={clienteSeleccionado}
              onChange={(e) => setClienteSeleccionado(e.target.value)}
              className="w-full h-12 px-4 py-3 bg-white border border-[#E2E8F0] rounded-lg text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#6366F1] focus:border-[#6366F1] transition-all duration-200"
            >
              <option value="">Selecciona un cliente...</option>
              {clientes.map(cliente => (
                <option key={cliente.id} value={cliente.id}>
                  {cliente.nombre}
                </option>
              ))}
            </select>
          </div>

          {/* Ingrediente a validar */}
          <div>
            <label className="block text-sm font-semibold text-[#0F172A] mb-2">
              Ingrediente a Validar *
            </label>
            <input
              type="text"
              value={ingrediente}
              onChange={(e) => setIngrediente(e.target.value)}
              placeholder="Ej: maní, almendras, leche..."
              className="w-full h-12 px-4 py-3 bg-white border border-[#E2E8F0] rounded-lg text-[#0F172A] placeholder-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#6366F1] focus:border-[#6366F1] transition-all duration-200"
            />
          </div>
        </div>

        <button
          onClick={handleValidar}
          disabled={!ingrediente || !clienteSeleccionado || validando}
          className="w-full px-6 py-3 bg-[#6366F1] hover:bg-[#4F46E5] active:bg-[#4338CA] disabled:bg-[#94A3B8] disabled:cursor-not-allowed text-white rounded-lg font-semibold transition-all duration-200 flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
        >
          {validando ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
              Validando...
            </>
          ) : (
            <>
              <Shield className="w-5 h-5" />
              Validar Ingrediente
            </>
          )}
        </button>
      </div>

      {/* Resultado de validación */}
      {resultado && (
        <div className={`rounded-xl p-6 border-2 shadow-lg ${
          resultado.esSeguro 
            ? 'bg-[#D1FAE5] border-[#10B981]' 
            : 'bg-[#FEE2E2] border-[#EF4444]'
        }`}>
          <div className="flex items-start gap-4 mb-4">
            {resultado.esSeguro ? (
              <div className="p-3 bg-[#10B981]/20 rounded-xl">
                <CheckCircle className="w-8 h-8 text-[#10B981]" />
              </div>
            ) : (
              <div className="p-3 bg-[#EF4444]/20 rounded-xl">
                <XCircle className="w-8 h-8 text-[#EF4444]" />
              </div>
            )}
            <div className="flex-1">
              <h3 className={`text-2xl font-bold mb-2 ${
                resultado.esSeguro ? 'text-[#10B981]' : 'text-[#EF4444]'
              }`}>
                {resultado.esSeguro ? '✓ Ingrediente Seguro' : '✗ Ingrediente Bloqueado'}
              </h3>
              <p className="text-[#0F172A]">
                <span className="font-bold">{resultado.ingrediente}</span> 
                {resultado.esSeguro 
                  ? ' no presenta conflictos con las restricciones del cliente'
                  : ' presenta conflictos con las restricciones del cliente'
                }
              </p>
            </div>
          </div>

          {/* Restricciones detectadas */}
          {!resultado.esSeguro && resultado.restricciones.length > 0 && (
            <div className="mb-4">
              <h4 className="text-[#EF4444] font-bold mb-2 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                Restricciones Detectadas:
              </h4>
              <div className="space-y-2">
                {resultado.restricciones.map((restriccion, idx) => (
                  <div key={idx} className="bg-white border border-[#FCA5A5] rounded-lg p-3">
                    <p className="text-[#EF4444]">{restriccion}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Alternativas sugeridas */}
          {!resultado.esSeguro && resultado.alternativas.length > 0 && (
            <div>
              <h4 className="text-[#10B981] font-bold mb-2 flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Alternativas Seguras Sugeridas:
              </h4>
              <div className="flex flex-wrap gap-2">
                {resultado.alternativas.map((alternativa, idx) => (
                  <span
                    key={idx}
                    className="px-4 py-2 bg-white text-[#10B981] rounded-lg border border-[#10B981]/30 font-semibold"
                  >
                    {alternativa}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Historial de validaciones recientes */}
      <div className="mt-8">
        <h3 className="text-xl font-bold text-[#0F172A] mb-4">Validaciones Recientes</h3>
        <div className="space-y-3">
          {[
            { ingrediente: 'pollo', cliente: 'María García', seguro: true, fecha: '2024-10-26 14:30' },
            { ingrediente: 'maní', cliente: 'María García', seguro: false, fecha: '2024-10-26 14:25' },
            { ingrediente: 'avena', cliente: 'Juan Pérez', seguro: true, fecha: '2024-10-26 14:20' }
          ].map((validacion, idx) => (
            <div key={idx} className="bg-white border border-[#E2E8F0] rounded-lg p-4 flex items-center justify-between hover:border-[#6366F1] hover:shadow-md transition-all duration-200">
              <div className="flex items-center gap-3">
                {validacion.seguro ? (
                  <CheckCircle className="w-5 h-5 text-[#10B981]" />
                ) : (
                  <XCircle className="w-5 h-5 text-[#EF4444]" />
                )}
                <div>
                  <p className="text-[#0F172A] font-semibold">
                    {validacion.ingrediente} - {validacion.cliente}
                  </p>
                  <p className="text-[#64748B] text-sm">{validacion.fecha}</p>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                validacion.seguro 
                  ? 'bg-[#D1FAE5] text-[#10B981]' 
                  : 'bg-[#FEE2E2] text-[#EF4444]'
              }`}>
                {validacion.seguro ? 'Seguro' : 'Bloqueado'}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

