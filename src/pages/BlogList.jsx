// src/pages/BlogList.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

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
      return new Date(iso).toLocaleString("en-IN", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch {
      return iso;
    }
  }

  if (loading) return <div className="p-8 text-center">Loading posts…</div>;
  if (error) return <div className="p-8 text-center text-red-600">{error}</div>;
  if (!posts.length)
    return <div className="p-8 text-center text-slate-600">No posts yet.</div>;

  return (
    <main className="max-w-6xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-extrabold mb-6">All articles</h1>

      <div className="grid gap-8 md:grid-cols-2">
        {posts.map((p) => (
          <article
            key={p.id}
            className="bg-white rounded-2xl overflow-hidden shadow-md border border-slate-100"
          >
            <Link to={`/blog/${p.id}`} className="block">
              {p.feature_image ? (
                <img
                  src={p.feature_image}
                  alt={p.h1 || `Post ${p.id}`}
                  className="w-full h-48 object-cover"
                  loading="lazy"
                />
              ) : (
                <div className="w-full h-48 bg-slate-100 flex items-center justify-center text-slate-400">
                  No image
                </div>
              )}

              <div className="p-4">
                <h2 className="text-lg font-semibold mb-2">{p.h1}</h2>

                <div className="flex items-center justify-between text-sm text-slate-500">
                  <div>
                    <span className="font-medium text-slate-700">{p.author || "Author"}</span>
                    <span className="ml-2">•</span>
                    <span className="ml-2">{formatDate(p.created_at)}</span>
                  </div>

                  <div className="text-sky-600 font-medium">Read →</div>
                </div>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </main>
  );
}
