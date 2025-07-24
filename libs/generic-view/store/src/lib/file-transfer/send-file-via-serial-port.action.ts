/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { ActionName } from "../action-names"
import { AppDispatch, ReduxRootState } from "Core/__deprecated__/renderer/store"
import { selectActiveApiDeviceId } from "../selectors"
import { FileBase, FileWithPath } from "./reducer"
import { DeviceId } from "Core/device/constants/device-id"
import {
  fileTransferChunkGet,
  fileTransferChunkSent,
  fileTransferGetPrepared,
  fileTransferSendPrepared,
  sendFilesChunkSent,
  sendFilesError,
  sendFilesFinished,
  sendFilesPreSend,
  trackInfo,
} from "./actions"
import {
  abortTransferRequest,
  getFileRequest,
  saveFileRequest,
  sendClearRequest,
  sendFileRequest,
  startPreGetFileRequest,
  startPreSendFileRequest,
} from "device/feature"
import { ApiFileTransferError } from "device/models"
import { AppError } from "Core/core/errors"
import { createEntityDataAction } from "../entities/create-entity-data.action"
import { FilesTransferMode, SendFilesAction } from "./files-transfer.type"
import { getFile } from "./get-file.action"

export interface SendFileViaSerialPortPayload {
  file: FileBase
  destinationPath: string
  customDeviceId?: DeviceId
  entitiesType?: string
  actionType: SendFilesAction
}

export const uploadFileViaSerialPort = async ({
  file,
  destinationPath,
  deviceId,
  entitiesType,
  signal,
  dispatch,
}: {
  file: FileBase
  destinationPath: string
  deviceId: DeviceId
  entitiesType?: string
  signal: AbortSignal
  dispatch: any
}) => {
  const createEntityDataAbortController = new AbortController()

  const preTransferResponse = await startPreSendFileRequest(
    destinationPath + file.name,
    file,
    deviceId
  )

  if (signal.aborted) {
    throw new AppError(ApiFileTransferError.Aborted, "Aborted")
  }

  if (!preTransferResponse.ok) {
    throw new AppError(
      ApiFileTransferError.Unknown,
      preTransferResponse.error.message
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
      throw new AppError(ApiFileTransferError.Aborted, "Aborted")
    }

    if (!ok) {
      await abortTransferRequest(transferId, deviceId)
      throw new AppError(ApiFileTransferError.Unknown, error.message)
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

  if (signal.aborted) {
    throw new AppError(ApiFileTransferError.Aborted, "Aborted")
  }

  if (fileEntity.meta.requestStatus === "rejected") {
    throw new AppError(ApiFileTransferError.Unknown, "Entity creation failed")
  }
  dispatch(sendFilesFinished({ id: file.id }))
  return
}

export const exportFileViaSerialPort = async ({
  file,
  destinationPath,
  deviceId,
  entitiesType,
  signal,
  dispatch,
}: {
  file: FileBase
  destinationPath: string
  deviceId: DeviceId
  entitiesType?: string
  signal: AbortSignal
  dispatch: any
}) => {
  const fileToExport = file as FileWithPath
  const fullPath = fileToExport.devicePath + fileToExport.path

  const preTransferResponse = await startPreGetFileRequest(fullPath)

  if (signal.aborted) {
    throw new AppError(ApiFileTransferError.Aborted, "Aborted")
  }

  if (!preTransferResponse.ok) {
    throw new AppError(
      ApiFileTransferError.Unknown,
      preTransferResponse.error.message
    )
  }

  if (preTransferResponse.ok) {
    const { transferId, chunkSize, fileSize } = preTransferResponse.data
    const chunksCount = Math.ceil(fileSize / chunkSize)

    dispatch(
      sendFilesPreSend({
        transferId,
        id: file.id,
        size: file.size,
        progress: { chunksCount, chunksTransferred: 0 },
      })
    )

    for (let chunkNumber = 1; chunkNumber <= chunksCount; chunkNumber++) {
      const { ok, error } = await getFileRequest(
        transferId,
        chunkNumber,
        deviceId
      )

      if (signal.aborted) {
        await abortTransferRequest(transferId, deviceId)
        throw new AppError(ApiFileTransferError.Aborted, "Aborted")
      }

      if (!ok) {
        await abortTransferRequest(transferId, deviceId)
        throw new AppError(ApiFileTransferError.Unknown, error.message)
      }

      dispatch(
        sendFilesChunkSent({
          id: file.id,
          chunksTransferred: chunkNumber,
        })
      )
    }

    const result = await saveFileRequest(
      destinationPath + "/" + file.name,
      transferId
    )

    if (result.error) {
      await abortTransferRequest(transferId, deviceId)
      throw new AppError(ApiFileTransferError.Unknown, result.error.message)
    }
    dispatch(sendFilesFinished({ id: file.id }))
  }
  return
}

export const sendFileViaSerialPort = createAsyncThunk<
  void,
  SendFileViaSerialPortPayload,
  { state: ReduxRootState }
>(
  ActionName.SendFileViaSerialPort,
  async (
    { file, destinationPath, customDeviceId, entitiesType, actionType },
    { dispatch, getState, signal, rejectWithValue }
  ) => {
    const deviceId = customDeviceId || selectActiveApiDeviceId(getState())

    if (!deviceId) {
      return rejectWithValue(
        new AppError(ApiFileTransferError.Unknown, "Device not found")
      )
    }

    dispatch(trackInfo({ mode: FilesTransferMode.SerialPort, fileId: file.id }))

    try {
      if (actionType == SendFilesAction.ActionExport) {
        await exportFileViaSerialPort({
          file,
          destinationPath,
          deviceId,
          entitiesType,
          signal,
          dispatch,
        })
      } else {
        await uploadFileViaSerialPort({
          file,
          destinationPath,
          deviceId,
          entitiesType,
          signal,
          dispatch,
        })
      }
    } catch (error) {
      const appError =
        error instanceof AppError
          ? error
          : new AppError(ApiFileTransferError.Unknown, "Unexpected error")

      dispatch(sendFilesError({ id: file.id, error: appError }))
      return rejectWithValue(appError)
    }
    return
  }
)
