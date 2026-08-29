import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Projects from '@/components/Sections/Projects';
import Experience from '@/components/Sections/Experience';
import Skills from '@/components/Sections/Skills';
import About from '@/components/Sections/About';
import Contact from '@/components/Sections/Contact';
import Testimonials from '@/components/Sections/Testimonials';
import BlogSection from '@/components/BlogSection';
import { getRecentPosts } from '@/lib/posts';

// Thin low-contrast horizontal divider between sections (editorial style).
function Divider() {
  return (
    <div aria-hidden className="mx-auto max-w-7xl px-6">
      <hr className="border-t border-rule" />
    </div>
  );
}

export default function Home() {
  const recentPosts = getRecentPosts(3);

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Divider />
        <Projects />
        <Divider />
        <Experience />
        <Divider />
        <Skills />
        <Divider />
        <Testimonials />
        <Divider />
        <BlogSection posts={recentPosts} />
        <Divider />
        <About />
        <Divider />
        <Contact />
      </main>
      <footer className="border-t border-rule px-6 py-10 text-center text-xs text-sand/50">
        © {new Date().getFullYear()} Tuan Nguyen.
      </footer>
    </>
  );
}