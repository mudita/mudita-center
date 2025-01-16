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
  fileTransferSendPrepared,
  sendFilesAbort,
  sendFilesAbortRegister,
  sendFilesChunkSent,
  sendFilesClear,
  sendFilesError,
  sendFilesFinished,
  sendFilesPreSend,
  addFileTransferErrors,
  clearFileTransferErrors,
} from "./actions"
import { sendFile } from "./send-file.action"
import { getFile } from "./get-file.action"
import { sendFiles } from "./send-files.action"

interface FileTransferError {
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

export type FileId = string | number
export type FileGroupId = string | number
export type ActionId = string

export type FileBase =
  | {
      id: FileId
      size: number
      path: string
      name: string
      groupId?: FileGroupId
    }
  | {
      id: FileId
      size: number
      base64: string
      name: string
      groupId?: FileGroupId
    }

type FileTransferPending = FileBase & {
  status: "pending"
}

export type FileTransferProgress = FileBase & {
  status: "in-progress"
  transferId: number
  progress: {
    chunksCount: number
    chunksTransferred: number
  }
}

export type FileTransferFailed = FileBase & {
  status: "finished"
  error: string
}

export type FileTransferSucceeded = FileBase & {
  status: "finished"
}

export type FileTransferFinished = FileTransferSucceeded | FileTransferFailed

export type File =
  | FileTransferPending
  | FileTransferProgress
  | FileTransferFinished

type ValidationErrorSomeFileLargerThan2GB = {
  status: "someFileLargerThan2GB"
}
type ValidationErrorAllFilesDuplicated = {
  status: "allFilesDuplicated"
}
type ValidationErrorNotHaveSpaceForUpload = {
  status: "notHaveSpaceForUpload"
  formattedDifference: string
}

export type FileTransferValidationErrorPayload =
  | ValidationErrorSomeFileLargerThan2GB
  | ValidationErrorAllFilesDuplicated
  | ValidationErrorNotHaveSpaceForUpload

export interface FileTransferValidationError {
  type: "validation"
  error: FileTransferValidationErrorPayload
}

export type FilesTransferError = FileTransferValidationError

interface FileTransferState {
  sendingFilesProgress: {
    [transferId: number]: FileProgress
  }
  sendingErrors?: FileTransferError[]
  receivingFilesProgress: {
    [transferId: number]: FileProgress
  }
  receivingErrors?: FileTransferError[]
  // New approach for transferring files
  filesTransferErrors: {
    [actionId: ActionId]: FilesTransferError[]
  }
  filesTransferSend: {
    [id: FileId]: File
  }
  filesTransferSendAbortActions: {
    [actionId: ActionId]: AbortController
  }
}

const initialState: FileTransferState = {
  sendingFilesProgress: {},
  sendingErrors: [],
  receivingFilesProgress: {},
  receivingErrors: [],
  // New approach for transferring files
  filesTransferErrors: {},
  filesTransferSend: {},
  filesTransferSendAbortActions: {},
}

export const genericFileTransferReducer = createReducer(
  initialState,
  (builder) => {
    builder.addCase(fileTransferSendPrepared, (state, action) => {
      state.sendingFilesProgress[action.payload.transferId] = {
        transferId: action.payload.transferId,
        filePath: action.payload.filePath,
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
    // New approach for transferring files
    builder.addCase(sendFiles.pending, (state, action) => {
      for (const file of action.meta.arg.files) {
        state.filesTransferSend[file.id] = { ...file, status: "pending" }
      }
    })
    builder.addCase(sendFiles.rejected, (state, action) => {
      delete state.filesTransferSendAbortActions[action.meta.requestId]
    })
    builder.addCase(sendFiles.fulfilled, (state, action) => {
      delete state.filesTransferSendAbortActions[action.meta.requestId]
    })
    builder.addCase(sendFilesPreSend, (state, action) => {
      const file = state.filesTransferSend[action.payload.id]
      file.status = "in-progress"
      ;(file as FileTransferProgress).transferId = action.payload.transferId
      ;(file as FileTransferProgress).progress = action.payload.progress
    })
    builder.addCase(sendFilesChunkSent, (state, action) => {
      const file = state.filesTransferSend[action.payload.id]
      if (file?.status === "in-progress") {
        file.progress.chunksTransferred = action.payload.chunksTransferred
      }
    })
    builder.addCase(sendFilesFinished, (state, action) => {
      const file = state.filesTransferSend[action.payload.id]
      file.status = "finished"
    })
    builder.addCase(sendFilesError, (state, action) => {
      const file = state.filesTransferSend[
        action.payload.id
      ] as FileTransferFailed
      file.status = "finished"
      file.error = action.payload.error
    })
    builder.addCase(sendFilesClear, (state, action) => {
      if ("groupId" in action.payload) {
        for (const file of Object.values(state.filesTransferSend)) {
          if (file.groupId === action.payload.groupId) {
            delete state.filesTransferSend[file.id]
          }
        }
      } else {
        for (const fileId of action.payload.filesIds) {
          delete state.filesTransferSend[fileId]
        }
      }
    })
    builder.addCase(sendFilesAbortRegister, (state, action) => {
      state.filesTransferSendAbortActions[action.payload.actionId] =
        action.payload.abortController
    })
    builder.addCase(sendFilesAbort.fulfilled, (state, action) => {
      delete state.filesTransferSendAbortActions[action.meta.arg]
    })
    builder.addCase(addFileTransferErrors, (state, action) => {
      const actionId = action.payload.actionId
      const errors = action.payload.errors
      state.filesTransferErrors[actionId] = [
        ...state.filesTransferErrors[actionId],
        ...errors,
      ]
    })
    builder.addCase(clearFileTransferErrors, (state, action) => {
      const actionId = action.payload.actionId
      delete state.filesTransferErrors[actionId]
    })
  }
)
