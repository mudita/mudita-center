/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import logger from "App/__deprecated__/main/utils/logger"

export interface UseTemporaryStorageHook<T> {
  setTemporaryValue: (value: T) => void
  getTemporaryValue: () => T
  removeTemporaryValue: () => void
}

// AUTO DISABLED - fix me if you like :)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useTemporaryStorage = <T = any>(
  id: string | number,
  originalValue?: T
): UseTemporaryStorageHook<T> => {
  const storage = window.sessionStorage
  const key = `temporary_storage_${id}`

  const set = (value: T) => {
    try {
      storage.setItem(key, JSON.stringify(value))
    } catch (error) {
      logger.error(
        `Temporary storage: saving fails. Data: ${JSON.stringify(error)}`
      )
    }
  }

  const get = () => {
    try {
      const item = storage.getItem(key)
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return item ? JSON.parse(item) : originalValue
    } catch (error) {
      logger.error(
        `Temporary storage: reading fails. Data: ${JSON.stringify(error)}`
      )
    }
  }

  const remove = () => storage.removeItem(key)

  return {
    setTemporaryValue: set,
    getTemporaryValue: get,
    removeTemporaryValue: remove,
  }
}
