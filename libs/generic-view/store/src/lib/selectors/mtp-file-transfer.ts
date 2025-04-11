/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createSelector } from "@reduxjs/toolkit"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"

export const selectMtpUploads = (state: ReduxRootState) =>
  state.mtpFileTransfer.uploads

export const selectMtpUploadByTransactionId = createSelector(
  selectMtpUploads,
  (_: ReduxRootState, transactionId: string) => transactionId,
  (uploads, transactionId) => uploads[transactionId]
)

export const selectMtpFilesCount = createSelector(
  selectMtpUploads,
  (uploads) => Object.keys(uploads).length
)

export const selectMtpTransferProgress = createSelector(
  selectMtpUploads,
  (uploads) => {
    const all = Object.values(uploads)
    if (all.length === 0) return 0

    const totalProgress = all.reduce((sum, upload) => sum + upload.progress, 0)
    return Math.floor(totalProgress / all.length)
  }
)

export const selectMtpCurrentFile = createSelector(
  selectMtpUploads,
  (uploads) => {
    const inProgress = Object.values(uploads).find(
      (upload) => upload.status === "in-progress"
    )
    return inProgress?.filePath ?? null
  }
)

export const selectMtpUploadProgress = createSelector(
  selectMtpUploadByTransactionId,
  (upload) => upload?.progress ?? 0
)

export const selectMtpUploadStatus = createSelector(
  selectMtpUploadByTransactionId,
  (upload) => upload?.status ?? "in-progress"
)

export const selectMtpIsUploadFinished = createSelector(
  selectMtpUploadStatus,
  (status) => status === "finished"
)
