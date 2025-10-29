import React from 'react';

/**
 * SkeletonLoader - A reusable skeleton loading component
 * Provides a smooth loading experience while content is being fetched
 */
export default function SkeletonLoader({ type = 'card', className = '' }) {
  const baseClasses = 'animate-pulse bg-gray-200 rounded';

  const skeletons = {
    card: (
      <div className={`space-y-4 p-4 ${className}`}>
        <div className="flex space-x-4">
          <div className="rounded-full bg-gray-200 h-12 w-12"></div>
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
          </div>
        </div>
        <div className="h-48 bg-gray-200 rounded"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        <div className="h-4 bg-gray-200 rounded w-2/3"></div>
      </div>
    ),
    courseCard: (
      <div className={`rounded-3xl overflow-hidden shadow-2xl p-6 ${className}`}>
        <div className="h-64 bg-gray-200 rounded-2xl mb-4"></div>
        <div className="h-8 bg-gray-200 rounded w-3/4 mb-3"></div>
        <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6 mb-4"></div>
        <div className="flex justify-between">
          <div className="h-10 bg-gray-200 rounded-lg w-24"></div>
          <div className="h-10 bg-gray-200 rounded-lg w-24"></div>
        </div>
      </div>
    ),
    courseDetail: (
      <div className={`max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 ${className}`}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <article className="lg:col-span-7 space-y-8">
            <div className="h-72 bg-gray-200 rounded-3xl"></div>
            <div className="h-12 bg-gray-200 rounded w-3/4"></div>
            <div className="h-6 bg-gray-200 rounded w-1/2"></div>
            <div className="space-y-3">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              <div className="h-4 bg-gray-200 rounded w-4/6"></div>
            </div>
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="h-64 bg-gray-200 rounded-2xl"></div>
              <div className="h-64 bg-gray-200 rounded-2xl"></div>
            </div>
          </article>
          <aside className="lg:col-span-5">
            <div className="h-96 bg-gray-200 rounded-3xl mb-6"></div>
            <div className="h-80 bg-gray-200 rounded-2xl"></div>
          </aside>
        </div>
      </div>
    ),
    text: (
      <div className={`${baseClasses} ${className}`}>
        <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-4/6"></div>
      </div>
    ),
    avatar: (
      <div className={`rounded-full ${baseClasses} ${className}`}></div>
    ),
    button: (
      <div className={`h-10 rounded-lg ${baseClasses} ${className}`}></div>
    )
  };

  return skeletons[type] || skeletons.card;
}