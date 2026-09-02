import './highlight.css';
import '@/app/globals.css';
import Navbar from '@/components/Navbar';

export const metadata = {
  title: 'Blog — Technical Writing on ComfyUI & LLMs',
  description:
    'Technical articles on ComfyUI node workflows, AI image synthesis, LLM prompt engineering, and local model deployment.',
  alternates: { canonical: '/blog' },
};

export default function BlogLayout({ children }) {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24">{children}</main>
      <footer className="border-t border-rule px-6 py-10 text-center text-xs text-sand/60">
        © {new Date().getFullYear()} Tuan Nguyen.
      </footer>
    </>
  );
}