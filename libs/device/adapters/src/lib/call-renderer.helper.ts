/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { LoggerFactory } from "Core/core/factories"
import { ipcMain } from "electron-better-ipc"
import { ApiSerialPortToRendererEvents } from "device/models"
import { DeviceManagerMainEvent, getMainAppWindow } from "shared/utils"

const logger = LoggerFactory.getInstance()

export type CallRendererEvent =
  | ApiSerialPortToRendererEvents
  | DeviceManagerMainEvent

export const callRenderer = (event: CallRendererEvent, payload?: unknown) => {
  const win = getMainAppWindow()

  if (win) {
    logger.info(JSON.stringify({ event, payload }, null, 2))
    ipcMain.callRenderer(win, event, payload)
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
