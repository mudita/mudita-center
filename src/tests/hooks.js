const Application = require("spectron").Application
const electron = require("electron")
const path = require("path")

module.exports = {
  async startApp() {
    const app = await new Application({
      path: electron,
      args: [path.join(__dirname, "../..")],

    }).start()
    return app
  },

  async stopApp(app) {
    if (app && app.isRunning()) {
      await app.stop()
    }
  },
}
