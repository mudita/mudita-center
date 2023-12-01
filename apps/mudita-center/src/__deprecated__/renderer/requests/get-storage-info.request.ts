/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import StorageInfo from "App/__deprecated__/common/interfaces/storage-info.interface"
import { IpcRequest } from "App/__deprecated__/common/requests/ipc-request.enum"
import { ipcRenderer } from "electron-better-ipc"
import { RequestResponse } from "App/core/types/request-response.interface"

const getStorageInfo = (): Promise<RequestResponse<StorageInfo>> =>
  ipcRenderer.callMain(IpcRequest.GetStorageInfo)

export default getStorageInfo
