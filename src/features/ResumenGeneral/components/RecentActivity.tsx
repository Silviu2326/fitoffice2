import { Clock, User, Calendar, DollarSign, Dumbbell, Apple } from 'lucide-react';
import { Card, CardHeader, CardTitle } from '../../../components/ui';

/**
 * RecentActivity - Actividad reciente del sistema
 * Actualizado según guía de estilos FitOffice v2.0
 */
export default function RecentActivity() {
  const activities = [
    {
      icon: User,
      title: 'Nuevo cliente registrado',
      description: 'María González se unió al gimnasio',
      time: 'Hace 15 min',
      color: 'from-[#6366F1] to-[#4F46E5]'
    },
    {
      icon: Calendar,
      title: 'Sesión completada',
      description: 'Juan Pérez - Entrenamiento de fuerza',
      time: 'Hace 1 hora',
      color: 'from-[#10B981] to-[#059669]'
    },
    {
      icon: DollarSign,
      title: 'Pago recibido',
      description: '€150 - Cuota mensual de Ana Martínez',
      time: 'Hace 2 horas',
      color: 'from-[#8B5CF6] to-[#7C3AED]'
    },
    {
      icon: Dumbbell,
      title: 'Plan de entreno asignado',
      description: 'Programa de 12 semanas para Carlos Ruiz',
      time: 'Hace 3 horas',
      color: 'from-[#F59E0B] to-[#D97706]'
    },
    {
      icon: Apple,
      title: 'Dieta actualizada',
      description: 'Plan nutricional revisado para Laura López',
      time: 'Hace 5 horas',
      color: 'from-[#10B981] to-[#059669]'
    }
  ];

  return (
    <Card className="bg-[#1E1E2E] border-[#334155]">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-[#94A3B8]" />
          <CardTitle className="text-[#F1F5F9]">Actividad Reciente</CardTitle>
        </div>
      </CardHeader>
      <div className="space-y-3">
        {activities.map((activity, index) => (
          <div
            key={index}
            className="flex items-start gap-3 p-3 bg-[#2A2A3A] rounded-xl border border-[#334155] hover:border-[#6366F1] transition-all duration-200 cursor-pointer"
          >
            <div className={`bg-gradient-to-br ${activity.color} p-2 rounded-lg flex-shrink-0 shadow-sm`}>
              <activity.icon className="w-4 h-4 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-[#F1F5F9] font-semibold text-sm mb-1">{activity.title}</h3>
              <p className="text-[#94A3B8] text-xs truncate">{activity.description}</p>
            </div>
            <span className="text-[#64748B] text-xs flex-shrink-0">{activity.time}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}

