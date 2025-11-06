/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { random } from "lodash"
import { ApiDevice, PreBackupRequest } from "devices/api-device/models"
import { FailedTransferItem } from "devices/common/models"
import { postBackup } from "../../api/post-backup"
import { serialDownloadFiles } from "../serial-download-files/serial-download-files"
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

    const serialDownloadFilesResult = await serialDownloadFiles({
      device,
      files: Object.values(backupFiles).map((path) => ({
        id: path,
        source: { type: "path", path },
        target: { type: "memory" },
      })),
      onProgress: ({ progress }) => {
        downloadProgress = progress
        handleProgress()
      },
      abortController,
    })

    if (!serialDownloadFilesResult.ok) {
      throw new Error("Failed to download backup files from device")
    }

    const filesData = (
      serialDownloadFilesResult.data as {
        files: (string | Uint8Array)[]
        failed?: FailedTransferItem[]
      }
    ).files

    const backupData = Object.entries(backupFiles).reduce(
      (acc, [feature], index) => {
        acc[feature] = filesData[index] as string
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
