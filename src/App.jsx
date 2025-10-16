// src/App.jsx
import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Header from "./components/Header";
import Footer from "./components/Footer";
import FloatingButtons from "./components/FloatingButtons";
import BlogList from "./pages/BlogList";
import BlogPost from "./pages/BlogPost";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Apply from "./pages/Apply";
import SimplePage from "./pages/SimplePage"; // keep if used elsewhere
import CourseDetail from "./pages/CourseDetail";
import Terms from "./pages/Terms";
import Career from "./pages/Career";

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
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
      />

      <ScrollToTop />

      <Shell>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact-us" element={<Contact />} />
          <Route path="/apply" element={<Apply />} />
          <Route path="/blog" element={<BlogList />} />
          <Route path="/blog/:id" element={<BlogPost />} />
          {/* <Route path="/courses" element={<Courses />} /> */}
          <Route path="/courses/:slug" element={<CourseDetail />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/careers" element={<Career />} />
          {/* example catch-all/simple page route if you use SimplePage */}
          {/* add additional routes here */}
        </Routes>
      </Shell>
    </>
  );
}
