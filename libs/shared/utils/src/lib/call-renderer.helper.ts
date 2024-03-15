/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcMain } from "electron-better-ipc"
import { LoggerFactory } from "Core/core/factories"
import { ApiSerialPortToRendererEvents } from "device/models"
import { PureStrategyMainEvent } from "Core/device/strategies"
import { getMainAppWindow } from "./get-main-app-window"
import { AppEvents, DeviceManagerMainEvent } from "./main-event.constant"

const logger = LoggerFactory.getInstance()

export type CallRendererEvent =
  | ApiSerialPortToRendererEvents
  | DeviceManagerMainEvent
  | AppEvents
  | PureStrategyMainEvent

export const callRenderer = (event: CallRendererEvent, payload?: unknown) => {
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
