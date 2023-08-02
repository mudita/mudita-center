/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createClient } from "App/__deprecated__/api/mudita-center-server/create-client"
import { ipcMain } from "electron-better-ipc"
import { ExternalDataApiEvent } from "App/device/constants/external-data-api-event.constant"

const registerExternalUsageDevice = (): void => {
  const client = createClient()

  ipcMain.answerRenderer(
    ExternalDataApiEvent.GetExternalUsageDevice,
    (serialNumber: string) => {
      return client.getExternalUsageDevice(serialNumber)
    }
  )
}

export default registerExternalUsageDevice
