import { DevMode } from "Renderer/models/dev-mode/dev-mode.interface"

const initialStateValue: DevMode = {
  isDevModeEnabled: false,
}

export default {
  state: initialStateValue,
  reducers: {
    toggle(state: Readonly<DevMode>) {
      return { isDevModeEnabled: !state.isDevModeEnabled }
    },
    enable() {
      return { isDevModeEnabled: true }
    },
    disable() {
      return { isDevModeEnabled: false }
    },
  },
}
