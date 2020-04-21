import { app, dialog } from "electron"
import { name } from "../../../package.json"
import { ipcMain } from "electron-better-ipc"
import fs from "fs-extra"
import getDefaultAppSettings, {
  AppSettings,
} from "App/main/default-app-settings"
import { LocationPath } from "Renderer/components/core/location/location.enum"

export enum SettingsEvents {
  Update = "update-app-settings",
  Get = "get-app-settings",
  Reset = "reset-app-settings",
  UpdateLocation = "update-location-settings",
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

  ipcMain.answerRenderer(
    SettingsEvents.UpdateLocation,
    async (location: LocationPath) => {
      const currentSettings = await fs.readJson(settingsFilePath)
      const { filePaths } = await dialog.showOpenDialog({
        properties: ["openDirectory"],
      })
      const getLocationProperty = (locationToUpdate: LocationPath) => {
        if (locationToUpdate === LocationPath.PureOsBackup) {
          return { pureOsBackupLocation: filePaths[0] }
        } else {
          return { pureOsDownloadLocation: filePaths[0] }
        }
      }

      const updatedSettings = {
        ...currentSettings,
        ...getLocationProperty(location),
      }

      return fs.writeJson(settingsFilePath, updatedSettings)
    }
  )
}

export default registerSettingsListeners
