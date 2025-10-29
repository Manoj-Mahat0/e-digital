/**
 * Image optimization utilities for removing metadata and improving SEO
 */

/**
 * Generate optimized image attributes with SEO-friendly metadata
 * @param {string} src - Image source URL
 * @param {object} options - Image options
 * @returns {object} Optimized image attributes
 */
export function getOptimizedImageAttributes(src, options = {}) {
  const {
    alt = '',
    title = '',
    width = null,
    height = null,
    loading = 'lazy',
    decoding = 'async',
    className = ''
  } = options;

  // For local images, we can't remove metadata without server-side processing
  // But we can ensure proper attributes are set
  const attributes = {
    src,
    alt: alt || getTitleFromFilename(src),
    loading,
    decoding,
    className
  };

  // Add title if provided
  if (title) {
    attributes.title = title;
  }

  // Add dimensions if provided
  if (width) attributes.width = width;
  if (height) attributes.height = height;

  return attributes;
}

/**
 * Extract title from filename
 * @param {string} filename - Image filename
 * @returns {string} Extracted title
 */
function getTitleFromFilename(filename) {
  // Remove path and extension
  const name = filename.split('/').pop().split('.')[0];
  
  // Convert kebab-case or snake_case to readable format
  return name
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, char => char.toUpperCase());
}

/**
 * Generate image metadata for SEO
 * @param {string} src - Image source
 * @param {object} metadata - Image metadata
 * @returns {object} Structured metadata
 */
export function generateImageMetadata(src, metadata = {}) {
  const {
    alt = '',
    title = '',
    description = '',
    author = 'E-Digital India',
    location = 'Jamshedpur, Jharkhand, India',
    keywords = []
  } = metadata;

  return {
    src,
    alt: alt || getTitleFromFilename(src),
    title: title || getTitleFromFilename(src),
    description: description || alt || getTitleFromFilename(src),
    author,
    location,
    keywords: [...keywords, 'E-Digital India', 'Digital Skills', 'Training']
  };
}

/**
 * Optimize image loading with intersection observer
 * @param {string} selector - CSS selector for images
 */
export function optimizeImageLoading(selector = 'img[data-src]') {
  if (!('IntersectionObserver' in window)) {
    // Fallback: load all images immediately
    const images = document.querySelectorAll(selector);
    images.forEach(img => {
      if (img.dataset.src) {
        img.src = img.dataset.src;
        delete img.dataset.src;
      }
    });
    return;
  }

  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          delete img.dataset.src;
        }
        observer.unobserve(img);
      }
    });
  });

  const images = document.querySelectorAll(selector);
  images.forEach(img => imageObserver.observe(img));
}

/**
 * Add SEO metadata to images in the DOM
 * @param {Array} imageMetadata - Array of image metadata objects
 */
export function addImageSEOMetadata(imageMetadata) {
  imageMetadata.forEach(meta => {
    const img = document.querySelector(`img[src="${meta.src}"]`);
    if (img) {
      // Ensure alt attribute is set
      if (!img.alt && meta.alt) {
        img.alt = meta.alt;
      }
      
      // Ensure title attribute is set
      if (!img.title && meta.title) {
        img.title = meta.title;
      }
    }
  });
}

// Export utility functions
export default {
  getOptimizedImageAttributes,
  generateImageMetadata,
  optimizeImageLoading,
  addImageSEOMetadata
};