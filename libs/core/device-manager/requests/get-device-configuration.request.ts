/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcRenderer } from "electron-better-ipc"
import { ResultObject } from "Core/core/builder"
import { IpcDeviceManagerEvent } from "Core/device-manager/constants"
import { DeviceId } from "Core/device/constants/device-id"
import { DeviceConfiguration } from "Core/device-manager/controllers"

export const getDeviceConfigurationRequest = async (
  id: DeviceId
): Promise<ResultObject<DeviceConfiguration>> => {
  return ipcRenderer.callMain(IpcDeviceManagerEvent.GetDeviceConfiguration, id)
}
