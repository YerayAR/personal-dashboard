/**
 * Security utilities for input validation and sanitization
 */

/**
 * Sanitizes string input to prevent XSS attacks
 */
export function sanitizeString(input: string): string {
  if (!input || typeof input !== 'string') return '';
  
  return input
    .trim()
    .replace(/[<>\"'&]/g, (match) => {
      const entityMap: Record<string, string> = {
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#x27;',
        '&': '&amp;'
      };
      return entityMap[match];
    });
}

/**
 * Validates and sanitizes transaction amount
 */
export function validateAmount(amount: any): number | null {
  if (amount === null || amount === undefined) return null;
  
  const num = Number(amount);
  if (Number.isNaN(num) || !Number.isFinite(num)) return null;
  if (num < 0 || num > 1000000) return null; // Reasonable limits
  
  // Round to 2 decimal places
  return Math.round(num * 100) / 100;
}

/**
 * Validates transaction type
 */
export function validateTransactionType(type: any): 'income' | 'expense' | null {
  if (type !== 'income' && type !== 'expense') return null;
  return type;
}

/**
 * Validates and sanitizes date input
 */
export function validateDate(dateString: any): string | null {
  if (!dateString || typeof dateString !== 'string') return null;
  
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return null;
  
  // Don't allow dates too far in the future or past
  const now = new Date();
  const tenYearsAgo = new Date(now.getFullYear() - 10, now.getMonth(), now.getDate());
  const oneYearFromNow = new Date(now.getFullYear() + 1, now.getMonth(), now.getDate());
  
  if (date < tenYearsAgo || date > oneYearFromNow) return null;
  
  return date.toISOString().split('T')[0];
}

/**
 * Validates category name
 */
export function validateCategory(category: any): string | null {
  if (!category || typeof category !== 'string') return null;
  
  const sanitized = sanitizeString(category);
  if (sanitized.length < 1 || sanitized.length > 50) return null;
  
  // Only allow alphanumeric, spaces, and common punctuation
  if (!/^[a-zA-Z0-9\s\-_.,!?]+$/.test(sanitized)) return null;
  
  return sanitized;
}

/**
 * Rate limiting for API endpoints
 */
export class RateLimiter {
  private requests: Map<string, number[]> = new Map();
  private readonly maxRequests: number;
  private readonly windowMs: number;

  constructor(maxRequests = 10, windowMs = 60000) {
    this.maxRequests = maxRequests;
    this.windowMs = windowMs;
  }

  isAllowed(identifier: string): boolean {
    const now = Date.now();
    const requests = this.requests.get(identifier) || [];
    
    // Remove old requests
    const validRequests = requests.filter(time => now - time < this.windowMs);
    
    if (validRequests.length >= this.maxRequests) {
      return false;
    }
    
    validRequests.push(now);
    this.requests.set(identifier, validRequests);
    return true;
  }
}