/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { resolve } from "path"
import { defineConfig } from "electron-vite"
import react from "@vitejs/plugin-react"
import { nodePolyfills } from "vite-plugin-node-polyfills"
import tsconfigPaths from "vite-tsconfig-paths"
import svgr from "vite-plugin-svgr"

// // Required by electron-updater: it expects GH_TOKEN to be set in process.env
// // See: https://www.electron.build/auto-update#private-github-update-repo
// process.env.GH_TOKEN = process.env.VITE_GH_RUNTIME_TOKEN

export default defineConfig({
  main: {
    plugins: [tsconfigPaths({ root: resolve(__dirname, "..", "..") })],
  },
  preload: {
    plugins: [tsconfigPaths({ root: resolve(__dirname, "..", "..") })],
  },
  renderer: {
    resolve: {
      alias: {
        "@app": resolve("./"),
        "@web": resolve("..", "web", "src"),
        "@renderer": resolve("src", "renderer", "src"),
      },
    },
    plugins: [
      react(),
      nodePolyfills(),
      tsconfigPaths({ root: resolve(__dirname, "..", "..") }),
      svgr(),
    ],
    define: {
      "import.meta.env.VITE_APP_VERSION": JSON.stringify(
        process.env.npm_package_version
      ),
    },
  },
})
