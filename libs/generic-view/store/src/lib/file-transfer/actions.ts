/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAction, createAsyncThunk } from "@reduxjs/toolkit"
import { ActionName } from "../action-names"
import {
  ActionId,
  FileGroupId,
  FileId,
  FileProgress,
  FilesTransferError,
  FileTransferFailed,
  FileTransferFinished,
  FileTransferProgress,
} from "./reducer"
import { SendFileErrorPayload } from "./legacy-send-file.action"
import { GetFileErrorPayload } from "./get-file.action"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import { AppError } from "Core/core/errors"
import { ApiFileTransferError } from "device/models"
import { FilesTransferMode } from "./files-transfer.type"

export const fileTransferSendPrepared = createAction<
  Pick<FileProgress, "chunksCount" | "transferId" | "filePath">
>(ActionName.PreFileTransferSend)
export const fileTransferChunkSent = createAction<
  Pick<FileProgress, "chunksTransferred" | "transferId">
>(ActionName.ChunkFileTransferSend)
export const clearSendErrors = createAction<SendFileErrorPayload>(
  ActionName.ClearFileTransferSendError
)
export const fileTransferGetPrepared = createAction<
  Pick<FileProgress, "chunksCount" | "transferId" | "filePath">
>(ActionName.PreFileTransferGet)
export const fileTransferChunkGet = createAction<
  Pick<FileProgress, "chunksTransferred" | "transferId">
>(ActionName.ChunkFileTransferGet)
export const clearGetErrors = createAction<GetFileErrorPayload>(
  ActionName.ClearFileTransferGetError
)

// New approach for transferring files
export const sendFilesPreSend = createAction<
  Pick<FileTransferProgress, "id" | "transferId" | "progress" | "size">
>(ActionName.SendFilesPreSend)
export const sendFilesChunkSent = createAction<
  Pick<FileTransferProgress, "id"> & Pick<FileProgress, "chunksTransferred">
>(ActionName.SendFilesChunkSent)
export const sendFilesFinished = createAction<Pick<FileTransferFinished, "id">>(
  ActionName.SendFilesFinished
)
export const sendFilesError = createAction<
  Pick<NonNullable<FileTransferFailed>, "id" | "error">
>(ActionName.SendFilesError)
export const sendFilesClear = createAction<
  { groupId: FileGroupId } | { filesIds: FileId[] } | undefined
>(ActionName.SendFilesClear)
export const sendFilesAbortRegister = createAction<{
  actionId: ActionId
  abortController: AbortController
}>(ActionName.SendFilesAbortRegister)

export const sendFilesAbort = createAsyncThunk<
  void,
  ActionId | undefined,
  { state: ReduxRootState }
>(ActionName.SendFilesAbort, (actionId, { getState, dispatch }) => {
  const { filesTransferSendAbortActions, filesTransferSend } =
    getState().genericFileTransfer
  if (!actionId) {
    Object.values(filesTransferSendAbortActions).forEach(({ abort }) => {
      abort()
    })
  } else {
    filesTransferSendAbortActions[actionId]?.abort()
  }

  for (const file of Object.values(filesTransferSend)) {
    if (!actionId) {
      dispatch(
        sendFilesError({
          id: file.id,
          error: new AppError(ApiFileTransferError.Aborted, "Aborted"),
        })
      )
      continue
    }
    if (file.groupId === actionId && file.status === "pending") {
      dispatch(
        sendFilesError({
          id: file.id,
          error: new AppError(ApiFileTransferError.Aborted, "Aborted"),
        })
      )
    }
  }
})

export const addFileTransferErrors = createAction<{
  actionId: ActionId
  errors: FilesTransferError[]
}>(ActionName.addFileTransferErrors)

export const clearFileTransferErrors = createAction<{ actionId: ActionId }>(
  ActionName.clearFileTransferErrors
)

export const setFilesTransferMode = createAction<FilesTransferMode>(
  ActionName.setFilesTransferMode
)

export const setModeWithProgressReset = createAction<{
  fileId: FileId
  filesTransferMode: FilesTransferMode
}>(ActionName.setModeWithProgressReset)

export const trackInfo = createAction<{
  fileId: FileId
  mode: FilesTransferMode
}>(ActionName.TrackInfo)
