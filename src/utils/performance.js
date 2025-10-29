/**
 * Performance monitoring utilities for tracking Core Web Vitals
 */

/**
 * Track Largest Contentful Paint (LCP)
 * @param {Function} callback - Function to call with LCP value
 */
export function trackLCP(callback) {
  if (!window.performance || !window.PerformanceObserver) {
    console.warn('Performance API not supported');
    return;
  }

  const observer = new PerformanceObserver((list) => {
    const entries = list.getEntries();
    const lastEntry = entries[entries.length - 1];
    
    // Report LCP value to callback
    callback({
      value: lastEntry.startTime,
      element: lastEntry.element,
      url: lastEntry.url,
      size: lastEntry.size
    });
  });

  observer.observe({ entryTypes: ['largest-contentful-paint'] });
}

/**
 * Track First Contentful Paint (FCP)
 * @param {Function} callback - Function to call with FCP value
 */
export function trackFCP(callback) {
  if (!window.performance || !window.PerformanceObserver) {
    console.warn('Performance API not supported');
    return;
  }

  const observer = new PerformanceObserver((list) => {
    const entries = list.getEntriesByName('FCP');
    if (entries.length > 0) {
      const firstEntry = entries[0];
      callback(firstEntry.startTime);
    }
  });

  observer.observe({ entryTypes: ['paint'] });
}

/**
 * Track Cumulative Layout Shift (CLS)
 * @param {Function} callback - Function to call with CLS value
 */
export function trackCLS(callback) {
  if (!window.performance || !window.PerformanceObserver) {
    console.warn('Performance API not supported');
    return;
  }

  let clsValue = 0;
  const observer = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      if (!entry.hadRecentInput) {
        clsValue += entry.value;
      }
    }
    callback(clsValue);
  });

  observer.observe({ entryTypes: ['layout-shift'] });
}

/**
 * Get navigation timing metrics
 * @returns {Object} Navigation timing metrics
 */
export function getNavigationTiming() {
  if (!window.performance || !window.performance.getEntriesByType) {
    return null;
  }

  const navigationEntries = window.performance.getEntriesByType('navigation');
  if (navigationEntries.length === 0) {
    return null;
  }

  const nav = navigationEntries[0];
  return {
    dnsLookup: nav.domainLookupEnd - nav.domainLookupStart,
    tcpConnection: nav.connectEnd - nav.connectStart,
    timeToFirstByte: nav.responseStart - nav.requestStart,
    contentDownload: nav.responseEnd - nav.responseStart,
    domParse: nav.domContentLoadedEventStart - nav.responseEnd,
    loadEvent: nav.loadEventEnd - nav.loadEventStart,
    totalLoadTime: nav.loadEventEnd - nav.fetchStart
  };
}

/**
 * Measure component render time
 * @param {string} componentName - Name of the component
 * @param {Function} componentFn - Component function to measure
 * @returns {Function} Wrapped component function
 */
export function measureRenderTime(componentName, componentFn) {
  return function(...args) {
    const start = performance.now();
    const result = componentFn.apply(this, args);
    const end = performance.now();
    
    console.log(`[Performance] ${componentName} render time: ${(end - start).toFixed(2)}ms`);
    return result;
  };
}

/**
 * Log performance metrics to console
 */
export function logPerformanceMetrics() {
  // Only log in development
  if (import.meta.env.DEV) {
    trackLCP((lcp) => {
      console.log(`[Performance] LCP: ${lcp.value.toFixed(2)}ms`);
      console.log(`[Performance] LCP Element:`, lcp.element);
    });

    trackFCP((fcp) => {
      console.log(`[Performance] FCP: ${fcp.toFixed(2)}ms`);
    });

    trackCLS((cls) => {
      console.log(`[Performance] CLS: ${cls.toFixed(4)}`);
    });

    setTimeout(() => {
      const timing = getNavigationTiming();
      if (timing) {
        console.table(timing);
      }
    }, 1000);
  }
}

/**
 * Send performance metrics to analytics service
 * @param {string} endpoint - Analytics endpoint
 */
export function sendPerformanceMetrics(endpoint = '/api/performance') {
  if (import.meta.env.PROD) {
    setTimeout(() => {
      const timing = getNavigationTiming();
      if (timing) {
        // In a real implementation, you would send this to your analytics service
        console.log('[Analytics] Sending performance data:', timing);
        
        // Example fetch call (uncomment and modify for your use case):
        /*
        fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            metrics: timing,
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent,
            url: window.location.href
          })
        }).catch(err => {
          console.error('[Analytics] Failed to send performance data:', err);
        });
        */
      }
    }, 3000); // Wait a bit for all metrics to be available
  }
}