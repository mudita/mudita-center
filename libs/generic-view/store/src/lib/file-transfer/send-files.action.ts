/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { ApiFileTransferError } from "device/models"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import { DeviceId } from "Core/device/constants/device-id"
import { AppError } from "Core/core/errors"
import { ActionName } from "../action-names"
import { FileBase } from "./reducer"
import { sendFilesAbortRegister, sendFilesError } from "./actions"
import {
  sendFileViaMTP,
  SendFileViaMTPPayload,
} from "./send-file-via-mtp.action"
import { getMtpSendFileMetadata } from "./get-mtp-send-file-metadata.action"
import { sendFileViaSerialPort } from "./send-file-via-serial-port.action"

export interface SendFilesPayload {
  actionId: string
  files: FileBase[]
  destinationPath: string
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
    { actionId, files, destinationPath, entitiesType, customDeviceId },
    { dispatch, signal, abort, rejectWithValue }
  ) => {
    const mainAbortController = new AbortController()
    mainAbortController.abort = abort
    dispatch(
      sendFilesAbortRegister({ actionId, abortController: mainAbortController })
    )

    const sendFileAbortController = new AbortController()
    const getMtpSendFileMetadataAbortController = new AbortController()

    const abortListener = async () => {
      signal.removeEventListener("abort", abortListener)
      sendFileAbortController.abort()
      getMtpSendFileMetadataAbortController.abort()
    }
    signal.addEventListener("abort", abortListener)

    const sendFileMode = "mtp"

    let mtpSendFileMetadata: Omit<SendFileViaMTPPayload, "file"> | undefined =
      undefined

    if (sendFileMode === "mtp") {
      const getMtpSendFileMetadataDispatch = dispatch(
        getMtpSendFileMetadata({ destinationPath, customDeviceId })
      )

      getMtpSendFileMetadataAbortController.abort = (
        getMtpSendFileMetadataDispatch as unknown as {
          abort: AbortController["abort"]
        }
      ).abort

      const { meta, payload } = await getMtpSendFileMetadataDispatch

      if (meta.requestStatus === "fulfilled" && payload !== undefined) {
        mtpSendFileMetadata = payload as Omit<SendFileViaMTPPayload, "file">
      } else if (meta.requestStatus === "rejected" && meta.aborted) {
        const error = new AppError(ApiFileTransferError.Aborted, "Aborted")
        return rejectWithValue(error)
      } else {
        // TODO: handle switch from mtp error to serial port transfer
        const error =
          payload instanceof AppError
            ? payload
            : new AppError(ApiFileTransferError.Unknown)
        return rejectWithValue(error)
      }
    }

    for (const file of files) {
      if (
        "path" in file &&
        sendFileMode === "mtp" &&
        mtpSendFileMetadata !== undefined
      ) {
        const sendFileBaseDispatch = dispatch(
          sendFileViaMTP({
            ...mtpSendFileMetadata,
            file,
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
      } else {
        const sendFileBaseDispatch = dispatch(
          sendFileViaSerialPort({
            destinationPath,
            customDeviceId,
            entitiesType,
            file,
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
    }

    return
  }
)
