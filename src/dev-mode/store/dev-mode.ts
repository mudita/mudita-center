import { DevMode } from "App/dev-mode/store/dev-mode.interface"

const initialStateValue: DevMode = {
  enabled: false,
  phoneSimulation: false,
}

export default {
  state: initialStateValue,
  reducers: {
    enableDevMode(state: DevMode) {
      return { ...state, enabled: true }
    },
    disableDevMode(state: DevMode) {
      return { ...state, enabled: false }
    },
    enablePhoneSimulation(state: DevMode) {
      return { ...state, phoneSimulation: true }
    },
    disablePhoneSimulation(state: DevMode) {
      return { ...state, phoneSimulation: false }
    },
  },
}
