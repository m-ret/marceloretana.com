import { describe, expect, it } from "bun:test";
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

/** Every page and layout under app/. */
function routeFiles(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) return routeFiles(path);
    return /^(page|layout)\.tsx$/.test(name) ? [path] : [];
  });
}

describe("page titles", () => {
  it("do not repeat the brand that the root title template already adds", () => {
    const repeated = routeFiles(import.meta.dir).filter((file) =>
      /^ {2}title: ".* \| Marcelo Retana",?$/m.test(readFileSync(file, "utf8"))
    );

    // "Contact | Marcelo Retana | Marcelo Retana" was live on seven pages.
    expect(repeated).toEqual([]);
  });

  it("looks at the real routes", () => {
    expect(routeFiles(import.meta.dir).length).toBeGreaterThan(20);
  });
});
