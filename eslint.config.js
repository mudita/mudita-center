/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

const nx = require("@nx/eslint-plugin")
const licenseHeader = require("eslint-plugin-license-header")

module.exports = [
  ...nx.configs["flat/base"],
  ...nx.configs["flat/typescript"],
  ...nx.configs["flat/javascript"],
  {
    ignores: ["**/dist", "**/out", "**/node_modules", "**/*.d.ts"],
  },
  {
    files: ["**/*.ts", "**/*.tsx", "**/*.js", "**/*.jsx"],
    rules: {
      "@nx/enforce-module-boundaries": [
        "error",
        {
          enforceBuildableLibDependency: true,
          allow: ["^.*/eslint(\\.base)?\\.config\\.[cm]?js$"],
          depConstraints: [
            {
              sourceTag: "process:renderer",
              onlyDependOnLibsWithTags: ["process:renderer", "type:models", "type:utils"],
            },
            {
              sourceTag: "process:main",
              onlyDependOnLibsWithTags: ["process:main", "type:models", "type:utils"],
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
    // Override or add rules here
    plugins: {
      "license-header": licenseHeader,
    },
    rules: {
      "license-header/header": [
        "error",
        __dirname + "/resources/license-header.js",
      ],
    },
  },
]
