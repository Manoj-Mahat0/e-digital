// src/components/Partners.jsx
import React, { useState, useEffect, useMemo, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import api from "../services/api";

export default function Partners({
  showCaptions = true,
  logoMaxHeight = 48,
  scrollSpeed = 30,
}) {
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadedMap, setLoadedMap] = useState({});
  const PROD_HOST = "https://be.edigital.globalinfosofts.com";

  const PLACEHOLDER_SVG =
    "data:image/svg+xml;utf8," +
    encodeURIComponent(
      `<svg xmlns='http://www.w3.org/2000/svg' width='400' height='200'><rect width='100%' height='100%' fill='%23f1f5f9'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='20' fill='%23838fa6'>Logo not available</text></svg>`
    );

  const shimmer =
    "bg-gradient-to-r from-slate-100 via-slate-200 to-slate-100 animate-shimmer";

  const buildImageUrl = useCallback(
    (logo) => {
      if (!logo) return PLACEHOLDER_SVG;
      const trimmed = String(logo).trim();
      if (trimmed.startsWith(PROD_HOST)) return trimmed;
      const devHostPattern = /https?:\/\/(?:127\.0\.0\.1|localhost)(?::\d+)?/i;
      if (devHostPattern.test(trimmed)) return trimmed.replace(devHostPattern, PROD_HOST);
      if (trimmed.startsWith("/")) return `${PROD_HOST}${trimmed}`;
      if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) return trimmed;
      return `${PROD_HOST}/${trimmed}`;
    },
    [PROD_HOST]
  );

  useEffect(() => {
    let mounted = true;
    async function fetchPartners() {
      setLoading(true);
      try {
        const res = await api.get("/partners/");
        if (!mounted) return;
        const items = res.data?.items || [];
        const mapped = items.map((p) => ({
          id: p.id,
          name: p.company_name,
          src: buildImageUrl(p.logo),
          alt: p.company_name,
          website: p.website || "#",
        }));
        setPartners(mapped);
      } catch (err) {
        console.error("Failed to fetch partners:", err);
      } finally {
        if (mounted) setLoading(false);
      }
    }
    fetchPartners();
    return () => (mounted = false);
  }, [buildImageUrl]);

  const logos = useMemo(() => [...partners, ...partners], [partners]);

  const markLoaded = (key) => setLoadedMap((prev) => ({ ...prev, [key]: true }));

  return (
    <section className="py-16 bg-gradient-to-br from-white via-slate-50 to-slate-200">
      <motion.div
        className="max-w-7xl mx-auto px-6"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-10 text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
            Our Industry Partners
          </h2>
          <p className="text-base text-slate-600 mt-2">
            We collaborate with top organizations and universities to provide real-world
            exposure.
          </p>
        </div>

        <div className="relative bg-white rounded-3xl p-8 shadow-lg overflow-hidden">
          {loading ? (
            <div className="py-12 text-center text-slate-500">Loading partners…</div>
          ) : partners.length === 0 ? (
            <div className="py-12 text-center text-slate-500">No partners available.</div>
          ) : (
            <div className="overflow-hidden">
              <div
                className="flex gap-10 animate-infinite-scroll"
                style={{ animationDuration: `${scrollSpeed}s` }}
              >
                {logos.map((p, idx) => {
                  const key = `${p.src}-${idx}`;
                  const isLoaded = !!loadedMap[key];
                  return (
                    <motion.a
                      key={key}
                      href={p.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex flex-col items-center justify-center gap-2 min-w-[140px] md:min-w-[160px] lg:min-w-[180px] p-4 rounded-xl bg-white ring-1 ring-black/5 hover:shadow-md transition-shadow"
                    >
                      <div
                        className={`w-full flex items-center justify-center rounded-md p-3 bg-slate-50 shadow-inner ${
                          isLoaded ? "" : shimmer
                        }`}
                        style={{ minHeight: logoMaxHeight + 24 }}
                      >
                        <img
                          src={p.src}
                          alt={p.alt}
                          loading="lazy"
                          className={`max-h-12 object-contain transition-all duration-500 ease-in-out ${
                            isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-95"
                          }`}
                          style={{ maxHeight: logoMaxHeight }}
                          onLoad={() => markLoaded(key)}
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = PLACEHOLDER_SVG;
                            markLoaded(key);
                          }}
                        />
                      </div>

                      {showCaptions && (
                        <figcaption className="mt-2 text-xs text-slate-500 text-center line-clamp-1 w-full">
                          {p.name}
                        </figcaption>
                      )}
                    </motion.a>
                  );
                })}
              </div>
            </div>
          )}

          <style>{`
            @keyframes shimmer {
              0% { background-position: -200% 0; }
              100% { background-position: 200% 0; }
            }
            .animate-shimmer { 
              animation: shimmer 1.5s infinite linear; 
              background-size: 200% 100%;
            }
            @keyframes infinite-scroll {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
            .animate-infinite-scroll {
              animation: infinite-scroll linear infinite;
              will-change: transform;
            }
            .pause-on-interact:hover .animate-infinite-scroll,
            .pause-on-interact:focus-within .animate-infinite-scroll {
              animation-play-state: paused;
              cursor: grab;
            }
          `}</style>
        </div>
      </motion.div>
    </section>
  );
}
