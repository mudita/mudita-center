export default interface StorageCategoryInfo {
  // Category's label.
  readonly label: "music" | "voice recorder" | "storage"

  // Total number of files in this category.
  readonly filesCount: number

  // The space occupied by all files of this category (in bytes).
  readonly size: number
}
