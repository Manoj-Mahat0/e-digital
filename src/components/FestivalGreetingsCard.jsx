import React, { useState, useEffect, useRef, useCallback } from "react";
import { HiX, HiSparkles } from "react-icons/hi";
import { motion, AnimatePresence } from "framer-motion";

// --- New/Improved Helper Components & Utilities ---

// Utility for random numbers
function random(min, max) {
  return Math.random() * (max - min) + min;
}

// Colors for confetti
const confettiColors = ["#FFB86B", "#FFD66B", "#FF7AB6", "#A6FFB8", "#8ED1FF", "#FECACA"];
function getRandomConfettiColor(i = 0) {
  return confettiColors[i % confettiColors.length];
}

// Diya SVG component
function FloatingDiya({ className = "" }) {
  return (
    <motion.div
      className={`diya ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: random(0.2, 0.8) }}
    >
      <svg viewBox="0 0 64 64" className="block drop-shadow-lg" aria-hidden>
        <defs>
          <radialGradient id="flameGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFF7D4" />
            <stop offset="100%" stopColor="#FF8A3D" />
          </radialGradient>
        </defs>
        <g>
          <ellipse cx="32" cy="48" rx="28" ry="8" fill="#5D4037" opacity="0.9" />
          <path d="M4 48 C4 35, 60 35, 60 48" fill="#FFC107" />
          <path d="M28 42c2-7 8-10 8-10s6 3 8 10z" fill="#FFEB99" />
          <motion.path
            d="M32 30 C30 25, 34 22, 32 18 C30 22, 34 25, 32 30 Z"
            fill="url(#flameGlow)"
            className="flame"
            animate={{
              scale: [1, 1.05, 0.95, 1],
              y: [0, -1, 1, 0],
              opacity: [0.8, 1, 0.9, 1]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
              repeatDelay: 0.1
            }}
          />
        </g>
      </svg>
    </motion.div>
  );
}

// Confetti particle component for individual animations
const ConfettiParticle = ({ index, x, y, size, rotation, delay, duration }) => {
    const color = getRandomConfettiColor(index);
    return (
      <motion.span
        className="absolute rounded-sm"
        style={{
          width: size,
          height: size,
          backgroundColor: color,
          left: `${x}%`,
          top: `${y}%`,
          transform: `rotate(${rotation}deg)`,
        }}
        initial={{ y: 0, opacity: 1, scale: 1, rotate: rotation }}
        animate={{
          y: [-20, -100, -150], // Arc upwards then drift down slightly
          x: [0, random(-30, 30), random(-50, 50)], // Drift horizontally
          opacity: [1, 0.9, 0],
          scale: [1, 0.8, 0.5],
          rotate: rotation + random(360, 720), // Continuous spin
        }}
        transition={{
          delay: delay,
          duration: duration,
          repeat: Infinity,
          repeatType: "loop",
          ease: "easeOut",
        }}
      />
    );
};

// Confetti burst for grouping particles
function ConfettiExplosion({ count = 15 }) {
    return (
      <div className="relative w-full h-full overflow-hidden pointer-events-none">
        {Array.from({ length: count }).map((_, i) => (
          <ConfettiParticle
            key={i}
            index={i}
            x={random(20, 80)} // Spawn in a central area
            y={random(80, 100)} // Start from bottom
            size={random(6, 12)}
            rotation={random(0, 360)}
            delay={random(0, 0.8)}
            duration={random(3, 6)}
          />
        ))}
      </div>
    );
}


// Fireworks Canvas Component (Separated for clarity and better control)
const FireworksCanvas = React.memo(({ isVisible, prefersReducedMotion }) => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const intervalRef = useRef(null);
  const particles = useRef([]); // Use ref for particles array

  const startFireworks = useCallback(() => {
    if (prefersReducedMotion || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let dpr = window.devicePixelRatio || 1;

    const resizeCanvas = () => {
      // Set canvas to fill its container (100% width, 100% height of parent)
      const parent = canvas.parentElement;
      canvas.width = parent.clientWidth * dpr;
      canvas.height = parent.clientHeight * dpr;
      canvas.style.width = parent.clientWidth + "px";
      canvas.style.height = parent.clientHeight + "px";
      ctx.scale(dpr, dpr);
    };

    const launchBurst = (x = random(canvas.width * 0.2, canvas.width * 0.8) / dpr,
                         y = random(50, 150),
                         type = 'sphere') => {
      const hue = Math.floor(random(0, 360));
      const count = 40 + Math.floor(random(0, 40));
      const baseSpeed = random(2, 5);

      if (type === 'sphere') {
        for (let i = 0; i < count; i++) {
          const angle = (Math.PI * 2 * i) / count;
          particles.current.push({
            x, y,
            vx: Math.cos(angle) * baseSpeed * random(0.8, 1.2),
            vy: Math.sin(angle) * baseSpeed * random(0.8, 1.2),
            life: 90 + random(0, 60), age: 0, hue, size: random(1.5, 3.5),
            prevX: x, prevY: y,
          });
        }
      } else if (type === 'star') {
        const spikes = 5;
        for (let i = 0; i < count; i++) {
          const angle = (Math.PI * 2 * i) / count;
          const spikeAngle = Math.floor(i / (count / spikes)) * (Math.PI * 2 / spikes);
          const speedFactor = Math.abs(Math.cos(angle - spikeAngle)) * 0.7 + 0.3; // Make it star-shaped
          particles.current.push({
            x, y,
            vx: Math.cos(angle) * baseSpeed * random(0.8, 1.2) * speedFactor * 1.5,
            vy: Math.sin(angle) * baseSpeed * random(0.8, 1.2) * speedFactor * 1.5,
            life: 100 + random(0, 70), age: 0, hue, size: random(1.8, 4),
            prevX: x, prevY: y,
          });
        }
      }
    };

    const animate = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.07)"; // More subtle trail
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (let i = particles.current.length - 1; i >= 0; i--) {
        const p = particles.current[i];
        p.prevX = p.x; p.prevY = p.y;
        p.x += p.vx; p.y += p.vy;
        p.vy += 0.03; // Gravity
        p.vx *= 0.985; // Air drag
        p.age++;

        const t = p.age / p.life;
        const alpha = Math.max(0, 1 - t ** 2);

        // Draw particle trail
        ctx.beginPath();
        ctx.strokeStyle = `hsla(${p.hue}, 95%, 70%, ${alpha})`;
        ctx.lineWidth = p.size;
        ctx.moveTo(p.prevX, p.prevY);
        ctx.lineTo(p.x, p.y);
        ctx.stroke();

        if (p.age > p.life) particles.current.splice(i, 1);
      }
      animationRef.current = requestAnimationFrame(animate);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    animationRef.current = requestAnimationFrame(animate);

    // Initial burst and continuous bursts
    launchBurst(undefined, undefined, random(0,1) > 0.5 ? 'sphere' : 'star');
    intervalRef.current = setInterval(() => {
        launchBurst(undefined, undefined, random(0,1) > 0.5 ? 'sphere' : 'star');
    }, 800 + random(0, 1500));

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationRef.current);
      clearInterval(intervalRef.current);
      particles.current = []; // Clear particles on unmount
    };
  }, [prefersReducedMotion]); // Dependencies for useCallback

  useEffect(() => {
    if (isVisible && !prefersReducedMotion) {
      startFireworks();
    } else {
      // Clean up when not visible or prefersReducedMotion
      cancelAnimationFrame(animationRef.current);
      clearInterval(intervalRef.current);
      particles.current = [];
    }
  }, [isVisible, prefersReducedMotion, startFireworks]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full block opacity-90"
      aria-hidden={!isVisible || prefersReducedMotion}
    />
  );
});

// Rangoli Component
function Rangoli() {
  return (
    <motion.div
      className="w-40 h-40 rounded-full flex items-center justify-center relative shadow-lg"
      animate={{ rotate: 360 }}
      transition={{ ease: "linear", duration: 30, repeat: Infinity }}
    >
      <div className="w-32 h-32 rounded-full bg-gradient-to-tr from-yellow-100 to-yellow-200 shadow-inner" />
      <svg viewBox="0 0 100 100" className="absolute w-full h-full -z-10 pointer-events-none" aria-hidden>
        <motion.circle
          cx="50" cy="50" r="45"
          stroke="#FFD66B" strokeWidth="2.5"
          fill="none"
          strokeDasharray="10 5"
          animate={{ strokeDashoffset: [0, -15] }}
          transition={{ ease: "linear", duration: 3, repeat: Infinity }}
        />
        <g stroke="#FFB86B" strokeWidth="1.5" fill="#FFE082" opacity="0.8">
          <path d="M50 10 L65 35 L90 50 L65 65 L50 90 L35 65 L10 50 L35 35 Z" />
          <motion.path
            d="M50 20 L58 42 L80 50 L58 58 L50 80 L42 58 L20 50 L42 42 Z"
            animate={{ rotate: [0, 360] }}
            transformOrigin="50 50"
            transition={{ ease: "linear", duration: 15, repeat: Infinity }}
          />
        </g>
      </svg>
    </motion.div>
  );
}


// --- Main FestivalGreetingsCard Component ---
export default function FestivalGreetingsCard() {
  const [isVisible, setIsVisible] = useState(false);
  const [dontShowAgain, setDontShowAgain] = useState(false);
  const prefersReducedMotion = useRef(false);

  useEffect(() => {
    prefersReducedMotion.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dismissed = localStorage.getItem("festivalGreetingsDismissed");
    if (dismissed === "true") return;

    const now = new Date();
    const currentMonth = now.getMonth();
    const currentDay = now.getDate();

    const isFestivalPeriod =
      (currentMonth === 9 && currentDay >= 15) ||
      (currentMonth === 10 && currentDay <= 15);

    if (isFestivalPeriod) setIsVisible(true);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    if (dontShowAgain) {
      localStorage.setItem("festivalGreetingsDismissed", "true");
    }
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 50, transition: { duration: 0.3 } },
    enter: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", damping: 18, stiffness: 200, delay: 0.1 } },
    exit: { opacity: 0, scale: 0.9, y: 30, transition: { duration: 0.3 } },
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-[100] p-4 sm:p-6 md:p-8 backdrop-blur-sm">
      <AnimatePresence>
        <motion.div
          className="relative max-w-4xl w-full mx-auto" // Wider card
          initial="hidden"
          animate="enter"
          exit="exit"
          variants={modalVariants}
        >
          <div className="bg-gradient-to-br from-yellow-50 via-white to-orange-100 rounded-[35px] shadow-[0_30px_90px_rgba(255,165,0,0.7)] overflow-hidden border-2 border-amber-300 transform perspective-[1000px] rotateX-0">
            {/* Main content area, now split into two columns for wider layout */}
            <div className="flex flex-col md:flex-row items-stretch">

              {/* Left Section: Visuals (Fireworks, Diyas, Title) */}
              <div className="relative flex-1 min-h-[250px] md:min-h-[400px] bg-gradient-to-br from-gray-900 to-indigo-900 rounded-t-[33px] md:rounded-l-[33px] md:rounded-tr-none overflow-hidden flex items-center justify-center p-4">
                
                {/* Fireworks Canvas Background */}
                <FireworksCanvas isVisible={isVisible} prefersReducedMotion={prefersReducedMotion.current} />

                {/* Sparkling particles on top of fireworks */}
                {!prefersReducedMotion.current && (
                  <div className="absolute inset-0 z-10">
                    <ConfettiExplosion count={20} />
                  </div>
                )}
                
                {/* Diwali Title and Decorative elements */}
                <div className="relative z-20 text-center text-white p-4">
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                  >
                    <div className="mb-3 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-400/90 shadow-lg ring-4 ring-yellow-500/50">
                      <HiSparkles className="h-7 w-7 text-yellow-800 animate-spin-slow" />
                      <span className="text-xl font-bold text-yellow-800 tracking-wide">Deepawali Shubh Labh</span>
                    </div>
                    <h1 className="text-6xl md:text-7xl font-black tracking-tight leading-none text-shadow-glow mt-4 text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-yellow-500">
                      Happy Diwali
                    </h1>
                  </motion.div>
                </div>

                {/* Floating Diyas (absolute positioning within this section) */}
                <div className="pointer-events-none absolute inset-x-0 bottom-4 top-1/2 flex items-end justify-around px-6">
                  <FloatingDiya
                    className="w-20 h-20 md:w-24 md:h-24 transform -translate-y-6 animate-[diyaFloat_5s_ease-in-out_infinite] delay-100"
                  />
                  <FloatingDiya
                    className="w-16 h-16 md:w-20 md:h-20 transform -translate-y-2 animate-[diyaFloat_6s_ease-in-out_infinite]"
                  />
                  <FloatingDiya
                    className="w-20 h-20 md:w-24 md:h-24 transform -translate-y-8 animate-[diyaFloat_4s_ease-in-out_infinite] delay-300"
                  />
                </div>
              </div>

              {/* Right Section: Message and Controls */}
              <div className="relative flex-1 p-6 md:p-10 flex flex-col justify-between">
                
                {/* Close Button */}
                <motion.button
                  onClick={handleClose}
                  aria-label="Close greetings"
                  className="absolute top-4 right-4 text-gray-700 hover:text-gray-900 p-2 rounded-full bg-white/70 shadow-md backdrop-blur-sm transition hover:scale-105 z-30"
                  whileHover={{ rotate: 90 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <HiX className="h-6 w-6" />
                </motion.button>

                <div className="text-center flex-grow flex flex-col justify-center">
                  <p className="text-gray-700 text-xl font-medium mb-6 leading-relaxed">
                    May this festival of lights illuminate your path with prosperity, joy, and new beginnings.
                  </p>
                  
                  {/* Decorative element, possibly a small garland or additional festive icon */}
                  <div className="flex justify-center my-4">
                    <motion.div
                      className="text-amber-500 text-3xl"
                      animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    >
                      &#x1F387; {/* Sparkler emoji, can be replaced with an SVG */}
                    </motion.div>
                  </div>
                </div>

                {/* Action/Dismissal Row */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-6">
                  <label className="inline-flex items-center gap-2 text-base text-gray-600 cursor-pointer flex-shrink-0">
                    <input
                      type="checkbox"
                      className="form-checkbox h-5 w-5 text-yellow-600 ring-2 ring-yellow-400 focus:ring-yellow-600 rounded-md"
                      checked={dontShowAgain}
                      onChange={(e) => setDontShowAgain(e.target.checked)}
                    />
                    Don't show again
                  </label>

                  <motion.button
                    onClick={handleClose}
                    className="inline-flex items-center justify-center w-full sm:w-auto bg-gradient-to-r from-orange-500 to-amber-600 text-white px-6 py-3 rounded-xl font-bold text-lg shadow-[0_10px_30px_rgba(255,165,0,0.4)] transition hover:brightness-110 flex-grow sm:flex-grow-0"
                    whileHover={{ scale: 1.05, boxShadow: "0 15px 40px rgba(255,165,0,0.6)" }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Celebrate & Continue
                  </motion.button>
                </div>

                {/* Decorative Footer: Animated Rangoli */}
                <div className="mt-8 flex items-center justify-center">
                  <Rangoli />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

// NOTE: Ensure your Tailwind config includes the animation keyframes.
// For example, in tailwind.config.js:
/*
module.exports = {
  theme: {
    extend: {
      animation: {
        'spin-slow': 'spin 5s linear infinite',
        'diyaFloat': 'diyaFloat 4s ease-in-out infinite',
      },
      keyframes: {
        diyaFloat: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-15px)' },
        },
        // Add text-shadow-glow for the heading:
        // You might need a plugin or custom utility for text-shadow
      }
    },
  },
  // If you use custom text-shadow:
  // plugins: [
  //   function({ addUtilities }) {
  //     const newUtilities = {
  //       '.text-shadow-glow': {
  //         'text-shadow': '0 0 10px rgba(255, 255, 255, 0.8), 0 0 20px rgba(255, 215, 0, 0.6)',
  //       },
  //     }
  //     addUtilities(newUtilities, ['responsive', 'hover'])
  //   }
  // ]
}
*/