import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// GitHub Pages serves this app from https://<user>.github.io/TUT-Student-Marketplace/
// so every asset URL must be prefixed with that sub-path. Vite's `base` option
// handles this automatically for anything built with it (JS, CSS, images).
// If you ever rename the repo, update this to match: '/<new-repo-name>/'
export default defineConfig({
  plugins: [react()],
  base: '/TUT-Student-Marketplace/',
  build: {
    outDir: 'dist',
  },
});
