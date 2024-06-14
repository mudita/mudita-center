/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcRenderer } from "electron-better-ipc"
import { ResultObject } from "Core/core/builder"
import { DeviceId } from "Core/device/constants/device-id"
import { IpcActiveDeviceRegistryEvent } from "../constants"

export const setActiveDeviceRequest = async (
  id: DeviceId | undefined
): Promise<ResultObject<boolean>> => {
  return ipcRenderer.callMain(IpcActiveDeviceRegistryEvent.SetActiveDevice, id)
}
