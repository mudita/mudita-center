/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcRenderer } from "electron-better-ipc"
import { RequestResponse } from "App/core/types/request-response.interface"
import { IpcCrashDumpRequest } from "App/crash-dump/constants"

export const getCrashDumpsRequest = async (): Promise<
  RequestResponse<string[]>
> => {
  return ipcRenderer.callMain(IpcCrashDumpRequest.GetFiles)
}
