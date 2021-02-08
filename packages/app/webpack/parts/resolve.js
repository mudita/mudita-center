const { resolve } = require("path")

module.exports = (production) => {
  const resolveConfig = {
    extensions: [".tsx", ".ts", ".js", ".json"],
    alias: {
      App: resolve(__dirname, "..", "..", "src"),
      Cypress: resolve(__dirname, "..", "..", "cypress"),
      Storybook: resolve(__dirname, "..", "..", ".storybook"),
      Renderer: resolve(__dirname, "..", "..", "src", "renderer"),
      Backend: resolve(__dirname, "..", "..", "src", "backend"),
      Common: resolve(__dirname, "..", "..", "src", "common"),
      "react-intl": "react-intl/dist",
      fs: resolve(__dirname, "..", "..", "__mocks__", "fs-mock.js"),
    },
  }

  if (!production) {
    resolveConfig.alias = {
      ...resolveConfig.alias,
      "react-dom": "@hot-loader/react-dom",
    }
  }

  return resolveConfig
}
