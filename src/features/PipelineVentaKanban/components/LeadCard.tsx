import { Draggable } from '@hello-pangea/dnd';
import { Calendar, Euro, Clock, Phone, Mail } from 'lucide-react';
import { Lead } from '../types';

interface LeadCardProps {
  lead: Lead;
  index: number;
  onClick: () => void;
}

export default function LeadCard({ lead, index, onClick }: LeadCardProps) {
  const getDaysInPhase = () => {
    const now = new Date();
    const entryDate = new Date(lead.phaseEntryDate);
    const diffTime = Math.abs(now.getTime() - entryDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const daysInPhase = getDaysInPhase();
  const isStale = daysInPhase > 7;

  return (
    <Draggable draggableId={`lead-${lead.id}`} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          onClick={onClick}
          className={`bg-white rounded-xl p-4 cursor-pointer hover:shadow-lg transition-all duration-200 border border-[#E2E8F0] ${
            snapshot.isDragging ? 'shadow-xl ring-2 ring-[#6366F1] rotate-2' : 'shadow-sm'
          } ${isStale ? 'border-l-4 border-[#F59E0B]' : ''}`}
        >
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <h4 className="font-semibold text-[#0F172A] mb-1">{lead.name}</h4>
              {lead.company && (
                <p className="text-xs text-[#64748B]">{lead.company}</p>
              )}
            </div>
            {lead.value && (
              <span className="text-[#10B981] font-semibold flex items-center gap-1 text-sm">
                <Euro className="w-4 h-4" />
                {lead.value.toLocaleString('es-ES')}
              </span>
            )}
          </div>

          <div className="space-y-2 text-xs text-[#64748B]">
            {lead.email && (
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5" />
                <span className="truncate">{lead.email}</span>
              </div>
            )}
            {lead.phone && (
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5" />
                <span>{lead.phone}</span>
              </div>
            )}
            <div className="flex items-center gap-2">
              <Calendar className="w-3.5 h-3.5" />
              <span>{new Date(lead.createdAt).toLocaleDateString('es-ES')}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-3.5 h-3.5" />
              <span className={isStale ? 'text-[#F59E0B] font-medium' : ''}>
                {daysInPhase} {daysInPhase === 1 ? 'día' : 'días'} en fase
              </span>
            </div>
          </div>

          {lead.tags && lead.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {lead.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="text-xs bg-[#F1F5F9] text-[#64748B] px-3 py-1 rounded-full font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {lead.assignedTo && (
            <div className="mt-3 pt-3 border-t border-[#E2E8F0]">
              <span className="text-xs text-[#64748B]">
                Asignado a: <span className="text-[#0F172A] font-medium">{lead.assignedTo}</span>
              </span>
            </div>
          )}
        </div>
      )}
    </Draggable>
  );
}

