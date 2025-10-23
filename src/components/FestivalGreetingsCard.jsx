import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Utility function for random numbers (can be used for various effects)
function random(min, max) {
  return Math.random() * (max - min) + min;
}

const FloatingDiya = React.memo(({ initialY, delay, duration }) => (
  <motion.div
    className="absolute w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20"
    initial={{ y: initialY, opacity: 0, scale: 0.8 }}
    animate={{ y: [initialY, initialY - 10, initialY], opacity: 1, scale: 1 }}
    transition={{
      delay: delay,
      duration: duration,
      repeat: Infinity,
      ease: "easeInOut",
      repeatType: "reverse",
    }}
  >
    <svg viewBox="0 0 64 64" className="block drop-shadow-lg" aria-hidden>
      <defs>
        <radialGradient id={`flameGlow-${delay}`} cx="50%" cy="50%" r="50%">
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
          fill={`url(#flameGlow-${delay})`}
          animate={{
            scale: [1, 1.05, 0.95, 1],
            y: [0, -1, 1, 0],
            opacity: [0.8, 1, 0.9, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
            repeatDelay: 0.1,
          }}
        />
      </g>
    </svg>
  </motion.div>
));

const ChhathPujaAnimation = () => {
  const [scene, setScene] = useState(1);
  const audioRef = useRef(null);

  useEffect(() => {
    // Preload audio if needed, or handle autoplay constraints
    if (audioRef.current) {
      audioRef.current.volume = 0.6; // Adjust volume
      // Autoplay might be blocked, consider user interaction to start
      // audioRef.current.play().catch(e => console.log("Autoplay blocked:", e));
    }

    const timer1 = setTimeout(() => {
      setScene(2);
    }, 8000); // After 8 seconds, transition to sunrise

    const timer2 = setTimeout(() => {
      setScene(3);
      if (audioRef.current) {
        audioRef.current.pause(); // Or switch to a different track
        audioRef.current.src = "/path/to/chhath-song-instrumental.mp3"; // Load traditional song
        // audioRef.current.play().catch(e => console.log("Autoplay blocked:", e));
      }
    }, 18000); // After 18 seconds (8+10), transition to celebration

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  // Function to simulate water ripples
  const WaterRipple = () => (
    <div className="absolute inset-x-0 bottom-0 h-1/3 overflow-hidden">
      {Array.from({ length: 10 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute bg-blue-300/30 rounded-full blur-sm"
          initial={{
            width: random(300, 600),
            height: random(10, 30),
            x: random(0, window.innerWidth - 600),
            bottom: random(0, 100),
            opacity: 0,
            scaleY: 0.2,
          }}
          animate={{
            opacity: [0, random(0.3, 0.6), 0],
            scaleY: [0.2, 1, 0.2],
            x: `+=${random(-50, 50)}`, // Gentle side movement
          }}
          transition={{
            duration: random(4, 8),
            repeat: Infinity,
            delay: random(0, 5),
            ease: "linear",
          }}
        />
      ))}
    </div>
  );

  return (
    <div className="relative w-full h-screen bg-gradient-to-br from-indigo-900 to-purple-900 overflow-hidden flex items-center justify-center font-sans">
      {/* Audio Element */}
      <audio ref={audioRef} src="/path/to/mild-conch-birds.mp3" loop />

      {/* Background - Sky */}
      <motion.div
        className="absolute inset-0"
        initial={{
          background: "linear-gradient(to top, #4B0082, #6A5ACD, #87CEEB)", // Violet, Medium Slate Blue, Sky Blue
        }}
        animate={
          scene === 2
            ? {
                background:
                  "linear-gradient(to top, #FF8C00, #FFD700, #ADD8E6)", // Dark Orange, Gold, Light Blue (Sunrise)
              }
            : scene === 3
            ? {
                background:
                  "linear-gradient(to top, #FFD700, #FFEA00, #87CEEB)", // Gold, Yellow, Sky Blue (Daylight)
              }
            : {}
        }
        transition={{ duration: 5, ease: "easeInOut" }}
      />

      {/* Stars */}
      <AnimatePresence>
        {scene === 1 && (
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 3 }}
          >
            {Array.from({ length: 50 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute bg-white rounded-full"
                style={{
                  width: random(1, 3),
                  height: random(1, 3),
                  left: `${random(0, 100)}%`,
                  top: `${random(0, 50)}%`, // Only top half for stars
                }}
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{
                  duration: random(2, 4),
                  repeat: Infinity,
                  delay: random(0, 2),
                  ease: "easeInOut",
                }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* River */}
      <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-blue-900 to-blue-700 opacity-80">
        <WaterRipple />
      </div>

      {/* Mist effect */}
      <motion.div
        className="absolute bottom-1/4 left-0 right-0 h-1/4 bg-white/20 blur-xl"
        initial={{ opacity: 0.2 }}
        animate={{ opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      />

      {/* Sun */}
      <motion.div
        className="absolute rounded-full bg-orange-400 blur-2xl"
        style={{ width: 150, height: 150 }}
        initial={{ top: "100%", left: "50%", x: "-50%", opacity: 0 }}
        animate={
          scene === 2 || scene === 3
            ? { top: "10%", opacity: 1, boxShadow: "0 0 100px 50px rgba(255,165,0,0.7)" }
            : {}
        }
        transition={{ duration: 8, ease: "easeOut" }}
      />
      <AnimatePresence>
        {(scene === 2 || scene === 3) && (
          <motion.div
            className="absolute rounded-full bg-yellow-300"
            style={{ width: 80, height: 80 }}
            initial={{ top: "100%", left: "50%", x: "-50%", opacity: 0 }}
            animate={{ top: "10%", opacity: 1, boxShadow: "0 0 80px 30px rgba(255,255,0,0.5)" }}
            transition={{ duration: 8, ease: "easeOut", delay: 1 }}
          >
            {/* Lens flare / sparkles on sun */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
            >
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute w-4 h-1 bg-white opacity-70 rounded-full"
                  style={{ transform: `rotate(${i * 45}deg) translateX(30px)` }}
                />
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Devotees (Silhouettes) */}
      <div className="absolute bottom-1/4 flex justify-around w-full px-10">
        <motion.div
          className="relative w-24 h-40 bg-gray-800 rounded-t-full" // Silhouette for a person
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 1 }}
        >
          {/* Basket */}
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-20 h-10 bg-amber-700/80 rounded-t-full border-t-4 border-amber-900" />
          {/* Reflected light on silhouette */}
          {scene >= 2 && (
            <motion.div
              className="absolute top-0 left-0 w-full h-full rounded-t-full"
              initial={{ background: "transparent" }}
              animate={{ background: "linear-gradient(to top, rgba(255,215,0,0.3), transparent)" }}
              transition={{ delay: 8, duration: 5 }}
            />
          )}
        </motion.div>
        <motion.div
          className="relative w-20 h-36 bg-gray-800 rounded-t-full"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 1 }}
        >
          {/* Reflection of saree and puja thali */}
          {scene >= 2 && (
            <motion.div
              className="absolute top-0 left-0 w-full h-full rounded-t-full"
              initial={{ background: "transparent" }}
              animate={{
                background:
                  "linear-gradient(to top, rgba(255,160,0,0.4), rgba(255,215,0,0.2), transparent)",
              }}
              transition={{ delay: 8, duration: 5 }}
            />
          )}
        </motion.div>
      </div>

      {/* Floating Diyas on water */}
      <div className="absolute bottom-1/4 left-0 right-0 flex justify-evenly items-end h-1/4 pointer-events-none">
        <FloatingDiya initialY={-20} delay={2} duration={5} />
        <FloatingDiya initialY={-5} delay={3} duration={6} />
        <FloatingDiya initialY={-30} delay={2.5} duration={4.5} />
        <FloatingDiya initialY={-15} delay={3.5} duration={5.5} />
      </div>

      {/* Bird animation */}
      <AnimatePresence>
        {scene >= 2 && (
          <motion.div
            className="absolute top-20 left-0 w-full flex justify-around opacity-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 9, duration: 3 }}
          >
            {Array.from({ length: 3 }).map((_, i) => (
              <motion.div
                key={i}
                className="text-4xl" // Using emoji for bird
                initial={{ x: `${-100 - i * 50}%`, y: random(-20, 20) }}
                animate={{ x: `${100 + i * 50}%`, y: random(-30, 30) }}
                transition={{
                  duration: random(10, 15),
                  repeat: Infinity,
                  delay: random(0, 5),
                  ease: "linear",
                }}
              >
                🕊️
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Text overlay */}
      <AnimatePresence>
        {scene === 3 && (
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.2 }}
            transition={{ duration: 1, delay: 1 }}
          >
            <motion.h1
              className="text-white text-5xl md:text-7xl font-bold tracking-wide"
              style={{
                fontFamily: "'Noto Sans Devanagari', sans-serif", // Ensure Devanagari font is linked or available
                textShadow: "0 0 20px rgba(255,215,0,0.8), 0 0 40px rgba(255,165,0,0.6)",
              }}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.5, duration: 1 }}
            >
              छठ पूजा की शुभकामनाएँ 🌞✨
            </motion.h1>
            <motion.p
              className="text-amber-200 text-2xl md:text-3xl mt-4"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 2, duration: 1 }}
            >
              Chhath Puja ki Shubhkamnayein
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ChhathPujaAnimation;