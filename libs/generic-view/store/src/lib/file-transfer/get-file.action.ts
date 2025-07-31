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
import {
  GeneralError,
  PreTransferGet200,
  PreTransferGet202,
} from "device/models"
import { Result, ResultObject } from "Core/core/builder"
import { delay } from "shared/utils"

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
    targetPath?: string
    preTransfer?: PreTransferGet200
    onProgress?: (progress: number) => void
  },
  { state: ReduxRootState; rejectValue: GetFileError | undefined }
>(
  ActionName.FileTransferGet,
  async (
    { deviceId, filePath, targetPath, preTransfer, onProgress },
    { rejectWithValue, dispatch, signal }
  ) => {
    let aborted = false

    const abortListener = async () => {
      signal.removeEventListener("abort", abortListener)
      aborted = true
      const transferId = preTransferResponse?.ok
        ? preTransferResponse.data.transferId
        : preTransferResponse?.error.payload
      if (transferId) {
        await sendClearRequest(transferId)
      }
    }
    signal.addEventListener("abort", abortListener)

    if (aborted) {
      return rejectWithValue(undefined)
    }

    let preTransferResponse: ResultObject<PreTransferGet200 | PreTransferGet202>

    // eslint-disable-next-line
    while (true) {
      if (signal.aborted) {
        return rejectWithValue(undefined)
      }

      preTransferResponse = preTransfer
        ? Result.success(preTransfer)
        : await startPreGetFileRequest(filePath, deviceId)

      if (!preTransferResponse.ok) {
        return rejectWithValue({
          deviceId,
          error: {
            ...preTransferResponse.error,
            payload: {
              transferId: preTransferResponse.error.payload,
              filePath,
            },
          },
        })
      }

      const { chunkSize, fileSize } = preTransferResponse.data

      if (chunkSize != null && fileSize != null) {
        break
      }

      await delay()
    }

    if (preTransferResponse.ok && !aborted) {
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
        const fileResp = await getFileRequest(transferId, chunkNumber, deviceId)
        const { ok, error } = fileResp
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
        onProgress?.(100 * (chunkNumber / chunksCount))
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
            transferId: preTransferResponse.data.transferId,
            filePath,
          },
        },
      })
    }
  }
)
