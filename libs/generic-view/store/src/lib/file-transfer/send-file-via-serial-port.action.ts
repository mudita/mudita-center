/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { ActionName } from "../action-names"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import { selectActiveApiDeviceId } from "../selectors"
import { FileBase } from "./reducer"
import { DeviceId } from "Core/device/constants/device-id"
import { sendFilesChunkSent, sendFilesPreSend } from "./actions"
import {
  abortTransferRequest,
  sendFileRequest,
  startPreSendFileRequest,
} from "device/feature"
import { ApiFileTransferError } from "device/models"
import { AppError } from "Core/core/errors"

export interface SendFilePayload {
  file: FileBase
  targetPath: string
  customDeviceId?: DeviceId
}

export const sendFileViaSerialPort = createAsyncThunk<
  void,
  SendFilePayload,
  {
    state: ReduxRootState
  }
>(
  ActionName.SendFileViaSerialPort,
  async (
    { file, targetPath, customDeviceId },
    { dispatch, getState, signal, rejectWithValue }
  ) => {
    const deviceId = customDeviceId || selectActiveApiDeviceId(getState())
    if (!deviceId) {
      return rejectWithValue(
        new AppError(ApiFileTransferError.Unknown, "Device not found")
      )
    }

    const preTransferResponse = await startPreSendFileRequest(
      targetPath + file.name,
      file,
      deviceId
    )

    if (signal.aborted) {
      return rejectWithValue(
        new AppError(ApiFileTransferError.Aborted, "Aborted")
      )
    }

    if (!preTransferResponse.ok) {
      return rejectWithValue(
        new AppError(
          ApiFileTransferError.Unknown,
          preTransferResponse.error.message
        )
      )
    }
    const { transferId, chunksCount } = preTransferResponse.data

    dispatch(
      sendFilesPreSend({
        transferId,
        id: file.id,
        size: file.size,
        progress: { chunksCount, chunksTransferred: 0 },
      })
    )

    for (let chunkNumber = 1; chunkNumber <= chunksCount; chunkNumber++) {
      const { ok, error } = await sendFileRequest(transferId, chunkNumber)
      if (signal.aborted) {
        await abortTransferRequest(transferId, deviceId)
        return rejectWithValue(
          new AppError(ApiFileTransferError.Aborted, "Aborted")
        )
      }
      if (!ok) {
        await abortTransferRequest(transferId, deviceId)
        return rejectWithValue(
          new AppError(ApiFileTransferError.Unknown, error.message)
        )
      }
      dispatch(
        sendFilesChunkSent({
          id: file.id,
          chunksTransferred: chunkNumber,
        })
      )
    }
    return
  }
)
