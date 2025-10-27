import { useState } from 'react';
import { Plus, Search, Filter } from 'lucide-react';
import SemáforoSerie from './SemáforoSerie';
import EvaluacionSensaciones from './EvaluacionSensaciones';
import RegistradorRPE from './RegistradorRPE';

interface CheckIn {
  id: string;
  clienteId: string;
  clienteNombre: string;
  ejercicio: string;
  serie: number;
  sensacion: 'buena' | 'regular' | 'mala';
  rpe: number;
  dolorLumbar: boolean;
  fecha: string;
  notas: string;
}

export default function CheckInsEntreno() {
  const [checkins, setCheckins] = useState<CheckIn[]>([
    {
      id: '1',
      clienteId: 'C001',
      clienteNombre: 'Juan Pérez',
      ejercicio: 'Sentadilla',
      serie: 3,
      sensacion: 'buena',
      rpe: 7,
      dolorLumbar: false,
      fecha: '2025-10-26',
      notas: 'Buena técnica, sin molestias'
    },
    {
      id: '2',
      clienteId: 'C002',
      clienteNombre: 'María García',
      ejercicio: 'Press Banca',
      serie: 4,
      sensacion: 'regular',
      rpe: 8,
      dolorLumbar: false,
      fecha: '2025-10-26',
      notas: 'Ligera fatiga en el pectoral'
    },
    {
      id: '3',
      clienteId: 'C003',
      clienteNombre: 'Carlos Ruiz',
      ejercicio: 'Peso Muerto',
      serie: 2,
      sensacion: 'mala',
      rpe: 9,
      dolorLumbar: true,
      fecha: '2025-10-26',
      notas: 'Molestias en zona lumbar baja'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [showNewCheckIn, setShowNewCheckIn] = useState(false);

  const filteredCheckins = checkins.filter(checkin =>
    checkin.clienteNombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    checkin.ejercicio.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleNewCheckIn = (data: any) => {
    const newCheckIn: CheckIn = {
      id: (checkins.length + 1).toString(),
      ...data,
      fecha: new Date().toISOString().split('T')[0]
    };
    setCheckins([newCheckIn, ...checkins]);
    setShowNewCheckIn(false);
  };

  return (
    <div className="space-y-6">
      {/* Barra de acciones */}
      <div className="flex justify-between items-center">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#64748B] w-5 h-5" />
          <input
            type="text"
            placeholder="Buscar por cliente o ejercicio..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full h-12 pl-10 pr-4 bg-[#1E1E2E] border border-[#334155] rounded-[12px] text-[#F1F5F9] placeholder-[#64748B] focus:outline-none focus:ring-2 focus:ring-[#6366F1] focus:border-[#6366F1] transition-all duration-200"
          />
        </div>
        <div className="flex gap-3">
          <button className="inline-flex items-center justify-center gap-2 h-10 px-4 bg-[#F8FAFC] text-[#0F172A] border border-[#E2E8F0] rounded-[12px] font-semibold hover:bg-[#F1F5F9] hover:border-[#6366F1] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#6366F1] focus:ring-offset-2">
            <Filter className="w-5 h-5" />
            Filtros
          </button>
          <button
            onClick={() => setShowNewCheckIn(!showNewCheckIn)}
            className="inline-flex items-center justify-center gap-2 h-10 px-4 bg-[#6366F1] text-white rounded-[12px] font-semibold hover:bg-[#4F46E5] active:bg-[#4338CA] shadow-md hover:shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#6366F1] focus:ring-offset-2"
          >
            <Plus className="w-5 h-5" />
            Nuevo Check-in
          </button>
        </div>
      </div>

      {/* Formulario de nuevo check-in */}
      {showNewCheckIn && (
        <div className="bg-[#1E1E2E] border border-[#334155] rounded-[16px] p-6">
          <h3 className="text-xl font-bold text-[#F1F5F9] mb-4">Registrar Nuevo Check-in</h3>
          <div className="space-y-4">
            <EvaluacionSensaciones onSubmit={handleNewCheckIn} />
          </div>
        </div>
      )}

      {/* Lista de check-ins */}
      <div className="grid gap-4">
        {filteredCheckins.map((checkin) => (
          <div
            key={checkin.id}
            className="bg-[#1E1E2E] border border-[#334155] rounded-[16px] p-6 hover:border-[#6366F1] transition-all duration-200 shadow-md"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-bold text-[#F1F5F9]">{checkin.clienteNombre}</h3>
                  <SemáforoSerie sensacion={checkin.sensacion} dolorLumbar={checkin.dolorLumbar} />
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-3">
                  <div>
                    <p className="text-sm text-[#94A3B8]">Ejercicio</p>
                    <p className="text-[#F1F5F9] font-medium">{checkin.ejercicio}</p>
                  </div>
                  <div>
                    <p className="text-sm text-[#94A3B8]">Serie</p>
                    <p className="text-[#F1F5F9] font-medium">Serie {checkin.serie}</p>
                  </div>
                  <div>
                    <p className="text-sm text-[#94A3B8]">RPE</p>
                    <RegistradorRPE value={checkin.rpe} readonly />
                  </div>
                  <div>
                    <p className="text-sm text-[#94A3B8]">Fecha</p>
                    <p className="text-[#F1F5F9] font-medium">{checkin.fecha}</p>
                  </div>
                </div>
                {checkin.notas && (
                  <div className="mt-3 p-3 bg-[#2A2A3A] rounded-[12px]">
                    <p className="text-sm text-[#F1F5F9]">{checkin.notas}</p>
                  </div>
                )}
                {checkin.dolorLumbar && (
                  <div className="mt-3 p-3 bg-[#FEE2E2] border border-[#EF4444] rounded-[12px]">
                    <p className="text-sm text-[#EF4444] font-medium">⚠️ Dolor lumbar reportado</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredCheckins.length === 0 && (
        <div className="text-center py-12">
          <p className="text-[#94A3B8]">No se encontraron check-ins</p>
        </div>
      )}
    </div>
  );
}

