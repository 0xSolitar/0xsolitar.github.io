import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://0xsolitar.github.io',
  output: 'static',
  markdown: {
    shikiConfig: {
      theme: 'one-dark-pro',
      wrap: true,
    },
  },
});
