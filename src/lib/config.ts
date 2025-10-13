// Configuration file with environment variables and defaults

export const config = {
  // Database configuration
  mongoUri: process.env.MONGODB_URI || '',
  dbName: process.env.DB_NAME || 'personal_dashboard',
  
  // Application configuration
  nodeEnv: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 3000,
  
  // Security configuration
  jwtSecret: process.env.JWT_SECRET || 'dev-secret-key-change-in-production',
  sessionSecret: process.env.SESSION_SECRET || 'dev-session-secret-change-in-production',
  
  // Feature flags
  enableDatabase: !!process.env.MONGODB_URI,
  enableAuth: !!process.env.JWT_SECRET && process.env.NODE_ENV === 'production',
  
  // Rate limiting
  rateLimitWindow: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000'), // 15 minutes
  rateLimitMax: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100'),
};

export const isDevelopment = config.nodeEnv === 'development';
export const isProduction = config.nodeEnv === 'production';

// Validate critical configuration in production
if (isProduction) {
  if (!config.mongoUri) {
    console.warn('⚠️  Warning: No MongoDB URI configured. Database features will be disabled.');
  }
  
  if (config.jwtSecret === 'dev-secret-key-change-in-production') {
    console.warn('⚠️  Warning: Using default JWT secret. Please set JWT_SECRET environment variable.');
  }
}

export default config;