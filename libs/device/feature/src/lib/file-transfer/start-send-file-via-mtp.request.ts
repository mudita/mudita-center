/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcRenderer } from "electron-better-ipc"
import { UploadFileResultData } from "app-mtp"
import { MtpFileTransferServiceEvents } from "device/models"
import { ResultObject } from "Core/core/builder"
import { StartSendFilePayload } from "./mtp-file-transfer.service"

export const startSendFileViaMtpRequest = (
  payload: StartSendFilePayload
): Promise<ResultObject<UploadFileResultData>> => {
  return ipcRenderer.callMain(
    MtpFileTransferServiceEvents.StartSendFile,
    payload
  )
}
