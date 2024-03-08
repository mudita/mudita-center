/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcMain } from "electron-better-ipc"
import { LoggerFactory } from "Core/core/factories"
import { getMainAppWindow } from "shared/utils"

const logger = LoggerFactory.getInstance()

export const callRenderer = (event: string, payload?: unknown) => {
  const win = getMainAppWindow()

  if (win) {
    logger.info(JSON.stringify({ event, payload }, null, 2))
    void ipcMain.callRenderer(win, event, payload)
  } else {
    logger.info(
      JSON.stringify(
        { error: "Cannot identify main window", event, payload },
        null,
        2
      )
    )
  }
}
