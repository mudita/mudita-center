import type { StorybookConfig } from "@storybook/react-webpack5"
import { plugins, rules } from "../webpack/common"
import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin"
import { RuleSetRule } from "webpack"

const { woff, woff2, tff, eot, tsx, css, scss, img, svg, js } = rules

const config: StorybookConfig = {
  stories: [
    "../../../libs/generic-view/ui/src/lib/**/*.@(mdx|stories.@(js|jsx|ts|tsx))",
  ],
  staticDirs: ["../src/fonts"],
  addons: [
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/addon-themes",
    "@nx/react/plugins/storybook",
    "storybook-react-intl",
  ],
  framework: {
    name: "@storybook/react-webpack5",
    options: {},
  },
  core: {
    builder: {
      name: "@storybook/builder-webpack5",
      options: {
        fsCache: true,
        lazyCompilation: true,
      },
    },
  },
  webpackFinal: async (config, { configType }) => {
    if (!config) {
      return config
    }

    config.module?.rules?.forEach((rule) => {
      // @ts-ignore
      if (rule?.["test"]?.test(".svg")) {
        // @ts-ignore
        rule!["exclude"] = /\.svg$/
      }

      return rule
    })

    config.plugins?.push(plugins.tsChecker)
    config.plugins?.push(plugins.define)
    config.plugins?.push(plugins.env)
    config.plugins?.push(new ReactRefreshWebpackPlugin())

    config.module?.rules?.push(woff)
    config.module?.rules?.push(woff2)
    config.module?.rules?.push(tff)
    config.module?.rules?.push(eot)
    config.module?.rules?.push(tsx(true, configType === "PRODUCTION"))
    config.module?.rules?.push(css)
    config.module?.rules?.push(scss)
    config.module?.rules?.push(img)
    config.module?.rules?.push(svg)
    config.module?.rules?.push(js as RuleSetRule)

    if (config.module?.rules) {
      config.module.rules.push({
        test: /\.(ts|tsx)$/,
        use: [
          {
            loader: require.resolve("ts-loader"),
            options: {
              reportFiles: [
                "../../../libs/generic-view/ui/src/lib/**/*.{ts,tsx}",
              ],
            },
          },
        ],
      })
    }

    return config
  },
}

export default config

// To customize your webpack configuration you can use the webpackFinal field.
// Check https://storybook.js.org/docs/react/builders/webpack#extending-storybooks-webpack-config
// and https://nx.dev/recipes/storybook/custom-builder-configs
