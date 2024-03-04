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
import {
  setBackupProcess,
  setBackupProcessFileStatus,
  setBackupProcessStatus,
} from "./actions"
import { isEmpty } from "lodash"

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
    dispatch(
      setBackupProcess({
        status: "PRE_BACKUP",
        featureFilesTransfer: features.reduce((acc, item) => {
          return { ...acc, [item]: { done: false } }
        }, {}),
      })
    )

    const deviceId = getState().genericViews.activeDevice

    if (deviceId === undefined) {
      return rejectWithValue(undefined)
    }

    const startPreBackupResponse = await startPreBackupRequest(
      features,
      deviceId
    )

    if (!startPreBackupResponse.ok) {
      console.log(startPreBackupResponse.error)
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

    signal.addEventListener("abort", async () => {
      abortFileRequest?.()
      await clearTransfers()
      if (isEmpty(featureToTransferId)) {
        await postBackupRequest(backupId, deviceId)
      }
    })

    while (backupFeaturesFiles === undefined) {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const checkPreBackupResponse = await checkPreBackupRequest(
        backupId,
        features,
        deviceId
      )

      if (!checkPreBackupResponse.ok) {
        console.log(checkPreBackupResponse.error)
        return rejectWithValue(undefined)
      }

      backupFeaturesFiles = checkPreBackupResponse.data.features
    }
    dispatch(setBackupProcessStatus("FILES_TRANSFER"))

    for (let i = 0; i < features.length; ++i) {
      const feature = features[i]

      dispatch(setBackupProcessFileStatus({ feature, status: "IN_PROGRESS" }))
      const filePromise = dispatch(
        getFile({
          deviceId,
          filePath: backupFeaturesFiles[feature],
          targetPath: "",
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
        dispatch(setBackupProcessFileStatus({ feature, status: "DONE" }))
      } else {
        console.log("Error while downloading file")
        await clearTransfers()
        await postBackupRequest(backupId, deviceId)
        return rejectWithValue(undefined)
      }
    }
    dispatch(setBackupProcessStatus("SAVE_FILE"))
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

    await postBackupRequest(backupId, deviceId)
    return undefined
  }
)
