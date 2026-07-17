import { defineConfig } from 'astro/config';
export default defineConfig({
  site: 'https://kteokonta.com',
  outDir: '../dist',
  build: { format: 'directory', inlineStylesheets: 'always' }
});
