const dotenv = require("dotenv")
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin")
const HTMLWebpackPlugin = require("html-webpack-plugin")
const CircularDependencyPlugin = require("circular-dependency-plugin")
const CopyPlugin = require("copy-webpack-plugin")
const { DefinePlugin, EnvironmentPlugin } = require("webpack")
const path = require("path")

module.exports = {
  tsChecker: () => new ForkTsCheckerWebpackPlugin(),
  define: new DefinePlugin({
    "process.env.NODE_ENV": JSON.stringify(
      process.env.NODE_ENV || "development"
    ),
  }),
  circulars: new CircularDependencyPlugin({
    exclude: /node_modules/,
    failOnError: true,
    cwd: process.cwd(),
    onStart() {
      console.log(
        "circular-dependency-plugin: start detecting webpack modules cycles"
      )
    },
    onEnd() {
      console.log(
        "circular-dependency-plugin: end detecting webpack modules cycles"
      )
    },
  }),
  minify: new HTMLWebpackPlugin({
    removeComments: false,
    collapseWhitespace: true,
    removeRedundantAttributes: true,
    useShortDoctype: true,
    removeEmptyAttributes: true,
    removeStyleLinkTypeAttributes: true,
    keepClosingSlash: true,
    minifyJS: false,
    minifyCSS: false,
    minifyURLs: true,
  }),
  env: new EnvironmentPlugin({
    ...dotenv.config({
      path:
        process.env.STATIC_CONFIGURATION_FILE_PATH ||
        path.join(__dirname, "../../../../.env"),
    }).parsed,
  }),
  static: new CopyPlugin({
    patterns: [{ from: "static", to: "static" }],
  }),
}
