/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { sum } from "lodash"
import { TransferProgress } from "app-utils/models"

type TransferProgressTrackerParams = {
  onProgress?: (p: TransferProgress) => void
}

export const createTransferProgressTracker = ({
  onProgress,
}: TransferProgressTrackerParams) => {
  const uploadedBytesByFileId = new Map<string, number>()
  let batchTotalBytes: number | undefined
  let lastGlobalLoaded = 0

  const reportProgress = (progress: TransferProgress) => {
    if (
      typeof progress.total === "number" &&
      progress.total > 0 &&
      batchTotalBytes === undefined
    ) {
      batchTotalBytes = progress.total
    }

    if (progress.file) {
      const prev = uploadedBytesByFileId.get(progress.file.id) ?? 0
      const next = Math.max(prev, progress.file.loaded)
      uploadedBytesByFileId.set(progress.file.id, next)
    }

    const loadedGlobal = sum(Array.from(uploadedBytesByFileId.values()))
    if (loadedGlobal < lastGlobalLoaded) return
    lastGlobalLoaded = loadedGlobal

    const percentGlobal =
      batchTotalBytes && batchTotalBytes > 0
        ? Math.min(Math.floor((loadedGlobal / batchTotalBytes) * 100), 100)
        : 0

    if (!onProgress) return

    if (progress.file) {
      const fileLoaded = uploadedBytesByFileId.get(progress.file.id) ?? 0
      const filePercent =
        progress.file.size > 0
          ? Math.min(Math.floor((fileLoaded / progress.file.size) * 100), 100)
          : 0

      onProgress({
        loaded: loadedGlobal,
        total: batchTotalBytes as number,
        progress: percentGlobal,
        file: {
          ...progress.file,
          loaded: fileLoaded,
          progress: filePercent,
        },
      })
    } else {
      onProgress({
        loaded: loadedGlobal,
        total: batchTotalBytes as number,
        progress: percentGlobal,
      })
    }
  }

  const finalizeProgress = () => {
    if (!onProgress) {
      return
    }
    if (typeof batchTotalBytes !== "number" || batchTotalBytes <= 0) {
      return
    }
    if (lastGlobalLoaded >= batchTotalBytes) {
      return
    }

    lastGlobalLoaded = batchTotalBytes
    onProgress({
      loaded: batchTotalBytes,
      total: batchTotalBytes,
      progress: 100,
    })
  }

  return {
    reportProgress,
    finalizeProgress,
  }
}
