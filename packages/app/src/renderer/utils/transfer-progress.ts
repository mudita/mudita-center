/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

export interface TransferProgress {
  total?: number
  received: number
  percent?: number
  timeLeft?: number
  speed: number
}

const transferProgress = (
  totalBytes: number,
  receivedBytes: number,
  startTime: number
): TransferProgress => {
  const percent = Number(((receivedBytes / totalBytes) * 100).toFixed(2))
  const totalTime = new Date().getTime() / 1000 - Math.round(startTime)
  const speed = Math.round(receivedBytes / totalTime)
  const timeLeft = Math.round((totalBytes - receivedBytes) / speed)

  return {
    total: totalBytes || undefined,
    received: receivedBytes,
    percent: totalBytes ? percent || 0 : undefined,
    timeLeft: timeLeft >= 0 && timeLeft !== Infinity ? timeLeft : undefined,
    speed,
  }
}

export default transferProgress
