import React, { useEffect, useMemo, useRef, useState } from 'react';
// Changed to 'react-icons/hi' for maximum compatibility and stability.
// HiMagnifyingGlass is changed to HiSearch.
import { HiAcademicCap, HiSearch } from 'react-icons/hi';
import { HiWrenchScrewdriver, HiCheckCircle } from 'react-icons/hi2'; // Using HiWrenchScrewdriver and HiCheckCircle from hi2

/**
 * CoursesWithChannels — FINAL UI/UX VERSION
 * - Fixed icon import issues.
 * - Enhanced visuals: smoother shadows, better color contrast, and refined layout.
 * - Retained all accessibility and performance features (Logo loader, keyboard nav).
 */

// --- Data (Unchanged) ---
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

/* ----------------- Utilities (Mostly Unchanged) ----------------- */

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
    return (parts[0][0] + (parts[1]?.[0] || '')).toUpperCase();
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

        setState({ status: 'loading', srcUsed: src }); 
        retryRef.current = 0;

        const img = new Image();
        img.onload = () => mounted && setState({ status: 'ok', srcUsed: src });
        img.onerror = () => {
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

    // Skeleton while loading
    if (state.status === 'loading') {
        return (
            <div
                className={`rounded-xl overflow-hidden ${className} flex items-center justify-center`}
                style={{ width: size, height: size }}
                aria-hidden
            >
                <div className="animate-pulse rounded-xl w-full h-full bg-sky-100/50" />
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
            className={`rounded-xl object-contain border-2 border-gray-100 shadow-lg transition-shadow group-hover:shadow-sky-300/50 ${className}`} 
            style={{ width: size, height: size }}
        />
    );
}

/* ----------------- Keyboard nav hook ----------------- */
function useListKeyboardNavigation(list, selected, setSelected) {
    const index = list.indexOf(selected);
    useEffect(() => {
        function onKey(e) {
            // Check if focus is on the search box, if so, disable arrow keys for navigation
            if (e.target.type === 'search') return;
            
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

    useEffect(() => {
        if (!coursesList.includes(initial)) {
            setSelected(coursesList[0]);
        }
    }, [initial]);

    useListKeyboardNavigation(coursesList, selected, setSelected);

    // Focus selected button when it changes
    useEffect(() => {
        const root = listRef.current;
        if (!root) return;
        const safeId = CSS.escape(selected).replace(/\\/g, '\\\\');
        const el = root.querySelector(`[data-course="${safeId}"]`);
        if (el) el.focus();
    }, [selected]);

    const filtered = useMemo(() => {
        if (!query) return coursesList;
        const q = query.trim().toLowerCase();
        // Reset selection if the current course is filtered out
        if (selected && !coursesList.find(c => c === selected)?.toLowerCase().includes(q)) {
             // Find the first course that matches the new query, or the first in the full list
            const newSelection = coursesList.find(c => c.toLowerCase().includes(q)) || coursesList[0];
            if (newSelection) setSelected(newSelection);
        }

        return coursesList.filter((c) => c.toLowerCase().includes(q));
    }, [query, selected]);

    const channels = channelsByCourse[selected] || [];

    return (
        // Enhanced section styling with a soft background
        <section className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* --- Section Header --- */}
                <div className="text-center mb-16">
                    <p className="text-md font-semibold text-sky-600 uppercase tracking-widest flex items-center justify-center">
                        <HiWrenchScrewdriver className="h-5 w-5 mr-2 text-sky-500" />
                        Practical Training Guarantee
                    </p>
                    <h2 className="mt-3 text-4xl sm:text-5xl font-extrabold text-gray-900">
                        Tools, Platforms & Channels You Will Master
                    </h2>
                    <p className="mt-4 text-lg text-gray-600 max-w-4xl mx-auto">
                        Select a diploma program to view the core industry tools and platforms included in your hands-on curriculum.
                    </p>
                </div>

                {/* --- Main Content Grid --- */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
                    
                    {/* Left: Course List & Search */}
                    <aside aria-label="Course Selection Menu" className="md:col-span-4 lg:col-span-3">
                        <div className="sticky top-6 bg-white border border-gray-200 rounded-xl shadow-xl p-4">
                            
                            {/* Search Input (HiSearch is used here) */}
                            <div className="relative mb-4">
                                <HiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                <input
                                    type="search"
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    placeholder="Search courses..."
                                    className="w-full pl-10 pr-4 py-2.5 text-base border border-gray-300 rounded-lg focus:ring-sky-500 focus:border-sky-500 transition"
                                />
                            </div>

                            {/* List Header */}
                            <div className="text-sm font-bold text-gray-700 uppercase mb-2 border-b pb-2 flex items-center">
                                <HiAcademicCap className="h-5 w-5 mr-1 text-sky-500"/>
                                Diploma Programs ({filtered.length})
                            </div>

                            {/* Course List */}
                            <ul ref={listRef} className="space-y-1 max-h-[400px] overflow-y-auto" role="listbox" aria-activedescendant={CSS.escape(selected)}>
                                {filtered.length === 0 ? (
                                    <li className="text-sm text-gray-500 p-2">No courses found matching "{query}".</li>
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
                                                    className={`w-full text-left px-3 py-2 rounded-lg text-base font-medium transition-colors duration-200 focus:outline-none focus:ring-4 focus:ring-sky-200 ${
                                                        active
                                                            ? 'bg-sky-600 text-white shadow-lg shadow-sky-300/50'
                                                            : 'bg-white text-gray-800 hover:bg-sky-50 border border-transparent'
                                                    }`}
                                                    aria-checked={active}
                                                    role="option"
                                                >
                                                    <span className="truncate">{c}</span>
                                                    <span className="ml-3 inline-flex items-center text-xs">
                                                        {active ? (
                                                            // HiCheckCircle from hi2 (cleaner checkmark)
                                                            <HiCheckCircle className="h-5 w-5 text-white" aria-hidden="true" />
                                                        ) : null}
                                                    </span>
                                                </button>
                                            </li>
                                        );
                                    })
                                )}
                            </ul>
                        </div>
                    </aside>

                    {/* Right: Channels grid */}
                    <div className="md:col-span-8 lg:col-span-9">
                        <div className="bg-white rounded-xl shadow-xl p-6 md:p-8 border border-gray-100">
                            
                            {/* Selected Course Header */}
                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 pb-4 border-b border-gray-100">
                                <div>
                                    <h3 className="text-3xl font-extrabold text-gray-900 mb-1">{selected}</h3>
                                    <p className="text-md text-gray-600">
                                        You will gain **expert-level proficiency** in the following tools:
                                    </p>
                                </div>
                                <div className="mt-3 sm:mt-0 text-lg font-bold text-sky-700 bg-sky-100 px-5 py-2 rounded-full border-2 border-sky-200 shadow-md">
                                    {channels.length} Core Tool(s)
                                </div>
                            </div>

                            {/* Tools Grid */}
                            {channels.length === 0 ? (
                                <div className="rounded-lg border-4 border-dashed border-sky-200 bg-sky-50 p-10 text-center text-gray-500">
                                    <HiWrenchScrewdriver className="h-10 w-10 mx-auto text-sky-400 mb-3"/>
                                    <p className="font-semibold text-xl text-gray-800">No core tools configured for this course yet.</p>
                                    <p className="text-base mt-2">Check back soon or contact our admissions team for the latest curriculum details.</p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                                    {channels.map((ch, i) => (
                                        <article
                                            key={i}
                                            className="group bg-white rounded-xl border border-gray-100 shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition duration-300 p-6 text-center focus-within:ring-4 focus-within:ring-sky-200"
                                            tabIndex={0} 
                                        >
                                            <a
                                                href={ch.href || '#'}
                                                target={ch.href ? '_blank' : undefined}
                                                rel="noreferrer"
                                                className="w-full h-full flex flex-col items-center gap-3"
                                                title={`Learn ${ch.title}`}
                                            >
                                                <Logo src={ch.img} label={ch.title} size={80} />

                                                <div className="mt-3 w-full">
                                                    <div className="text-lg font-bold text-gray-900 group-hover:text-sky-600 transition truncate">{ch.title}</div>
                                                    <div className="text-sm text-gray-500 mt-1">{ch.subtitle || 'Core Industry Tool'}</div>
                                                </div>

                                                {/* Skill Tags */}
                                                <div className="mt-4 flex flex-wrap justify-center gap-2">
                                                    <span className="inline-flex items-center px-3 py-1 text-xs font-medium rounded-full text-sky-700 bg-sky-100 ring-1 ring-sky-200">
                                                        Hands-on
                                                    </span>
                                                    <span className="inline-flex items-center px-3 py-1 text-xs font-medium rounded-full text-emerald-700 bg-emerald-100 ring-1 ring-emerald-200">
                                                        Certified
                                                    </span>
                                                </div>
                                            </a>
                                        </article>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}