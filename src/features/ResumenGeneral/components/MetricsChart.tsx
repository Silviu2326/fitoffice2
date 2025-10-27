import { TrendingUp } from 'lucide-react';
import { Card, CardHeader, CardTitle, Badge } from '../../../components/ui';

/**
 * MetricsChart - Gráfico de rendimiento semanal
 * Actualizado según guía de estilos FitOffice v2.0
 */
export default function MetricsChart() {
  // Datos simulados para el gráfico
  const data = [
    { day: 'Lun', value: 65 },
    { day: 'Mar', value: 75 },
    { day: 'Mié', value: 55 },
    { day: 'Jue', value: 85 },
    { day: 'Vie', value: 90 },
    { day: 'Sáb', value: 70 },
    { day: 'Dom', value: 60 }
  ];

  const maxValue = Math.max(...data.map(d => d.value));

  return (
    <Card className="bg-[#1E1E2E] border-[#334155]">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-[#F1F5F9] mb-1">Rendimiento Semanal</CardTitle>
            <p className="text-[#94A3B8] text-sm">Tasa de ocupación de sesiones</p>
          </div>
          <Badge variant="success" className="flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            <span className="font-semibold">+12%</span>
          </Badge>
        </div>
      </CardHeader>

      {/* Gráfico de barras simple */}
      <div className="flex items-end justify-between gap-3 h-48">
        {data.map((item, index) => (
          <div key={index} className="flex-1 flex flex-col items-center gap-2">
            <div className="w-full flex items-end justify-center h-full">
              <div
                className="w-full bg-gradient-to-t from-[#10B981] to-[#059669] rounded-t-xl hover:from-[#059669] hover:to-[#047857] transition-all duration-200 cursor-pointer relative group shadow-sm"
                style={{ height: `${(item.value / maxValue) * 100}%` }}
              >
                <span className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-[#F1F5F9] text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  {item.value}%
                </span>
              </div>
            </div>
            <span className="text-[#94A3B8] text-xs font-medium">{item.day}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}

