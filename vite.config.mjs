// vite.config.mjs

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import path from 'path';
import manifest from './manifest.json';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      manifest,
      includeAssets: ['favicon.svg', 'favicon.ico', 'robots.txt', 'apple-touch-icon.png'],
      devOptions: {
        enabled: false,
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html}', '**/*.{svg,png,jpg,gif}'],
      },
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve('./src'),
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    files: ['src/**/*.test.tsx'],
    exclude: ['./tests/playwright', './node_modules/**', './functions/**'],
  },
  server: {
    host: true,
    port: 3000,
  },
});
