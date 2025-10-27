import { useState, useEffect } from 'react';
import { Camera, Upload, X, Image as ImageIcon, Calendar } from 'lucide-react';
import { getFotosComida, uploadFotoComida } from '../api/fotos';

interface FotoComida {
  id: string;
  cliente_id: string;
  cliente_nombre: string;
  fecha: string;
  hora: string;
  tipo_comida: string;
  foto_url: string;
  descripcion?: string;
  created_at: string;
}

export default function FotosComida() {
  const [fotos, setFotos] = useState<FotoComida[]>([]);
  const [loading, setLoading] = useState(true);
  const [showUpload, setShowUpload] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    loadFotos();
  }, []);

  const loadFotos = async () => {
    setLoading(true);
    try {
      const data = await getFotosComida();
      setFotos(data);
    } catch (error) {
      console.error('Error al cargar fotos:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    // Lógica de subida de foto
    setShowUpload(false);
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
          <h2 className="text-2xl font-bold text-slate-900">Fotos de Comidas</h2>
          <p className="text-slate-600 mt-1">Registro visual de cada comida del día</p>
        </div>
        <button
          onClick={() => setShowUpload(true)}
          className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
        >
          <Upload className="w-5 h-5" />
          <span>Subir Foto</span>
        </button>
      </div>

      {/* Modal de subida */}
      {showUpload && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-slate-900">Subir Foto de Comida</h3>
              <button
                onClick={() => setShowUpload(false)}
                className="text-slate-500 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleUpload} className="space-y-4">
              <div className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center">
                <Camera className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                <p className="text-slate-600 mb-2">Arrastra una imagen o haz clic para seleccionar</p>
                <input type="file" accept="image/*" className="hidden" />
                <button
                  type="button"
                  className="text-green-600 hover:text-green-700 font-medium"
                >
                  Seleccionar archivo
                </button>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Descripción (opcional)
                </label>
                <textarea
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  rows={3}
                  placeholder="Describe la comida..."
                />
              </div>
              <div className="flex gap-3">
                <button
                  type="submit"
                  className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors"
                >
                  Subir Foto
                </button>
                <button
                  type="button"
                  onClick={() => setShowUpload(false)}
                  className="px-6 bg-slate-200 text-slate-700 py-2 rounded-lg hover:bg-slate-300 transition-colors"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Galería de fotos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {fotos.map((foto) => (
          <div
            key={foto.id}
            className="bg-white rounded-xl overflow-hidden shadow-sm border border-slate-200 hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => setSelectedImage(foto.foto_url)}
          >
            <div className="aspect-square bg-slate-200 relative">
              <img
                src={foto.foto_url || 'https://via.placeholder.com/400'}
                alt={foto.tipo_comida}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 right-3 bg-white px-3 py-1 rounded-full text-sm font-medium text-slate-700">
                {foto.tipo_comida}
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-slate-900 mb-1">{foto.cliente_nombre}</h3>
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <Calendar className="w-4 h-4" />
                <span>{foto.fecha} • {foto.hora}</span>
              </div>
              {foto.descripcion && (
                <p className="mt-2 text-sm text-slate-600">{foto.descripcion}</p>
              )}
            </div>
          </div>
        ))}

        {fotos.length === 0 && (
          <div className="col-span-full text-center py-12 bg-white rounded-xl border border-slate-200">
            <ImageIcon className="w-12 h-12 text-slate-400 mx-auto mb-4" />
            <p className="text-slate-600">No hay fotos registradas</p>
            <p className="text-sm text-slate-500 mt-1">Sube la primera foto de comida</p>
          </div>
        )}
      </div>

      {/* Modal de imagen */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/90 flex items-center justify-center z-50"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-4 right-4 text-white hover:text-slate-300"
            onClick={() => setSelectedImage(null)}
          >
            <X className="w-8 h-8" />
          </button>
          <img
            src={selectedImage}
            alt="Vista ampliada"
            className="max-w-4xl max-h-[90vh] object-contain"
          />
        </div>
      )}
    </div>
  );
}

