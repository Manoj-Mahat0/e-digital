import React, { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import {
  HiUsers,
  HiBriefcase,
  HiCog,
  HiDocumentText,
  HiShieldCheck,
  HiLightningBolt,
  HiStar,
  HiCheckCircle,
  HiGlobeAlt,
  HiPhone,
  HiMail,
  HiArrowRight,
  HiTrendingUp,
  HiAcademicCap,
  HiOfficeBuilding,
  HiHeart
} from 'react-icons/hi'

import DigitalMarketing from '../components/Services/DigitalMarketing'
import JobGuaranteeCourses from '../components/Courses/JobGuaranteeCourses'
import Partners from '../components/Partners'
import CoursesShowcase from '../components/Courses/CoursesShowcase'
import TeamList from '../components/Courses/TeamList'
import FestivalGreetingsCard from '../components/FestivalGreetingsCard'

function Typewriter({ lines = [], typingSpeed = 60, pauseBetween = 1500, loop = true, className = '' }) {
  const [lineIndex, setLineIndex] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    let timeout

    const currentLine = lines[lineIndex % lines.length] || ''
    if (!isDeleting) {
      // typing
      if (displayed.length < currentLine.length) {
        timeout = setTimeout(() => {
          setDisplayed(currentLine.slice(0, displayed.length + 1))
        }, typingSpeed)
      } else {
        // finished typing current line -> wait then start deleting
        timeout = setTimeout(() => setIsDeleting(true), pauseBetween)
      }
    } else {
      // deleting
      if (displayed.length > 0) {
        timeout = setTimeout(() => {
          setDisplayed(currentLine.slice(0, displayed.length - 1))
        }, Math.round(typingSpeed * 0.5))
      } else {
        // finished deleting -> move to next line
        setIsDeleting(false)
        setLineIndex((i) => i + 1)
      }
    }

    return () => clearTimeout(timeout)
  }, [displayed, isDeleting, lineIndex, lines, typingSpeed, pauseBetween])

  // stop looping if not desired
  useEffect(() => {
    if (!loop && lineIndex >= lines.length) {
      // show last line fully and stop
      setDisplayed(lines[lines.length - 1] || '')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loop])

  return (
    <span className={`inline-block ${className}`}>
      <span>{displayed}</span>
      <span className="inline-block align-bottom ml-1 animate-blink">|</span>
      <style>{`
        @keyframes blinkCaret {
          0% { opacity: 1; }
          49% { opacity: 1; }
          50% { opacity: 0; }
          99% { opacity: 0; }
          100% { opacity: 1; }
        }
        .animate-blink {
          animation: blinkCaret 1s step-end infinite;
        }
      `}</style>
    </span>
  )
}

function Hero() {
  // lines taken from the content you pasted — update or reorder as needed
  const typingLines = [
    'Boost Your Future with E-Digital India',
    'Grow Your Career with Digital Skills',
    'Learn AI, Web Development',
    'Get Certified with Practical Training'
  ]

  return (
    <section id="home" className="relative bg-gradient-to-br from-brand-light via-white to-primary-50 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-80 w-80 bg-brand/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-80 w-80 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-96 w-96 bg-brand/3 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div data-aos="fade-right" data-aos-duration="1000">
            

            {/* Typing H1 */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-display text-black leading-tight mb-6">
  <Typewriter
    lines={typingLines}
    typingSpeed={70}
    pauseBetween={1600}
    loop={true}
    className="text-black"
  />
</h1>


            <p className="text-xl text-gray-600 leading-relaxed mb-8 max-w-2xl">
              Join E-Digital India – an ISO-certified institute offering hands-on, 
              practical training in high-demand digital skills. Whether you're starting your journey or upgrading your career, now is the time.
            </p>


          </div>

          {/* Right Content - Image Grid */}
          <div className="relative" data-aos="fade-left" data-aos-duration="1000" data-aos-delay="200">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <img
                  className="h-48 w-full object-cover rounded-2xl shadow-lg border-4 border-white"
                  src="h1.jpg"
                  alt="Team collaboration"
                />
                <img
                  className="h-32 w-full object-cover rounded-2xl shadow-lg border-4 border-white"
                  src="h3.jpg"
                  alt="Business meeting"
                />
              </div>
              <div className="space-y-4 pt-8">
                <img
                  className="h-32 w-full object-cover rounded-2xl shadow-lg border-4 border-white"
                  src="h2.jpg"
                  alt="Professional team"
                />
                <img
                  className="h-48 w-full object-cover rounded-2xl shadow-lg border-4 border-white"
                  src="h4.jpg"
                  alt="IT solutions"
                />
              </div>
            </div>

           
          </div>
        </div>
      </div>
    </section>
  )
}





const teamData = [
  {
    name: "Rajesh Kumar",
    role: "Founder & CEO",
    avatar: "/images/team/rajesh.jpg",
    short: "Entrepreneur with 12+ years in IT services and manpower solutions.",
    bio: "Rajesh founded E-Digital India to provide skill development and reliable staffing for government & enterprise clients...",
    experience: ["12+ years in IT & staffing", "Led 100+ projects", "Managed large-scale government contracts"],
    skills: ["Business Strategy", "Operations", "Partnerships"],
    linkedin: "https://www.linkedin.com/in/rajesh-kumar",
    twitter: "",
    email: "rajesh@example.com"
  },
  {
    name: "Sana Verma",
    role: "Head — Digital Marketing",
    avatar: "/images/team/sana.jpg",
    short: "Digital marketer who builds measurable campaigns and growth funnels.",
    bio: "Sana leads our digital marketing vertical, focusing on ROI-driven campaigns, SEO, and paid advertising...",
    experience: ["8 years in performance marketing", "Led campaigns for 50+ brands"],
    skills: ["SEO", "Paid Ads", "Analytics"],
    linkedin: "https://www.linkedin.com/in/sana-verma",
    twitter: "",
    email: "sana@example.com"
  },
];






function CTA() {
  return (
    <section className="py-20 bg-gradient-to-r from-brand to-brand-dark">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div data-aos="zoom-in">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl text-brand-light mb-8 leading-relaxed">
            Join 500+ organizations that trust E-Digital Indian for their manpower and IT needs. 
            Let's discuss how we can help you achieve your goals.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-white text-brand rounded-xl font-semibold hover:shadow-lg transform hover:-translate-y-1 transition-all duration-200 flex items-center justify-center gap-2">
              <HiPhone className="h-5 w-5" />
              Get Free Consultation
            </button>
            <button className="px-8 py-4 border-2 border-white text-white rounded-xl font-semibold hover:bg-white hover:text-brand transition-all duration-200 flex items-center justify-center gap-2">
              <HiMail className="h-5 w-5" />
              Send Message
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default function Home() {
  // Define site URL for canonical links and Open Graph
  const siteUrl = import.meta.env.VITE_SITE_URL || 'https://edigital.globalinfosofts.com';
  
  return (
    <main>
      <Helmet>
        <title>E-Digital Training - Professional Digital Skills & IT Courses</title>
        <meta name="description" content="E-Digital offers professional training in Digital Marketing, Web Development, Data Science, AI, and more. Get certified with practical, job-oriented courses." />
        <link rel="canonical" href={siteUrl} />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={siteUrl} />
        <meta property="og:title" content="E-Digital Training - Professional Digital Skills & IT Courses" />
        <meta property="og:description" content="E-Digital offers professional training in Digital Marketing, Web Development, Data Science, AI, and more. Get certified with practical, job-oriented courses." />
        <meta property="og:image" content={`${siteUrl}/logo.webp`} />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={siteUrl} />
        <meta name="twitter:title" content="E-Digital Training - Professional Digital Skills & IT Courses" />
        <meta name="twitter:description" content="E-Digital offers professional training in Digital Marketing, Web Development, Data Science, AI, and more. Get certified with practical, job-oriented courses." />
        <meta name="twitter:image" content={`${siteUrl}/logo.webp`} />
        
        {/* JSON-LD structured data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "E-Digital Training",
            "url": siteUrl,
            "logo": `${siteUrl}/logo.webp`,
            "sameAs": [
              "https://www.facebook.com/edigitaltraining",
              "https://www.instagram.com/edigitaltraining",
              "https://www.youtube.com/edigitaltraining"
            ],
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+91-9661577233",
              "contactType": "customer service"
            },
            "offers": {
              "@type": "AggregateOffer",
              "itemOffered": [
                {
                  "@type": "Course",
                  "name": "Digital Marketing",
                  "description": "Comprehensive digital marketing training"
                },
                {
                  "@type": "Course",
                  "name": "Web Development",
                  "description": "PHP and modern web development training"
                },
                {
                  "@type": "Course",
                  "name": "Data Science & AI",
                  "description": "Data science and artificial intelligence training"
                }
              ]
            }
          })}
        </script>
      </Helmet>

      <FestivalGreetingsCard />
      <Hero />
      {/* <Services /> */}
      <DigitalMarketing />
      <JobGuaranteeCourses />
      <Partners />
      <CoursesShowcase initialIndex={0} />
      <TeamList />
      {/* <Industries />
      <CTA /> */}
    </main>
  )
}


