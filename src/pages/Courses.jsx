import React from "react";
import CoursesShowcase from "../components/Courses/CoursesShowcase";
import { Helmet } from "react-helmet-async";

export default function Courses() {
  return (
    <>
      <Helmet>
        <title>Our Courses | E-Digital</title>
        <meta
          name="description"
          content="Explore our comprehensive range of digital courses designed to boost your career in web development, digital marketing, data science, and more."
        />
      </Helmet>
      
      <div className="pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
              Our Comprehensive Courses
            </h1>
            <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
              Discover programs designed to transform your career in the digital world
            </p>
          </div>
        </div>
        
        <CoursesShowcase />
      </div>
    </>
  );
}