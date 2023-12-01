/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { BrowserWindow } from "electron"
import { getCurrentWindow } from "@electron/remote"
import localShortcut from "electron-localshortcut"
import { AppHotkeys } from "App/__deprecated__/hotkeys/hotkeys.types"

/**
 * Creates a wrapper for "electron-localShortcut" to make registering hotkeys easier
 * @class
 */
class Hotkeys {
  private readonly window: BrowserWindow

  constructor() {
    this.window = getCurrentWindow()
  }

  public register(hotkey: AppHotkeys, callback: () => void) {
    localShortcut.register(this.window, hotkey, callback)
  }

  public unregister(hotkey: AppHotkeys) {
    localShortcut.unregister(this.window, hotkey)
  }
}

const hotkeys = new Hotkeys()

export default hotkeys
