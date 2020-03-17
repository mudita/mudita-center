const path = require("path")

const paths = require("./paths")

// for Webpack and ESlint
module.exports = {
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".json"],
    alias: {
      App: path.resolve(__dirname, "..", paths.src),
      Cypress: path.resolve(__dirname, "..", paths.cypress),
      Storybook: path.resolve(__dirname, "..", paths.storybook),
      Renderer: path.resolve(__dirname, "..", paths.renderer),
      Backend: path.resolve(__dirname, "..", paths.backend),
      Common: path.resolve(__dirname, "..", paths.common),
      "react-intl": "react-intl/dist",
      fs: path.resolve(__dirname, "..", "__mocks__/fs-mock.js"),
    },
  },
}
