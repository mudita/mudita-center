import { Dispatch } from "redux"
import { InitialState } from "./interfaces"

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
    updatePhoneBasicInfo(state: InitialState, payload: InitialState) {
      return { ...payload }
    },
  },
  effects: (dispatch: Dispatch) => ({
    updatePhoneBasicInfo(basicInfo: InitialState) {
      this.updatePhoneBasicInfo(basicInfo)
    },
  }),
}
