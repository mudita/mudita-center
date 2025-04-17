/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { ActionName } from "../action-names"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import { FileBase } from "./reducer"
import { DeviceId } from "Core/device/constants/device-id"
import { sendFilesAbortRegister, sendFilesError } from "./actions"
import { sendFile } from "./send-file.action"
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
  void,
  SendFilesPayload,
  { state: ReduxRootState }
>(
  ActionName.SendFiles,
  async (
    { actionId, files, targetPath, entitiesType, customDeviceId },
    { dispatch, signal, abort, rejectWithValue }
  ) => {
    const mainAbortController = new AbortController()
    mainAbortController.abort = abort
    dispatch(
      sendFilesAbortRegister({ actionId, abortController: mainAbortController })
    )

    const sendFileAbortController = new AbortController()

    const abortListener = async () => {
      signal.removeEventListener("abort", abortListener)
      sendFileAbortController.abort()
    }
    signal.addEventListener("abort", abortListener)

    for (const file of files) {
      const sendFileBaseDispatch = dispatch(
        sendFile({
          file,
          targetPath,
          entitiesType,
          customDeviceId,
        })
      )

      sendFileAbortController.abort = (
        sendFileBaseDispatch as unknown as { abort: AbortController["abort"] }
      ).abort

      const { meta, payload } = await sendFileBaseDispatch

      if (meta.requestStatus === "rejected" && meta.aborted) {
        const error = new AppError(ApiFileTransferError.Aborted, "Aborted")
        dispatch(
          sendFilesError({
            id: file.id,
            error,
          })
        )
        return rejectWithValue(error)
      }

      if (meta.requestStatus === "rejected") {
        // TODO: handle switch from mtp error to serial port transfer
        const error =
          payload instanceof AppError
            ? payload
            : new AppError(ApiFileTransferError.Unknown)

        dispatch(
          sendFilesError({
            id: file.id,
            error,
          })
        )
      }
    }

    return
  }
)
