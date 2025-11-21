/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { sum } from "lodash"
import { TransferProgress } from "app-utils/models"

export const createProgressTracker = ({
  chunksCount,
  totalFileSize,
  window = 20,
}: {
  chunksCount: number
  totalFileSize: number
  window?: number
}) => {
  const avgSpeeds: number[] = []

  return {
    update: ({
      i,
      chunkSize,
      currentChunkTime, // in milliseconds
    }: {
      i: number
      chunkSize: number
      currentChunkTime: number
    }): TransferProgress => {
      const currentChunkTimeSeconds = currentChunkTime / 1000
      const currentSpeed = Math.round(chunkSize / currentChunkTimeSeconds)

      avgSpeeds.push(currentSpeed)
      if (avgSpeeds.length > window) {
        avgSpeeds.shift()
      }

      const averageSpeed = Math.round(sum(avgSpeeds) / avgSpeeds.length)
      const progressPercentage = Math.floor(((i + 1) / chunksCount) * 100)
      const totalBytesTransferred = Math.min((i + 1) * chunkSize, totalFileSize)
      const bytesLeft = totalFileSize - totalBytesTransferred
      const estimatedTimeLeft =
        averageSpeed > 0 ? Math.ceil(bytesLeft / averageSpeed) : undefined

      return {
        progress: progressPercentage,
        loaded: totalBytesTransferred,
        total: totalFileSize,
        rate: averageSpeed,
        estimated: estimatedTimeLeft,
      }
    },
  }
}
