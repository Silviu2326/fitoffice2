import { useState, useEffect } from 'react';
import { Scale, TrendingUp, TrendingDown, Minus, Calendar } from 'lucide-react';
import { getPesoDiario, registrarPeso } from '../api/peso';

interface RegistroPeso {
  id: string;
  cliente_id: string;
  cliente_nombre: string;
  fecha: string;
  peso: number;
  diferencia?: number;
  created_at: string;
}

export default function SeguimientoPeso() {
  const [registros, setRegistros] = useState<RegistroPeso[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    cliente_nombre: '',
    peso: '',
  });

  useEffect(() => {
    loadPesos();
  }, []);

  const loadPesos = async () => {
    setLoading(true);
    try {
      const data = await getPesoDiario();
      setRegistros(data);
    } catch (error) {
      console.error('Error al cargar pesos:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await registrarPeso({
        ...formData,
        peso: parseFloat(formData.peso),
        fecha: new Date().toISOString().split('T')[0],
      });
      await loadPesos();
      setShowForm(false);
      setFormData({ cliente_nombre: '', peso: '' });
    } catch (error) {
      console.error('Error al registrar peso:', error);
    }
  };

  const calcularPromedio = () => {
    if (registros.length === 0) return 0;
    const suma = registros.reduce((acc, r) => acc + r.peso, 0);
    return (suma / registros.length).toFixed(1);
  };

  const calcularTendencia = () => {
    if (registros.length < 2) return 0;
    const primero = registros[registros.length - 1].peso;
    const ultimo = registros[0].peso;
    return (ultimo - primero).toFixed(1);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-green-500 border-t-transparent"></div>
      </div>
    );
  }

  const tendencia = parseFloat(calcularTendencia());

  return (
    <div className="space-y-6">
      {/* Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Peso Promedio</p>
              <p className="text-3xl font-bold text-slate-900 mt-1">{calcularPromedio()} kg</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <Scale className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Tendencia</p>
              <p className={`text-3xl font-bold mt-1 ${
                tendencia > 0 ? 'text-red-600' : tendencia < 0 ? 'text-green-600' : 'text-slate-900'
              }`}>
                {tendencia > 0 ? '+' : ''}{tendencia} kg
              </p>
            </div>
            <div className={`p-3 rounded-lg ${
              tendencia > 0 ? 'bg-red-100' : tendencia < 0 ? 'bg-green-100' : 'bg-slate-100'
            }`}>
              {tendencia > 0 ? (
                <TrendingUp className="w-6 h-6 text-red-600" />
              ) : tendencia < 0 ? (
                <TrendingDown className="w-6 h-6 text-green-600" />
              ) : (
                <Minus className="w-6 h-6 text-slate-600" />
              )}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Registros</p>
              <p className="text-3xl font-bold text-slate-900 mt-1">{registros.length}</p>
            </div>
            <div className="bg-purple-100 p-3 rounded-lg">
              <Calendar className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Formulario y lista */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Registro de Peso Diario</h2>
          <p className="text-slate-600 mt-1">Seguimiento del peso corporal</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
        >
          <Scale className="w-5 h-5" />
          <span>Registrar Peso</span>
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Nuevo Registro de Peso</h3>
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
                  Peso (kg)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={formData.peso}
                  onChange={(e) => setFormData({ ...formData, peso: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="75.5"
                  required
                />
              </div>
            </div>
            <div className="flex gap-3">
              <button
                type="submit"
                className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors"
              >
                Guardar Registro
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-6 bg-slate-200 text-slate-700 py-2 rounded-lg hover:bg-slate-300 transition-colors"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Timeline de registros */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Historial de Peso</h3>
        <div className="space-y-4">
          {registros.map((registro, index) => {
            const anterior = registros[index + 1];
            const diferencia = anterior ? registro.peso - anterior.peso : 0;
            
            return (
              <div key={registro.id} className="flex items-center gap-4 p-4 bg-slate-50 rounded-lg">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <Scale className="w-6 h-6 text-blue-600" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <h4 className="font-semibold text-slate-900">{registro.cliente_nombre}</h4>
                    <span className="text-sm text-slate-500">•</span>
                    <span className="text-sm text-slate-600">{registro.fecha}</span>
                  </div>
                  <div className="flex items-center gap-4 mt-1">
                    <p className="text-2xl font-bold text-slate-900">{registro.peso} kg</p>
                    {anterior && diferencia !== 0 && (
                      <span className={`flex items-center gap-1 text-sm font-medium ${
                        diferencia > 0 ? 'text-red-600' : 'text-green-600'
                      }`}>
                        {diferencia > 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                        {Math.abs(diferencia).toFixed(1)} kg
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}

          {registros.length === 0 && (
            <div className="text-center py-8">
              <Scale className="w-12 h-12 text-slate-400 mx-auto mb-4" />
              <p className="text-slate-600">No hay registros de peso</p>
              <p className="text-sm text-slate-500 mt-1">Registra el primer peso del día</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

