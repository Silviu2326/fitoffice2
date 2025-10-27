import { useState, useEffect } from 'react';
import { Plus, Settings, Zap, FileText, Filter } from 'lucide-react';
import PipelineKanban from '../components/PipelineKanban';
import PipelineFilters from '../components/PipelineFilters';
import PipelineMetrics from '../components/PipelineMetrics';
import PhaseConfigurator from '../components/PhaseConfigurator';
import PipelineAutomation from '../components/PipelineAutomation';
import PipelineReports from '../components/PipelineReports';
import { Lead, Phase, PipelineMetrics as MetricsType } from '../types';
import { pipelineAPI } from '../api/pipeline';
import { phasesAPI } from '../api/phases';
import { metricsAPI } from '../api/metrics';

export default function PipelineVentaKanbanPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [phases, setPhases] = useState<Phase[]>([]);
  const [metrics, setMetrics] = useState<MetricsType | null>(null);
  const [filteredLeads, setFilteredLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  
  // Estados para modales
  const [showPhaseConfig, setShowPhaseConfig] = useState(false);
  const [showAutomation, setShowAutomation] = useState(false);
  const [showReports, setShowReports] = useState(false);

  // Estados para filtros
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAssignedTo, setSelectedAssignedTo] = useState('');
  const [selectedTag, setSelectedTag] = useState('');

  // Cargar datos iniciales
  useEffect(() => {
    loadData();
  }, []);

  // Aplicar filtros
  useEffect(() => {
    applyFilters();
  }, [leads, searchTerm, selectedAssignedTo, selectedTag]);

  const loadData = async () => {
    try {
      setLoading(true);
      const [leadsData, phasesData, metricsData] = await Promise.all([
        pipelineAPI.getLeads(),
        phasesAPI.getPhases(),
        metricsAPI.getMetrics(),
      ]);
      setLeads(leadsData);
      setPhases(phasesData);
      setMetrics(metricsData);
    } catch (error) {
      console.error('Error al cargar datos:', error);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...leads];

    // Filtro de búsqueda
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        lead =>
          lead.name.toLowerCase().includes(term) ||
          lead.email?.toLowerCase().includes(term) ||
          lead.company?.toLowerCase().includes(term)
      );
    }

    // Filtro por asignado
    if (selectedAssignedTo) {
      filtered = filtered.filter(lead => lead.assignedTo === selectedAssignedTo);
    }

    // Filtro por etiqueta
    if (selectedTag) {
      filtered = filtered.filter(lead => lead.tags?.includes(selectedTag));
    }

    setFilteredLeads(filtered);
  };

  const handleLeadMove = async (leadId: string, newPhaseId: string) => {
    try {
      const updatedLead = await pipelineAPI.moveLead(leadId, newPhaseId);
      setLeads(leads.map(lead => (lead.id === leadId ? updatedLead : lead)));
      // Recargar métricas después del movimiento
      const newMetrics = await metricsAPI.getMetrics();
      setMetrics(newMetrics);
    } catch (error) {
      console.error('Error al mover lead:', error);
    }
  };

  const handleLeadClick = (lead: Lead) => {
    setSelectedLead(lead);
    // Aquí se podría abrir un modal con los detalles del lead
    console.log('Lead seleccionado:', lead);
  };

  const handleSavePhases = async (updatedPhases: Phase[]) => {
    try {
      const savedPhases = await phasesAPI.updateAllPhases(updatedPhases);
      setPhases(savedPhases);
      await loadData(); // Recargar todo para mantener consistencia
    } catch (error) {
      console.error('Error al guardar fases:', error);
    }
  };

  // Obtener opciones únicas para filtros
  const assignedToOptions = Array.from(new Set(leads.map(l => l.assignedTo).filter(Boolean))) as string[];
  const tagOptions = Array.from(new Set(leads.flatMap(l => l.tags || []))).sort();

  if (loading) {
    return (
      <div className="flex-1 bg-[#F8FAFC] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#6366F1] border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-[#F8FAFC] overflow-hidden flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-[#E2E8F0] p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-[#0F172A] mb-2">Pipeline de Ventas</h1>
            <p className="text-[#64748B]">
              Gestión visual del proceso de ventas con seguimiento en tiempo real
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowReports(true)}
              className="px-4 py-2 bg-white text-[#0F172A] border border-[#E2E8F0] hover:bg-[#F8FAFC] hover:border-[#6366F1] rounded-lg flex items-center gap-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#6366F1] focus:ring-offset-2 font-semibold"
            >
              <FileText className="w-5 h-5" />
              Reportes
            </button>
            <button
              onClick={() => setShowAutomation(true)}
              className="px-4 py-2 bg-white text-[#0F172A] border border-[#E2E8F0] hover:bg-[#F8FAFC] hover:border-[#6366F1] rounded-lg flex items-center gap-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#6366F1] focus:ring-offset-2 font-semibold"
            >
              <Zap className="w-5 h-5" />
              Automatización
            </button>
            <button
              onClick={() => setShowPhaseConfig(true)}
              className="px-4 py-2 bg-white text-[#0F172A] border border-[#E2E8F0] hover:bg-[#F8FAFC] hover:border-[#6366F1] rounded-lg flex items-center gap-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#6366F1] focus:ring-offset-2 font-semibold"
            >
              <Settings className="w-5 h-5" />
              Configurar Fases
            </button>
            <button
              onClick={() => {
                // Lógica para crear nuevo lead
                alert('Crear nuevo lead (funcionalidad a implementar)');
              }}
              className="px-4 py-2 bg-[#6366F1] text-white hover:bg-[#4F46E5] rounded-lg flex items-center gap-2 transition-all duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#6366F1] focus:ring-offset-2 font-semibold"
            >
              <Plus className="w-5 h-5" />
              Nuevo Lead
            </button>
          </div>
        </div>

        {/* Métricas */}
        {metrics && <PipelineMetrics metrics={metrics} />}
      </div>

      {/* Filtros */}
      <div className="px-6 pt-6 pb-0">
        <PipelineFilters
          onSearchChange={setSearchTerm}
          onAssignedToChange={setSelectedAssignedTo}
          onTagChange={setSelectedTag}
          assignedToOptions={assignedToOptions}
          tagOptions={tagOptions}
        />
      </div>

      {/* Kanban Board */}
      <div className="flex-1 px-6 pt-6 pb-6 overflow-hidden">
        <PipelineKanban
          phases={phases}
          leads={filteredLeads}
          onLeadMove={handleLeadMove}
          onLeadClick={handleLeadClick}
        />
      </div>

      {/* Modales */}
      {showPhaseConfig && (
        <PhaseConfigurator
          phases={phases}
          onSave={handleSavePhases}
          onClose={() => setShowPhaseConfig(false)}
        />
      )}

      {showAutomation && (
        <PipelineAutomation
          phases={phases}
          onClose={() => setShowAutomation(false)}
        />
      )}

      {showReports && metrics && (
        <PipelineReports
          metrics={metrics}
          onClose={() => setShowReports(false)}
        />
      )}
    </div>
  );
}

