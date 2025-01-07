/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createReducer } from "@reduxjs/toolkit"
import { AppErrorType } from "Core/core/errors"
import {
  clearGetErrors,
  clearSendErrors,
  fileTransferChunkGet,
  fileTransferChunkSent,
  fileTransferGetPrepared,
  fileTransferSendPostProcessing,
  fileTransferSendPrepared,
} from "./actions"
import { sendFile } from "./send-file.action"
import { getFile } from "./get-file.action"

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
  filePath?: string
}

export interface PostProcessingFileProgress {
  progress?: number
  transferId: number
}

interface FileTransferState {
  sendingFilesProgress: {
    [transferId: number]: FileProgress
  }
  postProcessingProgress: {
    [transferId: number]: PostProcessingFileProgress
  }
  sendingErrors?: FileTransferError[]
  receivingFilesProgress: {
    [transferId: number]: FileProgress
  }
  receivingErrors?: FileTransferError[]
}

const initialState: FileTransferState = {
  sendingFilesProgress: {},
  postProcessingProgress: {},
  sendingErrors: [],
  receivingFilesProgress: {},
  receivingErrors: [],
}

export const genericFileTransferReducer = createReducer(
  initialState,
  (builder) => {
    builder.addCase(fileTransferSendPrepared, (state, action) => {
      state.sendingFilesProgress[action.payload.transferId] = {
        transferId: action.payload.transferId,
        chunksCount: action.payload.chunksCount,
        chunksTransferred: 0,
      }
    })
    builder.addCase(fileTransferChunkSent, (state, action) => {
      if (state.sendingFilesProgress[action.payload.transferId]) {
        state.sendingFilesProgress[
          action.payload.transferId
        ].chunksTransferred = action.payload.chunksTransferred
      }
    })
    builder.addCase(fileTransferSendPostProcessing, (state, action) => {
      state.postProcessingProgress[action.payload.transferId] = action.payload
    })
    builder.addCase(sendFile.fulfilled, (state, action) => {
      delete state.sendingFilesProgress[action.payload.transferId]
    })
    builder.addCase(sendFile.rejected, (state, action) => {
      if (action.meta.aborted && "filePath" in action.meta.arg) {
        const transfer = Object.entries(state.receivingFilesProgress).find(
          ([, item]) =>
            "filePath" in action.meta.arg &&
            item.filePath === action.meta.arg.filePath
        )
        if (transfer) {
          const transferId = Number(transfer[0])
          delete state.receivingFilesProgress[transferId]
        }
      } else {
        const { transferId, filePath } =
          action.payload?.error.payload ||
          ("transferId" in action.meta.arg && {
            transferId: action.meta.arg.transferId,
          }) ||
          {}
        if (transferId) {
          delete state.sendingFilesProgress[transferId]
        }
        state.sendingErrors?.push({
          code: action.payload?.error.type,
          message: action.payload?.error.message,
          transferId,
          filePath,
        })
      }
    })
    builder.addCase(clearSendErrors, (state, action) => {
      state.sendingErrors = state.sendingErrors?.filter(
        (error) => error.transferId !== action.payload.transferId
      )
    })
    builder.addCase(fileTransferGetPrepared, (state, action) => {
      state.receivingFilesProgress[action.payload.transferId] = {
        transferId: action.payload.transferId,
        chunksCount: action.payload.chunksCount,
        chunksTransferred: 0,
        filePath: action.payload.filePath,
      }
    })
    builder.addCase(fileTransferChunkGet, (state, action) => {
      state.receivingFilesProgress[
        action.payload.transferId
      ].chunksTransferred = action.payload.chunksTransferred
    })
    builder.addCase(getFile.fulfilled, (state, action) => {
      delete state.receivingFilesProgress[action.payload.transferId]
    })
    builder.addCase(getFile.rejected, (state, action) => {
      if (action.meta.aborted) {
        const transfer = Object.entries(state.receivingFilesProgress).find(
          ([, item]) => item.filePath === action.meta.arg.filePath
        )
        if (transfer) {
          const transferId = Number(transfer[0])
          delete state.receivingFilesProgress[transferId]
        }
      } else {
        const { transferId, filePath } = action.payload?.error.payload || {}
        if (transferId) {
          delete state.receivingFilesProgress[transferId]
        }
        state.receivingErrors?.push({
          code: action.payload?.error.type,
          message: action.payload?.error.message,
          transferId,
          filePath,
        })
      }
    })
    builder.addCase(clearGetErrors, (state, action) => {
      state.receivingErrors = state.receivingErrors?.filter(
        (error) => error.transferId !== action.payload.transferId
      )
    })
  }
)
