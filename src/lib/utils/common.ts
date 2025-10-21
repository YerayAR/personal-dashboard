/**
 * Common utilities to reduce code duplication across components
 */

/**
 * Formats currency amounts consistently across the app
 */
export function formatCurrency(amount: number, currency = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount);
}

/**
 * Formats dates consistently across the app
 */
export function formatDate(date: string | Date, format: 'short' | 'long' = 'short'): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  if (format === 'long') {
    return dateObj.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
  
  return dateObj.toLocaleDateString('en-US');
}

/**
 * Capitalizes the first letter of a string
 */
export function capitalize(str: string): string {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

/**
 * Truncates text to specified length with ellipsis
 */
export function truncateText(text: string, maxLength: number): string {
  if (!text || text.length <= maxLength) return text;
  return text.substring(0, maxLength - 3) + '...';
}

/**
 * Debounce function for search inputs
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
}

/**
 * Generates consistent CSS classes for transaction types
 */
export function getTransactionTypeClass(type: 'income' | 'expense'): string {
  return type === 'income' 
    ? 'text-green-600 bg-green-50 border-green-200'
    : 'text-red-600 bg-red-50 border-red-200';
}

/**
 * Calculates the percentage of a value relative to a total
 */
export function calculatePercentage(value: number, total: number): number {
  if (total === 0) return 0;
  return Math.round((value / total) * 100);
}

/**
 * Groups transactions by category for charts
 */
export function groupTransactionsByCategory(transactions: any[]): Record<string, number> {
  return transactions.reduce((acc, transaction) => {
    const category = transaction.category || 'Other';
    acc[category] = (acc[category] || 0) + Math.abs(transaction.amount);
    return acc;
  }, {} as Record<string, number>);
}

/**
 * Filters transactions by date range
 */
export function filterTransactionsByDateRange(
  transactions: any[],
  startDate: string,
  endDate: string
): any[] {
  const start = new Date(startDate);
  const end = new Date(endDate);
  
  return transactions.filter(transaction => {
    const transactionDate = new Date(transaction.date);
    return transactionDate >= start && transactionDate <= end;
  });
}