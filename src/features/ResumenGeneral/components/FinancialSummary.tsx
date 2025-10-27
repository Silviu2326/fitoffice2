import { TrendingUp, TrendingDown, DollarSign } from 'lucide-react';
import { Card, CardHeader, CardTitle } from '../../../components/ui';

/**
 * FinancialSummary - Resumen de ingresos, gastos y transacciones
 * Actualizado según guía de estilos FitOffice v2.0
 */
export default function FinancialSummary() {
  const financialData = {
    totalIncome: 12450,
    totalExpenses: 4230,
    netProfit: 8220,
    monthlyGrowth: 15.3
  };

  const transactions = [
    { type: 'income', amount: 150, description: 'Cuota mensual - Ana M.', time: 'Hoy, 10:30' },
    { type: 'income', amount: 45, description: 'Sesión individual - Juan P.', time: 'Hoy, 09:15' },
    { type: 'expense', amount: -85, description: 'Material deportivo', time: 'Ayer, 16:45' },
    { type: 'income', amount: 200, description: 'Pack 10 sesiones - María G.', time: 'Ayer, 12:20' }
  ];

  return (
    <Card className="bg-[#1E1E2E] border-[#334155]">
      <CardHeader>
        <div className="flex items-center gap-2">
          <DollarSign className="w-5 h-5 text-[#10B981]" />
          <CardTitle className="text-[#F1F5F9]">Resumen Financiero</CardTitle>
        </div>
      </CardHeader>

      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-[#2A2A3A] rounded-xl p-4 border border-[#334155]">
          <p className="text-[#94A3B8] text-xs font-medium mb-2">Ingresos</p>
          <p className="text-[#F1F5F9] text-lg font-bold">€{financialData.totalIncome.toLocaleString()}</p>
          <div className="flex items-center gap-1 mt-2">
            <TrendingUp className="w-3 h-3 text-[#10B981]" />
            <span className="text-[#10B981] text-xs font-semibold">+{financialData.monthlyGrowth}%</span>
          </div>
        </div>
        <div className="bg-[#2A2A3A] rounded-xl p-4 border border-[#334155]">
          <p className="text-[#94A3B8] text-xs font-medium mb-2">Gastos</p>
          <p className="text-[#F1F5F9] text-lg font-bold">€{financialData.totalExpenses.toLocaleString()}</p>
          <div className="flex items-center gap-1 mt-2">
            <TrendingDown className="w-3 h-3 text-[#EF4444]" />
            <span className="text-[#EF4444] text-xs font-semibold">-8%</span>
          </div>
        </div>
        <div className="bg-gradient-to-br from-[#10B981] to-[#059669] rounded-xl p-4 shadow-md">
          <p className="text-[#D1FAE5] text-xs font-medium mb-2">Beneficio</p>
          <p className="text-white text-lg font-bold">€{financialData.netProfit.toLocaleString()}</p>
          <div className="flex items-center gap-1 mt-2">
            <TrendingUp className="w-3 h-3 text-white" />
            <span className="text-white text-xs font-semibold">+23%</span>
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div>
        <h3 className="text-[#F1F5F9] font-semibold text-sm mb-3">Transacciones Recientes</h3>
        <div className="space-y-2">
          {transactions.map((transaction, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 bg-[#2A2A3A] rounded-xl border border-[#334155] hover:border-[#6366F1] transition-all duration-200"
            >
              <div className="flex-1">
                <p className="text-[#F1F5F9] text-sm font-medium">{transaction.description}</p>
                <p className="text-[#94A3B8] text-xs">{transaction.time}</p>
              </div>
              <span
                className={`font-bold text-sm ${
                  transaction.type === 'income' ? 'text-[#10B981]' : 'text-[#EF4444]'
                }`}
              >
                {transaction.amount > 0 ? '+' : ''}€{Math.abs(transaction.amount)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}

