import { ipcRenderer } from "electron-better-ipc"
import { AppSettings } from "App/main/default-app-settings"
import { LocationPath } from "App/renderer/modules/settings/tabs/backup/location-path.enum"
import { IpcRequest } from "Common/requests/ipc-request.enum"

export const getAppSettings = (): Promise<AppSettings> =>
  ipcRenderer.callMain(IpcRequest.GetAppSettings)

export const updateAppSettings = (
  settings: Partial<AppSettings>
): Promise<AppSettings> =>
  ipcRenderer.callMain(IpcRequest.UpdateAppSettings, settings)

export const resetAppSettings = (): Promise<AppSettings> => {
  return ipcRenderer.callMain(IpcRequest.ResetAppSettings)
}

export const updateLocationSettings = (
  location: LocationPath
): Promise<AppSettings> => {
  return ipcRenderer.callMain(IpcRequest.UpdateAppSettingsLocation, location)
}
