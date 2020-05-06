import { ipcRenderer } from "electron-better-ipc"
import { SettingsEvents } from "App/main/functions/register-settings-listeners"
import { AppSettings } from "App/main/default-app-settings"

const updateSettingsRequest = (option: Record<string, boolean>) =>
  ipcRenderer.callMain<Partial<AppSettings>>(SettingsEvents.Update, option)

export default updateSettingsRequest
