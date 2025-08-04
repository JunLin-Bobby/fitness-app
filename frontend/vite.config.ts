import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss()],
   server: {
    proxy: {
      // Proxy any request starting with /api on the frontend dev server
      // (e.g. http://localhost:5173) to the specified target backend
      '/api': {
        target: 'http://127.0.0.1:5001', 
        changeOrigin: true,     // Modify the Host header to match the target URL
        secure: false,          // Disable SSL verification if target uses a self-signed certificate
        // (Optional) If the backend endpoint matches exactly, you don't need to rewrite the path
        // rewrite: path => path.replace(/^\/api/, '/api'),
      },
    },
  },
})