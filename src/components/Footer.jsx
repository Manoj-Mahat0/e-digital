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
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Left: Offices card */}
          <div>
            <div className="bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-800">
              <h3 className="text-2xl font-semibold text-sky-500 mb-4">Our Offices</h3>

              <div className="space-y-4 text-sm text-gray-300">
                <div>
                  <div className="font-semibold text-gray-100">Head Office:</div>
                  <div>
                    Citadel Apartment, Venkataraman Street, T. Nagar, Chennai, Tamil Nadu 600017
                  </div>
                </div>

                <div>
                  <div className="font-semibold text-gray-100">Branch 1:</div>
                  <div>2nd Floor, Noorsarai, Maidan Garhi - South West Delhi, 110068.</div>
                </div>

                <div>
                  <div className="font-semibold text-gray-100">Branch 2:</div>
                  <div>2nd floor, Jayanta Tower, Sakchi Gol Chakkar, opposite Delhi Darbar, SNP Area, Sakchi, Jamshedpur, Jharkhand 831001</div>
                </div>
              </div>

              {/* Social icons */}
              <div className="flex gap-3 mt-6">
                {[
                  { icon: FaYoutube, href: "https://www.youtube.com/@edigitalindia" },
                  { icon: FaFacebookF, href: "https://www.facebook.com/people/E-Digital-INDIA/61574473705318/?rdid=rl2wdWDvK3KtTC91&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1AAT6zktXY%2F" },
                  { icon: FaInstagram, href: "https://www.instagram.com/edigitalindia/" },
                  { icon: FaPinterestP, href: "https://in.pinterest.com/edigitaljsr/?actingBusinessId=961589095346489495" },
                  { icon: FaXTwitter, href: "https://x.com/edigitalindian" },
                  { icon: FaMapMarkerAlt, href: "https://www.google.com/search?sca_esv=813765718ccf2407&rlz=1C1VDKB_enIN1133IN1134&sxsrf=AE3TifPSlsj71lF7-mhJE6hWq70aSXNEgQ:1749544205004&kgmid=/g/11x2186pw2&q=E-DIGITALINDIA&shndl=30&shem=lcuae,lspt2,uaasie&source=sh/x/loc/uni/m1/1&kgs=1085c7eabcfc9956" },
                ].map((s, i) => {
                  const Icon = s.icon;
                  return (
                    <a
                      key={i}
                      href={s.href}
                      className="h-10 w-10 rounded-full bg-white flex items-center justify-center text-gray-800 hover:shadow-lg transition"
                      aria-label="social"
                    >
                      <Icon className="h-4 w-4" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Middle: Company & Support */}
          <div className="flex flex-col gap-6">
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Company</h4>
              <ul className="space-y-3 text-gray-300">
                {companyLinks.map((l) => (
                  <li key={l.name}>
                    <Link to={l.href} className="hover:text-sky-400 transition-colors">
                      {l.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Support</h4>
              <ul className="space-y-3 text-gray-300">
                <li>
                  <Link to="/terms" className="hover:text-sky-400 transition-colors">Terms & Conditions</Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Right: Courses */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Courses</h4>
            <ul className="space-y-3 text-gray-300">
              {courses.map((c) => (
                <li key={c.name}>
                  <Link to={c.to} className="hover:text-sky-400 transition-colors">{c.name}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Partner logos row */}
        <div className="mt-12 flex flex-col items-center gap-6">
          <div className="flex items-center gap-8">
            <img src="/iso.webp" alt="ISO" className="h-12 object-contain" />
            <img src="/msme_compressed.webp" alt="MSME" className="h-12 object-contain" />
            <img src="/skillindia.webp" alt="Skill India" className="h-12 object-contain" />
          </div>

          <div className="w-full border-t border-gray-800 mt-6 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-gray-400 text-sm">
              © {currentYear} e-digitalindia | All Rights Reserved
            </div>

            <div className="text-gray-400 text-sm">
              Designed & Maintained by E-Digital Indian
            </div>
          </div>
        </div>
      </div>

      
    </footer>
  );
}
