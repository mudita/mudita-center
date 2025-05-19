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
import { FilesTransferMode } from "./files-transfer-mode.type"

export interface SendFileViaMTPPayload {
  file: FileWithPath
  deviceId: string
  storageId: string
  destinationPath: string
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
    { file, deviceId, destinationPath, storageId },
    { dispatch, signal, rejectWithValue }
  ) => {
    const startSendFileViaMtpResult = await startSendFileViaMtpRequest({
      deviceId,
      storageId,
      destinationPath,
      sourcePath: file.path,
    })

    if (signal.aborted) {
      return rejectWithValue(
        new AppError(ApiFileTransferError.Aborted, "Aborted")
      )
    }

    if (!startSendFileViaMtpResult.ok) {
      return rejectWithValue(startSendFileViaMtpResult.error)
    }

    dispatch(trackInfo({ mode: FilesTransferMode.Mtp, fileId: file.id }))

    const { transactionId } = startSendFileViaMtpResult.data

    const abortListener = async () => {
      signal.removeEventListener("abort", abortListener)
      const { ok, error } = await cancelSendFileViaMtpRequest(transactionId)
      if (!ok) {
        return error
      } else {
        return new AppError(ApiFileTransferError.Aborted, "Aborted")
      }
    }
    signal.addEventListener("abort", abortListener)

    dispatch(
      sendFilesPreSend({
        transferId: transactionId,
        id: file.id,
        size: file.size,
        progress: { chunksCount: 100, chunksTransferred: 0 },
      })
    )

    const checkSendFileProgress = async (): Promise<undefined | AppError> => {
      const { ok, error, data } = await getSendFileProgressViaMtpRequest(
        transactionId
      )

      if (signal.aborted) {
        return new AppError(ApiFileTransferError.Aborted, "Aborted")
      }

      if (!ok) {
        return error
      }

      dispatch(
        sendFilesChunkSent({
          id: file.id,
          chunksTransferred: data.progress,
        })
      )

      if (data.progress >= 100) {
        dispatch(
          sendFilesFinished({
            id: file.id,
          })
        )
        return
      }

      await delay(500)
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
