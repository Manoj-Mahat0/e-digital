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
        manualChunks: undefined
      }
    }
  }
}))
