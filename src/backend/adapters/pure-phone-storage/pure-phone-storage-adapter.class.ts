import StorageCategoryInfo from "Common/interfaces/storage-category-info.interface"

export default abstract class PurePhoneStorageAdapter {
  public abstract getCapacity(): number
  public abstract getAvailableSpace(): number
  public abstract getStorageCategories(): StorageCategoryInfo[]
}
