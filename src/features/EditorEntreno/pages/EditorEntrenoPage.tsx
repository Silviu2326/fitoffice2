import { useState } from 'react';
import { Edit3, Save, Plus, Users, Calendar, Target } from 'lucide-react';
import EditorEntreno from '../components/EditorEntreno';
import ConstructorSesion from '../components/ConstructorSesion';
import AsignadorDestinatario from '../components/AsignadorDestinatario';

export default function EditorEntrenoPage() {
  const [sesionActual, setSesionActual] = useState<any>(null);
  const [modoAsignacion, setModoAsignacion] = useState<'individual' | 'grupal'>('individual');
  const [showAsignador, setShowAsignador] = useState(false);

  const handleGuardarSesion = () => {
    // TODO: Integrar con API real
    console.log('Guardando sesión:', sesionActual);
    alert('Sesión guardada exitosamente');
  };

  const handleAsignarSesion = () => {
    setShowAsignador(true);
  };

  return (
    <div className="flex-1 overflow-auto bg-[#F8FAFC]">
      {/* Header */}
      <div className="bg-white border-b border-[#E2E8F0] sticky top-0 z-10 shadow-sm">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="bg-[#6366F1] p-3 rounded-xl shadow-md">
                <Edit3 className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-[#0F172A]">Editor de Entreno</h1>
                <p className="text-[#64748B] mt-1 text-base">
                  Editor universal de entrenamiento para crear, ajustar y gestionar sesiones
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <button 
                onClick={handleAsignarSesion}
                className="bg-white text-[#0F172A] border border-[#E2E8F0] px-6 py-3 rounded-xl font-semibold hover:bg-[#F8FAFC] hover:border-[#6366F1] transition-all duration-200 flex items-center gap-2 shadow-sm"
              >
                {modoAsignacion === 'individual' ? (
                  <>
                    <Users className="w-5 h-5" />
                    Asignar a Cliente
                  </>
                ) : (
                  <>
                    <Target className="w-5 h-5" />
                    Asignar a Grupo
                  </>
                )}
              </button>
              <button 
                onClick={handleGuardarSesion}
                className="bg-[#6366F1] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#4F46E5] transition-all duration-200 flex items-center gap-2 shadow-md hover:shadow-lg"
              >
                <Save className="w-5 h-5" />
                Guardar Sesión
              </button>
            </div>
          </div>

          {/* Modo de asignación */}
          <div className="flex gap-4">
            <button
              onClick={() => setModoAsignacion('individual')}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center gap-2 ${
                modoAsignacion === 'individual'
                  ? 'bg-[#6366F1] text-white shadow-md'
                  : 'bg-white text-[#64748B] border border-[#E2E8F0] hover:bg-[#F8FAFC]'
              }`}
            >
              <Users className="w-5 h-5" />
              Asignación Individual
            </button>
            <button
              onClick={() => setModoAsignacion('grupal')}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center gap-2 ${
                modoAsignacion === 'grupal'
                  ? 'bg-[#6366F1] text-white shadow-md'
                  : 'bg-white text-[#64748B] border border-[#E2E8F0] hover:bg-[#F8FAFC]'
              }`}
            >
              <Target className="w-5 h-5" />
              Asignación Grupal
            </button>
          </div>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="p-6">
        <div className="grid grid-cols-1 gap-6">
          {/* Editor principal */}
          <EditorEntreno 
            sesion={sesionActual}
            onSesionChange={setSesionActual}
            modoAsignacion={modoAsignacion}
          />

          {/* Constructor de sesión */}
          <ConstructorSesion 
            sesion={sesionActual}
            onSesionChange={setSesionActual}
          />
        </div>
      </div>

      {/* Modal de asignación */}
      {showAsignador && (
        <AsignadorDestinatario
          modoAsignacion={modoAsignacion}
          sesion={sesionActual}
          onClose={() => setShowAsignador(false)}
          onAsignar={(destinatarios) => {
            console.log('Asignando a:', destinatarios);
            setShowAsignador(false);
            alert('Sesión asignada exitosamente');
          }}
        />
      )}
    </div>
  );
}

