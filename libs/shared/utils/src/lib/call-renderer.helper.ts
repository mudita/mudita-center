/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcMain } from "electron-better-ipc"
import { ApiSerialPortToRendererEvents } from "device/models"
import { AppUpdateEvent } from "electron/application-updater"
import { DeviceProtocolMainEvent } from "device-protocol/models"
import { LoggerFactory } from "Core/core/factories"
import { PureStrategyMainEvent } from "Core/device/strategies"
import { getMainAppWindow } from "./get-main-app-window"
import { AppEvents } from "./main-event.constant"
import { FileDialogToRendererEvents } from "system-utils/models"

const logger = LoggerFactory.getInstance()

export type CallRendererEvent =
  | ApiSerialPortToRendererEvents
  | DeviceProtocolMainEvent
  | AppEvents
  | PureStrategyMainEvent
  | AppUpdateEvent
  | FileDialogToRendererEvents

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
