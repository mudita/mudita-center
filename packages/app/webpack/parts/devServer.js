const { spawn } = require("child_process")

module.exports = {
  port: 2003,
  hot: "only",
  headers: { "Access-Control-Allow-Origin": "*" },
  historyApiFallback: {
    verbose: true,
    disableDotRule: false,
  },
  onBeforeSetupMiddleware() {
    if (process.env.START_HOT) {
      spawn("npm", ["run", "dev:start:main"], {
        shell: true,
        env: process.env,
        stdio: "inherit",
      })
        .on("close", (code) => process.exit(code))
        .on("error", (spawnError) => console.error(spawnError))
    }
  },
}
