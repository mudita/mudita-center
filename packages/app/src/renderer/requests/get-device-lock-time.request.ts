/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { IpcRequest } from "Common/requests/ipc-request.enum"
import { ipcRenderer } from "electron-better-ipc"
import { GetPhoneLockTimeResponseBody } from "@mudita/pure"
import { RequestResponse } from "App/core/types/request-response.interface"

const getDeviceLockTime = (): Promise<
  RequestResponse<GetPhoneLockTimeResponseBody>
> => ipcRenderer.callMain(IpcRequest.GetDeviceLockTime)

export default getDeviceLockTime
