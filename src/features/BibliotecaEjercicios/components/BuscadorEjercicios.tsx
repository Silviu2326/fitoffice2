import { Search } from 'lucide-react';

interface BuscadorEjerciciosProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

export default function BuscadorEjercicios({ searchTerm, onSearchChange }: BuscadorEjerciciosProps) {
  return (
    <div className="relative flex-1">
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#64748B]" />
      <input
        type="text"
        placeholder="Buscar ejercicios por nombre o grupo muscular..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="w-full h-12 pl-12 pr-4 py-3 bg-[#2A2A3A] border border-[#334155] rounded-xl text-[#F1F5F9] placeholder-[#64748B] focus:outline-none focus:ring-2 focus:ring-[#6366F1] focus:border-[#6366F1] transition-all duration-200 ease-out"
      />
    </div>
  );
}

