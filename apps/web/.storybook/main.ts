/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createRequire } from "node:module"
import { dirname, join } from "node:path"
import type { StorybookConfig } from "@storybook/react-vite"
import { cloneDeepWith } from "lodash"
// eslint-disable-next-line @nx/enforce-module-boundaries
import { api } from "../../app/src/preload/api"

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
  previewHead: (head) => {
    const apiMocks = cloneDeepWith(api, (value) => {
      if (typeof value === "function") {
        return "noop"
      }
    })

    return `${head}
<script>
  const noop = () => {
    // do nothing
  };

  Object.assign(window, {api: ${JSON.stringify(apiMocks, null, 2).replaceAll('"', "")}});
</script>`
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
