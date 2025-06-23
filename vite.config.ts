import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  base: '/', // Ensures all assets are loaded from the root (important for Vercel)
  build: {
    outDir: 'dist', // Vercel expects the build output in 'dist'
    emptyOutDir: true,
  },
});
