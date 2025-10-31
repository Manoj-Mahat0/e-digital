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
import { getOptimizedImageAttributes } from '../utils/imageOptimizer'

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

  // Carousel images data
  const carouselImages = [
    {
      src: "h1.webp",
      alt: "E-Digital India Team Collaboration - Digital Marketing & IT Training in Jamshedpur",
      title: "Our Professional Team at E-Digital India"
    },
    {
      src: "h3.webp",
      alt: "Business Meeting - Career Development in Jamshedpur",
      title: "Business Strategy Meeting at E-Digital India"
    },
    {
      src: "h2.webp",
      alt: "Professional IT Training Team in Jamshedpur",
      title: "Expert Instructors at E-Digital India"
    },
    {
      src: "h4.webp",
      alt: "IT Solutions and Digital Skills Training in Jamshedpur",
      title: "Advanced IT Solutions Training at E-Digital India"
    }
  ];

  // Carousel state
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto slide effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % carouselImages.length);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval);
  }, [carouselImages.length]);

  return (
    <section id="home" className="relative bg-gradient-to-br from-brand-light via-white to-primary-50 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-80 w-80 bg-brand/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-80 w-80 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-96 w-96 bg-brand/3 rounded-full blur-3xl" />
      </div>

      {/* Add floating animation elements */}
      <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-white rounded-full opacity-20 animate-pulse"></div>
      <div className="absolute top-3/4 right-1/4 w-6 h-6 bg-brand rounded-full opacity-30 animate-bounce"></div>
      <div className="absolute bottom-1/3 left-1/3 w-3 h-3 bg-primary rounded-full opacity-40 animate-ping"></div>

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

          {/* Right Content - Carousel */}
          <div className="relative" data-aos="fade-left" data-aos-duration="1000" data-aos-delay="200">
            <div className="relative h-80 overflow-hidden rounded-2xl shadow-2xl backdrop-blur-sm bg-white/30 border border-white/20">
              {/* Carousel images */}
              {carouselImages.map((image, index) => (
                <div 
                  key={index}
                  className={`absolute inset-0 transition-all duration-700 ease-in-out transform ${
                    index === currentIndex 
                      ? 'opacity-100 scale-100' 
                      : 'opacity-0 scale-105'
                  }`}
                >
                  <img
                    {...getOptimizedImageAttributes(image.src, {
                      alt: image.alt,
                      title: image.title,
                      loading: index === 0 ? "eager" : "lazy",
                      decoding: "async"
                    })}
                    className="w-full h-full object-contain rounded-2xl"
                  />
                  {/* Glassmorphism overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
                </div>
              ))}
              
              {/* Carousel indicators with glassmorphism */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 backdrop-blur-sm bg-white/20 rounded-full px-3 py-2">
                {carouselImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 transform hover:scale-125 ${
                      index === currentIndex 
                        ? 'bg-white w-6' 
                        : 'bg-white/50 hover:bg-white/80'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Navigation arrows with glassmorphism */}
            <button
              onClick={() => setCurrentIndex((prev) => (prev - 1 + carouselImages.length) % carouselImages.length)}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-3 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-110"
              aria-label="Previous image"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={() => setCurrentIndex((prev) => (prev + 1) % carouselImages.length)}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-3 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-110"
              aria-label="Next image"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Add custom animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(5deg); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(1.1); }
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-pulse-slow {
          animation: pulse 4s ease-in-out infinite;
        }
        .animate-bounce-slow {
          animation: bounce 5s ease-in-out infinite;
        }
      `}</style>
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
  const siteUrl = import.meta.env.VITE_SITE_URL || 'https://edigitalindian.com';
  
  return (
    <main>
      <Helmet>
        <title>Job-oriented course to boost your career| E-Digital India</title>
        <meta name="description" content="Enroll in a Job-oriented course by E-Digital India. Master Digital Marketing, Web Development & more. This skill development course will boost your career." />
        <link rel="canonical" href={siteUrl} />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={siteUrl} />
        <meta property="og:title" content="Job-oriented course to boost your career| E-Digital India" />
        <meta property="og:description" content="Enroll in a Job-oriented course by E-Digital India. Master Digital Marketing, Web Development & more. This skill development course will boost your career." />
        <meta property="og:image" content={`${siteUrl}/logo.webp`} />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={siteUrl} />
        <meta name="twitter:title" content="Job-oriented course to boost your career| E-Digital India" />
        <meta name="twitter:description" content="Enroll in a Job-oriented course by E-Digital India. Master Digital Marketing, Web Development & more. This skill development course will boost your career." />
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
                  "description": "Modern web development training"
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