import { Dispatch } from "Renderer/store"
import { getAppSettings } from "Renderer/requests/app-settings.request"
import { Store } from "Renderer/models/settings/settings.interface"
import { ToggleState } from "Renderer/modules/settings/settings-toggle-state.enum"
import updateSettingsRequest from "Renderer/requests/update-settings.request"

export default {
  state: {},
  reducers: {
    update(state: Store, payload: any) {
      return { ...state, ...payload }
    },
  },
  effects: (dispatch: Dispatch) => ({
    async loadSettings() {
      const settings = await getAppSettings()
      dispatch.settings.update(settings)
    },
    async setAutostart(option: Record<string, ToggleState>) {
      await updateSettingsRequest(option)
      dispatch.settings.update(option)
    },
    async setTethering(option: Record<string, ToggleState>) {
      await updateSettingsRequest(option)
      dispatch.settings.update(option)
    },
  }),
}
