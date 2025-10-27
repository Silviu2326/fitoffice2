import { Link } from 'react-router-dom';
import { UserPlus, Calendar, FileText, Dumbbell, Apple, DollarSign } from 'lucide-react';
import { Card, CardHeader, CardTitle } from '../../../components/ui';

/**
 * QuickActions - Acciones rápidas del dashboard
 * Actualizado según guía de estilos FitOffice v2.0
 */
export default function QuickActions() {
  const actions = [
    {
      title: 'Nuevo Cliente',
      description: 'Añadir cliente al sistema',
      icon: UserPlus,
      color: 'from-[#6366F1] to-[#4F46E5]',
      link: '/gestion-clientes'
    },
    {
      title: 'Agendar Sesión',
      description: 'Crear nueva cita',
      icon: Calendar,
      color: 'from-[#10B981] to-[#059669]',
      link: '/agenda-calendario'
    },
    {
      title: 'Nueva Factura',
      description: 'Generar factura',
      icon: FileText,
      color: 'from-[#8B5CF6] to-[#7C3AED]',
      link: '/facturacion-cobros'
    },
    {
      title: 'Asignar Entreno',
      description: 'Crear plan de entrenamiento',
      icon: Dumbbell,
      color: 'from-[#F59E0B] to-[#D97706]',
      link: '/editor-entreno'
    },
    {
      title: 'Asignar Dieta',
      description: 'Crear plan nutricional',
      icon: Apple,
      color: 'from-[#10B981] to-[#059669]',
      link: '/editor-dieta-meal-planner'
    },
    {
      title: 'Registrar Pago',
      description: 'Añadir cobro o gasto',
      icon: DollarSign,
      color: 'from-[#EC4899] to-[#DB2777]',
      link: '/caja-bancos'
    }
  ];

  return (
    <Card className="bg-[#1E1E2E] border-[#334155]">
      <CardHeader>
        <CardTitle className="text-[#F1F5F9]">Acciones Rápidas</CardTitle>
      </CardHeader>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {actions.map((action, index) => (
          <Link
            key={index}
            to={action.link}
            className="flex flex-col items-center p-4 bg-[#2A2A3A] rounded-xl border border-[#334155] hover:border-[#6366F1] hover:bg-[#1E1E2E] transition-all duration-200 group"
          >
            <div className={`bg-gradient-to-br ${action.color} p-3 rounded-xl mb-3 group-hover:scale-110 transition-transform duration-200 shadow-md`}>
              <action.icon className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-[#F1F5F9] font-semibold text-sm text-center mb-1">{action.title}</h3>
            <p className="text-[#94A3B8] text-xs text-center">{action.description}</p>
          </Link>
        ))}
      </div>
    </Card>
  );
}

