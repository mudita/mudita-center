const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin")
const HTMLWebpackPlugin = require("html-webpack-plugin")
const CircularDependencyPlugin = require("circular-dependency-plugin")
const { DefinePlugin } = require("webpack")
const path = require("path")
const { spawn } = require("child_process")

const production = process.env.NODE_ENV === "production"

const externals = {
  /**
   * TODO: enable when serialport bindings for node v76 will become available
   * More info at https://github.com/serialport/node-serialport/issues/2031
   * JIRA task: https://appnroll.atlassian.net/browse/PDA-134
   */
  serialport: "require('serialport')",
}

const entry = renderer =>
  renderer
    ? {
        app: ["@babel/polyfill", "./src/renderer/app.tsx"],
      }
    : {
        main: "./src/main/main.ts",
      }

const output = {
  path: path.resolve(__dirname, "..", "dist"),
  filename: "[name].js",
}

const node = {
  __dirname: false,
  __filename: false,
}

const devtool = production => (production ? "none" : "source-map")

const target = renderer => `electron-${renderer ? "renderer" : "main"}`

const resolve = production => {
  const resolveConfig = {
    extensions: [".tsx", ".ts", ".js", ".json"],
    alias: {
      App: path.resolve(__dirname, "..", "src"),
      Cypress: path.resolve(__dirname, "..", "cypress"),
      Storybook: path.resolve(__dirname, "..", ".storybook"),
      Renderer: path.resolve(__dirname, "..", "src", "renderer"),
      Backend: path.resolve(__dirname, "..", "src", "backend"),
      Common: path.resolve(__dirname, "..", "src", "common"),
      "react-intl": "react-intl/dist",
      fs: path.resolve(__dirname, "..", "__mocks__", "fs-mock.js"),
    },
  }

  if (!production) {
    resolveConfig.alias = {
      ...resolveConfig.alias,
      "react-dom": "@hot-loader/react-dom",
    }
  }

  return resolveConfig
}

const tsxMain = {
  test: /\.tsx?$/,
  exclude: /node_modules/,
  loader: "babel-loader",
  options: {
    cacheDirectory: production,
    presets: [
      ["@babel/preset-env", { targets: "maintained node versions" }],
      "@babel/preset-typescript",
    ],
    plugins: [["@babel/plugin-proposal-class-properties", { loose: true }]],
  },
}

const tsxRenderer = {
  test: /\.tsx?$/,
  exclude: /node_modules/,
  loader: "babel-loader",
  options: {
    cacheDirectory: production,
    presets: [
      ["@babel/preset-env", { targets: { browsers: "last 2 versions " } }],
      "@babel/preset-typescript",
      "@babel/preset-react",
    ],
    plugins: [
      ["@babel/plugin-proposal-class-properties", { loose: true }],
      ["@babel/plugin-proposal-optional-chaining"],
      ["@babel/plugin-proposal-nullish-coalescing-operator"],
    ],
  },
}

const rules = {
  woff: {
    test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
    use: {
      loader: "url-loader",
      options: {
        limit: 10000,
        mimetype: "application/font-woff",
      },
    },
  },
  woff2: {
    test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
    use: {
      loader: "url-loader",
      options: {
        limit: 10000,
        mimetype: "application/font-woff",
      },
    },
  },
  tff: {
    test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
    use: {
      loader: "url-loader",
      options: {
        limit: 10000,
        mimetype: "application/octet-stream",
      },
    },
  },
  eot: {
    test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
    use: "file-loader",
  },
  tsx: renderer => (renderer ? tsxRenderer : tsxMain),
  scss: {
    test: /\.scss$/,
    loaders: ["style-loader", "css-loader", "sass-loader"],
  },
  css: {
    test: /\.css$/,
    loaders: ["style-loader", "css-loader"],
  },
  img: {
    test: /\.(?:ico|gif|png|jpg|jpeg|webp)$/,
    use: "url-loader",
  },
  svg: {
    test: /\.svg$/,
    use: ["svg-react-loader"],
  },
  fonts: {
    test: /\.(woff(2)?|ttf|eot|otf)(\?v=\d+\.\d+\.\d+)?$/,
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
  js: {
    enforce: "pre",
    test: /\.js$/,
    loader: "source-map-loader",
  },
}

const plugins = {
  tsChecker: renderer =>
    new ForkTsCheckerWebpackPlugin({
      reportFiles: [`src/${renderer ? "renderer" : "main"}/**/*`],
    }),
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
}

const devserver = {
  port: 2003,
  compress: true,
  noInfo: true,
  stats: "errors-only",
  inline: true,
  hot: true,
  headers: { "Access-Control-Allow-Origin": "*" },
  historyApiFallback: {
    verbose: true,
    disableDotRule: false,
  },
  before() {
    if (process.env.START_HOT) {
      console.log("Starting main process")
      spawn("npm", ["run", "start:main-dev"], {
        shell: true,
        env: process.env,
        stdio: "inherit",
      })
        .on("close", code => process.exit(code))
        .on("error", spawnError => console.error(spawnError))
    }
  },
}

module.exports = {
  production,
  externals,
  entry,
  output,
  node,
  devtool,
  target,
  resolve,
  rules,
  plugins,
  devserver,
}
