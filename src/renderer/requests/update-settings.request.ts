import { ipcRenderer } from "electron-better-ipc"
import { SettingsEvents } from "App/main/functions/register-settings-listeners"
import { Option } from "Renderer/components/rest/settings/option.enum"
import {
  ConversionFormat,
  Convert,
} from "Renderer/components/rest/settings/audio-conversion-radio-group.enum"

export type UpdateValueType = boolean | Convert | ConversionFormat

const updateSettingsRequest = (option: { [key in Option]?: UpdateValueType }) =>
  ipcRenderer.callMain<{ [key in Option]?: UpdateValueType }>(
    SettingsEvents.Update,
    option
  )

export default updateSettingsRequest
