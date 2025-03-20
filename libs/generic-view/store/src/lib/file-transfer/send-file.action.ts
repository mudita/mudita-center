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
import { fileTransferChunkSent, fileTransferSendPrepared } from "./actions"
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
  | {
      deviceId: DeviceId
      filePath: string
      targetPath: string
    }
  | {
      deviceId: DeviceId
      transferId: number
      chunksCount: number
      filePath?: string
    },
  { state: ReduxRootState; rejectValue: SendFileError | undefined }
>(
  ActionName.FileTransferSend,
  async (params, { rejectWithValue, dispatch, signal }) => {
    let aborted = false

    const abortListener = async () => {
      signal.removeEventListener("abort", abortListener)
      aborted = true
      const transferId = transfer.transferId
      if (transferId) {
        await sendClearRequest(transferId)
      }
    }
    signal.addEventListener("abort", abortListener)

    const { deviceId } = params

    const transfer: {
      transferId: number
      chunksCount: number
      filePath?: string
    } = {
      transferId: 0,
      chunksCount: 0,
      filePath: "",
    }

    if (aborted) {
      return rejectWithValue(undefined)
    }

    if ("transferId" in params) {
      transfer.transferId = params.transferId
      transfer.chunksCount = params.chunksCount
    } else {
      const { filePath, targetPath } = params
      const preTransferResponse = await startPreSendFileRequest(
        targetPath,
        { path: filePath },
        deviceId
      )
      if (!preTransferResponse.ok) {
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
      transfer.transferId = preTransferResponse.data.transferId
      transfer.chunksCount = preTransferResponse.data.chunksCount
      if (aborted) {
        await sendClearRequest(transfer.transferId)
        return rejectWithValue(undefined)
      }
    }

    const { transferId, chunksCount } = transfer
    dispatch(
      fileTransferSendPrepared({
        transferId,
        chunksCount,
        filePath: params.filePath,
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
              filePath: params.filePath || "",
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
  }
)
