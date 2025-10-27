import { useState } from 'react';
import { Smile, Meh, Frown } from 'lucide-react';

interface EvaluacionSensacionesProps {
  onSubmit: (data: any) => void;
}

export default function EvaluacionSensaciones({ onSubmit }: EvaluacionSensacionesProps) {
  const [formData, setFormData] = useState({
    clienteId: '',
    clienteNombre: '',
    ejercicio: '',
    serie: 1,
    sensacion: 'buena' as 'buena' | 'regular' | 'mala',
    rpe: 5,
    dolorLumbar: false,
    notas: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      clienteId: '',
      clienteNombre: '',
      ejercicio: '',
      serie: 1,
      sensacion: 'buena',
      rpe: 5,
      dolorLumbar: false,
      notas: ''
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-[#F1F5F9] mb-2">
            Cliente
          </label>
          <input
            type="text"
            value={formData.clienteNombre}
            onChange={(e) => setFormData({ ...formData, clienteNombre: e.target.value })}
            className="w-full h-12 px-4 bg-[#2A2A3A] border border-[#334155] rounded-[12px] text-[#F1F5F9] placeholder-[#64748B] focus:outline-none focus:ring-2 focus:ring-[#6366F1] focus:border-[#6366F1] transition-all duration-200"
            placeholder="Nombre del cliente"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[#F1F5F9] mb-2">
            Ejercicio
          </label>
          <input
            type="text"
            value={formData.ejercicio}
            onChange={(e) => setFormData({ ...formData, ejercicio: e.target.value })}
            className="w-full h-12 px-4 bg-[#2A2A3A] border border-[#334155] rounded-[12px] text-[#F1F5F9] placeholder-[#64748B] focus:outline-none focus:ring-2 focus:ring-[#6366F1] focus:border-[#6366F1] transition-all duration-200"
            placeholder="Nombre del ejercicio"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-[#F1F5F9] mb-2">
          Número de Serie
        </label>
        <input
          type="number"
          min="1"
          value={formData.serie}
          onChange={(e) => setFormData({ ...formData, serie: parseInt(e.target.value) })}
          className="w-full h-12 px-4 bg-[#2A2A3A] border border-[#334155] rounded-[12px] text-[#F1F5F9] placeholder-[#64748B] focus:outline-none focus:ring-2 focus:ring-[#6366F1] focus:border-[#6366F1] transition-all duration-200"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-[#F1F5F9] mb-3">
          ¿Cómo te sentiste en esta serie?
        </label>
        <div className="grid grid-cols-3 gap-3">
          <button
            type="button"
            onClick={() => setFormData({ ...formData, sensacion: 'buena' })}
            className={`p-4 rounded-[16px] border-2 transition-all duration-200 ${
              formData.sensacion === 'buena'
                ? 'border-[#10B981] bg-[#D1FAE5]'
                : 'border-[#334155] bg-[#2A2A3A] hover:border-[#10B981]'
            }`}
          >
            <Smile className={`w-8 h-8 mx-auto mb-2 ${
              formData.sensacion === 'buena' ? 'text-[#10B981]' : 'text-[#64748B]'
            }`} />
            <p className="text-sm font-medium text-[#F1F5F9]">Excelente</p>
          </button>
          <button
            type="button"
            onClick={() => setFormData({ ...formData, sensacion: 'regular' })}
            className={`p-4 rounded-[16px] border-2 transition-all duration-200 ${
              formData.sensacion === 'regular'
                ? 'border-[#F59E0B] bg-[#FEF3C7]'
                : 'border-[#334155] bg-[#2A2A3A] hover:border-[#F59E0B]'
            }`}
          >
            <Meh className={`w-8 h-8 mx-auto mb-2 ${
              formData.sensacion === 'regular' ? 'text-[#F59E0B]' : 'text-[#64748B]'
            }`} />
            <p className="text-sm font-medium text-[#F1F5F9]">Regular</p>
          </button>
          <button
            type="button"
            onClick={() => setFormData({ ...formData, sensacion: 'mala' })}
            className={`p-4 rounded-[16px] border-2 transition-all duration-200 ${
              formData.sensacion === 'mala'
                ? 'border-[#EF4444] bg-[#FEE2E2]'
                : 'border-[#334155] bg-[#2A2A3A] hover:border-[#EF4444]'
            }`}
          >
            <Frown className={`w-8 h-8 mx-auto mb-2 ${
              formData.sensacion === 'mala' ? 'text-[#EF4444]' : 'text-[#64748B]'
            }`} />
            <p className="text-sm font-medium text-[#F1F5F9]">Con molestias</p>
          </button>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-[#F1F5F9] mb-2">
          RPE (Rate of Perceived Exertion): {formData.rpe}/10
        </label>
        <input
          type="range"
          min="1"
          max="10"
          value={formData.rpe}
          onChange={(e) => setFormData({ ...formData, rpe: parseInt(e.target.value) })}
          className="w-full h-2 bg-[#2A2A3A] rounded-lg appearance-none cursor-pointer accent-[#6366F1]"
        />
        <div className="flex justify-between text-xs text-[#94A3B8] mt-1">
          <span>Muy fácil</span>
          <span>Máximo esfuerzo</span>
        </div>
      </div>

      <div className="flex items-center gap-3 p-4 bg-[#2A2A3A] rounded-[12px]">
        <input
          type="checkbox"
          id="dolorLumbar"
          checked={formData.dolorLumbar}
          onChange={(e) => setFormData({ ...formData, dolorLumbar: e.target.checked })}
          className="w-5 h-5 text-[#6366F1] rounded focus:ring-[#6366F1] focus:ring-2"
        />
        <label htmlFor="dolorLumbar" className="text-[#F1F5F9] font-medium">
          ¿Sientes dolor lumbar?
        </label>
      </div>

      <div>
        <label className="block text-sm font-medium text-[#F1F5F9] mb-2">
          Notas adicionales
        </label>
        <textarea
          value={formData.notas}
          onChange={(e) => setFormData({ ...formData, notas: e.target.value })}
          className="w-full px-4 py-2 bg-[#2A2A3A] border border-[#334155] rounded-[12px] text-[#F1F5F9] placeholder-[#64748B] focus:outline-none focus:ring-2 focus:ring-[#6366F1] focus:border-[#6366F1] transition-all duration-200"
          placeholder="Observaciones, molestias específicas, ajustes realizados..."
          rows={3}
        />
      </div>

      <button
        type="submit"
        className="w-full h-12 bg-[#6366F1] text-white rounded-[12px] font-semibold hover:bg-[#4F46E5] active:bg-[#4338CA] shadow-md hover:shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#6366F1] focus:ring-offset-2"
      >
        Registrar Check-in
      </button>
    </form>
  );
}

