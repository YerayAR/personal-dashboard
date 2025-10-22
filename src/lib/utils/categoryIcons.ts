export const categoryIcons: Record<string, string> = {
  // Gastos
  'Alimentación': 'food',
  'Transporte': 'car',
  'Vivienda': 'home',
  'Entretenimiento': 'entertainment',
  'Compras': 'shopping',
  'Salud': 'health',
  'Educación': 'filetext',
  'Otros': 'list',
  
  // Ingresos
  'Salario': 'briefcase',
  'Inversiones': 'trending-up',
  'Freelance': 'dollar',
  'Bonus': 'target',
};

export function getCategoryIcon(category: string): string {
  return categoryIcons[category] || 'wallet';
}

export const categoryColors: Record<string, string> = {
  // Gastos - colores cálidos
  'Alimentación': '#f97316',
  'Transporte': '#8b5cf6',
  'Vivienda': '#0ea5e9',
  'Entretenimiento': '#ec4899',
  'Compras': '#f59e0b',
  'Salud': '#ef4444',
  'Educación': '#3b82f6',
  'Otros': '#64748b',
  
  // Ingresos - colores verdes
  'Salario': '#10b981',
  'Inversiones': '#059669',
  'Freelance': '#14b8a6',
  'Bonus': '#22c55e',
};

export function getCategoryColor(category: string): string {
  return categoryColors[category] || '#64748b';
}
