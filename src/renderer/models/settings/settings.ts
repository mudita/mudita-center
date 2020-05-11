import { Dispatch } from "Renderer/store"
import { getAppSettings } from "Renderer/requests/app-settings.request"
import updateSettingsRequest, {
  UpdateType,
} from "Renderer/requests/update-settings.request"
import { Option } from "Renderer/components/rest/settings/settings-toggler.component"
import { AppSettings as StoreValues } from "App/main/default-app-settings"
import {
  ConversionFormat,
  Convert,
} from "Renderer/components/rest/settings/audio-conversion-radio-group.enum"

const updateSettings = async (
  property: Option,
  value: UpdateType,
  dispatch: Dispatch
) => {
  const propertyToUpdate = { [property]: value }
  await updateSettingsRequest(propertyToUpdate)
  dispatch.settings.update(propertyToUpdate)
}

export default {
  state: {},
  reducers: {
    update(state: StoreValues, payload: { [key in Option]?: boolean }) {
      return { ...state, ...payload }
    },
  },
  effects: (dispatch: Dispatch) => ({
    async loadSettings() {
      dispatch.settings.update(await getAppSettings())
    },
    async setAutostart(option: boolean) {
      await updateSettings(Option.Autostart, option, dispatch)
    },
    async setTethering(option: boolean) {
      await updateSettings(Option.Tethering, option, dispatch)
    },
    async setIncomingCalls(option: boolean) {
      await updateSettings(Option.IncomingCalls, option, dispatch)
    },
    async setIncomingMessages(option: boolean) {
      await updateSettings(Option.IncomingMessages, option, dispatch)
    },
    async setLowBattery(option: boolean) {
      await updateSettings(Option.LowBattery, option, dispatch)
    },
    async setOsUpdates(option: boolean) {
      await updateSettings(Option.OsUpdates, option, dispatch)
    },
    async setNonStandardAudioFilesConversion(option: boolean) {
      await updateSettings(
        Option.NonStandardAudioFilesConversion,
        option,
        dispatch
      )
    },
    async setConvert(option: Convert) {
      await updateSettings(Option.Convert, option, dispatch)
    },
    async setConversionFormat(option: ConversionFormat) {
      await updateSettings(Option.ConversionFormat, option, dispatch)
    },
  }),
}
