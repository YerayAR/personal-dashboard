import adapter from '@sveltejs/adapter-vercel';
import preprocess from 'svelte-preprocess';

export default {
  preprocess: preprocess(),
  kit: {
    adapter: adapter({
      runtime: 'nodejs22.x'
    }),
    prerender: {
      handleHttpError: 'warn'
    },
    // Security configuration
    csrf: {
      trustedOrigins: process.env.NODE_ENV === 'production' ? ['auto'] : ['auto', 'http://localhost:*']
    }
  },
};
