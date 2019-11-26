const minimist = require("minimist")
const webpack = require("webpack")
const merge = require("webpack-merge")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin")

const baseConfig = require("./webpack.base.config")

const htmlMinify = require("./webpack/htmlMinify")
const isDev = require("./webpack/isDev")()

const args = minimist(process.argv.slice(2))
const noBabelLoaderCache = !!args.noBabelLoaderCache

module.exports = merge.smart(baseConfig, {
  target: "electron-renderer",
  entry: {
    app: ["@babel/polyfill", "./src/renderer/app.tsx"],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          cacheDirectory: !noBabelLoaderCache,
          presets: [
            [
              "@babel/preset-env",
              { targets: { browsers: "last 2 versions " } },
            ],
            "@babel/preset-typescript",
            "@babel/preset-react",
          ],
          plugins: [
            ["@babel/plugin-proposal-class-properties", { loose: true }],
          ],
        },
      },
      {
        test: /\.scss$/,
        loaders: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.css$/,
        loaders: ["style-loader", "css-loader"],
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/,
        use: [
          "file-loader",
          {
            loader: "image-webpack-loader",
            options: {
              disable: true,
            },
          },
        ],
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg|otf)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "src/fonts/",
            },
          },
        ],
      },
      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      {
        enforce: "pre",
        test: /\.js$/,
        loader: "source-map-loader",
      },
    ],
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin({
      reportFiles: ["src/renderer/**/*"],
    }),
    new webpack.NamedModulesPlugin(),
    new HtmlWebpackPlugin({
      minify: isDev ? {} : htmlMinify,
    }),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(
        process.env.NODE_ENV || "development"
      ),
    }),
  ],
})
