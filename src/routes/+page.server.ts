import { getDb } from '$lib/server/db';

export async function load() {
  try {
    const db = await getDb();
    
    // Obtener todas las transacciones
    const transactionsRaw = await db.collection('transactions').find({}).toArray();
    const transactions = transactionsRaw.map(t => ({
      ...t,
      _id: t._id.toString(),
      date: new Date(t.date)
    }));
    
    // Calcular métricas
    const balance = transactions.reduce((sum, t) => sum + t.amount, 0);
    
    // Calcular ingresos y gastos del mes actual
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    
    const currentMonthTransactions = transactions.filter(t => {
      const transactionDate = new Date(t.date);
      return transactionDate.getMonth() === currentMonth && 
             transactionDate.getFullYear() === currentYear;
    });
    
    const monthlyIncome = currentMonthTransactions
      .filter(t => t.amount > 0)
      .reduce((sum, t) => sum + t.amount, 0);
    
    const monthlyExpenses = currentMonthTransactions
      .filter(t => t.amount < 0)
      .reduce((sum, t) => sum + Math.abs(t.amount), 0);
    
    const netFlow = monthlyIncome - monthlyExpenses;
    
    // Datos del mes anterior para calcular cambios
    const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    const lastMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear;
    
    const lastMonthTransactions = transactions.filter(t => {
      const transactionDate = new Date(t.date);
      return transactionDate.getMonth() === lastMonth && 
             transactionDate.getFullYear() === lastMonthYear;
    });
    
    const lastMonthIncome = lastMonthTransactions
      .filter(t => t.amount > 0)
      .reduce((sum, t) => sum + t.amount, 0);
    
    const lastMonthExpenses = lastMonthTransactions
      .filter(t => t.amount < 0)
      .reduce((sum, t) => sum + Math.abs(t.amount), 0);
    
    const lastMonthNetFlow = lastMonthIncome - lastMonthExpenses;
    
    // Calcular cambios
    const incomeChange = monthlyIncome - lastMonthIncome;
    const expenseChange = lastMonthExpenses - monthlyExpenses; // Positivo = menos gastos
    const netFlowChange = netFlow - lastMonthNetFlow;
    
    // Preparar datos para gráficos
    const flowChartData = {
      labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
      datasets: [
        {
          label: 'Ingresos',
          backgroundColor: '#2ecc71',
          borderColor: '#2ecc71',
          data: Array(12).fill(0).map((_, i) => transactions.filter(t => new Date(t.date).getMonth() === i && t.amount > 0).reduce((sum, t) => sum + t.amount, 0)),
        },
        {
          label: 'Gastos',
          backgroundColor: '#e74c3c',
          borderColor: '#e74c3c',
          data: Array(12).fill(0).map((_, i) => transactions.filter(t => new Date(t.date).getMonth() === i && t.amount < 0).reduce((sum, t) => sum + Math.abs(t.amount), 0)),
        }
      ]
    };
    
    const expenseCategories = transactions
      .filter(t => t.amount < 0)
      .reduce((acc, t) => {
        acc[t.category] = (acc[t.category] || 0) + Math.abs(t.amount);
        return acc;
      }, {});
      
    const categoryChartData = {
      labels: Object.keys(expenseCategories),
      datasets: [
        {
          data: Object.values(expenseCategories),
          backgroundColor: ['#e74c3c', '#f39c12', '#f1c40f', '#3498db', '#9b59b6', '#1abc9c', '#34495e'],
        },
      ],
    };

    return {
      kpiData: {
        balance: { 
          title: 'Balance Actual', 
          value: balance, 
          change: 0, 
          trend: balance > 0 ? 'up' : 'down' 
        },
        income: { 
          title: 'Ingresos Mensuales', 
          value: monthlyIncome, 
          change: incomeChange, 
          trend: incomeChange >= 0 ? 'up' : 'down' 
        },
        expenses: { 
          title: 'Gastos Mensuales', 
          value: monthlyExpenses, 
          change: expenseChange, 
          trend: expenseChange >= 0 ? 'up' : 'down' 
        },
        netFlow: { 
          title: 'Flujo Neto', 
          value: netFlow, 
          change: netFlowChange, 
          trend: netFlowChange >= 0 ? 'up' : 'down' 
        }
      },
      transactions: transactions.slice(0, 5), // Últimas 5 transacciones
      flowChartData,
      categoryChartData
    };
  } catch (error) {
    console.error('Error loading dashboard data:', error);
    return {
      kpiData: {
        balance: { title: 'Balance Actual', value: 0, change: 0, trend: 'neutral' },
        income: { title: 'Ingresos Mensuales', value: 0, change: 0, trend: 'neutral' },
        expenses: { title: 'Gastos Mensuales', value: 0, change: 0, trend: 'neutral' },
        netFlow: { title: 'Flujo Neto', value: 0, change: 0, trend: 'neutral' }
      },
      transactions: [],
      flowChartData: { labels: [], datasets: [] },
      categoryChartData: { labels: [], datasets: [] },
    };
  }
}
