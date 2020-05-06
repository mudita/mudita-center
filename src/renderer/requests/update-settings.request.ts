import { ipcRenderer } from "electron-better-ipc"
import { SettingsEvents } from "App/main/functions/register-settings-listeners"
import { AppSettings } from "App/main/default-app-settings"
import { ToggleState } from "Renderer/modules/settings/settings-toggle-state.enum"

const updateSettingsRequest = (option: Record<string, ToggleState>) =>
  ipcRenderer.callMain<Partial<AppSettings>>(SettingsEvents.Update, option)

export default updateSettingsRequest
