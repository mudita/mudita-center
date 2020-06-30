import { Application } from "spectron"
import path from "path"
const electron = require("electron")

export const startApp = async () => {
  const app = await new Application({
    path: electron,
    args: [path.join(__dirname, "../..")],
  }).start()
  return app
}

export const stopApp = async (app: any) => {
  if (app && app.isRunning()) {
    await app.stop()
  }
}
