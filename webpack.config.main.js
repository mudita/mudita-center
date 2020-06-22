const {
  production,
  externals,
  target,
  entry,
  rules,
  resolve,
  plugins,
  output,
  node,
  optimization,
} = require("./webpack/common")
const { woff, woff2, tff, eot, tsx } = rules

module.exports = {
  mode: production ? "production" : "development",
  entry: entry(false),
  node,
  resolve: resolve(production),
  output,
  externals,
  optimization: optimization(production),
  target: target(false),
  plugins: [plugins.circulars, plugins.define, plugins.minify],
  module: {
    rules: [woff, woff2, tff, eot, tsx(false, production)],
  },
}
