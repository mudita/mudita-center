/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcRenderer } from "electron-better-ipc"
import { RequestResponse } from "Core/core/types/request-response.interface"
import { IpcCrashDumpEvent } from "Core/crash-dump/constants"

export const getCrashDumpsRequest = async (): Promise<
  RequestResponse<string[]>
> => {
  return ipcRenderer.callMain(IpcCrashDumpEvent.GetFiles)
}
