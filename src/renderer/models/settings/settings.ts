import { Dispatch } from "Renderer/store"
import { getAppSettings } from "Renderer/requests/app-settings.request"
import { Store } from "Renderer/models/settings/settings.interface"

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
  }),
}
