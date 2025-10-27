import { useState } from 'react';
import { Send, Mail, MessageSquare, Smartphone, Bell, CheckCircle } from 'lucide-react';

interface Channel {
  id: string;
  name: string;
  icon: any;
  enabled: boolean;
  status: 'configured' | 'pending' | 'error';
  stats: {
    sent: number;
    delivered: number;
    failed: number;
  };
}

export default function MultiChannelSender() {
  const [channels, setChannels] = useState<Channel[]>([
    {
      id: 'email',
      name: 'Email',
      icon: Mail,
      enabled: true,
      status: 'configured',
      stats: { sent: 1250, delivered: 1205, failed: 45 }
    },
    {
      id: 'whatsapp',
      name: 'WhatsApp',
      icon: MessageSquare,
      enabled: true,
      status: 'configured',
      stats: { sent: 890, delivered: 875, failed: 15 }
    },
    {
      id: 'sms',
      name: 'SMS',
      icon: Smartphone,
      enabled: false,
      status: 'pending',
      stats: { sent: 0, delivered: 0, failed: 0 }
    },
    {
      id: 'push',
      name: 'Push Notifications',
      icon: Bell,
      enabled: false,
      status: 'pending',
      stats: { sent: 0, delivered: 0, failed: 0 }
    }
  ]);

  const [sending, setSending] = useState(false);
  const [selectedChannels, setSelectedChannels] = useState<string[]>(['email', 'whatsapp']);

  const toggleChannel = (channelId: string) => {
    setSelectedChannels(prev =>
      prev.includes(channelId)
        ? prev.filter(id => id !== channelId)
        : [...prev, channelId]
    );
  };

  const handleSend = () => {
    setSending(true);
    // Simular envío
    setTimeout(() => {
      setSending(false);
      alert('Campaña enviada exitosamente');
    }, 2000);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'configured':
        return <span className="bg-[#D1FAE5] text-[#10B981] text-xs px-2 py-1 rounded-md font-medium">Configurado</span>;
      case 'pending':
        return <span className="bg-[#FEF3C7] text-[#F59E0B] text-xs px-2 py-1 rounded-md font-medium">Pendiente</span>;
      case 'error':
        return <span className="bg-[#FEE2E2] text-[#EF4444] text-xs px-2 py-1 rounded-md font-medium">Error</span>;
      default:
        return null;
    }
  };

  const totalSelected = channels.filter(c => selectedChannels.includes(c.id) && c.enabled).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="bg-gradient-to-br from-[#10B981] to-[#059669] p-3 rounded-xl shadow-md">
          <Send className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-[#0F172A]">Envío Multi-Canal</h2>
          <p className="text-[#64748B]">Coordina el envío a través de múltiples canales</p>
        </div>
      </div>

      {/* Channel Selection */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {channels.map((channel) => {
          const Icon = channel.icon;
          const isSelected = selectedChannels.includes(channel.id);
          
          return (
            <div
              key={channel.id}
              className={`bg-white rounded-xl p-6 border-2 transition-all duration-200 ${
                isSelected && channel.enabled
                  ? 'border-[#10B981] shadow-md'
                  : 'border-[#E2E8F0] shadow-sm'
              } ${!channel.enabled ? 'opacity-50' : 'cursor-pointer hover:border-[#10B981]'}`}
              onClick={() => channel.enabled && toggleChannel(channel.id)}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${
                    isSelected && channel.enabled
                      ? 'bg-[#D1FAE5]'
                      : 'bg-[#F8FAFC]'
                  }`}>
                    <Icon className={`w-6 h-6 ${
                      isSelected && channel.enabled
                        ? 'text-[#10B981]'
                        : 'text-[#64748B]'
                    }`} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#0F172A]">{channel.name}</h3>
                    {getStatusBadge(channel.status)}
                  </div>
                </div>
                {isSelected && channel.enabled && (
                  <CheckCircle className="w-6 h-6 text-[#10B981]" />
                )}
              </div>

              {channel.enabled && (
                <div className="grid grid-cols-3 gap-2 text-sm">
                  <div>
                    <div className="text-[#64748B]">Enviados</div>
                    <div className="text-lg font-semibold text-[#0F172A]">
                      {channel.stats.sent.toLocaleString()}
                    </div>
                  </div>
                  <div>
                    <div className="text-[#64748B]">Entregados</div>
                    <div className="text-lg font-semibold text-[#10B981]">
                      {channel.stats.delivered.toLocaleString()}
                    </div>
                  </div>
                  <div>
                    <div className="text-[#64748B]">Fallidos</div>
                    <div className="text-lg font-semibold text-[#EF4444]">
                      {channel.stats.failed.toLocaleString()}
                    </div>
                  </div>
                </div>
              )}

              {!channel.enabled && (
                <div className="text-sm text-[#94A3B8]">
                  Canal no configurado. Configure este canal en ajustes para habilitarlo.
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Send Configuration */}
      <div className="bg-white rounded-xl p-6 border border-[#E2E8F0] shadow-sm">
        <h3 className="text-lg font-bold text-[#0F172A] mb-4">Configuración de Envío</h3>
        
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[#0F172A] mb-2">
                Prioridad de Canales
              </label>
              <select className="w-full bg-white text-[#0F172A] px-4 py-3 rounded-lg border border-[#E2E8F0] focus:border-[#6366F1] focus:outline-none focus:ring-2 focus:ring-[#6366F1]/20 transition-all duration-200">
                <option>Email primero, luego WhatsApp</option>
                <option>WhatsApp primero, luego Email</option>
                <option>Envío simultáneo</option>
                <option>Basado en preferencias del usuario</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-[#0F172A] mb-2">
                Velocidad de Envío
              </label>
              <select className="w-full bg-white text-[#0F172A] px-4 py-3 rounded-lg border border-[#E2E8F0] focus:border-[#6366F1] focus:outline-none focus:ring-2 focus:ring-[#6366F1]/20 transition-all duration-200">
                <option>Inmediato (máxima velocidad)</option>
                <option>Normal (100/minuto)</option>
                <option>Lento (50/minuto)</option>
                <option>Programado</option>
              </select>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 bg-[#F8FAFC] rounded-lg">
            <input type="checkbox" id="fallback" className="w-4 h-4 rounded border-[#E2E8F0]" defaultChecked />
            <label htmlFor="fallback" className="text-sm text-[#64748B]">
              Usar canal alternativo si el principal falla
            </label>
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="bg-[#D1FAE5] border border-[#10B981]/20 rounded-xl p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-[#0F172A] mb-2">Resumen de Envío</h3>
            <p className="text-[#64748B]">
              Se enviarán mensajes a través de {totalSelected} canal{totalSelected !== 1 ? 'es' : ''}: {' '}
              {channels
                .filter(c => selectedChannels.includes(c.id) && c.enabled)
                .map(c => c.name)
                .join(', ')}
            </p>
          </div>
          <button
            onClick={handleSend}
            disabled={totalSelected === 0 || sending}
            className="flex items-center gap-2 bg-[#10B981] text-white px-8 py-4 rounded-lg hover:bg-[#059669] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg font-semibold"
          >
            <Send className="w-5 h-5" />
            {sending ? 'Enviando...' : 'Enviar Campaña'}
          </button>
        </div>
      </div>
    </div>
  );
}
