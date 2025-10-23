import React, { memo } from "react";
import PropTypes from "prop-types";

// Animated background bubble
const AnimatedBubble = ({ size, top, left, delay, duration, colorClass }) => (
  <div
    className={`absolute rounded-full shadow-2xl backdrop-blur-sm animate-bubble ${colorClass}`}
    style={{
      width: `${size}px`,
      height: `${size}px`,
      top: `${top}%`,
      left: `${left}%`,
      animationDelay: `${delay}s`,
      animationDuration: `${duration}s`,
    }}
  />
);

const CreativeProfileCard = memo(function CreativeProfileCard({
  name = "John Doe",
  handle = "@johndoe_dev",
  role = "Frontend Developer | Tech Enthusiast | Coffee Lover",
  avatar = "/placeholder-avatar.png",
  onBookmark = null,
  initiallyBookmarked = false,
}) {
  const [bookmarked, setBookmarked] = React.useState(Boolean(initiallyBookmarked));

  const toggleBookmark = (e) => {
    e?.stopPropagation();
    setBookmarked((v) => {
      const next = !v;
      if (typeof onBookmark === "function") onBookmark(next);
      return next;
    });
  };

  const animationStyles = `
    @keyframes move-bubble {
      0%, 100% {
        transform: translateY(0) rotate(0deg);
        opacity: 0.6;
      }
      25% {
        transform: translateY(-25px) rotate(45deg) scale(1.1);
        opacity: 0.8;
      }
      50% {
        transform: translateY(-45px) rotate(90deg) scale(0.9);
        opacity: 0.5;
      }
      75% {
        transform: translateY(-30px) rotate(135deg) scale(1.15);
        opacity: 0.7;
      }
    }
    .animate-bubble {
      animation: move-bubble infinite alternate cubic-bezier(0.65, 0, 0.35, 1);
    }
  `;

  return (
    <>
      <style>{animationStyles}</style>

      {/* --- Main Card --- */}
      <div
        className="relative w-full max-w-sm mx-auto overflow-hidden rounded-3xl 
        bg-gradient-to-br from-pink-500/30 via-purple-500/30 to-indigo-500/30 
        shadow-2xl backdrop-blur-xl transition-transform duration-500 hover:scale-[1.03]"
      >
        {/* --- Animated Bubbles --- */}
        <div className="absolute inset-0 z-0 opacity-70">
          <AnimatedBubble size={80} top={20} left={5} delay={0} duration={15} colorClass="bg-red-400/50" />
          <AnimatedBubble size={120} top={80} left={80} delay={5} duration={10} colorClass="bg-teal-400/50" />
          <AnimatedBubble size={60} top={50} left={50} delay={2} duration={18} colorClass="bg-yellow-400/50" />
          <AnimatedBubble size={150} top={10} left={90} delay={7} duration={12} colorClass="bg-purple-400/50" />
          <AnimatedBubble size={90} top={90} left={10} delay={4} duration={16} colorClass="bg-blue-400/50" />
        </div>

        {/* --- Profile Content --- */}
        <div className="relative z-10 p-8 text-center text-white bg-white/10 rounded-3xl border border-white/40 shadow-inner">
          
          {/* Bookmark Button */}
          <button
            onClick={onBookmark ? toggleBookmark : null}
            aria-pressed={bookmarked}
            aria-label={bookmarked ? "Remove from bookmarks" : "Add to bookmarks"}
            disabled={!onBookmark}
            className={`absolute top-4 right-4 p-2 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-400/70 backdrop-blur-sm 
              ${bookmarked ? "text-red-500 bg-white/50" : "text-white/70 hover:text-red-500 hover:bg-white/30"}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 fill-current" viewBox="0 0 24 24">
              <path d="M16 2h-8C6.9 2 6 2.9 6 4v16l6-3 6 3V4c0-1.1-.9-2-2-2z" />
            </svg>
          </button>

          {/* --- Profile Info --- */}
          <div className="flex flex-col items-center pt-2">
            {/* Avatar */}
            <div className="relative">
              <div className="rounded-full p-1 bg-gradient-to-tr from-yellow-400 via-pink-500 to-sky-500 inline-block ring-4 ring-white/90 shadow-lg">
                <img
                  src={avatar}
                  alt={`${name} avatar`}
                  loading="lazy"
                  className="h-28 w-28 rounded-full object-cover border-4 border-white shadow-xl"
                />
              </div>
              <span className="absolute -bottom-0.5 right-0.5 block h-4 w-4 rounded-full ring-2 ring-white/90 bg-lime-400 shadow-lg" />
            </div>

            {/* Name & Handle */}
            <h3 className="mt-4 text-3xl font-black text-white drop-shadow-lg">{name}</h3>
            <p className="text-lg text-white/90 font-semibold mt-1 drop-shadow">{handle}</p>
          </div>
        </div>
      </div>
    </>
  );
});

CreativeProfileCard.propTypes = {
  name: PropTypes.string,
  handle: PropTypes.string,
  role: PropTypes.string,
  avatar: PropTypes.string,
  onBookmark: PropTypes.func,
  initiallyBookmarked: PropTypes.bool,
};

export default CreativeProfileCard;
