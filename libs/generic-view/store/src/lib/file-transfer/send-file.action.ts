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
import { sendFilesFinished } from "./actions"
import { sendFileViaSerialPort } from "./send-file-via-serial-port.action"
import { createEntityDataAction } from "../entities/create-entity-data.action"
import { AppError } from "Core/core/errors"
import { ApiFileTransferError } from "device/models"

export interface SendFilePayload {
  file: FileBase
  targetPath: string
  entitiesType?: string
  customDeviceId?: DeviceId
}

export const sendFile = createAsyncThunk<
  void,
  SendFilePayload,
  {
    state: ReduxRootState
  }
>(
  ActionName.SendFile,
  async (
    sendFileBasePayload,
    { dispatch, getState, signal, rejectWithValue }
  ) => {
    const { file, targetPath, entitiesType, customDeviceId } =
      sendFileBasePayload

    const deviceId = customDeviceId || selectActiveApiDeviceId(getState())
    if (!deviceId) {
      return rejectWithValue(
        new AppError(ApiFileTransferError.Unknown, "Device not found")
      )
    }

    const sendFileViaSerialPortAbortController = new AbortController()
    const createEntityDataAbortController = new AbortController()

    const abortListener = async () => {
      signal.removeEventListener("abort", abortListener)
      sendFileViaSerialPortAbortController.abort()
      createEntityDataAbortController.abort()
    }
    signal.addEventListener("abort", abortListener)

    const sendFileViaSerialPortDispatch = dispatch(
      sendFileViaSerialPort({ ...sendFileBasePayload, file })
    )

    sendFileViaSerialPortAbortController.abort = (
      sendFileViaSerialPortDispatch as unknown as {
        abort: AbortController["abort"]
      }
    ).abort

    const sendFileViaSerialPortResponse = await sendFileViaSerialPortDispatch

    if (sendFileViaSerialPortResponse.meta.requestStatus === "rejected") {
      return rejectWithValue(sendFileViaSerialPortResponse.payload)
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
          filePath: targetPath + file.name,
          entityType: entitiesType,
        },
      })
    )

    createEntityDataAbortController.abort = (
      fileEntityDispatch as unknown as { abort: AbortController["abort"] }
    ).abort

    const fileEntity = await fileEntityDispatch
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
