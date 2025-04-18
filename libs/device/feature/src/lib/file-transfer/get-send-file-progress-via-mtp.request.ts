/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcRenderer } from "electron-better-ipc"
import { GetUploadFileProgressResultData } from "app-mtp"
import { MtpFileTransferServiceEvents } from "device/models"
import { ResultObject } from "Core/core/builder"

export const getSendFileProgressViaMtpRequest = (
  transactionId: string
): Promise<ResultObject<GetUploadFileProgressResultData>> => {
  return ipcRenderer.callMain(
    MtpFileTransferServiceEvents.GetSendFileProgress,
    transactionId
  )
}
