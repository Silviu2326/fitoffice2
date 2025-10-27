import { useState, useEffect } from 'react';
import { TrendingUp, Calendar, CheckCircle, XCircle, Image, FileText } from 'lucide-react';
import { 
  getProgresoByParticipante, 
  registrarProgreso, 
  getResumenProgresoParticipante,
  type RegistroProgreso 
} from '../api/progreso';

interface SeguimientoProgresoProps {
  participanteId: string;
  nombreParticipante: string;
}

export default function SeguimientoProgreso({ participanteId, nombreParticipante }: SeguimientoProgresoProps) {
  const [registros, setRegistros] = useState<RegistroProgreso[]>([]);
  const [resumen, setResumen] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [nuevoRegistro, setNuevoRegistro] = useState({
    dia_numero: 1,
    completado: true,
    actividad_realizada: '',
    notas: '',
    puntos_ganados: 10,
  });

  useEffect(() => {
    cargarProgreso();
  }, [participanteId]);

  const cargarProgreso = async () => {
    setLoading(true);
    const [{ data: registrosData }, { data: resumenData }] = await Promise.all([
      getProgresoByParticipante(participanteId),
      getResumenProgresoParticipante(participanteId),
    ]);
    if (registrosData) setRegistros(registrosData);
    if (resumenData) setResumen(resumenData);
    setLoading(false);
  };

  const handleRegistrar = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await registrarProgreso({
      participante_id: participanteId,
      reto_id: registros[0]?.reto_id || '', // Asume que todos los registros pertenecen al mismo reto
      ...nuevoRegistro,
    });

    if (error) {
      alert('Error al registrar progreso');
      return;
    }

    setNuevoRegistro({
      dia_numero: nuevoRegistro.dia_numero + 1,
      completado: true,
      actividad_realizada: '',
      notas: '',
      puntos_ganados: 10,
    });
    cargarProgreso();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#6366F1] border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header con resumen */}
      <div className="bg-gradient-to-br from-[#D1FAE5] to-[#A7F3D0] rounded-2xl p-6 border border-[#E2E8F0]">
        <h3 className="text-xl font-bold text-[#0F172A] mb-4">
          Progreso de: {nombreParticipante}
        </h3>
        {resumen && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-xl p-4 shadow-md">
              <div className="text-sm text-[#64748B] mb-1 font-semibold">Días Completados</div>
              <div className="text-2xl font-bold text-[#10B981]">{resumen.diasCompletados}</div>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-md">
              <div className="text-sm text-[#64748B] mb-1 font-semibold">Racha Actual</div>
              <div className="text-2xl font-bold text-[#F59E0B]">{resumen.racha} 🔥</div>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-md">
              <div className="text-sm text-[#64748B] mb-1 font-semibold">Puntos Totales</div>
              <div className="text-2xl font-bold text-[#6366F1]">{resumen.puntosTotal} 🏆</div>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-md">
              <div className="text-sm text-[#64748B] mb-1 font-semibold">Último Día</div>
              <div className="text-2xl font-bold text-[#3B82F6]">#{resumen.ultimoDiaCompletado}</div>
            </div>
          </div>
        )}
      </div>

      {/* Formulario de nuevo registro */}
      <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-md">
        <h4 className="font-bold text-[#0F172A] mb-4">Registrar Progreso del Día</h4>
        <form onSubmit={handleRegistrar} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Día Número *
              </label>
              <input
                type="number"
                required
                min="1"
                value={nuevoRegistro.dia_numero}
                onChange={(e) => setNuevoRegistro({ ...nuevoRegistro, dia_numero: parseInt(e.target.value) })}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Estado *
              </label>
              <select
                value={nuevoRegistro.completado ? 'completado' : 'pendiente'}
                onChange={(e) => setNuevoRegistro({ ...nuevoRegistro, completado: e.target.value === 'completado' })}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              >
                <option value="completado">✅ Completado</option>
                <option value="pendiente">❌ No Completado</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Actividad Realizada
            </label>
            <input
              type="text"
              value={nuevoRegistro.actividad_realizada}
              onChange={(e) => setNuevoRegistro({ ...nuevoRegistro, actividad_realizada: e.target.value })}
              placeholder="Ej: Entrenamiento de fuerza 45 min"
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Notas
            </label>
            <textarea
              value={nuevoRegistro.notas}
              onChange={(e) => setNuevoRegistro({ ...nuevoRegistro, notas: e.target.value })}
              placeholder="Observaciones del día"
              rows={3}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Puntos Ganados *
            </label>
            <input
              type="number"
              required
              min="0"
              value={nuevoRegistro.puntos_ganados}
              onChange={(e) => setNuevoRegistro({ ...nuevoRegistro, puntos_ganados: parseInt(e.target.value) })}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            />
          </div>
          <button
            type="submit"
            className="w-full px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
          >
            Registrar Progreso
          </button>
        </form>
      </div>

      {/* Historial de registros */}
      <div>
        <h4 className="font-bold text-slate-900 mb-4">Historial de Progreso</h4>
        {registros.length === 0 ? (
          <div className="text-center py-12 bg-slate-50 rounded-lg">
            <TrendingUp className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <p className="text-slate-600">No hay registros de progreso aún</p>
          </div>
        ) : (
          <div className="space-y-3">
            {registros.map((registro) => (
              <div
                key={registro.id}
                className={`border-2 rounded-lg p-4 ${
                  registro.completado
                    ? 'border-emerald-200 bg-emerald-50'
                    : 'border-red-200 bg-red-50'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {registro.completado ? (
                      <CheckCircle className="w-6 h-6 text-emerald-600" />
                    ) : (
                      <XCircle className="w-6 h-6 text-red-600" />
                    )}
                    <div>
                      <span className="font-bold text-slate-900">Día {registro.dia_numero}</span>
                      <div className="text-xs text-slate-600 flex items-center gap-1 mt-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(registro.fecha).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  <span className="font-bold text-purple-600">+{registro.puntos_ganados} pts</span>
                </div>
                {registro.actividad_realizada && (
                  <div className="text-sm text-slate-700 mb-2">
                    <strong>Actividad:</strong> {registro.actividad_realizada}
                  </div>
                )}
                {registro.notas && (
                  <div className="text-sm text-slate-600 bg-white/50 rounded p-2 flex items-start gap-2">
                    <FileText className="w-4 h-4 mt-0.5" />
                    {registro.notas}
                  </div>
                )}
                {registro.evidencia_url && (
                  <div className="mt-2">
                    <a
                      href={registro.evidencia_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-sm text-emerald-600 hover:text-emerald-700"
                    >
                      <Image className="w-4 h-4" />
                      Ver evidencia
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

