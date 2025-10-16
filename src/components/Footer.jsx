// src/components/Footer.jsx
import React from "react";
import { Link } from "react-router-dom";
import {
  FaYoutube,
  FaFacebookF,
  FaInstagram,
  FaPinterestP,
  FaMapMarkerAlt
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { HiPhone } from "react-icons/hi";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const courses = [
    { name: "SAP Course", to: "/courses/sap-global-certification-course" },
    { name: "Digital Marketing", to: "/courses/diploma-in-digital-marketing" },
    { name: "Web Development", to: "/courses/diploma-in-web-development" },
    { name: "Data Science & AI", to: "/courses/diploma-in-data-science-and-artificial-intelligence" },
    { name: "Android App Development", to: "/courses/diploma-in-android-app-development" },
    { name: "Business & Soft Skills", to: "/courses/diploma-in-business-communication-and-soft-skills" },
  ];

  const companyLinks = [
    { name: "About Us", href: "/about" },
    { name: "Contact Us", href: "/contact-us" },
    { name: "Apply Now", href: "/apply" },
    { name: "Career", href: "/careers" },
  ];

  return (
<footer className="bg-gray-900 text-gray-100">
  <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
    <div className="flex flex-row flex-wrap lg:flex-nowrap gap-4 items-start">

      {/* Offices (wider) */}
      <div className="flex-shrink-0 w-2/6 bg-gray-800 p-4 rounded-2xl text-sm">
        <h3 className="text-lg font-semibold text-sky-500 mb-2">Offices</h3>
        <div className="space-y-2 text-xs">
          <div>
            <strong>Head Office:</strong> Citadel Apartment, Venkataraman Street, T. Nagar, Chennai, Tamil Nadu 600017
          </div>
          <div>
            <strong>Branch 1:</strong> 2nd Floor, Noorsarai, Maidan Garhi - South West Delhi, 110068
          </div>
          <div>
            <strong>Branch 2:</strong> 2nd floor, Jayanta Tower, Sakchi Gol Chakkar, opposite Delhi Darbar, SNP Area, Sakchi, Jamshedpur, Jharkhand 831001
          </div>
        </div>
        <br />
         {/* Social Icons */}
        <div className="flex gap-2 mt-auto">
          {[
            { icon: FaYoutube, href: "https://www.youtube.com/@edigitalindia" },
            { icon: FaFacebookF, href: "https://www.facebook.com/people/E-Digital-INDIA/61574473705318" },
            { icon: FaInstagram, href: "https://www.instagram.com/edigitalindia/" },
            { icon: FaPinterestP, href: "https://in.pinterest.com/edigitaljsr/" },
            { icon: FaXTwitter, href: "https://x.com/edigitalindian" },
            { icon: FaMapMarkerAlt, href: "https://www.google.com/search?q=E-DIGITALINDIA" },
          ].map((s, i) => {
            const Icon = s.icon;
            return (
              <a
                key={i}
                href={s.href}
                className="h-8 w-8 rounded-full bg-white flex items-center justify-center text-gray-800 hover:shadow-lg transition"
                aria-label="social"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon className="h-4 w-4" />
              </a>
            );
          })}
        </div>
        
      </div>
      

      {/* Company */}
      <div className="flex-shrink-0 w-1/6 text-sm">
        <h4 className="text-lg font-semibold text-white mb-2">Company</h4>
        <ul className="space-y-1 text-gray-300">
          {companyLinks.map(l => (
            <li key={l.name}>
              <Link to={l.href} className="hover:text-sky-400">{l.name}</Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Courses */}
      <div className="flex-shrink-0 w-1/6 text-sm">
        <h4 className="text-lg font-semibold text-white mb-2">Courses</h4>
        <ul className="space-y-1 text-gray-300">
          {courses.map(c => (
            <li key={c.name}>
              <Link to={c.to} className="hover:text-sky-400">{c.name}</Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Map (bigger with right padding) */}
      <div className="flex-shrink-0 w-1/3 "> {/* increased width + padding right */}
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3677.9248436118573!2d86.200489675085!3d22.805248579326786!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f5e3d507584243%3A0x58705df840f5f9d4!2sE-DIGITALINDIA-%20Best%20Skill%20Development%20Institute%20in%20Jharkhand!5e0!3m2!1sen!2sin!4v1760605614624!5m2!1sen!2sin"
          width="100%"
          height="180"
          className="rounded-2xl"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="E-DIGITALINDIA Location Map"
        ></iframe>
      </div>

    </div>

    {/* Partner logos */}
    <div className="mt-12 flex flex-col items-center gap-6">
      <div className="flex items-center justify-between w-full">
        <img src="/iso.webp" alt="ISO" className="h-12 object-contain" />
        <img src="/msme_compressed.webp" alt="MSME" className="h-12 object-contain" />
        <img src="/skillindia.webp" alt="Skill India" className="h-12 object-contain" />
      </div>

      <div className="w-full border-t border-gray-800 mt-6 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-gray-400 text-sm">
          © {currentYear} e-digitalindia | All Rights Reserved
        </div>
        <div className="text-gray-400 text-sm">
          Designed & Maintained by <a href="https://globalinfosofts.com/" className="hover:text-sky-400">Global Infosoft</a>
        </div>
      </div>
    </div>
  </div>
</footer>








  );
}
