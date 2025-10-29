import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  HiStar,
  HiCalendar,
  HiPlay,
  HiChevronRight,
  HiCheck,
  HiX,
} from "react-icons/hi";
import SkeletonLoader from "../SkeletonLoader";

/**
 * CoursesShowcase (with modal detail view)
 * - Two column card layout (image + info)
 * - Pills to change active card
 * - Clicking Read More / card opens modal with full details
 *
 * Notes:
 * - Replace fallbackImage with your real public path or import.
 * - Modal is keyboard-friendly: Escape closes and focus is returned.
 */

export default function CoursesShowcase({ initialIndex = 0 }) {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  // activeIndex controls the large card shown in-page
  const [activeIndex, setActiveIndex] = useState(initialIndex);

  // modal state: when open show course details in modal
  const [modalOpen, setModalOpen] = useState(false);
  const [modalIndex, setModalIndex] = useState(null);

  const lastFocusedElement = useRef(null);
  const closeBtnRef = useRef(null);

  const navigate = useNavigate();

  // fallback image (replace with the path you host images at)
  const fallbackImage = "/images/course-fallback.png";

  // helper to normalize strings for fuzzy matching (kept for potential future use)
  function normalize(str = "") {
    return str
      .toString()
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "") // remove punctuation
      .trim()
      .replace(/\s+/g, " ");
  }

  useEffect(() => {
    fetch("/data/courses.json")
      .then((response) => response.json())
      .then((data) => {
        const transformedCourses = data.map((course) => {
          const title = course.title || "Untitled Course";

          return {
            id: course.id || course.slug || title,
            title,
            image: course.image || course.featured_image || fallbackImage,
            overview: course.shortDescription || course.longDescription || "",
            duration: course.duration || "6 Months",
            features: course.coreBenefits || [],
            // -> point to /apply (no id in URL). We still keep `full` with the object
            link: course.enrollUrl || "/apply",
            projects:
              course.whatYouWillLearn && course.whatYouWillLearn.length
                ? `${course.whatYouWillLearn.length} Topics`
                : "Multiple",
            rating: course.rating || "4.8",
            reviews: course.reviews || 950,
            badge: course.tags && course.tags.length > 0 ? course.tags[0] : "",
            tag: course.featured ? "Featured" : "",
            full: course, // keep original for modal / state if needed
            path: `/${course.slug}`, // curriculum path based on slug
          };
        });
        setCourses(transformedCourses);
        setLoading(false);
        // ensure activeIndex within range after load
        setActiveIndex((idx) =>
          Math.min(Math.max(initialIndex, 0), transformedCourses.length - 1)
        );
      })
      .catch((error) => {
        console.error("Error fetching courses:", error);
        setLoading(false);
      });
  }, [initialIndex]);

  // Close modal with escape and prevent body scroll while modal open
  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape" && modalOpen) {
        closeModal();
      }
    }
    document.addEventListener("keydown", onKey);
    if (modalOpen) {
      document.body.style.overflow = "hidden";
      // store previously focused element
      lastFocusedElement.current = document.activeElement;
      // focus close button when modal opens
      setTimeout(() => closeBtnRef.current?.focus(), 50);
    } else {
      document.body.style.overflow = "";
      // return focus to the last focused element
      lastFocusedElement.current?.focus?.();
    }
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modalOpen]);

  function openModal(index) {
    setModalIndex(index);
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
    setModalIndex(null);
  }

  // programmatic navigation to curriculum: close modal then navigate
  function handleViewCurriculum(coursePath) {
    // if coursePath is falsy, navigate to /courses
    const to = coursePath || "/courses";
    closeModal();
    // small timeout to allow modal close / focus restoration (adjust if you animate)
    setTimeout(() => {
      navigate(to);
    }, 80);
  }

  if (loading) {
    return (
      <section className="py-16 lg:py-24 bg-[linear-gradient(180deg,#f1f9ff_0%,#f8fbff_100%)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <div className="h-10 bg-gray-200 rounded w-48 mx-auto mb-4"></div>
            <div className="h-6 bg-gray-200 rounded w-32 mx-auto"></div>
          </div>
          <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-10">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-8 bg-gray-200 rounded-full w-24"></div>
            ))}
          </div>
          <SkeletonLoader type="courseCard" />
        </div>
      </section>
    );
  }

  const active = courses[activeIndex] || {};

  return (
    <section className="py-16 lg:py-24 bg-[linear-gradient(180deg,#f1f9ff_0%,#f8fbff_100%)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="text-center mb-10">
          <h3 className="text-3xl lg:text-4xl font-semibold text-sky-700">
            COURSES
          </h3>
          <p className="text-gray-600 mt-2">Our Courses</p>
        </div>

        {/* Pills - Improved mobile responsiveness */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-10">
          {courses.map((c, i) => (
            <button
              key={c.id + "-" + i}
              onClick={() => setActiveIndex(i)}
              className={`px-3 py-2 sm:px-5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition whitespace-nowrap
                ${
                  i === activeIndex
                    ? "bg-sky-500 text-white shadow-md"
                    : "bg-white text-gray-700 border border-gray-200 hover:bg-sky-50"
                }`}
              aria-pressed={i === activeIndex}
            >
              {c.title}
            </button>
          ))}
        </div>

        {/* Big Card (two-column) - Enhanced mobile responsiveness */}
        <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden p-4 sm:p-6 md:p-8 lg:p-10 grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 items-stretch">
          {/* Left image - Mobile optimized */}
          <div
            className="md:col-span-6 lg:col-span-7 flex justify-center md:justify-start cursor-pointer"
            onClick={() => openModal(activeIndex)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter') openModal(activeIndex);
            }}
            aria-label={`Open details for ${active.title}`}
          >
            <img
              src={active.image || fallbackImage}
              alt={active.title}
              className="w-full h-48 sm:h-64 md:h-80 lg:h-96 object-cover rounded-2xl border-4 sm:border-8 border-white shadow-lg transform transition-transform duration-300 hover:scale-105"
              loading="eager"
              decoding="async"
              fetchPriority="high"
            />
          </div>

          {/* Right info card - Mobile optimized */}
          <div className="md:col-span-6 lg:col-span-5 flex">
            <div className="relative bg-white rounded-2xl p-4 sm:p-6 shadow-lg border border-gray-100 flex flex-col justify-between w-full h-auto sm:h-64 md:h-80 lg:h-96 overflow-hidden">
              {/* Title + Overview */}
              <div>
                <div className="flex items-start justify-between gap-2 sm:gap-4">
                  <div>
                    <h4 className="text-xl sm:text-2xl font-bold text-sky-700">{active.title}</h4>
                    <p className="text-xs sm:text-sm text-gray-600 mt-2">
                      <strong className="text-gray-800">Course Overview:</strong>{" "}
                      {active.overview.length > 150
                        ? `${active.overview.slice(0, 150)}...`
                        : active.overview}
                    </p>
                  </div>
                  {active.badge && (
                    <span className="inline-block px-2 py-1 text-xs font-semibold rounded-full bg-sky-100 text-sky-700">
                      {active.badge}
                    </span>
                  )}
                </div>

                {/* Tag */}
                {active.tag && (
                  <div className="mt-3 sm:mt-4">
                    <span className="inline-block text-xs bg-sky-50 text-sky-700 px-2 py-1 rounded-full">
                      {active.tag}
                    </span>
                  </div>
                )}

                {/* Rating */}
                <div className="flex items-center gap-2 sm:gap-3 mt-3 sm:mt-4">
                  <div className="flex items-center gap-1 text-yellow-500">
                    {Array.from({ length: 5 }).map((_, idx) => (
                      <HiStar key={idx} className="h-3 w-3 sm:h-4 sm:w-4" />
                    ))}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-600">
                    <strong className="text-gray-900">{active.rating ?? "4.8"}</strong>{" "}
                    ({active.reviews ?? 950})
                  </div>
                </div>

                {/* Meta info - Mobile responsive grid */}
                <div className="mt-3 sm:mt-4 grid grid-cols-2 gap-2 sm:gap-3">
                  <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm text-gray-700 bg-gray-50 border border-gray-100 rounded-lg p-2 sm:p-3">
                    <HiCalendar className="h-4 w-4 sm:h-5 sm:w-5 text-sky-500 flex-shrink-0" />
                    <div>
                      <div className="text-xs text-gray-500">Duration</div>
                      <div className="text-xs sm:text-sm font-semibold">{active.duration}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm text-gray-700 bg-gray-50 border border-gray-100 rounded-lg p-2 sm:p-3">
                    <HiPlay className="h-4 w-4 sm:h-5 sm:w-5 text-amber-500 flex-shrink-0" />
                    <div>
                      <div className="text-xs text-gray-500">Live Projects</div>
                      <div className="text-xs sm:text-sm font-semibold">{active.projects}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* CTA buttons - Mobile responsive */}
              <div className="mt-3 sm:mt-4 flex flex-col sm:flex-row items-center gap-2 sm:gap-3">
                <button
                  onClick={() => handleViewCurriculum(active.path)}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-3 py-2 sm:px-4 sm:py-2 rounded-lg bg-sky-500 text-white text-sm sm:text-base font-semibold shadow hover:opacity-95 transition"
                >
                  Read More
                  <HiChevronRight className="h-3 w-3 sm:h-4 sm:w-4" />
                </button>

                <Link
                  to="/apply"
                  state={{ course: active.full }}
                  className="w-full sm:w-auto text-center px-3 py-2 sm:px-4 sm:py-2 rounded-lg border border-gray-200 text-gray-800 bg-white hover:shadow transition text-sm sm:text-base"
                >
                  Enroll Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal - Enhanced mobile responsiveness */}
      {modalOpen && modalIndex !== null && courses[modalIndex] && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="course-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center px-4 py-4 sm:p-0"
        >
          {/* backdrop */}
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
            onClick={closeModal}
            aria-hidden="true"
          />

          <div className="relative w-full max-w-5xl mx-auto max-h-[90vh] overflow-y-auto">
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
              <div className="flex flex-col md:flex-row">
                {/* left: big image - Mobile optimized */}
                <div className="md:w-1/2 w-full">
                  <img
                    src={courses[modalIndex].image || fallbackImage}
                    alt={courses[modalIndex].title}
                    className="w-full h-48 sm:h-64 md:h-full object-contain"
                    loading="lazy"
                    decoding="async"
                  />
                </div>

                {/* right: details - Mobile optimized */}
                <div className="md:w-1/2 w-full p-4 sm:p-6 md:p-8">
                  <div className="flex items-start justify-between">
                    <div>
                      <h2
                        id="course-modal-title"
                        className="text-xl sm:text-2xl font-bold text-sky-700"
                      >
                        {courses[modalIndex].title}
                      </h2>
                      <p className="text-xs sm:text-sm text-gray-600 mt-2">
                        {courses[modalIndex].overview}
                      </p>
                    </div>

                    <button
                      ref={closeBtnRef}
                      onClick={closeModal}
                      aria-label="Close course details"
                      className="ml-2 sm:ml-4 inline-flex items-center justify-center h-8 w-8 sm:h-9 sm:w-9 rounded-full bg-gray-100 hover:bg-gray-200 transition flex-shrink-0"
                    >
                      <HiX className="h-4 w-4 sm:h-5 sm:w-5" />
                    </button>
                  </div>

                  {/* badges & meta - Mobile responsive */}
                  <div className="mt-3 sm:mt-4 flex flex-wrap items-center gap-2 sm:gap-3">
                    {courses[modalIndex].badge && (
                      <span className="px-2 py-1 sm:px-3 sm:py-1 rounded-full bg-sky-100 text-sky-700 text-xs">
                        {courses[modalIndex].badge}
                      </span>
                    )}
                    {courses[modalIndex].tag && (
                      <span className="px-2 py-1 sm:px-3 sm:py-1 rounded-full bg-gray-100 text-gray-700 text-xs">
                        {courses[modalIndex].tag}
                      </span>
                    )}
                    <div className="ml-auto flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-gray-600">
                      <div className="flex items-center gap-1 text-yellow-500">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <HiStar key={i} className="h-3 w-3 sm:h-4 sm:w-4" />
                        ))}
                      </div>
                      <span>
                        <strong className="text-gray-900">{courses[modalIndex].rating}</strong>{" "}
                        ({courses[modalIndex].reviews})
                      </span>
                    </div>
                  </div>

                  {/* duration / projects - Mobile responsive */}
                  <div className="mt-4 sm:mt-6 grid grid-cols-2 gap-2 sm:gap-3">
                    <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm text-gray-700 bg-gray-50 border border-gray-100 rounded-lg p-2 sm:p-3">
                      <HiCalendar className="h-4 w-4 sm:h-5 sm:w-5 text-sky-500 flex-shrink-0" />
                      <div>
                        <div className="text-xs text-gray-500">Duration</div>
                        <div className="text-xs sm:text-sm font-semibold">
                          {courses[modalIndex].duration}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm text-gray-700 bg-gray-50 border border-gray-100 rounded-lg p-2 sm:p-3">
                      <HiPlay className="h-4 w-4 sm:h-5 sm:w-5 text-amber-500 flex-shrink-0" />
                      <div>
                        <div className="text-xs text-gray-500">Live Projects</div>
                        <div className="text-xs sm:text-sm font-semibold">
                          {courses[modalIndex].projects}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* features list - Mobile optimized */}
                  {courses[modalIndex].features &&
                    courses[modalIndex].features.length > 0 && (
                      <ul className="mt-4 sm:mt-6 grid grid-cols-1 gap-2 max-h-40 sm:max-h-48 overflow-auto pr-2">
                        {courses[modalIndex].features.map((f, idx) => (
                          <li
                            key={f + idx}
                            className="flex items-start gap-2 text-gray-700 text-xs sm:text-sm"
                          >
                            <HiCheck className="h-4 w-4 sm:h-5 sm:w-5 text-green-500 flex-shrink-0 mt-0.5" />
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                  {/* actions - Mobile responsive */}
                  <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row items-center gap-2 sm:gap-3">
                    <Link
                      to="/apply"
                      state={{ course: courses[modalIndex].full }}
                      className="w-full sm:w-auto text-center inline-flex items-center justify-center gap-2 px-3 py-2 sm:px-4 sm:py-2 rounded-lg bg-sky-500 text-white text-sm sm:text-base font-semibold shadow hover:opacity-95"
                    >
                      Enroll Now
                      <HiChevronRight className="h-3 w-3 sm:h-4 sm:w-4" />
                    </Link>

                    {/* view curriculum -> navigates to course page and closes modal */}
                    <button
                      onClick={() => handleViewCurriculum(courses[modalIndex].path)}
                      className="w-full sm:w-auto text-center px-3 py-2 sm:px-4 sm:py-2 rounded-lg border border-gray-200 text-gray-800 bg-white hover:shadow inline-flex items-center justify-center text-sm sm:text-base"
                    >
                      View Curriculum
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}