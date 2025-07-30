import { getDb } from '$lib/server/db';
import { json } from '@sveltejs/kit';
import {
  validateTransaction,
  createTransaction,
  listTransactions,
  updateTransaction,
  deleteTransaction
} from '$lib/server/transactions';

export async function GET() {
  try {
    const db = await getDb();
    const transactions = await listTransactions(db);
    return json({ transactions }, { status: 200 });
  } catch (error) {
    return json({ error: 'Error al obtener transacciones' }, { status: 500 });
  }
}

export async function POST({ request }) {
  try {
    const db = await getDb();
    const transaction = await request.json();

    if (!validateTransaction(transaction)) {
      return json({ error: 'Datos de transacción inválidos' }, { status: 400 });
    }

    const id = await createTransaction(db, transaction);

    return json({ id }, { status: 201 });
  } catch (error) {
    return json({ error: 'Error al guardar la transacción' }, { status: 500 });
  }
}

export async function PUT({ request }) {
  try {
    const db = await getDb();
    const body = await request.json();
    const { id, ...data } = body;
    if (!id) return json({ error: 'ID requerido' }, { status: 400 });
    await updateTransaction(db, id, data);
    return json({ ok: true }, { status: 200 });
  } catch (error) {
    return json({ error: 'Error al actualizar transacción' }, { status: 500 });
  }
}

export async function DELETE({ url }) {
  try {
    const db = await getDb();
    const id = url.searchParams.get('id');
    if (!id) return json({ error: 'ID requerido' }, { status: 400 });
    await deleteTransaction(db, id);
    return json({ ok: true }, { status: 200 });
  } catch (error) {
    return json({ error: 'Error al eliminar transacción' }, { status: 500 });
  }
}
