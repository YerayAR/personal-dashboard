import { describe, it, expect, beforeEach, vi } from 'vitest';
import { GET, POST, PUT, DELETE } from '../../src/routes/api/transactions/+server';
import * as dbMod from '../../src/lib/server/db';

// Simple in-memory collection used to mock MongoDB methods
const store: any[] = [];

const mockDb = {
  collection: () => ({
    find: () => ({ sort: () => ({ toArray: async () => store }) }),
    insertOne: async (doc: any) => {
      const newDoc = { ...doc, _id: String(store.length + 1) };
      store.push(newDoc);
      return { insertedId: newDoc._id };
    },
    updateOne: async (filter: any, update: any) => {
      const idx = store.findIndex((d) => d._id === String(filter._id));
      if (idx >= 0) {
        store[idx] = { ...store[idx], ...update.$set };
        return { modifiedCount: 1 };
      }
      return { modifiedCount: 0 };
    },
    deleteOne: async (filter: any) => {
      const idx = store.findIndex((d) => d._id === String(filter._id));
      if (idx >= 0) {
        store.splice(idx, 1);
        return { deletedCount: 1 };
      }
      return { deletedCount: 0 };
    }
  })
};

// Mock getDb to return our in-memory DB
vi.spyOn(dbMod, 'getDb').mockResolvedValue(mockDb as any);

beforeEach(() => {
  store.length = 0; // reset between tests
});

describe('transactions API endpoints', () => {
  it('creates and lists transactions', async () => {
    await POST({ request: new Request('http://test', { method: 'POST', body: JSON.stringify({ amount: 5, category: 'Food', type: 'expense', date: '2024-01-02' }), headers: { 'Content-Type': 'application/json' } }) });

    const res = await GET();
    const body = await res.json();
    expect(body.transactions.length).toBe(1);
  });

  it('updates a transaction', async () => {
    const create = await POST({ request: new Request('http://t', { method: 'POST', body: JSON.stringify({ amount: 1, category: 'Food', type: 'expense', date: '2024-01-02' }), headers: { 'Content-Type': 'application/json' } }) });
    const created = await create.json();

    await PUT({ request: new Request('http://t', { method: 'PUT', body: JSON.stringify({ id: created.id, category: 'Drink' }), headers: { 'Content-Type': 'application/json' } }) });

    const res = await GET();
    const body = await res.json();
    expect(body.transactions[0].category).toBe('Drink');
  });

  it('deletes a transaction', async () => {
    const create = await POST({ request: new Request('http://t', { method: 'POST', body: JSON.stringify({ amount: 3, category: 'X', type: 'income', date: '2024-01-02' }), headers: { 'Content-Type': 'application/json' } }) });
    const created = await create.json();

    await DELETE({ url: new URL('http://t?id=' + created.id) });

    const res = await GET();
    const body = await res.json();
    expect(body.transactions.length).toBe(0);
  });
});
