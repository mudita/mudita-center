/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { BrowserWindow, globalShortcut } from "electron"

export function registerShortcuts(win: BrowserWindow) {
  if (process.env.DEV_TOOLS_SHORTCUT_ENABLED !== "1") {
    return
  }

  const devToolsShortcutKey =
    process.platform === "darwin" ? "Command+Option+I" : "Ctrl+Shift+I"

  win.on("focus", () => {
    globalShortcut.register(devToolsShortcutKey, () => {
      win.webContents.toggleDevTools()
    })
  })

  win.on("blur", () => {
    globalShortcut.unregister(devToolsShortcutKey)
  })
}
