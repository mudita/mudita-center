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
import {
  sendFilesChunkSent,
  sendFilesFinished,
  sendFilesPreSend,
  trackInfo,
} from "./actions"
import {
  abortTransferRequest,
  sendFileRequest,
  startPreSendFileRequest,
} from "device/feature"
import { ApiFileTransferError } from "device/models"
import { AppError } from "Core/core/errors"
import { createEntityDataAction } from "../entities/create-entity-data.action"
import { FilesTransferMode } from "./files-transfer-mode.type"

export interface SendFileViaSerialPortPayload {
  file: FileBase
  destinationPath: string
  customDeviceId?: DeviceId
  entitiesType?: string
}

export const sendFileViaSerialPort = createAsyncThunk<
  void,
  SendFileViaSerialPortPayload,
  {
    state: ReduxRootState
  }
>(
  ActionName.SendFileViaSerialPort,
  async (
    { file, destinationPath, customDeviceId, entitiesType },
    { dispatch, getState, signal, rejectWithValue }
  ) => {
    const deviceId = customDeviceId || selectActiveApiDeviceId(getState())
    if (!deviceId) {
      return rejectWithValue(
        new AppError(ApiFileTransferError.Unknown, "Device not found")
      )
    }
    dispatch(trackInfo({ mode: FilesTransferMode.SerialPort, fileId: file.id }))

    const createEntityDataAbortController = new AbortController()

    const abortListener = async () => {
      signal.removeEventListener("abort", abortListener)
      createEntityDataAbortController.abort()
    }

    const preTransferResponse = await startPreSendFileRequest(
      destinationPath + file.name,
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

    if (!entitiesType) {
      dispatch(sendFilesFinished({ id: file.id }))
      return
    }

    const fileEntityDispatch = dispatch(
      createEntityDataAction({
        deviceId,
        entitiesType,
        data: {
          filePath: destinationPath + file.name,
          entityType: entitiesType,
        },
      })
    )

    createEntityDataAbortController.abort = (
      fileEntityDispatch as unknown as { abort: AbortController["abort"] }
    ).abort

    const fileEntity = await fileEntityDispatch

    console.log("fileEntity", fileEntity)

    if (signal.aborted) {
      return rejectWithValue(
        new AppError(ApiFileTransferError.Aborted, "Aborted")
      )
    }
    if (fileEntity.meta.requestStatus === "rejected") {
      return rejectWithValue(
        new AppError(ApiFileTransferError.Unknown, "Entity creation failed")
      )
    }
    dispatch(sendFilesFinished({ id: file.id }))

    return
  }
)
