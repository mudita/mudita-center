const tsxMain = (production) => ({
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
})

const tsxRenderer = (production) => ({
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
})

module.exports = {
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
  tsx: (renderer, production) =>
    renderer ? tsxRenderer(production) : tsxMain(production),
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
