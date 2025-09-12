/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcRenderer } from "electron-better-ipc"
import { ApiTestServiceEvents } from "device/models"
import { ResultObject } from "Core/core/builder"

export const sendSerialPortTestDataRequest = async (
  deviceId?: string,
  data?: string
): Promise<ResultObject<undefined>> => {
  console.log(data)
  return ipcRenderer.callMain(ApiTestServiceEvents.SendSerialPortTestData, {
    deviceId,
    data,
  })
}
