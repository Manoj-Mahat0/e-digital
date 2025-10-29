// src/pages/Apply.jsx
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import HeroWithRegistration from '../components/HeroWithRegistration';
import LearnChannels from '../components/Apply/LearnChannels';

const channels = [
  { title: "Semrush", img: "/images/logos/semrush.png", alt: "SEMRush" },
  { title: "WordPress", img: "/images/logos/wordpress.png", alt: "WordPress" },
  { title: "WooCommerce", img: "/images/logos/woocommerce.png", alt: "WooCommerce" },
  { title: "Facebook Ads", img: "/images/logos/facebook-ads.png", alt: "Facebook Ads" },
  { title: "Google Ads", img: "/images/logos/google-ads.png", alt: "Google Ads" },
  { title: "Google Search Console", img: "/images/logos/google-search-console.png", alt: "Google Search Console" },
];

export default function Apply() {
  // Ensure browser scrolls to the top when this route loads.
  useEffect(() => {
    // two calls are defensive for single-page apps with hash/restore behavior
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
  }, []);

  const siteUrl = import.meta.env.VITE_SITE_URL || window.location.origin;
  const canonicalUrl = `${siteUrl}/apply`;

  return (
    <main className="relative">
      <Helmet>
        <title>Apply & Become a Digital Marketer in 6 Months | Join NOW!</title>
        <meta name="description" content="Become a digital marketer in 6 months. Get job opportunities with 3.5 LPA+, earn as a freelancer, and boost your business. Apply now at E-Digital India!" />
        <link rel="canonical" href={canonicalUrl} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </Helmet>
      
      {/* Give hero the id so we can reference it if needed */}
      <HeroWithRegistration 
        id="hero"
        backgroundImage="/images/hero-bg.jpg" 
      />

      {/* Ensure LearnChannels is a normal flow block and sits under hero */}
      <div className="relative z-0">
        <LearnChannels items={channels} />
      </div>
    </main>
  );
}