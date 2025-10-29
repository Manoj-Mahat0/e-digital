// src/pages/Contact.jsx
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import {
  HiUser,
  HiEnvelope,
  HiDevicePhoneMobile,
  HiChatBubbleLeftRight,
  HiPaperAirplane,
  HiMapPin,
  HiClock,
  HiPhone,
  HiOutlineAcademicCap,
} from 'react-icons/hi2'
import api from '../services/api' // ensure this exists (see earlier message)
import { toast } from 'react-toastify'

// Contact page component that POSTs JSON to your backend (/contact/)
export default function Contact() {
  // Define site URL for canonical links and Open Graph
  const siteUrl = import.meta.env.VITE_SITE_URL || 'https://edigitalindian.com';

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-12">
      <Helmet>
        <title>Contact Us | E-digital India – We're here for your help</title>
        <meta name="description" content="Have questions or need support? Contact E-digital India for expert assistance in digital services, training, and more. We're here to help. Reach out today!" />
        <link rel="canonical" href={`${siteUrl}/contact-us`} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </Helmet>

      <section className="max-w-7xl mx-auto px-6">
        {/* Updated Header */}
        
        
        {/* Main Content Grid: items-stretch is key for equal height */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-stretch">
          
          {/* Form column (takes 2/3 width) */}
          <div className="lg:col-span-2">
            <ContactCard />
          </div>

          {/* Side info & map column (takes 1/3 width) */}
          <aside className="space-y-6 flex flex-col">
      
            <MapCard />
          </aside>
        </div>
      </section>
    </main>
  )
}

// MapCard, Input, TextArea, and ContactCard components remain the same
// ... (Your original MapCard, Input, TextArea, and ContactCard code)

function ContactCard() {
    const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
    const [errors, setErrors] = useState({})
    const [sending, setSending] = useState(false)
    const [sent, setSent] = useState(false)
  
    const update = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
  
    function validate() {
      const e = {}
      if (!form.name.trim()) e.name = 'Please enter your name.'
      if (!form.email.trim()) e.email = 'Please enter your email.'
      else if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = 'Enter a valid email address.'
      if (!form.phone.trim()) e.phone = 'Please enter your phone or contact number.'
      if (!form.message.trim()) e.message = 'Please write a message.'
      setErrors(e)
      return Object.keys(e).length === 0
    }
  
    async function handleSubmit(ev) {
      ev.preventDefault()
      if (!validate()) return
      setSending(true)
  
      const payload = {
        name: form.name,
        email: form.email,
        phone: form.phone,
        message: form.message,
      }
  
      try {
        const res = await api.post('/contact/', payload) // POST to https://be.edigital.globalinfosofts.com/contact/
        // backend returns 201 with created object (example you shared)
        if (res.status === 201 || res.status === 200) {
          toast.success('Message sent — thank you! We will get back to you soon.')
          setSent(true)
          setForm({ name: '', email: '', phone: '', message: '' })
          setErrors({})
        } else {
          // unexpected status
          toast.info('Received unexpected response from server.')
        }
      } catch (err) {
        console.error('Contact submit error:', err)
        const msg =
          err?.response?.data?.detail ||
          err?.response?.data ||
          err?.message ||
          'Unable to send message. Please try again later.'
        toast.error(String(msg))
        setErrors((prev) => ({ ...prev, submit: 'Unable to send message. Please try again later.' }))
      } finally {
        setSending(false)
      }
    }
  
    return (
      <motion.div
        initial={{ opacity: 0, x: -8 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.45 }}
        className="bg-white shadow-2xl rounded-3xl p-8 lg:p-10 border border-slate-100 relative overflow-hidden h-full flex flex-col justify-between"
      >
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-blue-100 via-indigo-100 to-white rounded-full opacity-40 blur-2xl pointer-events-none" />
        
        {/* Title inside the card */}
        <h3 className="text-3xl font-bold text-slate-800 mb-6 border-b pb-3">Send us a Message</h3>
        
        <form onSubmit={handleSubmit} noValidate aria-live="polite">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Input label="Name" name="name" value={form.name} onChange={update} icon={<HiUser className="h-5 w-5" />} error={errors.name} required />
            <Input label="Email" name="email" type="email" value={form.email} onChange={update} icon={<HiEnvelope className="h-5 w-5" />} error={errors.email} required />
          </div>
  
          <div className="mt-6">
            <Input label="Phone" name="phone" value={form.phone} onChange={update} icon={<HiDevicePhoneMobile className="h-5 w-5" />} error={errors.phone} required />
          </div>
  
          <div className="mt-6">
            <TextArea label="Message" name="message" value={form.message} onChange={update} icon={<HiChatBubbleLeftRight className="h-5 w-5" />} error={errors.message} required />
          </div>
  
          {errors.submit && <p className="text-sm text-red-600 mt-3">{errors.submit}</p>}
  
          <div className="mt-8">
            <motion.button
              type="submit"
              disabled={sending}
              whileTap={{ scale: 0.97 }}
              className={`w-full inline-flex items-center justify-center gap-3 px-5 py-3 font-semibold rounded-xl shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 ${sending ? 'bg-blue-400 cursor-wait' : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white'}`}
              aria-disabled={sending}
            >
              <HiPaperAirplane className={`h-5 w-5 transition-transform ${sending ? 'animate-spin' : ''}`} />
              <span>{sending ? 'Sending...' : sent ? 'Sent — Thanks!' : 'Send Message'}</span>
            </motion.button>
          </div>
        </form>
  
        <div aria-live="polite" className="sr-only">{sent ? 'Message sent successfully' : ''}</div>
        {sent && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute inset-0 bg-white/90 flex flex-col items-center justify-center rounded-3xl z-10"
          >
            <div className="flex flex-col items-center gap-2">
              <HiPaperAirplane className="h-10 w-10 text-blue-500 animate-bounce" />
              <div className="text-2xl font-bold text-blue-700">Message Sent!</div>
              <div className="text-slate-600 text-base mt-1">We appreciate you reaching out. We'll be in touch soon.</div>
            </div>
          </motion.div>
        )}
      </motion.div>
    )
  }

function Input({ label, name, type = 'text', value, onChange, icon, error, required }) {
    return (
      <label className="block">
        <span className="text-sm font-semibold text-slate-700 flex items-center gap-2 mb-1">
          {icon && <span className="text-indigo-500">{icon}</span>}
          {label} {required ? <span className="text-red-500">*</span> : null}
        </span>
  
        <div className='relative'>
            <input
                name={name}
                type={type}
                value={value}
                onChange={onChange}
                aria-invalid={!!error}
                aria-describedby={error ? `${name}-error` : undefined}
                className={`w-full rounded-xl border pl-12 pr-4 py-2.5 text-slate-800 placeholder-slate-400 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-150 ${error ? 'border-red-300' : 'border-slate-200'} shadow-inner`}
                placeholder={`Enter your ${label.toLowerCase()}`}
            />
             <div className='absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none'>
                {icon}
            </div>
        </div>
  
        {error && (
          <p id={`${name}-error`} className="mt-2 text-xs text-red-600 font-medium">
            {error}
          </p>
        )}
      </label>
    )
  }
  
  function TextArea({ label, name, value, onChange, icon, error, required }) {
    return (
      <label className="block">
        <span className="text-sm font-semibold text-slate-700 flex items-center gap-2 mb-1">
          {icon && <span className="text-indigo-500">{icon}</span>}
          {label} {required ? <span className="text-red-500">*</span> : null}
        </span>
        <div className='relative'>
            <textarea
                name={name}
                value={value}
                onChange={onChange}
                rows={5}
                aria-invalid={!!error}
                aria-describedby={error ? `${name}-error` : undefined}
                className={`w-full rounded-xl border pl-4 pr-4 py-2.5 text-slate-800 placeholder-slate-400 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-150 ${error ? 'border-red-300' : 'border-slate-200'} shadow-inner`}
                placeholder={`Type your ${label.toLowerCase()} here...`}
            />
        </div>
  
        {error && (
          <p id={`${name}-error`} className="mt-2 text-xs text-red-600 font-medium">
            {error}
          </p>
        )}
      </label>
    )
  }


function MapCard() {
    return (
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.06 }}
        className="overflow-hidden rounded-2xl border border-slate-100 shadow-xl bg-white flex-grow" // flex-grow helps fill height
      >
        <a href="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3677.9248436118573!2d86.200489675085!3d22.805248579326786!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f5e3d507584243%3A0x58705df840f5f9d4!2sE-DIGITALINDIA-%20Best%20Skill%20Development%20Institute%20in%20Jharkhand!5e0!3m2!1sen!2sin!4v1760520153987!5m2!1sen!2sin" target="_blank" rel="noreferrer" className="block h-full min-h-48">
          <iframe
            title="E-Digital India Location"
            className="w-full h-full grayscale-[0.2] hover:grayscale-0 transition-all duration-300"
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            // Ensure this URL is replaced with a proper Google Maps embed link
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3677.9248436118573!2d86.200489675085!3d22.805248579326786!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f5e3d507584243%3A0x58705df840f5f9d4!2sE-DIGITALINDIA-%20Best%20Skill%20Development%20Institute%20in%20Jharkhand!5e0!3m2!1sen!2sin!4v1760520153987!5m2!1sen!2sin" 
          />
        </a>
      </motion.div>
    )
  }