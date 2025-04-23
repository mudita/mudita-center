/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import type { StorybookConfig } from "@storybook/react-vite"

const config: StorybookConfig = {
  stories: ["../../../libs/**/*.@(mdx|stories.@(js|jsx|ts|tsx))"],
  addons: ["@storybook/addon-essentials"],
  core: {
    builder: "@storybook/builder-vite",
  },
  framework: {
    name: "@storybook/react-vite",
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
    defaultName: "Documentation",
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

// To customize your Vite configuration you can use the viteFinal field.
// Check https://storybook.js.org/docs/react/builders/vite#configuration
// and https://nx.dev/recipes/storybook/custom-builder-configs
