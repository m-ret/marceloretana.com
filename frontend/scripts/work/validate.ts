#!/usr/bin/env bun
/**
 * Build-story validator for content/work.
 *
 * Usage:
 *   bun scripts/work/validate.ts              # self-test, then validate the published stories
 *   bun scripts/work/validate.ts --partial    # allow an ordered subset while content lands
 *   bun scripts/work/validate.ts --self-test  # only check the banned-pattern matcher
 *
 * Bun resolves the content modules' static image imports to absolute file paths,
 * so the image checks below read the real files.
 */

import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";
import { z } from "zod";

export const EXPECTED_SLUGS = [
  "mav-digital",
  "repuestos-alto",
  "uvita-body-shop",
  "goeasy-chat",
  "alhena",
];
const OWN_PRODUCTS = new Set(["goeasy-chat", "alhena"]);

const KB = 1024;
const HERO_MAX_BYTES = 450 * KB;
const IMAGE_MAX_BYTES = 300 * KB;
const OG_MAX_BYTES = 180 * KB;

// ─── Banned patterns ───

type BannedPattern = { label: string; pattern: RegExp; allow?: (match: string) => boolean };

const YEAR_RANGE = /^(?:19|20)\d{2}[\s.-](?:19|20)\d{2}$/;

const BANNED_PATTERNS: BannedPattern[] = [
  { label: "currency", pattern: /[$₡]/g },
  { label: "currency", pattern: /\b(?:USD|CRC|colones|d[óo]lares|dollars?)\b/gi },
  { label: "email", pattern: /[\w.+-]+@[\w-]+(?:\.[\w-]+)+/g },
  { label: "phone", pattern: /\+\d[\d\s().-]{6,}\d/g },
  { label: "phone", pattern: /\b\d{4}[\s.-]\d{4}\b/g, allow: (match) => YEAR_RANGE.test(match) },
  { label: "phone", pattern: /\b\d{8,15}\b/g },
  {
    label: "hype word",
    pattern:
      /\b(?:revolutionar(?:y|ies)|cutting[\s-]edge|seamless(?:ly)?|robust(?:ly|ness)?|leverag(?:e|es|ed|ing)|empower(?:s|ed|ing|ment)?|elevat(?:e|es|ed|ing)|world[\s-]class|state[\s-]of[\s-]the[\s-]art|game[\s-]changers?|unlock(?:s|ed|ing)?|supercharg(?:e|es|ed|ing))\b/gi,
  },
  {
    label: "hype word",
    pattern:
      /\b(?:robust[oa]s?|revolucionari[oa]s?|de vanguardia|de clase mundial|sin fisuras)\b/gi,
  },
];

/** Pure: returns one entry per banned match in `text`, e.g. `currency "$"`. */
export function findBannedPatterns(text: string): string[] {
  const hits: string[] = [];
  for (const { label, pattern, allow } of BANNED_PATTERNS) {
    for (const match of text.matchAll(pattern)) {
      if (allow?.(match[0])) continue;
      hits.push(`${label} "${match[0]}"`);
    }
  }
  return hits;
}

const MUST_CATCH = ["$500", "₡1,500", "info@example.com", "+506 8888 8888", "seamless"];
const ALSO_CATCH = [
  "Cuesta 300 dólares",
  "Call 8888-8888",
  "wa.me/50688888888",
  "a robust stack",
  "una base robusta",
];
const MUST_PASS = [
  "I moved the site to Next.js so every page loads fast on a phone.",
  "Moví el sitio a Next.js para que cada página cargue rápido en el celular.",
  "It went live in 2026 with 52/52 pages indexed and every image under 300 KB.",
  "The work ran 2025-2026 and the previews are 1200×630.",
];

function selfTest(): boolean {
  const failures: string[] = [];
  for (const text of [...MUST_CATCH, ...ALSO_CATCH]) {
    if (findBannedPatterns(text).length === 0) failures.push(`not caught: ${JSON.stringify(text)}`);
  }
  for (const text of MUST_PASS) {
    const hits = findBannedPatterns(text);
    if (hits.length > 0) failures.push(`false positive on ${JSON.stringify(text)}: ${hits}`);
  }
  if (failures.length > 0) {
    console.error("Banned-pattern self-test FAILED");
    for (const failure of failures) console.error(`- ${failure}`);
    return false;
  }
  console.log(
    `Banned-pattern self-test passed (${MUST_CATCH.length + ALSO_CATCH.length} caught, ${MUST_PASS.length} clean)`
  );
  return true;
}

// ─── Schema (content-brief limits; section bodies total 650–1000 words) ───

function countWords(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

const text = z.string().trim().min(1);
const maxWords = (max: number) =>
  text.refine((value) => countWords(value) <= max, { error: `must be at most ${max} words` });
const localizedText = z.object({ en: text, es: text });
const kebab = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const filePath = z.string().startsWith("/", { error: "expected a resolved file path" });

const imageSchema = z.object({
  src: filePath,
  kind: z.enum(["desktop", "mobile", "photo", "video"]),
  alt: localizedText,
  caption: localizedText.optional(),
});

const sectionSchema = z.object({
  heading: maxWords(8),
  body: z.array(text).min(1).max(3),
  image: text.nullable(),
});

const copySchema = z
  .object({
    title: text.max(70),
    excerpt: text.max(160),
    sector: text,
    location: text,
    sections: z.array(sectionSchema).min(4).max(6),
    takeaways: z.array(maxWords(25)).min(3).max(5),
    stack: z.array(text).min(5).max(10),
    seo: z.object({ title: text.max(60), description: text.min(140).max(160) }),
  })
  .superRefine((copy, ctx) => {
    const words = copy.sections
      .flatMap((section) => section.body)
      .reduce((total, paragraph) => total + countWords(paragraph), 0);
    if (words < 650 || words > 1000) {
      ctx.addIssue({
        code: "custom",
        path: ["sections"],
        message: `section bodies total ${words} words; expected 650–1000`,
      });
    }
  });

const sourceSchema = z.object({
  slug: z.string().regex(kebab),
  name: text,
  year: z.string().regex(/^\d{4}$/),
  liveUrl: z.url({ protocol: /^https$/ }),
  ownProduct: z.boolean().optional(),
  publishedAt: z.iso.date(),
  og: filePath,
  images: z.record(z.string().regex(kebab), imageSchema),
  copy: z.object({ en: copySchema, es: copySchema }),
});

type ParsedSource = z.infer<typeof sourceSchema>;

// ─── Cross-field and file checks ───

function collectStrings(value: unknown, at: string, out: Array<[string, string]>) {
  if (typeof value === "string") {
    out.push([at, value]);
  } else if (Array.isArray(value)) {
    value.forEach((item, index) => {
      collectStrings(item, `${at}.${index}`, out);
    });
  } else if (value && typeof value === "object") {
    for (const [key, item] of Object.entries(value)) {
      // Resolved file paths are not copy.
      if (key === "src" || key === "og") continue;
      collectStrings(item, at ? `${at}.${key}` : key, out);
    }
  }
}

/** RIFF chunk ids of a WebP file, or null when the file is not WebP. */
function webpChunks(file: string): string[] | null {
  const data = fs.readFileSync(file);
  if (data.toString("ascii", 0, 4) !== "RIFF" || data.toString("ascii", 8, 12) !== "WEBP") {
    return null;
  }
  const chunks: string[] = [];
  let offset = 12;
  while (offset + 8 <= data.length) {
    chunks.push(data.toString("ascii", offset, offset + 4));
    const size = data.readUInt32LE(offset + 4);
    offset += 8 + size + (size % 2);
  }
  return chunks;
}

// Camera or editor metadata (EXIF can hold GPS) must not ship in a public repo.
const METADATA_CHUNKS = new Set(["EXIF", "XMP "]);

async function checkStory(story: ParsedSource): Promise<string[]> {
  const errors: string[] = [];

  if (OWN_PRODUCTS.has(story.slug) !== (story.ownProduct === true)) {
    errors.push(`ownProduct must be ${OWN_PRODUCTS.has(story.slug)}`);
  }

  if (!story.images.hero) errors.push("images.hero is required");

  const { en, es } = story.copy;
  const referenced = new Set<string>();
  for (const locale of ["en", "es"] as const) {
    story.copy[locale].sections.forEach((section, index) => {
      if (!section.image) return;
      referenced.add(section.image);
      if (!story.images[section.image]) {
        errors.push(`copy.${locale}.sections.${index}.image "${section.image}" is not in images`);
      }
    });
  }
  for (const key of Object.keys(story.images)) {
    if (key !== "hero" && !referenced.has(key)) errors.push(`images.${key} is never used`);
  }

  if (en.sections.length !== es.sections.length) {
    errors.push(`sections: en has ${en.sections.length}, es has ${es.sections.length}`);
  } else {
    en.sections.forEach((section, index) => {
      if (section.image !== es.sections[index].image) {
        errors.push(`sections.${index}.image differs between en and es`);
      }
    });
  }
  if (en.takeaways.length !== es.takeaways.length) {
    errors.push(`takeaways: en has ${en.takeaways.length}, es has ${es.takeaways.length}`);
  }

  for (const [key, image] of Object.entries(story.images)) {
    const file = image.src;
    if (!fs.existsSync(file)) {
      errors.push(`images.${key}: missing file ${path.basename(file)}`);
      continue;
    }
    const chunks = webpChunks(file);
    if (path.extname(file) !== ".webp" || !chunks) {
      errors.push(`images.${key}: must be a WebP file`);
    } else if (chunks.some((chunk) => METADATA_CHUNKS.has(chunk))) {
      errors.push(`images.${key}: carries EXIF/XMP metadata; strip it`);
    }
    const limit = key === "hero" ? HERO_MAX_BYTES : IMAGE_MAX_BYTES;
    const size = fs.statSync(file).size;
    if (size > limit) {
      errors.push(`images.${key}: ${Math.round(size / KB)} KB exceeds ${limit / KB} KB`);
    }
  }

  if (!fs.existsSync(story.og)) {
    errors.push("og.jpg is missing");
  } else {
    const size = fs.statSync(story.og).size;
    if (size > OG_MAX_BYTES) {
      errors.push(`og.jpg: ${Math.round(size / KB)} KB exceeds ${OG_MAX_BYTES / KB} KB`);
    }
    const meta = await sharp(story.og).metadata();
    if (meta.format !== "jpeg" || meta.width !== 1200 || meta.height !== 630) {
      errors.push(
        `og.jpg: expected a 1200×630 JPEG, got ${meta.format} ${meta.width}×${meta.height}`
      );
    }
    if (meta.exif || meta.xmp) errors.push("og.jpg: carries EXIF/XMP metadata; strip it");
  }

  const strings: Array<[string, string]> = [];
  collectStrings(story, "", strings);
  for (const [at, value] of strings) {
    for (const hit of findBannedPatterns(value)) errors.push(`${at}: banned ${hit}`);
  }

  return errors;
}

function checkOrder(slugs: string[], partial: boolean): string[] {
  const duplicates = slugs.filter((slug, index) => slugs.indexOf(slug) !== index);
  if (duplicates.length > 0) return [`duplicate slugs: ${[...new Set(duplicates)].join(", ")}`];

  if (!partial) {
    const same =
      slugs.length === EXPECTED_SLUGS.length &&
      slugs.every((slug, index) => slug === EXPECTED_SLUGS[index]);
    return same
      ? []
      : [
          `expected ${EXPECTED_SLUGS.length} build stories in order (${EXPECTED_SLUGS.join(", ")}), ` +
            `found ${slugs.length}: ${slugs.join(", ") || "(none)"}`,
        ];
  }

  if (slugs.length === 0) return ["registry is empty"];
  let cursor = 0;
  for (const slug of slugs) {
    const index = EXPECTED_SLUGS.indexOf(slug, cursor);
    if (index === -1) return [`"${slug}" is unknown or out of display order`];
    cursor = index + 1;
  }
  return [];
}

async function main() {
  const args = new Set(process.argv.slice(2));
  const selfTestPassed = selfTest();
  if (args.has("--self-test")) process.exit(selfTestPassed ? 0 : 1);
  if (!selfTestPassed) process.exit(1);

  const { buildStorySources } = await import("@/content/work");
  const errors: string[] = [];

  const slugs = buildStorySources.map((story) => story.slug);
  errors.push(...checkOrder(slugs, args.has("--partial")).map((error) => `registry: ${error}`));

  for (const source of buildStorySources) {
    const parsed = sourceSchema.safeParse(source);
    if (!parsed.success) {
      for (const issue of parsed.error.issues) {
        errors.push(`${source.slug}: ${issue.path.join(".")}: ${issue.message}`);
      }
      continue;
    }
    for (const error of await checkStory(parsed.data)) errors.push(`${source.slug}: ${error}`);
  }

  if (errors.length > 0) {
    console.error(`\nBuild stories invalid (${errors.length} errors)`);
    for (const error of errors) console.error(`- ${error}`);
    process.exit(1);
  }
  console.log(`Build stories valid (${slugs.length}: ${slugs.join(", ")})`);
}

if (import.meta.main) {
  main().catch((error: unknown) => {
    console.error(error);
    process.exit(1);
  });
}
