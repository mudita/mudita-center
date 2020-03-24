import { app } from "electron"
import { name } from "../../../package.json"
import { ipcMain } from "electron-better-ipc"
import fs from "fs-extra"
import getDefaultAppSettings, {
  AppSettings,
} from "App/main/default-app-settings"

export enum SettingsEvents {
  Update = "update-app-settings",
  Get = "get-app-settings",
  Reset = "reset-app-settings",
}

const registerSettingsListeners = () => {
  const defaultSettings = getDefaultAppSettings()
  const settingsFilePath = `${app.getPath("appData")}/${name}/settings.json`

  // If there's no settings file, create one with default settings
  if (!fs.readJsonSync(settingsFilePath, { throws: false })) {
    fs.writeJsonSync(settingsFilePath, defaultSettings)
  }

  ipcMain.answerRenderer(SettingsEvents.Reset, () => {
    return fs.writeJson(settingsFilePath, defaultSettings)
  })

  ipcMain.answerRenderer(
    SettingsEvents.Update,
    async (data: Partial<AppSettings>) => {
      const currentSettings = await fs.readJson(settingsFilePath)

      const updatedSettings = {
        ...currentSettings,
        ...data,
      }

      return fs.writeJson(settingsFilePath, updatedSettings)
    }
  )

  ipcMain.answerRenderer(SettingsEvents.Get, () => {
    return fs.readJson(settingsFilePath)
  })
}

export default registerSettingsListeners
