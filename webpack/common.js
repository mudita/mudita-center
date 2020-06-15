const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin")
const HTMLWebpackPlugin = require("html-webpack-plugin")
const CircularDependencyPlugin = require("circular-dependency-plugin")
const { DefinePlugin } = require("webpack")

export const externals = {
  serialport: "require('serialport')",
}

export const entry = isRenderer =>
  isRenderer
    ? {
        app: ["@babel/polyfill", "./src/renderer/app.tsx"],
      }
    : {
        main: "./src/main/main.ts",
      }

export const output = {
  path: path.resolve(__dirname, "dist"),
  filename: "[name].js",
}

export const node = {
  __dirname: false,
  __filename: false,
}

export const devtool = isProd => (isProd ? "none" : "source-map")

export const target = isRenderer =>
  `electron-${isRenderer ? "renderer" : "main"}`

export const resolve = {
  extensions: [".tsx", ".ts", ".js", ".json"],
  alias: {
    App: path.resolve(__dirname, "./src"),
    Cypress: path.resolve(__dirname, "./cypress"),
    Storybook: path.resolve(__dirname, "./.storybook"),
    Renderer: path.resolve(__dirname, "./src/renderer"),
    Backend: path.resolve(__dirname, "./src/backend"),
    Common: path.resolve(__dirname, "./src/common"),
    "react-intl": "react-intl/dist",
    fs: path.resolve(__dirname, "__mocks__/fs-mock.js"),
  },
}

const tsxMain = {
  cacheDirectory: true,
  presets: [
    ["@babel/preset-env", { targets: "maintained node versions" }],
    "@babel/preset-typescript",
  ],
  plugins: [["@babel/plugin-proposal-class-properties", { loose: true }]],
}

const tsxRenderer = {
  cacheDirectory: false,
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
}

export const rules = {
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
  tsx: isRenderer => (isRenderer ? tsxRenderer : tsxMain),
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

export const plugins = {
  tsChecked: isRenderer =>
    new ForkTsCheckerWebpackPlugin({
      reportFiles: [`src/${isRenderer ? "renderer" : "main"}/**/*`],
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
    onStart({ compilation }) {
      console.log(
        "circular-dependency-plugin: start detecting webpack modules cycles"
      )
    },
    onEnd({ compilation }) {
      console.log(
        "circular-dependency-plugin: end detecting webpack modules cycles"
      )
    },
  }),
  minify: prod =>
    prod
      ? {}
      : new HTMLWebpackPlugin({
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
