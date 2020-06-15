const {
  isProd,
  externals,
  target,
  entry,
  rules,
  resolve,
  output,
  plugins,
  node,
  devserver,
} = require("./webpack/common")
const { woff, woff2, tff, eot, tsx, css, scss, img, svg, fonts, js } = rules

const config = {
  mode: isProd ? "production" : "development",
  entry: entry(true),
  node,
  resolve: resolve(isProd),
  output,
  externals,
  target: target(true),
  plugins: [
    plugins.circulars,
    plugins.tsChecker(true),
    plugins.minify,
    plugins.define,
  ],
  module: {
    rules: [woff, woff2, tff, eot, tsx(true), css, scss, img, svg, fonts, js],
  },
}

if (!isProd) {
  config.devServer = devserver
}

module.exports = config
