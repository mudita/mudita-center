module.exports = {
  stories: ["../**/*.stories.tsx"],
  addons: [
    "@storybook/addon-actions",
    "@storybook/addon-knobs",
    "@storybook/addon-links",
    "@storybook/addons",
  ],
  webpackFinal: async (config) => {
    config.node = { fs: "empty", child_process: "empty", serialport: "empty" }
    return config
  },
}
