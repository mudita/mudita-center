/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createReducer } from "@reduxjs/toolkit"
import { sendFile } from "./send-file.action"
import { fileTransferChunkSent, fileTransferPrepared } from "./actions"
import { AppErrorType } from "Core/core/errors"

export interface FileTransferError {
  code?: AppErrorType
  message?: string
  filePath?: string
  transferId?: number
}

export interface FileProgress {
  transferId: number
  chunksCount: number
  chunksTransferred: number
}

interface FileTransferState {
  sendingFilesProgress: {
    [transferId: number]: FileProgress
  }
  sendingErrors?: FileTransferError[]
  receivingFilesProgress: {
    [transferId: number]: FileProgress
  }
  receivingErrors?: FileTransferError[]
}

const initialState: FileTransferState = {
  sendingFilesProgress: {},
  sendingErrors: [],
  receivingFilesProgress: {},
  receivingErrors: [],
}

export const genericFileTransferReducer = createReducer(
  initialState,
  (builder) => {
    builder.addCase(fileTransferPrepared, (state, action) => {
      state.sendingFilesProgress[action.payload.transferId] = {
        transferId: action.payload.transferId,
        chunksCount: action.payload.chunksCount,
        chunksTransferred: 0,
      }
    })
    builder.addCase(fileTransferChunkSent, (state, action) => {
      state.sendingFilesProgress[action.payload.transferId].chunksTransferred =
        action.payload.chunksTransferred
    })
    builder.addCase(sendFile.fulfilled, (state, action) => {
      delete state.sendingFilesProgress[action.payload.transferId]
    })
    builder.addCase(sendFile.rejected, (state, action) => {
      const { transferId, filePath } = action.payload?.error.payload || {}
      if (transferId) {
        delete state.sendingFilesProgress[transferId]
      }
      state.sendingErrors?.push({
        code: action.payload?.error.type,
        message: action.payload?.error.message,
        transferId,
        filePath,
      })
    })
  }
)
