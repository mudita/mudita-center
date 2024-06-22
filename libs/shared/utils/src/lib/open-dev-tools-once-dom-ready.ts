/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { BrowserWindow } from "electron"

export function openDevToolsOnceDomReady(win: BrowserWindow) {
  // Open DevTools, see https://github.com/electron/electron/issues/12438 for why we wait for dom-ready
  win.webContents.once("dom-ready", () => {
    win.webContents.openDevTools()
  })

  win.webContents.once("dom-ready", () => {
    win.webContents.once("devtools-opened", () => {
      win.focus()
    })
    win.webContents.openDevTools()
  })
}
