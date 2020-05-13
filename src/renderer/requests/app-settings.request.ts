import { ipcRenderer } from "electron-better-ipc"
import { SettingsEvents } from "App/main/functions/register-settings-listeners"
import { AppSettings } from "App/main/default-app-settings"
import { LocationPath } from "App/renderer/modules/settings/tabs/backup/location-path.enum"

export const getAppSettings = (): Promise<AppSettings> => {
  return ipcRenderer.callMain(SettingsEvents.Get)
}

export const updateAppSettings = (
  settings: Partial<AppSettings>
): Promise<AppSettings> => {
  return ipcRenderer.callMain(SettingsEvents.Update, settings)
}

export const resetAppSettings = (): Promise<AppSettings> => {
  return ipcRenderer.callMain(SettingsEvents.Reset)
}

export const updateLocationSettings = (
  location: LocationPath
): Promise<AppSettings> => {
  return ipcRenderer.callMain(SettingsEvents.UpdateLocation, location)
}
