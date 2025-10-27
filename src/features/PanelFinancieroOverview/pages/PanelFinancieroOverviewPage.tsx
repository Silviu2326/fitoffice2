import { useState, useEffect } from 'react';
import PanelFinanciero from '../components/PanelFinanciero';
import MetricasIngresos from '../components/MetricasIngresos';
import GastosEstructurales from '../components/GastosEstructurales';
import RendimientoMensual from '../components/RendimientoMensual';
import AlertasPagos from '../components/AlertasPagos';
import AnalisisRentabilidad from '../components/AnalisisRentabilidad';
import ProyeccionesFinancieras from '../components/ProyeccionesFinancieras';
import ReportesPersonalizados from '../components/ReportesPersonalizados';
import { getOverviewFinanciero, getIngresosDetallados, getGastosDetallados } from '../api/overview';

export default function PanelFinancieroOverviewPage() {
  const [loading, setLoading] = useState(true);
  const [tipoUsuario] = useState<'entrenador' | 'gimnasio'>('entrenador'); // Esto vendría del contexto de usuario
  const [datosOverview, setDatosOverview] = useState<any>(null);

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    try {
      setLoading(true);
      const [overview, ingresos, gastos] = await Promise.all([
        getOverviewFinanciero(tipoUsuario),
        getIngresosDetallados(tipoUsuario),
        getGastosDetallados(tipoUsuario)
      ]);
      
      setDatosOverview({ overview, ingresos, gastos });
    } catch (error) {
      console.error('Error al cargar datos financieros:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex-1 overflow-auto bg-[#F8FAFC] p-8">
        <div className="flex items-center justify-center h-full">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#6366F1] border-t-transparent"></div>
        </div>
      </div>
    );
  }

  // Datos de ejemplo para demostración
  const datosEjemplo = {
    panelFinanciero: {
      ingresosTotales: 12500,
      gastosTotales: 4200,
      beneficioNeto: 8300,
      tendencia: 12.5
    },
    fuentesIngresos: [
      { nombre: 'Sesiones 1 a 1', cantidad: 6500, porcentaje: 52, icono: 'users' as const },
      { nombre: 'Paquetes de Entrenamiento', cantidad: 4200, porcentaje: 34, icono: 'package' as const },
      { nombre: 'Consultas Online', cantidad: 1800, porcentaje: 14, icono: 'shopping' as const }
    ],
    gastosEstructurales: [
      { categoria: 'Alquiler Espacio', cantidad: 1500, porcentaje: 36, tipo: 'fijo' as const, icono: 'home' as const },
      { categoria: 'Material y Equipamiento', cantidad: 1200, porcentaje: 29, tipo: 'variable' as const, icono: 'wrench' as const },
      { categoria: 'Marketing y Publicidad', cantidad: 800, porcentaje: 19, tipo: 'variable' as const, icono: 'users' as const },
      { categoria: 'Servicios Básicos', cantidad: 700, porcentaje: 16, tipo: 'fijo' as const, icono: 'zap' as const }
    ],
    rendimientoMensual: [
      { mes: 'Agosto', ingresos: 10200, gastos: 3800, beneficio: 6400 },
      { mes: 'Septiembre', ingresos: 11500, gastos: 4000, beneficio: 7500 },
      { mes: 'Octubre', ingresos: 12500, gastos: 4200, beneficio: 8300 }
    ],
    pagosAtrasados: [
      { cliente: 'Juan Pérez', servicio: 'Pack 10 sesiones', cantidad: 450, diasAtraso: 15, estado: 'moderado' as const },
      { cliente: 'María García', servicio: 'Sesión individual', cantidad: 60, diasAtraso: 5, estado: 'leve' as const },
      { cliente: 'Carlos López', servicio: 'Pack mensual PT', cantidad: 320, diasAtraso: 30, estado: 'grave' as const }
    ],
    analisisRentabilidad: {
      margenBruto: 75,
      margenNeto: 66,
      roi: 145,
      puntoEquilibrio: 4500,
      metricas: [
        { nombre: 'Clientes Activos', valor: 45, objetivo: 50, unidad: '%' as const },
        { nombre: 'Tasa de Retención', valor: 85, objetivo: 90, unidad: '%' as const },
        { nombre: 'Ingreso Promedio por Cliente', valor: 278, objetivo: 300, unidad: '€' as const }
      ]
    },
    proyecciones: [
      { mes: 'Noviembre', ingresoProyectado: 13200, gastoProyectado: 4400, beneficioProyectado: 8800, confianza: 'alta' as const },
      { mes: 'Diciembre', ingresoProyectado: 14100, gastoProyectado: 4600, beneficioProyectado: 9500, confianza: 'alta' as const },
      { mes: 'Enero', ingresoProyectado: 15500, gastoProyectado: 4800, beneficioProyectado: 10700, confianza: 'media' as const }
    ],
    tasaCrecimiento: 8.5
  };

  return (
    <div className="flex-1 overflow-auto bg-[#F8FAFC]">
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-[30px] leading-[38px] font-bold text-[#0F172A] mb-2">
            💰 Panel Financiero & Overview
          </h1>
          <p className="text-[16px] leading-[24px] text-[#64748B]">
            {tipoUsuario === 'entrenador' 
              ? 'Gestiona tus ingresos, rendimiento y clientes pendientes de pago' 
              : 'Visión global de la facturación del centro y análisis de rentabilidad'}
          </p>
        </div>

        {/* Panel principal */}
        <div className="mb-8">
          <PanelFinanciero
            tipo={tipoUsuario}
            ingresosTotales={datosEjemplo.panelFinanciero.ingresosTotales}
            gastosTotales={datosEjemplo.panelFinanciero.gastosTotales}
            beneficioNeto={datosEjemplo.panelFinanciero.beneficioNeto}
            tendencia={datosEjemplo.panelFinanciero.tendencia}
          />
        </div>

        {/* Grid de métricas principales */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <MetricasIngresos
            tipo={tipoUsuario}
            fuentes={datosEjemplo.fuentesIngresos}
            totalIngresos={datosEjemplo.panelFinanciero.ingresosTotales}
          />
          <GastosEstructurales
            gastos={datosEjemplo.gastosEstructurales}
            totalGastos={datosEjemplo.panelFinanciero.gastosTotales}
          />
        </div>

        {/* Rendimiento y alertas */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <RendimientoMensual meses={datosEjemplo.rendimientoMensual} />
          <AlertasPagos
            pagosAtrasados={datosEjemplo.pagosAtrasados}
            totalPendiente={datosEjemplo.pagosAtrasados.reduce((sum, p) => sum + p.cantidad, 0)}
          />
        </div>

        {/* Análisis avanzado */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <AnalisisRentabilidad
            margenBruto={datosEjemplo.analisisRentabilidad.margenBruto}
            margenNeto={datosEjemplo.analisisRentabilidad.margenNeto}
            roi={datosEjemplo.analisisRentabilidad.roi}
            puntoEquilibrio={datosEjemplo.analisisRentabilidad.puntoEquilibrio}
            metricas={datosEjemplo.analisisRentabilidad.metricas}
          />
          <ProyeccionesFinancieras
            proyecciones={datosEjemplo.proyecciones}
            tasaCrecimiento={datosEjemplo.tasaCrecimiento}
          />
        </div>

        {/* Reportes personalizados */}
        <div className="mb-8">
          <ReportesPersonalizados tipoUsuario={tipoUsuario} />
        </div>
      </div>
    </div>
  );
}

