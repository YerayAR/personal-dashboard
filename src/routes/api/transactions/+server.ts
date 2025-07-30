import { getDb } from '$lib/server/db';
import { json } from '@sveltejs/kit';

export async function GET() {
  try {
    const db = await getDb();
    const transactions = await db.collection('transactions').find({}).sort({ date: -1 }).toArray();
    return json({ transactions }, { status: 200 });
  } catch (error) {
    return json({ error: 'Error al obtener transacciones' }, { status: 500 });
  }
}

export async function POST({ request }) {
  try {
    const db = await getDb();
    const transaction = await request.json();

    const result = await db.collection('transactions').insertOne(transaction);

    return json({ id: result.insertedId }, { status: 201 });
  } catch (error) {
    return json({ error: 'Error al guardar la transacción' }, { status: 500 });
  }
}
