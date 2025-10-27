import { useState, useEffect } from 'react';
import { CheckSquare, Bell, TrendingUp } from 'lucide-react';
import TasksManager from '../components/TasksManager';
import AlertsPanel from '../components/AlertsPanel';
import TaskCreator from '../components/TaskCreator';
import PriorityQueue from '../components/PriorityQueue';
import NotificationCenter from '../components/NotificationCenter';
import TaskHistory from '../components/TaskHistory';
import AlertRules from '../components/AlertRules';
import TaskAssigner from '../components/TaskAssigner';
import { Task, Alert, AlertRule } from '../types';

export default function TareasAlertasPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [alertRules, setAlertRules] = useState<AlertRule[]>([]);
  const [activeTab, setActiveTab] = useState<'tareas' | 'alertas' | 'historial'>('tareas');
  const [loading, setLoading] = useState(true);

  // Datos de ejemplo - Reemplazar con datos reales
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      // Datos de ejemplo
      const ejemploTasks: Task[] = [
        {
          id: '1',
          titulo: 'Llamar a lead Juan Pérez',
          descripcion: 'Seguimiento de consulta sobre entrenamiento personalizado',
          prioridad: 'alta',
          estado: 'pendiente',
          fecha_creacion: '2025-10-25T10:00:00Z',
          fecha_vencimiento: '2025-10-27T18:00:00Z',
          tipo: 'seguimiento_lead',
        },
        {
          id: '2',
          titulo: 'Revisar check-in de María González',
          descripcion: 'Cliente no ha subido check-in de esta semana',
          prioridad: 'media',
          estado: 'pendiente',
          fecha_creacion: '2025-10-24T15:00:00Z',
          tipo: 'seguimiento_cliente',
        },
        {
          id: '3',
          titulo: 'Preparar sesión de evaluación',
          descripcion: 'Evaluación trimestral de Carlos Ruiz el viernes',
          prioridad: 'media',
          estado: 'en_progreso',
          fecha_creacion: '2025-10-23T09:00:00Z',
          fecha_vencimiento: '2025-10-29T16:00:00Z',
          tipo: 'preparacion',
        },
        {
          id: '4',
          titulo: 'Actualizar plantilla de ejercicios',
          descripcion: 'Añadir nuevos ejercicios a la biblioteca',
          prioridad: 'baja',
          estado: 'pendiente',
          fecha_creacion: '2025-10-22T11:00:00Z',
          tipo: 'administrativo',
        },
        {
          id: '5',
          titulo: 'Seguimiento pago pendiente',
          descripcion: 'Cliente Ana López tiene factura vencida',
          prioridad: 'alta',
          estado: 'completada',
          fecha_creacion: '2025-10-20T14:00:00Z',
          completada_fecha: '2025-10-25T16:30:00Z',
          tipo: 'cobranza',
        },
      ];

      const ejemploAlerts: Alert[] = [
        {
          id: '1',
          tipo: 'cliente_sin_checkin',
          titulo: 'Cliente sin check-in',
          mensaje: 'María González no ha subido su check-in semanal',
          prioridad: 'media',
          fecha: '2025-10-26T08:00:00Z',
          leida: false,
          relacionado_tipo: 'cliente',
          relacionado_id: 'cliente_123',
        },
        {
          id: '2',
          tipo: 'lead_sin_seguimiento',
          titulo: 'Lead sin seguimiento',
          mensaje: 'Juan Pérez contactó hace 2 días y aún no tiene seguimiento',
          prioridad: 'alta',
          fecha: '2025-10-26T09:30:00Z',
          leida: false,
          relacionado_tipo: 'lead',
          relacionado_id: 'lead_456',
        },
        {
          id: '3',
          tipo: 'pago_pendiente',
          titulo: 'Pago pendiente próximo a vencer',
          mensaje: 'Factura de Pedro Martínez vence en 2 días',
          prioridad: 'alta',
          fecha: '2025-10-25T17:00:00Z',
          leida: false,
        },
        {
          id: '4',
          tipo: 'personalizada',
          titulo: 'Recordatorio de sesión',
          mensaje: 'Tienes una sesión con Laura Sánchez en 1 hora',
          prioridad: 'media',
          fecha: '2025-10-26T10:00:00Z',
          leida: true,
        },
      ];

      const ejemploRules: AlertRule[] = [
        {
          id: '1',
          nombre: 'Cliente sin check-in semanal',
          tipo: 'cliente_sin_checkin',
          activa: true,
          condiciones: { dias_sin_checkin: 7 },
          prioridad: 'media',
        },
        {
          id: '2',
          nombre: 'Lead sin seguimiento > 2 días',
          tipo: 'lead_sin_seguimiento',
          activa: true,
          condiciones: { dias_sin_contacto: 2 },
          prioridad: 'alta',
        },
        {
          id: '3',
          nombre: 'Factura próxima a vencer',
          tipo: 'pago_pendiente',
          activa: true,
          condiciones: { dias_hasta_vencimiento: 3 },
          prioridad: 'alta',
        },
      ];

      setTasks(ejemploTasks);
      setAlerts(ejemploAlerts);
      setAlertRules(ejemploRules);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTask = async (taskData: Omit<Task, 'id' | 'fecha_creacion' | 'estado'>) => {
    const newTask: Task = {
      ...taskData,
      id: Math.random().toString(36).substr(2, 9),
      fecha_creacion: new Date().toISOString(),
      estado: 'pendiente',
    };
    setTasks([...tasks, newTask]);
  };

  const handleUpdateTask = async (taskId: string, updates: Partial<Task>) => {
    setTasks(tasks.map(task => {
      if (task.id === taskId) {
        const updatedTask = { ...task, ...updates };
        if (updates.estado === 'completada' && !task.completada_fecha) {
          updatedTask.completada_fecha = new Date().toISOString();
        }
        return updatedTask;
      }
      return task;
    }));
  };

  const handleDeleteTask = async (taskId: string) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const handleMarkAlertAsRead = async (alertId: string) => {
    setAlerts(alerts.map(alert =>
      alert.id === alertId ? { ...alert, leida: true } : alert
    ));
  };

  const handleClearAllAlerts = () => {
    setAlerts(alerts.map(alert => ({ ...alert, leida: true })));
  };

  const handleToggleRule = async (ruleId: string) => {
    setAlertRules(alertRules.map(rule =>
      rule.id === ruleId ? { ...rule, activa: !rule.activa } : rule
    ));
  };

  const handleAssignTask = async (taskId: string, userId: string) => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, asignado_a: userId } : task
    ));
  };

  const handleSelectTask = (taskId: string) => {
    // Scroll to task or open detail modal
    console.log('Selected task:', taskId);
  };

  // Estadísticas
  const tareasPendientes = tasks.filter(t => t.estado === 'pendiente' || t.estado === 'en_progreso').length;
  const tareasCompletadas = tasks.filter(t => t.estado === 'completada').length;
  const alertasSinLeer = alerts.filter(a => !a.leida).length;

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-auto bg-background">
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-display text-text-primary mb-2">Tareas & Alertas</h1>
          <p className="text-body text-text-secondary">
            Sistema inteligente de gestión de tareas y alertas personalizadas
          </p>
        </div>

        {/* Estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="card-base bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-body-small text-text-secondary mb-1">Tareas Pendientes</p>
                <p className="text-display-large text-text-primary">{tareasPendientes}</p>
              </div>
              <div className="bg-primary-50 p-3 rounded-lg">
                <CheckSquare className="w-icon-xl h-icon-xl text-primary" />
              </div>
            </div>
          </div>

          <div className="card-base bg-gradient-to-br from-info/5 to-info/10 border border-info/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-body-small text-text-secondary mb-1">Alertas Sin Leer</p>
                <p className="text-display-large text-text-primary">{alertasSinLeer}</p>
              </div>
              <div className="bg-info-light p-3 rounded-lg">
                <Bell className="w-icon-xl h-icon-xl text-info" />
              </div>
            </div>
          </div>

          <div className="card-base bg-gradient-to-br from-success/5 to-success/10 border border-success/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-body-small text-text-secondary mb-1">Completadas</p>
                <p className="text-display-large text-text-primary">{tareasCompletadas}</p>
              </div>
              <div className="bg-success-light p-3 rounded-lg">
                <TrendingUp className="w-icon-xl h-icon-xl text-success" />
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 flex-wrap">
          <button
            onClick={() => setActiveTab('tareas')}
            className={`chip-base transition-normal ${
              activeTab === 'tareas' ? 'chip-selected' : ''
            }`}
          >
            Tareas
          </button>
          <button
            onClick={() => setActiveTab('alertas')}
            className={`chip-base transition-normal ${
              activeTab === 'alertas' ? 'chip-selected' : ''
            }`}
          >
            Alertas
          </button>
          <button
            onClick={() => setActiveTab('historial')}
            className={`chip-base transition-normal ${
              activeTab === 'historial' ? 'chip-selected' : ''
            }`}
          >
            Historial
          </button>
        </div>

        {/* Content */}
        {activeTab === 'tareas' && (
          <div className="space-y-6">
            <div className="flex justify-between items-start">
              <PriorityQueue tasks={tasks} onSelectTask={handleSelectTask} />
            </div>

            <TaskCreator onCreateTask={handleCreateTask} />

            <TasksManager
              tasks={tasks}
              onUpdateTask={handleUpdateTask}
              onDeleteTask={handleDeleteTask}
            />

            <TaskAssigner
              tasks={tasks}
              availableUsers={['Juan Pérez', 'María González', 'Carlos Ruiz']}
              onAssignTask={handleAssignTask}
            />
          </div>
        )}

        {activeTab === 'alertas' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <AlertsPanel
              alerts={alerts}
              onMarkAsRead={handleMarkAlertAsRead}
              onClearAll={handleClearAllAlerts}
            />

            <div className="space-y-6">
              <NotificationCenter
                alerts={alerts}
                onMarkAsRead={handleMarkAlertAsRead}
              />
              
              <AlertRules
                rules={alertRules}
                onToggleRule={handleToggleRule}
              />
            </div>
          </div>
        )}

        {activeTab === 'historial' && (
          <TaskHistory tasks={tasks} />
        )}
      </div>
    </div>
  );
}

