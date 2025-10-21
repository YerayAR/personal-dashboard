import adapter from '@sveltejs/adapter-static';
import preprocess from 'svelte-preprocess';

export default {
  preprocess: preprocess(),
  kit: {
    adapter: adapter({
      pages: 'build',
      assets: 'build',
      fallback: 'index.html',
      precompress: false,
      strict: false
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
