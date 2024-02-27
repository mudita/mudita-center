/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import {
  checkPreBackupRequest,
  startPreBackupRequest,
} from "Libs/device/feature/src/lib/backup"
import { ActionName } from "../action-names"
import { getFile } from "../file-transfer/get-file.action"

export const createBackup = createAsyncThunk<
  undefined,
  {
    features: string[]
  },
  { state: ReduxRootState }
>(ActionName.CreateBackup, async ({ features }, { getState, dispatch }) => {
  const deviceId = getState().genericViews.activeDevice

  if (deviceId === undefined) {
    return undefined
  }

  const startPreBackupResponse = await startPreBackupRequest(features, deviceId)

  if (!startPreBackupResponse.ok) {
    return undefined
  }

  const backupId = startPreBackupResponse.data.backupId
  let backupFeaturesFiles = startPreBackupResponse.data.features

  while (backupFeaturesFiles === undefined) {
    const checkPreBackupResponse = await checkPreBackupRequest(
      backupId,
      features,
      deviceId
    )

    if (!checkPreBackupResponse.ok) {
      return undefined
    }

    backupFeaturesFiles = checkPreBackupResponse.data.features
  }

  for (let i = 0; i < features.length; ++i) {
    const file = await dispatch(
      getFile({
        deviceId,
        filePath: backupFeaturesFiles[features[i]],
        targetPath: "",
      })
    )
    if (
      file.meta.requestStatus === "fulfilled" &&
      file.payload &&
      "transferId" in file.payload
    ) {
      const transferId = file.payload.transferId
    }
  }

  return undefined
})
