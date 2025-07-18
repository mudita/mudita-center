/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import nx from "@nx/eslint-plugin"
import licenseHeader from "eslint-plugin-license-header"

export default [
  ...nx.configs["flat/base"],
  ...nx.configs["flat/typescript"],
  ...nx.configs["flat/javascript"],
  {
    ignores: [
      ".nx/**",
      ".verdaccio/**",
      "**/dist",
      "**/out",
      "**/node_modules",
      "**/coverage",
      "**/*.d.ts",
      "**/vite.config.*.timestamp*",
      "**/vitest.config.*.timestamp*",
      "**/vite.config.*",
      "**/jest.config.*",
    ],
  },
  {
    files: ["**/*.ts", "**/*.tsx", "**/*.js", "**/*.jsx"],
    rules: {
      "@nx/enforce-module-boundaries": [
        "error",
        {
          enforceBuildableLibDependency: true,
          allow: [
            "^.*/eslint(\\.base)?\\.config\\.[cm]?js$",
            "^types-preload$",
          ],
          depConstraints: [
            {
              sourceTag: "process:e2e",
              onlyDependOnLibsWithTags: [
                "process:e2e",
                "type:models",
                "type:utils",
              ],
            },
            {
              sourceTag: "process:renderer",
              onlyDependOnLibsWithTags: [
                "process:renderer",
                "type:ui",
                "type:models",
                "type:utils",
              ],
            },
            {
              sourceTag: "process:main",
              onlyDependOnLibsWithTags: [
                "process:main",
                "type:models",
                "type:utils",
              ],
            },
            {
              sourceTag: "type:ui",
              onlyDependOnLibsWithTags: [
                "type:ui",
                "type:models",
                "type:utils",
              ],
            },
            {
              sourceTag: "type:utils",
              onlyDependOnLibsWithTags: ["type:utils", "type:models"],
            },
            {
              sourceTag: "type:models",
              onlyDependOnLibsWithTags: ["type:models"],
            },
          ],
        },
      ],
    },
  },
  {
    files: ["**/*.ts", "**/*.tsx", "**/*.js", "**/*.jsx"],
    ignores: ["**/vite.config.*", "**/jest.config.*"],
    // Override or add rules here
    plugins: {
      "license-header": licenseHeader,
    },
    rules: {
      "license-header/header": [
        "error",
        new URL("./resources/license-header.js", import.meta.url).pathname,
      ],
    },
  },
]
