// src/pages/BlogPost.jsx
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
  const siteUrl = import.meta.env.VITE_SITE_URL || "https://edigital.globalinfosofts.com";

  useEffect(() => {
    let mounted = true;
    async function load() {
      setLoading(true);
      setError(null);
      try {
        // Make sure we're using the correct API endpoint
        const res = await api.get(`/blog/${id}`);
        if (!mounted) return;
        setPost(res.data);
      } catch (err) {
        console.error("Failed to load blog post", err);
        // More descriptive error message based on the error type
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
    return () => (mounted = false);
  }, [id]);

  function renderBlock(block, idx) {
    const key = `${idx}-${block.type}`;
    switch (block.type) {
      case "h2":
        return <h2 key={key} className="text-2xl font-semibold mt-6 mb-3">{block.data}</h2>;
      case "h3":
        return <h3 key={key} className="text-xl font-semibold mt-5 mb-2">{block.data}</h3>;
      case "text":
        return <p key={key} className="text-base leading-relaxed text-slate-700">{block.data}</p>;
      case "list":
        return (
          <ul key={key} className="list-disc pl-6 mt-3 mb-3 text-slate-700">
            {Array.isArray(block.data) ? block.data.map((it, i) => <li key={i}>{it}</li>) : null}
          </ul>
        );
      case "image":
        return (
          <div key={key} className="my-6">
            <img 
              src={block.data.replace('http://', 'https://')} 
              alt="" 
              className="w-full max-h-[480px] object-cover rounded-lg" 
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

  // Extract first paragraph for description
  const getDescription = () => {
    if (!post || !Array.isArray(post.content)) return "";
    const textBlock = post.content.find(block => block.type === "text");
    return textBlock ? textBlock.data.substring(0, 160) : "";
  };

  // Generate JSON-LD structured data
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

  if (loading) return <div className="p-8 text-center">Loading post…</div>;
  if (error) return (
    <div className="p-8 text-center">
      <div className="text-red-600 mb-4">{error}</div>
      <button onClick={() => navigate(-1)} className="underline text-sky-600">Go back</button>
    </div>
  );
  if (!post) return null;

  const canonicalUrl = `${siteUrl}/blog/${id}`;
  const description = getDescription();

  return (
    <>
      {post && (
        <Helmet>
          <title>{post.h1} | E-Digital India Blog</title>
          <meta name="description" content={description} />
          <link rel="canonical" href={canonicalUrl} />
          
          {/* Open Graph / Facebook */}
          <meta property="og:type" content="article" />
          <meta property="og:title" content={post.h1} />
          <meta property="og:description" content={description} />
          <meta property="og:url" content={canonicalUrl} />
          {post.feature_image && <meta property="og:image" content={post.feature_image} />}
          
          {/* Twitter */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={post.h1} />
          <meta name="twitter:description" content={description} />
          {post.feature_image && <meta name="twitter:image" content={post.feature_image} />}
          
          {/* JSON-LD structured data */}
          <script type="application/ld+json">
            {JSON.stringify(generateJsonLd())}
          </script>
        </Helmet>
      )}
      
      <article className="max-w-4xl mx-auto px-6 py-12">
        <Link to="/blog" className="text-sky-600 mb-4 inline-block">&larr; Back to all posts</Link>

        {post.feature_image && (
          <img src={post.feature_image} alt={post.h1} className="w-full h-72 object-cover rounded-xl mb-6" loading="lazy" />
        )}

        <header className="mb-6">
          <h1 className="text-3xl font-extrabold mb-2">{post.h1}</h1>
          <div className="text-sm text-slate-500">
            By <span className="font-medium text-slate-700">{post.author || "Author"}</span> •{" "}
            {new Date(post.created_at).toLocaleString("en-IN", { year: "numeric", month: "short", day: "numeric" })}
          </div>
        </header>

        <section className="prose prose-slate max-w-none">
          {Array.isArray(post.content) ? post.content.map(renderBlock) : <p>{post.content}</p>}
        </section>
      </article>
    </>
  );
}
