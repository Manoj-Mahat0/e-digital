import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

export default function Career() {
  const whyWorkWithUs = [
    {
      title: "Innovative Environment",
      description: "Work in a dynamic setting where creativity and technology drive our mission to empower learners with cutting-edge skills."
    },
    {
      title: "Professional Growth",
      description: "We invest in your development through continuous training, mentorship, and opportunities to advance your career."
    },
    {
      title: "Impactful Work",
      description: "Join a team that makes a real difference by providing quality education and job guarantees to students across India."
    },
    {
      title: "Collaborative Culture",
      description: "Enjoy a supportive workplace with a focus on teamwork, diversity, and work-life balance."
    }
  ];

  const jobOpenings = [
    {
      title: "Digital Marketing Instructor",
      location: "Chennai, Tamil Nadu",
      type: "Full-time",
      description: "Teach SMM, SEO, and other digital marketing skills to students. Experience in the field required.",
      applyLink: "/apply"
    },
    {
      title: "Web Development Trainer",
      location: "Delhi, India",
      type: "Full-time",
      description: "Lead web development courses and mentor students in building real-world projects.",
      applyLink: "/apply"
    },
    {
      title: "Data Science Educator",
      location: "Jamshedpur, Jharkhand",
      type: "Full-time",
      description: "Deliver data science and AI training, including hands-on projects and assessments.",
      applyLink: "/apply"
    },
    {
      title: "Android App Development Coach",
      location: "Remote",
      type: "Part-time",
      description: "Guide students through Android development courses with practical coding sessions.",
      applyLink: "/apply"
    },
    {
      title: "Administrative Assistant",
      location: "Chennai, Tamil Nadu",
      type: "Full-time",
      description: "Support day-to-day operations, including student coordination and event management.",
      applyLink: "/apply"
    }
  ];

  const siteUrl = import.meta.env.VITE_SITE_URL || window.location.origin;
  const canonicalUrl = `${siteUrl}/career`;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Helmet>
        <title>Career Opportunities at E-Digital India | Join Us Today!</title>
        <meta name="description" content="Explore exciting Career Opportunities at E-Digital India. Start your journey in digital marketing, web development, & more. Apply now and build the future!" />
        <link rel="canonical" href={canonicalUrl} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
<link name="keywords" content="default, keywords, here"/>
      </Helmet>
      
      <div className="max-w-6xl mx-auto">
        {/* Page Title */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Careers</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join our team at E Digital India Skill Development Institute and be part of transforming lives through education and innovation.
          </p>
        </div>

        {/* Why Work with Us */}
        <section className="mb-16">
          <h2 className="text-3xl font-semibold text-gray-900 text-center mb-12">Why Work with Us</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {whyWorkWithUs.map((item, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-700 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Our Current Job Openings */}
        <section>
          <h2 className="text-3xl font-semibold text-gray-900 text-center mb-12">Our Current Job Openings</h2>
          <div className="space-y-6">
            {jobOpenings.map((job, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-8 border border-gray-200">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-2 md:mb-0">{job.title}</h3>
                  <div className="flex flex-col sm:flex-row sm:gap-4 text-sm text-gray-600">
                    <span className="flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                      {job.location}
                    </span>
                    <span className="flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                      </svg>
                      {job.type}
                    </span>
                  </div>
                </div>
                <p className="text-gray-700 mb-6 leading-relaxed">{job.description}</p>
                <Link
                  to={job.applyLink}
                  className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Apply Now
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <p className="text-gray-600 mb-6">
            Don't see a position that matches your skills? Send us your resume anyway!
          </p>
          <Link
            to="/contact-us"
            className="inline-flex items-center px-8 py-4 bg-gray-800 text-white font-medium rounded-lg hover:bg-gray-900 transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
}