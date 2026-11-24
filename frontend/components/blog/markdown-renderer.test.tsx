import { describe, expect, it } from "bun:test";
import { renderToStaticMarkup } from "react-dom/server";
import { MarkdownRenderer } from "./markdown-renderer";

const render = (content: string) => renderToStaticMarkup(<MarkdownRenderer content={content} />);

describe("MarkdownRenderer", () => {
  it("renders a code block that can take keyboard focus, so it can be scrolled", () => {
    const html = render("```js\nconst answer = 42;\n```");

    expect(html).toContain('<pre tabindex="0">');
    expect(html).toContain("answer");
  });

  it("highlights the code", () => {
    const html = render("```js\n// a comment\nconst answer = 42;\n```");

    expect(html).toContain("hljs-comment");
    expect(html).toContain("hljs-keyword");
  });

  it("opens links in a new tab without handing over the opener", () => {
    const html = render("[docs](https://example.com/docs)");

    expect(html).toContain('href="https://example.com/docs"');
    expect(html).toContain('target="_blank"');
    expect(html).toContain('rel="noopener noreferrer"');
  });

  it("gives every image an alt attribute, empty when the post has none", () => {
    const html = render("![](https://example.com/a.png) ![A chart](https://example.com/b.png)");

    expect(html).toContain('alt=""');
    expect(html).toContain('alt="A chart"');
    expect(html).toContain('class="rounded-lg"');
  });

  it("renders plain markdown", () => {
    expect(render("# Title")).toBe("<h1>Title</h1>");
  });
});
