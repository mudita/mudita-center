/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import {
  checkPreBackupRequest,
  postBackupRequest,
  preRestoreRequest,
  saveBackupFileRequest,
  sendClearRequest,
  startPreBackupRequest,
} from "device/feature"

import { ActionName } from "../action-names"
import { getFile } from "../file-transfer/get-file.action"
import {
  setBackupProcess,
  setBackupProcessFileStatus,
  setBackupProcessStatus,
} from "./actions"
import { refreshBackupList } from "./refresh-backup-list.action"

export const restoreBackup = createAsyncThunk<
  undefined,
  {
    features: string[]
    password?: string
  },
  { state: ReduxRootState }
>(
  ActionName.RestoreBackup,
  async (
    { features, password },
    { getState, dispatch, rejectWithValue, signal }
  ) => {
    // let aborted = false

    // const abortListener = async () => {
    //   signal.removeEventListener("abort", abortListener)
    //   aborted = true
    //   abortFileRequest?.()
    //   await clearTransfers?.()
    //   if (backupId && deviceId) {
    //     await postBackupRequest(backupId, deviceId)
    //   }
    // }
    // signal.addEventListener("abort", abortListener)

    // if (aborted) {
    //   return rejectWithValue(undefined)
    // }

    console.log("restore start")

    const deviceId = getState().genericViews.activeDevice

    const preRestoreResponse = await preRestoreRequest(features, deviceId)

    if (!preRestoreResponse.ok) {
      console.log(`preRestore failed`)
      rejectWithValue(undefined)
    }

    // dispatch(
    //   setBackupProcess({
    //     status: "PRE_BACKUP",
    //     featureFilesTransfer: features.reduce((acc, item) => {
    //       return { ...acc, [item]: { done: false } }
    //     }, {}),
    //   })
    // )

    // const deviceId = getState().genericViews.activeDevice

    // if (deviceId === undefined || aborted) {
    //   return rejectWithValue(undefined)
    // }

    // const startPreBackupResponse = await startPreBackupRequest(
    //   features,
    //   deviceId
    // )

    // if (!startPreBackupResponse.ok || aborted) {
    //   console.log(startPreBackupResponse.error)
    //   return rejectWithValue(undefined)
    // }

    // const backupId = startPreBackupResponse.data.backupId
    // let backupFeaturesFiles = startPreBackupResponse.data.features
    // let abortFileRequest: VoidFunction
    // const featureToTransferId: Record<string, number> = {}

    // const clearTransfers = () => {
    //   return Promise.all(
    //     Object.values(featureToTransferId).map(async (transferId) => {
    //       await sendClearRequest(transferId)
    //     })
    //   )
    // }

    // while (backupFeaturesFiles === undefined) {
    //   if (aborted) {
    //     return rejectWithValue(undefined)
    //   }
    //   const checkPreBackupResponse = await checkPreBackupRequest(
    //     backupId,
    //     features,
    //     deviceId
    //   )

    //   if (!checkPreBackupResponse.ok) {
    //     console.log(checkPreBackupResponse.error)
    //     return rejectWithValue(undefined)
    //   }

    //   backupFeaturesFiles = checkPreBackupResponse.data.features
    // }
    // dispatch(setBackupProcessStatus("FILES_TRANSFER"))

    // for (let i = 0; i < features.length; ++i) {
    //   if (aborted) {
    //     return rejectWithValue(undefined)
    //   }
    //   const feature = features[i]

    //   dispatch(setBackupProcessFileStatus({ feature, status: "IN_PROGRESS" }))
    //   const filePromise = dispatch(
    //     getFile({
    //       deviceId,
    //       filePath: backupFeaturesFiles[feature],
    //       targetPath: "",
    //     })
    //   )
    //   abortFileRequest = filePromise.abort
    //   const file = await filePromise
    //   if (
    //     file.meta.requestStatus === "fulfilled" &&
    //     file.payload &&
    //     "transferId" in file.payload
    //   ) {
    //     featureToTransferId[feature] = file.payload.transferId
    //     dispatch(setBackupProcessFileStatus({ feature, status: "DONE" }))
    //   } else if (!aborted) {
    //     console.log("Error while downloading file")
    //     await clearTransfers()
    //     await postBackupRequest(backupId, deviceId)
    //     return rejectWithValue(undefined)
    //   }
    // }
    // if (aborted) {
    //   return rejectWithValue(undefined)
    // }
    // dispatch(setBackupProcessStatus("SAVE_FILE"))
    // const saveBackupFileResponse = await saveBackupFileRequest(
    //   featureToTransferId,
    //   deviceId,
    //   password
    // )

    // if (!saveBackupFileResponse.ok) {
    //   console.log("Error while saving file")
    //   await clearTransfers()
    //   await postBackupRequest(backupId, deviceId)
    //   return rejectWithValue(undefined)
    // }

    // dispatch(refreshBackupList())

    // if (!aborted) {
    //   await postBackupRequest(backupId, deviceId)
    // }
    return undefined
  }
)
