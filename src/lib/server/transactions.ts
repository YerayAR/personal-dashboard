import { ObjectId, type Db } from 'mongodb';
import type { Transaction } from '../types';

/**
 * Validates a transaction ensuring amount, type and date are correct.
 */
export function validateTransaction(t: Transaction): boolean {
  if (typeof t.amount !== 'number' || Number.isNaN(t.amount)) return false;
  if (t.type !== 'income' && t.type !== 'expense') return false;
  if (!t.date || Number.isNaN(Date.parse(t.date))) return false;
  return true;
}

/** Inserts a new transaction and returns its id. */
export async function createTransaction(db: Db, t: Transaction) {
  const result = await db.collection('transactions').insertOne(t);
  return result.insertedId.toString();
}

/** Returns all transactions sorted by date desc. */
export async function listTransactions(db: Db): Promise<Transaction[]> {
  const raw = await db.collection('transactions').find({}).sort({ date: -1 }).toArray();
  return raw.map((t: any) => ({ ...t, _id: t._id.toString(), date: new Date(t.date).toISOString() }));
}

/** Updates a transaction by id. Returns true if modified. */
export async function updateTransaction(db: Db, id: string, data: Partial<Transaction>) {
  const result = await db.collection('transactions').updateOne({ _id: new ObjectId(id) }, { $set: data });
  return result.modifiedCount > 0;
}

/** Deletes a transaction by id. Returns true if removed. */
export async function deleteTransaction(db: Db, id: string) {
  const result = await db.collection('transactions').deleteOne({ _id: new ObjectId(id) });
  return result.deletedCount > 0;
}
