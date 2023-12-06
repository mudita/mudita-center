const { resolve } = require("path")

module.exports = (production) => {
  const resolveConfig = {
    extensions: [".tsx", ".ts", ".js", ".json"],
    alias: {
      App: resolve(__dirname, "..", "..", "src"),
      Cypress: resolve(__dirname, "..", "..", "cypress"),
      Storybook: resolve(__dirname, "..", "..", ".storybook"),
      Renderer: resolve(__dirname, "..", "..", "src", "renderer"),
      fs: resolve(__dirname, "..", "..", "__mocks__", "fs-mock.js"),
      Core: resolve(__dirname, "..", "..", "..", "..", "libs", "core")
    },
  }

  if (!production) {
    resolveConfig.alias = {
      ...resolveConfig.alias
    }
  }

  return resolveConfig
}
