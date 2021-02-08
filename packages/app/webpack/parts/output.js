const { resolve } = require("path")

module.exports = {
  path: resolve(__dirname, "..", "..", "dist"),
  filename: "[name].js",
}
