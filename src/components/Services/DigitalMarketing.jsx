import React, { useState, useRef, useEffect } from 'react'
import {
  HiTrendingUp,
  HiChartBar,
  HiGlobeAlt,
  HiUsers,
  HiArrowRight
} from 'react-icons/hi'
import np1Image from '../../assets/np1.jpg'
import np2Image from '../../assets/np2.jpeg'

import np3Image from '../../assets/np3.jpeg'

import np4Image from '../../assets/np4.jpeg'


export default function DigitalMarketing() {
  const [hoveredIndex, setHoveredIndex] = useState(null)
  const [focusedIndex, setFocusedIndex] = useState(null)
  const containerRef = useRef(null)

  const features = [
    {
      icon: HiTrendingUp,
      title: 'Social Media Marketing',
      description:
        'Build brand presence on platforms like Instagram, Facebook and LinkedIn — content strategy, community growth and analytics-driven campaigns.',
      image:
        np1Image
    },
    {
      icon: HiTrendingUp,
      title: 'Search Engine Optimization (SEO)',
      description:
        'On-page, technical and off-page SEO: keyword research, content optimization, link-building and site performance for lasting organic growth.',
      image:np2Image
    },
    {
      icon: HiChartBar,
      title: 'Online Advertising',
      description:
        'Design, target and optimise paid campaigns across Google Ads, Meta and programmatic channels with measurable ROI techniques.',
      image:np3Image
    },
    {
      icon: HiGlobeAlt,
      title: 'Website Creation & Management',
      description:
        'Rapidly build conversion-focused websites with no-code tools and good UX — deploy, measure and iterate for performance.',
      image:np4Image
    }
  ]

  // keyboard navigation between items (left/right or up/down)
  useEffect(() => {
    function onKey(e) {
      if (document.activeElement && containerRef.current?.contains(document.activeElement)) {
        if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
          setFocusedIndex((i) => (i === null ? 0 : Math.min(features.length - 1, i + 1)))
        }
        if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
          setFocusedIndex((i) => (i === null ? 0 : Math.max(0, i - 1)))
        }
        if (e.key === 'Escape') {
          setFocusedIndex(null)
          setHoveredIndex(null)
        }
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    // keep hovered and focused in sync so keyboard users get the same visual feedback
    setHoveredIndex(focusedIndex)
  }, [focusedIndex])

  return (
    <section className="py-20 bg-gradient-to-b from-indigo-50 via-pink-50 to-yellow-50" aria-labelledby="dm-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12" data-aos="fade-up">
          <h2 id="dm-heading" className="text-4xl font-bold font-display text-gray-900 mb-4">
            What You'll Learn in the Digital Marketing Course with E-Digital India
          </h2>
          <p className="text-base italic text-gray-700 max-w-3xl mx-auto">
            At E-Digital India, we provide a hands-on course focusing on strategy, tools and measurable outcomes. Learn
            both fundamentals and advanced tactics — live projects, certifications and placement assistance included.
          </p>
        </div>

        <div ref={containerRef} className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Content - Features */}
          <div data-aos="fade-right" data-aos-duration="1000">
            <div className="space-y-4">
              {/* headline + micro-controls */}
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">Course highlights</h3>
                  <p className="text-sm text-gray-600">Interactive sessions • Case studies • Live campaigns</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setFocusedIndex((i) => (i === null ? 0 : Math.max(0, i - 1)))
                    }}
                    className="hidden sm:inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/90 shadow-sm text-sm"
                    aria-label="Previous feature"
                  >
                    Prev
                  </button>
                  <button
                    onClick={() => {
                      setFocusedIndex((i) => (i === null ? 0 : Math.min(features.length - 1, i + 1)))
                    }}
                    className="hidden sm:inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/90 shadow-sm text-sm"
                    aria-label="Next feature"
                  >
                    Next
                  </button>
                </div>
              </div>

              {/* Feature list */}
              <div className="space-y-4 mt-2">
                {features.map((feature, index) => {
                  const Icon = feature.icon
                  const isActive = hoveredIndex === index
                  const visibleShadow = isActive ? 'shadow-2xl' : 'shadow-md'
                  return (
                    <div key={feature.title} className="relative">
                      {/* Accessible button-style list item */}
                      <button
                        onMouseEnter={() => setHoveredIndex(index)}
                        onFocus={() => setFocusedIndex(index)}
                        onMouseLeave={() => setHoveredIndex(null)}
                        onBlur={() => setFocusedIndex(null)}
                        onClick={() => {
                          // gentle micro-interaction: toggle expanded description on click for touch users
                          if (focusedIndex === index) setFocusedIndex(null)
                          else setFocusedIndex(index)
                        }}
                        className={`w-full text-left flex items-start gap-4 p-4 rounded-2xl transition-all duration-300 transform bg-white/80 ${
                          isActive
                            ? 'scale-103 ring-4 ring-offset-2 ring-indigo-200 bg-white'
                            : 'hover:-translate-y-1 hover:shadow-lg'
                        } ${visibleShadow}`}
                        aria-pressed={isActive}
                        aria-expanded={focusedIndex === index}
                        aria-controls={`feature-desc-${index}`}
                      >
                        <div
                          className={`h-14 w-14 rounded-xl flex items-center justify-center flex-shrink-0 mt-1 transition-transform duration-300 bg-gradient-to-r from-pink-500 via-rose-500 to-yellow-400 ${
                            isActive ? 'scale-110' : ''
                          }`}
                        >
                          <Icon className="h-6 w-6 text-white" aria-hidden="true" />
                        </div>

                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="text-lg font-semibold text-gray-900 mb-0">{feature.title}</h4>
                              <p id={`feature-desc-${index}`} className="text-sm text-gray-600 mt-1">
                                {feature.description}
                              </p>
                            </div>

                            <div className="ml-4 flex items-center">
                              <HiArrowRight
                                className={`h-5 w-5 transition-transform duration-300 ${isActive ? 'translate-x-2' : ''}`}
                                aria-hidden="true"
                              />
                            </div>
                          </div>

                          {/* subtle progress indicator to show depth of topic */}
                          <div className="mt-3">
                            <div className="h-2 w-full rounded-full bg-gray-200 overflow-hidden">
                              <div
                                className={`h-2 rounded-full transition-width duration-500 ${
                                  isActive ? 'w-3/4' : 'w-1/3'
                                }`} 
                              />
                            </div>
                          </div>
                        </div>
                      </button>

                      {/* small label for keyboard focus */}
                      {focusedIndex === index && (
                        <div className="absolute -right-2 top-2 text-xs bg-indigo-600 text-white rounded-full px-2 py-1 shadow">
                          Selected
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>

              
            </div>
          </div>

          {/* Right Content - Image Grid */}
          <div className="relative" data-aos="fade-left" data-aos-duration="1000" data-aos-delay="200">
            <div className="grid grid-cols-2 gap-4">
              {features.map((f, i) => {
                const isActive = hoveredIndex === i
                return (
                  <div
                    key={f.title}
                    onMouseEnter={() => setHoveredIndex(i)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    className={`overflow-hidden rounded-2xl transition-all duration-300 transform ${
                      isActive
                        ? 'scale-105 -translate-y-2 z-30 shadow-2xl ring-4 ring-offset-2 ring-pink-100'
                        : hoveredIndex === null
                        ? 'opacity-100'
                        : 'opacity-60 blur-sm scale-95'
                    }`}
                    style={{
                      background: 'linear-gradient(135deg, rgba(255,255,255,0.4), rgba(255,255,255,0.06))'
                    }}
                  >
                    {/* image with lazy load + placeholder */}
                    <div className="w-full h-48 bg-gray-100 relative">
                      <img
                        src={f.image}
                        alt={f.title}
                        loading="lazy"
                        className="w-full h-full object-cover rounded-2xl transition-transform duration-500 pointer-events-none transform-gpu"
                        style={{
                          transform: isActive ? 'scale(1.06)' : 'scale(1)'
                        }}
                      />

                      {/* subtle color overlay to increase contrast for labels */}
                      <div
                        aria-hidden
                        className={`absolute inset-0 rounded-2xl transition-opacity duration-300 ${
                          isActive ? 'bg-gradient-to-tr from-pink-400/20 via-transparent to-yellow-200/10' : ''
                        }`}
                      />
                    </div>

                    <div className="p-3">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/90 backdrop-blur text-sm font-medium">
                        <span className="w-2 h-2 rounded-full bg-gradient-to-r from-pink-500 to-yellow-400" />
                        {f.title}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Decorative floating large preview that mirrors hovered state for emphasis on larger screens */}
            <div className="hidden lg:block pointer-events-none">
              <div
                className={`absolute -right-8 -bottom-8 w-64 h-40 rounded-3xl overflow-hidden transition-all duration-300 transform ${
                  hoveredIndex !== null ? 'scale-105 opacity-100 shadow-2xl z-40' : 'opacity-0 scale-95'
                }`}
              >
                {hoveredIndex !== null && (
                  <img
                    src={features[hoveredIndex].image}
                    alt={features[hoveredIndex].title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                )}
              </div>
            </div>

            {/* Respect reduced motion preference: no transforms */}
            <style>{`@media (prefers-reduced-motion: reduce) { .transition-all, .transform { transition: none !important; transform: none !important; } }`}</style>
          </div>
        </div>
      </div>
    </section>
  )
}
