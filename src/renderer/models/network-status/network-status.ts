import { Dispatch } from "Renderer/store"
import { Store } from "Renderer/models/network-status/network-status.interface"

export default {
  state: {
    online: true,
  },
  reducers: {
    update(state: Store, payload: any) {
      return { ...state, ...payload }
    },
  },
  effects: (dispatch: Dispatch) => ({
    updateOnlineStatus() {
      const online = navigator.onLine
      dispatch.networkStatus.update({
        online,
      })
    },
  }),
}
