import { Search, Filter, X } from 'lucide-react';
import { useState } from 'react';

interface PipelineFiltersProps {
  onSearchChange: (search: string) => void;
  onAssignedToChange: (assignedTo: string) => void;
  onTagChange: (tag: string) => void;
  assignedToOptions: string[];
  tagOptions: string[];
}

export default function PipelineFilters({
  onSearchChange,
  onAssignedToChange,
  onTagChange,
  assignedToOptions,
  tagOptions,
}: PipelineFiltersProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAssignedTo, setSelectedAssignedTo] = useState('');
  const [selectedTag, setSelectedTag] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    onSearchChange(value);
  };

  const handleAssignedToChange = (value: string) => {
    setSelectedAssignedTo(value);
    onAssignedToChange(value);
  };

  const handleTagChange = (value: string) => {
    setSelectedTag(value);
    onTagChange(value);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedAssignedTo('');
    setSelectedTag('');
    onSearchChange('');
    onAssignedToChange('');
    onTagChange('');
  };

  const hasActiveFilters = searchTerm || selectedAssignedTo || selectedTag;

  return (
    <div className="bg-white rounded-xl p-4 space-y-4 border border-[#E2E8F0] shadow-sm">
      <div className="flex items-center gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#94A3B8] w-5 h-5" />
          <input
            type="text"
            placeholder="Buscar leads por nombre, email o empresa..."
            value={searchTerm}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="w-full bg-white text-[#0F172A] border border-[#E2E8F0] pl-10 pr-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6366F1] focus:border-[#6366F1] transition-all duration-200"
          />
        </div>
        
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`px-4 py-3 rounded-xl flex items-center gap-2 transition-all duration-200 font-semibold ${
            showFilters || hasActiveFilters
              ? 'bg-[#6366F1] text-white shadow-md hover:shadow-lg hover:bg-[#4F46E5]'
              : 'bg-white text-[#0F172A] border border-[#E2E8F0] hover:bg-[#F8FAFC] hover:border-[#6366F1]'
          }`}
        >
          <Filter className="w-5 h-5" />
          Filtros
        </button>

        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="px-4 py-3 rounded-xl bg-white text-[#0F172A] border border-[#E2E8F0] hover:bg-[#F8FAFC] hover:border-[#6366F1] flex items-center gap-2 transition-all duration-200 font-semibold"
          >
            <X className="w-5 h-5" />
            Limpiar
          </button>
        )}
      </div>

      {showFilters && (
        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[#E2E8F0]">
          <div>
            <label className="block text-sm text-[#64748B] mb-2 font-medium">Asignado a</label>
            <select
              value={selectedAssignedTo}
              onChange={(e) => handleAssignedToChange(e.target.value)}
              className="w-full bg-white text-[#0F172A] border border-[#E2E8F0] px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6366F1] focus:border-[#6366F1] transition-all duration-200"
            >
              <option value="">Todos</option>
              {assignedToOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm text-[#64748B] mb-2 font-medium">Etiqueta</label>
            <select
              value={selectedTag}
              onChange={(e) => handleTagChange(e.target.value)}
              className="w-full bg-white text-[#0F172A] border border-[#E2E8F0] px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6366F1] focus:border-[#6366F1] transition-all duration-200"
            >
              <option value="">Todas</option>
              {tagOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}
    </div>
  );
}

