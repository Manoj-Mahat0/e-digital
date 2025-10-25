import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import BlogPost from "./BlogPost";
import CourseDetail from "./CourseDetail";
import { Helmet } from "react-helmet-async";

// Helper function to generate URL-friendly slugs from titles
function generateSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export default function ContentPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [contentType, setContentType] = useState(null);
  const [contentData, setContentData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    
    async function determineContentType() {
      try {
        setLoading(true);
        
        // First check if it's a course
        const coursesRes = await fetch("/data/courses.json", { cache: "no-cache" });
        if (coursesRes.ok) {
          const coursesData = await coursesRes.json();
          const courseMatch = coursesData.find(course => course.slug === slug);
          if (courseMatch && isMounted) {
            setContentType('course');
            setContentData(courseMatch);
            setLoading(false);
            return;
          }
        }
        
        // Then check if it's a blog post
        const blogRes = await fetch(`https://be.edigital.globalinfosofts.com/blog/`);
        if (blogRes.ok) {
          const blogData = await blogRes.json();
          const allPosts = Array.isArray(blogData) ? blogData : [];
          const postMatch = allPosts.find(post => generateSlug(post.h1 || `post-${post.id}`) === slug);
          if (postMatch && isMounted) {
            setContentType('blog');
            setContentData(postMatch);
            setLoading(false);
            return;
          }
        }
        
        // If neither, redirect to the custom 404 page
        if (isMounted) {
          setContentType('notfound');
          setLoading(false);
        }
      } catch (error) {
        console.error("Error determining content type:", error);
        if (isMounted) {
          setContentType('notfound');
          setLoading(false);
        }
      }
    }
    
    determineContentType();
    
    return () => {
      isMounted = false;
    };
  }, [slug]);

  // If content is not found, redirect to the custom 404 page
  useEffect(() => {
    if (contentType === 'notfound' && !loading) {
      navigate('/404-errors-google-analytics', { replace: true });
    }
  }, [contentType, loading, navigate]);

  if (loading) {
    return (
      <div className="p-8 text-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-sky-500"></div>
        <p className="mt-2 text-slate-600">Loading content...</p>
      </div>
    );
  }

  // For courses, render the CourseDetail component
  if (contentType === 'course') {
    return <CourseDetail />;
  }

  // For blog posts, render the BlogPost component
  if (contentType === 'blog') {
    return <BlogPost />;
  }

  // This shouldn't be reached due to the redirect above, but just in case
  return null;
}