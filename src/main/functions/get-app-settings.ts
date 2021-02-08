import fs from "fs-extra"
import { app } from "electron"
import { name } from "../../../package.json"
import { AppSettings } from "App/main/store/settings.interface"

const getAppSettingsMain = (): Promise<AppSettings> => {
  return fs.readJSON(`${app.getPath("appData")}/${name}/settings.json`)
}

export default getAppSettingsMain
