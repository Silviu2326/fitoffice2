import { useState } from 'react';
import { X, Upload, Link as LinkIcon } from 'lucide-react';

interface LeadCaptureProps {
  onClose?: () => void;
  onSave?: (lead: any) => void;
}

export default function LeadCapture({ onClose, onSave }: LeadCaptureProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    source: 'instagram',
    notes: '',
    businessType: 'personal_trainer',
  });

  const sources = [
    { value: 'instagram', label: 'Instagram' },
    { value: 'facebook', label: 'Facebook' },
    { value: 'tiktok', label: 'TikTok' },
    { value: 'whatsapp', label: 'WhatsApp' },
    { value: 'referido', label: 'Referido' },
    { value: 'landing_page', label: 'Landing Page' },
    { value: 'google_ads', label: 'Google Ads' },
    { value: 'visita_centro', label: 'Visita al Centro' },
    { value: 'otro', label: 'Otro' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSave) {
      onSave(formData);
    }
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      source: 'instagram',
      notes: '',
      businessType: 'personal_trainer',
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-md">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-[#0F172A]">Capturar Nuevo Lead</h3>
          <p className="text-[#64748B] text-sm mt-1">
            Registra la información del lead para dar seguimiento
          </p>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="text-[#64748B] hover:text-[#0F172A] transition-colors duration-200"
          >
            <X className="w-6 h-6" />
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Business Type */}
        <div>
          <label className="block text-sm font-semibold text-[#0F172A] mb-2">
            Tipo de Negocio
          </label>
          <select
            name="businessType"
            value={formData.businessType}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-white border border-[#E2E8F0] rounded-lg text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#6366F1] focus:border-[#6366F1] transition-all duration-200"
          >
            <option value="personal_trainer">Entrenador Personal</option>
            <option value="gym">Gimnasio/Centro</option>
          </select>
          <p className="text-xs text-[#64748B] mt-1">
            {formData.businessType === 'personal_trainer'
              ? 'Gestión 1 a 1 a través de redes sociales'
              : 'Pipeline comercial clásico con campañas'}
          </p>
        </div>

        {/* Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-semibold text-[#0F172A] mb-2">
            Nombre Completo *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-white border border-[#E2E8F0] rounded-lg text-[#0F172A] placeholder-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#6366F1] focus:border-[#6366F1] transition-all duration-200"
            placeholder="Ej: Juan Pérez"
          />
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-[#0F172A] mb-2">
            Email *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-white border border-[#E2E8F0] rounded-lg text-[#0F172A] placeholder-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#6366F1] focus:border-[#6366F1] transition-all duration-200"
            placeholder="juan@example.com"
          />
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="phone" className="block text-sm font-semibold text-[#0F172A] mb-2">
            Teléfono *
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-white border border-[#E2E8F0] rounded-lg text-[#0F172A] placeholder-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#6366F1] focus:border-[#6366F1] transition-all duration-200"
            placeholder="+34 600 123 456"
          />
        </div>

        {/* Source */}
        <div>
          <label htmlFor="source" className="block text-sm font-semibold text-[#0F172A] mb-2">
            Origen del Lead *
          </label>
          <select
            id="source"
            name="source"
            value={formData.source}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-white border border-[#E2E8F0] rounded-lg text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#6366F1] focus:border-[#6366F1] transition-all duration-200"
          >
            {sources.map((source) => (
              <option key={source.value} value={source.value}>
                {source.label}
              </option>
            ))}
          </select>
        </div>

        {/* Notes */}
        <div>
          <label htmlFor="notes" className="block text-sm font-semibold text-[#0F172A] mb-2">
            Notas
          </label>
          <textarea
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            rows={4}
            className="w-full px-4 py-3 bg-white border border-[#E2E8F0] rounded-lg text-[#0F172A] placeholder-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#6366F1] focus:border-[#6366F1] transition-all duration-200 resize-none"
            placeholder="Información adicional sobre el lead..."
          />
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-4">
          <button
            type="submit"
            className="flex-1 px-6 py-3 bg-[#6366F1] text-white rounded-lg font-semibold hover:bg-[#4F46E5] active:scale-[0.98] transition-all duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#6366F1] focus:ring-offset-2"
          >
            Guardar Lead
          </button>
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 bg-white border border-[#E2E8F0] text-[#0F172A] rounded-lg font-medium hover:bg-[#F8FAFC] hover:border-[#6366F1] transition-all duration-200"
            >
              Cancelar
            </button>
          )}
        </div>
      </form>

      {/* Quick Actions */}
      <div className="mt-6 pt-6 border-t border-[#E2E8F0]">
        <p className="text-sm font-semibold text-[#0F172A] mb-3">Acciones Rápidas</p>
        <div className="grid grid-cols-2 gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-[#F8FAFC] hover:bg-[#F1F5F9] border border-[#E2E8F0] rounded-lg text-[#64748B] transition-all duration-200 text-sm font-medium">
            <Upload className="w-4 h-4" />
            Importar CSV
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-[#F8FAFC] hover:bg-[#F1F5F9] border border-[#E2E8F0] rounded-lg text-[#64748B] transition-all duration-200 text-sm font-medium">
            <LinkIcon className="w-4 h-4" />
            Conectar CRM
          </button>
        </div>
      </div>
    </div>
  );
}

