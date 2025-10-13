import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
  try {
    // Basic health check
    const healthCheck = {
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV || 'development',
      version: '0.0.1',
      memory: {
        used: Math.round(process.memoryUsage().heapUsed / 1024 / 1024 * 100) / 100,
        total: Math.round(process.memoryUsage().heapTotal / 1024 / 1024 * 100) / 100
      },
      database: {
        status: 'connected' // You can enhance this with actual DB ping
      }
    };

    return json(healthCheck, {
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    });
  } catch (error) {
    console.error('Health check failed:', error);
    return json(
      { 
        status: 'error', 
        message: 'Health check failed',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
};

// Only allow GET requests
export const POST: RequestHandler = async () => {
  return json(
    { error: 'Method not allowed' },
    { status: 405, headers: { Allow: 'GET' } }
  );
};

export const PUT: RequestHandler = async () => {
  return json(
    { error: 'Method not allowed' },
    { status: 405, headers: { Allow: 'GET' } }
  );
};

export const DELETE: RequestHandler = async () => {
  return json(
    { error: 'Method not allowed' },
    { status: 405, headers: { Allow: 'GET' } }
  );
};