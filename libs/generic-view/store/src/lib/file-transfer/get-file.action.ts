/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import {
  getFileRequest,
  sendClearRequest,
  startPreGetFileRequest,
} from "device/feature"
import { DeviceId } from "Core/device/constants/device-id"
import { ActionName } from "../action-names"
import { fileTransferChunkGet, fileTransferGetPrepared } from "./actions"
import { AppError, AppErrorType } from "Core/core/errors"
import { GeneralError } from "device/models"

export type GetFileErrorPayload = {
  transferId?: number
  filePath: string
}

interface GetFileError {
  deviceId: DeviceId
  error: AppError<AppErrorType, GetFileErrorPayload>
}

export const getFile = createAsyncThunk<
  { transferId: number },
  { deviceId: DeviceId; filePath: string; targetPath: string },
  { state: ReduxRootState; rejectValue: GetFileError }
>(
  ActionName.FileTransferGet,
  async ({ deviceId, filePath, targetPath }, { rejectWithValue, dispatch }) => {
    const preTransferResponse = await startPreGetFileRequest(filePath, deviceId)

    if (preTransferResponse.ok) {
      const { transferId, chunkSize, fileSize } = preTransferResponse.data
      const chunksCount = Math.ceil(fileSize / chunkSize)
      dispatch(
        fileTransferGetPrepared({
          transferId,
          chunksCount,
        })
      )

      for (let chunkNumber = 1; chunkNumber <= chunksCount; chunkNumber++) {
        // TODO: consider using signal to abort
        const { ok, error } = await getFileRequest(transferId, chunkNumber)
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
          fileTransferChunkGet({
            transferId,
            chunksTransferred: chunkNumber,
          })
        )
      }
      console.log("file received", targetPath)
      await sendClearRequest(transferId)
      return { transferId }
    } else {
      return rejectWithValue({
        deviceId,
        error: {
          name: GeneralError.IncorrectResponse,
          type: GeneralError.IncorrectResponse,
          message: "Incorrect response",
          payload: {
            transferId: preTransferResponse.error.payload,
            filePath,
          },
        },
      })
    }
  }
)
