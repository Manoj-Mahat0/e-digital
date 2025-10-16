import React, { useEffect, useMemo, useRef, useState } from 'react';
// icons
import { HiAcademicCap, HiSearch } from 'react-icons/hi';
import { HiWrenchScrewdriver, HiOutlinePlus } from 'react-icons/hi2';

/* ---------------- Helpers (extended map) ---------------- */

function getIconUrl(title) {
  const map = {
    // Digital Marketing
    'SEMrush': 'semrush',
    'Facebook Ads': 'facebook',
    'Google Ads': 'googleads',
    'Google Analytics': 'googleanalytics',
    'Google Tag Manager': 'googletagmanager',
    'YouTube': 'youtube',
    'LinkedIn Ads': 'linkedin',
    'Mailchimp': 'mailchimp',
    'Canva': 'canva',

    // Web / PHP Development
    'WordPress': 'wordpress',
    'WooCommerce': 'woocommerce',
    'Git & GitHub': 'github',
    'Shopify': 'shopify',
    'Node.js': 'nodedotjs',
    'React': 'react',
    'Next.js': 'nextdotjs',
    'Vercel': 'vercel',
    'Docker': 'docker',

    // Data Science & AI
    'Python': 'python',
    'TensorFlow': 'tensorflow',
    'NumPy': 'numpy',
    'Pandas': 'pandas',
    'Jupyter': 'jupyter',
    'scikit-learn': 'scikitlearn',
    'PyTorch': 'pytorch',
    'Keras': 'keras',
    'SQL': 'mysql', // representative icon for SQL (use mysql icon as generic SQL)

    // Business & Soft Skills
    'PowerPoint': 'microsoftpowerpoint',
    'Excel': 'microsoftexcel',
    'Slack': 'slack',
    'Trello': 'trello',
    'Notion': 'notion',
    'Zoom': 'zoom',
    'Microsoft Teams': 'microsoftteams',
    'Gmail': 'gmail',
    'Communication': null, // Added for padding
    
    // Android App Development
    'Android Studio': 'androidstudio', // Corrected to use androidstudio slug
    'Firebase': 'firebase',
    'Kotlin': 'kotlin',
    'Java': 'java',
    'Android Jetpack': 'android', // fallback to android
    'Git & GitHub': 'github',
    'Docker': 'docker',
    'Unit Testing': null, // Added for padding

    // SAP (Increased to 7 tools)
    'SAP': 'sap',
    'SAP S/4HANA': null,
    'SAP Fiori': null,
    'HANA': null,
    'ERP': null,
    'SAP SuccessFactors': 'sap-successfactors', // Added (has icon)
    'SAP Ariba': null, // Added (no simple icon)
    // Extra tools for more than 7 visible cards
    'SAP MM (Materials Mgt)': null, 
    'SAP FI (Financial Acc)': null,
  };

  const slug = map[title];
  if (!slug) return null;
  // Use simpleicons CDN for brand icons
  return `https://cdn.simpleicons.org/${slug}`;
}

/* ---------------- Data ---------------- */

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
    { title: 'SEMrush', img: getIconUrl('SEMrush') },
    { title: 'Facebook Ads', img: getIconUrl('Facebook Ads') },
    { title: 'Google Ads', img: getIconUrl('Google Ads') },
    { title: 'Google Analytics', img: getIconUrl('Google Analytics') },
    { title: 'Google Tag Manager', img: getIconUrl('Google Tag Manager') },
    { title: 'YouTube', img: getIconUrl('YouTube') },
    { title: 'LinkedIn Ads', img: getIconUrl('LinkedIn Ads') },
    { title: 'Mailchimp', img: getIconUrl('Mailchimp') },
    { title: 'Canva', img: getIconUrl('Canva') },
  ],

  'Diploma in PHP Web Development': [
    { title: 'WordPress', img: getIconUrl('WordPress') },
    { title: 'WooCommerce', img: getIconUrl('WooCommerce') },
    { title: 'Git & GitHub', img: getIconUrl('Git & GitHub') },
    { title: 'Shopify', img: getIconUrl('Shopify') },
    { title: 'Node.js', img: getIconUrl('Node.js') },
    { title: 'React', img: getIconUrl('React') },
    { title: 'Next.js', img: getIconUrl('Next.js') },
    { title: 'Vercel', img: getIconUrl('Vercel') },
    { title: 'Docker', img: getIconUrl('Docker') },
  ],

  'Diploma in Data Science & AI': [
    { title: 'Python', img: getIconUrl('Python') },
    { title: 'TensorFlow', img: getIconUrl('TensorFlow') },
    { title: 'NumPy', img: getIconUrl('NumPy') },
    { title: 'Pandas', img: getIconUrl('Pandas') },
    { title: 'Jupyter', img: getIconUrl('Jupyter') },
    { title: 'scikit-learn', img: getIconUrl('scikit-learn') },
    { title: 'PyTorch', img: getIconUrl('PyTorch') },
    { title: 'Keras', img: getIconUrl('Keras') },
    { title: 'SQL', img: getIconUrl('SQL') },
  ],

  // Padding to ensure at least 7 total (7th is "More Tools")
  'Diploma in Business & Soft Skills': [
    { title: 'PowerPoint', img: getIconUrl('PowerPoint') },
    { title: 'Excel', img: getIconUrl('Excel') },
    { title: 'Slack', img: getIconUrl('Slack') },
    { title: 'Trello', img: getIconUrl('Trello') },
    { title: 'Notion', img: getIconUrl('Notion') },
    { title: 'Zoom', img: getIconUrl('Zoom') },
    { title: 'Microsoft Teams', img: getIconUrl('Microsoft Teams') },
    { title: 'Gmail', img: getIconUrl('Gmail') },
    { title: 'Communication', img: getIconUrl('Communication') },
  ],

  'Diploma in Android App Development': [
    { title: 'Android Studio', img: getIconUrl('Android Studio') },
    { title: 'Firebase', img: getIconUrl('Firebase') },
    { title: 'Kotlin', img: getIconUrl('Kotlin') },
    { title: 'Java', img: getIconUrl('Java') },
    { title: 'Android Jetpack', img: getIconUrl('Android Jetpack') },
    { title: 'Git & GitHub', img: getIconUrl('Git & GitHub') },
    { title: 'Docker', img: getIconUrl('Docker') },
    { title: 'Unit Testing', img: getIconUrl('Unit Testing') },
  ],

  // SAP: Increased to 7+ tools to trigger the "More Tools" card
  'SAP Global Certification Course': [
    { title: 'SAP', img: getIconUrl('SAP') },
    { title: 'SAP S/4HANA', img: getIconUrl('SAP S/4HANA') },
    { title: 'SAP Fiori', img: getIconUrl('SAP Fiori') },
    { title: 'HANA', img: getIconUrl('HANA') },
    { title: 'ERP', img: getIconUrl('ERP') },
    { title: 'SAP SuccessFactors', img: getIconUrl('SAP SuccessFactors') }, // New Tool
    { title: 'SAP Ariba', img: getIconUrl('SAP Ariba') }, // New Tool
    { title: 'SAP MM (Materials Mgt)', img: getIconUrl('SAP MM (Materials Mgt)') }, // Extra 8th tool
  ],
};

/* ---------------- Utilities (unchanged) ---------------- */

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

/* ---------------- Logo component (keeps your error-handling/retry) ---------------- */
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

/* ---------------- Keyboard nav hook (unchanged) ---------------- */

function useListKeyboardNavigation(list, selected, setSelected) {
  const index = list.indexOf(selected);
  useEffect(() => {
    function onKey(e) {
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

/* ---------------- Main component ---------------- */

const MIN_DISPLAY_CARDS = 8;
const VISIBLE_TOOLS_COUNT = MIN_DISPLAY_CARDS - 1; // 6 tools + 1 'More Tools' card

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
    
    // Auto-select first matching course on filter
    if (selected && !coursesList.find(c => c === selected)?.toLowerCase().includes(q)) {
      const newSelection = coursesList.find(c => c.toLowerCase().includes(q)) || coursesList[0];
      if (newSelection) setSelected(newSelection);
    }
    return coursesList.filter((c) => c.toLowerCase().includes(q));
  }, [query, selected]);

  const baseChannels = channelsByCourse[selected] || [];

  // Logic to handle "More Tools" card
  const displayChannels = useMemo(() => {
    const list = [...baseChannels];

    if (list.length > VISIBLE_TOOLS_COUNT) {
      const moreCount = list.length - VISIBLE_TOOLS_COUNT;
      
      // Slice the list to show only the first VISIBLE_TOOLS_COUNT (6)
      const visibleList = list.slice(0, VISIBLE_TOOLS_COUNT);
      
      // Add the "More Tools" card
      visibleList.push({
        isMoreCard: true,
        title: `+${moreCount} More Tool${moreCount > 1 ? 's' : ''}`,
      });
      
      return visibleList;
    }
    
    // If less than or equal to VISIBLE_TOOLS_COUNT, return the full list
    return list;
  }, [baseChannels]);
  
  // Total tools count for the header (original list size)
  const totalToolsCount = baseChannels.length;

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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

        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          <aside aria-label="Course Selection Menu" className="md:col-span-4 lg:col-span-3">
            <div className="sticky top-6 bg-white border border-gray-200 rounded-xl shadow-xl p-4">
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

              <div className="text-sm font-bold text-gray-700 uppercase mb-2 border-b pb-2 flex items-center">
                <HiAcademicCap className="h-5 w-5 mr-1 text-sky-500"/>
                Diploma Programs ({filtered.length})
              </div>

              <ul ref={listRef} className="space-y-1 max-h-[400px] overflow-y-auto" role="listbox" aria-activedescendant={selected ? CSS.escape(selected) : undefined}>
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
                              // Replace /NewJALogo.webp with a generic checkmark or a standard icon if the path is not guaranteed
                              <HiAcademicCap className="h-5 w-5"/> 
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

          <div className="md:col-span-8 lg:col-span-9">
            <div className="bg-white rounded-xl shadow-xl p-6 md:p-8 border border-gray-100">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 pb-4 border-b border-gray-100">
                <div>
                  <h3 className="text-3xl font-extrabold text-gray-900 mb-1">{selected}</h3>
                  <p className="text-md text-gray-600">
                    You will gain <strong>expert-level proficiency</strong> in the following tools:
                  </p>
                </div>
                <div className="mt-3 sm:mt-0 text-lg font-bold text-sky-700 bg-sky-100 px-5 py-2 rounded-full border-2 border-sky-200 shadow-md">
                  {totalToolsCount} Core Tool(s)
                </div>
              </div>

              {totalToolsCount === 0 ? (
                <div className="rounded-lg border-4 border-dashed border-sky-200 bg-sky-50 p-10 text-center text-gray-500">
                  <HiWrenchScrewdriver className="h-10 w-10 mx-auto text-sky-400 mb-3"/>
                  <p className="font-semibold text-xl text-gray-800">No core tools configured for this course yet.</p>
                  <p className="text-base mt-2">Check back soon or contact our admissions team for the latest curriculum details.</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                  {displayChannels.map((ch, i) => {
                    // Check if it's the "More Tools" card
                    if (ch.isMoreCard) {
                      return (
                        <article
                          key="more-tools"
                          className="group bg-sky-50 rounded-xl border-4 border-dashed border-sky-200 shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition duration-300 p-6 text-center flex flex-col items-center justify-center focus-within:ring-4 focus-within:ring-sky-200"
                          tabIndex={0}
                        >
                           <div className="w-full h-full flex flex-col items-center gap-3 justify-center">
                            <div className="bg-sky-200 p-4 rounded-full">
                                <HiOutlinePlus className="h-10 w-10 text-sky-600" />
                            </div>
                            <div className="mt-3 w-full">
                              <div className="text-lg font-bold text-sky-700 transition truncate">{ch.title}</div>
                              <p className="text-sm text-gray-500">View full curriculum for details.</p>
                            </div>
                           </div>
                        </article>
                      );
                    }
                    
                    // Regular tool card
                    return (
                      <article
                        key={i}
                        className="group bg-white rounded-xl border border-gray-100 shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition duration-300 p-6 text-center focus-within:ring-4 focus-within:ring-sky-200"
                        tabIndex={0}
                      >
                        <a
                          rel="noreferrer"
                          className="w-full h-full flex flex-col items-center gap-3"
                          title={`Learn ${ch.title}`}
                        >
                          <Logo src={ch.img} label={ch.title} size={80} />

                          <div className="mt-3 w-full">
                            <div className="text-lg font-bold text-gray-900 group-hover:text-sky-600 transition truncate">{ch.title}</div>
                          </div>

                        </a>
                      </article>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}