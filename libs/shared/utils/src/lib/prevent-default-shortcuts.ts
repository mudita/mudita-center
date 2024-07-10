/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { BrowserWindow } from "electron"

export function preventDefaultShortcuts(win: BrowserWindow) {
  win.webContents.on("before-input-event", (event, input) => {
    const { control, meta } = input
    const key = input.key.toLowerCase()

    // Prevent default refresh shortcut (Ctrl+R or Cmd+R)
    if ((control || meta) && key === "r") {
      event.preventDefault()
    }

    // Prevent default DevTools shortcut (Ctrl+Shift+I or Cmd+Opt+I) and 'dead' key issue
    // This is necessary because removing the menu in Windows/Linux disables the shortcut,
    // but on macOS, the shortcut still works. Therefore, we need to explicitly prevent it.
    if ((control || meta) && (key === "dead" || key === "i")) {
      event.preventDefault()
    }
  })
}
