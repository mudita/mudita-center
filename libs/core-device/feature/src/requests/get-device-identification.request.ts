/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcRenderer } from "electron-better-ipc"
import { ResultObject } from "Core/core/builder"
import { DeviceId } from "Core/device/constants/device-id"
import { DeviceIdentification } from "../controllers"
import { IpcCoreDeviceEvent } from "../constants"

export const getDeviceIdentificationRequest = async (
  id: DeviceId
): Promise<ResultObject<DeviceIdentification>> => {
  return ipcRenderer.callMain(
    IpcCoreDeviceEvent.GetCoreDeviceIdentification,
    id
  )
}
