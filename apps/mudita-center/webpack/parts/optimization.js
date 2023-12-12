const TerserPlugin = require("terser-webpack-plugin")

module.exports = (production) => {
  const config = {
    minimize: production,
    nodeEnv: production ? "production" : "development",
  }

  if (production) {
    console.log("============================================")
    console.log("Using production mode to minimize the output")
    console.log("============================================")
    config.minimizer = [
      new TerserPlugin({
        terserOptions: {
          output: {
            comments: false,
          },
        },
      }),
    ]
  } else {
    console.log("=================================================")
    console.log("Development mode, no optimization will take place")
    console.log("=================================================")
  }

  return config
}
