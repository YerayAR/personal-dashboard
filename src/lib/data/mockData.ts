import type { Transaction } from '../types';

/**
 * Mock data for dashboard visualization
 * This provides realistic sample data for development and demonstration
 */

export const mockTransactions: Transaction[] = [
  // Ingresos del mes actual
  {
    _id: '1',
    amount: 3500,
    category: 'Salario',
    type: 'income',
    date: new Date(2025, 9, 1).toISOString().split('T')[0], // Octubre 2025 (mes actual)
    description: 'Salario mensual'
  },
  {
    _id: '2',
    amount: 800,
    category: 'Freelance',
    type: 'income',
    date: new Date(2025, 9, 15).toISOString().split('T')[0],
    description: 'Proyecto web desarrollo'
  },
  {
    _id: '3',
    amount: 150,
    category: 'Inversiones',
    type: 'income',
    date: new Date(2025, 9, 10).toISOString().split('T')[0],
    description: 'Dividendos acciones'
  },

  // Gastos del mes actual
  {
    _id: '4',
    amount: 1200,
    category: 'Vivienda',
    type: 'expense',
    date: new Date(2025, 9, 1).toISOString().split('T')[0],
    description: 'Alquiler mensual'
  },
  {
    _id: '5',
    amount: 450,
    category: 'Alimentación',
    type: 'expense',
    date: new Date(2025, 9, 5).toISOString().split('T')[0],
    description: 'Compra supermercado'
  },
  {
    _id: '6',
    amount: 89,
    category: 'Transporte',
    type: 'expense',
    date: new Date(2025, 9, 3).toISOString().split('T')[0],
    description: 'Gasolina'
  },
  {
    _id: '7',
    amount: 120,
    category: 'Servicios',
    type: 'expense',
    date: new Date(2025, 9, 2).toISOString().split('T')[0],
    description: 'Internet y móvil'
  },
  {
    _id: '8',
    amount: 75,
    category: 'Entretenimiento',
    type: 'expense',
    date: new Date(2025, 9, 7).toISOString().split('T')[0],
    description: 'Cine y cena'
  },
  {
    _id: '9',
    amount: 200,
    category: 'Alimentación',
    type: 'expense',
    date: new Date(2025, 9, 12).toISOString().split('T')[0],
    description: 'Compra supermercado'
  },
  {
    _id: '10',
    amount: 350,
    category: 'Salud',
    type: 'expense',
    date: new Date(2025, 9, 8).toISOString().split('T')[0],
    description: 'Seguro médico mensual'
  },
  {
    _id: '11',
    amount: 180,
    category: 'Educación',
    type: 'expense',
    date: new Date(2025, 9, 6).toISOString().split('T')[0],
    description: 'Curso online desarrollo'
  },
  {
    _id: '12',
    amount: 95,
    category: 'Ropa',
    type: 'expense',
    date: new Date(2025, 9, 14).toISOString().split('T')[0],
    description: 'Camisa trabajo'
  },

  // Transacciones del mes anterior para mostrar historial
  {
    _id: '13',
    amount: 3500,
    category: 'Salario',
    type: 'income',
    date: new Date(2025, 8, 1).toISOString().split('T')[0], // Septiembre 2025
    description: 'Salario mensual'
  },
  {
    _id: '14',
    amount: 600,
    category: 'Freelance',
    type: 'income',
    date: new Date(2025, 8, 20).toISOString().split('T')[0],
    description: 'Mantenimiento web'
  },
  {
    _id: '15',
    amount: 1200,
    category: 'Vivienda',
    type: 'expense',
    date: new Date(2025, 8, 1).toISOString().split('T')[0],
    description: 'Alquiler mensual'
  },
  {
    _id: '16',
    amount: 380,
    category: 'Alimentación',
    type: 'expense',
    date: new Date(2025, 8, 10).toISOString().split('T')[0],
    description: 'Compra supermercado'
  },
  {
    _id: '17',
    amount: 150,
    category: 'Entretenimiento',
    type: 'expense',
    date: new Date(2025, 8, 15).toISOString().split('T')[0],
    description: 'Salida fin de semana'
  },

  // Más transacciones para datos históricos
  {
    _id: '18',
    amount: 2200,
    category: 'Bonus',
    type: 'income',
    date: new Date(2025, 7, 30).toISOString().split('T')[0], // Agosto
    description: 'Bonus trimestral'
  },
  {
    _id: '19',
    amount: 500,
    category: 'Ahorro',
    type: 'expense',
    date: new Date(2025, 9, 1).toISOString().split('T')[0],
    description: 'Transferencia a ahorros'
  },
  {
    _id: '20',
    amount: 280,
    category: 'Servicios',
    type: 'expense',
    date: new Date(2025, 9, 16).toISOString().split('T')[0],
    description: 'Electricidad y gas'
  }
];

export const mockGoals = [
  {
    id: '1',
    name: 'Fondo de Emergencia',
    targetAmount: 10000,
    currentAmount: 6500,
    targetDate: '2025-12-31',
    category: 'Ahorro',
    description: 'Fondo para gastos inesperados'
  },
  {
    id: '2',
    name: 'Vacaciones Europa',
    targetAmount: 3000,
    currentAmount: 1800,
    targetDate: '2026-07-01',
    category: 'Viaje',
    description: 'Viaje de 2 semanas por Europa'
  },
  {
    id: '3',
    name: 'Laptop Nueva',
    targetAmount: 1500,
    currentAmount: 1200,
    targetDate: '2025-12-15',
    category: 'Tecnología',
    description: 'MacBook Pro para desarrollo'
  },
  {
    id: '4',
    name: 'Curso Especialización',
    targetAmount: 800,
    currentAmount: 250,
    targetDate: '2026-03-01',
    category: 'Educación',
    description: 'Certificación en Cloud Computing'
  }
];

// Utilidades para generar datos aleatorios para demos
export function generateRandomTransaction(): Transaction {
  const categories = {
    income: ['Salario', 'Freelance', 'Inversiones', 'Bonus', 'Venta'],
    expense: ['Alimentación', 'Transporte', 'Vivienda', 'Entretenimiento', 'Salud', 'Educación', 'Servicios', 'Ropa']
  };
  
  const type = Math.random() > 0.3 ? 'expense' : 'income';
  const categoryList = categories[type];
  const category = categoryList[Math.floor(Math.random() * categoryList.length)];
  
  const amount = type === 'income' 
    ? Math.floor(Math.random() * 2000) + 500 // 500-2500 para ingresos
    : Math.floor(Math.random() * 500) + 20;  // 20-520 para gastos
  
  const date = new Date();
  date.setDate(date.getDate() - Math.floor(Math.random() * 30)); // Últimos 30 días
  
  return {
    _id: Math.random().toString(36),
    amount,
    category,
    type,
    date: date.toISOString().split('T')[0],
    description: `${type === 'income' ? 'Ingreso' : 'Gasto'} de ${category}`
  };
}

// Configuración para habilitar/deshabilitar datos mock
export const USE_MOCK_DATA = true;

// Función para obtener transacciones (mock o reales)
export function getTransactions(): Transaction[] {
  if (USE_MOCK_DATA) {
    return mockTransactions;
  }
  // Aquí se conectaría con la API real
  return [];
}

// KPIs calculados a partir de los datos mock
export function calculateKPIs(transactions: Transaction[] = mockTransactions) {
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  
  const currentMonthTransactions = transactions.filter(t => {
    const transactionDate = new Date(t.date);
    return transactionDate.getMonth() === currentMonth && transactionDate.getFullYear() === currentYear;
  });
  
  const totalIncome = currentMonthTransactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);
    
  const totalExpenses = currentMonthTransactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);
  
  const balance = totalIncome - totalExpenses;
  
  // Calcular gastos por categoría
  const expensesByCategory = currentMonthTransactions
    .filter(t => t.type === 'expense')
    .reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {} as Record<string, number>);
  
  return {
    totalIncome,
    totalExpenses,
    balance,
    expensesByCategory,
    transactionCount: currentMonthTransactions.length,
    savingsRate: totalIncome > 0 ? ((balance / totalIncome) * 100).toFixed(1) : '0'
  };
}