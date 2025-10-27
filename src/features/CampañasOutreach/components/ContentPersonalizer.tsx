import { useState } from 'react';
import { Wand2, Type, Image, Link } from 'lucide-react';

export default function ContentPersonalizer() {
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [content, setContent] = useState({
    subject: '',
    body: '',
    cta: ''
  });

  const templates = [
    {
      id: 'bienvenida',
      name: 'Bienvenida Nuevo Lead',
      subject: '¡Bienvenido {{nombre}}! 🎉',
      body: 'Hola {{nombre}}, gracias por tu interés en {{gym}}. Estamos emocionados de ayudarte a alcanzar tus objetivos de fitness...',
      cta: 'Agenda tu sesión de prueba'
    },
    {
      id: 'promocion',
      name: 'Promoción Especial',
      subject: '{{nombre}}, oferta exclusiva para ti ⭐',
      body: 'Hola {{nombre}}, tenemos una oferta especial solo para ti en {{gym}}. {{oferta}}',
      cta: 'Aprovecha la oferta ahora'
    },
    {
      id: 'reactivacion',
      name: 'Reactivación',
      subject: 'Te echamos de menos {{nombre}} 💪',
      body: 'Hola {{nombre}}, hace tiempo que no te vemos por {{gym}}. Queremos ayudarte a retomar tu rutina...',
      cta: 'Vuelve con nosotros'
    }
  ];

  const variables = [
    { key: '{{nombre}}', description: 'Nombre del contacto' },
    { key: '{{apellido}}', description: 'Apellido del contacto' },
    { key: '{{gym}}', description: 'Nombre del gimnasio' },
    { key: '{{oferta}}', description: 'Descripción de la oferta' },
    { key: '{{plan}}', description: 'Plan del socio' },
    { key: '{{fecha}}', description: 'Fecha actual' }
  ];

  const handleTemplateSelect = (templateId: string) => {
    const template = templates.find(t => t.id === templateId);
    if (template) {
      setSelectedTemplate(templateId);
      setContent({
        subject: template.subject,
        body: template.body,
        cta: template.cta
      });
    }
  };

  const insertVariable = (variable: string) => {
    setContent({
      ...content,
      body: content.body + variable
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="bg-gradient-to-br from-[#EC4899] to-[#F43F5E] p-3 rounded-xl shadow-md">
          <Wand2 className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-[#0F172A]">Personalización de Contenido</h2>
          <p className="text-[#64748B]">Mensajes adaptados a cada segmento</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Templates */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl p-6 border border-[#E2E8F0] shadow-sm">
            <h3 className="text-lg font-bold text-[#0F172A] mb-4">Plantillas</h3>
            <div className="space-y-2">
              {templates.map((template) => (
                <button
                  key={template.id}
                  onClick={() => handleTemplateSelect(template.id)}
                  className={`w-full text-left p-3 rounded-lg transition-all duration-200 ${
                    selectedTemplate === template.id
                      ? 'bg-[#EEF2FF] border-2 border-[#6366F1]'
                      : 'bg-[#F8FAFC] hover:bg-[#F1F5F9] border-2 border-transparent'
                  }`}
                >
                  <div className="font-semibold text-[#0F172A]">{template.name}</div>
                  <div className="text-xs text-[#64748B] mt-1 truncate">{template.subject}</div>
                </button>
              ))}
            </div>

            {/* Variables */}
            <div className="mt-6">
              <h3 className="text-lg font-bold text-[#0F172A] mb-3">Variables Disponibles</h3>
              <div className="space-y-2">
                {variables.map((variable) => (
                  <button
                    key={variable.key}
                    onClick={() => insertVariable(variable.key)}
                    className="w-full text-left p-2 rounded bg-[#F8FAFC] hover:bg-[#F1F5F9] transition-all"
                  >
                    <div className="text-sm font-mono text-[#6366F1]">{variable.key}</div>
                    <div className="text-xs text-[#64748B]">{variable.description}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Content Editor */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl p-6 border border-[#E2E8F0] shadow-sm">
            <h3 className="text-lg font-bold text-[#0F172A] mb-4">Editor de Contenido</h3>
            
            {/* Subject */}
            <div className="mb-4">
              <label className="flex items-center gap-2 text-sm font-medium text-[#0F172A] mb-2">
                <Type className="w-4 h-4" />
                Asunto
              </label>
              <input
                type="text"
                value={content.subject}
                onChange={(e) => setContent({ ...content, subject: e.target.value })}
                placeholder="Asunto del mensaje..."
                className="w-full bg-white text-[#0F172A] px-4 py-3 rounded-lg border border-[#E2E8F0] focus:border-[#6366F1] focus:outline-none focus:ring-2 focus:ring-[#6366F1]/20 transition-all duration-200"
              />
            </div>

            {/* Body */}
            <div className="mb-4">
              <label className="flex items-center gap-2 text-sm font-medium text-[#0F172A] mb-2">
                <Type className="w-4 h-4" />
                Cuerpo del Mensaje
              </label>
              <textarea
                value={content.body}
                onChange={(e) => setContent({ ...content, body: e.target.value })}
                placeholder="Escribe tu mensaje aquí..."
                rows={8}
                className="w-full bg-white text-[#0F172A] px-4 py-3 rounded-lg border border-[#E2E8F0] focus:border-[#6366F1] focus:outline-none focus:ring-2 focus:ring-[#6366F1]/20 resize-none transition-all duration-200"
              />
            </div>

            {/* CTA */}
            <div className="mb-4">
              <label className="flex items-center gap-2 text-sm font-medium text-[#0F172A] mb-2">
                <Link className="w-4 h-4" />
                Llamada a la Acción (CTA)
              </label>
              <input
                type="text"
                value={content.cta}
                onChange={(e) => setContent({ ...content, cta: e.target.value })}
                placeholder="Texto del botón..."
                className="w-full bg-white text-[#0F172A] px-4 py-3 rounded-lg border border-[#E2E8F0] focus:border-[#6366F1] focus:outline-none focus:ring-2 focus:ring-[#6366F1]/20 transition-all duration-200"
              />
            </div>

            {/* Toolbar */}
            <div className="flex gap-2 pt-4 border-t border-[#E2E8F0]">
              <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#F8FAFC] text-[#64748B] hover:bg-[#F1F5F9] transition-all">
                <Image className="w-4 h-4" />
                Añadir Imagen
              </button>
              <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#F8FAFC] text-[#64748B] hover:bg-[#F1F5F9] transition-all">
                <Link className="w-4 h-4" />
                Añadir Enlace
              </button>
            </div>
          </div>

          {/* Preview */}
          <div className="bg-white rounded-xl p-6 border border-[#E2E8F0] mt-6 shadow-sm">
            <h3 className="text-lg font-bold text-[#0F172A] mb-4">Vista Previa</h3>
            <div className="bg-[#F8FAFC] rounded-lg p-6 border border-[#E2E8F0]">
              {content.subject && (
                <div className="mb-4">
                  <div className="text-sm text-[#64748B] mb-1">Asunto:</div>
                  <div className="text-lg font-semibold text-[#0F172A]">{content.subject}</div>
                </div>
              )}
              {content.body && (
                <div className="mb-4">
                  <div className="text-[#0F172A] whitespace-pre-wrap">{content.body}</div>
                </div>
              )}
              {content.cta && (
                <button className="bg-[#6366F1] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#4F46E5] transition-all duration-200 shadow-md">
                  {content.cta}
                </button>
              )}
            </div>
            <p className="text-xs text-[#94A3B8] mt-3">
              * Las variables se reemplazarán automáticamente con datos reales al enviar
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
