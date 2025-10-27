import { X, Save, AlertTriangle } from 'lucide-react';
import { useState } from 'react';

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

interface ConfiguradorRestriccionesProps {
  restriccion?: Restriccion;
  onClose: () => void;
  onGuardar: (data: any) => void;
}

export default function ConfiguradorRestricciones({
  restriccion,
  onClose,
  onGuardar
}: ConfiguradorRestriccionesProps) {
  const [formData, setFormData] = useState({
    clienteNombre: restriccion?.clienteNombre || '',
    tipo: restriccion?.tipo || 'alergia',
    descripcion: restriccion?.descripcion || '',
    severidad: restriccion?.severidad || 'moderada',
    ingredientes: restriccion?.ingredientes.join(', ') || '',
    activa: restriccion?.activa !== undefined ? restriccion.activa : true
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const data = {
      ...formData,
      ingredientes: formData.ingredientes.split(',').map(i => i.trim()).filter(Boolean)
    };
    
    onGuardar(data);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-3xl w-full max-h-[90vh] overflow-hidden border border-[#E2E8F0] shadow-2xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] p-6 flex justify-between items-start">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-white/20 rounded-xl">
              <AlertTriangle className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">
                {restriccion ? 'Editar Restricción' : 'Nueva Restricción Alimentaria'}
              </h2>
              <p className="text-white/90">
                Configura los detalles de la restricción alimentaria
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-lg transition-all duration-200 text-white"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          <div className="space-y-6">
            {/* Nombre del cliente */}
            <div>
              <label className="block text-sm font-semibold text-[#0F172A] mb-2">
                Cliente *
              </label>
              <input
                type="text"
                name="clienteNombre"
                value={formData.clienteNombre}
                onChange={handleChange}
                required
                className="w-full h-12 px-4 py-3 bg-white border border-[#E2E8F0] rounded-lg text-[#0F172A] placeholder-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#6366F1] focus:border-[#6366F1] transition-all duration-200"
                placeholder="Nombre del cliente"
              />
            </div>

            {/* Tipo de restricción */}
            <div>
              <label className="block text-sm font-semibold text-[#0F172A] mb-2">
                Tipo de Restricción *
              </label>
              <select
                name="tipo"
                value={formData.tipo}
                onChange={handleChange}
                required
                className="w-full h-12 px-4 py-3 bg-white border border-[#E2E8F0] rounded-lg text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#6366F1] focus:border-[#6366F1] transition-all duration-200"
              >
                <option value="alergia">Alergia</option>
                <option value="intolerancia">Intolerancia</option>
                <option value="religiosa">Religiosa</option>
                <option value="cultural">Cultural</option>
              </select>
            </div>

            {/* Severidad */}
            <div>
              <label className="block text-sm font-semibold text-[#0F172A] mb-2">
                Severidad *
              </label>
              <select
                name="severidad"
                value={formData.severidad}
                onChange={handleChange}
                required
                className="w-full h-12 px-4 py-3 bg-white border border-[#E2E8F0] rounded-lg text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#6366F1] focus:border-[#6366F1] transition-all duration-200"
              >
                <option value="leve">Leve</option>
                <option value="moderada">Moderada</option>
                <option value="severa">Severa</option>
              </select>
            </div>

            {/* Descripción */}
            <div>
              <label className="block text-sm font-semibold text-[#0F172A] mb-2">
                Descripción *
              </label>
              <textarea
                name="descripcion"
                value={formData.descripcion}
                onChange={handleChange}
                required
                rows={3}
                className="w-full px-4 py-3 bg-white border border-[#E2E8F0] rounded-lg text-[#0F172A] placeholder-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#6366F1] focus:border-[#6366F1] transition-all duration-200"
                placeholder="Describe la restricción alimentaria..."
              />
            </div>

            {/* Ingredientes bloqueados */}
            <div>
              <label className="block text-sm font-semibold text-[#0F172A] mb-2">
                Ingredientes Bloqueados *
              </label>
              <input
                type="text"
                name="ingredientes"
                value={formData.ingredientes}
                onChange={handleChange}
                required
                className="w-full h-12 px-4 py-3 bg-white border border-[#E2E8F0] rounded-lg text-[#0F172A] placeholder-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#6366F1] focus:border-[#6366F1] transition-all duration-200"
                placeholder="Ej: maní, almendras, nueces (separados por comas)"
              />
              <p className="text-[#64748B] text-sm mt-2">
                Separa cada ingrediente con comas
              </p>
            </div>

            {/* Estado activo */}
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="activa"
                name="activa"
                checked={formData.activa}
                onChange={handleChange}
                className="w-5 h-5 rounded border-[#E2E8F0] bg-white text-[#6366F1] focus:ring-2 focus:ring-[#6366F1] focus:ring-offset-2 transition-all duration-200"
              />
              <label htmlFor="activa" className="text-[#0F172A] font-medium">
                Restricción activa
              </label>
            </div>

            {/* Alerta de seguridad */}
            <div className="bg-[#FEE2E2] border border-[#FCA5A5] rounded-lg p-4">
              <div className="flex gap-3">
                <AlertTriangle className="w-5 h-5 text-[#EF4444] flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-[#EF4444] font-bold mb-1">
                    Importante: Responsabilidad Legal
                  </h4>
                  <p className="text-[#0F172A] text-sm">
                    Esta información es crítica para la seguridad del cliente. 
                    Asegúrate de que todos los datos sean precisos y estén actualizados. 
                    El incumplimiento puede tener consecuencias legales y sanitarias graves.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </form>

        {/* Footer */}
        <div className="bg-[#F8FAFC] p-4 flex justify-end gap-3 border-t border-[#E2E8F0]">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2 bg-white border border-[#E2E8F0] hover:bg-[#F8FAFC] text-[#64748B] hover:text-[#0F172A] rounded-lg font-semibold transition-all duration-200"
          >
            Cancelar
          </button>
          <button
            onClick={handleSubmit}
            className="px-6 py-2 bg-[#6366F1] hover:bg-[#4F46E5] active:bg-[#4338CA] text-white rounded-lg font-semibold transition-all duration-200 flex items-center gap-2 shadow-md hover:shadow-lg"
          >
            <Save className="w-4 h-4" />
            {restriccion ? 'Actualizar' : 'Guardar'} Restricción
          </button>
        </div>
      </div>
    </div>
  );
}

