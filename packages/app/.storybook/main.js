/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

const NodePolyfillPlugin = require("node-polyfill-webpack-plugin")
const path = require("path")
const { resolve } = require("../webpack/common")

module.exports = {
  stories: ["../**/*.stories.tsx"],
  addons: [
    "@storybook/addon-actions",
    "@storybook/addon-knobs",
    "@storybook/addon-links",
  ],
  core: {
    builder: "webpack5",
  },
  webpackFinal: async (config) => {
    config.plugins.push(new NodePolyfillPlugin())

    config.module.rules = config.module.rules.map((rule) => {
      if (
        String(rule.test) ===
        String(
          /\.(svg|ico|jpg|jpeg|png|apng|gif|eot|otf|webp|ttf|woff|woff2|cur|ani|pdf)(\?.*)?$/
        )
      ) {
        return {
          ...rule,
          test: /\.(ico|jpg|jpeg|png|apng|gif|eot|otf|webp|ttf|woff|woff2|cur|ani|pdf)(\?.*)?$/,
        }
      }

      return rule
    })

    // Use svgr for svg files.
    config.module.rules.push({
      test: /\.svg$/,
      use: ["svg-react-loader"],
    })

    config.resolve = {
      ...resolve(false),
      alias: {
        ...resolve(false).alias,
        "electron-better-ipc": path.resolve(
          __dirname,
          "..",
          "__mocks__",
          "electron-better-ipc.js"
        ),
      },
      extensions: [".mjs", ".ts", ".tsx", ".js"],
    }

    config.externals = ["child_process"]

    return config
  },
}
