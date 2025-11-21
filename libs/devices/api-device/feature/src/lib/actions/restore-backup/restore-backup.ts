/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { random } from "lodash"
import { ApiDevice, PreRestoreRequest } from "devices/api-device/models"
import { serialUploadFiles } from "../serial-upload-files/serial-upload-files"
import { deleteRestore } from "../../api/delete-restore"
import { preRestoreStep } from "./pre-restore-step"
import { restoreStep } from "./restore-step"

export interface RestoreBackupParams {
  device: ApiDevice
  features: (PreRestoreRequest["features"][number] & { data: unknown })[]
  onProgress: (progress: number) => void
  abortController: AbortController
}

export const restoreBackup = async ({
  device,
  features,
  onProgress,
  abortController,
}: RestoreBackupParams) => {
  onProgress(0)

  const restoreId = random(1, 100000)
  let restoreProgress = 0
  let uploadProgress = 0

  const handleProgress = () => {
    const totalProgress = restoreProgress * 0.7 + uploadProgress * 0.3
    onProgress(Math.round(totalProgress))
  }

  try {
    const featuresTargets = await preRestoreStep({
      device,
      restoreId,
      features: features.map(({ feature, key }) => ({ feature, key })),
    })
    if (abortController.signal.aborted) {
      throw new Error("Restore aborted")
    }

    const sourceData = featuresTargets.map(({ feature }) => {
      const featureData = features.find((f) => f.feature === feature)
      if (!featureData) {
        throw new Error(`No data for feature ${feature}`)
      }
      return btoa(JSON.stringify(featureData.data))
    })
    await serialUploadFiles({
      device,
      files: featuresTargets.map(({ filePath }, index) => ({
        id: `feature-${index}`,
        source: { type: "memory", data: sourceData },
        target: { type: "path", path: filePath },
      })),
      onProgress: ({ progress }) => {
        uploadProgress = progress
        handleProgress()
      },
      abortController,
    })

    await restoreStep({
      device,
      restoreId,
      onProgress: (progress) => {
        restoreProgress = progress
        handleProgress()
      },
    })
  } catch (error) {
    await deleteRestore(device, { restoreId })
    if (abortController.signal.aborted) {
      throw abortController.signal
    }
    throw error
  } finally {
    onProgress(100)
  }
}
