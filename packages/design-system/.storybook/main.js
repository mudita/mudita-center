const path = require("path")

module.exports = {
  stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: ["@storybook/addon-links", "@storybook/addon-essentials"],
  webpackFinal: async (config) => {
    config.resolve.alias["App"] = path.resolve(
      __dirname,
      path.join("..", "src")
    )
    config.resolve.alias["Components"] = path.resolve(
      __dirname,
      path.join("..", "src", "components")
    )
    config.resolve.alias["Storybook"] = path.resolve(__dirname, ".")
    config.resolve.alias["Theme"] = path.resolve(
      __dirname,
      path.join("..", "src", "theme")
    )

    const rules = config.module.rules;
    const fileLoaderRule = rules.find(rule => rule.test.test('.svg'));
    fileLoaderRule.exclude = /\.svg$/;

    rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    })

    return config
  },
}
