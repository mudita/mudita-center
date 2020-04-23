import { app, BrowserWindow, dialog } from "electron"
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

const registerSettingsListeners = (win: BrowserWindow) => {
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
      const {
        filePaths: [path],
        canceled,
      } = await dialog.showOpenDialog(win, {
        properties: ["openDirectory"],
      })
      const getLocationProperty = (
        locationToUpdate: LocationPath,
        dialogCancelled: boolean
      ) => {
        if (
          locationToUpdate === LocationPath.PureOsBackup &&
          !dialogCancelled
        ) {
          return { pureOsBackupLocation: path }
        } else if (
          locationToUpdate === LocationPath.PureOsDownload &&
          !dialogCancelled
        ) {
          return { pureOsDownloadLocation: path }
        } else {
          return null
        }
      }
      const updatedSettings = {
        ...currentSettings,
        ...getLocationProperty(location, canceled),
      }
      return fs.writeJson(settingsFilePath, updatedSettings)
    }
  )
}

export default registerSettingsListeners
