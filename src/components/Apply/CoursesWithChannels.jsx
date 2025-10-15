import React, { useEffect, useMemo, useRef, useState } from 'react';

/**
 * CoursesWithChannels — improved UI/UX
 * - Single-file React component (Tailwind classes)
 * - Search + keyboard navigation for the left course list
 * - Accessible focus management and improved ARIA labeling
 * - Better card layout with subtle hover/focus states
 * - Robust logo loader with retry and inline SVG placeholder
 * - Lightweight skeleton while logos are loading
 * - Small utility hooks inside the file to keep it self-contained
 */

const coursesList = [
  'Diploma in Digital Marketing',
  'Diploma in PHP Web Development',
  'Diploma in Data Science & AI',
  'Diploma in Business & Soft Skills',
  'Diploma in Android App Development',
  'SAP Global Certification Course',
];

const channelsByCourse = {
  'Diploma in Digital Marketing': [
    { title: 'SEMrush', img: 'https://logo.clearbit.com/semrush.com?size=240' },
    { title: 'Facebook Ads', img: 'https://logo.clearbit.com/facebook.com?size=240' },
    { title: 'Google Ads', img: 'https://logo.clearbit.com/google.com?size=240' },
    { title: 'Google Analytics', img: 'https://logo.clearbit.com/google.com?size=240' },
  ],
  'Diploma in PHP Web Development': [
    { title: 'WordPress', img: 'https://logo.clearbit.com/wordpress.com?size=240' },
    { title: 'WooCommerce', img: 'https://logo.clearbit.com/woocommerce.com?size=240' },
    { title: 'Git & GitHub', img: 'https://logo.clearbit.com/github.com?size=240' },
  ],
  'Diploma in Data Science & AI': [
    { title: 'Python', img: 'https://logo.clearbit.com/python.org?size=240' },
    { title: 'TensorFlow', img: 'https://logo.clearbit.com/tensorflow.org?size=240' },
    { title: 'Pandas / NumPy', img: 'https://logo.clearbit.com/numpy.org?size=240' },
  ],
  'Diploma in Business & Soft Skills': [
    { title: 'PowerPoint', img: 'https://logo.clearbit.com/microsoft.com?size=240' },
    { title: 'Excel', img: 'https://logo.clearbit.com/microsoft.com?size=240' },
    { title: 'Slack', img: 'https://logo.clearbit.com/slack.com?size=240' },
  ],
  'Diploma in Android App Development': [
    { title: 'Android Studio', img: 'https://logo.clearbit.com/android.com?size=240' },
    { title: 'Firebase', img: 'https://logo.clearbit.com/firebase.google.com?size=240' },
  ],
  'SAP Global Certification Course': [
    { title: 'SAP', img: 'https://logo.clearbit.com/sap.com?size=240' },
    { title: 'ERP', img: 'https://logo.clearbit.com/sap.com?size=240' },
  ],
};

/* ----------------- Utilities ----------------- */

function colorFromString(s) {
  let hash = 0;
  for (let i = 0; i < s.length; i++) hash = s.charCodeAt(i) + ((hash << 5) - hash);
  const hue = Math.abs(hash) % 360;
  return `hsl(${hue} 65% 55%)`;
}

function initialsFromLabel(label) {
  if (!label) return '??';
  const parts = label.split(/\s+/).filter(Boolean);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + (parts[1][0] || '')).toUpperCase();
}

function makePlaceholderDataUrl(label, size = 96) {
  const svg = `
    <svg xmlns='http://www.w3.org/2000/svg' width='${size}' height='${size}' viewBox='0 0 ${size} ${size}'>
      <rect width='100%' height='100%' rx='14' fill='${colorFromString(label)}'/>
      <text x='50%' y='52%' font-family='Inter, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial' font-size='${Math.floor(
        size * 0.45
      )}' font-weight='700' fill='#fff' text-anchor='middle' dominant-baseline='middle'>${initialsFromLabel(label)}</text>
    </svg>
  `.trim();
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

/* ----------------- Logo component ----------------- */
function Logo({ src, label, size = 96, className = '' }) {
  const [state, setState] = useState({ status: 'loading', srcUsed: src });
  const retryRef = useRef(0);

  useEffect(() => {
    let mounted = true;
    if (!src) {
      setState({ status: 'error', srcUsed: makePlaceholderDataUrl(label, size) });
      return;
    }

    const img = new Image();
    img.onload = () => mounted && setState({ status: 'ok', srcUsed: src });
    img.onerror = () => {
      // try once more with cache-busting, then fallback
      if (retryRef.current === 0) {
        retryRef.current += 1;
        const busted = src + (src.includes('?') ? `&cb=${Date.now()}` : `?cb=${Date.now()}`);
        const retryImg = new Image();
        retryImg.onload = () => mounted && setState({ status: 'ok', srcUsed: busted });
        retryImg.onerror = () => mounted && setState({ status: 'error', srcUsed: makePlaceholderDataUrl(label, size) });
        retryImg.src = busted;
      } else {
        mounted && setState({ status: 'error', srcUsed: makePlaceholderDataUrl(label, size) });
      }
    };
    img.src = src;

    return () => (mounted = false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [src, label]);

  // skeleton while loading
  if (state.status === 'loading') {
    return (
      <div
        className={`rounded-md overflow-hidden w-[${size}px] h-[${size}px] flex items-center justify-center ${className}`}
        style={{ width: size, height: size }}
        aria-hidden
      >
        <div className="animate-pulse rounded-md w-full h-full bg-gray-100" />
      </div>
    );
  }

  return (
    <img
      src={state.srcUsed}
      alt={label}
      width={size}
      height={size}
      loading="lazy"
      className={`rounded-md object-contain border border-gray-100 shadow-sm ${className}`}
      style={{ width: size, height: size }}
    />
  );
}

/* ----------------- Keyboard nav hook (left list) ----------------- */
function useListKeyboardNavigation(list, selected, setSelected) {
  const index = list.indexOf(selected);
  useEffect(() => {
    function onKey(e) {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        const next = list[(index + 1) % list.length];
        setSelected(next);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        const prev = list[(index - 1 + list.length) % list.length];
        setSelected(prev);
      }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [index, list, setSelected]);
}

/* ----------------- Main component ----------------- */
export default function CoursesWithChannels({ initial = coursesList[0] }) {
  const [selected, setSelected] = useState(initial);
  const [query, setQuery] = useState('');
  const listRef = useRef(null);

  useListKeyboardNavigation(coursesList, selected, setSelected);

  // focus selected button when it changes (good for screen readers)
  useEffect(() => {
    const root = listRef.current;
    if (!root) return;
    const el = root.querySelector('[data-course="' + CSS.escape(selected) + '"]');
    if (el) el.focus();
  }, [selected]);

  const filtered = useMemo(() => {
    if (!query) return coursesList;
    const q = query.trim().toLowerCase();
    return coursesList.filter((c) => c.toLowerCase().includes(q));
  }, [query]);

  const channels = channelsByCourse[selected] || [];

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center sm:justify-between mb-6">
          <div>
            <p className="text-sm font-semibold text-sky-600 uppercase tracking-wide">Courses</p>
            <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold text-gray-900">Pick a course to see channels & tools</h2>
            <p className="mt-1 text-sm text-gray-500">Explore the practical tools you'll learn in each course.</p>
          </div>

          
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Left: Courses list */}
          <aside aria-label="Courses" className="md:col-span-1">
            <div className="bg-white border border-gray-100 rounded-lg p-3">
              <div className="text-xs text-gray-500 mb-2">Course list</div>
              <ul ref={listRef} className="space-y-2" role="listbox" aria-activedescendant={CSS.escape(selected)}>
                {filtered.length === 0 ? (
                  <li className="text-sm text-gray-500">No courses found.</li>
                ) : (
                  filtered.map((c) => {
                    const active = c === selected;
                    return (
                      <li key={c}>
                        <button
                          data-course={c}
                          onClick={() => setSelected(c)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              e.preventDefault();
                              setSelected(c);
                            }
                          }}
                          className={`w-full text-left px-3 py-2 rounded-md text-sm flex items-center justify-between transition-shadow focus:outline-none focus:ring-2 focus:ring-sky-300 ${
                            active
                              ? 'bg-sky-600 text-white shadow'
                              : 'bg-white text-gray-800 hover:bg-sky-50 border border-gray-50'
                          }`}
                          aria-checked={active}
                          role="option"
                        >
                          <span className="truncate">{c}</span>
                          <span className="ml-3 inline-flex items-center text-xs">
                            {active ? (
                              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden>
                                <path d="M5 12l4 4L19 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            ) : null}
                          </span>
                        </button>
                      </li>
                    );
                  })
                )}
              </ul>
            </div>

            <div className="mt-3 text-xs text-gray-500">Showing {filtered.length} of {coursesList.length}</div>
          </aside>

          {/* Right: Channels grid */}
          <div className="md:col-span-3">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">{selected}</h3>
                <p className="text-sm text-gray-500">Tools & channels included in this course</p>
              </div>

              <div className="text-sm text-gray-500">{channels.length} items</div>
            </div>

            {channels.length === 0 ? (
              <div className="rounded-lg border border-dashed border-gray-200 p-6 text-center text-gray-500">No channels configured for this course.</div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {channels.map((ch, i) => (
                  <article
                    key={i}
                    className="group bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transform hover:-translate-y-0.5 transition p-4 flex flex-col items-center text-center"
                  >
                    <a
                      href={ch.href || '#'}
                      target={ch.href ? '_blank' : undefined}
                      rel="noreferrer"
                      className="w-full h-full flex flex-col items-center gap-3"
                      title={ch.title}
                    >
                      <Logo src={ch.img} label={ch.title} size={88} />

                      <div className="mt-1">
                        <div className="text-sm font-medium text-gray-800">{ch.title}</div>
                        <div className="text-xs text-gray-500 mt-1">{ch.subtitle || 'Core tool'}</div>
                      </div>

                      <div className="mt-3 flex gap-2 items-center">
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-gray-100 border border-gray-50">Beginner</span>
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-gray-100 border border-gray-50">Hands-on</span>
                      </div>
                    </a>
                  </article>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
