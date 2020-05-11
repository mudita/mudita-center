import { ipcRenderer } from "electron-better-ipc"
import { SettingsEvents } from "App/main/functions/register-settings-listeners"
import { Option } from "Renderer/components/rest/settings/settings-toggler.component"
import {
  ConversionFormat,
  Convert,
} from "Renderer/components/rest/settings/audio-conversion-radio-group.enum"

export type UpdateType = boolean | Convert | ConversionFormat

const updateSettingsRequest = (option: { [key in Option]?: UpdateType }) =>
  ipcRenderer.callMain<{ [key in Option]?: UpdateType }>(
    SettingsEvents.Update,
    option
  )

export default updateSettingsRequest
