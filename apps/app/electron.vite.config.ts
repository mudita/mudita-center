/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { join, resolve } from "path"
import { defineConfig, externalizeDepsPlugin } from "electron-vite"
import react from "@vitejs/plugin-react"
// eslint-disable-next-line @nx/enforce-module-boundaries
import tsConfig from "../../tsconfig.base.json"
import { viteStaticCopy } from "vite-plugin-static-copy"
import { nodePolyfills } from "vite-plugin-node-polyfills"

const resolveProjectAliases = () => {
  return Object.entries(tsConfig.compilerOptions.paths).reduce(
    (acc, [alias, [path]]) => {
      acc[alias.replace("/*", "")] = resolve(
        join(__dirname, "..", "..", ...path.split("/"))
      )
      return acc
    },
    {}
  )
}

export default defineConfig({
  main: {
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
            dest: join(__dirname, "src", "renderer", "public"),
          },
        ],
      }),
    ],
  },
  preload: {
    plugins: [externalizeDepsPlugin()],
  },
  renderer: {
    resolve: {
      alias: {
        "@app": resolve("./"),
        "@web": resolve("../web/src"),
        "@renderer": resolve("src/renderer/src"),
        ...resolveProjectAliases(),
      },
    },
    plugins: [react(), nodePolyfills()],
  },
})
