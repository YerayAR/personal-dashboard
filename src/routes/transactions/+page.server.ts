import { getDb } from '$lib/server/db';

export async function load() {
  try {
    const db = await getDb();
    
    const transactionsRaw = await db.collection('transactions').find({}).sort({ date: -1 }).toArray();
    const transactions = transactionsRaw.map(t => ({
      ...t,
      _id: t._id.toString(),
      date: new Date(t.date)
    }));

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
