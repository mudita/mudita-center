/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ResultObject } from "Core/core/builder"
import { ipcRenderer } from "electron-better-ipc"
import { APIOutboxServiceEvents, Outbox } from "device/models"
import { DeviceId } from "Core/device/constants/device-id"

export const getOutboxDataRequest = (
  deviceId: DeviceId
): Promise<ResultObject<Outbox>> => {
  return ipcRenderer.callMain(APIOutboxServiceEvents.GetOutboxData, deviceId)
}
