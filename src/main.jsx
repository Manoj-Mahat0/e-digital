import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import './index.css'
import App from './App.jsx'
import { logPerformanceMetrics, sendPerformanceMetrics } from './utils/performance.js'

export function createApp() {
  return {
    app: (
      <StrictMode>
        <HelmetProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </HelmetProvider>
      </StrictMode>
    ),
  }
}

// Register service worker
function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/src/service-worker.js')
        .then(registration => {
          console.log('SW registered: ', registration);
        })
        .catch(registrationError => {
          console.log('SW registration failed: ', registrationError);
        });
    });
  }
}

if (import.meta.env.SSR !== true) {
  const root = createRoot(document.getElementById('root'))
  root.render(
    <StrictMode>
      <HelmetProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </HelmetProvider>
    </StrictMode>
  )
  
  // Log performance metrics in development
  if (import.meta.env.DEV) {
    logPerformanceMetrics();
  }
  
  // Send performance metrics in production
  if (import.meta.env.PROD) {
    sendPerformanceMetrics();
  }
  
  // Register service worker
  registerServiceWorker();
}