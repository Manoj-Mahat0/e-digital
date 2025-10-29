import React from "react";
import { Helmet } from "react-helmet-async";
import {
  HiUsers,
  HiShieldCheck,
  HiStar,
  HiCheckCircle,
  HiGlobeAlt,
  HiPhone,
  HiMail,
  HiTrendingUp,
  HiClock,
  HiHeart,
  HiFlag,
  HiLightBulb,
  HiOfficeBuilding,
  HiAcademicCap,
} from "react-icons/hi";

// NOTE: Tailwind CSS is assumed to be available in your project.
// Image path below points to the container asset path you provided. Replace if needed.
const CERT_IMAGE = "iso_certify.webp";

// --- Components ---

function SectionTitle({ eyebrow, title, subtitle }) {
  return (
    <div className="text-center max-w-4xl mx-auto">
      {eyebrow && (
        <div className="text-sm font-semibold tracking-widest uppercase text-indigo-600 mb-2">
          {eyebrow}
        </div>
      )}
      {title && (
        <h2 className="mt-2 text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
          {title}
        </h2>
      )}
      {subtitle && <p className="mt-4 text-xl text-gray-600">{subtitle}</p>}
    </div>
  );
}

function Hero() {
  return (
    // Stronger, deeper indigo gradient for a more premium look
    <section className="py-20 bg-gradient-to-br from-indigo-700 to-indigo-900 text-white shadow-xl">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center py-8">
          <h1 className="text-5xl sm:text-6xl font-black tracking-tight">
            Our Journey: Skills, Success, and <span className="text-green-300">Guaranteed Futures in Jamshedpur</span>
          </h1>
          <p className="mt-5 max-w-3xl mx-auto text-xl font-light text-indigo-200">
            Empowering students and professionals in Jamshedpur with **practical, in-demand skills** that lead
            directly to high-value employment, backed by our job commitment on stamp paper. ISO Certified Digital Marketing Institute Jamshedpur with 100% Placement Guarantee.
          </p>
          <a
            href="#mission-vision"
            className="mt-8 inline-flex items-center px-8 py-3 border border-transparent text-lg font-medium rounded-full shadow-lg text-indigo-800 bg-green-400 hover:bg-green-300 transition-colors transform hover:scale-[1.02]"
          >
            Explore Our Mission
          </a>
        </div>
      </div>
    </section>
  );
}

// Replaced BlueCard with a Feature Block component for better hierarchy
function FeatureCard({ title, children, Icon }) {
  return (
    <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition duration-300">
      <div className="flex items-center space-x-4">
        <div className="flex-shrink-0">
          {/* Highlighted icon circle */}
          <Icon className="h-8 w-8 text-white p-1.5 rounded-full bg-indigo-600 shadow-md" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900">{title}</h3>
      </div>
      <p className="mt-4 text-gray-700 leading-relaxed text-base">{children}</p>
    </div>
  );
}

function TwoColumnAbout() {
  return (
    <section id="mission-vision" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <SectionTitle
          eyebrow="Core Values & History"
          title="Bridging the Gap Between Education and Industry in Jamshedpur"
          subtitle="Our foundation is built on a commitment to quality, practical training, and guaranteed career success for every student in Jamshedpur. Best IT Training Center in Jamshedpur with Career Oriented Courses."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mt-16">
          {/* Left: Feature-Icon-Driven Content (span 7) */}
          <div className="lg:col-span-7 space-y-8">
            <FeatureCard title="About E-Digital India - Jamshedpur's Premier IT Institute" Icon={HiUsers}>
              Welcome to **E-Digital India** — Jamshedpur's trusted platform for job-oriented digital and skill-based education. Our mission is to empower learners with practical, in-demand skills that lead directly to employment. We offer a **100% job guarantee** to ensure every learner gains both skills and job assurance. ISO Certified Digital Marketing Institute Jamshedpur with placement support for all courses.
            </FeatureCard>

            <FeatureCard title="Our Mission - Empowering Jamshedpur's Youth" Icon={HiFlag}>
              Our mission is to empower students in Jamshedpur with in-demand skills and provide them with a **100% job guarantee**. We focus on practical learning, industry-relevant training, and mentorship from experts to ensure that every student is job-ready, meeting industry standards and driving innovation. Best IT Courses with Job Guarantee Jamshedpur.
            </FeatureCard>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <FeatureCard title="Our Vision - Transforming Education in Jharkhand" Icon={HiLightBulb}>
                We envision a future where skill-based education in Jharkhand replaces traditional learning barriers. By offering high-quality training, real-world experience, and career guidance, we aim to transform students into highly skilled professionals ready for the global market. Top Institute for AI in Jamshedpur and Career Oriented Courses.
              </FeatureCard>

              <FeatureCard title="Why Choose Us? - Jamshedpur's Best Training Institute" Icon={HiShieldCheck}>
                <ul className="list-disc pl-5 space-y-2 text-gray-700 font-medium">
                  <li>**ISO-Certified** & Industry-Recognized Courses in Jamshedpur</li>
                  <li>100% Job Guarantee with Paid Internships in Jamshedpur</li>
                  <li>Live Projects & Hands-on Learning</li>
                  <li>Expert Trainers & Personalized Guidance</li>
                </ul>
              </FeatureCard>
            </div>
            
             <FeatureCard title="Our Story: From Vision to Reality in Jamshedpur" Icon={HiOfficeBuilding}>
              E Digital India was founded to bridge the gap between academic education and real-world job requirements in Jamshedpur. We launched our first institute focusing on hands-on training and guaranteed job placements, and have since expanded to major cities like Chennai, Delhi, and Jamshedpur, continuing our mission to make career-oriented education accessible to all. Software Training Institute Jamshedpur with proven track record.
            </FeatureCard>
          </div>

          {/* Right: Sticky Image/Contact Aside (span 5) */}
          <aside className="lg:col-span-5">
            <div className="lg:sticky lg:top-24 space-y-8 p-6 bg-indigo-50 rounded-xl"> {/* Added padding and light background to aside */}
              <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border-4 border-indigo-200"> {/* Stronger border emphasis */}
                <img
                  src={CERT_IMAGE}
                  alt="ISO Certified Quality Management System"
                  className="w-full h-auto object-cover"
                />
                <p className="p-4 text-center text-sm font-semibold text-gray-700">ISO 9001:2015 Certified for Quality Management</p>
              </div>

              {/* Contact Block - Enhanced with Icons */}
              <div className="p-6 rounded-xl bg-white shadow-xl border border-gray-100">
                 <h4 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <HiPhone className="h-6 w-6 text-indigo-600" />
                    Connect With Us - Jamshedpur's Best IT Institute
                </h4>
                <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                        <HiPhone className="h-5 w-5 text-green-500 flex-shrink-0" />
                        <a href="tel:+919934141233" className="font-medium text-lg text-indigo-600 hover:text-indigo-800 transition">
                            +91-9934141233
                        </a>
                    </div>
                    <div className="flex items-center space-x-3">
                        <HiMail className="h-5 w-5 text-green-500 flex-shrink-0" />
                        <a href="mailto:info@edigitalindian.com" className="font-medium text-lg text-indigo-600 hover:text-indigo-800 transition break-all">
                            info@edigitalindian.com
                        </a>
                    </div>
                    <div className="flex items-start space-x-3 pt-2 border-t mt-4">
                        <HiOfficeBuilding className="h-5 w-5 text-green-500 flex-shrink-0 mt-1" />
                        <p className="text-md text-gray-700 font-medium">
                            Jamshedpur, Jharkhand, India - Best IT Training Center in Jamshedpur
                        </p>
                    </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

function Stats() {
  const items = [
    { value: "500+", label: "Happy Students in Jamshedpur", icon: HiHeart, color: "text-red-500", bg: "bg-red-50" },
    { value: "1000+", label: "Projects Completed in Jharkhand", icon: HiCheckCircle, color: "text-green-600", bg: "bg-green-50" },
    { value: "25+", label: "Cities Served Including Jamshedpur", icon: HiGlobeAlt, color: "text-blue-500", bg: "bg-blue-50" },
    { value: "98%", label: "Placement Rate in Jamshedpur", icon: HiTrendingUp, color: "text-purple-600", bg: "bg-purple-50" }, // Changed text for impact
    { value: "24/7", label: "Dedicated Support for Jamshedpur Students", icon: HiClock, color: "text-yellow-600", bg: "bg-yellow-50" },
  ];

  return (
    <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
            <SectionTitle
                eyebrow="Proven Track Record"
                title="Our Impact by the Numbers in Jamshedpur"
            />
            <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mt-12">
                {items.map((item, idx) => (
                    <div
                        key={item.label}
                        className="text-center p-6 bg-white rounded-2xl shadow-xl border border-gray-100 transform hover:scale-[1.02] transition duration-300"
                    >
                        <div className={`h-14 w-14 mx-auto rounded-full ${item.bg} flex items-center justify-center mb-4`}>
                            <item.icon className={`h-7 w-7 ${item.color}`} />
                        </div>
                        <div className="text-3xl font-extrabold text-indigo-600 leading-none">{item.value}</div>
                        <div className="text-sm font-medium text-gray-600 mt-2">{item.label}</div>
                    </div>
                ))}
            </div>
        </div>
    </section>
  );
}

export default function About() {
  return (
    <div className="min-h-screen">
      <Helmet>
        <title>About E-Digital India | Build Your Digital Career Today</title>
        <meta name="description" content="Know about E-Digital India, a leading platform offering digital marketing, web development & tech courses to boost your career with guaranteed job support." />
        <meta name="keywords" content="Digital Marketing Course in Jamshedpur, Web Development Training Jamshedpur, Data Science and AI Course Jamshedpur, Android App Development Course in Jamshedpur, Business and Soft Skills Training Jamshedpur, SAP Course in Jamshedpur, ISO Certified Digital Marketing Institute Jamshedpur, Best Web Development Institute Jamshedpur, AI and Machine Learning Course Jamshedpur, Full Stack Developer Course in Jamshedpur, MERN Stack Course Jamshedpur, Digital Marketing Diploma Jamshedpur, Job Oriented Courses in Jamshedpur, 100% Placement Course Jamshedpur, Software Training Institute Jamshedpur, IT Courses with Job Guarantee Jamshedpur, Learn Coding in Jamshedpur, Advanced SEO and SEM Course Jamshedpur, Freelancing Skills Training Jamshedpur, Career Oriented Courses Jamshedpur, Top Institute for AI in Jamshedpur, UI UX Design Course Jamshedpur, Professional Diploma Courses Jamshedpur, Python Programming Course Jamshedpur, Machine Learning Training in Jamshedpur, Best IT Training Center Jamshedpur" />
        <link rel="canonical" href="https://edigitalindian.com/about-us" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="About E-Digital India | Build Your Digital Career Today" />
        <meta property="og:description" content="Know about E-Digital India, a leading platform offering digital marketing, web development & tech courses to boost your career with guaranteed job support." />
        <meta property="og:url" content="https://edigitalindian.com/about-us" />
        <meta property="og:image" content="https://edigitalindian.com/logo.webp" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="About E-Digital India | Build Your Digital Career Today" />
        <meta name="twitter:description" content="Know about E-Digital India, a leading platform offering digital marketing, web development & tech courses to boost your career with guaranteed job support." />
        <meta name="twitter:image" content="https://edigitalindian.com/logo.webp" />
        
        {/* JSON-LD structured data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "AboutPage",
            "name": "About E-Digital India | Build Your Digital Career Today",
            "description": "Know about E-Digital India, a leading platform offering digital marketing, web development & tech courses to boost your career with guaranteed job support.",
            "url": "https://edigitalindian.com/about-us",
            "mainEntity": {
              "@type": "EducationalOrganization",
              "name": "E-Digital India",
              "description": "Jamshedpur's premier IT training institute offering ISO certified courses with 100% job guarantee",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Jamshedpur",
                "addressRegion": "Jharkhand",
                "addressCountry": "India"
              },
              "offers": {
                "@type": "AggregateOffer",
                "itemOffered": [
                  {
                    "@type": "Course",
                    "name": "Digital Marketing Course in Jamshedpur",
                    "description": "Comprehensive digital marketing training in Jamshedpur with 100% job guarantee"
                  },
                  {
                    "@type": "Course",
                    "name": "Web Development Training Jamshedpur",
                    "description": "Full Stack Web Development Course in Jamshedpur with placement guarantee"
                  },
                  {
                    "@type": "Course",
                    "name": "Data Science and AI Course Jamshedpur",
                    "description": "AI and Machine Learning Course in Jamshedpur with practical training"
                  }
                ]
              }
            }
          })}
        </script>
      </Helmet>
      
      <Hero />
      <TwoColumnAbout />
      <Stats />
    </div>
  );
}
