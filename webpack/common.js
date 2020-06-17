module.exports = {
  production: require("./parts/production"),
  externals: require("./parts/externals"),
  entry: require("./parts/entry"),
  output: require("./parts/output"),
  node: require("./parts/node"),
  devtool: require("./parts/devtool"),
  target: require("./parts/target"),
  resolve: require("./parts/resolve"),
  rules: require("./parts/rules"),
  plugins: require("./parts/plugins"),
  devserver: require("./parts/devServer"),
  optimization: require("./parts/optimization"),
}
