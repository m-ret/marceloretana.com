#!/usr/bin/env bun
/**
 * pSEO Content Validator
 *
 * Post-generation sweep that validates all JSON content files.
 *
 * Usage:
 *   bun scripts/pseo/validate.ts
 *   bun scripts/pseo/validate.ts --type comparison
 *   bun scripts/pseo/validate.ts --fix  # remove invalid files
 */

import fs from "fs";
import path from "path";
import { type ContentType, schemas } from "./schemas";

const CONTENT_DIR = path.join(process.cwd(), "content/pseo");

const TYPE_DIRS: Record<ContentType, string> = {
  comparison: "comparisons",
  checklist: "checklists",
  resource: "resources",
  stack: "stacks",
};

interface ValidationResult {
  file: string;
  type: ContentType;
  slug: string;
  valid: boolean;
  errors: string[];
  warnings: string[];
}

function validateFile(type: ContentType, filePath: string): ValidationResult {
  const slug = path.basename(filePath, ".json");
  const result: ValidationResult = {
    file: filePath,
    type,
    slug,
    valid: true,
    errors: [],
    warnings: [],
  };

  try {
    const raw = fs.readFileSync(filePath, "utf-8");
    const data = JSON.parse(raw);

    // Zod validation
    const schema = schemas[type];
    const parseResult = schema.safeParse(data);

    if (!parseResult.success) {
      result.valid = false;
      result.errors = parseResult.error.issues.map((e) => `${e.path.join(".")}: ${e.message}`);
      return result;
    }

    // Content quality checks
    const seo = data.seo;
    if (seo) {
      if (seo.description && seo.description.length < 50) {
        result.warnings.push(`SEO description is short (${seo.description.length} chars)`);
      }
      if (seo.keywords && seo.keywords.length < 3) {
        result.warnings.push(`Only ${seo.keywords.length} SEO keywords`);
      }
    }

    // Check for suspiciously short content
    const jsonStr = JSON.stringify(data);
    if (jsonStr.length < 500) {
      result.warnings.push(`Content seems thin (${jsonStr.length} bytes)`);
    }

    // Check meta consistency
    if (data.meta) {
      if (data.meta.slug !== slug) {
        result.warnings.push(`Meta slug "${data.meta.slug}" doesn't match filename "${slug}"`);
      }
      if (data.meta.type !== type) {
        result.errors.push(`Meta type "${data.meta.type}" doesn't match directory type "${type}"`);
        result.valid = false;
      }
    }
  } catch (err) {
    result.valid = false;
    result.errors.push(err instanceof Error ? err.message : String(err));
  }

  return result;
}

function checkDuplicates(results: ValidationResult[]): string[] {
  const warnings: string[] = [];
  const titles = new Map<string, string[]>();

  for (const r of results) {
    if (!r.valid) continue;
    try {
      const raw = fs.readFileSync(r.file, "utf-8");
      const data = JSON.parse(raw);
      const title = data.seo?.title;
      if (title) {
        if (!titles.has(title)) titles.set(title, []);
        titles.get(title)!.push(r.slug);
      }
    } catch {
      // Skip
    }
  }

  for (const [title, slugs] of titles) {
    if (slugs.length > 1) {
      warnings.push(`Duplicate title "${title}" in: ${slugs.join(", ")}`);
    }
  }

  return warnings;
}

function main() {
  const args = process.argv.slice(2);
  const typeFilter = args.includes("--type")
    ? (args[args.indexOf("--type") + 1] as ContentType)
    : undefined;
  const shouldFix = args.includes("--fix");

  console.log(`\npSEO Validator`);
  console.log(`─────────────`);

  const allResults: ValidationResult[] = [];

  for (const [type, dir] of Object.entries(TYPE_DIRS)) {
    if (typeFilter && type !== typeFilter) continue;

    const fullDir = path.join(CONTENT_DIR, dir);
    if (!fs.existsSync(fullDir)) {
      console.log(`\n${type}: (no directory)`);
      continue;
    }

    const files = fs.readdirSync(fullDir).filter((f) => f.endsWith(".json"));

    if (files.length === 0) {
      console.log(`\n${type}: (no files)`);
      continue;
    }

    console.log(`\n${type} (${files.length} files):`);

    for (const file of files) {
      const filePath = path.join(fullDir, file);
      const result = validateFile(type as ContentType, filePath);
      allResults.push(result);

      if (result.valid && result.warnings.length === 0) {
        console.log(`  OK   ${result.slug}`);
      } else if (result.valid) {
        console.log(`  WARN ${result.slug}`);
        for (const w of result.warnings) {
          console.log(`       - ${w}`);
        }
      } else {
        console.log(`  FAIL ${result.slug}`);
        for (const e of result.errors) {
          console.log(`       - ${e}`);
        }
        if (shouldFix) {
          fs.unlinkSync(filePath);
          console.log(`       (removed)`);
        }
      }
    }
  }

  // Check for duplicates
  const dupeWarnings = checkDuplicates(allResults);
  if (dupeWarnings.length > 0) {
    console.log(`\nDuplicate content warnings:`);
    for (const w of dupeWarnings) {
      console.log(`  - ${w}`);
    }
  }

  // Summary
  const valid = allResults.filter((r) => r.valid).length;
  const invalid = allResults.filter((r) => !r.valid).length;
  const withWarnings = allResults.filter((r) => r.valid && r.warnings.length > 0).length;

  console.log(`\n─────────────`);
  console.log(
    `Total: ${allResults.length} files | ${valid} valid | ${invalid} invalid | ${withWarnings} with warnings`
  );

  if (invalid > 0 && !shouldFix) {
    console.log(`\nRun with --fix to remove invalid files.`);
  }
}

main();
