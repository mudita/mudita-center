import { Dispatch } from "Renderer/store"
import { Store } from "Renderer/models/basic-info/interfaces"

const initialStateValue = {
  online: false,
}

export default {
  state: initialStateValue,
  reducers: {
    update(state: Store, payload: any) {
      return { ...state, ...payload }
    },
  },
  effects: (dispatch: Dispatch) => ({
    async getOnlineStatus() {
      console.log("lala")
      // const onlineStatus = window.navigator.onLine
      // dispatch.networkStatus.update({
      //   online: onlineStatus,
      // })
    },
  }),
}
