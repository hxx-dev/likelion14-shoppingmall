import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/imgur': {
        target: 'https://i.imgur.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/imgur/, ''),
      }
    }
  }
})