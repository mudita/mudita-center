/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import {
  saveBackupFileRequest,
  checkPreBackupRequest,
  startPreBackupRequest,
  sendClearRequest,
  postBackupRequest,
} from "device/feature"

import { ActionName } from "../action-names"
import { getFile } from "../file-transfer/get-file.action"
import {
  setBackupProcess,
  setBackupProcessStatus,
  setBackupProcessFileStatus,
} from "./actions"
import { refreshBackupList } from "./refresh-backup-list.action"

export const createBackup = createAsyncThunk<
  undefined,
  {
    features: string[]
    password?: string
  },
  { state: ReduxRootState }
>(
  ActionName.CreateBackup,
  async ({ features, password }, { getState, dispatch, rejectWithValue }) => {
    console.log("start createBackup")

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
      console.log("No device")
      return rejectWithValue(undefined)
    }

    const startPreBackupResponse = await startPreBackupRequest(
      features,
      deviceId
    )

    if (!startPreBackupResponse.ok) {
      console.log(startPreBackupResponse.error)
      console.log("Error while starting pre backup")
      return rejectWithValue(undefined)
    }

    const backupId = startPreBackupResponse.data.backupId
    let backupFeaturesFiles = startPreBackupResponse.data.features

    while (backupFeaturesFiles === undefined) {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const checkPreBackupResponse = await checkPreBackupRequest(
        backupId,
        features,
        deviceId
      )

      if (!checkPreBackupResponse.ok) {
        console.log(checkPreBackupResponse.error)
        console.log("Error while checking pre backup")
        return rejectWithValue(undefined)
      }

      backupFeaturesFiles = checkPreBackupResponse.data.features
    }
    dispatch(setBackupProcessStatus("FILES_TRANSFER"))

    const featureToTransferId: Record<string, number> = {}

    for (let i = 0; i < features.length; ++i) {
      const feature = features[i]

      dispatch(setBackupProcessFileStatus({ feature, status: "IN_PROGRESS" }))
      const file = await dispatch(
        getFile({
          deviceId,
          filePath: backupFeaturesFiles[feature],
          targetPath: "",
        })
      )
      if (
        file.meta.requestStatus === "fulfilled" &&
        file.payload &&
        "transferId" in file.payload
      ) {
        const transferId = file.payload.transferId
        featureToTransferId[feature] = transferId
        dispatch(setBackupProcessFileStatus({ feature, status: "DONE" }))
      } else {
        console.log("Error while downloading file")
        await Promise.all(
          Object.values(featureToTransferId).map(async (transferId) => {
            await sendClearRequest(transferId)
          })
        )
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
      await Promise.all(
        Object.values(featureToTransferId).map(async (transferId) => {
          await sendClearRequest(transferId)
        })
      )
      await postBackupRequest(backupId, deviceId)
      return rejectWithValue(undefined)
    }

    await postBackupRequest(backupId, deviceId)
    dispatch(refreshBackupList())
    return undefined
  }
)
