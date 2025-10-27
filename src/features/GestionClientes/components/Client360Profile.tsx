import { useState } from 'react';
import { User, Mail, Phone, Calendar, FileText, Activity, TrendingUp, DollarSign, MessageSquare, FileCheck, AlertCircle } from 'lucide-react';

interface Cliente360 {
  id: string;
  nombre: string;
  email: string;
  telefono: string;
  fechaNacimiento: string;
  direccion: string;
  estado: 'activo' | 'riesgo' | 'perdido';
  planActual: string;
  fechaInicio: string;
  ultimaActividad: string;
  adherencia: number;
  sesionesTotales: number;
  objetivos: string[];
  historialPlanes: Array<{
    plan: string;
    inicio: string;
    fin: string;
    motivo: string;
  }>;
  documentos: Array<{
    tipo: string;
    nombre: string;
    fecha: string;
    estado: string;
  }>;
  facturacion: {
    totalPagado: number;
    ultimoPago: string;
    metodoPago: string;
  };
  notas: Array<{
    fecha: string;
    autor: string;
    contenido: string;
  }>;
}

export default function Client360Profile() {
  const [clienteSeleccionado] = useState<Cliente360>({
    id: '1',
    nombre: 'Carlos Pérez Rodríguez',
    email: 'carlos@email.com',
    telefono: '+34 666 111 222',
    fechaNacimiento: '1985-05-15',
    direccion: 'Calle Mayor 123, 28013 Madrid',
    estado: 'activo',
    planActual: 'Plan Premium - 5 sesiones/semana',
    fechaInicio: '2025-01-15',
    ultimaActividad: '2025-10-25',
    adherencia: 95,
    sesionesTotales: 180,
    objetivos: ['Perder 10kg', 'Ganar masa muscular', 'Mejorar resistencia cardiovascular'],
    historialPlanes: [
      { plan: 'Plan Premium - 5 sesiones/semana', inicio: '2025-01-15', fin: 'Activo', motivo: 'Plan actual' },
      { plan: 'Plan Estándar - 3 sesiones/semana', inicio: '2024-10-01', fin: '2025-01-14', motivo: 'Upgrade por progreso' }
    ],
    documentos: [
      { tipo: 'Consentimiento RGPD', nombre: 'rgpd_consent.pdf', fecha: '2024-10-01', estado: 'Firmado' },
      { tipo: 'Cuestionario PAR-Q', nombre: 'parq_carlos.pdf', fecha: '2024-10-01', estado: 'Completado' },
      { tipo: 'Análisis Médico', nombre: 'medical_carlos.pdf', fecha: '2025-01-10', estado: 'Actualizado' }
    ],
    facturacion: {
      totalPagado: 2450.00,
      ultimoPago: '2025-10-01',
      metodoPago: 'Tarjeta de Crédito'
    },
    notas: [
      { fecha: '2025-10-20', autor: 'Entrenador Principal', contenido: 'Cliente muy motivado. Ha logrado perder 7kg en 9 meses. Excelente adherencia.' },
      { fecha: '2025-09-15', autor: 'Nutricionista', contenido: 'Cumpliendo al 100% con el plan nutricional. Muy comprometido con sus objetivos.' }
    ]
  });

  return (
    <div className="space-y-6">
      {/* Header del perfil */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-4">
            <div className="bg-gradient-to-br from-emerald-500 to-teal-600 p-4 rounded-xl">
              <User className="w-12 h-12 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900">{clienteSeleccionado.nombre}</h2>
              <p className="text-slate-600 mt-1">Perfil 360º - Vista Completa del Cliente</p>
              <div className="flex items-center gap-3 mt-3">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  clienteSeleccionado.estado === 'activo' ? 'bg-emerald-100 text-emerald-800' : 
                  clienteSeleccionado.estado === 'riesgo' ? 'bg-amber-100 text-amber-800' : 
                  'bg-red-100 text-red-800'
                }`}>
                  {clienteSeleccionado.estado.toUpperCase()}
                </span>
                <span className="text-sm text-slate-600">{clienteSeleccionado.planActual}</span>
              </div>
            </div>
          </div>
          <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors">
            Editar Perfil
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Columna izquierda - Información personal */}
        <div className="lg:col-span-1 space-y-6">
          {/* Información de contacto */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Información de Contacto</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-slate-400 mt-0.5" />
                <div>
                  <p className="text-xs text-slate-500">Email</p>
                  <p className="text-sm text-slate-900">{clienteSeleccionado.email}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-slate-400 mt-0.5" />
                <div>
                  <p className="text-xs text-slate-500">Teléfono</p>
                  <p className="text-sm text-slate-900">{clienteSeleccionado.telefono}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-slate-400 mt-0.5" />
                <div>
                  <p className="text-xs text-slate-500">Fecha de Nacimiento</p>
                  <p className="text-sm text-slate-900">
                    {new Date(clienteSeleccionado.fechaNacimiento).toLocaleDateString('es-ES')}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <FileText className="w-5 h-5 text-slate-400 mt-0.5" />
                <div>
                  <p className="text-xs text-slate-500">Dirección</p>
                  <p className="text-sm text-slate-900">{clienteSeleccionado.direccion}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Estadísticas clave */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Estadísticas</h3>
            <div className="space-y-4">
              <div className="bg-emerald-50 p-3 rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Activity className="w-5 h-5 text-emerald-600" />
                    <span className="text-sm text-slate-600">Adherencia</span>
                  </div>
                  <span className="text-lg font-bold text-emerald-600">{clienteSeleccionado.adherencia}%</span>
                </div>
              </div>
              <div className="bg-blue-50 p-3 rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-blue-600" />
                    <span className="text-sm text-slate-600">Sesiones Totales</span>
                  </div>
                  <span className="text-lg font-bold text-blue-600">{clienteSeleccionado.sesionesTotales}</span>
                </div>
              </div>
              <div className="bg-purple-50 p-3 rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-purple-600" />
                    <span className="text-sm text-slate-600">Total Pagado</span>
                  </div>
                  <span className="text-lg font-bold text-purple-600">€{clienteSeleccionado.facturacion.totalPagado}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Objetivos */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Objetivos</h3>
            <div className="space-y-2">
              {clienteSeleccionado.objetivos.map((objetivo, index) => (
                <div key={index} className="flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-emerald-600 mt-0.5" />
                  <span className="text-sm text-slate-700">{objetivo}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Columna derecha - Historial y documentos */}
        <div className="lg:col-span-2 space-y-6">
          {/* Historial de planes */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Historial de Planes</h3>
            <div className="space-y-3">
              {clienteSeleccionado.historialPlanes.map((plan, index) => (
                <div key={index} className="flex items-start gap-4 p-4 bg-slate-50 rounded-lg">
                  <Calendar className="w-5 h-5 text-slate-400 mt-1" />
                  <div className="flex-1">
                    <h4 className="font-semibold text-slate-900">{plan.plan}</h4>
                    <div className="flex items-center gap-4 mt-2 text-sm text-slate-600">
                      <span>Inicio: {new Date(plan.inicio).toLocaleDateString('es-ES')}</span>
                      <span>Fin: {plan.fin === 'Activo' ? plan.fin : new Date(plan.fin).toLocaleDateString('es-ES')}</span>
                    </div>
                    <p className="text-sm text-slate-500 mt-1">{plan.motivo}</p>
                  </div>
                  {plan.fin === 'Activo' && (
                    <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-medium">
                      Activo
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Documentos */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Documentos y Consentimientos</h3>
            <div className="space-y-3">
              {clienteSeleccionado.documentos.map((doc, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                  <div className="flex items-center gap-3">
                    <FileCheck className="w-5 h-5 text-emerald-600" />
                    <div>
                      <h4 className="font-semibold text-slate-900">{doc.tipo}</h4>
                      <p className="text-sm text-slate-600">{doc.nombre}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-medium">
                      {doc.estado}
                    </span>
                    <p className="text-xs text-slate-500 mt-1">{new Date(doc.fecha).toLocaleDateString('es-ES')}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Información de facturación */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Información de Facturación</h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-purple-50 p-4 rounded-lg">
                <p className="text-sm text-slate-600 mb-1">Total Pagado</p>
                <p className="text-xl font-bold text-purple-900">€{clienteSeleccionado.facturacion.totalPagado}</p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-slate-600 mb-1">Último Pago</p>
                <p className="text-sm font-semibold text-blue-900">
                  {new Date(clienteSeleccionado.facturacion.ultimoPago).toLocaleDateString('es-ES')}
                </p>
              </div>
              <div className="bg-emerald-50 p-4 rounded-lg">
                <p className="text-sm text-slate-600 mb-1">Método de Pago</p>
                <p className="text-sm font-semibold text-emerald-900">{clienteSeleccionado.facturacion.metodoPago}</p>
              </div>
            </div>
          </div>

          {/* Notas y observaciones */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Notas y Observaciones</h3>
            <div className="space-y-3">
              {clienteSeleccionado.notas.map((nota, index) => (
                <div key={index} className="p-4 bg-blue-50 border-l-4 border-blue-600 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <MessageSquare className="w-4 h-4 text-blue-600" />
                    <span className="text-sm font-semibold text-slate-900">{nota.autor}</span>
                    <span className="text-xs text-slate-500">• {new Date(nota.fecha).toLocaleDateString('es-ES')}</span>
                  </div>
                  <p className="text-sm text-slate-700">{nota.contenido}</p>
                </div>
              ))}
            </div>
            <button className="mt-4 w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
              Añadir Nueva Nota
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

