import { mockTransactions } from '$lib/data/mockData';

export async function load() {
  try {
    // Usar datos mock para sitio estático
    const transactions = mockTransactions.map(t => ({
      ...t,
      date: t.date
    }));

    return {
      transactions
    };
  } catch (error) {
    console.error('Error loading transactions for reports:', error);
    return {
      transactions: []
    };
  }
}
