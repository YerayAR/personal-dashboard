import type { RequestHandler } from '@sveltejs/kit';
import type { Transaction } from '$lib/types';
import { getDb } from '$lib/server/db';

/**
 * Handles creation of a transaction.
 */
export const POST: RequestHandler = async ({ request }) => {
  const body: Transaction = await request.json();
  const db = await getDb();
  const res = await db.collection('transactions').insertOne(body);
  return new Response(JSON.stringify(res), { status: 201 });
};

/**
 * Returns all transactions.
 */
export const GET: RequestHandler = async () => {
  const db = await getDb();
  const items = await db.collection('transactions').find().toArray();
  return new Response(JSON.stringify(items));
};
