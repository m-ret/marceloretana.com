"use client";

import Image from "next/image";
import type { JSX } from "react";
import { createElement } from "react";

interface TextNode {
  type: "text";
  text: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strikethrough?: boolean;
  code?: boolean;
}

interface LinkNode {
  type: "link";
  url: string;
  children: TextNode[];
}

type InlineNode = TextNode | LinkNode;

interface ParagraphBlock {
  type: "paragraph";
  children: InlineNode[];
}

interface HeadingBlock {
  type: "heading";
  level: 1 | 2 | 3 | 4 | 5 | 6;
  children: InlineNode[];
}

interface ListBlock {
  type: "list";
  format: "ordered" | "unordered";
  children: { type: "list-item"; children: InlineNode[] }[];
}

interface QuoteBlock {
  type: "quote";
  children: InlineNode[];
}

interface CodeBlock {
  type: "code";
  children: TextNode[];
}

interface ImageBlock {
  type: "image";
  image: {
    url: string;
    alternativeText?: string;
    width?: number;
    height?: number;
  };
}

type Block = ParagraphBlock | HeadingBlock | ListBlock | QuoteBlock | CodeBlock | ImageBlock;

function renderInlineNode(node: InlineNode, index: number): React.ReactNode {
  if (node.type === "link") {
    return (
      <a
        key={index}
        href={node.url}
        className="text-rose-500 hover:text-rose-600 underline"
        target={node.url.startsWith("http") ? "_blank" : undefined}
        rel={node.url.startsWith("http") ? "noopener noreferrer" : undefined}
      >
        {node.children.map((child, i) => renderInlineNode(child, i))}
      </a>
    );
  }

  let content: React.ReactNode = node.text;

  if (node.bold) {
    content = <strong key={`bold-${index}`}>{content}</strong>;
  }
  if (node.italic) {
    content = <em key={`italic-${index}`}>{content}</em>;
  }
  if (node.underline) {
    content = <u key={`underline-${index}`}>{content}</u>;
  }
  if (node.strikethrough) {
    content = <s key={`strike-${index}`}>{content}</s>;
  }
  if (node.code) {
    content = (
      <code key={`code-${index}`} className="bg-neutral-100 px-1.5 py-0.5 rounded text-sm">
        {content}
      </code>
    );
  }

  return <span key={index}>{content}</span>;
}

function renderBlock(block: Block, index: number): React.ReactNode {
  switch (block.type) {
    case "paragraph":
      return <p key={index}>{block.children.map((child, i) => renderInlineNode(child, i))}</p>;

    case "heading": {
      const tag = `h${block.level}` as keyof JSX.IntrinsicElements;
      return createElement(
        tag,
        { key: index },
        ...block.children.map((child, i) => renderInlineNode(child, i))
      );
    }

    case "list": {
      const Tag = block.format === "ordered" ? "ol" : "ul";
      return (
        <Tag key={index}>
          {block.children.map((item, i) => (
            <li key={i}>{item.children.map((child, j) => renderInlineNode(child, j))}</li>
          ))}
        </Tag>
      );
    }

    case "quote":
      return (
        <blockquote key={index}>
          {block.children.map((child, i) => renderInlineNode(child, i))}
        </blockquote>
      );

    case "code":
      return (
        <pre key={index} className="bg-neutral-900 text-neutral-100 p-4 rounded-lg overflow-x-auto">
          <code>{block.children.map((child) => child.text).join("")}</code>
        </pre>
      );

    case "image": {
      const { url, alternativeText, width, height } = block.image;
      const imageUrl = url.startsWith("http")
        ? url
        : `${process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337"}${url}`;

      return (
        <figure key={index} className="my-8">
          <Image
            src={imageUrl}
            alt={alternativeText || "Blog image"}
            width={width || 800}
            height={height || 450}
            className="rounded-lg"
          />
          {alternativeText && (
            <figcaption className="text-center text-sm text-neutral-500 mt-2">
              {alternativeText}
            </figcaption>
          )}
        </figure>
      );
    }

    default:
      return null;
  }
}

interface BlocksRendererProps {
  content: unknown[];
}

export function BlocksRenderer({ content }: BlocksRendererProps) {
  if (!content || !Array.isArray(content)) {
    return null;
  }

  return (
    <div className="prose prose-neutral prose-lg max-w-none">
      {content.map((block, index) => renderBlock(block as Block, index))}
    </div>
  );
}
