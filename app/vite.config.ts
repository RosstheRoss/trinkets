import { purgeCss } from 'vite-plugin-tailwind-purgecss'
import { sveltekit } from '@sveltejs/kit/vite'
import { defineConfig } from 'vite'
import { SvelteKitPWA } from '@vite-pwa/sveltekit'

export default defineConfig({
  build: {
    sourcemap: true,
  },
  css: {
    devSourcemap: true,
  },
  plugins: [
    sveltekit(),
    purgeCss(),
    SvelteKitPWA({
      devOptions: {
        enabled: true,
        type: 'module',
      },
      manifest: {
        name: "RossTheRoss' Personal Tools",
        short_name: 'Random Dumping Ground',
        description: "A collection of tools I've made",
        display: 'fullscreen',
        display_override: ['window-controls-overlay', 'standalone', 'minimal-ui'],
        icons: [
          {
            src: 'favicon.svg',
            sizes: 'any',
            type: 'image/svg+xml',
            purpose: 'maskable',
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
        id: 'trinkets',
        start_url: '.',
        theme_color: '#000000',
      },
      registerType: 'prompt',
      workbox: {
        globPatterns: ['client/**/*.{js,css,html,svg}'],
        cleanupOutdatedCaches: true,
      },
    }),
  ],
})
