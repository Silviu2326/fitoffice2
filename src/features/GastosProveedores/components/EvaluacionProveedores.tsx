import { useState, useEffect } from 'react';
import { Star, ThumbsUp, MessageSquare, Calendar } from 'lucide-react';
import { 
  getProveedores, 
  getEvaluacionesProveedor,
  createEvaluacionProveedor,
  type Proveedor,
  type EvaluacionProveedor 
} from '../api/proveedores';

export default function EvaluacionProveedores() {
  const [proveedores, setProveedores] = useState<Proveedor[]>([]);
  const [proveedorSeleccionado, setProveedorSeleccionado] = useState<string>('');
  const [evaluaciones, setEvaluaciones] = useState<EvaluacionProveedor[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProveedores();
  }, []);

  useEffect(() => {
    if (proveedorSeleccionado) {
      loadEvaluaciones(proveedorSeleccionado);
    }
  }, [proveedorSeleccionado]);

  const loadProveedores = async () => {
    try {
      setLoading(true);
      const data = await getProveedores();
      setProveedores(data.filter(p => p.estado === 'activo'));
      if (data.length > 0) {
        setProveedorSeleccionado(data[0].id);
      }
    } catch (error) {
      console.error('Error al cargar proveedores:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadEvaluaciones = async (proveedorId: string) => {
    try {
      const data = await getEvaluacionesProveedor(proveedorId);
      setEvaluaciones(data);
    } catch (error) {
      console.error('Error al cargar evaluaciones:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const evaluacionData = {
      proveedor_id: proveedorSeleccionado,
      calidad: parseInt(formData.get('calidad') as string),
      puntualidad: parseInt(formData.get('puntualidad') as string),
      precio: parseInt(formData.get('precio') as string),
      servicio: parseInt(formData.get('servicio') as string),
      comentarios: formData.get('comentarios') as string || undefined,
      fecha: formData.get('fecha') as string,
    };

    try {
      await createEvaluacionProveedor(evaluacionData);
      await loadEvaluaciones(proveedorSeleccionado);
      await loadProveedores(); // Recargar para actualizar calificación
      setShowModal(false);
    } catch (error) {
      console.error('Error al crear evaluación:', error);
    }
  };

  const proveedorActual = proveedores.find(p => p.id === proveedorSeleccionado);
  const promedioCalidad = evaluaciones.length > 0
    ? evaluaciones.reduce((sum, e) => sum + e.calidad, 0) / evaluaciones.length
    : 0;
  const promedioPuntualidad = evaluaciones.length > 0
    ? evaluaciones.reduce((sum, e) => sum + e.puntualidad, 0) / evaluaciones.length
    : 0;
  const promedioPrecio = evaluaciones.length > 0
    ? evaluaciones.reduce((sum, e) => sum + e.precio, 0) / evaluaciones.length
    : 0;
  const promedioServicio = evaluaciones.length > 0
    ? evaluaciones.reduce((sum, e) => sum + e.servicio, 0) / evaluaciones.length
    : 0;

  const renderStars = (rating: number, size: 'sm' | 'lg' = 'sm') => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`${size === 'sm' ? 'w-4 h-4' : 'w-5 h-5'} ${
              star <= rating ? 'text-yellow-400 fill-current' : 'text-slate-600'
            }`}
          />
        ))}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-4 border-emerald-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Evaluación de Proveedores</h2>
          <p className="text-slate-400">Califica y gestiona el desempeño de tus proveedores</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          disabled={!proveedorSeleccionado}
          className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-700 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg transition-colors"
        >
          <Star className="w-5 h-5" />
          Nueva Evaluación
        </button>
      </div>

      {/* Selector de Proveedor */}
      <div className="bg-slate-800 rounded-lg border border-slate-700 p-4">
        <label className="block text-sm font-medium text-slate-300 mb-2">
          Seleccionar Proveedor
        </label>
        <select
          value={proveedorSeleccionado}
          onChange={(e) => setProveedorSeleccionado(e.target.value)}
          className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:border-emerald-500 focus:outline-none"
        >
          {proveedores.map(prov => (
            <option key={prov.id} value={prov.id}>{prov.nombre}</option>
          ))}
        </select>
      </div>

      {proveedorActual && (
        <>
          {/* Resumen del Proveedor */}
          <div className="bg-gradient-to-r from-emerald-900/20 to-blue-900/20 border border-emerald-700/30 rounded-lg p-6">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">{proveedorActual.nombre}</h3>
                {proveedorActual.razon_social && (
                  <p className="text-slate-400 text-sm mb-1">{proveedorActual.razon_social}</p>
                )}
                <div className="flex items-center gap-2 mt-3">
                  <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${
                    proveedorActual.tipo === 'producto' ? 'bg-purple-500/10 text-purple-400' :
                    proveedorActual.tipo === 'servicio' ? 'bg-blue-500/10 text-blue-400' :
                    'bg-orange-500/10 text-orange-400'
                  }`}>
                    {proveedorActual.tipo}
                  </span>
                  <span className="text-slate-400 text-sm">
                    {evaluaciones.length} evaluación(es)
                  </span>
                </div>
              </div>
              {proveedorActual.calificacion && (
                <div className="text-right">
                  <div className="text-4xl font-bold text-white mb-1">
                    {proveedorActual.calificacion.toFixed(1)}
                  </div>
                  {renderStars(Math.round(proveedorActual.calificacion), 'lg')}
                  <p className="text-slate-400 text-sm mt-1">Calificación general</p>
                </div>
              )}
            </div>
          </div>

          {/* Métricas Detalladas */}
          {evaluaciones.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-slate-800 p-5 rounded-lg border border-slate-700">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-slate-400 text-sm">Calidad</span>
                  <ThumbsUp className="w-4 h-4 text-blue-400" />
                </div>
                <div className="text-2xl font-bold text-white mb-2">
                  {promedioCalidad.toFixed(1)}
                </div>
                {renderStars(Math.round(promedioCalidad))}
              </div>

              <div className="bg-slate-800 p-5 rounded-lg border border-slate-700">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-slate-400 text-sm">Puntualidad</span>
                  <Calendar className="w-4 h-4 text-green-400" />
                </div>
                <div className="text-2xl font-bold text-white mb-2">
                  {promedioPuntualidad.toFixed(1)}
                </div>
                {renderStars(Math.round(promedioPuntualidad))}
              </div>

              <div className="bg-slate-800 p-5 rounded-lg border border-slate-700">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-slate-400 text-sm">Precio</span>
                  <span className="text-purple-400">💰</span>
                </div>
                <div className="text-2xl font-bold text-white mb-2">
                  {promedioPrecio.toFixed(1)}
                </div>
                {renderStars(Math.round(promedioPrecio))}
              </div>

              <div className="bg-slate-800 p-5 rounded-lg border border-slate-700">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-slate-400 text-sm">Servicio</span>
                  <MessageSquare className="w-4 h-4 text-yellow-400" />
                </div>
                <div className="text-2xl font-bold text-white mb-2">
                  {promedioServicio.toFixed(1)}
                </div>
                {renderStars(Math.round(promedioServicio))}
              </div>
            </div>
          )}

          {/* Historial de Evaluaciones */}
          <div className="bg-slate-800 rounded-lg border border-slate-700 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Historial de Evaluaciones</h3>
            {evaluaciones.length === 0 ? (
              <p className="text-slate-400 text-center py-8">
                No hay evaluaciones para este proveedor
              </p>
            ) : (
              <div className="space-y-4">
                {evaluaciones.map((evaluacion) => (
                  <div 
                    key={evaluacion.id} 
                    className="bg-slate-900 rounded-lg p-5 hover:bg-slate-700/50 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-slate-400" />
                        <span className="text-slate-400 text-sm">
                          {new Date(evaluacion.fecha).toLocaleDateString('es-ES', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric'
                          })}
                        </span>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-white">
                          {((evaluacion.calidad + evaluacion.puntualidad + evaluacion.precio + evaluacion.servicio) / 4).toFixed(1)}
                        </div>
                        {renderStars(Math.round((evaluacion.calidad + evaluacion.puntualidad + evaluacion.precio + evaluacion.servicio) / 4))}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                      <div>
                        <p className="text-xs text-slate-500 mb-1">Calidad</p>
                        {renderStars(evaluacion.calidad)}
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 mb-1">Puntualidad</p>
                        {renderStars(evaluacion.puntualidad)}
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 mb-1">Precio</p>
                        {renderStars(evaluacion.precio)}
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 mb-1">Servicio</p>
                        {renderStars(evaluacion.servicio)}
                      </div>
                    </div>

                    {evaluacion.comentarios && (
                      <div className="mt-3 pt-3 border-t border-slate-800">
                        <p className="text-sm text-slate-300">{evaluacion.comentarios}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}

      {/* Modal Nueva Evaluación */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-slate-700">
              <h3 className="text-xl font-bold text-white">
                Nueva Evaluación - {proveedorActual?.nombre}
              </h3>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Fecha de la Evaluación *
                </label>
                <input
                  type="date"
                  name="fecha"
                  required
                  defaultValue={new Date().toISOString().split('T')[0]}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Calidad del Producto/Servicio * (1-5)
                  </label>
                  <input
                    type="range"
                    name="calidad"
                    min="1"
                    max="5"
                    defaultValue="3"
                    className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                    onInput={(e) => {
                      const value = (e.target as HTMLInputElement).value;
                      const display = e.target.parentElement?.querySelector('.value-display');
                      if (display) display.textContent = value;
                    }}
                  />
                  <div className="flex justify-between text-sm mt-1">
                    <span className="text-slate-500">Muy mala</span>
                    <span className="text-white font-medium value-display">3</span>
                    <span className="text-slate-500">Excelente</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Puntualidad en Entregas * (1-5)
                  </label>
                  <input
                    type="range"
                    name="puntualidad"
                    min="1"
                    max="5"
                    defaultValue="3"
                    className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                    onInput={(e) => {
                      const value = (e.target as HTMLInputElement).value;
                      const display = e.target.parentElement?.querySelector('.value-display');
                      if (display) display.textContent = value;
                    }}
                  />
                  <div className="flex justify-between text-sm mt-1">
                    <span className="text-slate-500">Muy tarde</span>
                    <span className="text-white font-medium value-display">3</span>
                    <span className="text-slate-500">Siempre a tiempo</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Relación Calidad-Precio * (1-5)
                  </label>
                  <input
                    type="range"
                    name="precio"
                    min="1"
                    max="5"
                    defaultValue="3"
                    className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                    onInput={(e) => {
                      const value = (e.target as HTMLInputElement).value;
                      const display = e.target.parentElement?.querySelector('.value-display');
                      if (display) display.textContent = value;
                    }}
                  />
                  <div className="flex justify-between text-sm mt-1">
                    <span className="text-slate-500">Muy caro</span>
                    <span className="text-white font-medium value-display">3</span>
                    <span className="text-slate-500">Excelente precio</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Atención y Servicio * (1-5)
                  </label>
                  <input
                    type="range"
                    name="servicio"
                    min="1"
                    max="5"
                    defaultValue="3"
                    className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                    onInput={(e) => {
                      const value = (e.target as HTMLInputElement).value;
                      const display = e.target.parentElement?.querySelector('.value-display');
                      if (display) display.textContent = value;
                    }}
                  />
                  <div className="flex justify-between text-sm mt-1">
                    <span className="text-slate-500">Muy malo</span>
                    <span className="text-white font-medium value-display">3</span>
                    <span className="text-slate-500">Excelente</span>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Comentarios
                </label>
                <textarea
                  name="comentarios"
                  rows={4}
                  placeholder="Describe tu experiencia con este proveedor..."
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors"
                >
                  Guardar Evaluación
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

