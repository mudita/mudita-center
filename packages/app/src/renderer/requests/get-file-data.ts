/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcRenderer } from "electron-better-ipc"
import {
  FileData,
  GetFileDataEvents,
  GetFileDataProps,
} from "App/main/functions/register-get-file-data-listener"
import { RequestResponse } from "App/core/types/request-response.interface"

const getFileData = (
  props: GetFileDataProps
): Promise<RequestResponse<FileData[]>> =>
  ipcRenderer.callMain(GetFileDataEvents.Get, props)

export default getFileData
