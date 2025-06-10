/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { BrowserWindow } from "electron"

let mainAppWindow: BrowserWindow | null = null

export const setMainAppWindow = (win: BrowserWindow): void => {
  mainAppWindow = win
}

export const getMainAppWindow = (): BrowserWindow | null => {
  return mainAppWindow
}
