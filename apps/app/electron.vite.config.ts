/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { join, resolve } from "path"
import { defineConfig, externalizeDepsPlugin } from "electron-vite"
import react from "@vitejs/plugin-react"
import { viteStaticCopy } from "vite-plugin-static-copy"
import { nodePolyfills } from "vite-plugin-node-polyfills"
import tsconfigPaths from "vite-tsconfig-paths"

export default defineConfig({
  main: {
    plugins: [
      tsconfigPaths({ root: resolve(__dirname, "..", "..") }),
      externalizeDepsPlugin(),
      viteStaticCopy({
        targets: [
          {
            src: join(
              __dirname,
              "..",
              "..",
              "node_modules",
              "sql.js",
              "dist",
              "sql-wasm.wasm"
            ),
            dest: join(__dirname, "src", "renderer", "public"),
          },
        ],
      }),
    ],
    resolve: {
      alias: {
        // "app-serialport/main": resolve(
        //   __dirname,
        //   "..",
        //   "..",
        //   "libs",
        //   "app-serialport",
        //   "main",
        //   "src"
        // ),
        // "app-serialport/models": resolve(
        //   __dirname,
        //   "..",
        //   "..",
        //   "libs",
        //   "app-serialport",
        //   "models",
        //   "src"
        // ),
        // ...resolveMainAliases(),
      },
    },
  },
  preload: {
    plugins: [
      externalizeDepsPlugin(),
      viteStaticCopy({
        targets: [
          {
            src: join(
              __dirname,
              "..",
              "..",
              "node_modules",
              "sql.js",
              "dist",
              "sql-wasm.wasm"
            ),
            dest: join(__dirname, "resources"),
          },
        ],
      }),
    ],
  },
  renderer: {
    resolve: {
      alias: {
        "@app": resolve("./"),
        "@web": resolve("../web/src"),
        "@renderer": resolve("src/renderer/src"),
      },
    },
    plugins: [
      react(),
      nodePolyfills(),
      tsconfigPaths({ root: resolve(__dirname, "..", "..") }),
    ],
  },
})
