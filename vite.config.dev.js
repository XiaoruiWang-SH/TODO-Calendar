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
    proxy: {
      '/api': {
        target: 'https://dev.api.todocalendar.live',
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/api/, ''), // 移除路径中的 /api
        secure: false,
        configure: (proxy, options) => {
          proxy.on('proxyReq', (proxyReq, req, res) => {
            console.log('[PROXY]', req.method, req.url, '->', proxyReq.host + proxyReq.path);
            // console.log('proxyReq', proxyReq);
            // console.log('req', req);
            // console.log('res', res);
          });
          
          // Handle redirect responses
          // proxy.on('proxyRes', function(proxyRes, req, res) {
          //   if (proxyRes.headers.location) {
          //     console.log('[REDIRECT]', 'Original location:', proxyRes.headers.location);
          //     proxyRes.headers.location = proxyRes.headers.location.replace(
          //       'http://dev.api.todocalendar.live', 
          //       'http://localhost:5173'
          //     );
          //     console.log('[REDIRECT]', 'Modified location:', proxyRes.headers.location);
          //   }
          // });
        },
      },
    },
  },
  esbuild: {
    minifyIdentifiers: false,
    keepNames: true,
  },
  define: {
    'process.env.NODE_ENV': '"development"',
  },
  
}) 