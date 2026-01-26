interface MarkdownRendererProps {
  content: string;
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  // Process markdown in correct order
  let html = content;

  // 1. Escape HTML entities first
  html = html.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

  // 2. Code blocks (must be before everything else to protect their content)
  html = html.replace(
    /```(\w+)?\n([\s\S]*?)```/g,
    (_match, lang, code) => `<pre><code class="language-${lang || ""}">${code.trim()}</code></pre>`
  );

  // 3. Inline code (before other inline formatting)
  html = html.replace(/`([^`\n]+)`/g, "<code>$1</code>");

  // 4. Bold and italic (before links to handle **text** in links)
  html = html
    .replace(/\*\*\*([^*]+)\*\*\*/g, "<strong><em>$1</em></strong>")
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/(?<!\*)\*([^*]+)\*(?!\*)/g, "<em>$1</em>");

  // 5. Links and images
  html = html
    .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" class="rounded-lg" />')
    .replace(
      /\[([^\]]+)\]\(([^)]+)\)/g,
      '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>'
    );

  // 6. Process block elements
  const lines = html.split("\n");
  const processedLines: string[] = [];
  let inList = false;
  let listType: "ul" | "ol" | null = null;
  let inBlockquote = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    // Skip empty lines but close lists/blockquotes
    if (!trimmed) {
      if (inList) {
        processedLines.push(listType === "ul" ? "</ul>" : "</ol>");
        inList = false;
        listType = null;
      }
      if (inBlockquote) {
        processedLines.push("</blockquote>");
        inBlockquote = false;
      }
      processedLines.push("");
      continue;
    }

    // Headings
    if (trimmed.startsWith("#### ")) {
      processedLines.push(`<h4>${trimmed.slice(5)}</h4>`);
      continue;
    }
    if (trimmed.startsWith("### ")) {
      processedLines.push(`<h3>${trimmed.slice(4)}</h3>`);
      continue;
    }
    if (trimmed.startsWith("## ")) {
      processedLines.push(`<h2>${trimmed.slice(3)}</h2>`);
      continue;
    }
    if (trimmed.startsWith("# ")) {
      processedLines.push(`<h1>${trimmed.slice(2)}</h1>`);
      continue;
    }

    // Horizontal rule
    if (trimmed === "---") {
      processedLines.push("<hr />");
      continue;
    }

    // Blockquotes
    if (trimmed.startsWith("&gt; ")) {
      if (!inBlockquote) {
        processedLines.push("<blockquote>");
        inBlockquote = true;
      }
      processedLines.push(`<p>${trimmed.slice(5)}</p>`);
      continue;
    }

    // Unordered list items
    if (trimmed.startsWith("- ")) {
      if (!inList || listType !== "ul") {
        if (inList) {
          processedLines.push(listType === "ul" ? "</ul>" : "</ol>");
        }
        processedLines.push("<ul>");
        inList = true;
        listType = "ul";
      }
      processedLines.push(`<li>${trimmed.slice(2)}</li>`);
      continue;
    }

    // Ordered list items
    const orderedMatch = trimmed.match(/^(\d+)\.\s+(.+)$/);
    if (orderedMatch) {
      if (!inList || listType !== "ol") {
        if (inList) {
          processedLines.push(listType === "ul" ? "</ul>" : "</ol>");
        }
        processedLines.push("<ol>");
        inList = true;
        listType = "ol";
      }
      processedLines.push(`<li>${orderedMatch[2]}</li>`);
      continue;
    }

    // Close list if we hit a non-list item
    if (inList) {
      processedLines.push(listType === "ul" ? "</ul>" : "</ol>");
      inList = false;
      listType = null;
    }

    // Pre blocks (already processed, just pass through)
    if (trimmed.startsWith("<pre>") || trimmed.startsWith("</pre>")) {
      processedLines.push(line);
      continue;
    }

    // Regular paragraphs
    if (
      !trimmed.startsWith("<") ||
      trimmed.startsWith("<code>") ||
      trimmed.startsWith("<strong>") ||
      trimmed.startsWith("<em>") ||
      trimmed.startsWith("<a ")
    ) {
      processedLines.push(`<p>${trimmed}</p>`);
    } else {
      processedLines.push(line);
    }
  }

  // Close any open tags
  if (inList) {
    processedLines.push(listType === "ul" ? "</ul>" : "</ol>");
  }
  if (inBlockquote) {
    processedLines.push("</blockquote>");
  }

  html = processedLines.join("\n");

  // Clean up multiple empty paragraphs
  html = html.replace(/<p><\/p>/g, "").replace(/\n{3,}/g, "\n\n");

  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
