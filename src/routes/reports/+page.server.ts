import { getDb } from '$lib/server/db';

export async function load() {
  try {
    const db = await getDb();
    
    const transactionsRaw = await db.collection('transactions').find({}).toArray();
    const transactions = transactionsRaw.map(t => ({
      ...t,
      _id: t._id.toString(),
      date: new Date(t.date)
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
