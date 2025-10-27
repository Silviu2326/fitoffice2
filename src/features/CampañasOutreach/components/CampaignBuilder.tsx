import { useState } from 'react';
import { Target, Users, MessageSquare, Send, Calendar } from 'lucide-react';
import { Button, Input, Card, CardHeader, CardTitle, CardContent } from '../../../components/ui';

export default function CampaignBuilder() {
  const [step, setStep] = useState(1);
  const [campaignData, setCampaignData] = useState({
    name: '',
    objective: '',
    audienceSegment: '',
    channels: [] as string[],
    content: '',
    scheduledDate: ''
  });

  const objectives = [
    { id: 'captacion', label: 'Captación', description: 'Atraer nuevos clientes' },
    { id: 'retencion', label: 'Retención', description: 'Mantener clientes actuales' },
    { id: 'promocion', label: 'Promoción', description: 'Promocionar servicios' },
    { id: 'engagement', label: 'Engagement', description: 'Aumentar interacción' }
  ];

  const channels = [
    { id: 'whatsapp', label: 'WhatsApp', icon: '💬' },
    { id: 'email', label: 'Email', icon: '📧' },
    { id: 'sms', label: 'SMS', icon: '📱' },
    { id: 'push', label: 'Push', icon: '🔔' }
  ];

  const handleChannelToggle = (channelId: string) => {
    setCampaignData(prev => ({
      ...prev,
      channels: prev.channels.includes(channelId)
        ? prev.channels.filter(c => c !== channelId)
        : [...prev.channels, channelId]
    }));
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-h3 font-bold text-text-primary mb-4 flex items-center gap-2">
                <Target className="w-icon-lg h-icon-lg text-primary" />
                Definir Objetivo
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {objectives.map((obj) => (
                  <button
                    key={obj.id}
                    onClick={() => setCampaignData({ ...campaignData, objective: obj.id })}
                    className={`p-4 rounded-lg border-2 transition-all duration-normal text-left ${
                      campaignData.objective === obj.id
                        ? 'border-primary bg-primary-50'
                        : 'border-border bg-background hover:border-primary'
                    }`}
                  >
                    <div className="font-semibold text-text-primary mb-1">{obj.label}</div>
                    <div className="text-body-small text-text-secondary">{obj.description}</div>
                  </button>
                ))}
              </div>
            </div>
            <Input
              label="Nombre de la Campaña"
              type="text"
              value={campaignData.name}
              onChange={(e) => setCampaignData({ ...campaignData, name: e.target.value })}
              placeholder="Ej: Black Friday 2025"
              inputSize="lg"
            />
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h3 className="text-h3 font-bold text-text-primary mb-4 flex items-center gap-2">
              <Users className="w-icon-lg h-icon-lg text-primary" />
              Seleccionar Audiencia
            </h3>
            <div>
              <label className="block text-body-small font-medium text-text-primary mb-2">
                Segmento de Audiencia
              </label>
              <select
                value={campaignData.audienceSegment}
                onChange={(e) => setCampaignData({ ...campaignData, audienceSegment: e.target.value })}
                className="input-base input-lg"
              >
                <option value="">Selecciona un segmento</option>
                <option value="leads-calientes">Leads Calientes (234 contactos)</option>
                <option value="socios-activos">Socios Activos (456 contactos)</option>
                <option value="riesgo-baja">Riesgo de Baja (89 contactos)</option>
                <option value="inactivos">Inactivos 30+ días (123 contactos)</option>
                <option value="todos">Todos los contactos (902 contactos)</option>
              </select>
            </div>
            <Card>
              <CardHeader>
                <CardTitle>Vista Previa del Segmento</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4 text-body-small">
                  <div>
                    <div className="text-text-secondary">Total</div>
                    <div className="text-2xl font-bold text-text-primary">456</div>
                  </div>
                  <div>
                    <div className="text-text-secondary">Con WhatsApp</div>
                    <div className="text-2xl font-bold text-success">412</div>
                  </div>
                  <div>
                    <div className="text-text-secondary">Con Email</div>
                    <div className="text-2xl font-bold text-info">456</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h3 className="text-h3 font-bold text-text-primary mb-4 flex items-center gap-2">
              <MessageSquare className="w-icon-lg h-icon-lg text-primary" />
              Crear Contenido
            </h3>
            <div>
              <label className="block text-body-small font-medium text-text-primary mb-2">
                Canales de Comunicación
              </label>
              <div className="grid grid-cols-2 gap-3">
                {channels.map((channel) => (
                  <button
                    key={channel.id}
                    onClick={() => handleChannelToggle(channel.id)}
                    className={`p-4 rounded-lg border-2 transition-all duration-normal ${
                      campaignData.channels.includes(channel.id)
                        ? 'border-primary bg-primary-50'
                        : 'border-border bg-background hover:border-primary'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{channel.icon}</span>
                      <span className="font-semibold text-text-primary">{channel.label}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-body-small font-medium text-text-primary mb-2">
                Contenido del Mensaje
              </label>
              <textarea
                value={campaignData.content}
                onChange={(e) => setCampaignData({ ...campaignData, content: e.target.value })}
                placeholder="Escribe el contenido de tu campaña..."
                rows={6}
                className="input-base input-lg resize-none"
              />
              <p className="text-body-small text-text-secondary mt-2">
                Usa variables: {'{{nombre}}'}, {'{{gym}}'}, {'{{oferta}}'}
              </p>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <h3 className="text-h3 font-bold text-text-primary mb-4 flex items-center gap-2">
              <Calendar className="w-icon-lg h-icon-lg text-primary" />
              Programar Envío
            </h3>
            <div>
              <label className="block text-body-small font-medium text-text-primary mb-2">
                Fecha y Hora de Envío
              </label>
              <input
                type="datetime-local"
                value={campaignData.scheduledDate}
                onChange={(e) => setCampaignData({ ...campaignData, scheduledDate: e.target.value })}
                className="input-base input-lg"
              />
            </div>
            <Card>
              <CardHeader>
                <CardTitle>Resumen de la Campaña</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Nombre:</span>
                    <span className="text-text-primary font-medium">{campaignData.name || '-'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Objetivo:</span>
                    <span className="text-text-primary font-medium">{campaignData.objective || '-'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Audiencia:</span>
                    <span className="text-text-primary font-medium">{campaignData.audienceSegment || '-'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Canales:</span>
                    <span className="text-text-primary font-medium">
                      {campaignData.channels.length > 0 ? campaignData.channels.join(', ') : '-'}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Progress Steps */}
      <div className="flex items-center justify-between mb-8">
        {[1, 2, 3, 4].map((s) => (
          <div key={s} className="flex items-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all duration-normal ${
                step >= s
                  ? 'bg-gradient-to-br from-primary to-[#8B5CF6] text-white shadow-md'
                  : 'bg-surface-2 text-text-muted'
              }`}
            >
              {s}
            </div>
            {s < 4 && (
              <div
                className={`w-24 h-1 mx-2 transition-all duration-normal ${
                  step > s ? 'bg-primary' : 'bg-border'
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {/* Step Content */}
      {renderStep()}

      {/* Navigation Buttons */}
      <div className="flex justify-between pt-6 border-t border-border">
        <Button
          variant="secondary"
          onClick={() => setStep(Math.max(1, step - 1))}
          disabled={step === 1}
        >
          Anterior
        </Button>
        {step < 4 ? (
          <Button
            variant="primary"
            onClick={() => setStep(Math.min(4, step + 1))}
          >
            Siguiente
          </Button>
        ) : (
          <Button variant="primary">
            <Send className="w-5 h-5 mr-2" />
            Programar Campaña
          </Button>
        )}
      </div>
    </div>
  );
}

