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
import {
  sendFilesAbortRegister,
  sendFilesError,
  setFilesTransferMode,
  setModeWithProgressReset,
} from "./actions"
import {
  sendFileViaMTP,
  SendFileViaMTPPayload,
} from "./send-file-via-mtp.action"
import { getMtpSendFileMetadata } from "./get-mtp-send-file-metadata.action"
import { sendFileViaSerialPort } from "./send-file-via-serial-port.action"
import { FilesTransferMode } from "./files-transfer-mode.type"
import { isMtpInitializeAccessError } from "./is-mtp-initialize-access-error"
import { selectFilesTransferMode } from "../selectors/file-transfer-sending"

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
    { dispatch, signal, abort, rejectWithValue, getState }
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

    let filesTransferMode = selectFilesTransferMode(getState())

    let mtpSendFileMetadata: Omit<SendFileViaMTPPayload, "file"> | undefined =
      undefined

    if (filesTransferMode === FilesTransferMode.Mtp) {
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
        dispatch(setFilesTransferMode(FilesTransferMode.SerialPort))
      }
    }

    for (const file of files) {
      filesTransferMode = selectFilesTransferMode(getState())

      const handleSendFileViaSerialPort = async () => {
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
        return
      }

      if (
        "path" in file &&
        filesTransferMode === FilesTransferMode.Mtp &&
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

        if (isMtpInitializeAccessError(payload)) {
          dispatch(
            setModeWithProgressReset({
              fileId: file.id,
              filesTransferMode: FilesTransferMode.SerialPort,
            })
          )
          await handleSendFileViaSerialPort()
        } else if (meta.requestStatus === "rejected") {
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
        await handleSendFileViaSerialPort()
      }
    }

    return
  }
)
