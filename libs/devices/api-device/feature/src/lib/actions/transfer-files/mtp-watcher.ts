/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export type MtpWatcher = {
  start: () => void
  stop: () => void
}

export type MtpWatcherFactory = (args: {
  onReconnect: () => void
}) => MtpWatcher

const checkMtpConnection = (): boolean => {
  return false
}

export const createMtpWatcher: MtpWatcherFactory = ({ onReconnect }) => {
  let intervalId: NodeJS.Timeout | null = null

  const start = () => {
    if (intervalId) {
      return
    }

    intervalId = setInterval(() => {
      const isConnected = checkMtpConnection()
      if (!isConnected) {
        onReconnect()
      }
    }, 2500)
  }

  const stop = () => {
    if (intervalId) {
      clearInterval(intervalId)
      intervalId = null
    }
  }

  return {
    start,
    stop,
  }
}
