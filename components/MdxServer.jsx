import { MDXRemote } from 'next-mdx-remote/rsc';
import rehypeHighlight from 'rehype-highlight';
import rehypeSlug from 'rehype-slug';
import { Alert, Code } from '@/components/BlogMdx.jsx';

/**
 * MdxServer
 * Renders MDX source on the server (RSC) with syntax highlighting and
 * heading slugs for the TOC. No client JS — the output is static HTML.
 *
 * rehype-highlight emits <span class="hljs-..."> tokens; the colors live in
 * app/blog/highlight.css, imported by the post layout. This keeps highlight
 * as pure CSS (no JS runtime) which is the Lighthouse-friendly choice.
 */
export default function MdxServer({ source }) {
  return (
    <MDXRemote
      source={source}
      components={{ Alert, Code, code: Code }}
      options={{
        mdxOptions: {
          rehypePlugins: [rehypeSlug, [rehypeHighlight, { detect: true, ignoreMissing: true }]],
        },
      }}
    />
  );
}