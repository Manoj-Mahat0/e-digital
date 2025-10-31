// src/components/HeroWithRegistration.jsx
import React, { useState, useEffect } from "react";
import { HiCheck, HiPaperAirplane, HiAcademicCap, HiLightningBolt, HiX } from "react-icons/hi";
import api from "../services/api"; // adjust path if needed
import { toast } from "react-toastify";

export default function HeroWithRegistration() {
  const [activeTab, setActiveTab] = useState("new");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    mode: "Online",
    course: "",
  });
  const [loading, setLoading] = useState(false);

  // UPDATED: Renamed original showModal to showPaymentModal
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  // NEW: State for the pre-payment confirmation modal
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  // NEW: State for the post-submission success modal
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const [paymentForm, setPaymentForm] = useState({
    transactionId: "",
    screenshot: null,
  });
  const [statusEmail, setStatusEmail] = useState("");
  const [statusResult, setStatusResult] = useState(null);
  const [statusLoading, setStatusLoading] = useState(false);

  const update = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const courses = [
    "Diploma in Digital Marketing",
    "Diploma in Web Development",
    "Diploma in Data Science & AI",
    "Diploma in Business & Soft Skills",
    "Diploma in Android App Development",
    "SAP Global Certification Course",
  ];

  // Helper function to reset forms after submission
  const resetForms = () => {
    setForm({
      name: "",
      email: "",
      phone: "",
      mode: "",
      course: "",
    });
    setPaymentForm({
      transactionId: "",
      screenshot: null,
    });
  };

  // 1. UPDATED: Opens the new confirmation modal
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.phone || !form.course) {
      toast.error("Please fill all required fields.");
      return;
    }
    setShowConfirmationModal(true);
  };

  // 2. NEW: Moves from Confirmation Modal to simple registration submission
  const handleConfirmRegistration = async () => {
    setShowConfirmationModal(false);

    try {
      setLoading(true);
      // Submit registration without payment
      const payload = {
        name: form.name,
        email: form.email,
        phone_number: form.phone,
        course_mode: form.mode,
        course: form.course,
      };

      const res = await api.post("https://be.edigital.globalinfosofts.com/registrations/", payload);

      if (res.status === 201 || res.status === 200) {
        toast.success("Registration submitted successfully! We'll contact you soon.");
        resetForms(); // Clear the forms
        setShowSuccessModal(true); // Open success modal
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

  // 3. UPDATED: Closes Payment Modal and Opens Success Modal on success
  const handlePaymentSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      // First, submit registration
      const regPayload = {
        name: form.name,
        email: form.email,
        phone_number: form.phone,
        course_mode: form.mode,
        course: form.course,
      };
      const regRes = await api.post("https://be.edigital.globalinfosofts.com/registrations/", regPayload);
      if (regRes.status !== 201 && regRes.status !== 200) {
        throw new Error("Registration failed");
      }
      const registrationId = regRes.data.id;

      // Then, submit payment
      const formData = new FormData();
      formData.append("transaction_id", paymentForm.transactionId);
      formData.append("registration_id", registrationId);
      formData.append("screenshot", paymentForm.screenshot);

      const payRes = await api.post("https://be.edigital.globalinfosofts.com/payments/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (payRes.status === 201 || payRes.status === 200) {
        toast.success("Payment submitted — we'll contact you soon!");
        resetForms(); // Clear the forms
        setShowPaymentModal(false); // Close payment modal
        setShowSuccessModal(true); // Open success modal
      } else {
        toast.info("Received unexpected response from server.");
      }
    } catch (err) {
      console.error("Submission error:", err);
      const message =
        err?.response?.data?.detail ||
        err?.response?.data ||
        err?.message ||
        "Failed to submit.";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  // 4. UPDATED: Closes Payment Modal and Opens Success Modal on success
  const handleSkip = async () => {
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
        resetForms(); // Clear the forms
        setShowPaymentModal(false); // Close payment modal
        setShowSuccessModal(true); // Open success modal
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

  const updatePaymentForm = (e) => {
    const { name, value, files } = e.target;
    if (name === "screenshot") {
      setPaymentForm((f) => ({ ...f, [name]: files[0] }));
    } else {
      setPaymentForm((f) => ({ ...f, [name]: value }));
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
      const registrations = regRes.data.items;
      const userReg = registrations.find(reg => reg.email === statusEmail);

      if (!userReg) {
        setStatusResult({ status: "Not Found", message: "No registration found with this email." });
        return;
      }

      const payRes = await api.get("https://be.edigital.globalinfosofts.com/payments/");
      const payments = payRes.data.items;
      const userPayment = payments.find(pay => pay.registration_id === userReg.id);

      if (userPayment && userPayment.status === "completed") {
        setStatusResult({ status: "Paid", message: "Your payment has been completed.", details: userReg });
      } else {
        setStatusResult({ status: "Not Paid", message: "Payment not found or not completed.", details: userReg });
      }
    } catch (err) {
      console.error("Status check error:", err);
      toast.error("Failed to check status.");
    } finally {
      setStatusLoading(false);
    }
  };

  // Lazy load non-critical images
  useEffect(() => {
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            if (img.dataset.src) {
              img.src = img.dataset.src;
              img.removeAttribute('data-src');
            }
            observer.unobserve(img);
          }
        });
      });

      const images = document.querySelectorAll('img[data-src]');
      images.forEach(img => imageObserver.observe(img));

      return () => {
        imageObserver.disconnect();
      };
    }
  }, []);

  return (
    // Switched to a light background with a subtle gradient/texture
    <section className="relative w-full z-20 min-h-[85vh] flex items-center bg-white border-b border-gray-100">
      <div className="relative z-20 max-w-7xl mx-auto px-6 py-20 lg:py-28 w-full">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* CONTENT: left on desktop */}
          <div className="lg:col-span-7 order-1 lg:order-1">
            <h1 className="text-3xl sm:text-4xl lg:text-4xl font-extrabold tracking-tight text-gray-900 leading-tight mb-4">
              Launch Your Career in <span className="text-sky-600">6 Months</span>{" "}
              with Our Professional Diploma
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
                  <span>Exciting job opportunities starting at <strong>₹2.5 LPA </strong> you could earn even more based on your skills and how you perform in the interview!</span>
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
              {/* Tabs */}
              <div className="flex mb-4 bg-gray-100 rounded-lg p-1">
                <button
                  type="button"
                  onClick={() => setActiveTab("new")}
                  className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition ${activeTab === "new"
                      ? "bg-white text-sky-600 shadow-sm"
                      : "text-gray-600 hover:text-gray-900"
                    }`}
                >
                  New Registration
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("status")}
                  className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition ${activeTab === "status"
                      ? "bg-white text-sky-600 shadow-sm"
                      : "text-gray-600 hover:text-gray-900"
                    }`}
                >
                  Get Registration Status
                </button>
              </div>

              {activeTab === "new" ? (
                <form
                  onSubmit={handleFormSubmit}
                  className="bg-white p-6 sm:p-8 shadow-2xl border border-sky-100 rounded-xl"
                  aria-label="Course Registration Form"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <HiLightningBolt className="h-7 w-7 text-sky-600" />
                    <h4 className="text-xl text-gray-900 font-bold">
                      Request Course Consultation
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
                        {/* <option value="Online">Online Mode</option> */}
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
                    className={`mt-6 w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-base font-semibold shadow-md transition transform hover:scale-[1.01] ${loading
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
              ) : (
                <div className="bg-white p-6 sm:p-8 shadow-2xl border border-sky-100 rounded-xl">
                  <div className="flex items-center gap-3 mb-6">
                    <HiAcademicCap className="h-7 w-7 text-sky-600" />
                    <h4 className="text-xl text-gray-900 font-bold">
                      Check Registration Status
                    </h4>
                  </div>

                  <form onSubmit={handleStatusSubmit} className="space-y-4">
                    <input
                      type="email"
                      value={statusEmail}
                      onChange={(e) => setStatusEmail(e.target.value)}
                      required
                      placeholder="Enter your email address"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-sky-500 transition"
                    />

                    <button
                      type="submit"
                      disabled={statusLoading}
                      className={`w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-base font-semibold shadow-md transition transform hover:scale-[1.01] ${statusLoading
                          ? "bg-sky-400 text-white cursor-not-allowed"
                          : "bg-sky-600 hover:bg-sky-700 text-white"
                        }`}
                    >
                      {statusLoading ? "Checking..." : "Check Status"}
                    </button>
                  </form>

                  {statusResult && (
                    <div className="mt-6 p-4 rounded-lg border">
                      <h5 className="font-semibold text-gray-900 mb-2">Status: {statusResult.status}</h5>
                      <p className="text-gray-700">{statusResult.message}</p>
                      {statusResult.details && (
                        <div className="mt-2 text-sm text-gray-600">
                          <p><strong>Name:</strong> {statusResult.details.name}</p>
                          <p><strong>Course:</strong> {statusResult.details.course}</p>
                          <p><strong>Mode:</strong> {statusResult.details.course_mode}</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* small spacer so next section doesn't butt up flush against hero */}
       

        

{/* NEW CONFIRMATION MODAL (Pre-Payment) */ }
{
  showConfirmationModal && (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-xl shadow-2xl max-w-sm w-full mx-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-gray-900">Confirm Registration Details</h3>
          <button
            onClick={() => setShowConfirmationModal(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            <HiX className="h-6 w-6" />
          </button>
        </div>
        <p className="text-gray-600 mb-4">Please confirm your details before proceeding to payment.</p>

        <div className="space-y-2 p-3 bg-gray-50 rounded-lg text-sm mb-6">
          <p><strong>Name:</strong> {form.name}</p>
          <p><strong>Email:</strong> {form.email}</p>
          <p><strong>Phone:</strong> {form.phone}</p>
          <p><strong>Course:</strong> {form.course}</p>
        </div>

        <div className="flex gap-4 mt-4">
          <button
            type="button"
            onClick={() => setShowConfirmationModal(false)}
            className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-base font-semibold shadow-md transition bg-gray-200 hover:bg-gray-300 text-gray-700"
          >
            Edit
          </button>
          <button
            type="button"
            onClick={handleConfirmRegistration}
            className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-base font-semibold shadow-md transition transform hover:scale-[1.01] bg-sky-600 hover:bg-sky-700 text-white"
          >
            Confirm Registration
          </button>
        </div>
      </div>
    </div>
  )
}

{/* NEW SUCCESS MODAL (Post-Submission) */ }
{
  showSuccessModal && (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-xl shadow-2xl max-w-sm w-full mx-4 text-center">
        <div className="flex justify-center mb-4">
          <HiCheck className="h-10 w-10 text-emerald-500 bg-emerald-100 p-2 rounded-full" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">Submission Successful!</h3>
        <p className="text-gray-600 mb-6">
          Thank you for your submission. Your details and payment information (if provided) have been received. We will contact you soon for confirmation and next steps.
        </p>
        <button
          type="button"
          onClick={() => setShowSuccessModal(false)} // ✅ FIXED: Use setShowSuccessModal
          className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-base font-semibold shadow-md transition bg-sky-600 hover:bg-sky-700 text-white"
        >
          Close
        </button>
      </div>
    </div>
  )
}
      </div >
    </section >
  );
}