import { useState, useEffect } from 'react';
import { Plus, Search, Target, TrendingUp, AlertCircle, Calendar, User, Edit, Trash2 } from 'lucide-react';
import { getObjectives, Objective } from '../api/objectives';
import { Button, Card, CardHeader, CardTitle, CardContent, Badge } from '../../../components/ui';

export default function ObjectivesManager() {
  const [objetivos, setObjetivos] = useState<Objective[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTipo, setFilterTipo] = useState<string>('todos');
  const [filterEstado, setFilterEstado] = useState<string>('todos');

  useEffect(() => {
    loadObjectives();
  }, []);

  const loadObjectives = async () => {
    const data = await getObjectives();
    setObjetivos(data);
  };

  const filteredObjetivos = objetivos.filter(objetivo => {
    const matchesSearch = objetivo.nombre.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTipo = filterTipo === 'todos' || objetivo.tipo === filterTipo;
    const matchesEstado = filterEstado === 'todos' || objetivo.estado === filterEstado;
    return matchesSearch && matchesTipo && matchesEstado;
  });

  const getEstadoBadgeVariant = (estado: string): 'success' | 'warning' | 'error' | 'info' | 'default' => {
    switch (estado) {
      case 'en_progreso':
        return 'info';
      case 'completado':
        return 'success';
      case 'cancelado':
        return 'error';
      case 'pausado':
        return 'warning';
      default:
        return 'default';
    }
  };

  const getProgresoColor = (progreso: number) => {
    if (progreso >= 100) return 'bg-success';
    if (progreso >= 75) return 'bg-info';
    if (progreso >= 50) return 'bg-warning';
    return 'bg-error';
  };

  const getTipoIcon = (tipo: string) => {
    return <Target className="w-4 h-4" />;
  };

  const estadisticas = {
    total: objetivos.length,
    enProgreso: objetivos.filter(o => o.estado === 'en_progreso').length,
    completados: objetivos.filter(o => o.estado === 'completado').length,
    progresoPromedio: objetivos.length > 0 
      ? objetivos.reduce((sum, o) => sum + o.progreso, 0) / objetivos.length 
      : 0
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between mb-6">
          <CardTitle>Gestor de Objetivos</CardTitle>
          <Button variant="primary">
            <Plus className="w-5 h-5 mr-2" />
            Nuevo Objetivo
          </Button>
        </div>

        {/* Estadísticas rápidas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-gradient-to-br from-info-light to-info-light/50 p-4 rounded-lg border border-info-light">
            <div className="flex items-center gap-3">
              <div className="bg-info p-2 rounded-lg">
                <Target className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-body-small text-text-secondary">Total Objetivos</p>
                <p className="text-h3 font-bold text-text-primary">{estadisticas.total}</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-warning-light to-warning-light/50 p-4 rounded-lg border border-warning-light">
            <div className="flex items-center gap-3">
              <div className="bg-warning p-2 rounded-lg">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-body-small text-text-secondary">En Progreso</p>
                <p className="text-h3 font-bold text-text-primary">{estadisticas.enProgreso}</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-success-light to-success-light/50 p-4 rounded-lg border border-success-light">
            <div className="flex items-center gap-3">
              <div className="bg-success p-2 rounded-lg">
                <Target className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-body-small text-text-secondary">Completados</p>
                <p className="text-h3 font-bold text-text-primary">{estadisticas.completados}</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-primary-50 to-primary-50/50 p-4 rounded-lg border border-primary-50">
            <div className="flex items-center gap-3">
              <div className="bg-primary p-2 rounded-lg">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-body-small text-text-secondary">Progreso Promedio</p>
                <p className="text-h3 font-bold text-text-primary">{estadisticas.progresoPromedio.toFixed(1)}%</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filtros y búsqueda */}
        <div className="mt-6 flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
            <input
              type="text"
              placeholder="Buscar objetivos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-base input-md pl-10"
            />
          </div>
          <select
            value={filterTipo}
            onChange={(e) => setFilterTipo(e.target.value)}
            className="input-base input-md"
          >
            <option value="todos">Todos los tipos</option>
            <option value="personal">Personal</option>
            <option value="comercial">Comercial</option>
            <option value="operacional">Operacional</option>
          </select>
          <select
            value={filterEstado}
            onChange={(e) => setFilterEstado(e.target.value)}
            className="input-base input-md"
          >
            <option value="todos">Todos los estados</option>
            <option value="en_progreso">En Progreso</option>
            <option value="completado">Completado</option>
            <option value="pausado">Pausado</option>
            <option value="cancelado">Cancelado</option>
          </select>
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          {filteredObjetivos.map((objetivo) => (
            <div
              key={objetivo.id}
              className="p-5 bg-surface rounded-lg hover:bg-surface-2 transition-all duration-normal border border-border"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-h3 font-semibold text-text-primary">{objetivo.nombre}</h3>
                    <Badge variant={getEstadoBadgeVariant(objetivo.estado)}>
                      {getTipoIcon(objetivo.tipo)}
                      <span className="ml-1">{objetivo.estado.replace('_', ' ').toUpperCase()}</span>
                    </Badge>
                    <Badge variant="info">
                      {objetivo.tipo.toUpperCase()}
                    </Badge>
                  </div>
                  <p className="text-body-small text-text-secondary mb-3">{objetivo.descripcion}</p>
                </div>
                <div className="flex gap-2 ml-4">
                  <button className="p-2 text-info hover:bg-info-light rounded-lg transition-colors">
                    <Edit className="w-5 h-5" />
                  </button>
                  <button className="p-2 text-error hover:bg-error-light rounded-lg transition-colors">
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="flex items-center gap-2 text-body-small">
                  <AlertCircle className="w-4 h-4 text-text-muted" />
                  <span className="text-text-secondary">Objetivo:</span>
                  <span className="font-semibold text-text-primary">
                    {objetivo.metricaObjetivo} {objetivo.unidad}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-body-small">
                  <TrendingUp className="w-4 h-4 text-text-muted" />
                  <span className="text-text-secondary">Actual:</span>
                  <span className="font-semibold text-text-primary">
                    {objetivo.metricaActual} {objetivo.unidad}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-body-small">
                  <User className="w-4 h-4 text-text-muted" />
                  <span className="text-text-secondary">Responsable:</span>
                  <span className="font-semibold text-text-primary">{objetivo.responsable}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="flex items-center gap-2 text-body-small">
                  <Calendar className="w-4 h-4 text-text-muted" />
                  <span className="text-text-secondary">Inicio:</span>
                  <span className="text-text-primary">{new Date(objetivo.fechaInicio).toLocaleDateString('es-ES')}</span>
                </div>
                <div className="flex items-center gap-2 text-body-small">
                  <Calendar className="w-4 h-4 text-text-muted" />
                  <span className="text-text-secondary">Fin:</span>
                  <span className="text-text-primary">{new Date(objetivo.fechaFin).toLocaleDateString('es-ES')}</span>
                </div>
              </div>

              {/* Barra de progreso */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-body-small font-medium text-text-secondary">Progreso</span>
                  <span className="text-body-small font-bold text-text-primary">{objetivo.progreso.toFixed(1)}%</span>
                </div>
                <div className="w-full bg-surface-2 rounded-full h-3">
                  <div 
                    className={`h-3 rounded-full transition-all duration-normal ${getProgresoColor(objetivo.progreso)}`}
                    style={{ width: `${Math.min(objetivo.progreso, 100)}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

