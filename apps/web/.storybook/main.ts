/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createRequire } from "node:module"
import { dirname, join } from "node:path"
import type { StorybookConfig } from "@storybook/react-vite"

const require = createRequire(import.meta.url)

const config: StorybookConfig = {
  stories: ["../../../libs/**/*.@(mdx|stories.@(js|jsx|ts|tsx))"],
  addons: [getAbsolutePath("@storybook/addon-docs")],
  core: {
    builder: getAbsolutePath("@storybook/builder-vite"),
  },
  framework: {
    name: getAbsolutePath("@storybook/react-vite"),
    options: {
      builder: {
        viteConfigPath: "vite.config.ts",
      },
    },
  },
  staticDirs: [
    {
      from: "../../app/resources/fonts",
      to: "/assets/fonts",
    },
    {
      from: "../../app/resources/icons",
      to: "/assets/icons",
    },
  ],
  docs: {
    defaultName: "Docs",
  },
  async viteFinal(config) {
    // Merge custom configuration into the default config
    const { mergeConfig } = await import("vite")

    return mergeConfig(config, {
      // Add dependencies to pre-optimization
      optimizeDeps: {},
    })
  },
}

export default config

function getAbsolutePath(value: string): any {
  return dirname(require.resolve(join(value, "package.json")))
}
