/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { ActionName } from "../action-names"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import { selectActiveApiDeviceId } from "../selectors"
import { FileBase, FileId } from "./reducer"
import { DeviceId } from "Core/device/constants/device-id"
import {
  sendFilesAbortRegister,
  sendFilesChunkSent,
  sendFilesError,
  sendFilesFinished,
  sendFilesPreSend,
} from "./actions"
import {
  abortTransferRequest,
  sendFileRequest,
  startPreSendFileRequest,
} from "device/feature"
import { createEntityDataAction } from "../entities/create-entity-data.action"
import { ApiFileTransferError } from "device/models"
import { AppError } from "Core/core/errors"

export interface SendFilesPayload {
  actionId: string
  files: FileBase[]
  targetPath: string
  entitiesType?: string
  customDeviceId?: DeviceId
}

export const sendFiles = createAsyncThunk<
  undefined,
  SendFilesPayload,
  { state: ReduxRootState }
>(
  ActionName.SendFiles,
  async (
    { actionId, files, targetPath, entitiesType, customDeviceId },
    { dispatch, getState, signal, rejectWithValue, abort }
  ) => {
    const deviceId = customDeviceId || selectActiveApiDeviceId(getState())
    if (!deviceId) {
      return rejectWithValue(undefined)
    }

    const mainAbortController = new AbortController()
    mainAbortController.abort = abort
    dispatch(
      sendFilesAbortRegister({ actionId, abortController: mainAbortController })
    )

    const createEntityDataAbortController = new AbortController()

    const abortListener = async () => {
      signal.removeEventListener("abort", abortListener)
      createEntityDataAbortController.abort()
    }
    signal.addEventListener("abort", abortListener)

    const handleFileError = (
      fileId: FileId,
      error: AppError<ApiFileTransferError>
    ) => {
      dispatch(
        sendFilesError({
          id: fileId,
          error,
        })
      )
    }

    for (const file of files) {
      if (signal.aborted) {
        handleFileError(
          file.id,
          new AppError(ApiFileTransferError.Aborted, "Aborted")
        )
        return rejectWithValue(undefined)
      }

      const preTransferResponse = await startPreSendFileRequest(
        targetPath + file.name,
        file,
        deviceId
      )
      if (signal.aborted) {
        handleFileError(
          file.id,
          new AppError(ApiFileTransferError.Aborted, "Aborted")
        )
        return rejectWithValue(undefined)
      }
      if (!preTransferResponse.ok) {
        handleFileError(
          file.id,
          preTransferResponse.error as AppError<ApiFileTransferError>
        )
        continue
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

      let failed = false

      for (let chunkNumber = 1; chunkNumber <= chunksCount; chunkNumber++) {
        if (signal.aborted) {
          handleFileError(
            file.id,
            new AppError(ApiFileTransferError.Aborted, "Aborted")
          )
          await abortTransferRequest(transferId, deviceId)
          return rejectWithValue(undefined)
        }

        const { ok, error } = await sendFileRequest(transferId, chunkNumber)
        if (signal.aborted) {
          handleFileError(
            file.id,
            new AppError(ApiFileTransferError.Aborted, "Aborted")
          )
          return rejectWithValue(undefined)
        }
        if (!ok) {
          handleFileError(file.id, error as AppError<ApiFileTransferError>)
          failed = true
          break
        }
        dispatch(
          sendFilesChunkSent({
            id: file.id,
            chunksTransferred: chunkNumber,
          })
        )
      }
      if (failed) {
        continue
      }

      if (!entitiesType) {
        dispatch(sendFilesFinished({ id: file.id }))
        continue
      }

      if (signal.aborted) {
        handleFileError(
          file.id,
          new AppError(ApiFileTransferError.Aborted, "Aborted")
        )
        return rejectWithValue(undefined)
      }

      const createEntityRequest = dispatch(
        createEntityDataAction({
          deviceId,
          entitiesType,
          data: {
            filePath: targetPath + file.name,
            entityType: entitiesType,
          },
        })
      )
      createEntityDataAbortController.abort = (
        createEntityRequest as unknown as { abort: AbortController["abort"] }
      ).abort

      const fileEntity = await createEntityRequest
      if (signal.aborted) {
        handleFileError(
          file.id,
          new AppError(ApiFileTransferError.Aborted, "Aborted")
        )
        return rejectWithValue(undefined)
      }
      if (fileEntity.meta.requestStatus === "rejected") {
        handleFileError(
          file.id,
          new AppError(ApiFileTransferError.Unknown, "Entity creation failed")
        )
        continue
      }
      dispatch(sendFilesFinished({ id: file.id }))
    }
    return
  }
)
