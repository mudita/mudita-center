/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { ApiFileTransferError } from "device/models"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import { DeviceId } from "Core/device/constants/device-id"
import { AppError } from "Core/core/errors"
import { delay, sliceSegments } from "shared/utils"
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
import { FilesTransferMode, SendFilesAction } from "./files-transfer.type"
import { isMtpInitializeAccessError } from "./is-mtp-initialize-access-error"
import {
  selectFilesSendingGroup,
  selectFilesTransferMode,
} from "../selectors/file-transfer-sending"
import { selectLastOutboxData } from "../selectors/select-last-outbox-data"
import { selectActiveApiDeviceId, selectEntities } from "../selectors"
import { preSendFilesCleanup } from "./pre-send-files-cleanup"

export interface SendFilesPayload {
  actionId: string
  files: FileBase[]
  destinationPath: string
  isMtpPathInternal: boolean
  entitiesType?: string
  customDeviceId?: DeviceId
  actionType: SendFilesAction
}

export const sendFiles = createAsyncThunk<
  void,
  SendFilesPayload,
  { state: ReduxRootState }
>(
  ActionName.SendFiles,
  async (
    {
      actionId,
      files,
      destinationPath,
      entitiesType,
      customDeviceId,
      isMtpPathInternal,
      actionType,
    },
    { dispatch, signal, abort, rejectWithValue, getState }
  ) => {
    const deviceId = customDeviceId || selectActiveApiDeviceId(getState())

    if (!deviceId) {
      return rejectWithValue(
        new AppError(ApiFileTransferError.Unknown, "Device not found")
      )
    }
    let switchToMtpCounter = 0
    const maxSwitchToMtpTries = 1

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
      getMtpSendFileMetadata({
        destinationPath,
        customDeviceId,
        isMtpPathInternal: isMtpPathInternal,
      })
    )

    getMtpSendFileMetadataAbortController.abort = (
      getMtpSendFileMetadataDispatch as unknown as {
        abort: AbortController["abort"]
      }
    ).abort

    await preSendFilesCleanup()
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
        getMtpSendFileMetadata({
          destinationPath: destinationPath,
          customDeviceId,
          isMtpPathInternal,
        })
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
        switchToMtpCounter < maxSwitchToMtpTries
      ) {
        const isMtpAvailable = await checkMtpAvailability()
        if (isMtpAvailable) {
          console.log("MTP became available, switching mode.")
          sendFileAbortController.abort()
          switchToMtpCounter++
        }
      }
    }, 3_000)
    let currentFileIndex = 0

    let wasAborted = false
    const processFiles = async () => {
      while (currentFileIndex < files.length) {
        const file = files[currentFileIndex]
        const modeBeforeSend = selectFilesTransferMode(getState())

        const handleFileSend = async () => {
          if (modeBeforeSend === FilesTransferMode.Mtp && "path" in file) {
            const sendMtpDispatch = dispatch(
              sendFileViaMTP({
                ...mtpSendFileMetadata!,
                file,
                action: actionType,
              })
            )

            sendFileAbortController.abort = (
              sendMtpDispatch as unknown as { abort: AbortController["abort"] }
            ).abort

            const { meta, payload } = await sendMtpDispatch

            const files = selectFilesSendingGroup(getState(), {
              filesIds: [file.id],
            })

            if (meta.requestStatus === "rejected" && meta.aborted) {
              wasAborted = true
              return
            }

            if (isMtpInitializeAccessError(payload)) {
              dispatch(setFilesTransferMode(FilesTransferMode.SerialPort))
              dispatch(
                setModeWithProgressReset({
                  fileId: file.id,
                  filesTransferMode: FilesTransferMode.SerialPort,
                })
              )
              wasAborted = true
              return
            }

            if (files[0]?.status === "finished") {
              console.log(`File ${file.name} already sent! Skipping....`)
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
                actionType: actionType,
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

            if (meta.requestStatus === "rejected" && meta.aborted) {
              wasAborted = true
              return
            }

            if (files[0]?.status === "finished") {
              console.log(`File ${file.name} already sent! Skipping....`)
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
            // To consider reducing the time
            await delay(2000)
            continue // retry this file
          } else {
            console.log(`File ${file.name} was cancelled by user. Skipping.`)
            const error = new AppError(ApiFileTransferError.Aborted, "Aborted")
            dispatch(sendFilesError({ id: file.id, error }))
            return
          }
        }
        currentFileIndex++
      }
    }
    await processFiles()
    clearInterval(mtpMonitor)

    if (wasAborted) {
      return
    }
    console.log("Files sent successfully")

    filesTransferMode = selectFilesTransferMode(getState())

    if (filesTransferMode === FilesTransferMode.SerialPort) {
      return
    }

    if (entitiesType === undefined) {
      return
    }

    if (actionType == SendFilesAction.ActionExport) {
      return
    }

    const entities = selectEntities(getState(), {
      deviceId,
      entitiesType,
    })

    if (entities === undefined || entities.data === undefined) {
      return
    }

    const filteredEntities = entities.data.filter((entity) => {
      return (
        sliceSegments(entity.filePath as string, 0, -1) ===
        sliceSegments(destinationPath)
      )
    })

    const loadedEntities = filteredEntities.length
    const notLoadedEntities = files.length - loadedEntities

    const roundedToHundred: number = Math.ceil(notLoadedEntities / 100)
    const delayValue = roundedToHundred * 3.5 * 1000

    console.log("Starting progress delay via notLoadedEntities / 100 * 3.5ms", {
      loadedEntities,
      notLoadedEntities,
      delayValue,
    })

    await delay(delayValue)

    console.log("Progress delay finished")

    const verifyLastOutboxData = async (
      attempts = 0
    ): Promise<undefined | AppError> => {
      const lastOutboxData = selectLastOutboxData(getState())

      console.log(attempts, "verifyLastOutboxData: ", lastOutboxData)

      const lastOutboxDataEntities = lastOutboxData?.entities ?? []
      if (lastOutboxDataEntities.length === 0) {
        console.log("No entities in last outbox data")
        return
      }

      if (attempts > 10) {
        console.log("Max attempts reached")
        return
      }

      await delay(2000)
      return await verifyLastOutboxData(++attempts)
    }
    console.log("Starting verification of last outbox data")

    await verifyLastOutboxData()

    console.log("Verification of last outbox data finished")

    return
  }
)
