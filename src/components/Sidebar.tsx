import { LayoutDashboard, LogOut, Dumbbell, Wallet, RefreshCw, AlertCircle, FileText, PieChart, Target, Building2, Users, Clock, CalendarCheck, Calendar, Clipboard, BookTemplate, AlertTriangle, ShoppingCart, Apple, DollarSign, BookOpen, ChefHat, Salad, TrendingUp, Activity, ClipboardCheck, Library, Edit3, List, Megaphone, BarChart3, UserCheck, Kanban, Sparkles, CheckSquare, Home } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { Link, useLocation } from 'react-router-dom';

export default function Sidebar() {
  const { signOut } = useAuth();
  const location = useLocation();

  const handleSignOut = async () => {
    await signOut();
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <aside className="w-64 bg-dark-surface text-white flex flex-col h-screen border-r border-dark-border custom-scrollbar overflow-y-auto">
      <div className="p-6 border-b border-dark-border">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-br from-primary to-primary-600 p-2 rounded-lg shadow-md">
            <Dumbbell className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-h3 font-bold">ERP Fitness</h1>
            <p className="text-caption text-dark-text-secondary">Entrenadores</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          <li>
            <Link
              to="/"
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-normal ${
                isActive('/') 
                  ? 'bg-primary text-white shadow-md' 
                  : 'text-dark-text-secondary hover:bg-dark-surface2 hover:text-white'
              }`}
            >
              <LayoutDashboard className="w-5 h-5" />
              <span className="font-medium">Dashboard</span>
            </Link>
          </li>
          <li>
            <Link
              to="/resumen-general"
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-normal ${
                isActive('/resumen-general') 
                  ? 'bg-primary text-white shadow-md' 
                  : 'text-dark-text-secondary hover:bg-dark-surface2 hover:text-white'
              }`}
            >
              <Home className="w-5 h-5" />
              <span className="font-medium">Resumen General</span>
            </Link>
          </li>
          <li>
            <Link
              to="/caja-bancos"
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-normal ${
                isActive('/caja-bancos') 
                  ? 'bg-primary text-white shadow-md' 
                  : 'text-dark-text-secondary hover:bg-dark-surface2 hover:text-white'
              }`}
            >
              <Wallet className="w-5 h-5" />
              <span className="font-medium">Caja & Bancos</span>
            </Link>
          </li>
          <li>
            <Link
              to="/gastos-proveedores"
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-normal ${
                isActive('/gastos-proveedores') 
                  ? 'bg-primary text-white shadow-md' 
                  : 'text-dark-text-secondary hover:bg-dark-surface2 hover:text-white'
              }`}
            >
              <DollarSign className="w-5 h-5" />
              <span className="font-medium">Gastos & Proveedores</span>
            </Link>
          </li>
          <li>
            <Link
              to="/suscripciones-cuotas"
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-normal ${
                isActive('/suscripciones-cuotas') 
                  ? 'bg-primary text-white shadow-md' 
                  : 'text-dark-text-secondary hover:bg-dark-surface2 hover:text-white'
              }`}
            >
              <RefreshCw className="w-5 h-5" />
              <span className="font-medium">Suscripciones & Cuotas</span>
            </Link>
          </li>
          <li>
            <Link
              to="/pagos-pendientes-morosidad"
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-normal ${
                isActive('/pagos-pendientes-morosidad') 
                  ? 'bg-primary text-white shadow-md' 
                  : 'text-dark-text-secondary hover:bg-dark-surface2 hover:text-white'
              }`}
            >
              <AlertCircle className="w-5 h-5" />
              <span className="font-medium">Pagos Pendientes</span>
            </Link>
          </li>
          <li>
            <Link
              to="/facturacion-cobros"
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-normal ${
                isActive('/facturacion-cobros') 
                  ? 'bg-primary text-white shadow-md' 
                  : 'text-dark-text-secondary hover:bg-dark-surface2 hover:text-white'
              }`}
            >
              <FileText className="w-5 h-5" />
              <span className="font-medium">Facturación & Cobros</span>
            </Link>
          </li>
          <li>
            <Link
              to="/panel-financiero-overview"
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-normal ${
                isActive('/panel-financiero-overview') 
                  ? 'bg-primary text-white shadow-md' 
                  : 'text-dark-text-secondary hover:bg-dark-surface2 hover:text-white'
              }`}
            >
              <PieChart className="w-5 h-5" />
              <span className="font-medium">Panel Financiero</span>
            </Link>
          </li>
          <li>
            <Link
              to="/eventos-retos-especiales"
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-normal ${
                isActive('/eventos-retos-especiales') 
                  ? 'bg-primary text-white shadow-md' 
                  : 'text-dark-text-secondary hover:bg-dark-surface2 hover:text-white'
              }`}
            >
              <Target className="w-5 h-5" />
              <span className="font-medium">Eventos & Retos</span>
            </Link>
          </li>
          <li>
            <Link
              to="/recursos-salas-material"
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-normal ${
                isActive('/recursos-salas-material') 
                  ? 'bg-primary text-white shadow-md' 
                  : 'text-dark-text-secondary hover:bg-dark-surface2 hover:text-white'
              }`}
            >
              <Building2 className="w-5 h-5" />
              <span className="font-medium">Recursos & Salas</span>
            </Link>
          </li>
          <li>
            <Link
              to="/disponibilidad-turnos-staff"
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-normal ${
                isActive('/disponibilidad-turnos-staff') 
                  ? 'bg-primary text-white shadow-md' 
                  : 'text-dark-text-secondary hover:bg-dark-surface2 hover:text-white'
              }`}
            >
              <Users className="w-5 h-5" />
              <span className="font-medium">Turnos & Personal</span>
            </Link>
          </li>
          <li>
            <Link
              to="/lista-espera-ausencias"
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-normal ${
                isActive('/lista-espera-ausencias') 
                  ? 'bg-primary text-white shadow-md' 
                  : 'text-dark-text-secondary hover:bg-dark-surface2 hover:text-white'
              }`}
            >
              <Clock className="w-5 h-5" />
              <span className="font-medium">Lista de Espera</span>
            </Link>
          </li>
          <li>
            <Link
              to="/reservas-online"
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-normal ${
                isActive('/reservas-online') 
                  ? 'bg-primary text-white shadow-md' 
                  : 'text-dark-text-secondary hover:bg-dark-surface2 hover:text-white'
              }`}
            >
              <CalendarCheck className="w-5 h-5" />
              <span className="font-medium">Reservas Online</span>
            </Link>
          </li>
          <li>
            <Link
              to="/agenda-calendario"
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-normal ${
                isActive('/agenda-calendario') 
                  ? 'bg-primary text-white shadow-md' 
                  : 'text-dark-text-secondary hover:bg-dark-surface2 hover:text-white'
              }`}
            >
              <Calendar className="w-5 h-5" />
              <span className="font-medium">Agenda & Calendario</span>
            </Link>
          </li>
          <li>
            <Link
              to="/programas-entreno"
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-normal ${
                isActive('/programas-entreno') 
                  ? 'bg-primary text-white shadow-md' 
                  : 'text-dark-text-secondary hover:bg-dark-surface2 hover:text-white'
              }`}
            >
              <Clipboard className="w-5 h-5" />
              <span className="font-medium">Programas de Entreno</span>
            </Link>
          </li>
          <li>
            <Link
              to="/plantillas-entrenamiento"
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-normal ${
                isActive('/plantillas-entrenamiento') 
                  ? 'bg-primary text-white shadow-md' 
                  : 'text-dark-text-secondary hover:bg-dark-surface2 hover:text-white'
              }`}
            >
              <BookTemplate className="w-5 h-5" />
              <span className="font-medium">Plantillas de Entreno</span>
            </Link>
          </li>
          <li>
            <Link
              to="/alertas-restricciones-alimentarias"
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-normal ${
                isActive('/alertas-restricciones-alimentarias') 
                  ? 'bg-primary text-white shadow-md' 
                  : 'text-dark-text-secondary hover:bg-dark-surface2 hover:text-white'
              }`}
            >
              <AlertTriangle className="w-5 h-5" />
              <span className="font-medium">Restricciones Alimentarias</span>
            </Link>
          </li>
          <li>
            <Link
              to="/lista-compra-supermercado"
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-normal ${
                isActive('/lista-compra-supermercado') 
                  ? 'bg-primary text-white shadow-md' 
                  : 'text-dark-text-secondary hover:bg-dark-surface2 hover:text-white'
              }`}
            >
              <ShoppingCart className="w-5 h-5" />
              <span className="font-medium">Lista de la Compra</span>
            </Link>
          </li>
          <li>
            <Link
              to="/checkins-nutricionales"
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-normal ${
                isActive('/checkins-nutricionales') 
                  ? 'bg-primary text-white shadow-md' 
                  : 'text-dark-text-secondary hover:bg-dark-surface2 hover:text-white'
              }`}
            >
              <Apple className="w-5 h-5" />
              <span className="font-medium">Check-ins Nutricionales</span>
            </Link>
          </li>
          <li>
            <Link
              to="/plantillas-dieta"
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-normal ${
                isActive('/plantillas-dieta') 
                  ? 'bg-primary text-white shadow-md' 
                  : 'text-dark-text-secondary hover:bg-dark-surface2 hover:text-white'
              }`}
            >
              <BookOpen className="w-5 h-5" />
              <span className="font-medium">Plantillas de Dieta</span>
            </Link>
          </li>
          <li>
            <Link
              to="/editor-dieta-meal-planner"
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-normal ${
                isActive('/editor-dieta-meal-planner') 
                  ? 'bg-primary text-white shadow-md' 
                  : 'text-dark-text-secondary hover:bg-dark-surface2 hover:text-white'
              }`}
            >
              <ChefHat className="w-5 h-5" />
              <span className="font-medium">Editor de Dieta</span>
            </Link>
          </li>
          <li>
            <Link
              to="/dietas-asignadas"
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-normal ${
                isActive('/dietas-asignadas') 
                  ? 'bg-primary text-white shadow-md' 
                  : 'text-dark-text-secondary hover:bg-dark-surface2 hover:text-white'
              }`}
            >
              <Salad className="w-5 h-5" />
              <span className="font-medium">Dietas Asignadas</span>
            </Link>
          </li>
          <li>
            <Link
              to="/progreso-rendimiento"
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-normal ${
                isActive('/progreso-rendimiento') 
                  ? 'bg-primary text-white shadow-md' 
                  : 'text-dark-text-secondary hover:bg-dark-surface2 hover:text-white'
              }`}
            >
              <TrendingUp className="w-5 h-5" />
              <span className="font-medium">Progreso & Rendimiento</span>
            </Link>
          </li>
          <li>
            <Link
              to="/adherencia-cumplimiento-entreno"
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-normal ${
                isActive('/adherencia-cumplimiento-entreno') 
                  ? 'bg-primary text-white shadow-md' 
                  : 'text-dark-text-secondary hover:bg-dark-surface2 hover:text-white'
              }`}
            >
              <Activity className="w-5 h-5" />
              <span className="font-medium">Adherencia & Cumplimiento</span>
            </Link>
          </li>
          <li>
            <Link
              to="/checkins-entreno"
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-normal ${
                isActive('/checkins-entreno') 
                  ? 'bg-primary text-white shadow-md' 
                  : 'text-dark-text-secondary hover:bg-dark-surface2 hover:text-white'
              }`}
            >
              <ClipboardCheck className="w-5 h-5" />
              <span className="font-medium">Check-ins de Entreno</span>
            </Link>
          </li>
          <li>
            <Link
              to="/biblioteca-ejercicios"
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-normal ${
                isActive('/biblioteca-ejercicios') 
                  ? 'bg-primary text-white shadow-md' 
                  : 'text-dark-text-secondary hover:bg-dark-surface2 hover:text-white'
              }`}
            >
              <Library className="w-5 h-5" />
              <span className="font-medium">Biblioteca de Ejercicios</span>
            </Link>
          </li>
          <li>
            <Link
              to="/editor-entreno"
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-normal ${
                isActive('/editor-entreno') 
                  ? 'bg-primary text-white shadow-md' 
                  : 'text-dark-text-secondary hover:bg-dark-surface2 hover:text-white'
              }`}
            >
              <Edit3 className="w-5 h-5" />
              <span className="font-medium">Editor de Entreno</span>
            </Link>
          </li>
          <li>
            <Link
              to="/listas-inteligentes-segmentos"
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-normal ${
                isActive('/listas-inteligentes-segmentos') 
                  ? 'bg-primary text-white shadow-md' 
                  : 'text-dark-text-secondary hover:bg-dark-surface2 hover:text-white'
              }`}
            >
              <List className="w-5 h-5" />
              <span className="font-medium">Listas Inteligentes</span>
            </Link>
          </li>
          <li>
            <Link
              to="/campañas-outreach"
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-normal ${
                isActive('/campañas-outreach') 
                  ? 'bg-primary text-white shadow-md' 
                  : 'text-dark-text-secondary hover:bg-dark-surface2 hover:text-white'
              }`}
            >
              <Megaphone className="w-5 h-5" />
              <span className="font-medium">Campañas & Outreach</span>
            </Link>
          </li>
          <li>
            <Link
              to="/encuestas-satisfaccion-nps-csat"
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-normal ${
                isActive('/encuestas-satisfaccion-nps-csat') 
                  ? 'bg-primary text-white shadow-md' 
                  : 'text-dark-text-secondary hover:bg-dark-surface2 hover:text-white'
              }`}
            >
              <BarChart3 className="w-5 h-5" />
              <span className="font-medium">Encuestas & Satisfacción</span>
            </Link>
          </li>
          <li>
            <Link
              to="/gestion-clientes"
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-normal ${
                isActive('/gestion-clientes') 
                  ? 'bg-primary text-white shadow-md' 
                  : 'text-dark-text-secondary hover:bg-dark-surface2 hover:text-white'
              }`}
            >
              <UserCheck className="w-5 h-5" />
              <span className="font-medium">Gestión de Clientes</span>
            </Link>
          </li>
          <li>
            <Link
              to="/pipeline-venta-kanban"
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-normal ${
                isActive('/pipeline-venta-kanban') 
                  ? 'bg-primary text-white shadow-md' 
                  : 'text-dark-text-secondary hover:bg-dark-surface2 hover:text-white'
              }`}
            >
              <Kanban className="w-5 h-5" />
              <span className="font-medium">Pipeline de Venta</span>
            </Link>
          </li>
          <li>
            <Link
              to="/leads"
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-normal ${
                isActive('/leads') 
                  ? 'bg-primary text-white shadow-md' 
                  : 'text-dark-text-secondary hover:bg-dark-surface2 hover:text-white'
              }`}
            >
              <Sparkles className="w-5 h-5" />
              <span className="font-medium">Leads</span>
            </Link>
          </li>
          <li>
            <Link
              to="/objetivos-rendimiento"
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-normal ${
                isActive('/objetivos-rendimiento') 
                  ? 'bg-primary text-white shadow-md' 
                  : 'text-dark-text-secondary hover:bg-dark-surface2 hover:text-white'
              }`}
            >
              <Target className="w-5 h-5" />
              <span className="font-medium">Objetivos & Rendimiento</span>
            </Link>
          </li>
          <li>
            <Link
              to="/tareas-alertas"
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-normal ${
                isActive('/tareas-alertas') 
                  ? 'bg-primary text-white shadow-md' 
                  : 'text-dark-text-secondary hover:bg-dark-surface2 hover:text-white'
              }`}
            >
              <CheckSquare className="w-5 h-5" />
              <span className="font-medium">Tareas & Alertas</span>
            </Link>
          </li>
        </ul>
      </nav>

      <div className="p-4 border-t border-dark-border">
        <button
          onClick={handleSignOut}
          className="flex items-center gap-3 px-4 py-3 rounded-lg w-full text-dark-text-secondary hover:bg-dark-surface2 hover:text-white transition-normal"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Cerrar Sesión</span>
        </button>
      </div>
    </aside>
  );
}
