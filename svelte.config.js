import adapter from '@sveltejs/adapter-vercel';
import preprocess from 'svelte-preprocess';

export default {
  preprocess: preprocess(),
  kit: {
    adapter: adapter({
      // Enable Edge Runtime for better performance
      runtime: 'nodejs18.x',
      // Configure function regions
      regions: ['iad1'],
      // Memory allocation for functions
      memory: 512
    }),
    // Security configuration
    csrf: {
      checkOrigin: process.env.NODE_ENV === 'production'
    }
  },
};
