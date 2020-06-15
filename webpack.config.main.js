const IS_PROD = process.env.NODE_ENV === "production"

const { target, entry, rules, resolve, output } = require("./webpack/common")
const { externals, woff, woff2, tff, eot, tsx, plugins } = rules

module.exports = {
  externals,
  mode: IS_PROD ? "production" : "development",
  target: target(false),
  output,
  entry: entry(false),
  resolve,
  module: {
    rules: [woff, woff2, tff, eot, tsx(false)],
  },
  plugins: [plugins.circulars],
}
