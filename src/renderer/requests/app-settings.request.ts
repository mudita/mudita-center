import { ipcRenderer } from "electron-better-ipc"
import {
  AppSettings,
  SettingsUpdateOption,
} from "App/main/store/settings.interface"
import { IpcRequest } from "Common/requests/ipc-request.enum"

export const getAppSettings = (): Promise<AppSettings> =>
  ipcRenderer.callMain(IpcRequest.GetAppSettings)

export const updateAppSettings = (
  option: SettingsUpdateOption
): Promise<Partial<AppSettings>> =>
  ipcRenderer.callMain(IpcRequest.UpdateAppSettings, option)

export const resetAppSettings = (): Promise<AppSettings> =>
  ipcRenderer.callMain(IpcRequest.ResetAppSettings)
