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
import * as process from "node:process"
import { PluginOption } from "vite"

// CSP injection plugin, For CSP directives reference: https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP
const connectSrcList = [process.env.VITE_ANALYTICS_API_URL || ""]
const cspPlugin: PluginOption = {
  name: "inject-csp",
  transformIndexHtml() {
    return [
      {
        tag: "meta",
        attrs: {
          "http-equiv": "Content-Security-Policy",
          content: [
            "default-src 'self'",
            `connect-src 'self' ${connectSrcList.join(" ")}`,
            "script-src 'self' 'unsafe-inline'",
            "style-src 'self' 'unsafe-inline'",
            "img-src 'self' data:",
          ].join("; "),
        },
        injectTo: "head-prepend",
      },
    ]
  },
}

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
      cspPlugin,
    ],
    define: {
      "import.meta.env.VITE_APP_VERSION": JSON.stringify(
        process.env.npm_package_version
      ),
    },
  },
})
