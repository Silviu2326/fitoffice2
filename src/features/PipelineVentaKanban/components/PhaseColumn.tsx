import { Users } from 'lucide-react';
import LeadCard from './LeadCard';
import { Lead, Phase } from '../types';

interface PhaseColumnProps {
  phase: Phase;
  leads: Lead[];
  onLeadClick: (lead: Lead) => void;
  isDraggingOver: boolean;
}

export default function PhaseColumn({ phase, leads, onLeadClick, isDraggingOver }: PhaseColumnProps) {
  const totalValue = leads.reduce((sum, lead) => sum + (lead.value || 0), 0);

  return (
    <div className={`w-80 bg-white rounded-2xl flex flex-col transition-all duration-200 border border-[#E2E8F0] shadow-md ${
      isDraggingOver ? 'ring-2 ring-[#6366F1] shadow-lg' : ''
    }`}>
      <div className="p-4 border-b border-[#E2E8F0]">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold text-[#0F172A] flex items-center gap-2 text-lg">
            <span className={`w-3 h-3 rounded-full ${phase.color}`}></span>
            {phase.name}
          </h3>
          <span className="text-xs text-[#64748B] bg-[#F1F5F9] px-3 py-1 rounded-full flex items-center gap-1 font-medium">
            <Users className="w-3 h-3" />
            {leads.length}
          </span>
        </div>
        {totalValue > 0 && (
          <div className="text-sm text-[#10B981] font-semibold">
            €{totalValue.toLocaleString('es-ES')}
          </div>
        )}
      </div>
      
      <div className="flex-1 p-4 space-y-3 overflow-y-auto max-h-[calc(100vh-280px)]">
        {leads.length === 0 ? (
          <div className="text-center text-[#94A3B8] text-sm py-8">
            No hay leads en esta fase
          </div>
        ) : (
          leads.map((lead, index) => (
            <LeadCard
              key={lead.id}
              lead={lead}
              index={index}
              onClick={() => onLeadClick(lead)}
            />
          ))
        )}
      </div>
    </div>
  );
}

