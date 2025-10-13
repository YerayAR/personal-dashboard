import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
  try {
    const healthCheck = {
      status: 'ok',
      timestamp: new Date().toISOString(),
      service: 'personal-dashboard',
      version: '0.0.1',
      environment: 'production'
    };

    return json(healthCheck, {
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
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