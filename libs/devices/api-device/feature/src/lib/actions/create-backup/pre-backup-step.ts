/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  ApiDevice,
  PreBackupRequest,
  PreBackupResponse200,
} from "devices/api-device/models"
import { preBackup } from "../../api/pre-backup"
import { delayUntil } from "app-utils/common"

interface PreBackupParams {
  device: ApiDevice
  backupId: number
  features: PreBackupRequest["features"]
  onProgress: (progress: number) => void
  abortController: AbortController
}
export const preBackupStep = async ({
  device,
  backupId,
  features,
  onProgress,
  abortController,
}: PreBackupParams) => {
  onProgress(0)

  // Inform the device to prepare the backup files
  const initialPreBackupResponse = await preBackup(device, {
    backupId,
    features,
  })
  if (!initialPreBackupResponse.ok) {
    throw new Error("Failed to prepare backup")
  }

  // Wait for backup files to be ready for download
  let backupFiles: PreBackupResponse200["features"] = {}
  if (initialPreBackupResponse.status === 200) {
    backupFiles = initialPreBackupResponse.body.features
  } else if (initialPreBackupResponse.status === 202) {
    let preBackupResponseStatus: 200 | 202 = 202

    while (preBackupResponseStatus === 202) {
      if (abortController.signal.aborted) {
        throw new Error("Backup aborted")
      }
      const loopedPreBackupResponse = await delayUntil(
        preBackup(device, { backupId }),
        250
      )
      if (!loopedPreBackupResponse.ok) {
        throw new Error("Failed to get backup progress")
      }
      onProgress(loopedPreBackupResponse.body.progress)
      if (loopedPreBackupResponse.status === 200) {
        backupFiles = loopedPreBackupResponse.body.features
      }
      preBackupResponseStatus = loopedPreBackupResponse.status
    }
  }

  onProgress(100)
  return backupFiles
}
