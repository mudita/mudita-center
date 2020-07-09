interface UseTemporaryStorageHook {
  set: (value: any) => void
  get: () => any
  remove: () => void
}

export const useTemporaryStorage = (
  id: string | number,
  originalValue?: any
): UseTemporaryStorageHook => {
  const storage = window.sessionStorage
  const key = `temporary_storage_${id}`

  const set = (value: any) => storage.setItem(key, JSON.stringify(value))

  const get = () => {
    const item = storage.getItem(key)
    return item ? JSON.parse(item) : originalValue
  }

  const remove = () => storage.removeItem(key)

  return {
    set,
    get,
    remove,
  }
}
