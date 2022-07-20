/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcRenderer } from "electron-better-ipc"
import { IpcFilesManagerRequest } from "App/files-manager/constants"
import { MetadataDeviceFile } from "App/files-manager/reducers"
import { RequestResponse } from "App/core/types"

export const getFilesRequest = async (): Promise<
  RequestResponse<MetadataDeviceFile[]>
> => {
  return ipcRenderer.callMain(IpcFilesManagerRequest.GetFiles)
}
