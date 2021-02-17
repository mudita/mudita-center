/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import StorageInfo from "Common/interfaces/storage-info.interface"
import { IpcRequest } from "Common/requests/ipc-request.enum"
import { ipcRenderer } from "electron-better-ipc"
import DeviceResponse from "Backend/adapters/device-response.interface"

const getStorageInfo = (): Promise<DeviceResponse<StorageInfo>> =>
  ipcRenderer.callMain(IpcRequest.GetStorageInfo)

export default getStorageInfo
