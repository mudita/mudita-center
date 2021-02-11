import Store from "electron-store"
import { app } from "electron"
import { name } from "../../../package.json"
import settingsSchema from "App/main/store/settings.schema"
import path from "path"

const settingsStore = new Store({
  name: "settings",
  cwd: path.join(app.getPath("appData"), name),
  schema: settingsSchema,
  clearInvalidConfig: process.env.NODE_ENV === "production",
})

export default settingsStore
