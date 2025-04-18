/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { PortInfo } from "serialport"
import { createAsyncThunk } from "@reduxjs/toolkit"
import { ApiFileTransferError } from "device/models"
import {
  getSendFileProgressViaMtpRequest,
  startSendFileViaMtpRequest,
} from "device/feature"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import { AppError } from "Core/core/errors"
import { FileWithPath } from "./reducer"
import { sendFilesChunkSent, sendFilesPreSend } from "./actions"
import { ActionName } from "../action-names"

interface SendFileViaMTPPayload {
  file: FileWithPath
  portInfo: PortInfo
  destinationPath: string
  isInternal: boolean
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
    { file, portInfo, destinationPath, isInternal },
    { dispatch, signal, rejectWithValue }
  ) => {
    const startSendFileViaMtpResult = await startSendFileViaMtpRequest({
      portInfo,
      isInternal,
      destinationPath,
      sourcePath: file.path,
    })

    if (signal.aborted) {
      return rejectWithValue(
        new AppError(ApiFileTransferError.Aborted, "Aborted")
      )
    }

    if (!startSendFileViaMtpResult.ok) {
      return rejectWithValue(
        new AppError(
          ApiFileTransferError.Unknown,
          startSendFileViaMtpResult.error.message
        )
      )
    }

    const { transactionId } = startSendFileViaMtpResult.data

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
        return new AppError(ApiFileTransferError.Unknown, error.message)
      }

      dispatch(
        sendFilesChunkSent({
          id: file.id,
          chunksTransferred: data.progress,
        })
      )

      if (data.progress >= 100) {
        dispatch(
          sendFilesChunkSent({
            id: file.id,
            chunksTransferred: 100,
          })
        )
        return
      }

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
