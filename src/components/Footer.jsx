import React from 'react';
// Assuming lucide-react is available, which provides a modern icon set.
// We are using equivalent names for the icons the user requested.
import {
  Youtube,
  Facebook,
  Instagram,
  X,
  MapPin,
  Phone,
  BookOpen,
  Users,
  Briefcase,
  ArrowRight,
  Send,
  Home
} from 'lucide-react';

// Main component, renamed to App for the single-file mandate
export default function App() {
  const currentYear = new Date().getFullYear();

  // Replaced Link with a to simplify for the single-file mandate
  const NavLink = ({ to, children }) => (
    <a href={to} className="hover:text-sky-300 transition duration-200">
      {children}
    </a>
  );

  const courses = [
    { name: "Web Development", to: "/diploma-in-web-development" },
    { name: "Digital Marketing", to: "/diploma-in-digital-marketing" },
    { name: "Data Science & AI", to: "/diploma-in-data-science-and-artificial-intelligence" },
    { name: "Android App Development", to: "/diploma-in-android-app-development" },
    { name: "Business Comm. & Soft Skills", to: "/diploma-in-business-communication-and-soft-skills" },
    { name: "Sap Global Certification", to: "/sap-global-certification-course" },
  ];

  const companyLinks = [
    { name: "About Us", href: "/about-us", icon: Users },
    { name: "Contact Us", href: "/contact-us", icon: Phone },
    { name: "Apply Now", href: "/apply", icon: Send },
    { name: "Career", href: "/career", icon: Briefcase },
    { name: "Terms & Conditions", href: "/term-and-condition", icon: Briefcase },
  ];

  const socialLinks = [
    { icon: Youtube, href: "https://www.youtube.com/@edigitalindia", label: "YouTube" },
    { icon: Facebook, href: "https://www.facebook.com/people/E-Digital-INDIA/61574473705318", label: "Facebook" },
    { icon: Instagram, href: "https://www.instagram.com/edigitalindia/", label: "Instagram" },
    { icon: X, href: "https://x.com/edigitalindian", label: "X/Twitter" },
    { icon: MapPin, href: "https://www.google.com/search?q=E-DIGITALINDIA", label: "Google Maps" },
  ];

  const OfficeLocation = ({ title, address, icon: Icon }) => (
    <div className="flex items-start space-x-3">
      <Icon className="h-5 w-5 text-sky-400 mt-1 flex-shrink-0" />
      <div className="flex flex-col">
        <strong className="font-medium text-white">{title}</strong>
        <p className="text-gray-400 text-xs mt-0.5">{address}</p>
      </div>
    </div>
  );

  return (
    <footer className="bg-gray-950 text-gray-200 font-inter">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Main Grid Layout (4 columns on desktop) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">

          {/* 1. Offices & Social (lg:col-span-2) */}
          <div className="lg:col-span-2 space-y-6">
            <h3 className="text-2xl font-extrabold text-white tracking-tight border-b-2 border-sky-500 pb-2 inline-block">
              E-Digital India
            </h3>
            
            <div className="bg-gray-900 p-6 rounded-xl shadow-lg space-y-5">
              <h4 className="text-xl font-semibold text-sky-400 mb-4 flex items-center">
                <Home className="h-5 w-5 mr-2" />
                Our Offices
              </h4>
              
              <div className="space-y-4">
                <OfficeLocation
                  title="Head Office"
                  address="Citadel Apartment, Venkataraman Street, T. Nagar, Chennai, Tamil Nadu 600017"
                  icon={MapPin}
                />
                <OfficeLocation
                  title="Branch 1"
                  address="2nd Floor, Noorsarai, Maidan Garhi - South West Delhi, 110068"
                  icon={MapPin}
                />
                <OfficeLocation
                  title="Branch 2 (Jamshedpur)"
                  address="2nd floor, Jayanta Tower, Sakchi Gol Chakkar, opposite Delhi Darbar, SNP Area, Sakchi, Jamshedpur, Jharkhand 831001"
                  icon={MapPin}
                />
              </div>

              {/* Contact Info */}
              <div className="flex items-center space-x-3 text-sm pt-4 border-t border-gray-800">
                <Phone className="h-5 w-5 text-sky-400" />
                <a href="tel:+919934141233" className="text-white hover:text-sky-300 transition font-medium">
                  +91 9934141233
                </a>
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex gap-3 pt-2">
              {socialLinks.map((s, i) => {
                const Icon = s.icon;
                return (
                  <a
                    key={i}
                    href={s.href}
                    className="h-9 w-9 rounded-full bg-gray-800 flex items-center justify-center text-sky-400 hover:bg-sky-500 hover:text-white transition duration-300 shadow-md"
                    aria-label={s.label}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* 2. Company Links (lg:col-span-1) */}
          <div className="lg:col-span-1">
            <h4 className="text-xl font-semibold text-white mb-6">Company</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              {companyLinks.map(l => {
                const Icon = l.icon;
                return (
                  <li key={l.name} className="flex items-start">
                    <ArrowRight className="h-4 w-4 text-sky-400 mt-1 mr-2 flex-shrink-0" />
                    <NavLink to={l.href}>{l.name}</NavLink>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* 3. Courses Links (lg:col-span-1) */}
          <div className="lg:col-span-1">
            <h4 className="text-xl font-semibold text-white mb-6 flex items-center">
              <BookOpen className="h-5 w-5 mr-2" />
              Top Courses
            </h4>
            <ul className="space-y-3 text-sm text-gray-400">
              {courses.map(c => (
                <li key={c.name} className="flex items-start">
                  <ArrowRight className="h-4 w-4 text-sky-400 mt-1 mr-2 flex-shrink-0" />
                  <NavLink to={c.to}>{c.name}</NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* 4. Map Embed (lg:col-span-1) */}
          <div className="lg:col-span-1">
            <h4 className="text-xl font-semibold text-white mb-6">Location</h4>
            <div className="aspect-video w-full">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3677.9248436118573!2d86.200489675085!3d22.805248579326786!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f5e3d507584243%3A0x58705df840f5f9d4!2sE-DIGITALINDIA-%20Best%20Skill%20Development%20Institute%20in%20Jharkhand!5e0!3m2!1sen!2sin!4v1760605614624!5m2!1sen!2sin"
                width="100%"
                height="100%"
                className="rounded-xl shadow-2xl"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="E-DIGITALINDIA Location Map"
              ></iframe>
            </div>
          </div>

        </div>

        {/* Footer Bottom (Copyright and Credits) */}
        <div className="w-full border-t border-gray-800 mt-16 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-gray-500 text-sm">
            © {currentYear} E-Digital India | All Rights Reserved
          </div>
          <div className="text-gray-500 text-sm">
            Designed & Maintained by <a href="https://globalinfosofts.com/" className="text-sky-400 hover:text-sky-300 transition font-medium">Global Infosoft</a>
          </div>
        </div>
      </div>
    </footer>
  );
}