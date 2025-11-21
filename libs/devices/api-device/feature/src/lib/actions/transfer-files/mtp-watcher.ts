/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ApiDevice } from "devices/api-device/models"
import { prepareMtpTransfer } from "../mtp-shared/prepare-mtp-transfer"

export type MtpWatcher = {
  start: () => void
  stop: () => void
}

export type MtpWatcherFactory = (args: {
  onReconnect: () => void
  device: ApiDevice
}) => MtpWatcher

const checkMtpConnection = async (device: ApiDevice): Promise<boolean> => {
  const prepareMtpTransferResult = await prepareMtpTransfer({ device })
  return prepareMtpTransferResult.ok
}

export const createMtpWatcher: MtpWatcherFactory = ({
  device,
  onReconnect,
}) => {
  let intervalId: NodeJS.Timeout | null = null

  const start = () => {
    if (intervalId) {
      return
    }

    intervalId = setInterval(async () => {
      const isConnected = await checkMtpConnection(device)
      if (isConnected) {
        onReconnect()
      }
    }, 2500)
  }

  const stop = () => {
    if (intervalId) {
      clearInterval(intervalId)
      intervalId = null
    }
  }

  return {
    start,
    stop,
  }
}
