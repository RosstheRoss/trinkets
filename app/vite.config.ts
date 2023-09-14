import { purgeCss } from 'vite-plugin-tailwind-purgecss';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { SvelteKitPWA } from '@vite-pwa/sveltekit';

export default defineConfig({
  build: {
    sourcemap: true
  },
  css: {
    devSourcemap: true,
  },
  plugins: [
    sveltekit(),
    purgeCss(),
    SvelteKitPWA({
      registerType: 'autoUpdate'
    })
  ]
});
