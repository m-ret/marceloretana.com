import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";

interface MarkdownRendererProps {
  content: string;
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <Markdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeHighlight]}
      components={{
        a: ({ href, children }) => (
          <a href={href} target="_blank" rel="noopener noreferrer">
            {children}
          </a>
        ),
        img: ({ src, alt }) => <img src={src} alt={alt || ""} className="rounded-lg" />,
        // A code block that scrolls sideways must be reachable by keyboard.
        pre: ({ children }) => (
          // biome-ignore lint/a11y/noNoninteractiveTabindex: a scrollable region needs focus to be scrolled with the keyboard
          <pre tabIndex={0}>{children}</pre>
        ),
      }}
    >
      {content}
    </Markdown>
  );
}
