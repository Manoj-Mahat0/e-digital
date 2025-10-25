// src/utils/redirects.js
// Define permanent redirects (301) for moved or renamed pages
// Format: { from: '/old-path', to: '/new-path' }

export const permanentRedirects = [
  // Example redirects - add your actual redirects here
  // { from: '/old-course-name', to: '/new-course-name' },
  // { from: '/old-blog-post', to: '/new-blog-post' },
];

// Function to check if a path should be redirected
export function getRedirectPath(pathname) {
  const redirect = permanentRedirects.find(r => r.from === pathname);
  return redirect ? redirect.to : null;
}

// Function to handle client-side redirects with proper status codes
export function handleRedirect(navigate, fromPath, toPath) {
  // For client-side apps, we use navigate for smooth transitions
  // But we also set a data attribute for SSR tools to detect
  if (typeof window !== 'undefined') {
    document.documentElement.setAttribute('data-redirect-status', '301');
    document.documentElement.setAttribute('data-redirect-source', fromPath);
    document.documentElement.setAttribute('data-redirect-destination', toPath);
  }
  
  // Navigate to the new path
  navigate(toPath, { replace: true });
}