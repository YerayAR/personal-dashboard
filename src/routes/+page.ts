import { mockTransactions, mockGoals, calculateKPIs, USE_MOCK_DATA } from '$lib/data/mockData';
import { groupTransactionsByCategory } from '$lib/utils/common';

export async function load() {
  try {
    // Usar datos mock para el sitio estático
    const transactions = mockTransactions.map(t => ({
      ...t,
      date: new Date(t.date)
    }));
    
    // Calcular métricas usando utilidades
    const kpis = calculateKPIs(mockTransactions);
    
    // Calcular balance total
    const balance = mockTransactions.reduce((sum, t) => {
      return sum + (t.type === 'income' ? t.amount : -t.amount);
    }, 0);
    
    const monthlyIncome = kpis.totalIncome;
    const monthlyExpenses = kpis.totalExpenses;
    
    const netFlow = kpis.balance;
    
    // Cambios simulados para demo
    const incomeChange = 450; // +12.8% respecto al mes anterior
    const expenseChange = -230; // +8.2% más gastos
    const netFlowChange = 680; // +35% mejor flujo neto
    
    // Preparar datos para gráficos con datos más realistas
    const monthlyIncomeData = [3200, 3500, 3800, 3500, 3700, 4200, 3900, 3600, 3800, 4100, 4450, 0];
    const monthlyExpenseData = [2800, 3100, 3200, 2950, 3400, 3800, 3500, 3200, 3300, 3900, 2759, 0];
    
    const flowChartData = {
      labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
      datasets: [
        {
          label: 'Ingresos',
          backgroundColor: '#10b981',
          borderColor: '#10b981',
          data: monthlyIncomeData,
        },
        {
          label: 'Gastos',
          backgroundColor: '#ef4444',
          borderColor: '#ef4444',
          data: monthlyExpenseData,
        }
      ]
    };
    
    // Usar datos de categorías de mockData
    const categoryChartData = {
      labels: Object.keys(kpis.expensesByCategory),
      datasets: [
        {
          data: Object.values(kpis.expensesByCategory),
          backgroundColor: [
            '#ef4444', // Rojo
            '#f59e0b', // Amarillo
            '#10b981', // Verde
            '#3b82f6', // Azul
            '#8b5cf6', // Púrpura
            '#06b6d4', // Cian
            '#84cc16', // Lima
            '#f97316'  // Naranja
          ],
        },
      ],
    };

    return {
      kpiData: {
        balance: { 
          title: 'Balance Actual', 
          value: balance, 
          change: netFlowChange, 
          trend: balance > 0 ? 'up' : 'down',
          format: 'currency'
        },
        income: { 
          title: 'Ingresos Mensuales', 
          value: monthlyIncome, 
          change: incomeChange, 
          trend: incomeChange >= 0 ? 'up' : 'down',
          format: 'currency' 
        },
        expenses: { 
          title: 'Gastos Mensuales', 
          value: monthlyExpenses, 
          change: expenseChange, 
          trend: expenseChange <= 0 ? 'up' : 'down',
          format: 'currency' 
        },
        netFlow: { 
          title: 'Flujo Neto', 
          value: netFlow, 
          change: netFlowChange, 
          trend: netFlowChange >= 0 ? 'up' : 'down',
          format: 'currency' 
        },
        savingsRate: {
          title: 'Tasa de Ahorro',
          value: parseFloat(kpis.savingsRate),
          change: 5.2,
          trend: 'up',
          format: 'percentage'
        }
      },
      transactions: mockTransactions.slice(0, 8), // Últimas transacciones
      goals: mockGoals,
      flowChartData,
      categoryChartData,
      statistics: {
        totalTransactions: mockTransactions.length,
        avgMonthlyIncome: 3800,
        avgMonthlyExpenses: 3200,
        topCategory: 'Vivienda',
        monthlyGrowth: 8.5
      }
    };
  } catch (error) {
    console.error('Error loading dashboard data:', error);
    // En caso de error, usar datos mock como fallback
    const fallbackKpis = calculateKPIs(mockTransactions);
    return {
      kpiData: {
        balance: { title: 'Balance Actual', value: 0, change: 0, trend: 'neutral', format: 'currency' },
        income: { title: 'Ingresos Mensuales', value: 0, change: 0, trend: 'neutral', format: 'currency' },
        expenses: { title: 'Gastos Mensuales', value: 0, change: 0, trend: 'neutral', format: 'currency' },
        netFlow: { title: 'Flujo Neto', value: 0, change: 0, trend: 'neutral', format: 'currency' },
        savingsRate: { title: 'Tasa de Ahorro', value: 0, change: 0, trend: 'neutral', format: 'percentage' }
      },
      transactions: mockTransactions.slice(0, 5),
      goals: mockGoals,
      flowChartData: { 
        labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'], 
        datasets: []
      },
      categoryChartData: { 
        labels: Object.keys(fallbackKpis.expensesByCategory), 
        datasets: [{ data: Object.values(fallbackKpis.expensesByCategory), backgroundColor: ['#ef4444', '#f59e0b'] }]
      },
      statistics: {
        totalTransactions: mockTransactions.length,
        avgMonthlyIncome: 0,
        avgMonthlyExpenses: 0,
        topCategory: 'N/A',
        monthlyGrowth: 0
      }
    };
  }
}
