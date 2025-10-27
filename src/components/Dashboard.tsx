import { Users, Calendar, TrendingUp, DollarSign } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

export default function Dashboard() {
  const { user } = useAuth();
  const [trainerName, setTrainerName] = useState('');

  useEffect(() => {
    const fetchTrainerData = async () => {
      if (!user) return;

      const { data } = await supabase
        .from('trainers')
        .select('full_name')
        .eq('id', user.id)
        .maybeSingle();

      if (data) {
        setTrainerName(data.full_name || 'Entrenador');
      }
    };

    fetchTrainerData();
  }, [user]);

  const stats = [
    {
      title: 'Clientes Activos',
      value: '0',
      icon: Users,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600',
    },
    {
      title: 'Sesiones del Mes',
      value: '0',
      icon: Calendar,
      color: 'from-emerald-500 to-emerald-600',
      bgColor: 'bg-emerald-50',
      textColor: 'text-emerald-600',
    },
    {
      title: 'Ingresos Mensuales',
      value: '$0',
      icon: DollarSign,
      color: 'from-amber-500 to-amber-600',
      bgColor: 'bg-amber-50',
      textColor: 'text-amber-600',
    },
    {
      title: 'Tasa de Retención',
      value: '0%',
      icon: TrendingUp,
      color: 'from-violet-500 to-violet-600',
      bgColor: 'bg-violet-50',
      textColor: 'text-violet-600',
    },
  ];

  return (
    <div className="flex-1 bg-surface">
      {/* Header según sistema de diseño */}
      <div className="bg-background border-b border-border px-8 py-6">
        <h1 className="text-h1 font-bold text-text-primary">
          Bienvenido, {trainerName}
        </h1>
        <p className="text-body text-text-secondary mt-1">
          Aquí tienes un resumen de tu negocio de entrenamiento personal
        </p>
      </div>

      <div className="p-8">
        {/* Cards de estadísticas con sistema de diseño */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.title}
                className="card-base card-hover"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`${stat.bgColor} p-3 rounded-lg shadow-sm`}>
                    <Icon className={`w-icon-lg h-icon-lg ${stat.textColor}`} />
                  </div>
                </div>
                <h3 className="text-text-secondary text-body-small font-medium mb-1">
                  {stat.title}
                </h3>
                <p className="text-display font-bold text-text-primary">{stat.value}</p>
              </div>
            );
          })}
        </div>

        {/* Sección de próximas sesiones y actividad */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="card-base">
            <h2 className="text-h3 font-bold text-text-primary mb-4">
              Próximas Sesiones
            </h2>
            <div className="text-center py-12 text-text-muted">
              <Calendar className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p className="text-body-small">No hay sesiones programadas</p>
            </div>
          </div>

          <div className="card-base">
            <h2 className="text-h3 font-bold text-text-primary mb-4">
              Actividad Reciente
            </h2>
            <div className="text-center py-12 text-text-muted">
              <TrendingUp className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p className="text-body-small">No hay actividad reciente</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
