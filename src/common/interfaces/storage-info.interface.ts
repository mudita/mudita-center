import StorageCategoryInfo from "Common/interfaces/storage-category-info.interface"

export default interface StorageInfo {
  // Capacity in bytes.
  readonly capacity: number

  // Availability in bytes.
  readonly available: number

  // Categories of the occupied storage
  readonly categories: StorageCategoryInfo[]
}
