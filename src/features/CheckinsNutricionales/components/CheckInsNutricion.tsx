import { useState, useEffect } from 'react';
import { Plus, Calendar, CheckCircle, Clock, Apple } from 'lucide-react';
import { getCheckins, createCheckin } from '../api/checkins';

interface Checkin {
  id: string;
  cliente_id: string;
  cliente_nombre: string;
  fecha: string;
  hora: string;
  tipo_comida: 'desayuno' | 'almuerzo' | 'comida' | 'merienda' | 'cena';
  hambre_antes: number;
  saciedad_despues: number;
  peso: number;
  foto_url?: string;
  notas?: string;
  completado: boolean;
  created_at: string;
}

export default function CheckInsNutricion() {
  const [checkins, setCheckins] = useState<Checkin[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    cliente_id: '',
    cliente_nombre: '',
    tipo_comida: 'desayuno' as const,
    hambre_antes: 5,
    saciedad_despues: 5,
    peso: 0,
    notas: '',
  });

  useEffect(() => {
    loadCheckins();
  }, []);

  const loadCheckins = async () => {
    setLoading(true);
    try {
      const data = await getCheckins();
      setCheckins(data);
    } catch (error) {
      console.error('Error al cargar check-ins:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const now = new Date();
      const newCheckin = {
        ...formData,
        fecha: now.toISOString().split('T')[0],
        hora: now.toTimeString().split(' ')[0],
        completado: true,
      };
      await createCheckin(newCheckin);
      await loadCheckins();
      setShowForm(false);
      setFormData({
        cliente_id: '',
        cliente_nombre: '',
        tipo_comida: 'desayuno',
        hambre_antes: 5,
        saciedad_despues: 5,
        peso: 0,
        notas: '',
      });
    } catch (error) {
      console.error('Error al crear check-in:', error);
    }
  };

  const tiposComida = [
    { value: 'desayuno', label: '🌅 Desayuno', color: 'bg-amber-500' },
    { value: 'almuerzo', label: '☕ Almuerzo', color: 'bg-orange-500' },
    { value: 'comida', label: '🍽️ Comida', color: 'bg-red-500' },
    { value: 'merienda', label: '🍪 Merienda', color: 'bg-pink-500' },
    { value: 'cena', label: '🌙 Cena', color: 'bg-purple-500' },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-green-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header con estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Check-ins Hoy</p>
              <p className="text-3xl font-bold text-slate-900 mt-1">
                {checkins.filter(c => c.fecha === new Date().toISOString().split('T')[0]).length}
              </p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Total Semana</p>
              <p className="text-3xl font-bold text-slate-900 mt-1">{checkins.length}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <Calendar className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Pendientes</p>
              <p className="text-3xl font-bold text-slate-900 mt-1">
                {checkins.filter(c => !c.completado).length}
              </p>
            </div>
            <div className="bg-amber-100 p-3 rounded-lg">
              <Clock className="w-6 h-6 text-amber-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Clientes Activos</p>
              <p className="text-3xl font-bold text-slate-900 mt-1">
                {new Set(checkins.map(c => c.cliente_id)).size}
              </p>
            </div>
            <div className="bg-purple-100 p-3 rounded-lg">
              <Apple className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Botón de nuevo check-in */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-900">Check-ins Recientes</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span>Nuevo Check-in</span>
        </button>
      </div>

      {/* Formulario */}
      {showForm && (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Nuevo Check-in Nutricional</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Cliente
                </label>
                <input
                  type="text"
                  value={formData.cliente_nombre}
                  onChange={(e) => setFormData({ ...formData, cliente_nombre: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Nombre del cliente"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Tipo de Comida
                </label>
                <select
                  value={formData.tipo_comida}
                  onChange={(e) => setFormData({ ...formData, tipo_comida: e.target.value as any })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  {tiposComida.map(tipo => (
                    <option key={tipo.value} value={tipo.value}>{tipo.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Hambre Antes (1-10)
                </label>
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={formData.hambre_antes}
                  onChange={(e) => setFormData({ ...formData, hambre_antes: parseInt(e.target.value) })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Saciedad Después (1-10)
                </label>
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={formData.saciedad_despues}
                  onChange={(e) => setFormData({ ...formData, saciedad_despues: parseInt(e.target.value) })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Peso (kg)
                </label>
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  value={formData.peso}
                  onChange={(e) => setFormData({ ...formData, peso: parseFloat(e.target.value) })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="0.0"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Notas
                </label>
                <textarea
                  value={formData.notas}
                  onChange={(e) => setFormData({ ...formData, notas: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  rows={3}
                  placeholder="Observaciones adicionales..."
                />
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-4 py-2 text-slate-600 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Guardar Check-in
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Lista de check-ins */}
      <div className="space-y-4">
        {checkins.length === 0 ? (
          <div className="text-center py-12">
            <Apple className="w-12 h-12 text-slate-400 mx-auto mb-4" />
            <p className="text-slate-600">No hay check-ins registrados</p>
          </div>
        ) : (
          checkins.map((checkin) => (
            <div key={checkin.id} className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`px-3 py-1 rounded-full text-sm font-medium ${tiposComida.find(t => t.value === checkin.tipo_comida)?.color} text-white`}>
                      {tiposComida.find(t => t.value === checkin.tipo_comida)?.label}
                    </div>
                    <span className="text-sm text-slate-600">{checkin.cliente_nombre}</span>
                    <span className="text-sm text-slate-500">{checkin.fecha} - {checkin.hora}</span>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="text-slate-600">Hambre antes:</span>
                      <span className="ml-2 font-medium">{checkin.hambre_antes}/10</span>
                    </div>
                    <div>
                      <span className="text-slate-600">Saciedad después:</span>
                      <span className="ml-2 font-medium">{checkin.saciedad_despues}/10</span>
                    </div>
                    <div>
                      <span className="text-slate-600">Peso:</span>
                      <span className="ml-2 font-medium">{checkin.peso} kg</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {checkin.completado ? (
                        <CheckCircle className="w-4 h-4 text-green-600" />
                      ) : (
                        <Clock className="w-4 h-4 text-amber-600" />
                      )}
                      <span className={checkin.completado ? "text-green-600" : "text-amber-600"}>
                        {checkin.completado ? "Completado" : "Pendiente"}
                      </span>
                    </div>
                  </div>
                  
                  {checkin.notas && (
                    <div className="mt-3 p-3 bg-slate-50 rounded-lg">
                      <p className="text-sm text-slate-700">{checkin.notas}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}