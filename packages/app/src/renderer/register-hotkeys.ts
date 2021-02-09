/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import { AppHotkeys } from "App/hotkeys/hotkeys.types"
import hotkeys from "App/hotkeys/hotkeys"
import {
  toggleDevMode,
  togglePhoneSimulation,
} from "App/dev-mode/store/dev-mode.helpers"
import store from "Renderer/store"

type HotkeysList = {
  [key in AppHotkeys]: () => void
}

const devModeOnlyHotkeys: Partial<HotkeysList> = {
  [AppHotkeys.PhoneSimulation]: togglePhoneSimulation,
}

const registerHotkeys = () => {
  // Dev mode only hotkeys
  hotkeys.register(AppHotkeys.DevMode, () => {
    for (const [hotkey, callback] of Object.entries(devModeOnlyHotkeys)) {
      if (store.getState().devMode.enabled) {
        hotkeys.unregister(hotkey as AppHotkeys)
      } else {
        hotkeys.register(hotkey as AppHotkeys, callback as () => void)
      }
    }

    toggleDevMode()
  })

  // Global hotkeys
}

export default registerHotkeys
