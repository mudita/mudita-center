/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { BrowserWindow } from "electron"

export const getMainAppWindow = (): BrowserWindow | undefined => {
  return BrowserWindow.getAllWindows().find(({ id }) => id === 1)
}
