/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { ApiFileTransferError } from "device/models"
import { delay } from "shared/utils"
import {
  cancelSendFileViaMtpRequest,
  getSendFileProgressViaMtpRequest,
  startSendFileViaMtpRequest,
} from "device/feature"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import { AppError } from "Core/core/errors"
import { FileWithPath } from "./reducer"
import {
  sendFilesChunkSent,
  sendFilesFinished,
  sendFilesPreSend,
  trackInfo,
} from "./actions"
import { ActionName } from "../action-names"
import { FilesTransferMode } from "./files-transfer.type"

export interface SendFileViaMTPPayload {
  file: FileWithPath
  deviceId: string
  storageId: string
  destinationPath: string
  action?: string
}

export const sendFileViaMTP = createAsyncThunk<
  void,
  SendFileViaMTPPayload,
  {
    state: ReduxRootState
  }
>(
  ActionName.SendFileViaMTP,
  async (
    { file, deviceId, destinationPath, storageId, action },
    { dispatch, signal, rejectWithValue }
  ) => {
    const handleAbort = async () => {
      const { ok, error } = await cancelSendFileViaMtpRequest(transactionId)
      if (
        !ok &&
        error.type === ApiFileTransferError.MtpCancelFailedAlreadyTransferred
      ) {
        dispatch(
          sendFilesFinished({
            id: file.id,
          })
        )
      }

      return rejectWithValue(
        new AppError(ApiFileTransferError.Aborted, "Aborted")
      )
    }

    const startSendFileViaMtpResult = await startSendFileViaMtpRequest({
      deviceId,
      storageId,
      destinationPath,
      sourcePath: file.path,
      action,
    })

    if (!startSendFileViaMtpResult.ok) {
      return rejectWithValue(startSendFileViaMtpResult.error)
    }

    const { transactionId } = startSendFileViaMtpResult.data

    if (signal.aborted) {
      return await handleAbort()
    }

    const abortListener = async () => {
      signal.removeEventListener("abort", abortListener)
      await handleAbort()
    }
    signal.addEventListener("abort", abortListener)
    dispatch(trackInfo({ mode: FilesTransferMode.Mtp, fileId: file.id }))
    dispatch(
      sendFilesPreSend({
        transferId: transactionId,
        id: file.id,
        size: file.size,
        progress: { chunksCount: 100, chunksTransferred: 0 },
      })
    )

    const checkSendFileProgress = async (): Promise<undefined | AppError> => {
      if (signal.aborted) {
        return new AppError(ApiFileTransferError.Aborted, "Aborted")
      }

      const { ok, error, data } = await getSendFileProgressViaMtpRequest(
        transactionId
      )

      if (ok) {
        dispatch(
          sendFilesChunkSent({
            id: file.id,
            chunksTransferred: data.progress,
          })
        )
      }

      if (ok && data.progress >= 100) {
        dispatch(
          sendFilesFinished({
            id: file.id,
          })
        )
        return
      }

      if (signal.aborted) {
        return new AppError(ApiFileTransferError.Aborted, "Aborted")
      }

      if (!ok) {
        return error
      }

      await delay(250, signal)
      return await checkSendFileProgress()
    }

    const checkSendFileProgressResult = await checkSendFileProgress()

    if (checkSendFileProgressResult) {
      return rejectWithValue(checkSendFileProgressResult)
    }

    console.log("File sent successfully via MTP")

    return
  }
)
