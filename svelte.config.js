import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: vitePreprocess(),
  kit: {
    adapter: adapter({
      pages: 'build',
      assets: 'build',
      fallback: null, // You can specify a fallback page if needed
      precompress: false,
      strict: true
    }),
    paths: {
      base: process.env.NODE_ENV === 'production' ? '/project2' : ''
    },
    prerender: {
      handleHttpError: ({ status, path }) => {
        if (status === 404) {
          // Log the 404 error for reference but don't throw it
          console.warn(`404 error ignored at path: ${path}`);
          return;
        }
        // Throw an error for other statuses
        throw new Error(`HTTP error ${status} at path: ${path}`);
      }
    }
  }
};

export default config;
