import { DragEvent, useState } from 'react';
import { Plus, MoreVertical } from 'lucide-react';

interface Lead {
  id: string;
  name: string;
  email: string;
  score: number;
  value: number;
}

interface Column {
  id: string;
  title: string;
  color: string;
  leads: Lead[];
}

export default function PipelineKanban() {
  const [columns, setColumns] = useState<Column[]>([
    {
      id: 'new',
      title: 'Nuevos',
      color: 'bg-[#3B82F6]',
      leads: [
        { id: '1', name: 'Juan Pérez', email: 'juan@example.com', score: 85, value: 500 },
        { id: '2', name: 'María García', email: 'maria@example.com', score: 65, value: 300 },
      ],
    },
    {
      id: 'contacted',
      title: 'Contactados',
      color: 'bg-[#8B5CF6]',
      leads: [
        { id: '3', name: 'Carlos Ruiz', email: 'carlos@example.com', score: 70, value: 400 },
      ],
    },
    {
      id: 'qualified',
      title: 'Calificados',
      color: 'bg-[#F59E0B]',
      leads: [
        { id: '4', name: 'Ana López', email: 'ana@example.com', score: 90, value: 600 },
      ],
    },
    {
      id: 'negotiation',
      title: 'Negociación',
      color: 'bg-[#EAB308]',
      leads: [],
    },
    {
      id: 'won',
      title: 'Ganados',
      color: 'bg-[#10B981]',
      leads: [],
    },
    {
      id: 'lost',
      title: 'Perdidos',
      color: 'bg-[#EF4444]',
      leads: [],
    },
  ]);

  const [draggedLead, setDraggedLead] = useState<{ lead: Lead; fromColumn: string } | null>(null);

  const handleDragStart = (e: DragEvent, lead: Lead, columnId: string) => {
    setDraggedLead({ lead, fromColumn: columnId });
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: DragEvent, toColumnId: string) => {
    e.preventDefault();
    
    if (!draggedLead) return;

    const { lead, fromColumn } = draggedLead;

    if (fromColumn === toColumnId) {
      setDraggedLead(null);
      return;
    }

    setColumns(prevColumns => {
      return prevColumns.map(col => {
        if (col.id === fromColumn) {
          return { ...col, leads: col.leads.filter(l => l.id !== lead.id) };
        }
        if (col.id === toColumnId) {
          return { ...col, leads: [...col.leads, lead] };
        }
        return col;
      });
    });

    setDraggedLead(null);
  };

  const getTotalValue = (leads: Lead[]) => {
    return leads.reduce((sum, lead) => sum + lead.value, 0);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#0F172A]">Pipeline de Ventas</h2>
          <p className="text-[#64748B] mt-1">
            Gestiona el flujo de leads a través del proceso de ventas
          </p>
        </div>
      </div>

      {/* Pipeline Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white border border-[#E2E8F0] rounded-2xl p-4 shadow-md hover:shadow-lg transition-all duration-200">
          <p className="text-[#64748B] text-sm mb-1 font-medium">Total en Pipeline</p>
          <p className="text-2xl font-bold text-[#0F172A]">
            €{columns.reduce((sum, col) => sum + getTotalValue(col.leads), 0)}
          </p>
        </div>
        <div className="bg-white border border-[#E2E8F0] rounded-2xl p-4 shadow-md hover:shadow-lg transition-all duration-200">
          <p className="text-[#64748B] text-sm mb-1 font-medium">Leads Activos</p>
          <p className="text-2xl font-bold text-[#0F172A]">
            {columns.reduce((sum, col) => sum + col.leads.length, 0)}
          </p>
        </div>
        <div className="bg-white border border-[#E2E8F0] rounded-2xl p-4 shadow-md hover:shadow-lg transition-all duration-200">
          <p className="text-[#64748B] text-sm mb-1 font-medium">Tasa de Conversión</p>
          <p className="text-2xl font-bold text-[#10B981]">0%</p>
        </div>
        <div className="bg-white border border-[#E2E8F0] rounded-2xl p-4 shadow-md hover:shadow-lg transition-all duration-200">
          <p className="text-[#64748B] text-sm mb-1 font-medium">Valor Promedio</p>
          <p className="text-2xl font-bold text-[#0F172A]">€0</p>
        </div>
      </div>

      {/* Kanban Board */}
      <div className="overflow-x-auto pb-4">
        <div className="flex gap-4 min-w-max">
          {columns.map((column) => (
            <div
              key={column.id}
              className="flex-shrink-0 w-80"
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, column.id)}
            >
              {/* Column Header */}
              <div className="bg-white border border-[#E2E8F0] rounded-t-2xl p-4 shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${column.color}`}></div>
                    <h3 className="font-semibold text-[#0F172A]">{column.title}</h3>
                    <span className="px-2 py-0.5 bg-[#F1F5F9] rounded-full text-xs text-[#64748B] font-medium">
                      {column.leads.length}
                    </span>
                  </div>
                  <button className="text-[#64748B] hover:text-[#0F172A] transition-colors duration-200">
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </div>
                <div className="text-sm text-[#64748B] font-medium">
                  €{getTotalValue(column.leads)}
                </div>
              </div>

              {/* Column Content */}
              <div className="bg-[#F8FAFC] border border-t-0 border-[#E2E8F0] rounded-b-2xl p-4 min-h-[500px] space-y-3">
                {column.leads.map((lead) => (
                  <div
                    key={lead.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, lead, column.id)}
                    className="bg-white border border-[#E2E8F0] rounded-lg p-4 cursor-move hover:border-[#6366F1] hover:shadow-lg transition-all duration-200"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold text-[#0F172A] text-sm">{lead.name}</h4>
                      <div className="flex items-center gap-1">
                        <span className="text-xs text-[#10B981] font-semibold">
                          {lead.score}
                        </span>
                        <span className="text-xs text-[#94A3B8]">pts</span>
                      </div>
                    </div>
                    <p className="text-xs text-[#64748B] mb-3">{lead.email}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-[#0F172A]">€{lead.value}</span>
                      <button className="text-[#6366F1] hover:text-[#4F46E5] text-xs font-semibold transition-colors duration-200">
                        Ver detalles
                      </button>
                    </div>
                  </div>
                ))}

                {/* Add Lead Button */}
                <button className="w-full py-3 border-2 border-dashed border-[#E2E8F0] rounded-lg text-[#64748B] hover:text-[#6366F1] hover:border-[#6366F1] hover:bg-white transition-all duration-200 flex items-center justify-center gap-2">
                  <Plus className="w-4 h-4" />
                  <span className="text-sm font-medium">Agregar lead</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

