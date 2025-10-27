import { useState } from 'react';
import { Plus, Search, Filter, Users, Target } from 'lucide-react';

interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  source: string;
  status: string;
  score: number;
  createdAt: string;
  assignedTo?: string;
}

export default function LeadsManager() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const mockLeads: Lead[] = [
    {
      id: '1',
      name: 'Juan Pérez',
      email: 'juan@example.com',
      phone: '+34 600 123 456',
      source: 'Instagram',
      status: 'hot',
      score: 85,
      createdAt: '2025-10-20',
    },
    {
      id: '2',
      name: 'María García',
      email: 'maria@example.com',
      phone: '+34 600 987 654',
      source: 'WhatsApp',
      status: 'warm',
      score: 65,
      createdAt: '2025-10-22',
    },
    {
      id: '3',
      name: 'Carlos Ruiz',
      email: 'carlos@example.com',
      phone: '+34 600 555 888',
      source: 'Referido',
      status: 'cold',
      score: 35,
      createdAt: '2025-10-25',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'hot':
        return 'bg-[#FEE2E2] text-[#EF4444] border-[#EF4444]';
      case 'warm':
        return 'bg-[#FEF3C7] text-[#F59E0B] border-[#F59E0B]';
      case 'cold':
        return 'bg-[#DBEAFE] text-[#3B82F6] border-[#3B82F6]';
      default:
        return 'bg-[#F1F5F9] text-[#64748B] border-[#E2E8F0]';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 70) return 'text-[#10B981]';
    if (score >= 40) return 'text-[#F59E0B]';
    return 'text-[#EF4444]';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#0F172A]">Gestión de Leads</h2>
          <p className="text-[#64748B] mt-1">
            Gestiona y convierte leads en clientes activos
          </p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-[#6366F1] text-white rounded-lg font-semibold hover:bg-[#4F46E5] active:scale-[0.98] transition-all duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#6366F1] focus:ring-offset-2">
          <Plus className="w-5 h-5" />
          Nuevo Lead
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-200">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-[#EEF2FF] rounded-lg">
              <Users className="w-5 h-5 text-[#6366F1]" />
            </div>
            <span className="text-[#64748B] text-sm font-medium">Total Leads</span>
          </div>
          <p className="text-3xl font-bold text-[#0F172A]">0</p>
          <p className="text-sm text-[#10B981] mt-1 font-medium">+0% este mes</p>
        </div>

        <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-200">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-[#FEE2E2] rounded-lg">
              <Target className="w-5 h-5 text-[#EF4444]" />
            </div>
            <span className="text-[#64748B] text-sm font-medium">Leads Calientes</span>
          </div>
          <p className="text-3xl font-bold text-[#0F172A]">0</p>
          <p className="text-sm text-[#64748B] mt-1">Score &gt; 70</p>
        </div>

        <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-200">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-[#FEF3C7] rounded-lg">
              <Target className="w-5 h-5 text-[#F59E0B]" />
            </div>
            <span className="text-[#64748B] text-sm font-medium">Leads Tibios</span>
          </div>
          <p className="text-3xl font-bold text-[#0F172A]">0</p>
          <p className="text-sm text-[#64748B] mt-1">Score 40-70</p>
        </div>

        <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-200">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-[#DBEAFE] rounded-lg">
              <Target className="w-5 h-5 text-[#3B82F6]" />
            </div>
            <span className="text-[#64748B] text-sm font-medium">Leads Fríos</span>
          </div>
          <p className="text-3xl font-bold text-[#0F172A]">0</p>
          <p className="text-sm text-[#64748B] mt-1">Score &lt; 40</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#64748B]" />
          <input
            type="text"
            placeholder="Buscar leads..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white border border-[#E2E8F0] rounded-lg text-[#0F172A] placeholder-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#6366F1] focus:border-[#6366F1] transition-all duration-200"
          />
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-white border border-[#E2E8F0] rounded-lg text-[#0F172A] font-medium hover:bg-[#F8FAFC] hover:border-[#6366F1] transition-all duration-200">
          <Filter className="w-5 h-5" />
          Filtros
        </button>
      </div>

      {/* Leads Table */}
      <div className="bg-white border border-[#E2E8F0] rounded-2xl overflow-hidden shadow-md">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#E2E8F0] bg-[#F8FAFC]">
                <th className="text-left py-4 px-6 text-sm font-semibold text-[#0F172A]">
                  Nombre
                </th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-[#0F172A]">
                  Contacto
                </th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-[#0F172A]">
                  Origen
                </th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-[#0F172A]">
                  Estado
                </th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-[#0F172A]">
                  Score
                </th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-[#0F172A]">
                  Fecha
                </th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-[#0F172A]">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody>
              {mockLeads.map((lead) => (
                <tr
                  key={lead.id}
                  className="border-b border-[#E2E8F0] hover:bg-[#F8FAFC] transition-colors duration-200"
                >
                  <td className="py-4 px-6">
                    <div className="text-[#0F172A] font-semibold">{lead.name}</div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="text-sm text-[#0F172A]">{lead.email}</div>
                    <div className="text-xs text-[#64748B]">{lead.phone}</div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-sm text-[#64748B]">{lead.source}</span>
                  </td>
                  <td className="py-4 px-6">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                        lead.status
                      )}`}
                    >
                      {lead.status === 'hot' && 'Caliente'}
                      {lead.status === 'warm' && 'Tibio'}
                      {lead.status === 'cold' && 'Frío'}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`text-lg font-bold ${getScoreColor(lead.score)}`}>
                      {lead.score}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-sm text-[#64748B]">{lead.createdAt}</span>
                  </td>
                  <td className="py-4 px-6">
                    <button className="text-[#6366F1] hover:text-[#4F46E5] text-sm font-semibold transition-colors duration-200">
                      Ver detalles
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Empty State */}
      {mockLeads.length === 0 && (
        <div className="bg-white border border-[#E2E8F0] rounded-2xl p-12 text-center shadow-md">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-[#F1F5F9] rounded-full mb-4">
            <Users className="w-8 h-8 text-[#64748B]" />
          </div>
          <h3 className="text-xl font-semibold text-[#0F172A] mb-2">
            No hay leads registrados
          </h3>
          <p className="text-[#64748B] mb-6">
            Comienza a capturar leads para hacer crecer tu negocio
          </p>
          <button className="px-6 py-3 bg-[#6366F1] text-white rounded-lg font-semibold hover:bg-[#4F46E5] active:scale-[0.98] transition-all duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#6366F1] focus:ring-offset-2">
            Agregar Primer Lead
          </button>
        </div>
      )}
    </div>
  );
}

