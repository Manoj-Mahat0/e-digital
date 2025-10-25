import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";

export default function NotFound() {
  const navigate = useNavigate();

  // Send 404 status to search engines (for SSR)
  useEffect(() => {
    // This is a client-side approach to indicate a 404 status
    // In a real SSR implementation, you would set the HTTP status code on the server
    if (typeof window !== 'undefined') {
      // Set a data attribute that can be used by SSR tools
      document.documentElement.setAttribute('data-status', '404');
      
      // Also update the document title for accessibility
      document.title = '404 - Page Not Found | E-Digital India';
    }
  }, []);

  return (
    <>
      <Helmet>
        <title>404 - Page Not Found | E-Digital India</title>
        <meta name="description" content="The page you're looking for doesn't exist or has been moved." />
        <meta name="robots" content="noindex" />
        <link rel="canonical" href={`${window.location.origin}/404-errors-google-analytics`} />
      </Helmet>

      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4 py-12 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <div className="mx-auto h-24 w-24 text-sky-600">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            
            <h1 className="mt-6 text-4xl font-extrabold text-gray-900 sm:text-5xl">
              404 - Page Not Found
            </h1>
            
            <p className="mt-4 text-lg text-gray-600">
              Sorry, we couldn't find the page you're looking for.
            </p>
          </div>

          <div className="mt-10 bg-white rounded-2xl shadow-xl p-8 space-y-6">
            <div className="flex items-center space-x-3 text-gray-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-sky-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Here are some helpful links:</span>
            </div>
            
            <div className="space-y-4">
              <Link 
                to="/" 
                className="w-full flex items-center justify-between px-4 py-3 border border-gray-300 rounded-xl shadow-sm text-base font-medium text-sky-700 bg-white hover:bg-sky-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 transition"
              >
                <span>Home</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </Link>
              
              <Link 
                to="/courses" 
                className="w-full flex items-center justify-between px-4 py-3 border border-gray-300 rounded-xl shadow-sm text-base font-medium text-sky-700 bg-white hover:bg-sky-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 transition"
              >
                <span>Our Courses</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </Link>
              
              <Link 
                to="/blog" 
                className="w-full flex items-center justify-between px-4 py-3 border border-gray-300 rounded-xl shadow-sm text-base font-medium text-sky-700 bg-white hover:bg-sky-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 transition"
              >
                <span>Blog</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </Link>
              
              <button
                onClick={() => navigate(-1)}
                className="w-full flex items-center justify-between px-4 py-3 border border-gray-300 rounded-xl shadow-sm text-base font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition"
              >
                <span>Go Back</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>

          <div className="text-center text-sm text-gray-500">
            <p>Need help? Contact us at <a href="mailto:info@edigitalindian.com" className="text-sky-600 hover:text-sky-800">info@edigitalindian.com</a></p>
          </div>
        </div>
      </div>
    </>
  );
}