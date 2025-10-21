// import { ObjectId, type Db } from 'mongodb';
import type { Transaction } from '../types';
import { 
  validateAmount, 
  validateTransactionType, 
  validateDate, 
  validateCategory 
} from '../utils/security';

// Temporary mock types for deployment
type Db = any;
class ObjectId {
  constructor(id: string) {}
}

/**
 * Validates and sanitizes a transaction ensuring all fields are secure.
 */
export function validateTransaction(t: any): Transaction | null {
  const amount = validateAmount(t.amount);
  const type = validateTransactionType(t.type);
  const date = validateDate(t.date);
  const category = validateCategory(t.category);
  
  if (amount === null || type === null || date === null || category === null) {
    return null;
  }
  
  return {
    amount,
    type,
    date,
    category,
    _id: t._id // Preserve ID if it exists
  };
}

/** Inserts a new transaction and returns its id. */
export async function createTransaction(db: Db, t: any) {
  const validTransaction = validateTransaction(t);
  if (!validTransaction) {
    throw new Error('Invalid transaction data');
  }
  
  const result = await db.collection('transactions').insertOne(validTransaction);
  return result.insertedId.toString();
}

/** Returns all transactions sorted by date desc. */
export async function listTransactions(db: Db): Promise<Transaction[]> {
  const raw = await db.collection('transactions').find({}).sort({ date: -1 }).toArray();
  return raw.map((t: any) => ({ ...t, _id: t._id.toString(), date: new Date(t.date).toISOString() }));
}

/** Updates a transaction by id. Returns true if modified. */
export async function updateTransaction(db: Db, id: string, data: any) {
  // Validate ID format
  if (!id || typeof id !== 'string' || id.length < 12) {
    throw new Error('Invalid transaction ID');
  }
  
  const validTransaction = validateTransaction(data);
  if (!validTransaction) {
    throw new Error('Invalid transaction data');
  }
  
  const result = await db.collection('transactions').updateOne(
    { _id: new ObjectId(id) }, 
    { $set: validTransaction }
  );
  return result.modifiedCount > 0;
}

/** Deletes a transaction by id. Returns true if removed. */
export async function deleteTransaction(db: Db, id: string) {
  // Validate ID format
  if (!id || typeof id !== 'string' || id.length < 12) {
    throw new Error('Invalid transaction ID');
  }
  
  const result = await db.collection('transactions').deleteOne({ _id: new ObjectId(id) });
  return result.deletedCount > 0;
}
