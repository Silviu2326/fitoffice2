import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Login from './components/Login';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import CajaBancosPage from './features/CajaBancos/pages/CajaBancosPage';
import SuscripcionesCuotasRecurrentesPage from './features/SuscripcionesCuotasRecurrentes/pages/SuscripcionesCuotasRecurrentesPage';
import PagosPendientesMorosidadPage from './features/PagosPendientesMorosidad/pages/PagosPendientesMorosidadPage';
import FacturacionCobrosPage from './features/FacturacionCobros/pages/FacturacionCobrosPage';
import PanelFinancieroOverviewPage from './features/PanelFinancieroOverview/pages/PanelFinancieroOverviewPage';
import EventosRetosEspecialesPage from './features/EventosRetosEspeciales/pages/EventosRetosEspecialesPage';
import RecursosSalasMaterialPage from './features/RecursosSalasMaterial/pages/RecursosSalasMaterialPage';
import DisponibilidadTurnosStaffPage from './features/DisponibilidadTurnosStaff/pages/DisponibilidadTurnosStaffPage';
import ListaEsperaAusenciasPage from './features/ListaEsperaAusencias/pages/ListaEsperaAusenciasPage';
import ReservasOnlinePage from './features/ReservasOnline/pages/ReservasOnlinePage';
import AgendaCalendarioPage from './features/AgendaCalendario/pages/AgendaCalendarioPage';
import ProgramasEntrenoPage from './features/ProgramasEntreno/pages/ProgramasEntrenoPage';
import PlantillasEntrenamientoPage from './features/PlantillasEntrenamiento/pages/PlantillasEntrenamientoPage';
import AlertasRestriccionesAlimentariasPage from './features/AlertasRestriccionesAlimentarias/pages/AlertasRestriccionesAlimentariasPage';
import ListaCompraSupermercadoPage from './features/ListaCompraSupermercado/pages/ListaCompraSupermercadoPage';
import CheckinsNutricionalesPage from './features/CheckinsNutricionales/pages/CheckinsNutricionalesPage';
import GastosProveedoresPage from './features/GastosProveedores/pages/GastosProveedoresPage';
import PlantillasDietaPage from './features/PlantillasDieta/pages/PlantillasDietaPage';
import EditorDietaMealPlannerPage from './features/EditorDietaMealPlanner/pages/EditorDietaMealPlannerPage';
import DietasAsignadasPage from './features/DietasAsignadas/pages/DietasAsignadasPage';
import ProgresoRendimientoPage from './features/ProgresoRendimiento/pages/ProgresoRendimientoPage';
import AdherenciaCumplimientoEntrenoPage from './features/AdherenciaCumplimientoEntreno/pages/AdherenciaCumplimientoEntrenoPage';
import CheckinsEntrenoPage from './features/CheckinsEntreno/pages/CheckinsEntrenoPage';
import BibliotecaEjerciciosPage from './features/BibliotecaEjercicios/pages/BibliotecaEjerciciosPage';
import EditorEntrenoPage from './features/EditorEntreno/pages/EditorEntrenoPage';
import ListasInteligentesSegmentosGuardadosPage from './features/ListasInteligentesSegmentosGuardados/pages/ListasInteligentesSegmentosGuardadosPage';
import CampañasOutreachPage from './features/CampañasOutreach/pages/CampañasOutreachPage';
import EncuestasSatisfaccionNPSCSATPage from './features/EncuestasSatisfaccionNPSCSAT/pages/EncuestasSatisfaccionNPSCSATPage';
import GestionClientesPage from './features/GestionClientes/pages/GestionClientesPage';
import PipelineVentaKanbanPage from './features/PipelineVentaKanban/pages/PipelineVentaKanbanPage';
import LeadsPage from './features/Leads/pages/LeadsPage';
import ObjetivosRendimientoPage from './features/ObjetivosRendimiento/pages/ObjetivosRendimientoPage';
import TareasAlertasPage from './features/TareasAlertas/pages/TareasAlertasPage';
import ResumenGeneralPage from './features/ResumenGeneral/pages/ResumenGeneralPage';

function AppContent() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-emerald-500 border-t-transparent"></div>
      </div>
    );
  }

  if (!user) {
    return <Login />;
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/caja-bancos" element={<CajaBancosPage />} />
        <Route path="/suscripciones-cuotas" element={<SuscripcionesCuotasRecurrentesPage />} />
        <Route path="/pagos-pendientes-morosidad" element={<PagosPendientesMorosidadPage />} />
        <Route path="/facturacion-cobros" element={<FacturacionCobrosPage />} />
        <Route path="/panel-financiero-overview" element={<PanelFinancieroOverviewPage />} />
        <Route path="/eventos-retos-especiales" element={<EventosRetosEspecialesPage />} />
        <Route path="/recursos-salas-material" element={<RecursosSalasMaterialPage />} />
        <Route path="/disponibilidad-turnos-staff" element={<DisponibilidadTurnosStaffPage />} />
        <Route path="/lista-espera-ausencias" element={<ListaEsperaAusenciasPage />} />
        <Route path="/reservas-online" element={<ReservasOnlinePage />} />
        <Route path="/agenda-calendario" element={<AgendaCalendarioPage />} />
        <Route path="/programas-entreno" element={<ProgramasEntrenoPage />} />
        <Route path="/plantillas-entrenamiento" element={<PlantillasEntrenamientoPage />} />
        <Route path="/alertas-restricciones-alimentarias" element={<AlertasRestriccionesAlimentariasPage />} />
        <Route path="/lista-compra-supermercado" element={<ListaCompraSupermercadoPage />} />
        <Route path="/checkins-nutricionales" element={<CheckinsNutricionalesPage />} />
        <Route path="/gastos-proveedores" element={<GastosProveedoresPage />} />
        <Route path="/plantillas-dieta" element={<PlantillasDietaPage />} />
        <Route path="/editor-dieta-meal-planner" element={<EditorDietaMealPlannerPage />} />
        <Route path="/dietas-asignadas" element={<DietasAsignadasPage />} />
        <Route path="/progreso-rendimiento" element={<ProgresoRendimientoPage />} />
        <Route path="/adherencia-cumplimiento-entreno" element={<AdherenciaCumplimientoEntrenoPage />} />
        <Route path="/checkins-entreno" element={<CheckinsEntrenoPage />} />
        <Route path="/biblioteca-ejercicios" element={<BibliotecaEjerciciosPage />} />
        <Route path="/editor-entreno" element={<EditorEntrenoPage />} />
        <Route path="/listas-inteligentes-segmentos" element={<ListasInteligentesSegmentosGuardadosPage />} />
        <Route path="/campañas-outreach" element={<CampañasOutreachPage />} />
        <Route path="/encuestas-satisfaccion-nps-csat" element={<EncuestasSatisfaccionNPSCSATPage />} />
        <Route path="/gestion-clientes" element={<GestionClientesPage />} />
        <Route path="/pipeline-venta-kanban" element={<PipelineVentaKanbanPage />} />
        <Route path="/leads" element={<LeadsPage />} />
        <Route path="/objetivos-rendimiento" element={<ObjetivosRendimientoPage />} />
        <Route path="/tareas-alertas" element={<TareasAlertasPage />} />
        <Route path="/resumen-general" element={<ResumenGeneralPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
