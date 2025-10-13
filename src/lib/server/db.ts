// MongoDB temporarily disabled for deployment
// import { MongoClient } from 'mongodb';
// import { MONGODB_URI, DB_NAME } from '$env/static/private';

// let client: MongoClient;

/**
 * Temporary mock DB function for deployment
 */
export async function getDb() {
  // Return a mock object for deployment
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
