module.exports = {
  devserver: require("./parts/devServer"),
  devtool: require("./parts/devtool"),
  entry: require("./parts/entry"),
  externals: require("./parts/externals"),
  node: require("./parts/node"),
  optimization: require("./parts/optimization"),
  output: require("./parts/output"),
  plugins: require("./parts/plugins"),
  production: require("./parts/production"),
  resolve: require("./parts/resolve"),
  rules: require("./parts/rules"),
  target: require("./parts/target"),
}
