import React, { useEffect, useState, useCallback } from "react";

// Clean, simple Chhath Puja greeting — no animation, no audio.
// Shows only from 23 Oct 2025 to 27 Oct 2025.
// Left (or top on small screens): video
// Right (or bottom on small screens): message and "Don't show again" option.

const START_DATE = new Date(2025, 9, 23, 0, 0, 0);
const END_DATE = new Date(2025, 9, 27, 23, 59, 59);
const LOCAL_STORAGE_KEY = "hideFestivalCard";

function isWithinFestivalRange(now = new Date()) {
  return now >= START_DATE && now <= END_DATE;
}

export default function FestivalGreetingsCardSimple({
  videoSrc = "/puja.mp4", // replace with your video path
}) {
  const [visible, setVisible] = useState(false);
  const [dontShowAgain, setDontShowAgain] = useState(false);

  useEffect(() => {
    // 1. Check local storage for permanent dismissal
    let storedShouldHide = false;
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (stored === "true") {
        setDontShowAgain(true);
        storedShouldHide = true;
      }
    } catch (e) {
      console.warn("localStorage unavailable:", e);
    }

    // 2. Check date range
    const now = new Date();
    if (isWithinFestivalRange(now) && !storedShouldHide) {
      setVisible(true);
    }
  }, []);

  const handleClose = useCallback(() => setVisible(false), []);

  // Function to permanently hide the card and save preference
  const handleHidePermanently = useCallback(() => {
    setDontShowAgain(true);
    setVisible(false);
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, "true");
    } catch (err) {
      console.warn("Could not write to localStorage", err);
    }
  }, []);

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={handleClose}
      aria-modal="true"
      role="dialog"
      aria-label="Chhath Puja greeting"
    >
      {/* Modal Content - clicks inside should not close */}
      <div
        className="relative w-full max-w-3xl mx-auto rounded-2xl shadow-2xl overflow-hidden bg-white flex flex-col md:flex-row"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 p-2 text-gray-800 hover:text-gray-600 z-10 bg-white/80 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-300"
          aria-label="Close greeting"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Left / Top: Video */}
        <div className="w-full md:w-1/2 h-56 md:h-auto bg-amber-50 flex items-center justify-center p-3">
          <div className="w-full h-full rounded-lg overflow-hidden border border-amber-200 shadow-inner">
            <video
              src={videoSrc}
              className="w-full h-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              aria-label="Chhath Puja video"
            />
          </div>
        </div>

        {/* Right / Bottom: Message */}
        <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-between">
          <div>
            

            <p className="text-gray-900 text-lg md:text-xl font-semibold mb-3">
              May the blessings of Chhathi Maiya and the Sun God fill your life with prosperity and well-being.
            </p>

            <p className="text-gray-600 text-sm md:text-base leading-relaxed border-l-4 border-amber-300 pl-4 py-2 italic">
              Wishing you and your family a bright and joyous Chhath festival, marked by devotion, peace, and positive energy.
            </p>
          </div>

          {/* Footer: Don't show again (prominent on mobile) */}
          <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <input
                id="dontShowCheckbox"
                type="checkbox"
                checked={dontShowAgain}
                onChange={handleHidePermanently}
                className="w-4 h-4 rounded focus:ring-2 focus:ring-amber-300"
              />
              <label htmlFor="dontShowCheckbox" className="text-sm text-gray-700">
                Don't show me again
              </label>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleClose}
                className="px-3 py-2 rounded-lg bg-gray-100 text-gray-800 text-sm hover:bg-gray-200 transition"
                aria-label="Dismiss greeting"
              >
                Dismiss
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
