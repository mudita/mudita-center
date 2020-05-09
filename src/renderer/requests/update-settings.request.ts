import { ipcRenderer } from "electron-better-ipc"
import { SettingsEvents } from "App/main/functions/register-settings-listeners"
import { AppSettings } from "App/main/default-app-settings"
import { Option } from "Renderer/components/rest/settings/settings-toggler.component"
import { Convert } from "Renderer/components/rest/settings/audio-conversion-radio-group.enum"

type UpdateType = boolean | Convert

const updateSettingsRequest = (option: { [key in Option]?: UpdateType }) =>
  ipcRenderer.callMain<Partial<AppSettings>>(SettingsEvents.Update, option)

export default updateSettingsRequest
