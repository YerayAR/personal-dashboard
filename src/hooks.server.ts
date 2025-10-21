import type { Handle } from '@sveltejs/kit';
import { RateLimiter } from '$lib/utils/security';

// Rate limiter instance
const rateLimiter = new RateLimiter(50, 60000); // 50 requests per minute

export const handle: Handle = async ({ event, resolve }) => {
  // Skip rate limiting during prerendering
  if (event.url.pathname.startsWith('/api/') && event.getClientAddress) {
    try {
      const clientIP = event.getClientAddress();
      if (!rateLimiter.isAllowed(clientIP)) {
        return new Response('Too Many Requests', { status: 429 });
      }
    } catch (e) {
      // Ignore during prerendering
    }
  }

  const response = await resolve(event);

  // Add security headers
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set(
    'Content-Security-Policy',
    "default-src 'self'; " +
    "script-src 'self' 'unsafe-inline' 'unsafe-eval'; " +
    "style-src 'self' 'unsafe-inline'; " +
    "img-src 'self' data: https:; " +
    "font-src 'self'; " +
    "connect-src 'self'; " +
    "frame-ancestors 'none';"
  );
  
  // Remove server information
  response.headers.delete('Server');
  
  return response;
};