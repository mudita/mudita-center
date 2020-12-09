import { DevMode } from "App/dev-mode/store/dev-mode.interface"

const initialStateValue: DevMode = {
  devModeEnabled: false,
  phoneSimulation: false,
}

export default {
  state: initialStateValue,
  reducers: {
    enableDevMode(state: DevMode) {
      return { ...state, devModeEnabled: true }
    },
    disableDevMode(state: DevMode) {
      return { ...state, devModeEnabled: false }
    },
    enablePhoneSimulation(state: DevMode) {
      return { ...state, phoneSimulation: true }
    },
    disablePhoneSimulation(state: DevMode) {
      return { ...state, phoneSimulation: false }
    },
  },
}
