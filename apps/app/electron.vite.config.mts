/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { resolve } from "path"
import { defineConfig, externalizeDepsPlugin } from "electron-vite"
import react from "@vitejs/plugin-react"
import { nodePolyfills } from "vite-plugin-node-polyfills"
import tsconfigPaths from "vite-tsconfig-paths"
import svgr from "vite-plugin-svgr"

export default defineConfig({
  main: {
    plugins: [
      tsconfigPaths({ root: resolve(__dirname, "..", "..") }),
      externalizeDepsPlugin(),
    ],
  },
  preload: {
    plugins: [
      tsconfigPaths({ root: resolve(__dirname, "..", "..") }),
      externalizeDepsPlugin(),
    ],
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
  },
})
