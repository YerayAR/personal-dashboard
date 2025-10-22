/**
 * Mock DB function
 * Esta aplicación usa mockData en lugar de una base de datos real.
 * Este archivo se mantiene para compatibilidad con API endpoints que no se usan.
 */
export async function getDb() {
  return {
    collection: (name: string) => ({
      find: () => ({ toArray: () => Promise.resolve([]) }),
      findOne: () => Promise.resolve(null),
      insertOne: () => Promise.resolve({ insertedId: 'mock-id' }),
      updateOne: () => Promise.resolve({ modifiedCount: 1 }),
      deleteOne: () => Promise.resolve({ deletedCount: 1 })
    })
  };
}
