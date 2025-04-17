/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createReducer } from "@reduxjs/toolkit"
import {
  registerMtpUpload,
  updateMtpUploadProgress,
  finishMtpUpload,
  failMtpUpload,
  clearMtpUploads,
} from "./actions"

export type MtpUploadStatus = "pending" | "in-progress" | "finished" | "error"

export type MtpProgress = {
  transactionId: string
  deviceId: string
  storageId: string
  filePath: string
  destinationPath: string
  progress: number
  status: MtpUploadStatus
  error?: string
}

export interface MtpFileTransferState {
  uploads: Record<string, MtpProgress>
}

const initialState: MtpFileTransferState = {
  uploads: {},
}

export const mtpFileTransferReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(registerMtpUpload, (state, action) => {
      const { transactionId, deviceId, storageId, filePath, destinationPath } =
        action.payload
      state.uploads[transactionId] = {
        transactionId,
        deviceId,
        storageId,
        filePath,
        destinationPath,
        progress: 0,
        status: "pending",
      }
    })
    .addCase(updateMtpUploadProgress, (state, action) => {
      const { transactionId, progress } = action.payload
      const upload = state.uploads[transactionId]
      if (upload) {
        upload.progress = progress
        upload.status = "in-progress"
      }
    })
    .addCase(finishMtpUpload, (state, action) => {
      const upload = state.uploads[action.payload.transactionId]
      if (upload) {
        upload.progress = 100
        upload.status = "finished"
      }
    })
    .addCase(failMtpUpload, (state, action) => {
      const { transactionId, error } = action.payload
      const upload = state.uploads[transactionId]
      if (upload) {
        upload.status = "error"
        upload.error = error
      }
    })
    .addCase(clearMtpUploads, (state) => {
      state.uploads = {}
    })
})
