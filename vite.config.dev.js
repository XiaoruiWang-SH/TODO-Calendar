/*
 * @Author: Xiaorui Wang
 * @Email: xiaorui.wang@usi.ch
 * @Date: 2025-04-09 15:24:57
 * @LastEditors: Xiaorui Wang
 * @LastEditTime: 2025-04-12 20:12:30
 * @Description: 
 * Copyright (c) 2025 by Xiaorui Wang, All Rights Reserved. 
 */
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
    // proxy: {
    //   '/api': {
    //     target: 'https://dev.api.todocalendar.live',
    //     changeOrigin: true,
    //     // rewrite: (path) => path.replace(/^\/api/, ''), // 移除路径中的 /api
    //     secure: false,
    //     configure: (proxy, options) => {
    //       proxy.on('proxyReq', (proxyReq, req, res) => {
            
    //         // Log OAuth2 related requests with detailed information
    //         if (req.url.includes('/oauth2')) {
    //           console.log('[OAUTH2 REQUEST]', {
    //             method: req.method,
    //             url: req.url,
    //             headers: req.headers,
    //             target: proxyReq.host + proxyReq.path
    //           });
    //         }
            
    //         console.log('[PROXY]', req.method, req.url, '->', proxyReq.host + proxyReq.path);
    //       });

    //       // Handle redirect responses
    //       proxy.on('proxyRes', function (proxyRes, req, res) {
    //         // Log OAuth2 responses
    //         if (req.url.includes('/oauth2')) {
    //           console.log('[OAUTH2 RESPONSE]', {
    //             statusCode: proxyRes.statusCode,
    //             headers: proxyRes.headers,
    //             url: req.url
    //           });
    //         }
            
    //         if (proxyRes.headers.location) {
    //           console.log('[REDIRECT]', 'Original location:', proxyRes.headers.location);
    //           if (proxyRes.headers.location.startsWith('http://dev.api.todocalendar.live')) {
    //             console.log('[REDIRECT]', 'location starts with http://dev.api.todocalendar.live');
                
    //           }
    //           proxyRes.headers.location = proxyRes.headers.location.replace(
    //             'http://dev.api.todocalendar.live',
    //             'http://localhost:5173'
    //           );                
    //           }
    //           console.log('[REDIRECT]', 'Modified location:', proxyRes.headers.location);
    //       });
    //     },
    //   },
    // },
  },
  esbuild: {
    minifyIdentifiers: false,
    keepNames: true,
  },
  define: {
    'process.env.NODE_ENV': '"development"',
  },

}) 