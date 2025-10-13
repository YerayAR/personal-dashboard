/**
 * Rate limiting utility for financial APIs
 * Implements sliding window rate limiting to prevent abuse
 */

interface RateLimitEntry {
  count: number;
  resetTime: number;
  timestamps: number[];
}

class RateLimiter {
  private store = new Map<string, RateLimitEntry>();
  private defaultLimit: number;
  private defaultWindowMs: number;

  constructor(defaultLimit = 100, defaultWindowMs = 15 * 60 * 1000) {
    this.defaultLimit = defaultLimit;
    this.defaultWindowMs = defaultWindowMs;
    
    // Clean up expired entries every 5 minutes
    setInterval(() => this.cleanup(), 5 * 60 * 1000);
  }

  /**
   * Check if request should be allowed
   */
  isAllowed(
    identifier: string, 
    limit?: number, 
    windowMs?: number
  ): { allowed: boolean; remaining: number; resetTime: number } {
    const now = Date.now();
    const rateLimitCount = limit ?? this.defaultLimit;
    const windowSize = windowMs ?? this.defaultWindowMs;
    
    let entry = this.store.get(identifier);
    
    if (!entry) {
      entry = {
        count: 0,
        resetTime: now + windowSize,
        timestamps: []
      };
      this.store.set(identifier, entry);
    }

    // Remove timestamps outside the current window
    entry.timestamps = entry.timestamps.filter(timestamp => 
      timestamp > now - windowSize
    );

    // Add current timestamp
    entry.timestamps.push(now);
    entry.count = entry.timestamps.length;

    // Update reset time if necessary
    if (now > entry.resetTime) {
      entry.resetTime = now + windowSize;
    }

    const allowed = entry.count <= rateLimitCount;
    const remaining = Math.max(0, rateLimitCount - entry.count);

    return {
      allowed,
      remaining,
      resetTime: entry.resetTime
    };
  }

  /**
   * Get current usage for identifier
   */
  getUsage(identifier: string): { count: number; remaining: number; resetTime: number } {
    const entry = this.store.get(identifier);
    if (!entry) {
      return {
        count: 0,
        remaining: this.defaultLimit,
        resetTime: Date.now() + this.defaultWindowMs
      };
    }

    const now = Date.now();
    entry.timestamps = entry.timestamps.filter(timestamp => 
      timestamp > now - this.defaultWindowMs
    );
    entry.count = entry.timestamps.length;

    return {
      count: entry.count,
      remaining: Math.max(0, this.defaultLimit - entry.count),
      resetTime: entry.resetTime
    };
  }

  /**
   * Reset rate limit for identifier
   */
  reset(identifier: string): void {
    this.store.delete(identifier);
  }

  /**
   * Clean up expired entries
   */
  private cleanup(): void {
    const now = Date.now();
    for (const [key, entry] of this.store.entries()) {
      // Remove entries that are completely expired
      entry.timestamps = entry.timestamps.filter(timestamp => 
        timestamp > now - this.defaultWindowMs
      );
      
      if (entry.timestamps.length === 0 && now > entry.resetTime) {
        this.store.delete(key);
      }
    }
  }

  /**
   * Get total number of tracked identifiers
   */
  size(): number {
    return this.store.size;
  }
}

// Export singleton instance
export const rateLimiter = new RateLimiter();

/**
 * Create rate limit headers for HTTP responses
 */
export function createRateLimitHeaders(
  limit: number, 
  remaining: number, 
  resetTime: number
): Record<string, string> {
  return {
    'X-RateLimit-Limit': limit.toString(),
    'X-RateLimit-Remaining': remaining.toString(),
    'X-RateLimit-Reset': Math.ceil(resetTime / 1000).toString(),
    'Retry-After': resetTime > Date.now() ? Math.ceil((resetTime - Date.now()) / 1000).toString() : '0'
  };
}

/**
 * Get client identifier for rate limiting
 */
export function getClientIdentifier(request: Request): string {
  // Use X-Forwarded-For header if available (from proxy/CDN)
  const forwardedFor = request.headers.get('x-forwarded-for');
  if (forwardedFor) {
    return forwardedFor.split(',')[0].trim();
  }

  // Use X-Real-IP header if available
  const realIp = request.headers.get('x-real-ip');
  if (realIp) {
    return realIp;
  }

  // Fallback to user-agent + accept-language for some identification
  const userAgent = request.headers.get('user-agent') || 'unknown';
  const acceptLanguage = request.headers.get('accept-language') || 'unknown';
  
  // Create a hash of the combination for anonymization
  return btoa(`${userAgent}-${acceptLanguage}`).substring(0, 16);
}

export default RateLimiter;