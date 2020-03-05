import PurePhoneStorageAdapter from "Backend/adapters/pure-phone-storage/pure-phone-storage-adapter.class"
import StorageCategoryInfo from "Common/interfaces/storage-category-info.interface"

class PurePhoneStorageFakeAdapter extends PurePhoneStorageAdapter {
  public getAvailableSpace(): number {
    return 1717986918
  }

  public getCapacity(): number {
    return 17179869184
  }

  public getStorageCategories(): StorageCategoryInfo[] {
    return [
      {
        filesCount: 42,
        label: "music",
        size: 1000,
      },
      {
        filesCount: 6,
        label: "storage",
        size: 2000,
      },
      {
        filesCount: 9,
        label: "voice recorder",
        size: 3000,
      },
    ]
  }
}

const createFakePurePhoneStorageAdapter = (): PurePhoneStorageAdapter =>
  new PurePhoneStorageFakeAdapter()

export default createFakePurePhoneStorageAdapter
