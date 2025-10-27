import { useState, useEffect } from 'react';
import { Calendar, Filter, Download, Search } from 'lucide-react';
import { getCheckins } from '../api/checkins';

interface HistorialItem {
  id: string;
  fecha: string;
  hora: string;
  cliente_nombre: string;
  tipo_comida: string;
  hambre_antes: number;
  saciedad_despues: number;
  peso: number;
  foto_url?: string;
  notas?: string;
}

export default function HistorialNutricional() {
  const [historial, setHistorial] = useState<HistorialItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [filtroCliente, setFiltroCliente] = useState('');
  const [filtroFecha, setFiltroFecha] = useState('');

  useEffect(() => {
    loadHistorial();
  }, []);

  const loadHistorial = async () => {
    setLoading(true);
    try {
      const data = await getCheckins();
      setHistorial(data);
    } catch (error) {
      console.error('Error al cargar historial:', error);
    } finally {
      setLoading(false);
    }
  };

  const historialFiltrado = historial.filter(item => {
    const matchCliente = filtroCliente === '' || 
      item.cliente_nombre.toLowerCase().includes(filtroCliente.toLowerCase());
    const matchFecha = filtroFecha === '' || item.fecha === filtroFecha;
    return matchCliente && matchFecha;
  });

  const exportarHistorial = () => {
    // Lógica de exportación
    console.log('Exportando historial...');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-green-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Historial Nutricional</h2>
          <p className="text-slate-600 mt-1">Registro completo de todos los check-ins</p>
        </div>
        <button
          onClick={exportarHistorial}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Download className="w-5 h-5" />
          <span>Exportar</span>
        </button>
      </div>

      {/* Filtros */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
        <div className="flex items-center gap-3 mb-4">
          <Filter className="w-5 h-5 text-slate-600" />
          <h3 className="text-lg font-semibold text-slate-900">Filtros</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Buscar Cliente
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                value={filtroCliente}
                onChange={(e) => setFiltroCliente(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Nombre del cliente..."
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Fecha
            </label>
            <input
              type="date"
              value={filtroFecha}
              onChange={(e) => setFiltroFecha(e.target.value)}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
          <div className="flex items-end">
            <button
              onClick={() => {
                setFiltroCliente('');
                setFiltroFecha('');
              }}
              className="w-full bg-slate-200 text-slate-700 px-4 py-2 rounded-lg hover:bg-slate-300 transition-colors"
            >
              Limpiar Filtros
            </button>
          </div>
        </div>
      </div>

      {/* Tabla de historial */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Fecha & Hora</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Cliente</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Comida</th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-slate-900">Hambre</th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-slate-900">Saciedad</th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-slate-900">Peso (kg)</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Notas</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {historialFiltrado.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="w-4 h-4 text-slate-400" />
                      <div>
                        <div className="font-medium text-slate-900">{item.fecha}</div>
                        <div className="text-slate-500">{item.hora}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-medium text-slate-900">{item.cliente_nombre}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {item.tipo_comida}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="font-semibold text-slate-900">{item.hambre_antes}/10</span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="font-semibold text-slate-900">{item.saciedad_despues}/10</span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="font-semibold text-slate-900">{item.peso}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-slate-600">
                      {item.notas ? (
                        item.notas.length > 50 ? `${item.notas.substring(0, 50)}...` : item.notas
                      ) : (
                        <span className="text-slate-400 italic">Sin notas</span>
                      )}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {historialFiltrado.length === 0 && (
            <div className="text-center py-12">
              <Calendar className="w-12 h-12 text-slate-400 mx-auto mb-4" />
              <p className="text-slate-600">No hay registros en el historial</p>
              <p className="text-sm text-slate-500 mt-1">
                {filtroCliente || filtroFecha 
                  ? 'Intenta ajustar los filtros' 
                  : 'Los check-ins aparecerán aquí'}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Resumen */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">📊 Resumen del Historial</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <p className="text-sm text-slate-600">Total Registros</p>
            <p className="text-2xl font-bold text-slate-900">{historialFiltrado.length}</p>
          </div>
          <div>
            <p className="text-sm text-slate-600">Clientes Únicos</p>
            <p className="text-2xl font-bold text-slate-900">
              {new Set(historialFiltrado.map(h => h.cliente_nombre)).size}
            </p>
          </div>
          <div>
            <p className="text-sm text-slate-600">Hambre Promedio</p>
            <p className="text-2xl font-bold text-slate-900">
              {historialFiltrado.length > 0 
                ? (historialFiltrado.reduce((acc, h) => acc + h.hambre_antes, 0) / historialFiltrado.length).toFixed(1)
                : '0'}/10
            </p>
          </div>
          <div>
            <p className="text-sm text-slate-600">Saciedad Promedio</p>
            <p className="text-2xl font-bold text-slate-900">
              {historialFiltrado.length > 0 
                ? (historialFiltrado.reduce((acc, h) => acc + h.saciedad_despues, 0) / historialFiltrado.length).toFixed(1)
                : '0'}/10
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

