import { Application } from "spectron"
import path from "path"
import electron from "electron"

export const startApp = async () =>
  await new Application({
    path: (electron as unknown) as string,
    args: [path.join(__dirname, "../..")],
  }).start()

export const stopApp = async (app: any) => {
  if (app && app.isRunning()) {
    await app.stop()
  }
}
