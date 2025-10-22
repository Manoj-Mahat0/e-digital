import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { HiPaperAirplane, HiLightningBolt, HiAcademicCap, HiDocumentText, HiChevronDown } from "react-icons/hi";
import { FiCheckCircle } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import api from "../services/api";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet-async";

// --- Accordion item (unchanged except small aria ids) ---
const SyllabusAccordionItem = ({ section, index, isOpen, toggle }) => (
  <div className="bg-white border-b last:border-b-0">
    <button
      id={`syllabus-header-${index}`}
      onClick={() => toggle(index)}
      className="w-full text-left flex items-start justify-between gap-3 p-4 hover:bg-gray-50 transition duration-150 ease-in-out"
      aria-expanded={isOpen}
      aria-controls={`syllabus-content-${index}`}
    >
      <div>
        <div className="font-semibold text-gray-800">{section.title}</div>
        {section.summary && <div className="text-xs text-slate-500 mt-0.5">{section.summary}</div>}
      </div>
      <motion.div
        animate={{ rotate: isOpen ? 180 : 0 }}
        transition={{ duration: 0.2 }}
        className="text-sky-500 text-xl flex-shrink-0"
      >
        <HiChevronDown className="h-5 w-5" />
      </motion.div>
    </button>

    <AnimatePresence>
      {isOpen && (
        <motion.div
          id={`syllabus-content-${index}`}
          role="region"
          aria-labelledby={`syllabus-header-${index}`}
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
        >
          <div className="pb-4 pt-1 px-4 text-sm text-slate-700 bg-gray-50 border-t border-gray-100" id={`syllabus-panel-${index}`}>
            {Array.isArray(section.topics) ? section.topics.join(", ") : section.topics}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

export default function CourseDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [course, setCourse] = useState(null);
  const [allCourses, setAllCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("new");
  const [form, setForm] = useState({ name: "", email: "", phone: "", mode: "Online", course: "" });
  const [formLoading, setFormLoading] = useState(false);
  const [statusEmail, setStatusEmail] = useState("");
  const [statusResult, setStatusResult] = useState(null);
  const [statusLoading, setStatusLoading] = useState(false);
  const [openIdx, setOpenIdx] = useState(null);

  // NEW: enquiry overlay states
  const [enquiryForm, setEnquiryForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [enquiryLoading, setEnquiryLoading] = useState(false);
  const [enquirySubmitted, setEnquirySubmitted] = useState(false); // when true -> remove blur

  // load courses.json from public directory at runtime
  useEffect(() => {
    const controller = new AbortController();
    let isMounted = true;

    (async () => {
      try {
        const res = await fetch("/data/courses.json", { cache: "no-cache", signal: controller.signal });
        if (!res.ok) throw new Error(`Failed to fetch courses.json (status ${res.status})`);
        const data = await res.json();
        if (!isMounted) return;
        setAllCourses(data);
        const found = data.find((c) => c.slug === slug) || null;
        setCourse(found);
        if (found) setForm((f) => ({ ...f, course: found.title }));
      } catch (err) {
        if (err.name === "AbortError") return;
        console.error("Failed to load courses.json:", err);
        toast.error("Unable to load course data.");
      } finally {
        if (isMounted) setLoading(false);
      }
    })();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [slug]);

  const coursesMap = useMemo(() => {
    return allCourses.reduce((acc, c) => {
      acc[c.slug] = c.title;
      return acc;
    }, {});
  }, [allCourses]);

  const update = useCallback((e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }, []);

  const validate = () => {
    if (!form.name.trim()) return "Please enter your name.";
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) return "Please enter a valid email.";
    const digitsOnly = form.phone.replace(/[^\d+]/g, "");
    const normalized = digitsOnly.startsWith("+") ? digitsOnly.slice(1) : digitsOnly;
    if (!/^[0-9]{7,15}$/.test(normalized)) return "Please enter a valid phone number (7–15 digits).";
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
      phone_number: form.phone.trim().replace(/[^\d+]/g, ""),
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

  const handleStatusSubmit = async (e) => {
    e.preventDefault();
    if (!statusEmail) {
      toast.error("Please enter your email.");
      return;
    }
    try {
      setStatusLoading(true);
      const regRes = await api.get("https://be.edigital.globalinfosofts.com/registrations/?skip=0&limit=50");
      const registrations = regRes.data.items || [];
      const userReg = registrations.find((reg) => reg.email === statusEmail);

      if (!userReg) {
        setStatusResult({ status: "Not Found", message: "No registration found with this email." });
        return;
      }

      const payRes = await api.get("https://be.edigital.globalinfosofts.com/payments/");
      const payments = payRes.data.items || [];
      const userPayment = payments.find((pay) => pay.registration_id === userReg.id);

      if (userPayment && userPayment.status === "completed") {
        setStatusResult({ status: "Paid", message: "Your payment has been completed.", details: userReg });
      } else {
        setStatusResult({ status: "Pending", message: "Registration found, awaiting payment or verification.", details: userReg });
      }
    } catch (err) {
      console.error("Status check error:", err);
      toast.error("Failed to check status.");
    } finally {
      setStatusLoading(false);
    }
  };

  const toggleAccordion = useCallback((i) => {
    setOpenIdx((prev) => (prev === i ? null : i));
  }, []);

  // helper to make an absolute URL for files in public directory
  const resolvePublicPath = (path) => {
    if (!path) return null;
    if (/^https?:\/\//i.test(path)) return path;
    if (path.startsWith("/")) return `${window.location.origin}${path}`;
    return `${window.location.origin}/${path}`;
  };

  // --- NEW: Enquiry form handlers (overlay) ---
  const updateEnquiry = (e) => {
    const { name, value } = e.target;
    setEnquiryForm((s) => ({ ...s, [name]: value }));
  };

  const validateEnquiry = () => {
    if (!enquiryForm.name.trim()) return "Name is required.";
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(enquiryForm.email)) return "Valid email is required.";
    if (!/^[0-9]{7,15}$/.test(enquiryForm.phone.replace(/[^\d]/g, ""))) return "Valid phone is required (7-15 digits).";
    return null;
  };

  const handleEnquirySubmit = async (e) => {
    e.preventDefault();
    const err = validateEnquiry();
    if (err) {
      toast.error(err);
      return;
    }

    const payload = {
      name: enquiryForm.name.trim(),
      email: enquiryForm.email.trim(),
      phone: enquiryForm.phone.trim().replace(/[^\d]/g, ""),
      message: enquiryForm.message || `Enquiry about ${course?.title || "course"}`,
    };

    try {
      setEnquiryLoading(true);
      // Using absolute endpoint same as your curl
      const res = await api.post("https://be.edigital.globalinfosofts.com/contact/", payload);
      // Some axios setups return res.status; others return res.data — check your api wrapper.
      const status = res?.status || (res && res.data ? 201 : 0);
      if (status === 201 || status === 200) {
        toast.success("Thank You - Enjoy Your Syllabus");
        setEnquirySubmitted(true); // remove blur
        // Optionally store response or clear form
        setEnquiryForm({ name: "", email: "", phone: "", message: "" });
      } else {
        toast.info("Received unexpected response from server.");
      }
    } catch (err) {
      console.error("Enquiry submit error:", err);
      const message =
        err?.response?.data?.detail || err?.response?.data || err?.message || "Failed to submit enquiry.";
      toast.error(message);
    } finally {
      setEnquiryLoading(false);
    }
  };

  // Renders syllabus section: handles string (pdf path) or array of sections
  const renderSyllabus = () => {
    if (!course?.syllabus) return <p className="text-sm text-slate-600">Syllabus not available.</p>;

    // case: array (sections)
    if (Array.isArray(course.syllabus)) {
      return (
        <div className="divide-y rounded-lg overflow-hidden border border-gray-100 shadow-sm">
          {course.syllabus.map((s, i) => (
            <SyllabusAccordionItem
              key={i}
              section={s}
              index={i}
              isOpen={openIdx === i}
              toggle={toggleAccordion}
            />
          ))}
        </div>
      );
    }

    // case: string (pdf path) - Display PDF using object fallback
    if (typeof course.syllabus === "string") {
      const pdfUrl = resolvePublicPath(course.syllabus);
      const safeUrl = encodeURI(pdfUrl);

      return (
        <div className="space-y-4 p-4 bg-sky-50 rounded-xl border border-sky-200 relative">
          <div className="flex items-center gap-3 text-sky-700">
            <HiDocumentText className="h-6 w-6" />
            <p className="font-semibold">Course Syllabus</p>
          </div>
          <p className="text-sm text-sky-800">View the full syllabus below.</p>

          <div className={`rounded-lg border border-gray-200 overflow-hidden ${!enquirySubmitted ? "relative" : ""}`}>
            {/* If not submitted, apply blur to viewer */}
            <div style={{ filter: enquirySubmitted ? "none" : "blur(6px)" }}>
              <object data={safeUrl} type="application/pdf" width="100%" height="600">
                <iframe
                  src={safeUrl}
                  width="100%"
                  height="600px"
                  title="Syllabus PDF"
                  className="border-0"
                />
              </object>
            </div>

            {/* Overlay enquiry form shown while not submitted */}
            {!enquirySubmitted && (
              <div
                role="dialog"
                aria-modal="true"
                aria-label="Enquiry form to unlock syllabus"
                className="absolute inset-0 flex items-center justify-center p-6"
              >
                <div className="w-full max-w-md bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl border border-gray-100 p-5">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Request Syllabus Access</h3>
                  <p className="text-sm text-gray-600 mb-4">Fill this short enquiry to view the full syllabus.</p>

                  <form onSubmit={handleEnquirySubmit} className="space-y-3">
                    <input name="name" value={enquiryForm.name} onChange={updateEnquiry} placeholder="Full name" className="w-full px-3 py-2 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none" required />
                    <input name="email" type="email" value={enquiryForm.email} onChange={updateEnquiry} placeholder="Email address" className="w-full px-3 py-2 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none" required />
                    <input name="phone" value={enquiryForm.phone} onChange={updateEnquiry} placeholder="Phone (digits only)" className="w-full px-3 py-2 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none" required />
                    <textarea name="message" value={enquiryForm.message} onChange={updateEnquiry} placeholder={`I'm interested in ${course?.title || "this course"}`} className="w-full px-3 py-2 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none" rows={3} />

                    <div className="flex gap-2">
                      <button type="submit" disabled={enquiryLoading} className={`flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-white font-semibold ${enquiryLoading ? "bg-slate-500 cursor-not-allowed" : "bg-sky-600 hover:bg-sky-700"}`}>
                        <HiPaperAirplane className={`h-4 w-4 ${enquiryLoading ? "animate-pulse" : ""}`} />
                        {enquiryLoading ? "Sending..." : "Send Enquiry"}
                      </button>
                      <button type="button" onClick={() => { setEnquiryForm({ name: "", email: "", phone: "", message: "" }); toast.info("Form cleared."); }} className="px-4 py-2 rounded-xl border border-gray-200 bg-white">
                        Clear
                      </button>
                    </div>

                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      );
    }

    return <p className="text-sm text-slate-600">Syllabus format not recognized.</p>;
  };

  if (loading)
    return (
      <div className="p-8 max-w-6xl mx-auto">
        <div className="animate-pulse space-y-6">
          <div className="h-64 bg-gray-200 rounded-2xl" />
          <div className="h-8 bg-gray-200 rounded w-3/4" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="h-48 bg-gray-100 rounded-xl" />
            <div className="h-48 bg-gray-100 rounded-xl" />
          </div>
          <div className="h-24 bg-gray-100 rounded-xl" />
        </div>
      </div>
    );

  if (!course)
    return (
      <main className="p-12 text-center max-w-xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800">Course Not Found 😔</h2>
        <p className="mt-3 text-slate-600">The course you are looking for may have been removed or the link is incorrect.</p>
        <div className="mt-8">
          <button onClick={() => navigate("/")} className="px-6 py-3 bg-sky-600 text-white font-semibold rounded-xl hover:bg-sky-700 transition shadow-lg">
            Explore All Courses
          </button>
        </div>
      </main>
    );

  const siteUrl = import.meta.env.VITE_SITE_URL || window.location.origin;
  const canonicalUrl = `${siteUrl}/courses/${slug}`;

  return (
    <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <Helmet>
        <title>{course.title} | E-Digital Training</title>
        <meta name="description" content={course.subtitle || course.longDescription?.substring(0, 160)} />
        <link rel="canonical" href={canonicalUrl} />
      </Helmet>

      <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        <article className="lg:col-span-7 space-y-8">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="rounded-3xl overflow-hidden shadow-2xl">
            <img src={course.image} alt={course.title} className="w-full h-72 object-cover object-center" loading="lazy" />
          </motion.div>

          <header>
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">{course.title}</h1>
            <p className="mt-2 text-xl text-sky-600 font-medium">{course.subtitle}</p>
          </header>

          <hr className="border-gray-100" />

          <section className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100">
            <h3 className="text-2xl font-bold mb-4 text-gray-800">Course Overview</h3>
            <p className="text-slate-700 leading-relaxed text-lg">{course.longDescription}</p>
          </section>

          <hr className="border-gray-100" />

          <div className="grid sm:grid-cols-2 gap-6">
            <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3, delay: 0.1 }} className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100">
              <h4 className="text-xl font-bold mb-3 text-gray-800 flex items-center gap-2">
                <FiCheckCircle className="text-green-500" /> What You Will Learn
              </h4>
              <ul className="list-none text-slate-700 space-y-2">
                {Array.isArray(course.whatYouWillLearn) ? course.whatYouWillLearn.map((s, i) => (
                  <li key={i} className="flex items-start gap-2 text-base"><FiCheckCircle className="mt-1 h-5 w-5 text-sky-500 flex-shrink-0" /> <span>{s}</span></li>
                )) : <li className="text-base">{course.whatYouWillLearn}</li>}
              </ul>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3, delay: 0.2 }} className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100">
              <h4 className="text-xl font-bold mb-3 text-gray-800">
                 Core Benefits
              </h4>
              <ul className="list-inside list-disc text-slate-700 space-y-2">
                {Array.isArray(course.coreBenefits) ? course.coreBenefits.map((b, i) => <li key={i} className="text-base">{b}</li>) : <li className="text-base">{course.coreBenefits}</li>}
              </ul>
            </motion.div>
          </div>

          <hr className="border-gray-100" />

          <section className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100">
            <h4 className="text-2xl font-bold mb-3 text-gray-800">Who Should Take This Course?</h4>
            <div className="text-slate-700 text-base leading-relaxed">
              {Array.isArray(course.idealFor) ? course.idealFor.join(" • ") : course.idealFor}
            </div>
          </section>
        </article>

        <aside className="lg:col-span-5">
          <div className="sticky top-20 space-y-6">
            <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }} className="bg-white border border-sky-100 rounded-3xl p-6 shadow-2xl">
              {/* registration/status tabs */}
              <div className="flex mb-6 bg-gray-100 rounded-xl p-1 shadow-inner">
                <button type="button" onClick={() => setActiveTab("new")} className={`flex-1 py-2 px-4 rounded-xl text-sm font-semibold transition duration-200 ${activeTab === "new" ? "bg-sky-600 text-white shadow-md" : "text-gray-600 hover:text-gray-900"}`}>New Registration</button>
                <button type="button" onClick={() => setActiveTab("status")} className={`flex-1 py-2 px-4 rounded-xl text-sm font-semibold transition duration-200 ${activeTab === "status" ? "bg-sky-600 text-white shadow-md" : "text-gray-600 hover:text-gray-900"}`}>Check Status</button>
              </div>

              {activeTab === "new" ? (
                <form onSubmit={handleSubmit} className="space-y-4" aria-label="Register for course form">
                  <div className="flex items-center gap-3 mb-4">
                    <HiLightningBolt className="h-8 w-8 text-sky-600 flex-shrink-0" />
                    <h4 className="text-xl text-gray-900 font-bold">Request Consultation for {course.title}</h4>
                  </div>

                  <fieldset className="space-y-3">
                    <legend className="sr-only">Contact Details</legend>
                    <label className="block">
                      <input name="name" value={form.name} onChange={update} placeholder="Full name" className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-sky-500 transition" aria-required="true" />
                    </label>

                    <label className="block">
                      <input name="email" type="email" value={form.email} onChange={update} placeholder="Email address" className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-sky-500 transition" aria-required="true" />
                    </label>

                    <label className="block">
                      <input name="phone" value={form.phone} onChange={update} placeholder="Phone (e.g., +1234567890)" className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-sky-500 transition" aria-required="true" />
                    </label>
                  </fieldset>

                  <div className="grid grid-cols-2 gap-3">
                    <label className="block">
                      <select name="mode" value={form.mode} onChange={update} className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-sky-500 transition appearance-none cursor-pointer" aria-label="Course mode">
                        <option>Online</option>
                        <option>Offline</option>
                        <option>Hybrid</option>
                      </select>
                    </label>
                    <label className="block">
                      <select name="course" value={form.course} onChange={update} className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-sky-500 transition appearance-none cursor-pointer" aria-required="true">
                        <option value="">Select course</option>
                        {Object.entries(coursesMap).map(([s, t]) => <option key={s} value={t}>{t}</option>)}
                      </select>
                    </label>
                  </div>

                  <button type="submit" disabled={formLoading} className={`w-full inline-flex items-center justify-center gap-2 px-6 py-3 mt-2 rounded-2xl text-white font-bold text-lg transition duration-200 shadow-lg ${formLoading ? "bg-slate-500 cursor-not-allowed" : "bg-sky-600 hover:bg-sky-700 hover:shadow-xl"}`}>
                    <HiPaperAirplane className={`h-5 w-5 ${formLoading ? "animate-pulse" : ""}`} />
                    {formLoading ? "Sending Request..." : "Apply Now"}
                  </button>

                  <div className="text-sm text-slate-500 text-center pt-2">
                    Or speak to an advisor: <strong className="text-sky-600">993-4141-233</strong>
                  </div>
                </form>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center gap-3 mb-4">
                    <HiAcademicCap className="h-8 w-8 text-sky-600 flex-shrink-0" />
                    <h4 className="text-xl text-gray-900 font-bold">Check Application Status</h4>
                  </div>
                  <form onSubmit={handleStatusSubmit} className="space-y-3">
                    <label className="block">
                      <input type="email" value={statusEmail} onChange={(e) => setStatusEmail(e.target.value)} placeholder="Enter your registered email" className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-sky-500 transition" required />
                    </label>
                    <button type="submit" disabled={statusLoading} className={`w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl text-white font-bold transition duration-200 shadow ${statusLoading ? "bg-slate-500 cursor-not-allowed" : "bg-sky-600 hover:bg-sky-700"}`}>
                      {statusLoading ? "Checking..." : "Check Status"}
                    </button>
                  </form>
                  {statusResult && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }} 
                      animate={{ opacity: 1, y: 0 }} 
                      className={`mt-4 p-5 rounded-xl border-l-4 ${statusResult.status === "Not Found" ? "bg-red-50 border-red-500" : statusResult.status === "Paid" ? "bg-green-50 border-green-500" : "bg-yellow-50 border-yellow-500"}`}
                    >
                      <h5 className="font-bold text-lg text-gray-900 flex items-center gap-2">
                         {statusResult.status === "Paid" ? <FiCheckCircle className="text-green-600 h-5 w-5" /> : null}
                         Application Status: {statusResult.status}
                      </h5>
                      <p className="text-gray-700 mt-2">{statusResult.message}</p>
                      {statusResult.details && (
                        <div className="mt-3 text-sm text-gray-600 space-y-1 p-3 bg-white rounded-lg border">
                          <p><strong>Name:</strong> {statusResult.details.name}</p>
                          <p><strong>Course:</strong> {statusResult.details.course}</p>
                          <p><strong>Mode:</strong> {statusResult.details.course_mode}</p>
                        </div>
                      )}
                    </motion.div>
                  )}
                </div>
              )}
            </motion.div>

            {/* Syllabus card */}
            <motion.aside initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white border border-gray-100 rounded-2xl p-6 shadow-xl" aria-labelledby="syllabus-heading">
              <h4 id="syllabus-heading" className="text-2xl font-bold mb-4 text-gray-800 border-b pb-2">Course Syllabus</h4>
              <div className="text-base text-slate-700">{renderSyllabus()}</div>
            </motion.aside>
          </div>
        </aside>
      </section>
    </main>
  );
}
