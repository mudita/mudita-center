/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import {
  sendClearRequest,
  sendFileRequest,
  startPreSendFileRequest,
} from "device/feature"
import { DeviceId } from "Core/device/constants/device-id"
import { ActionName } from "../action-names"
import { fileTransferChunkSent, fileTransferPrepared } from "./actions"
import { AppError, AppErrorType } from "Core/core/errors"
import { GeneralError } from "device/models"

export type SendFileErrorPayload = {
  transferId?: number
  filePath: string
}

interface SendFileError {
  deviceId: DeviceId
  error: AppError<AppErrorType, SendFileErrorPayload>
}

export const sendFile = createAsyncThunk<
  { transferId: number },
  { deviceId: DeviceId; filePath: string; targetPath: string },
  { state: ReduxRootState; rejectValue: SendFileError }
>(
  ActionName.FileTransferSend,
  async ({ deviceId, filePath, targetPath }, { rejectWithValue, dispatch }) => {
    const preTransferResponse = await startPreSendFileRequest(
      filePath,
      targetPath,
      deviceId
    )

    if (preTransferResponse.ok) {
      const { transferId, chunksCount } = preTransferResponse.data
      dispatch(
        fileTransferPrepared({
          transferId,
          chunksCount,
        })
      )

      for (let chunkNumber = 1; chunkNumber <= chunksCount; chunkNumber++) {
        // TODO: consider using signal to abort
        const { ok, error } = await sendFileRequest(transferId, chunkNumber)
        if (!ok) {
          await sendClearRequest(transferId)
          return rejectWithValue({
            deviceId,
            error: {
              ...error,
              payload: {
                transferId,
                filePath,
              },
            },
          })
        }
        dispatch(
          fileTransferChunkSent({
            transferId,
            chunksTransferred: chunkNumber,
          })
        )
      }
      await sendClearRequest(transferId)
      return { transferId }
    } else {
      return rejectWithValue({
        deviceId,
        error: {
          type: GeneralError.IncorrectResponse,
          payload: {
            transferId: preTransferResponse.error.payload,
            filePath,
          },
          message: "Incorrect response",
          name: GeneralError.IncorrectResponse,
        },
      })
    }
  }
)
