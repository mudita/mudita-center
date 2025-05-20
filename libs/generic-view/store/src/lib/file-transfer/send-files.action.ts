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
import {
  selectFilesSendingGroup,
  selectFilesTransferMode,
} from "../selectors/file-transfer-sending"
import { delay } from "shared/utils"

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
    let switchToSerialCounter = 0
    const maxSwitchToSerialPortTries = 100
    const mainAbortController = new AbortController()
    mainAbortController.abort = abort
    dispatch(
      sendFilesAbortRegister({ actionId, abortController: mainAbortController })
    )

    const sendFileAbortController = new AbortController()
    const getMtpSendFileMetadataAbortController = new AbortController()

    const abortListener = () => {
      signal.removeEventListener("abort", abortListener)
      sendFileAbortController.abort()
      getMtpSendFileMetadataAbortController.abort()
    }
    signal.addEventListener("abort", abortListener)

    let filesTransferMode = selectFilesTransferMode(getState())
    let mtpSendFileMetadata: Omit<SendFileViaMTPPayload, "file"> | undefined =
      undefined

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
      dispatch(setFilesTransferMode(FilesTransferMode.Mtp))
    } else if (meta.requestStatus === "rejected" && meta.aborted) {
      const error = new AppError(ApiFileTransferError.Aborted, "Aborted")
      return rejectWithValue(error)
    } else {
      dispatch(setFilesTransferMode(FilesTransferMode.SerialPort))
    }

    const checkMtpAvailability = async () => {
      const res = await dispatch(
        getMtpSendFileMetadata({ destinationPath, customDeviceId })
      )
      const { meta, payload } = res

      if (meta.requestStatus === "fulfilled" && payload !== undefined) {
        mtpSendFileMetadata = payload as Omit<SendFileViaMTPPayload, "file">
        dispatch(setFilesTransferMode(FilesTransferMode.Mtp))
        return true
      }
      return false
    }

    const mtpMonitor = setInterval(async () => {
      const currentMode = selectFilesTransferMode(getState())
      if (
        currentMode === FilesTransferMode.SerialPort &&
        switchToSerialCounter < maxSwitchToSerialPortTries
      ) {
        const isMtpAvailable = await checkMtpAvailability()
        if (isMtpAvailable) {
          //TEST CODE START - need to be removed
          if (switchTimer) {
            clearTimeout(switchTimer)
          }
          testCode()
          //TEST CODE END
          console.log("MTP became available, switching mode.")
          sendFileAbortController.abort()
          switchToSerialCounter++
        }
      }
    }, 30000) //Test delay - change this value to 3000ms
    let currentFileIndex = 0
    let switchTimer: NodeJS.Timeout | null = null
    const SWITCH_DELAY = 30_000
    //TEST CODE START - need to be removed
    const testCode = () => {
      switchTimer = setTimeout(() => {
        const currentMode = selectFilesTransferMode(getState())
        console.log("currentMode:", currentMode)
        if (currentMode === FilesTransferMode.Mtp) {
          console.log("[Auto‑switch] 30s w MTP, przełączam na SerialPort")
          sendFileAbortController.abort()
          dispatch(setFilesTransferMode(FilesTransferMode.SerialPort))
        }
      }, SWITCH_DELAY)
    }
    testCode()
    //TEST CODE END
    const processFiles = async () => {
      while (currentFileIndex < files.length) {
        const file = files[currentFileIndex]
        const modeBeforeSend = selectFilesTransferMode(getState())
        let wasAborted = false

        const handleFileSend = async () => {
          if (modeBeforeSend === FilesTransferMode.Mtp && "path" in file) {
            const sendMtpDispatch = dispatch(
              sendFileViaMTP({
                ...mtpSendFileMetadata!,
                file,
              })
            )

            sendFileAbortController.abort = (
              sendMtpDispatch as unknown as { abort: AbortController["abort"] }
            ).abort

            const { meta, payload } = await sendMtpDispatch

            const files = selectFilesSendingGroup(getState(), {
              filesIds: [file.id],
            })

            if (files[0]?.status === "finished") {
              console.log(`File ${file.name} already sent! Skipping....`)
              return
            }

            if (meta.requestStatus === "rejected" && meta.aborted) {
              await delay(2000)
              wasAborted = true
              return
            }

            if (isMtpInitializeAccessError(payload)) {
              dispatch(
                setModeWithProgressReset({
                  fileId: file.id,
                  filesTransferMode: FilesTransferMode.SerialPort,
                })
              )
              wasAborted = true
              return
            }

            if (meta.requestStatus === "rejected") {
              const error =
                payload instanceof AppError
                  ? payload
                  : new AppError(ApiFileTransferError.Unknown)
              dispatch(sendFilesError({ id: file.id, error }))
            }
          } else {
            const sendSerialDispatch = dispatch(
              sendFileViaSerialPort({
                destinationPath,
                customDeviceId,
                entitiesType,
                file,
              })
            )

            sendFileAbortController.abort = (
              sendSerialDispatch as unknown as {
                abort: AbortController["abort"]
              }
            ).abort

            const monitor = setInterval(() => {
              const currentMode = selectFilesTransferMode(getState())
              if (currentMode !== modeBeforeSend) {
                console.log(`Mode switch detected. Aborting ${file.name}`)
                sendFileAbortController.abort()
                clearInterval(monitor)
              }
            }, 500)

            const { meta, payload } = await sendSerialDispatch
            clearInterval(monitor)

            const files = selectFilesSendingGroup(getState(), {
              filesIds: [file.id],
            })

            if (files[0]?.status === "finished") {
              console.log(`File ${file.name} already sent! Skipping....`)
              return
            }

            if (meta.requestStatus === "rejected" && meta.aborted) {
              wasAborted = true
              await delay(2000)
              return
            }

            if (meta.requestStatus === "rejected") {
              const error =
                payload instanceof AppError
                  ? payload
                  : new AppError(ApiFileTransferError.Unknown)
              dispatch(sendFilesError({ id: file.id, error }))
            }
          }
        }

        await handleFileSend()
        const modeAfterSend = selectFilesTransferMode(getState())
        if (wasAborted) {
          if (modeAfterSend !== modeBeforeSend) {
            console.log(`Retrying ${file.name} due to mode switch.`)
            filesTransferMode = modeAfterSend
            wasAborted = false
            continue // retry this file
          } else {
            console.log(`File ${file.name} was cancelled by user. Skipping.`)
            const error =
              payload instanceof AppError
                ? payload
                : new AppError(ApiFileTransferError.Unknown)
            dispatch(sendFilesError({ id: file.id, error }))
            break
          }
        }
        currentFileIndex++
      }
    }

    await processFiles()
    clearInterval(mtpMonitor)
    return
  }
)
