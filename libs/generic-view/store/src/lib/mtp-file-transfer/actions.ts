/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAction } from "@reduxjs/toolkit"
import { ActionName } from "../action-names"

export const registerMtpUpload = createAction<{
  transactionId: string
  deviceId: string
  storageId: string
  filePath: string
  destinationPath: string
}>(ActionName.RegisterMtpUpload)

export const updateMtpUploadProgress = createAction<{
  transactionId: string
  progress: number
}>(ActionName.UpdateMtpUploadProgress)

export const finishMtpUpload = createAction<{
  transactionId: string
}>(ActionName.FinishMtpUpload)

export const failMtpUpload = createAction<{
  transactionId: string
  error: string
}>(ActionName.FailMtpUpload)

export const clearMtpUploads = createAction(ActionName.ClearMtpUploads)
