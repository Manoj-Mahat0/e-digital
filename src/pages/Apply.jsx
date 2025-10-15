// src/pages/Apply.jsx
import { useEffect } from "react";
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

  return (
    <main className="relative">
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
