import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { createSitemapPlugin } from './scripts/sitemap-plugin'

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  // Use relative paths in production builds so assets load correctly
  // when served from a subfolder or cPanel document root
  base: mode === 'development' ? '/' : './',

  plugins: [
    react(),
    createSitemapPlugin()
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: undefined
      }
    }
  }
}))
