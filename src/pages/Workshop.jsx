// src/pages/Workshop.jsx
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { 
  HiUser, 
  HiEnvelope, 
  HiDevicePhoneMobile, 
  HiBriefcase, 
  HiPaperAirplane, 
  HiAcademicCap, 
  HiCheck, 
  HiStar,
  HiCalendarDays,
  HiClock,
  HiMapPin,
  HiUserGroup,
  HiSparkles,
  HiTrophy,
  HiLightBulb,
  HiChevronRight,
  HiBookOpen,
  HiChatBubbleBottomCenterText
} from 'react-icons/hi2'
import api from '../services/api'
import { toast } from 'react-toastify'

export default function Workshop() {
  const siteUrl = import.meta.env.VITE_SITE_URL || 'https://edigitalindian.com';

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <Helmet>
        <title>Workshop Registration | E-digital India</title>
        <meta name="description" content="Register for our upcoming workshops at E-Digital India. Enhance your skills and knowledge with our expert-led sessions." />
        <link rel="canonical" href={`${siteUrl}/workshop`} />
      </Helmet>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-indigo-600/5 to-purple-600/10" />
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
          <div className="absolute top-40 right-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-4 lg:py-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", duration: 0.8 }}
                className="inline-flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-sm rounded-full border border-blue-200/50 mb-4"
              >
                <HiSparkles className="w-4 h-4 text-blue-600" />
                <span className="text-xs font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Limited Seats Available
                </span>
              </motion.div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
                <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Transform Your Career
                </span>
                <br />
                <span className="text-slate-800">With Expert Workshops</span>
              </h1>

              <p className="text-sm sm:text-base text-slate-600 max-w-3xl mb-6">
                Join industry experts in intensive, hands-on workshops designed to accelerate your professional growth
              </p>

              
            </motion.div>

            {/* Registration Form moved to hero section */}
            <div className="lg:col-span-1">
              <WorkshopRegistrationCard />
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="space-y-8">
          <WorkshopDetails />
          <WorkshopModules />
          <BenefitsSection />
        </div>

        <TestimonialsSection />
        <PlacementSection />
      </section>
    </main>
  )
}

function InfoBadge({ icon: Icon, text }) {
  return (
    <motion.div 
      whileHover={{ scale: 1.05 }}
      className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-xl border border-slate-200/50 shadow-sm"
    >
      <Icon className="w-5 h-5 text-blue-600" />
      <span className="text-sm font-medium text-slate-700">{text}</span>
    </motion.div>
  )
}

function WorkshopDetails() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-3xl shadow-xl overflow-hidden"
    >
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 sm:p-8">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-white/20 backdrop-blur-sm rounded-2xl">
            <HiStar className="w-8 h-8 text-white" />
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">Digital Marketing Mastery</h2>
            <p className="text-blue-100 mt-1">3-Day Intensive Workshop</p>
          </div>
        </div>
      </div>

      <div className="p-6 sm:p-8">
        <p className="text-slate-600 mb-8 text-lg leading-relaxed">
          Join our comprehensive workshop designed to transform you into a digital marketing expert. 
          Learn cutting-edge strategies, tools, and techniques used by top professionals in the industry.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {[
            { icon: HiAcademicCap, title: "Expert Instructors", desc: "Learn from industry veterans with 10+ years experience" },
            { icon: HiBookOpen, title: "Practical Learning", desc: "Hands-on projects with real-world applications" },
            { icon: HiTrophy, title: "Certification", desc: "Industry-recognized certificate upon completion" },
            { icon: HiChatBubbleBottomCenterText, title: "Lifetime Support", desc: "Access to exclusive community and resources" }
          ].map((item, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="flex gap-4"
            >
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center">
                  <item.icon className="w-6 h-6 text-blue-600" />
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-slate-800 mb-1">{item.title}</h3>
                <p className="text-sm text-slate-600">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

function WorkshopModules() {
  const modules = [
    { title: "SEO & Content Marketing", topics: ["Keyword Research", "On-Page SEO", "Content Strategy", "Link Building"] },
    { title: "Social Media Marketing", topics: ["Facebook Ads", "Instagram Growth", "LinkedIn Strategy", "Content Creation"] },
    { title: "Google Ads & Analytics", topics: ["Search Campaigns", "Display Ads", "Analytics Setup", "Conversion Tracking"] },
    { title: "Email Marketing", topics: ["List Building", "Email Design", "Automation", "A/B Testing"] }
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="bg-gradient-to-br from-slate-50 to-blue-50/30 rounded-3xl p-6 sm:p-8"
    >
      <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
        <HiLightBulb className="w-7 h-7 text-yellow-500" />
        What You'll Learn
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {modules.map((module, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.1 }}
            whileHover={{ y: -4 }}
            className="bg-white rounded-2xl p-5 shadow-md hover:shadow-xl transition-all duration-300"
          >
            <h3 className="font-semibold text-slate-800 mb-3 flex items-center gap-2">
              <HiChevronRight className="w-5 h-5 text-blue-600" />
              {module.title}
            </h3>
            <ul className="space-y-2">
              {module.topics.map((topic, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-slate-600">
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
                  {topic}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

function BenefitsSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="bg-white rounded-3xl shadow-xl p-6 sm:p-8"
    >
      <h2 className="text-2xl font-bold text-slate-800 mb-6">Workshop Benefits</h2>
      
      <div className="space-y-4">
        {[
          "Certificate of completion with industry recognition",
          "Hands-on projects and real case studies",
          "Access to exclusive resources and premium tools",
          "Networking with industry professionals",
          "Lifetime access to workshop materials and updates",
          "Job placement assistance and career guidance"
        ].map((benefit, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.05 }}
            className="flex items-start gap-3"
          >
            <div className="mt-0.5">
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center">
                <HiCheck className="w-4 h-4 text-white" />
              </div>
            </div>
            <span className="text-slate-700">{benefit}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

function WorkshopRegistrationCard() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', role: 'Student' })
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const update = (e) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
    // Clear error for this field when user starts typing
    if (errors[e.target.name]) {
      setErrors(prev => ({ ...prev, [e.target.name]: '' }))
    }
  }

  function validate() {
    const e = {}
    if (!form.name.trim()) e.name = 'Name is required'
    if (!form.email.trim()) e.email = 'Email is required'
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = 'Invalid email address'
    if (!form.phone.trim()) e.phone = 'Phone number is required'
    else if (!/^\d{10}$/.test(form.phone)) e.phone = 'Must be 10 digits'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  async function handleSubmit(ev) {
    ev.preventDefault()
    if (!validate()) return
    setSubmitting(true)

    try {
      const res = await api.post('/workshops/', form)
      if (res.status === 201) {
        toast.success('Registration successful! Check your email for details.')
        setSubmitted(true)
        setForm({ name: '', email: '', phone: '', role: 'Student' })
        setErrors({})
      }
    } catch (err) {
      console.error('Workshop registration error:', err)
      toast.error('Registration failed. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-3xl shadow-2xl p-8 text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", delay: 0.2 }}
          className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center"
        >
          <HiCheck className="w-10 h-10 text-white" />
        </motion.div>
        
        <h3 className="text-2xl font-bold text-slate-800 mb-3">You're Registered!</h3>
        <p className="text-slate-600 mb-6">
          We've sent confirmation details to your email. Get ready for an amazing learning experience!
        </p>
        
        <button
          onClick={() => setSubmitted(false)}
          className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
        >
          Register Another Person
        </button>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-3xl shadow-2xl overflow-hidden"
    >
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-2 text-center">
        <h2 className="text-2xl font-bold text-white mb-2">Campus Workshop Registration (LBSM College)</h2>
        {/* <p className="text-blue-100">Limited seats available!</p> */}
      </div>

      <form onSubmit={handleSubmit} className="p-4 space-y-4">
        <InputField
          label="Full Name"
          name="name"
          value={form.name}
          onChange={update}
          icon={HiUser}
          error={errors.name}
          placeholder="John Doe"
        />
        
        <InputField
          label="Email Address"
          name="email"
          type="email"
          value={form.email}
          onChange={update}
          icon={HiEnvelope}
          error={errors.email}
          placeholder="john@example.com"
        />
        
        <InputField
          label="Phone Number"
          name="phone"
          value={form.phone}
          onChange={update}
          icon={HiDevicePhoneMobile}
          error={errors.phone}
          placeholder="9876543210"
        />

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            I am a
          </label>
          <div className="relative">
            <HiBriefcase className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <select
              name="role"
              value={form.role}
              onChange={update}
              className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all appearance-none cursor-pointer"
            >
              <option value="Student">Student</option>
              <option value="Teaching">Teaching</option>
              <option value="Non-Teaching">Non-Teaching</option>
            </select>
          </div>
        </div>

        <motion.button
          type="submit"
          disabled={submitting}
          whileTap={{ scale: 0.98 }}
          className="w-full relative overflow-hidden group px-6 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          <span className="relative z-10 flex items-center justify-center gap-2">
            {submitting ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Registering...
              </>
            ) : (
              <>
                <HiPaperAirplane className="w-5 h-5 rotate-45" />
                Secure Your Seat
              </>
            )}
          </span>
        </motion.button>

        
      </form>
    </motion.div>
  )
}

function InputField({ label, name, type = 'text', value, onChange, icon: Icon, error, placeholder }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-slate-700 mb-2">
        {label}
      </label>
      <div className="relative">
        <Icon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
        <input
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full pl-12 pr-4 py-3 bg-slate-50 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
            error ? 'border-red-300 bg-red-50/50' : 'border-slate-200'
          }`}
        />
      </div>
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="mt-1 text-xs text-red-600"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}

function TestimonialsSection() {
  const testimonials = [
    {
      name: "Rahul Sharma",
      role: "Digital Marketing Manager",
      company: "Tech Corp",
      text: "This workshop completely transformed my approach to digital marketing. The practical sessions were invaluable!",
      rating: 5
    },
    {
      name: "Priya Patel",
      role: "Content Strategist",
      company: "Creative Agency",
      text: "Best investment in my career! The instructors were amazing and the content was cutting-edge.",
      rating: 5
    },
    {
      name: "Amit Kumar",
      role: "SEO Specialist",
      company: "E-commerce Giant",
      text: "Learned more in 2 days than I did in 6 months of self-study. Highly recommended!",
      rating: 5
    }
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-16"
    >
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-slate-800 mb-4">What Our Students Say</h2>
        <p className="text-xl text-slate-600">Join hundreds of satisfied learners</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((testimonial, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            whileHover={{ y: -4 }}
            className="bg-white rounded-2xl shadow-lg hover:shadow-xl p-6 transition-all duration-300"
          >
            <div className="flex gap-1 mb-4">
              {[...Array(testimonial.rating)].map((_, i) => (
                <HiStar key={i} className="w-5 h-5 text-yellow-400 fill-current" />
              ))}
            </div>
            
            <p className="text-slate-600 mb-6 italic">"{testimonial.text}"</p>
            
            <div className="border-t pt-4">
              <p className="font-semibold text-slate-800">{testimonial.name}</p>
              <p className="text-sm text-blue-600">{testimonial.role}</p>
              <p className="text-xs text-slate-500">{testimonial.company}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

function PlacementSection() {
  const companies = [
    "Google", "Microsoft", "Amazon", "Facebook", "Apple", "Netflix",
    "Adobe", "Salesforce", "Oracle", "IBM", "Accenture", "Deloitte"
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-16 py-12 bg-gradient-to-br from-slate-50 to-blue-50/30 rounded-3xl"
    >
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-slate-800 mb-4">Our Alumni Work At</h2>
        <p className="text-xl text-slate-600">Join professionals working at top companies</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 px-8">
        {companies.map((company, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.05 }}
            whileHover={{ scale: 1.05 }}
            className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center"
          >
            <span className="font-semibold text-slate-700">{company}</span>
          </motion.div>
        ))}
      </div>

      <div className="mt-12 text-center px-8">
        <div className="inline-flex items-center gap-2 px-6 py-3 bg-green-50 rounded-full border border-green-200">
          <HiTrophy className="w-5 h-5 text-green-600" />
          <span className="font-semibold text-green-800">95% Placement Rate</span>
        </div>
      </div>
    </motion.div>
  )
}