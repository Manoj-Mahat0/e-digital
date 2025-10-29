import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { createSitemapPlugin } from './scripts/sitemap-plugin'

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  // Use absolute paths from root to prevent issues with nested routes
  // If deploying to a subfolder (e.g., /blog), change '/' to '/blog/'
  base: '/',

  plugins: [
    react(),
    createSitemapPlugin()
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Split vendor chunks
          vendor: ['react', 'react-dom', 'react-router-dom'],
          ui: ['react-icons', 'framer-motion', 'react-toastify'],
          utils: ['axios', 'react-helmet-async']
        },
        // Add hash to filenames for better caching
        entryFileNames: 'assets/[name].[hash].js',
        chunkFileNames: 'assets/[name].[hash].js',
        assetFileNames: 'assets/[name].[hash].[ext]'
      }
    },
    // Enable chunk size warnings
    chunkSizeWarningLimit: 1000,
    // Enable CSS code splitting
    cssCodeSplit: true,
    // Minify CSS and JS
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug']
      },
      mangle: true,
      format: {
        comments: false
      }
    }
  },
  // Enable gzip compression
  server: {
    headers: {
      'Cache-Control': 'public, max-age=31536000'
    }
  },
  // Optimize CSS
  css: {
    postcss: {
      plugins: [
        // Add any PostCSS plugins here if needed
      ]
    }
  }
}))