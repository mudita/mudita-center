import log from "Renderer/utils/log"

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

  log.warn("Test:", key)

  const set = (value: T) => {
    try {
      storage.setItem(key, JSON.stringify(value))
    } catch (error) {
      log.error(error)
    }
  }

  const get = () => {
    try {
      const item = storage.getItem(key)
      return item ? JSON.parse(item) : originalValue
    } catch (error) {
      log.error(error)
    }
  }

  const remove = () => storage.removeItem(key)

  return {
    setTemporaryValue: set,
    getTemporaryValue: get,
    removeTemporaryValue: remove,
  }
}
