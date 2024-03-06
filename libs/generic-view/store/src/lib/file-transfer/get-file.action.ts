/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import {
  getFileRequest,
  saveFileRequest,
  sendClearRequest,
  startPreGetFileRequest,
} from "device/feature"
import { DeviceId } from "Core/device/constants/device-id"
import { ActionName } from "../action-names"
import { fileTransferChunkGet, fileTransferGetPrepared } from "./actions"
import { AppError, AppErrorType } from "Core/core/errors"
import { GeneralError, PreTransferGet } from "device/models"
import { Result } from "Core/core/builder"

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
  {
    deviceId: DeviceId
    filePath: string
    targetPath: string
    preTransfer?: PreTransferGet
  },
  { state: ReduxRootState; rejectValue: GetFileError | undefined }
>(
  ActionName.FileTransferGet,
  async (
    { deviceId, filePath, targetPath, preTransfer },
    { rejectWithValue, dispatch, signal }
  ) => {
    let aborted = false

    signal.addEventListener("abort", async () => {
      aborted = true
      const transferId = preTransferResponse?.ok
        ? preTransferResponse.data.transferId
        : preTransferResponse?.error.payload
      if (transferId) {
        await sendClearRequest(transferId)
      }
    })

    if (aborted) {
      return rejectWithValue(undefined)
    }

    const preTransferResponse = preTransfer
      ? Result.success(preTransfer)
      : await startPreGetFileRequest(filePath, deviceId)

    if (preTransferResponse.ok) {
      if (aborted) {
        return rejectWithValue(undefined)
      }

      const { transferId, chunkSize, fileSize } = preTransferResponse.data
      const chunksCount = Math.ceil(fileSize / chunkSize)
      dispatch(
        fileTransferGetPrepared({
          transferId,
          chunksCount,
          filePath,
        })
      )

      for (let chunkNumber = 1; chunkNumber <= chunksCount; chunkNumber++) {
        if (aborted) {
          return rejectWithValue(undefined)
        }
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

      if (aborted) {
        return rejectWithValue(undefined)
      }

      if (targetPath) {
        await saveFileRequest(targetPath, transferId)
        await sendClearRequest(transferId)
      }
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
