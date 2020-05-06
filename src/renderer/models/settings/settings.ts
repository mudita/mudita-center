import { Dispatch } from "Renderer/store"
import { getAppSettings } from "Renderer/requests/app-settings.request"
import { Store } from "Renderer/models/settings/settings.interface"
import updateSettingsRequest from "Renderer/requests/update-settings.request"
import { AppSettings } from "App/main/default-app-settings"

export default {
  state: {},
  reducers: {
    update(state: Store, payload: Partial<AppSettings>) {
      return { ...state, ...payload }
    },
  },
  effects: (dispatch: Dispatch) => ({
    async loadSettings() {
      dispatch.settings.update(await getAppSettings())
    },
    async setAutostart(option: Record<string, boolean>) {
      await updateSettingsRequest(option)
      dispatch.settings.update(option)
    },
    async setTethering(option: Record<string, boolean>) {
      await updateSettingsRequest(option)
      dispatch.settings.update(option)
    },
  }),
}
