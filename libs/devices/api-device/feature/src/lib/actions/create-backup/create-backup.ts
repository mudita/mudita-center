/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ApiDevice, PreBackupRequest } from "devices/api-device/models"
import { random } from "lodash"
import { postBackup } from "../../api/post-backup"
import { downloadFiles } from "../download-files/download-files"
import { preBackupStep } from "./pre-backup-step"
import { saveBackupStep } from "./save-backup-step"

interface CreateBackupParams {
  device: ApiDevice
  features: PreBackupRequest["features"]
  password?: string
  onProgress: (progress: number) => void
  abortController: AbortController
}
export const createBackup = async ({
  device,
  features,
  password,
  onProgress,
  abortController,
}: CreateBackupParams) => {
  onProgress(0)

  const backupId = random(1, 100000)
  let prebackupProgress = 0
  let downloadProgress = 0

  const handleProgress = () => {
    const totalProgress = prebackupProgress * 0.7 + downloadProgress * 0.3
    onProgress(Math.round(totalProgress))
  }

  try {
    const backupFiles = await preBackupStep({
      device,
      backupId,
      features,
      onProgress: (progress) => {
        prebackupProgress = progress
        handleProgress()
      },
      abortController,
    })

    const filesData = await downloadFiles({
      device,
      sourceFilePaths: Object.values(backupFiles),
      onProgress: (progress) => {
        downloadProgress = progress
        handleProgress()
      },
      abortController,
    })

    const backupData = Object.entries(backupFiles).reduce(
      (acc, [feature], index) => {
        acc[feature] = filesData[index]
        return acc
      },
      {} as Record<keyof typeof backupFiles, string>
    )
    await postBackup(device, { backupId })
    return await saveBackupStep({ device, files: backupData, password })
  } catch (error) {
    await postBackup(device, { backupId })
    if (abortController.signal.aborted) {
      throw abortController.signal
    }
    throw error
  } finally {
    onProgress(100)
  }
}
