import { Calendar, Mail, MessageSquare, Phone, User, FileText, Star } from 'lucide-react';

interface HistoryItem {
  id: string;
  type: 'email' | 'whatsapp' | 'call' | 'note' | 'status_change' | 'score_change';
  title: string;
  description: string;
  date: string;
  time: string;
  user?: string;
}

export default function LeadHistory() {
  const history: HistoryItem[] = [
    {
      id: '1',
      type: 'email',
      title: 'Email enviado',
      description: 'Email de bienvenida - "Bienvenido a FitOffice"',
      date: '2025-10-26',
      time: '10:30',
      user: 'Sistema',
    },
    {
      id: '2',
      type: 'whatsapp',
      title: 'Mensaje de WhatsApp',
      description: 'Primera toma de contacto vía WhatsApp',
      date: '2025-10-25',
      time: '16:45',
      user: 'Carlos Martínez',
    },
    {
      id: '3',
      type: 'call',
      title: 'Llamada telefónica',
      description: 'Duración: 15 minutos - Interesado en plan mensual',
      date: '2025-10-24',
      time: '11:20',
      user: 'Ana García',
    },
    {
      id: '4',
      type: 'note',
      title: 'Nota añadida',
      description: 'Lead muy interesado, quiere empezar la próxima semana',
      date: '2025-10-24',
      time: '11:35',
      user: 'Ana García',
    },
    {
      id: '5',
      type: 'score_change',
      title: 'Score actualizado',
      description: 'Score aumentado de 65 a 85 puntos',
      date: '2025-10-24',
      time: '11:40',
      user: 'Sistema',
    },
    {
      id: '6',
      type: 'status_change',
      title: 'Estado cambiado',
      description: 'De "Tibio" a "Caliente"',
      date: '2025-10-24',
      time: '11:40',
      user: 'Sistema',
    },
    {
      id: '7',
      type: 'email',
      title: 'Email abierto',
      description: 'El lead abrió el email de seguimiento',
      date: '2025-10-23',
      time: '09:15',
      user: 'Sistema',
    },
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case 'email':
        return { icon: Mail, color: 'text-[#3B82F6]', bg: 'bg-[#DBEAFE]' };
      case 'whatsapp':
        return { icon: MessageSquare, color: 'text-[#10B981]', bg: 'bg-[#D1FAE5]' };
      case 'call':
        return { icon: Phone, color: 'text-[#8B5CF6]', bg: 'bg-[#EDE9FE]' };
      case 'note':
        return { icon: FileText, color: 'text-[#F59E0B]', bg: 'bg-[#FEF3C7]' };
      case 'score_change':
        return { icon: Star, color: 'text-[#EAB308]', bg: 'bg-[#FEF9C3]' };
      case 'status_change':
        return { icon: User, color: 'text-[#EC4899]', bg: 'bg-[#FCE7F3]' };
      default:
        return { icon: Calendar, color: 'text-[#64748B]', bg: 'bg-[#F1F5F9]' };
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-[#0F172A]">Historial de Interacciones</h2>
        <p className="text-[#64748B] mt-1">
          Registro completo de todas las interacciones con el lead
        </p>
      </div>

      {/* Lead Info Summary */}
      <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-md">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] rounded-full flex items-center justify-center text-white font-bold text-xl">
            JP
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-[#0F172A]">Juan Pérez</h3>
            <p className="text-[#64748B]">juan@example.com • +34 600 123 456</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-center">
              <p className="text-3xl font-bold text-[#10B981]">85</p>
              <p className="text-xs text-[#64748B]">Score</p>
            </div>
            <span className="px-4 py-2 bg-[#FEE2E2] text-[#EF4444] border border-[#EF4444] rounded-full text-sm font-medium">
              Caliente
            </span>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-md">
        <h3 className="text-lg font-semibold text-[#0F172A] mb-6">Línea de Tiempo</h3>

        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-[#E2E8F0]"></div>

          {/* History Items */}
          <div className="space-y-6">
            {history.map((item) => {
              const { icon: Icon, color, bg } = getIcon(item.type);
              return (
                <div key={item.id} className="relative flex gap-4 pl-2">
                  {/* Icon */}
                  <div className={`relative z-10 p-3 ${bg} rounded-full`}>
                    <Icon className={`w-5 h-5 ${color}`} />
                  </div>

                  {/* Content */}
                  <div className="flex-1 pb-6">
                    <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg p-4 hover:border-[#6366F1] transition-all duration-200">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="text-[#0F172A] font-semibold">{item.title}</h4>
                        <div className="text-right">
                          <p className="text-[#64748B] text-xs">{item.date}</p>
                          <p className="text-[#94A3B8] text-xs">{item.time}</p>
                        </div>
                      </div>
                      <p className="text-[#64748B] text-sm mb-2">{item.description}</p>
                      {item.user && (
                        <div className="flex items-center gap-2 mt-3 pt-3 border-t border-[#E2E8F0]">
                          <User className="w-4 h-4 text-[#94A3B8]" />
                          <span className="text-[#64748B] text-xs">{item.user}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Activity Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white border border-[#E2E8F0] rounded-2xl p-4 shadow-md">
          <div className="flex items-center gap-2 mb-2">
            <Mail className="w-4 h-4 text-[#3B82F6]" />
            <span className="text-[#64748B] text-sm font-medium">Emails</span>
          </div>
          <p className="text-2xl font-bold text-[#0F172A]">
            {history.filter((h) => h.type === 'email').length}
          </p>
        </div>

        <div className="bg-white border border-[#E2E8F0] rounded-2xl p-4 shadow-md">
          <div className="flex items-center gap-2 mb-2">
            <MessageSquare className="w-4 h-4 text-[#10B981]" />
            <span className="text-[#64748B] text-sm font-medium">WhatsApp</span>
          </div>
          <p className="text-2xl font-bold text-[#0F172A]">
            {history.filter((h) => h.type === 'whatsapp').length}
          </p>
        </div>

        <div className="bg-white border border-[#E2E8F0] rounded-2xl p-4 shadow-md">
          <div className="flex items-center gap-2 mb-2">
            <Phone className="w-4 h-4 text-[#8B5CF6]" />
            <span className="text-[#64748B] text-sm font-medium">Llamadas</span>
          </div>
          <p className="text-2xl font-bold text-[#0F172A]">
            {history.filter((h) => h.type === 'call').length}
          </p>
        </div>

        <div className="bg-white border border-[#E2E8F0] rounded-2xl p-4 shadow-md">
          <div className="flex items-center gap-2 mb-2">
            <FileText className="w-4 h-4 text-[#F59E0B]" />
            <span className="text-[#64748B] text-sm font-medium">Notas</span>
          </div>
          <p className="text-2xl font-bold text-[#0F172A]">
            {history.filter((h) => h.type === 'note').length}
          </p>
        </div>
      </div>
    </div>
  );
}

