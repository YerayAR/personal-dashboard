/**
 * Represents a financial transaction.
 */
export type Transaction = {
  _id?: string;
  amount: number;
  category: string;
  type: 'expense' | 'income';
  date: string; // ISO format
  tags?: string[];
};
