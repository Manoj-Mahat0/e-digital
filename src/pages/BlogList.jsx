// src/pages/BlogList.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import { Helmet } from "react-helmet-async";

// Helper function to generate URL-friendly slugs from titles
function generateSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export default function BlogList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    async function load() {
      setLoading(true);
      setError(null);
      try {
        const res = await api.get("/blog/");
        if (!mounted) return;
        
        // Assuming the API returns posts in a desirable order (e.g., by date)
        setPosts(res.data || []);
      } catch (err) {
        console.error("Failed to load blog list", err);
        setError("Could not load blog posts. Try again later.");
      } finally {
        if (mounted) setLoading(false);
      }
    }
    load();
    return () => (mounted = false);
  }, []);

  function formatDate(iso) {
    try {
      return new Date(iso).toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch {
      return iso;
    }
  }

  // Determine the 3 most recent posts for the sidebar
  const recentPosts = posts.slice(0, 3);
  
  const siteUrl = import.meta.env.VITE_SITE_URL || window.location.origin;
  const canonicalUrl = `${siteUrl}/blog`;

  // --- Loading/Error/Empty State Renders ---
  if (loading) return <div className="p-8 text-center">Loading posts…</div>;
  if (error) return <div className="p-8 text-center text-red-600">{error}</div>;
  if (!posts.length)
    return <div className="p-8 text-center text-slate-600">No posts yet.</div>;
  // ----------------------------------------

  return (
    <main className="max-w-7xl mx-auto px-6 py-12">
      <Helmet>
        <title>E-Digital India Blog: Guide to learn in-demand courses</title>
        <meta name="description" content="Stay Update with the latest blog on digital marketing, web development, & other tech courses. Learn new skills and advance your career with E-Digital India!" />
        <link rel="canonical" href={canonicalUrl} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </Helmet>

      <h1 className="text-4xl font-extrabold mb-10 text-gray-900 border-b pb-4">Blogs</h1>

      {/* Main Grid Layout: Content on the left, Sidebar on the right */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        
        {/* Blog List Content (2/3 width on large screens) - This section remains unchanged */}
        <section className="lg:col-span-2">
          <div className="grid gap-10 sm:grid-cols-2">
            {posts.map((p) => {
              const slug = generateSlug(p.h1 || `post-${p.id}`);
              return (
                <article
                  key={p.id}
                  className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition duration-300 border border-slate-200"
                >
                  <Link to={`/${slug}`} className="block h-full flex flex-col">
                  {/* Feature Image */}
                  {p.feature_image ? (
                    <img
                      src={p.feature_image}
                      alt={p.h1 || `Post ${p.id}`}
                      className="w-full h-52 object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-52 bg-slate-100 flex items-center justify-center text-slate-400 text-lg">
                      No image
                    </div>
                  )}

                  {/* Post Content */}
                  <div className="p-5 flex-grow flex flex-col justify-between">
                    <div>
                      <h2 className="text-xl font-bold mb-3 text-gray-800 line-clamp-2">{p.h1}</h2>
                    </div>

                    <div className="flex items-center justify-between text-sm mt-4 pt-2 border-t border-slate-100">
                      <div>
                        <span className="font-semibold text-gray-700">{p.author || "Author"}</span>
                        <span className="ml-2 text-slate-400">•</span>
                        <span className="ml-2 text-slate-500">{formatDate(p.created_at)}</span>
                      </div>

                      <div className="text-sky-600 font-semibold hover:text-sky-700 transition">
                        Read more →
                      </div>
                    </div>
                  </div>
                </Link>
              </article>
              );
            })}
          </div>
        </section>

        {/* Sidebar Content (1/3 width on large screens) - UPDATED SECTION */}
        <aside className="lg:col-span-1">
          <div className="sticky top-12 bg-white p-6 rounded-xl shadow-lg border border-slate-200">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-3">Recent Posts</h2>
            
            {recentPosts.length === 0 ? (
                <p className="text-slate-500">No recent posts available.</p>
            ) : (
                <ul className="space-y-6">
                    {recentPosts.map((p) => {
                        const slug = generateSlug(p.h1 || `post-${p.id}`);
                        return (
                        <li key={`recent-${p.id}`} className="border-b last:border-b-0 pb-4 last:pb-0">
                            <Link 
                                to={`/${slug}`}
                                className="flex items-start space-x-3 hover:text-sky-600 transition duration-150 group"
                            >
                                {/* Recent Post Image (NEW) */}
                                <div className="flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border border-slate-100">
                                    {p.feature_image ? (
                                        <img
                                            src={p.feature_image}
                                            alt={p.h1 || `Post ${p.id}`}
                                            className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                                            loading="lazy"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-slate-100 flex items-center justify-center text-slate-400 text-xs">
                                            Img
                                        </div>
                                    )}
                                </div>
                                
                                {/* Recent Post Text */}
                                <div className="flex-grow">
                                    <h3 className="text-base font-semibold text-gray-800 group-hover:text-sky-600 line-clamp-2">
                                        {p.h1}
                                    </h3>
                                    <p className="text-sm text-slate-500 mt-1">
                                        {formatDate(p.created_at)}
                                    </p>
                                </div>
                            </Link>
                        </li>
                        );
                    })}
                </ul>
            )}
          </div>
        </aside>
      </div>
    </main>
  );
}