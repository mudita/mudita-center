import StorageCategoryInfo from "Common/interfaces/storage-category-info.interface"
import DeviceResponse from "Backend/adapters/device-response.interface"

export default abstract class PurePhoneStorageAdapter {
  public abstract getCapacity(): Promise<DeviceResponse<number>>
  public abstract getAvailableSpace(): Promise<DeviceResponse<number>>
  public abstract getStorageCategories(): StorageCategoryInfo[]
}
