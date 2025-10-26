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
    <div className="flex-1 bg-slate-50">
      <div className="bg-white border-b border-slate-200 px-8 py-6">
        <h1 className="text-3xl font-bold text-slate-900">
          Bienvenido, {trainerName}
        </h1>
        <p className="text-slate-600 mt-1">
          Aquí tienes un resumen de tu negocio de entrenamiento personal
        </p>
      </div>

      <div className="p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.title}
                className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`${stat.bgColor} p-3 rounded-lg`}>
                    <Icon className={`w-6 h-6 ${stat.textColor}`} />
                  </div>
                </div>
                <h3 className="text-slate-600 text-sm font-medium mb-1">
                  {stat.title}
                </h3>
                <p className="text-3xl font-bold text-slate-900">{stat.value}</p>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h2 className="text-xl font-bold text-slate-900 mb-4">
              Próximas Sesiones
            </h2>
            <div className="text-center py-12 text-slate-400">
              <Calendar className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>No hay sesiones programadas</p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h2 className="text-xl font-bold text-slate-900 mb-4">
              Actividad Reciente
            </h2>
            <div className="text-center py-12 text-slate-400">
              <TrendingUp className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>No hay actividad reciente</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
