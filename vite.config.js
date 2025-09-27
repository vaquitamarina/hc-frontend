import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/hc-frontend/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@ui': path.resolve(__dirname, './src/components/ui'),
      '@cmlayout': path.resolve(__dirname, './src/components/layout'),
      '@features': path.resolve(__dirname, './src/features'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@layout': path.resolve(__dirname, './src/layout'),
    },
  },
});
