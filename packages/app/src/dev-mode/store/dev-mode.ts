/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { DevMode } from "App/dev-mode/store/dev-mode.interface"

const initialStateValue: DevMode = {
  enabled: false,
  pureSimulation: false,
  harmonySimulation: false,
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
    enablepureSimulation(state: DevMode) {
      return { ...state, pureSimulation: true }
    },
    disablepureSimulation(state: DevMode) {
      return { ...state, pureSimulation: false }
    },
    enableHarmonySimulation(state: DevMode) {
      return { ...state, harmonySimulation: true }
    },
    disableHarmonySimulation(state: DevMode) {
      return { ...state, harmonySimulation: false }
    },
  },
}
