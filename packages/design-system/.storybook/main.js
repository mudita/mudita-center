module.exports = {
  stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: ["@storybook/addon-links", "@storybook/addon-essentials"],
  webpackFinal: async (config) => {
    const rules = config.module.rules

    // modify storybook's file-loader rule to avoid conflicts with your inline svg
    const fileLoaderRule = rules.find((rule) => rule.test.test(".svg"))
    fileLoaderRule.exclude = /\.svg$/

    rules.push({
      test: /\.svg$/,
      use: ["react-svg-loader"],
    })

    return config
  },
}
