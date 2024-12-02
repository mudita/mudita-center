import type { StorybookConfig } from "@storybook/react-webpack5"

const config: StorybookConfig = {
  stories: ["../../../libs/**/*.@(mdx|stories.@(js|jsx|ts|tsx))"],
  addons: [
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@nx/react/plugins/storybook",
  ],
  framework: {
    name: "@storybook/react-webpack5",
    options: {},
  },
}

export default config

// To customize your webpack configuration you can use the webpackFinal field.
// Check https://storybook.js.org/docs/react/builders/webpack#extending-storybooks-webpack-config
// and https://nx.dev/recipes/storybook/custom-builder-configs
