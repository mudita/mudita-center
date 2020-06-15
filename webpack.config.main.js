const {
  isProd,
  externals,
  target,
  entry,
  rules,
  resolve,
  plugins,
  output,
  node,
} = require("./webpack/common")
const { woff, woff2, tff, eot, tsx } = rules

module.exports = {
  mode: isProd ? "production" : "development",
  entry: entry(false),
  node,
  resolve: resolve(isProd),
  output,
  externals,
  target: target(false),
  plugins: [plugins.circulars, plugins.define, plugins.minify],
  module: {
    rules: [woff, woff2, tff, eot, tsx(false)],
  },
}
