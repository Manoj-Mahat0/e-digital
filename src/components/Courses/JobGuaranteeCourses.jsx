import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { HiCode, HiChartBar, HiCog, HiArrowRight, HiBookOpen } from "react-icons/hi";
import { getOptimizedImageAttributes } from '../../utils/imageOptimizer';

// Card Animation Variants for staggered entry
const cardVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: (i) => ({
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      delay: i * 0.1,
    },
  }),
  hover: {
    y: -10, // More noticeable lift on hover
    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)", // Stronger shadow
    transition: {
      duration: 0.3,
    },
  },
};

export default function JobAssuranceCourses() {
  const courses = [
    {
      icon: HiCode,
      title: "Full-Stack Web Development",
      description:
        "Mastering the MERN stack, data structures, and advanced development practices. Earn ₹15,000–₹20,000+ / month.",
    },
    {
      icon: HiChartBar,
      title: "Advanced Digital Marketing",
      description:
        "In-depth campaigns across SEO, SEM, Analytics, and AI-driven content. Real-world projects for earning ₹10,000–₹15,000+ / month.",
    },
    {
      icon: HiCog,
      title: "Professional IT & UI/UX Design",
      description:
        "Comprehensive training in modern UI/UX principles, QA methodologies, and software project management. Placement support included.",
    },
  ];

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
    <section className="bg-gray-50 py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <header className="text-center mb-16">
          <p className="text-sm font-semibold text-indigo-600 uppercase tracking-wider">
            Your Future Starts Now 
          </p>
          <h2 className="mt-2 text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-sky-500 to-indigo-600">
              Assuranced Career Programs
            </span>
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            Career-first, intensive bootcamps with live projects, 1:1 expert mentorship, Assuranced placement support, and a pathway to high earnings.
          </p>
        </header>

        
        {/* Main Content Layout */}
        <div className="flex flex-col lg:flex-row gap-10 items-stretch">
          
          {/* Left: Hero / USP Card */}
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, amount: 0.3 }}
            className="lg:w-2/5 bg-gradient-to-br from-indigo-600 to-blue-700 text-white rounded-3xl p-8 sm:p-12 shadow-2xl flex flex-col justify-between transform hover:scale-[1.01] transition-transform duration-300"
            style={{ 
              boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.15)"
            }}
          >
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center w-16 h-16 rounded-xl bg-white/15 ring-2 ring-white/50">
                  <img 
                    {...getOptimizedImageAttributes("/NewJALogo.webp", {
                      alt: "Job Assurance Logo - E-Digital India",
                      title: "100% Job Assurance Program",
                      loading: "lazy",
                      decoding: "async"
                    })}
                    className="w-14 h-14" 
                  />
                </div>
                <div>
                  <h3 className="text-3xl font-bold">100% Job Assurance</h3>
                  <p className="mt-1 text-base text-white/90 font-medium">
                    Secured placement or your fees back.
                  </p>
                </div>
              </div>

              <p className=" text-lg leading-relaxed text-white/95">
                At <strong className="font-extrabold">E DIGITAL INDIA</strong>, our commitment is your career. We provide a structured curriculum, real client projects, and dedicated placement teams to move you into paid roles or successful freelancing careers.
              </p>
              
              <ul className=" space-y-3 text-white/95 text-base">
                <li className="flex items-center gap-2">
                  <HiArrowRight className="w-5 h-5 text-yellow-300 flex-shrink-0" />
                  <span>Personalized 1:1 Mentorship</span>
                </li>
                <li className="flex items-center gap-2">
                  <HiArrowRight className="w-5 h-5 text-yellow-300 flex-shrink-0" />
                  <span>Interview & Resume Preparation</span>
                </li>
                <li className="flex items-center gap-2">
                  <HiArrowRight className="w-5 h-5 text-yellow-300 flex-shrink-0" />
                  <span>Lifetime Community Access</span>
                </li>
              </ul>
            </div>

            <div className="mt-8">
              <a
                href="/contact-us"
                className="inline-flex items-center justify-center w-full sm:w-auto gap-3 bg-yellow-400 text-indigo-800 font-bold text-lg px-8 py-3 rounded-full shadow-lg hover:bg-yellow-300 hover:shadow-xl transition transform hover:-translate-y-1 duration-300"
              >
                Reserve Free Counselling
                <HiBookOpen className="w-5 h-5" />
              </a>
            </div>
          </motion.div>

          {/* Right: Course Cards */}
          <div className="lg:w-3/5">
            {/* The horizontal scroll is kept for small screens, but the layout is a clean grid on large screens */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6">
              {courses.map((course, i) => {
                const Icon = course.icon;
                return (
                  <motion.article
                    key={i}
                    custom={i}
                    variants={cardVariants}
                    initial="hidden"
                    whileInView="visible"
                    whileHover="hover"
                    viewport={{ once: true, amount: 0.4 }}
                    className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-100 shadow-lg cursor-pointer flex flex-col justify-between transition duration-300"
                  >
                    <div className="flex items-start gap-5">
                      {/* Icon with modern background */}
                      <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-indigo-50 ring-1 ring-indigo-200">
                        <Icon className="w-7 h-7 text-indigo-600" />
                      </div>
                      
                      {/* Text content */}
                      <div className="flex-1">
                        <h4 className="text-xl font-bold text-gray-900 leading-snug">
                            {course.title}
                        </h4>
                        <p className="mt-3 text-base text-gray-600 leading-relaxed">
                            {course.description}
                        </p>
                      </div>
                    </div>
                    
                    
                  </motion.article>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}