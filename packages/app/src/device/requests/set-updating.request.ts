/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcRenderer } from "electron-better-ipc"
import { IpcDeviceRequest } from "App/device/constants"

// This request is a tmp solution to manage `updating` state in `deviceManager` class
// The tech debt will be fixed as part ot tech task
// https://appnroll.atlassian.net/browse/CP-1765
export const setUpdatingRequest = async (updating: boolean): Promise<void> => {
  return ipcRenderer.callMain(IpcDeviceRequest.SetUpdating, updating)
}
