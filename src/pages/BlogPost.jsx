import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import api from "../services/api";

export default function BlogPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [recentPosts, setRecentPosts] = useState([]);
  const siteUrl = import.meta.env.VITE_SITE_URL || "https://edigital.globalinfosofts.com";

  useEffect(() => {
    let mounted = true;
    const controller = new AbortController();

    async function load() {
      setLoading(true);
      setError(null);

      try {
        // Fetch the post and the list of posts in parallel
        const [postRes, listRes] = await Promise.all([
          api.get(`/blog/${id}`, { signal: controller.signal }),
          api.get(`/blog/`, { signal: controller.signal }),
        ]);

        if (!mounted) return;

        setPost(postRes.data);

        const data = Array.isArray(listRes.data) ? listRes.data : [];
        const sorted = data
          .map((p) => ({ ...p }))
          .sort((a, b) => {
            const da = new Date(a.created_at || a.published_at || 0).getTime();
            const db = new Date(b.created_at || b.published_at || 0).getTime();
            return db - da;
          });

        // Exclude current post from recent list if present
        const filtered = sorted.filter((p) => {
          // compare by id or slug
          if (!postRes.data) return true;
          const curId = `${postRes.data.id ?? postRes.data.slug}`;
          const pId = `${p.id ?? p.slug}`;
          return pId !== curId;
        });

        setRecentPosts(filtered.slice(0, 3));
      } catch (err) {
        if (err.name === "CanceledError" || err.name === "AbortError") return;
        console.error("Failed to load blog post", err);
        if (err.code === 'ERR_NETWORK') {
          setError("Network error: Unable to connect to the server. Please check your internet connection and try again.");
        } else if (err.response && err.response.status === 404) {
          setError("Blog post not found.");
        } else {
          setError(`Unable to load this post. Error: ${err.message}`);
        }
      } finally {
        if (mounted) setLoading(false);
      }
    }

    load();

    return () => {
      mounted = false;
      controller.abort();
    };
  }, [id]);

  // Updated renderBlock to use better Tailwind classes for readability
  function renderBlock(block, idx) {
    const key = `${idx}-${block.type}`;
    switch (block.type) {
      case "h2":
        return <h2 key={key} className="text-3xl font-bold mt-8 mb-4 text-gray-900 border-b pb-2">{block.data}</h2>;
      case "h3":
        return <h3 key={key} className="text-2xl font-semibold mt-6 mb-3 text-gray-800">{block.data}</h3>;
      case "text":
        // Increased font size and leading for better readability
        return <p key={key} className="text-lg leading-loose text-slate-700 mb-5">{block.data}</p>;
      case "list":
        return (
          // Used list-outside for better alignment and space-y for list spacing
          <ul key={key} className="list-disc list-outside pl-6 mt-4 mb-4 text-lg text-slate-700 space-y-2">
            {Array.isArray(block.data) ? block.data.map((it, i) => <li key={i} className="pl-2">{it}</li>) : null}
          </ul>
        );
      case "image":
        return (
          // Adjusted styling for images
          <div key={key} className="my-8 rounded-xl overflow-hidden shadow-lg border border-slate-100">
            <img
              src={typeof block.data === 'string' ? block.data.replace('http://', 'https://') : ''}
              alt=""
              className="w-full max-h-[500px] object-cover"
              loading="lazy"
              onError={(e) => {
                console.log("Image failed to load:", e.target.src);
                e.target.onerror = null;
                e.target.src = "https://via.placeholder.com/800x400?text=Image+Not+Available";
              }}
            />
          </div>
        );
      default:
        return null;
    }
  }

  const getDescription = () => {
    if (!post) return "";
    if (Array.isArray(post.content)) {
      const textBlock = post.content.find(block => block.type === "text");
      return textBlock ? String(textBlock.data).substring(0, 160) : "";
    }
    return typeof post.content === 'string' ? post.content.substring(0, 160) : "";
  };

  const generateJsonLd = () => {
    if (!post) return {};

    return {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": post.h1,
      "image": post.feature_image ? [post.feature_image] : [],
      "datePublished": post.created_at,
      "dateModified": post.updated_at || post.created_at,
      "author": {
        "@type": "Person",
        "name": post.author || "E-Digital India"
      },
      "publisher": {
        "@type": "Organization",
        "name": "E-Digital India",
        "logo": {
          "@type": "ImageObject",
          "url": `${siteUrl}/logo.webp`
        }
      },
      "description": getDescription(),
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": `${siteUrl}/blog/${id}`
      }
    };
  };
  
  // Custom Date Formatting function
  const formatDate = (iso) => {
    try {
      return new Date(iso).toLocaleString("en-US", { 
        year: "numeric", 
        month: "long", // Use long month for better appearance
        day: "numeric" 
      });
    } catch {
      return iso;
    }
  }


  if (loading) return <div className="p-8 text-center text-xl font-medium text-sky-600">Loading post... 🚀</div>;
  if (error) return (
    <div className="p-8 text-center bg-red-50 rounded-lg max-w-lg mx-auto mt-12 shadow-lg">
      <div className="text-xl text-red-700 font-semibold mb-4">{error}</div>
      <button 
        onClick={() => navigate(-1)} 
        className="text-sky-600 hover:text-sky-700 font-medium transition duration-150"
      >
        &larr; Go back
      </button>
    </div>
  );
  if (!post) return null;

  const canonicalUrl = `${siteUrl}/blog/${id}`;
  const description = getDescription();

  return (
    <>
      {/* Helmet and SEO content remains largely the same, ensuring best practices */}
      {post && (
        <Helmet>
          <title>{post.h1} | E-Digital India Blog</title>
          <meta name="description" content={description} />
          <link rel="canonical" href={canonicalUrl} />

          <meta property="og:type" content="article" />
          <meta property="og:title" content={post.h1} />
          <meta property="og:description" content={description} />
          <meta property="og:url" content={canonicalUrl} />
          {post.feature_image && <meta property="og:image" content={post.feature_image} />}

          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={post.h1} />
          <meta name="twitter:description" content={description} />
          {post.feature_image && <meta name="twitter:image" content={post.feature_image} />}

          <script type="application/ld+json">
            {JSON.stringify(generateJsonLd())}
          </script>
        </Helmet>
      )}

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Article (2/3) - Improved readability and spacing */}
          <article className="lg:col-span-2">
            <Link 
              to="/blog" 
              className="text-sky-600 hover:text-sky-700 font-medium transition duration-150 mb-6 inline-block text-lg"
            >
              &larr; Back to all posts
            </Link>

            <header className="mb-8">
              <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 text-gray-900 leading-tight">
                {post.h1}
              </h1>
              
              <div className="flex items-center space-x-4 text-base text-slate-500 border-t pt-4 mt-4">
                <span className="font-medium text-slate-700">
                  By {post.author || "Author"}
                </span>
                <span className="text-slate-400">•</span>
                <time dateTime={post.created_at}>
                  {formatDate(post.created_at)}
                </time>
              </div>
            </header>

            {/* Feature Image below header */}
            {post.feature_image && (
              <div className="mb-10 rounded-2xl overflow-hidden shadow-xl">
                <img 
                  src={post.feature_image} 
                  alt={post.h1} 
                  className="w-full h-[300px] sm:h-[400px] object-cover" 
                  loading="lazy" 
                />
              </div>
            )}

            {/* Content Section - Uses custom renderBlock (updated) for styling */}
            <section className="article-content">
              {Array.isArray(post.content) 
                ? post.content.map(renderBlock) 
                : <p className="text-lg leading-loose text-slate-700">{post.content}</p>
              }
            </section>
          </article>

          {/* Sidebar (1/3) - Styling remains solid from previous step */}
          <aside className="lg:col-span-1">
            <div className="sticky top-12 bg-white p-6 rounded-xl shadow-lg border border-slate-200">
              <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-3">Recent Posts</h2>

              {recentPosts.length === 0 ? (
                <p className="text-slate-500">No recent posts available.</p>
              ) : (
                <ul className="space-y-6">
                  {recentPosts.map((p) => (
                    <li key={`recent-${p.id ?? p.slug}`} className="border-b last:border-b-0 pb-4 last:pb-0">
                      <Link 
                        to={p.slug ? `/blog/${p.slug}` : `/blog/${p.id}`} 
                        className="flex items-start space-x-3 hover:text-sky-600 transition duration-150 group"
                      >
                        <div className="flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border border-slate-100">
                          {p.feature_image ? (
                            <img src={p.feature_image} alt={p.h1 || `Post ${p.id}`} className="w-full h-full object-cover group-hover:scale-105 transition duration-300" loading="lazy" />
                          ) : (
                            <div className="w-full h-full bg-slate-100 flex items-center justify-center text-slate-400 text-xs">Img</div>
                          )}
                        </div>

                        <div className="flex-grow">
                          <h3 className="text-base font-semibold text-gray-800 group-hover:text-sky-600 line-clamp-2">{p.h1}</h3>
                          <p className="text-sm text-slate-500 mt-1">{formatDate(p.created_at)}</p>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}