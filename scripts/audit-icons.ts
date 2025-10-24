/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

/**
 * SVG Icons Audit Script (TypeScript)
 *
 * Scans all .svg files under a given directory
 * and reports those that do not use "currentColor" or "none"
 * in fill/stroke attributes.
 *
 * Example:
 *   tsx scripts/audit-icons.ts ./src/assets/icons
 */

import fs from "node:fs/promises";
import path from "node:path";

const rootDir: string = process.argv[2] || process.cwd();

/**
 * Recursively collects all .svg file paths from a directory.
 */
async function getAllSvgFiles(dir: string): Promise<string[]> {
  const results: string[] = [];
  const entries = await fs.readdir(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...(await getAllSvgFiles(fullPath)));
    } else if (entry.isFile() && fullPath.toLowerCase().endsWith(".svg")) {
      results.push(fullPath);
    }
  }

  return results;
}

/**
 * Checks whether an SVG file contains disallowed color definitions.
 */
async function hasInvalidColors(filePath: string): Promise<boolean> {
  const svg = await fs.readFile(filePath, "utf8");

  // Match fill/stroke attributes
  const attrPattern = /(?:fill|stroke)\s*=\s*["']([^"']+)["']/g;
  let match: RegExpExecArray | null;

  while ((match = attrPattern.exec(svg)) !== null) {
    const color = match[1].trim();

    // Allowed values
    if (color === "currentColor" || color === "none") continue;

    // Detect any color format (hex, rgb(), named color, etc.)
    if (/#|rgb\(|[a-zA-Z]+/.test(color)) return true;
  }

  return false;
}

/**
 * Main audit routine.
 */
async function main(): Promise<void> {
  console.log(`🔍 Auditing SVG icons in: ${rootDir}\n`);

  const svgFiles = await getAllSvgFiles(rootDir);
  const invalidFiles: string[] = [];

  for (const file of svgFiles) {
    if (await hasInvalidColors(file)) invalidFiles.push(file);
  }

  if (invalidFiles.length === 0) {
    console.log("✅ All icons follow the currentColor / none rule.");
    return;
  }

  console.log(`⚠️ ${invalidFiles.length} icons missing currentColor:\n`);
  for (const file of invalidFiles) {
    console.log(`  ❌  ${file}`);
  }

  process.exitCode = 1;
}

main().catch((err) => {
  console.error("Unexpected error:", err);
  process.exitCode = 2;
});
