import getDeviceInfo from "Renderer/requests/get-device-info.request"
import getNetworkInfo from "Renderer/requests/get-network-info.request"
import { InitialState } from "./interfaces"

// TODO: implement mock store feature.
const initialState = {
  simCards: [],
  batteryLevel: 0,
  networkName: null,
  osVersion: "1.0",
  memorySpace: {
    free: 0,
    full: 16000000000,
  },
  lastBackup: "10.11.2019",
}

export default {
  state: initialState,
  reducers: {
    update(state: InitialState, payload: InitialState) {
      return { ...state, ...payload }
    },
  },
  effects: (dispatch: any) => ({
    updatePhoneBasicInfo(basicInfo: InitialState) {
      this.updatePhoneBasicInfo(basicInfo)
    },
    async loadData() {
      const info = await getDeviceInfo()
      const networkInfo = await getNetworkInfo()
      dispatch.basicInfo.update({
        modelName: info.modelName,
        simCards: networkInfo.simCards,
      })
    },
  }),
}
