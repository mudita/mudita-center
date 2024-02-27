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
} from "device/feature"

import { ActionName } from "../action-names"
import { getFile } from "../file-transfer/get-file.action"

export const createBackup = createAsyncThunk<
  undefined,
  {
    features: string[]
    password?: string
  },
  { state: ReduxRootState }
>(
  ActionName.CreateBackup,
  async ({ features, password }, { getState, dispatch }) => {
    console.log("start createBackup")
    const deviceId = getState().genericViews.activeDevice

    if (deviceId === undefined) {
      console.log("No device")
      return undefined
    }

    const startPreBackupResponse = await startPreBackupRequest(
      features,
      deviceId
    )

    if (!startPreBackupResponse.ok) {
      console.log(startPreBackupResponse.error)
      console.log("Error while starting pre backup")
      return undefined
    }

    const backupId = startPreBackupResponse.data.backupId
    let backupFeaturesFiles = startPreBackupResponse.data.features

    console.log("1")

    while (backupFeaturesFiles === undefined) {
      console.log("1.a")
      await new Promise((resolve) => setTimeout(resolve, 10000))
      console.log("1.b")
      const checkPreBackupResponse = await checkPreBackupRequest(
        backupId,
        features,
        deviceId
      )

      if (!checkPreBackupResponse.ok) {
        console.log(checkPreBackupResponse.error)
        console.log("Error while checking pre backup")
        return undefined
      }

      backupFeaturesFiles = checkPreBackupResponse.data.features
    }
    console.log("2")

    const featureToTransferId: Record<string, number> = {}

    for (let i = 0; i < features.length; ++i) {
      const feature = features[i]

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
      } else {
        console.log("Error while downloading file")
        await Promise.all(
          Object.values(featureToTransferId).map(async (transferId) => {
            await sendClearRequest(transferId)
          })
        )
        return undefined
      }
    }

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
      return undefined
    }

    return undefined
  }
)
