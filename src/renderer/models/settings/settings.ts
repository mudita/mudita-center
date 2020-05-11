import { Dispatch } from "Renderer/store"
import { getAppSettings } from "Renderer/requests/app-settings.request"
import updateSettingsRequest from "Renderer/requests/update-settings.request"
import { Option } from "Renderer/components/rest/settings/settings-toggler.component"
import { AppSettings as StoreValues } from "App/main/default-app-settings"

const updateSettings = async (
  property: Option,
  value: boolean,
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
    setAutostart(option: boolean) {
      updateSettings(Option.Autostart, option, dispatch)
    },
    setTethering(option: boolean) {
      updateSettings(Option.Tethering, option, dispatch)
    },
    setIncomingCalls(option: boolean) {
      updateSettings(Option.IncomingCalls, option, dispatch)
    },
    setIncomingMessages(option: boolean) {
      updateSettings(Option.IncomingMessages, option, dispatch)
    },
    setLowBattery(option: boolean) {
      updateSettings(Option.LowBattery, option, dispatch)
    },
    setOsUpdates(option: boolean) {
      updateSettings(Option.OsUpdates, option, dispatch)
    },
  }),
}
