import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Development specific config
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  build: {
    sourcemap: true,
  },
  server: {
    sourcemap: true,
  },
  esbuild: {
    minifyIdentifiers: false,
    keepNames: true,
  },
  define: {
    'process.env.NODE_ENV': '"development"',
  }
}) 