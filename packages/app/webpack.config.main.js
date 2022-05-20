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
  node: {
    Buffer: false,
    process: false,
  },
  mode: production ? "production" : "development",
  entry: entry(false),
  node,
  resolve: resolve(production),
  output,
  externals,
  optimization: optimization(production),
  target: target(false),
  plugins: [
    plugins.static,
    plugins.circulars,
    plugins.define,
    plugins.minify,
    plugins.env,
  ],
  module: {
    rules: [woff, woff2, tff, eot, tsx(false, production)],
    noParse: /node_modules\/sql\.js\/dist\/sql-wasm\.js$/,
  },
}
