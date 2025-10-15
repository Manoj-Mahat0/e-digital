import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { HiPaperAirplane } from "react-icons/hi";
import { FiClock, FiUsers, FiCheckCircle } from "react-icons/fi";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { motion } from "framer-motion";
import api from "../services/api";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet-async";
import coursesData from "../data/courses.json";

// Improved, responsive Course Detail page with better UX, accessibility and subtle animation.
// - Tailwind CSS styling
// - Sticky registration card on wide screens
// - Skeleton loader for image & content
// - Inline validation & focused error states
// - Expandable syllabus & benefits (accordion)
// - Pre-fills course into the form when coming from slug

export default function CourseDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ name: "", email: "", phone: "", mode: "Online", course: "" });
  const [formLoading, setFormLoading] = useState(false);
  const [openIdx, setOpenIdx] = useState(null);

  const courses = [
    "Diploma in Digital Marketing",
    "Diploma in PHP Web Development",
    "Diploma in Data Science & AI",
    "Diploma in Business & Soft Skills",
    "Diploma in Android App Development",
    "SAP Global Certification Course",
  ];

  useEffect(() => {
    // For SSG, use static import instead of fetch
    const courseData = coursesData.find((x) => x.slug === slug);
    setCourse(courseData || null);
    if (courseData) setForm((f) => ({ ...f, course: courseData.title }));
    setLoading(false);
  }, [slug]);

  const update = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const validate = () => {
    if (!form.name.trim()) return "Please enter your name.";
    if (!form.email.match(/^[^@\s]+@[^@\s]+\.[^@\s]+$/)) return "Please enter a valid email.";
    if (!form.phone.match(/^\+?[0-9]{7,15}$/)) return "Please enter a valid phone number (digits only).";
    if (!form.course) return "Please choose a course.";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const err = validate();
    if (err) {
      toast.error(err);
      return;
    }

    const payload = {
      name: form.name.trim(),
      email: form.email.trim(),
      phone_number: form.phone.trim(),
      course_mode: form.mode,
      course: form.course,
    };

    try {
      setFormLoading(true);
      const res = await api.post("/registrations/", payload);
      if (res.status === 201 || res.status === 200) {
        toast.success("Registration submitted — we'll contact you soon!");
        setForm({ name: "", email: "", phone: "", mode: "Online", course: course?.title || "" });
      } else {
        toast.info("Received unexpected response from server.");
      }
    } catch (err) {
      console.error("Registration error:", err);
      const message =
        err?.response?.data?.detail || err?.response?.data || err?.message || "Failed to submit registration.";
      toast.error(message);
    } finally {
      setFormLoading(false);
    }
  };

  const toggleAccordion = (i) => setOpenIdx(openIdx === i ? null : i);

  if (loading)
    return (
      <div className="p-8 max-w-4xl mx-auto">
        <div className="animate-pulse space-y-4">
          <div className="h-48 bg-gray-200 rounded-lg" />
          <div className="h-6 bg-gray-200 rounded w-3/4" />
          <div className="h-4 bg-gray-200 rounded w-1/2" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="h-40 bg-gray-200 rounded" />
            <div className="h-40 bg-gray-200 rounded" />
          </div>
        </div>
      </div>
    );

  if (!course)
    return (
      <main className="p-8 text-center">
        <h2 className="text-2xl font-bold">Course not found</h2>
        <p className="mt-3 text-slate-600">The course you're looking for doesn't exist.</p>
        <div className="mt-6">
          <button onClick={() => navigate("/")} className="px-4 py-2 bg-blue-600 text-white rounded">
            Back to home
          </button>
        </div>
      </main>
    );

  // Define site URL for canonical links and Open Graph
  const siteUrl = import.meta.env.VITE_SITE_URL || 'https://edigital.globalinfosofts.com';
  const canonicalUrl = `${siteUrl}/courses/${slug}`;
  
  return (
    <main className="max-w-6xl mx-auto py-10 px-4">
      <Helmet>
        <title>{course.title} | E-Digital Training</title>
        <meta name="description" content={course.subtitle || course.longDescription?.substring(0, 160)} />
        <link rel="canonical" href={canonicalUrl} />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:title" content={`${course.title} | E-Digital Training`} />
        <meta property="og:description" content={course.subtitle || course.longDescription?.substring(0, 160)} />
        <meta property="og:image" content={course.image?.startsWith('http') ? course.image : `${siteUrl}${course.image}`} />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={canonicalUrl} />
        <meta name="twitter:title" content={`${course.title} | E-Digital Training`} />
        <meta name="twitter:description" content={course.subtitle || course.longDescription?.substring(0, 160)} />
        <meta name="twitter:image" content={course.image?.startsWith('http') ? course.image : `${siteUrl}${course.image}`} />
        
        {/* JSON-LD structured data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Course",
            "name": course.title,
            "description": course.longDescription,
            "provider": {
              "@type": "Organization",
              "name": "E-Digital Training",
              "sameAs": siteUrl
            },
            "offers": {
              "@type": "Offer",
              "category": "Online Course",
              "availability": "https://schema.org/InStock"
            },
            "url": canonicalUrl,
            "image": course.image?.startsWith('http') ? course.image : `${siteUrl}${course.image}`
          })}
        </script>
      </Helmet>

      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <article className="lg:col-span-7 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="rounded-lg overflow-hidden shadow"
          >
            <img
              src={course.image}
              alt={course.title}
              className="w-full h-64 sm:h-72 object-cover"
              loading="lazy"
            />
          </motion.div>

          <motion.header initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.05 }}>
            <h1 className="text-3xl font-extrabold tracking-tight">{course.title}</h1>
            <p className="mt-2 text-slate-600">{course.subtitle}</p>
          </motion.header>

          <section className="bg-white rounded-lg p-6 shadow">
            <h3 className="font-semibold mb-3">Overview</h3>
            <p className="text-slate-700 leading-relaxed">{course.longDescription}</p>
          </section>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="bg-white p-5 rounded-lg shadow">
              <h4 className="font-semibold mb-2">What You Will Learn</h4>
              <ul className="list-inside list-disc text-slate-700 space-y-1">
                {course.whatYouWillLearn.map((s, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <FiCheckCircle className="mt-1" /> <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white p-5 rounded-lg shadow">
              <h4 className="font-semibold mb-2">Core Benefits</h4>
              <ul className="list-inside list-disc text-slate-700 space-y-1">
                {course.coreBenefits.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
            </div>
          </div>

          <section className="bg-white rounded-lg p-6 shadow">
            <h4 className="font-semibold mb-3">Syllabus</h4>
            <div className="divide-y">
              {course.syllabus?.map((s, i) => (
                <div key={i} className="py-3">
                  <button
                    onClick={() => toggleAccordion(i)}
                    className="w-full text-left flex justify-between items-center"
                    aria-expanded={openIdx === i}
                  >
                    <div>
                      <strong>{s.title}</strong>
                      <div className="text-xs text-slate-500">{s.summary}</div>
                    </div>
                    <div className="text-slate-400">{openIdx === i ? "—" : "+"}</div>
                  </button>

                  {openIdx === i && (
                    <div className="mt-3 text-slate-700">{s.topics.join(", ")}</div>
                  )}
                </div>
              ))}
            </div>
          </section>

          <section className="bg-white rounded-lg p-6 shadow">
            <h4 className="font-semibold mb-3">Who should take this</h4>
            <div className="text-slate-700">{course.idealFor.join(", ")}</div>
          </section>
        </article>

        <aside className="lg:col-span-5">
          <div className="sticky top-24">
            <motion.div
              initial={{ opacity: 0, scale: 0.995 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.05 }}
              className="bg-gradient-to-br from-white to-slate-50 border border-gray-200 rounded-2xl p-6 shadow-xl"
            >
              

              <form onSubmit={handleSubmit} className="mt-5 space-y-3" aria-label="Register for course form">
                <label className="block">
                  <input
                    name="name"
                    value={form.name}
                    onChange={update}
                    placeholder="Full name"
                    className="w-full px-3 py-2 rounded-md bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-sky-400"
                    aria-required
                  />
                </label>

                <label className="block">
                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={update}
                    placeholder="Email"
                    className="w-full px-3 py-2 rounded-md bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-sky-400"
                    aria-required
                  />
                </label>

                <label className="block">
                  <input
                    name="phone"
                    value={form.phone}
                    onChange={update}
                    placeholder="Phone (digits only, optional +)"
                    className="w-full px-3 py-2 rounded-md bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-sky-400"
                    aria-required
                  />
                </label>

                <div className="grid grid-cols-2 gap-2">
                  <select
                    name="mode"
                    value={form.mode}
                    onChange={update}
                    className="w-full px-3 py-2 rounded-md bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-sky-400"
                    aria-label="Course mode"
                  >
                    <option>Online</option>
                    <option>Offline</option>
                    <option>Hybrid</option>
                  </select>

                  <select
                    name="course"
                    value={form.course}
                    onChange={update}
                    className="w-full px-3 py-2 rounded-md bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-sky-400"
                    aria-required
                  >
                    <option value="">Select course</option>
                    {courses.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={formLoading}
                  className={`w-full inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-white font-medium transition ${
                    formLoading ? "bg-slate-600" : "bg-sky-600 hover:bg-sky-700"
                  }`}
                >
                  <HiPaperAirplane className="h-5 w-5" />
                  {formLoading ? "Submitting..." : "Apply Now"}
                </button>

                <div className="text-xs text-slate-500 text-center">Or call us at <strong> "993-4141-233"</strong></div>
              </form>

              
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.12 }}
              className="mt-4"
            >
              
            </motion.div>
          </div>
        </aside>
      </section>
    </main>
  );
}
