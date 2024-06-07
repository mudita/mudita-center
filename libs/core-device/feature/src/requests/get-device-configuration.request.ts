/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcRenderer } from "electron-better-ipc"
import { ResultObject } from "Core/core/builder"
import { DeviceId } from "Core/device/constants/device-id"
import { DeviceConfiguration } from "../controllers"
import { IpcCoreDeviceEvent } from "../constants"

export const getDeviceConfigurationRequest = async (
  id: DeviceId
): Promise<ResultObject<DeviceConfiguration>> => {
  return ipcRenderer.callMain(IpcCoreDeviceEvent.GetCoreDeviceConfiguration, id)
}
