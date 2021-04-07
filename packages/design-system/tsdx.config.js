const postcss = require("rollup-plugin-postcss")
const autoprefixer = require("autoprefixer")
const cssnano = require("cssnano")
const reactSvg = require("rollup-plugin-react-svg")

module.exports = {
  rollup(config, options) {
    config.plugins.push(
      postcss({
        plugins: [
          autoprefixer(),
          cssnano({
            preset: "default",
          }),
        ],
        inject: false,
        // only write out CSS for the first bundle (avoids pointless extra files):
        extract: !!options.writeMeta,
      })
    )

    // config.plugins.unshift(image())
    config.plugins.unshift(
      reactSvg({
        // svgo options
        svgo: {
          plugins: [], // passed to svgo
          multipass: true,
        },

        // whether to output jsx
        jsx: false,

        // include: string
        include: null,

        // exclude: string
        exclude: null,
      })
    )

    return config
  },
}
