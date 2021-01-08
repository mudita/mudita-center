import { DevMode } from "App/dev-mode/store/dev-mode.interface"
import { createModel } from "@rematch/core"
import { RootModel } from "Renderer/models/models"

const initialStateValue: DevMode = {
  enabled: false,
  phoneSimulation: false,
}

const devMode = createModel<RootModel>({
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
})

export default devMode
