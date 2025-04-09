/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import {
  checkPreBackupRequest,
  postBackupRequest,
  saveBackupFileRequest,
  sendClearRequest,
  startPreBackupRequest,
} from "device/feature"
import { ActionName } from "../action-names"
import { getFile } from "../file-transfer/get-file.action"
import { selectActiveApiDeviceId } from "../selectors/select-active-api-device-id"
import {
  setBackupProcess,
  setBackupProcessFileStatus,
  setBackupProcessStatus,
} from "./actions"
import { refreshBackupList } from "./refresh-backup-list.action"
import { BackupProcessFileStatus, BackupProcessStatus } from "./backup.types"
import { delay } from "shared/utils"

const readingProgressFactor = 0.8
const fileTransferProgressFactor = 0.1
// Sums to 0.9, because we need to leave 10% for the save file progress

export const createBackup = createAsyncThunk<
  undefined,
  {
    features: string[]
    password?: string
  },
  { state: ReduxRootState }
>(
  ActionName.CreateBackup,
  async (
    { features, password },
    { getState, dispatch, rejectWithValue, signal }
  ) => {
    console.log("createBackup", features, password)
    let totalProgress = 0
    let aborted = false

    const abortListener = async () => {
      signal.removeEventListener("abort", abortListener)
      aborted = true
      abortFileRequest?.()
      await clearTransfers?.()
      if (backupId && deviceId) {
        await postBackupRequest(backupId, deviceId)
      }
    }
    signal.addEventListener("abort", abortListener)

    if (aborted) {
      return rejectWithValue(undefined)
    }

    dispatch(
      setBackupProcess({
        status: BackupProcessStatus.PreBackup,
        featureFilesTransfer: features.reduce((acc, item) => {
          return { ...acc, [item]: { done: false } }
        }, {}),
        progress: 0,
      })
    )

    const deviceId = selectActiveApiDeviceId(getState())

    if (deviceId === undefined || aborted) {
      return rejectWithValue(undefined)
    }

    const startPreBackupResponse = await startPreBackupRequest(
      features,
      deviceId
    )

    console.log(startPreBackupResponse)
    console.log("startPreBackupResponse")

    if (!startPreBackupResponse.ok || aborted) {
      console.log("error", startPreBackupResponse.error)
      return rejectWithValue(undefined)
    }

    const backupId = startPreBackupResponse.data.backupId
    let backupFeaturesFiles = startPreBackupResponse.data.features
    let abortFileRequest: VoidFunction
    const featureToTransferId: Record<string, number> = {}

    const clearTransfers = () => {
      return Promise.all(
        Object.values(featureToTransferId).map(async (transferId) => {
          await sendClearRequest(transferId)
        })
      )
    }

    while (backupFeaturesFiles === undefined) {
      if (aborted) {
        return rejectWithValue(undefined)
      }
      await delay()
      const checkPreBackupResponse = await checkPreBackupRequest(
        backupId,
        features,
        deviceId
      )

      if (!checkPreBackupResponse.ok) {
        console.log(checkPreBackupResponse.error)
        return rejectWithValue(undefined)
      }

      dispatch(
        setBackupProcessStatus({
          status: BackupProcessStatus.PreBackup,
          progress:
            (checkPreBackupResponse.data.progress ?? 11) *
            readingProgressFactor,
        })
      )
      backupFeaturesFiles = checkPreBackupResponse.data.features
    }
    totalProgress = 100 * readingProgressFactor
    dispatch(
      setBackupProcessStatus({
        status: BackupProcessStatus.FilesTransfer,
        progress: totalProgress,
      })
    )

    const singleFeatureProgressFactor = 1 / features.length

    for (const feature of features) {
      if (aborted) {
        return rejectWithValue(undefined)
      }
      dispatch(
        setBackupProcessFileStatus({
          feature,
          status: BackupProcessFileStatus.InProgress,
        })
      )
      const filePromise = dispatch(
        getFile({
          deviceId,
          filePath: backupFeaturesFiles[feature],
          targetPath: "",
          onProgress: (progress) => {
            dispatch(
              setBackupProcessStatus({
                status: BackupProcessStatus.FilesTransfer,
                progress:
                  totalProgress +
                  progress *
                    fileTransferProgressFactor *
                    singleFeatureProgressFactor,
              })
            )
          },
        })
      )
      abortFileRequest = filePromise.abort
      const file = await filePromise
      if (
        file.meta.requestStatus === "fulfilled" &&
        file.payload &&
        "transferId" in file.payload
      ) {
        featureToTransferId[feature] = file.payload.transferId
        dispatch(
          setBackupProcessFileStatus({
            feature,
            status: BackupProcessFileStatus.Done,
          })
        )
        totalProgress +=
          singleFeatureProgressFactor * fileTransferProgressFactor
      } else if (!aborted) {
        console.log("Error while downloading file")
        await clearTransfers()
        await postBackupRequest(backupId, deviceId)
        return rejectWithValue(undefined)
      }
    }
    if (aborted) {
      return rejectWithValue(undefined)
    }
    dispatch(
      setBackupProcessStatus({
        status: BackupProcessStatus.SaveFile,
        progress: 100 * (readingProgressFactor + fileTransferProgressFactor),
      })
    )
    const saveBackupFileResponse = await saveBackupFileRequest(
      featureToTransferId,
      deviceId,
      password
    )

    if (!saveBackupFileResponse.ok) {
      console.log("Error while saving file")
      await clearTransfers()
      await postBackupRequest(backupId, deviceId)
      return rejectWithValue(undefined)
    }

    dispatch(
      setBackupProcessStatus({
        status: BackupProcessStatus.SaveFile,
        progress: 100,
      })
    )
    dispatch(refreshBackupList())

    await delay()

    if (!aborted) {
      await postBackupRequest(backupId, deviceId)
    }
    return undefined
  }
)
