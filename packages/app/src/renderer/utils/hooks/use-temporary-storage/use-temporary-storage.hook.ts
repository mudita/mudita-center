/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import logger from "App/main/utils/logger"

export interface UseTemporaryStorageHook<T> {
  setTemporaryValue: (value: T) => void
  getTemporaryValue: () => T
  removeTemporaryValue: () => void
}

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
      logger.error(error)
    }
  }

  const get = () => {
    try {
      const item = storage.getItem(key)
      return item ? JSON.parse(item) : originalValue
    } catch (error) {
      logger.error(error)
    }
  }

  const remove = () => storage.removeItem(key)

  return {
    setTemporaryValue: set,
    getTemporaryValue: get,
    removeTemporaryValue: remove,
  }
}
