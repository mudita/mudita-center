import { Application } from "spectron"
import path from "path"
import electron from "electron"

export const startApp = async (simulatePhoneConnection = false) => {
  return await new Application({
    path: (electron as unknown) as string,
    args: [path.join(__dirname, "../..")],
    env: {
      simulatePhoneConnection,
    },
    startTimeout: 10000,
    waitTimeout: 10000,
  }).start()
}

export const stopApp = async (app: any) => {
  if (app && app.isRunning()) {
    return await app.stop()
  }
}
