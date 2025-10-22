import { mockGoals } from '$lib/data/mockData';

export async function load() {
  try {
    // Usar datos mock para el sitio estático
    const goals = mockGoals.map(g => ({
      ...g,
      _id: g.id,
      dueDate: g.targetDate // Usar el nombre consistente
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
