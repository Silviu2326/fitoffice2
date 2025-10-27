import { useState, useEffect } from 'react';
import { Shield, AlertTriangle, TrendingUp } from 'lucide-react';
import { ClasificacionRiesgo, calcularClasificacionRiesgo } from '../api/seguimiento';
import { PagoVencido, obtenerPagosVencidos } from '../api/morosidad';

export default function ClasificadorRiesgo() {
  const [clasificaciones, setClasificaciones] = useState<ClasificacionRiesgo[]>([]);
  const [pagosVencidos, setPagosVencidos] = useState<PagoVencido[]>([]);
  const [loading, setLoading] = useState(true);
  const [clienteSeleccionado, setClienteSeleccionado] = useState<string>('');

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    try {
      setLoading(true);
      const pagos = await obtenerPagosVencidos();
      setPagosVencidos(pagos);

      // Obtener clasificaciones de riesgo para cada cliente único
      const clientesUnicos = Array.from(new Set(pagos.map(p => p.cliente_id)));
      const clasificacionesPromesas = clientesUnicos.map(clienteId => 
        calcularClasificacionRiesgo(clienteId)
      );
      const clasificacionesData = await Promise.all(clasificacionesPromesas);
      
      // Ordenar por score de riesgo (mayor a menor)
      clasificacionesData.sort((a, b) => b.score_riesgo - a.score_riesgo);
      setClasificaciones(clasificacionesData);
    } catch (error) {
      console.error('Error al cargar datos:', error);
    } finally {
      setLoading(false);
    }
  };

  const getColorRiesgo = (nivel: string) => {
    const colores = {
      bajo: 'bg-[#D1FAE5] text-[#10B981] border-[#10B981]',
      medio: 'bg-[#FEF3C7] text-[#F59E0B] border-[#F59E0B]',
      alto: 'bg-[#FED7AA] text-[#F59E0B] border-[#F59E0B]',
      critico: 'bg-[#FEE2E2] text-[#EF4444] border-[#EF4444]',
    };
    return colores[nivel as keyof typeof colores] || 'bg-[#E2E8F0] text-[#64748B]';
  };

  const getIconoRiesgo = (nivel: string) => {
    switch (nivel) {
      case 'critico':
        return <AlertTriangle className="w-5 h-5 text-[#EF4444]" />;
      case 'alto':
        return <AlertTriangle className="w-5 h-5 text-[#F59E0B]" />;
      case 'medio':
        return <Shield className="w-5 h-5 text-[#F59E0B]" />;
      default:
        return <Shield className="w-5 h-5 text-[#10B981]" />;
    }
  };

  const getClienteNombre = (clienteId: string) => {
    const pago = pagosVencidos.find(p => p.cliente_id === clienteId);
    return pago?.cliente_nombre || 'Cliente desconocido';
  };

  if (loading) {
    return (
      <div className="bg-white rounded-[16px] shadow-md p-6 border border-[#E2E8F0]">
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-4 border-[#6366F1] border-t-transparent"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-[16px] shadow-md border border-[#E2E8F0]">
      <div className="p-6 border-b border-[#E2E8F0]">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-[#CCFBF1] rounded-[12px]">
            <Shield className="w-6 h-6 text-[#14B8A6]" />
          </div>
          <div>
            <h2 className="text-[20px] leading-[28px] font-semibold text-[#0F172A]">Clasificador de Riesgo</h2>
            <p className="text-[14px] leading-[20px] text-[#64748B]">Evaluación de probabilidad de cobro por cliente</p>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Resumen de Riesgos */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          {['bajo', 'medio', 'alto', 'critico'].map((nivel) => {
            const count = clasificaciones.filter(c => c.nivel_riesgo === nivel).length;
            const color = {
              bajo: 'from-[#10B981] to-[#059669]',
              medio: 'from-[#F59E0B] to-[#D97706]',
              alto: 'from-[#F59E0B] to-[#EA580C]',
              critico: 'from-[#EF4444] to-[#DC2626]',
            }[nivel];

            return (
              <div key={nivel} className={`bg-gradient-to-br ${color} rounded-[12px] p-4 text-white shadow-md`}>
                <div className="text-[14px] leading-[20px] font-medium capitalize mb-1">Riesgo {nivel}</div>
                <div className="text-[30px] leading-[38px] font-bold">{count}</div>
              </div>
            );
          })}
        </div>

        {/* Lista de Clasificaciones */}
        <div className="space-y-4">
          {clasificaciones.length === 0 ? (
            <div className="text-center py-12 text-[#64748B] text-[16px] leading-[24px]">
              No hay clasificaciones de riesgo disponibles
            </div>
          ) : (
            clasificaciones.map((clasificacion) => (
              <div
                key={clasificacion.cliente_id}
                className="border border-[#E2E8F0] rounded-[12px] p-5 hover:border-[#6366F1] transition-all duration-200 shadow-sm"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-3">
                    <div className="mt-1">
                      {getIconoRiesgo(clasificacion.nivel_riesgo)}
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#0F172A] text-[18px] leading-[28px]">
                        {getClienteNombre(clasificacion.cliente_id)}
                      </h3>
                      <p className="text-[14px] leading-[20px] text-[#64748B] mt-1">{clasificacion.recomendacion}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`px-3 py-1 rounded-full text-[14px] leading-[20px] font-semibold border ${getColorRiesgo(clasificacion.nivel_riesgo)}`}>
                      {clasificacion.nivel_riesgo.toUpperCase()}
                    </span>
                    <div className="mt-2">
                      <div className="text-[24px] leading-[32px] font-bold text-[#0F172A]">{clasificacion.score_riesgo}</div>
                      <div className="text-[12px] leading-[16px] text-[#64748B]">Score de Riesgo</div>
                    </div>
                  </div>
                </div>

                {/* Factores de Riesgo */}
                <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 mb-4">
                  <div className="bg-[#F8FAFC] rounded-[12px] p-3">
                    <div className="text-[12px] leading-[16px] text-[#64748B] mb-1">Historial de Pagos</div>
                    <div className="font-semibold text-[#0F172A] text-[16px] leading-[24px]">{clasificacion.factores.historial_pagos}</div>
                  </div>
                  <div className="bg-[#F8FAFC] rounded-[12px] p-3">
                    <div className="text-[12px] leading-[16px] text-[#64748B] mb-1">Días Prom. Retraso</div>
                    <div className="font-semibold text-[#F59E0B] text-[16px] leading-[24px]">{clasificacion.factores.dias_promedio_retraso}</div>
                  </div>
                  <div className="bg-[#F8FAFC] rounded-[12px] p-3">
                    <div className="text-[12px] leading-[16px] text-[#64748B] mb-1">Incumplimientos</div>
                    <div className="font-semibold text-[#EF4444] text-[16px] leading-[24px]">{clasificacion.factores.num_incumplimientos}</div>
                  </div>
                  <div className="bg-[#F8FAFC] rounded-[12px] p-3">
                    <div className="text-[12px] leading-[16px] text-[#64748B] mb-1">Deuda Total</div>
                    <div className="font-semibold text-[#0F172A] text-[16px] leading-[24px]">{clasificacion.factores.monto_total_deuda.toFixed(2)}€</div>
                  </div>
                  <div className="bg-[#F8FAFC] rounded-[12px] p-3">
                    <div className="text-[12px] leading-[16px] text-[#64748B] mb-1">Tasa Respuesta</div>
                    <div className="font-semibold text-[#3B82F6] text-[16px] leading-[24px]">{clasificacion.factores.tasa_respuesta}%</div>
                  </div>
                </div>

                {/* Estrategia Sugerida */}
                <div className="bg-[#DBEAFE] border border-[#3B82F6] rounded-[12px] p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <TrendingUp className="w-4 h-4 text-[#3B82F6]" />
                    <span className="text-[14px] leading-[20px] font-semibold text-[#1E40AF]">Estrategia Recomendada</span>
                  </div>
                  <p className="text-[14px] leading-[20px] text-[#1E40AF]">{clasificacion.estrategia_sugerida}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

