import { describe, it, expect } from 'vitest';
import { validateTransaction } from '../../src/lib/server/transactions';

// Example valid transaction used in multiple tests
const base = { amount: 10, category: 'Food', type: 'expense', date: '2024-01-01' };

describe('validateTransaction', () => {
  it('accepts a valid transaction', () => {
    expect(validateTransaction(base)).toBe(true);
  });

  it('rejects invalid amount', () => {
    expect(validateTransaction({ ...base, amount: NaN })).toBe(false);
  });

  it('rejects invalid type', () => {
    // type must be "income" or "expense"
    expect(validateTransaction({ ...base, type: 'other' as any })).toBe(false);
  });

  it('rejects invalid date', () => {
    expect(validateTransaction({ ...base, date: 'invalid' })).toBe(false);
  });
});
