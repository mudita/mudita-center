/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { BrowserWindow, globalShortcut } from "electron"
import logger from "Core/__deprecated__/main/utils/logger"

export function registerShortcuts(win: BrowserWindow) {
  logger.info("xxxxregisterShortcuts1")
  logger.info(`xxxxregisterShortcuts1 ${process.env.DEV_TOOLS_SHORTCUT_ENABLED}`)
  if (process.env.DEV_TOOLS_SHORTCUT_ENABLED !== "1") {
    return
  }

  logger.info("xxxxregisterShortcuts2")

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
