const path = require("path")
const { resolve } = require("../webpack/common")

module.exports = ({ config }) => {
  // use installed babel-loader which is v8.0-beta (which is meant to work with @babel/core@7)
  config.module.rules[0].use[0].loader = require.resolve("babel-loader")
  // use @babel/preset-react for JSX and env (instead of staged presets)
  config.module.rules[0].use[0].options.presets = [
    require.resolve("@babel/preset-react"),
    require.resolve("@babel/preset-env"),
  ]
  config.module.rules[0].use[0].options.plugins = [
    // use @babel/plugin-proposal-class-properties for class arrow functions
    require.resolve("@babel/plugin-proposal-class-properties"),
    require.resolve("@babel/plugin-proposal-private-methods"),
    require.resolve("@babel/plugin-proposal-private-property-in-object"),
  ]
  // Prefer Gatsby ES6 entrypoint (module) over commonjs (main) entrypoint
  config.resolve.mainFields = ["browser", "module", "main"]

  // Allow SVGs.
  handleSVGs(config)

  // TypeScript config
  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    loader: require.resolve("babel-loader"),
    options: {
      presets: [["react-app", { flow: false, typescript: true }]],
      plugins: [
        require.resolve("@babel/plugin-proposal-class-properties"),
        require.resolve("@babel/plugin-proposal-private-methods"),
        require.resolve("@babel/plugin-proposal-private-property-in-object"),
      ],
    },
  })

  config.module.rules.push({
    test: [/\.stories\.(jsx?$|tsx?$)/],
    loader: path.resolve(__dirname, "./storiesToText.js"),
    options: {
      root: path.resolve(__dirname, "../src"),
    },
  })

  config.resolve = {
    ...resolve(false),
    alias: {
      ...resolve(false).alias,
      "electron-better-ipc": path.resolve(
        __dirname,
        "..",
        "__mocks__",
        "electron-better-ipc.js"
      ),
    },
  }

  return config
}

// SVGs are broken in the default config, so have to apply
// this fix: https://github.com/storybookjs/storybook/issues/6188#issuecomment-487705465
function handleSVGs(config) {
  // Remove svg from existing rule.
  config.module.rules = config.module.rules.map((rule) => {
    if (
      String(rule.test) ===
      String(
        /\.(svg|ico|jpg|jpeg|png|apng|gif|eot|otf|webp|ttf|woff|woff2|cur|ani|pdf)(\?.*)?$/
      )
    ) {
      return {
        ...rule,
        test: /\.(ico|jpg|jpeg|png|apng|gif|eot|otf|webp|ttf|woff|woff2|cur|ani|pdf)(\?.*)?$/,
      }
    }

    return rule
  })

  // Use svgr for svg files.
  config.module.rules.push({
    test: /\.svg$/,
    use: ["svg-react-loader"],
  })
}
