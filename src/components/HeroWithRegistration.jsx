// src/components/HeroWithRegistration.jsx
import React, { useState } from "react";
import { HiCheck, HiPaperAirplane, HiAcademicCap, HiLightningBolt } from "react-icons/hi";
import api from "../services/api"; // adjust path if needed
import { toast } from "react-toastify";

export default function HeroWithRegistration() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    mode: "Online",
    course: "",
  });
  const [loading, setLoading] = useState(false);

  const update = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const courses = [
    "Diploma in Digital Marketing",
    "Diploma in PHP Web Development",
    "Diploma in Data Science & AI",
    "Diploma in Business & Soft Skills",
    "Diploma in Android App Development",
    "SAP Global Certification Course",
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.phone || !form.course) {
      toast.error("Please fill all required fields.");
      return;
    }

    const payload = {
      name: form.name,
      email: form.email,
      phone_number: form.phone,
      course_mode: form.mode,
      course: form.course,
    };

    try {
      setLoading(true);
      const res = await api.post("/registrations/", payload);
      if (res.status === 201 || res.status === 200) {
        toast.success("Registration submitted — we'll contact you soon!");
        setForm({
          name: "",
          email: "",
          phone: "",
          mode: "Online",
          course: "",
        });
      } else {
        toast.info("Received unexpected response from server.");
      }
    } catch (err) {
      console.error("Registration error:", err);
      const message =
        err?.response?.data?.detail ||
        err?.response?.data ||
        err?.message ||
        "Failed to submit registration.";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    // Switched to a light background with a subtle gradient/texture
    <section className="relative w-full z-20 min-h-[85vh] flex items-center bg-white border-b border-gray-100">
      <div className="relative z-20 max-w-7xl mx-auto px-6 py-20 lg:py-28 w-full">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* CONTENT: left on desktop */}
          <div className="lg:col-span-7 order-1 lg:order-1">
            <h1 className="text-3xl sm:text-4xl lg:text-4xl font-extrabold tracking-tight text-gray-900 leading-tight mb-4">
              Launch Your Career in <span className="text-sky-600">6 Months</span>{" "}
              with Our Professional Diplomas 
            </h1>

            <p className="text-base text-gray-600 max-w-3xl mb-6">
              Gain <strong>job-guaranteed skills</strong> in the most in-demand digital and tech fields. Our diploma programs are fast, practical, and focused on <strong>100% placement</strong> assurance.
            </p>

            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center gap-2">
                 <HiAcademicCap className="h-6 w-6 text-sky-600" />
                 Why E-Digital India?
              </h3>
              <ul className="space-y-3 text-base text-gray-700">
                <li className="flex items-start gap-4">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-emerald-100 flex items-center justify-center">
                    <HiCheck className="h-4 w-4 text-emerald-600 font-bold" />
                  </div>
                  <span>Job opportunities starting from <strong>₹4.5 LPA</strong> (Guaranteed Placement)</span>
                </li>
                <li className="flex items-start gap-4">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-emerald-100 flex items-center justify-center">
                    <HiCheck className="h-4 w-4 text-emerald-600 font-bold" />
                  </div>
                  <span>Master <strong>freelancing</strong> and generate additional, high-income streams</span>
                </li>
                <li className="flex items-start gap-4">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-emerald-100 flex items-center justify-center">
                    <HiCheck className="h-4 w-4 text-emerald-600 font-bold" />
                  </div>
                  <span>Practical, <strong>hands-on learning</strong> guided by industry experts</span>
                </li>
              </ul>
            </div>

            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-4">
              Explore Our Top Diploma Programs
            </h3>

            {/* Two-column (responsive) list - cleaner icon and spacing */}
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 text-base text-gray-700 max-w-2xl">
              {courses.map((c) => (
                <li key={c} className="flex items-center gap-3 font-medium">
                  <span className="inline-block w-2.5 h-2.5 bg-sky-500 rounded-full flex-shrink-0" />
                  <span>{c}</span>
                </li>
              ))}
            </ul>

            <p className="mt-6 text-gray-800 text-base max-w-2xl border-l-4 border-sky-400 pl-4 italic">
              "Your Future Starts Here. In just 6 months, you can turn your passion into a <strong>high-paying career</strong> in the digital world."
            </p>
          </div>

          {/* FORM: right on desktop */}
          <div className="lg:col-span-5 order-2 lg:order-2">
            <div className="w-full max-w-lg mx-auto lg:mx-0">
              <form
                onSubmit={handleSubmit}
                className="bg-white p-6 sm:p-8 shadow-2xl border border-sky-100 rounded-xl"
                aria-label="Course Registration Form"
              >
                <div className="flex items-center gap-3 mb-6">
                    <HiLightningBolt className="h-7 w-7 text-sky-600" />
                    <h4 className="text-xl text-gray-900 font-bold">
                        Request Free Course Consultation
                    </h4>
                </div>
                
                <div className="space-y-4">
                  <input
                    name="name"
                    value={form.name}
                    onChange={update}
                    required
                    placeholder="Full Name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-sky-500 transition"
                  />
                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={update}
                    required
                    placeholder="Email Address"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-sky-500 transition"
                  />
                  <input
                    name="phone"
                    type="tel"
                    value={form.phone}
                    onChange={update}
                    required
                    placeholder="Phone Number"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-sky-500 transition"
                  />
                  
                  <div className="grid grid-cols-2 gap-4">
                      <select
                          name="mode"
                          value={form.mode}
                          onChange={update}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-sky-500 transition"
                      >
                          <option value="Online">Online Mode</option>
                          <option value="Offline">Offline/In-Person</option>
                          <option value="Hybrid">Hybrid Mode</option>
                      </select>

                      <select
                          name="course"
                          value={form.course}
                          onChange={update}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-sky-500 transition"
                      >
                          <option value="" disabled>Select a Course</option>
                          {courses.map((c) => (
                              <option key={c} value={c}>
                                  {c}
                              </option>
                          ))}
                      </select>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className={`mt-6 w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-base font-semibold shadow-md transition transform hover:scale-[1.01] ${
                    loading 
                    ? "bg-sky-400 text-white cursor-not-allowed" 
                    : "bg-sky-600 hover:bg-sky-700 text-white"
                  }`}
                >
                  <HiPaperAirplane className="h-5 w-5 -rotate-45" />
                  {loading ? "Submitting..." : "Secure Your Spot"}
                </button>
                
                <p className="mt-4 text-center text-xs text-gray-500">
                    Your details are safe. We'll contact you within 24 hours.
                </p>
              </form>
            </div>
          </div>
        </div>

        {/* small spacer so next section doesn't butt up flush against hero */}
        <div className="mt-12" />
      </div>
    </section>
  );
}
