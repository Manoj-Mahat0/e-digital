import fs from "fs";

export async function getRoutes() {
  const routes = ['/', '/about', '/contact-us', '/apply'];

  try {
    // Read courses from local JSON
    const coursesPath = './public/data/courses.json';
    if (fs.existsSync(coursesPath)) {
      const coursesRaw = fs.readFileSync(coursesPath, 'utf8');
      const courses = JSON.parse(coursesRaw);
      courses.forEach(course => {
        if (course.slug) {
          routes.push(`/courses/${course.slug}`);
        }
      });
    }
  } catch (error) {
    console.error('Error reading courses:', error);
  }

  try {
    // Read blog from local JSON if exists
    const blogPath = './public/data/blog.json';
    if (fs.existsSync(blogPath)) {
      const blogRaw = fs.readFileSync(blogPath, 'utf8');
      const blog = JSON.parse(blogRaw);
      blog.forEach(post => {
        if (post.slug) {
          routes.push(`/blog/${post.slug}`);
        }
      });
    }
  } catch (error) {
    console.warn('Blog data not found, skipping blog routes');
  }

  return routes;
}
