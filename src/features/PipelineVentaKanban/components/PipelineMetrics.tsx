import { TrendingUp, Users, Euro, Clock, CheckCircle, XCircle } from 'lucide-react';
import { PipelineMetrics as MetricsType } from '../types';

interface PipelineMetricsProps {
  metrics: MetricsType;
}

export default function PipelineMetrics({ metrics }: PipelineMetricsProps) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
      <div className="bg-[#F8FAFC] rounded-xl p-4 border border-[#E2E8F0]">
        <div className="flex items-center gap-2 mb-2">
          <Users className="w-5 h-5 text-[#3B82F6]" />
          <span className="text-sm text-[#64748B] font-medium">Total Leads</span>
        </div>
        <div className="text-2xl font-bold text-[#0F172A]">{metrics.totalLeads}</div>
      </div>

      <div className="bg-[#F8FAFC] rounded-xl p-4 border border-[#E2E8F0]">
        <div className="flex items-center gap-2 mb-2">
          <Euro className="w-5 h-5 text-[#10B981]" />
          <span className="text-sm text-[#64748B] font-medium">Valor Total</span>
        </div>
        <div className="text-2xl font-bold text-[#0F172A]">
          €{metrics.totalValue.toLocaleString('es-ES')}
        </div>
      </div>

      <div className="bg-[#F8FAFC] rounded-xl p-4 border border-[#E2E8F0]">
        <div className="flex items-center gap-2 mb-2">
          <TrendingUp className="w-5 h-5 text-[#6366F1]" />
          <span className="text-sm text-[#64748B] font-medium">Conv. Rate</span>
        </div>
        <div className="text-2xl font-bold text-[#0F172A]">
          {metrics.conversionRate.toFixed(1)}%
        </div>
      </div>

      <div className="bg-[#F8FAFC] rounded-xl p-4 border border-[#E2E8F0]">
        <div className="flex items-center gap-2 mb-2">
          <Clock className="w-5 h-5 text-[#F59E0B]" />
          <span className="text-sm text-[#64748B] font-medium">Tiempo Avg</span>
        </div>
        <div className="text-2xl font-bold text-[#0F172A]">
          {metrics.averageTimeInPipeline} días
        </div>
      </div>

      <div className="bg-[#F8FAFC] rounded-xl p-4 border border-[#E2E8F0]">
        <div className="flex items-center gap-2 mb-2">
          <CheckCircle className="w-5 h-5 text-[#10B981]" />
          <span className="text-sm text-[#64748B] font-medium">Ganados</span>
        </div>
        <div className="text-2xl font-bold text-[#0F172A]">{metrics.leadsWon}</div>
      </div>

      <div className="bg-[#F8FAFC] rounded-xl p-4 border border-[#E2E8F0]">
        <div className="flex items-center gap-2 mb-2">
          <XCircle className="w-5 h-5 text-[#EF4444]" />
          <span className="text-sm text-[#64748B] font-medium">Perdidos</span>
        </div>
        <div className="text-2xl font-bold text-[#0F172A]">{metrics.leadsLost}</div>
      </div>
    </div>
  );
}

