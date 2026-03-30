/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import type { StorybookConfig } from "@storybook/react-vite"

const config: StorybookConfig = {
  stories: ["../../../libs/**/*.@(mdx|stories.@(js|jsx|ts|tsx))"],
  addons: ["@storybook/addon-docs"],
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
    defaultName: "Docs",
  },
  previewHead: (head) => {
    const apiMocks = {
      serialPort: "noop",
      sql: "noop",
      news: "noop",
      appSettings: "noop",
      appActions: "noop",
      appFileSystem: "noop",
      appHttp: "noop",
      appLogger: "noop",
      appPath: "noop",
      appHelp: "noop",
      appUpdater: "noop",
      jsonStore: "noop",
      usbAccess: "noop",
      appMtp: "noop",
      externalAuthProviders: "noop",
      nativeImage: "noop",
    }

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
