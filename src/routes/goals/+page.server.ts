import { getDb } from '$lib/server/db';

export async function load() {
  try {
    const db = await getDb();
    
    const goalsRaw = await db.collection('goals').find({}).toArray();
    const goals = goalsRaw.map(g => ({
      ...g,
      _id: g._id.toString(),
      dueDate: new Date(g.dueDate)
    }));

    return {
      goals
    };
  } catch (error) {
    console.error('Error loading goals:', error);
    return {
      goals: []
    };
  }
}
