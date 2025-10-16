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
            path: `/courses/${course.slug}`, // curriculum path based on slug
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>Loading courses...</p>
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

        {/* Pills */}
        <div className="flex flex-wrap justify-center gap-4 mb-10">
          {courses.map((c, i) => (
            <button
              key={c.id + "-" + i}
              onClick={() => setActiveIndex(i)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition
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

        {/* Big Card (two-column) */}
        <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden p-6 md:p-10 grid md:grid-cols-12 gap-6 items-stretch">
  {/* Left image */}
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
  className="w-full h-64 sm:h-80 md:h-96 lg:h-[28rem] object-cover rounded-2xl border-8 border-white shadow-lg transform transition-transform duration-300 hover:scale-105"
/>



  </div>

  {/* Right info card */}
  <div className="md:col-span-6 lg:col-span-5 flex">
    <div className="relative bg-white rounded-2xl p-6 shadow-lg border border-gray-100 flex flex-col justify-between w-full h-64 sm:h-80 md:h-96 lg:h-[28rem]
     overflow-hidden">
      {/* Title + Overview */}
      <div>
        <div className="flex items-start justify-between gap-4">
          <div>
            <h4 className="text-2xl font-bold text-sky-700">{active.title}</h4>
            <p className="text-sm text-gray-600 mt-2">
              <strong className="text-gray-800">Course Overview:</strong>{" "}
              {active.overview.length > 200
                ? `${active.overview.slice(0, 200)}...`
                : active.overview}
            </p>
          </div>
          {active.badge && (
            <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-sky-100 text-sky-700">
              {active.badge}
            </span>
          )}
        </div>

        {/* Tag */}
        {active.tag && (
          <div className="mt-4">
            <span className="inline-block text-xs bg-sky-50 text-sky-700 px-3 py-1 rounded-full">
              {active.tag}
            </span>
          </div>
        )}

        {/* Rating */}
        <div className="flex items-center gap-3 mt-4">
          <div className="flex items-center gap-1 text-yellow-500">
            {Array.from({ length: 5 }).map((_, idx) => (
              <HiStar key={idx} className="h-4 w-4" />
            ))}
          </div>
          <div className="text-sm text-gray-600">
            <strong className="text-gray-900">{active.rating ?? "4.8"}</strong>{" "}
            ({active.reviews ?? 950})
          </div>
        </div>

        {/* Meta info */}
        <div className="mt-4 grid grid-cols-2 gap-3">
          <div className="flex items-center gap-3 text-sm text-gray-700 bg-gray-50 border border-gray-100 rounded-lg p-3">
            <HiCalendar className="h-5 w-5 text-sky-500" />
            <div>
              <div className="text-xs text-gray-500">Duration</div>
              <div className="text-sm font-semibold">{active.duration}</div>
            </div>
          </div>

          <div className="flex items-center gap-3 text-sm text-gray-700 bg-gray-50 border border-gray-100 rounded-lg p-3">
            <HiPlay className="h-5 w-5 text-amber-500" />
            <div>
              <div className="text-xs text-gray-500">Live Projects</div>
              <div className="text-sm font-semibold">{active.projects}</div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA buttons */}
      <div className="mt-4 flex items-center gap-3">
        <button
          onClick={() => openModal(activeIndex)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-sky-500 text-white font-semibold shadow hover:opacity-95 transition"
        >
          Read More
          <HiChevronRight className="h-4 w-4" />
        </button>

        <Link
          to="/apply"
          state={{ course: active.full }}
          className="px-4 py-2 rounded-lg border border-gray-200 text-gray-800 bg-white hover:shadow transition"
        >
          Enroll Now
        </Link>
      </div>
    </div>
  </div>
</div>

      </div>

      {/* Modal */}
      {modalOpen && modalIndex !== null && courses[modalIndex] && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="course-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center px-4"
        >
          {/* backdrop */}
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
            onClick={closeModal}
            aria-hidden="true"
          />

          <div className="relative w-full max-w-5xl mx-auto">
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
              <div className="md:flex">
                {/* left: big image */}
                <div className="md:w-1/2 w-full">
                  <img
                    src={courses[modalIndex].image || fallbackImage}
                    alt={courses[modalIndex].title}
                    className="w-full h-72 md:h-full object-cover"
                  />
                </div>

                {/* right: details */}
                <div className="md:w-1/2 w-full p-6 md:p-8">
                  <div className="flex items-start justify-between">
                    <div>
                      <h2
                        id="course-modal-title"
                        className="text-2xl font-bold text-sky-700"
                      >
                        {courses[modalIndex].title}
                      </h2>
                      <p className="text-sm text-gray-600 mt-2">
                        {courses[modalIndex].overview}
                      </p>
                    </div>

                    <button
                      ref={closeBtnRef}
                      onClick={closeModal}
                      aria-label="Close course details"
                      className="ml-4 inline-flex items-center justify-center h-9 w-9 rounded-full bg-gray-100 hover:bg-gray-200 transition"
                    >
                      <HiX className="h-5 w-5" />
                    </button>
                  </div>

                  {/* badges & meta */}
                  <div className="mt-4 flex items-center gap-3">
                    {courses[modalIndex].badge && (
                      <span className="px-3 py-1 rounded-full bg-sky-100 text-sky-700 text-xs">
                        {courses[modalIndex].badge}
                      </span>
                    )}
                    {courses[modalIndex].tag && (
                      <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-xs">
                        {courses[modalIndex].tag}
                      </span>
                    )}
                    <div className="ml-auto flex items-center gap-2 text-sm text-gray-600">
                      <div className="flex items-center gap-1 text-yellow-500">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <HiStar key={i} className="h-4 w-4" />
                        ))}
                      </div>
                      <span>
                        <strong className="text-gray-900">{courses[modalIndex].rating}</strong>{" "}
                        ({courses[modalIndex].reviews})
                      </span>
                    </div>
                  </div>

                  {/* duration / projects */}
                  <div className="mt-6 grid grid-cols-2 gap-3">
                    <div className="flex items-center gap-3 text-sm text-gray-700 bg-gray-50 border border-gray-100 rounded-lg p-3">
                      <HiCalendar className="h-5 w-5 text-sky-500" />
                      <div>
                        <div className="text-xs text-gray-500">Duration</div>
                        <div className="text-sm font-semibold">
                          {courses[modalIndex].duration}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 text-sm text-gray-700 bg-gray-50 border border-gray-100 rounded-lg p-3">
                      <HiPlay className="h-5 w-5 text-amber-500" />
                      <div>
                        <div className="text-xs text-gray-500">Live Projects</div>
                        <div className="text-sm font-semibold">
                          {courses[modalIndex].projects}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* features list */}
                  {courses[modalIndex].features &&
                    courses[modalIndex].features.length > 0 && (
                      <ul className="mt-6 grid grid-cols-1 gap-2 max-h-48 overflow-auto pr-2">
                        {courses[modalIndex].features.map((f, idx) => (
                          <li
                            key={f + idx}
                            className="flex items-start gap-2 text-gray-700 text-sm"
                          >
                            <HiCheck className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                  {/* actions */}
                  <div className="mt-6 flex items-center gap-3">
                    <Link
                      to="/apply"
                      state={{ course: courses[modalIndex].full }}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-sky-500 text-white font-semibold shadow hover:opacity-95"
                    >
                      Enroll Now
                      <HiChevronRight className="h-4 w-4" />
                    </Link>

                    {/* view curriculum -> navigates to course page and closes modal */}
                    <button
                      onClick={() => handleViewCurriculum(courses[modalIndex].path)}
                      className="px-4 py-2 rounded-lg border border-gray-200 text-gray-800 bg-white hover:shadow inline-flex items-center justify-center"
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
