import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  HiHome,
  HiInformationCircle,
  HiPhone,
  HiBriefcase,
  HiX,
  HiMenu,
  HiChevronDown,
  HiChevronUp,
} from "react-icons/hi";
import { getOptimizedImageAttributes } from "../utils/imageOptimizer";

function NavLink({ to, children, onClick, icon: Icon }) {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      className={`flex items-center gap-2 px-3 py-2 rounded-md transition-all duration-200 text-sm font-medium ${
        isActive
          ? "text-indigo-600 bg-indigo-50 shadow-sm"
          : "text-gray-700 hover:text-indigo-600"
      }`}
      to={to}
      onClick={onClick}
    >
      {Icon && <Icon className="h-4 w-4" />}
      {children}
    </Link>
  );
}

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileCourseOpen, setMobileCourseOpen] = useState(false);
  const [desktopCourseOpen, setDesktopCourseOpen] = useState(false);
  const location = useLocation();
  const hoverCloseTimer = useRef(null);

  const courses = [
    
    { name: "Digital Marketing", to: "/diploma-in-digital-marketing" },
    { name: "Web Development", to: "/diploma-in-web-development" },
    { name: "Data Science & AI", to: "/diploma-in-data-science-and-artificial-intelligence" },
    { name: "Android App Development", to: "/diploma-in-android-app-development" },
    { name: "Business Comm. & Soft Skills", to: "/diploma-in-business-communication-and-soft-skills" },
    { name: "Sap Global Certification", to: "/sap-global-certification-course" },
  ];

  const courseActive = courses.some((c) => location.pathname === c.to);

  // helpers to manage hover + click gracefully
  function openDesktopCourse() {
    if (hoverCloseTimer.current) {
      clearTimeout(hoverCloseTimer.current);
      hoverCloseTimer.current = null;
    }
    setDesktopCourseOpen(true);
  }
  function closeDesktopCourseWithDelay(delay = 150) {
    if (hoverCloseTimer.current) clearTimeout(hoverCloseTimer.current);
    hoverCloseTimer.current = setTimeout(() => {
      setDesktopCourseOpen(false);
      hoverCloseTimer.current = null;
    }, delay);
  }
  function toggleDesktopCourse() {
    if (desktopCourseOpen) {
      setDesktopCourseOpen(false);
      if (hoverCloseTimer.current) {
        clearTimeout(hoverCloseTimer.current);
        hoverCloseTimer.current = null;
      }
    } else {
      openDesktopCourse();
    }
  }

  // Optimize image loading
  useEffect(() => {
    // This will be handled by the main app
  }, []);

  return (
    <header className="relative z-50">
      {/* Top contact bar */}
      <div className="w-full bg-gradient-to-r from-purple-700 to-indigo-600 text-white text-base sm:text-lg">
  <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
    <div className="flex items-center justify-between h-14">
      <a href="mailto:info@edigitalindian.com" className="font-medium">info@edigitalindian.com</a>
      <div className="flex items-center gap-6">
        {/* <span>+91-9661577233</span> */}
        <a href="tel:+91-9934141233" className="font-medium">+91-9934141233</a>
      </div>
    </div>
  </div>
</div>


      {/* Main header */}
      <div className="w-full bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3">
              <img
                {...getOptimizedImageAttributes("/logo.webp", {
                  alt: "E-Digital India Logo - Digital Skills Training Institute in Jamshedpur",
                  title: "E-Digital India - Professional Digital Skills Training",
                  width: 100,
                  height: 48,
                  loading: "eager",
                  decoding: "async"
                })}
                className="h-12 w-25 rounded-md object-cover"
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-6 relative">
              <NavLink to="/" icon={HiHome}>
                Home
              </NavLink>

              {/* Course Dropdown — hover + click */}
              <div
                className="relative"
                onMouseEnter={openDesktopCourse}
                onMouseLeave={() => closeDesktopCourseWithDelay(180)}
              >
                <button
                  onClick={toggleDesktopCourse}
                  className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    courseActive || desktopCourseOpen
                      ? "text-indigo-600 bg-indigo-50 shadow-sm"
                      : "text-gray-700 hover:text-indigo-600"
                  }`}
                >
                  <HiInformationCircle className="h-4 w-4" />
                  Course
                  {desktopCourseOpen ? (
                    <HiChevronUp className="h-4 w-4" />
                  ) : (
                    <HiChevronDown className="h-4 w-4" />
                  )}
                </button>

                {/* Dropdown menu */}
                <div
                  className={`absolute left-0 mt-2 w-60 bg-white border border-gray-100 rounded-xl shadow-lg transform transition-all duration-200 origin-top z-40 ${
                    desktopCourseOpen
                      ? "scale-100 opacity-100 visible"
                      : "scale-95 opacity-0 invisible pointer-events-none"
                  }`}
                  // ensure mouse movements inside the menu don't immediately close it
                  onMouseEnter={openDesktopCourse}
                  onMouseLeave={() => closeDesktopCourseWithDelay(180)}
                >
                  <div className="py-2">
                    {courses.map((c) => (
                      <Link
                        key={c.to}
                        to={c.to}
                        onClick={() => setDesktopCourseOpen(false)}
                        className={`block px-4 py-2.5 text-sm rounded-md transition ${
                          location.pathname === c.to
                            ? "text-indigo-600 bg-indigo-50 font-semibold"
                            : "text-gray-700 hover:bg-gray-50 hover:text-indigo-600"
                        }`}
                      >
                        {c.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              <NavLink to="/blog" icon={HiBriefcase}>
                Blog
              </NavLink>

              <NavLink to="/contact-us" icon={HiPhone}>
                Contact Us
              </NavLink>
            </nav>

            {/* Right side */}
            <div className="flex items-center gap-4">
              <Link
                to="/apply"
                className="hidden sm:inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-purple-500 to-blue-400 text-white font-semibold shadow-md hover:opacity-95 transition"
              >
                Apply Now
              </Link>

              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden p-2 rounded-md text-gray-600 hover:text-gray-800 hover:bg-gray-100"
              >
                {mobileOpen ? (
                  <HiX className="h-6 w-6" />
                ) : (
                  <HiMenu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation (unchanged) */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-gray-100 bg-white animate-fadeIn">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <NavLink to="/" icon={HiHome} onClick={() => setMobileOpen(false)}>
                Home
              </NavLink>

              {/* Mobile Course Dropdown */}
              <div className="px-3">
                <button
                  onClick={() => setMobileCourseOpen((s) => !s)}
                  className={`w-full flex items-center justify-between gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    courseActive || mobileCourseOpen
                      ? "text-indigo-600 bg-indigo-50"
                      : "text-gray-700 hover:text-indigo-600"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <HiInformationCircle className="h-4 w-4" />
                    Course
                  </div>
                  {mobileCourseOpen ? (
                    <HiChevronUp className="h-4 w-4" />
                  ) : (
                    <HiChevronDown className="h-4 w-4" />
                  )}
                </button>

                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    mobileCourseOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  {courses.map((c) => (
                    <Link
                      key={c.to}
                      to={c.to}
                      onClick={() => setMobileOpen(false)}
                      className={`block px-5 py-2 rounded-md text-sm transition ${
                        location.pathname === c.to
                          ? "text-indigo-600 font-semibold bg-indigo-50"
                          : "text-gray-700 hover:bg-gray-50 hover:text-indigo-600"
                      }`}
                    >
                      {c.name}
                    </Link>
                  ))}
                </div>
              </div>

              <NavLink to="/blog" icon={HiBriefcase}>
                Blog
              </NavLink>

              <NavLink to="/contact-us" icon={HiPhone}>
                Contact Us
              </NavLink>

              <Link
                to="/apply"
                className="block w-full text-center mt-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500 to-blue-400 text-white font-medium"
              >
                Apply Now
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Scrolling promo strip */}
      <div className="w-full bg-gradient-to-r from-indigo-700 to-blue-600 text-white overflow-hidden">
        <div className="relative whitespace-nowrap">
          <p className="animate-scroll text-lg font-semibold py-0 inline-block">
  
  {/* &nbsp; • &nbsp; */}
  <img
    {...getOptimizedImageAttributes("/new.webp", {
      alt: "New Offer - E-Digital India Special Programs",
      title: "E-Digital India Latest Offers and Programs",
      width: 48,
      height: 48
    })}
    className="inline-block w-12 h-12 mr-5 align-middle"
  />
  "The special offer from our institute is no longer valid as of today."&nbsp; • &nbsp;
  " For updates on upcoming offers and courses, please visit our office or contact our team directly."
</p>

        </div>
      </div>
    </header>
  );
}
// manoj