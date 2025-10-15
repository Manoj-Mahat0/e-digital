import React, { useState } from "react";
import { HiCheck, HiPaperAirplane, HiUpload } from "react-icons/hi";

export default function JobApplyHero({
  
}) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    resume: null,
    position: "",
  });
  const update = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleFileChange = (e) => {
    setForm((f) => ({ ...f, resume: e.target.files[0] }));
  };

  const positions = [
    "Digital Marketing Executive",
    "PHP Developer",
    "Data Scientist",
    "Business Analyst",
    "Android Developer",
    "SAP Consultant",
  ];

  return (
    <section className="relative w-full">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(14,23,39,0.6), rgba(14,23,39,0.25)), url(${backgroundImage})`,
        }}
        aria-hidden="true"
      />

      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 py-20 lg:py-28">
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Left content */}
          <div className="lg:col-span-7 text-white">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight mb-6">
              Join Our Team and Build Your Career with <span className="text-white">E-Digital India</span>
            </h1>

            <ul className="space-y-3 text-sm sm:text-base text-gray-200 mb-6">
              <li className="flex items-start gap-3">
                <HiCheck className="flex-shrink-0 mt-1 h-5 w-5 text-emerald-400" />
                <span>Competitive salary and benefits package</span>
              </li>
              <li className="flex items-start gap-3">
                <HiCheck className="flex-shrink-0 mt-1 h-5 w-5 text-emerald-400" />
                <span>Growth opportunities in a dynamic environment</span>
              </li>
              <li className="flex items-start gap-3">
                <HiCheck className="flex-shrink-0 mt-1 h-5 w-5 text-emerald-400" />
                <span>Work on cutting-edge projects with innovative team</span>
              </li>
            </ul>

            <h3 className="text-xl font-semibold mt-6 mb-3">Available Positions:</h3>
            <ul className="space-y-2 text-gray-200">
              {positions.map((p) => (
                <li key={p} className="flex items-center gap-3">
                  <span className="inline-block w-3 h-3 bg-sky-500 rounded-sm" />
                  <span className="truncate">{p}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right form card */}
          <div className="lg:col-span-5">
            <div className="w-full max-w-md ml-auto">
              <form
                action={formAction}
                method="POST"
                className="backdrop-blur-sm bg-white/10 border border-white/20 rounded-3xl p-6 sm:p-8 shadow-xl"
                encType="multipart/form-data"
              >
                <input type="hidden" name="_subject" value="Job Application" />
                <input type="hidden" name="_captcha" value="false" />
                <input type="hidden" name="_template" value="table" />
                <input type="hidden" name="_next" value="/thank-you" />

                <h4 className="text-xl text-white font-semibold mb-4">Job Application Form</h4>

                <div className="space-y-3">
                  <label className="block">
                    <input
                      name="name"
                      value={form.name}
                      onChange={update}
                      required
                      placeholder="Full Name"
                      className="w-full px-3 py-2 rounded-md bg-white/90 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-sky-400"
                    />
                  </label>

                  <label className="block">
                    <input
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={update}
                      required
                      placeholder="Email"
                      className="w-full px-3 py-2 rounded-md bg-white/90 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-sky-400"
                    />
                  </label>

                  <label className="block">
                    <input
                      name="phone"
                      value={form.phone}
                      onChange={update}
                      required
                      placeholder="Phone Number"
                      className="w-full px-3 py-2 rounded-md bg-white/90 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-sky-400"
                    />
                  </label>

                  <label className="block">
                    <select
                      name="position"
                      value={form.position}
                      onChange={update}
                      required
                      className="w-full px-3 py-2 rounded-md bg-white/90 text-gray-900 focus:outline-none focus:ring-2 focus:ring-sky-400"
                    >
                      <option value="">Select Position</option>
                      {positions.map((p) => (
                        <option key={p} value={p}>
                          {p}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label className="block">
                    <div className="relative">
                      <HiUpload className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="file"
                        name="resume"
                        onChange={handleFileChange}
                        required
                        accept=".pdf,.doc,.docx"
                        className="pl-10 w-full px-3 py-2 rounded-md bg-white/90 text-gray-900 focus:outline-none focus:ring-2 focus:ring-sky-400"
                      />
                    </div>
                  </label>
                </div>

                <button
                  type="submit"
                  className="mt-4 w-full inline-flex items-center justify-center gap-2 px-4 py-2 rounded-md bg-slate-900 text-white font-medium hover:bg-slate-800 transition"
                >
                  <HiPaperAirplane className="h-4 w-4" />
                  Submit Application
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="mt-8" />
      </div>
    </section>
  );
}
