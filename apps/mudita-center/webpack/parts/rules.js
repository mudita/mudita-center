/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

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
    plugins: [
      ["@babel/plugin-proposal-class-properties", { loose: true }],
      ["@babel/plugin-proposal-private-methods", { loose: true }],
      ["@babel/plugin-proposal-private-property-in-object", { loose: true }],
      ["@babel/plugin-proposal-nullish-coalescing-operator"],
    ],
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
      ["@babel/plugin-proposal-private-methods", { loose: true }],
      ["@babel/plugin-proposal-private-property-in-object", { loose: true }],
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
    use: [
      {
        loader: "style-loader",
      },
      {
        loader: "css-loader",
      },
      {
        loader: "sass-loader",
      },
    ],
  },
  css: {
    test: /\.css$/,
    use: [
      {
        loader: "style-loader",
      },
      {
        loader: "css-loader",
      },
    ],
  },
  img: {
    test: /\.(?:ico|gif|png|jpg|jpeg|webp)$/,
    use: "url-loader",
  },
  svg: {
    test: /\.svg$/,
    use: ["svg-react-loader"],
  },
  js: {
    enforce: "pre",
    test: /\.js$/,
    use: [
      {
        loader: "source-map-loader",
        options: {
          filterSourceMappingUrl: (url, resourcePath) => {
            if (/.*\/node_modules\/.*/.test(resourcePath)) {
              return false
            }
            return true
          },
        },
      },
    ],
  },
}
