/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcRenderer } from "electron-better-ipc"
import { RequestResponse } from "App/core/types/request-response.interface"
import { IpcCrashDumpRequest } from "App/crash-dump/constants"

export const ignoreCrashDumpRequest = async (
  url: string
): Promise<RequestResponse<void>> => {
  return ipcRenderer.callMain(IpcCrashDumpRequest.Ignore, url)
}
