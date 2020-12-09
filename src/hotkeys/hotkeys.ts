import { BrowserWindow } from "electron"
import * as electron from "electron"
import localShortcut from "electron-localshortcut"
import { AppHotkeys } from "App/hotkeys/hotkeys.types"

/**
 * Creates a wrapper for "electron-localShortcut" to make registering hotkeys easier
 * @class
 */
class Hotkeys {
  private readonly window: BrowserWindow

  constructor() {
    this.window = electron.remote.getCurrentWindow()
  }

  register(hotkey: AppHotkeys, callback: () => void) {
    localShortcut.register(this.window, hotkey, callback)
  }
}

const hotkeys = new Hotkeys()

export default hotkeys
