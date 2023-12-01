/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { DevMode } from "App/__deprecated__/dev-mode/store/dev-mode.interface"

const initialStateValue: DevMode = {
  enabled: false,
  pureSimulation: false,
  harmonySimulation: false,
}

export default {
  state: initialStateValue,
  reducers: {
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    enableDevMode(state: DevMode) {
      return { ...state, enabled: true }
    },
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    disableDevMode(state: DevMode) {
      return { ...state, enabled: false }
    },
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    enablePureSimulation(state: DevMode) {
      return { ...state, pureSimulation: true }
    },
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    disablePureSimulation(state: DevMode) {
      return { ...state, pureSimulation: false }
    },
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    enableHarmonySimulation(state: DevMode) {
      return { ...state, harmonySimulation: true }
    },
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    disableHarmonySimulation(state: DevMode) {
      return { ...state, harmonySimulation: false }
    },
  },
}
