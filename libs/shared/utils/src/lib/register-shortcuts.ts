/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { BrowserWindow, globalShortcut } from "electron"

export function registerShortcuts(win: BrowserWindow) {
  if (process.env.DEV_TOOLS_SHORTCUT_ENABLED !== "1") {
    return
  }

  if (process.platform === "darwin") {
    globalShortcut.register("Command+Option+I", () => {
      win.webContents.toggleDevTools()
    })
  } else {
    globalShortcut.register("Ctrl+Shift+I", () => {
      win.webContents.toggleDevTools()
    })
  }
}
