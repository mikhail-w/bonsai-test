import { defineConfig } from 'vite';
import path from 'path';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8000', // The target server
        changeOrigin: true, // Changes the origin of the host header to the target URL
        rewrite: path => path.replace(/^\/api/, '/api'), // Optional: This keeps the /api in the path
      },
    },
  },
  resolve: {
    alias: {
      '@homepageSections': path.resolve(
        __dirname,
        'src/pages/homepage-sections'
      ),
    },
  },
  // Add support for .glb files as assets
  assetsInclude: ['**/*.glb'], // This ensures .glb files are included as assets
});
