import { mockTransactions } from '$lib/data/mockData';

export async function load() {
  try {
    // Usar datos mock para el sitio estático
    const transactions = mockTransactions
      .map(t => ({
        ...t,
        date: t.date // Ya está en formato ISO string
      }))
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    // Obtener categorías únicas
    const categories = [...new Set(transactions.map(t => t.category))];

    return {
      transactions,
      categories
    };
  } catch (error) {
    console.error('Error loading transactions:', error);
    return {
      transactions: [],
      categories: []
    };
  }
}
