const {
  production,
  externals,
  target,
  entry,
  rules,
  resolve,
  output,
  plugins,
  node,
  devserver,
  optimization,
} = require("./webpack/common")
const { woff, woff2, tff, eot, tsx, css, scss, img, svg, js } = rules

const config = {
  node: {
    Buffer: false,
    process: false,
  },
  mode: production ? "production" : "development",
  entry: entry(true),
  node,
  resolve: resolve(production),
  output,
  externals,
  target: target(true),
  optimization: optimization(production),
  plugins: [
    plugins.circulars,
    plugins.tsChecker,
    plugins.minify,
    plugins.define,
    plugins.env,
  ],
  module: {
    rules: [
      woff,
      woff2,
      tff,
      eot,
      tsx(true, production),
      css,
      scss,
      img,
      svg,
      // fonts,
      js,
    ],
  },
}

if (!production) {
  config.devServer = devserver
}

module.exports = config
