import { DevMode } from "App/dev-mode/store/dev-mode.interface"

const initialStateValue: DevMode = {
  devModeEnabled: false,
}

export default {
  state: initialStateValue,
  reducers: {
    toggle(state: Readonly<DevMode>) {
      return { devModeEnabled: !state.devModeEnabled }
    },
    enable() {
      return { devModeEnabled: true }
    },
    disable() {
      return { devModeEnabled: false }
    },
  },
}
