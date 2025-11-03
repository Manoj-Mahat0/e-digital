// src/App.jsx
import React, { useState, useEffect, lazy, Suspense } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Header from "./components/Header";
import Footer from "./components/Footer";
import FloatingButtons from "./components/FloatingButtons";
import BlogList from "./pages/BlogList";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Apply from "./pages/Apply";
import SimplePage from "./pages/SimplePage"; // keep if used elsewhere
import Courses from "./pages/Courses";
import Terms from "./pages/Terms";
import Career from "./pages/Career";
import NotFound from "./pages/NotFound";
import Workshop from "./pages/Workshop"; // Add this import
import { getRedirectPath } from "./utils/redirects";

// Lazy load less critical components
const ContentPage = lazy(() => import("./pages/ContentPage"));

// Loading component for lazy-loaded routes
const LoadingFallback = () => (
  <div className="p-8 text-center">
    <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-sky-500"></div>
    <p className="mt-2 text-slate-600">Loading content...</p>
  </div>
);

// Redirect component to handle 301 redirects
function RedirectHandler() {
  const location = useLocation();
  const navigate = useNavigate();
  
  useEffect(() => {
    const redirectPath = getRedirectPath(location.pathname);
    if (redirectPath) {
      // Handle 301 redirect
      if (typeof window !== 'undefined') {
        document.documentElement.setAttribute('data-redirect-status', '301');
        document.documentElement.setAttribute('data-redirect-source', location.pathname);
        document.documentElement.setAttribute('data-redirect-destination', redirectPath);
      }
      navigate(redirectPath, { replace: true });
    }
  }, [location, navigate]);
  
  return null;
}

// ScrollToTop component — ensures each route starts at top of page
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function Shell({ children }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  // Close mobile nav on route change and refresh AOS if available
  const location = useLocation();
  useEffect(() => {
    setMobileOpen(false);
    if (window?.AOS?.refreshHard) {
      window.AOS.refreshHard();
    }
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-white text-gray-800 flex flex-col">
      <Header mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />

      <main className="flex-1">
        {children}
      </main>

      <FloatingButtons />

      <Footer />

      {/* Map Section */}
      
    </div>
  );
}

export default function App() {
  return (
    <>
      {/* ToastContainer placed at app root so any component can show toasts */}
      <ToastContainer
        position="bottom-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
      />

      <ScrollToTop />
      <RedirectHandler />

      <Shell>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about-us" element={<About />} />
          <Route path="/contact-us" element={<Contact />} />
          <Route path="/apply" element={<Apply />} />
          <Route path="/register" element={<Apply />} />
          <Route path="/login" element={<Apply />} />
          <Route path="/blog" element={<BlogList />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/term-and-condition" element={<Terms />} />
          <Route path="/career" element={<Career />} />
          <Route path="/workshop" element={<Workshop />} /> {/* Add this route */}
          <Route path="/404-errors-google-analytics" element={<NotFound />} />
          <Route path="/:slug" element={
            <Suspense fallback={<LoadingFallback />}>
              <ContentPage />
            </Suspense>
          } />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Shell>
    </>
  );
}