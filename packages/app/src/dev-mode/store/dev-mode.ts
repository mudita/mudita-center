/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { DevMode } from "App/dev-mode/store/dev-mode.interface"

const initialStateValue: DevMode = {
  enabled: false,
  phoneSimulation: false,
  showPhrase: false,
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
    enablePhraseMode(state: DevMode) {
      return { ...state, showPhrase: true }
    },
    disablePhraseMode(state: DevMode) {
      return { ...state, showPhrase: false }
    },
  },
}
