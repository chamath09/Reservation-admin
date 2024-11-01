import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5174, // Set port to 5174 for the admin panel
    proxy: {
      '/api': {
        target: 'http://localhost:5000', // Proxy backend requests to Express
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
