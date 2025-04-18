/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { sliceSegments } from "shared/utils"
import { ApiFileTransferError } from "device/models"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import { FileBase } from "./reducer"
import { DeviceId } from "Core/device/constants/device-id"
import { AppError } from "Core/core/errors"
import { selectActiveApiDeviceId, selectDeviceById } from "../selectors"
import { ActionName } from "../action-names"
import { sendFileViaSerialPort } from "./send-file-via-serial-port.action"
import { sendFileViaMTP } from "./send-file-via-mtp.action"

interface SendFilePayload {
  file: FileBase
  targetPath: string
  entitiesType?: string
  customDeviceId?: DeviceId
  sendFileMode?: "serial-port" | "mtp"
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
    const {
      file,
      targetPath,
      customDeviceId,
      sendFileMode = "serial-port",
    } = sendFileBasePayload

    const deviceId = customDeviceId || selectActiveApiDeviceId(getState())
    const activeDevice = deviceId
      ? selectDeviceById(getState(), deviceId)
      : undefined

    if (!deviceId || !activeDevice) {
      return rejectWithValue(
        new AppError(ApiFileTransferError.Unknown, "Device not found")
      )
    }

    const sendFileAbortController = new AbortController()
    const createEntityDataAbortController = new AbortController()

    const abortListener = async () => {
      signal.removeEventListener("abort", abortListener)
      sendFileAbortController.abort()
      createEntityDataAbortController.abort()
    }
    signal.addEventListener("abort", abortListener)

    if (sendFileMode === "mtp" && "path" in file) {
      const isInternal = targetPath.startsWith("/storage/emulated/0")
      const destinationPath = isInternal
        ? targetPath.replace(/\/storage\/emulated\/0/, "")
        : sliceSegments(targetPath, 2)

      const sendFileViaMTPDispatch = dispatch(
        sendFileViaMTP({
          file,
          portInfo: activeDevice,
          isInternal,
          destinationPath,
        })
      )

      sendFileAbortController.abort = (
        sendFileViaMTPDispatch as unknown as {
          abort: AbortController["abort"]
        }
      ).abort

      const sendFileViaMTPResponse = await sendFileViaMTPDispatch

      if (sendFileViaMTPResponse.meta.requestStatus === "rejected") {
        return rejectWithValue(sendFileViaMTPResponse.payload)
      }
    } else {
      const sendFileViaSerialPortDispatch = dispatch(
        sendFileViaSerialPort({ ...sendFileBasePayload, file })
      )

      sendFileAbortController.abort = (
        sendFileViaSerialPortDispatch as unknown as {
          abort: AbortController["abort"]
        }
      ).abort

      const sendFileViaSerialPortResponse = await sendFileViaSerialPortDispatch

      if (sendFileViaSerialPortResponse.meta.requestStatus === "rejected") {
        return rejectWithValue(sendFileViaSerialPortResponse.payload)
      }
    }

    return
  }
)
