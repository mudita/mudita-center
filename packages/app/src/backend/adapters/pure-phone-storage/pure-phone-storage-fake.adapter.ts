/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import PurePhoneStorageAdapter from "Backend/adapters/pure-phone-storage/pure-phone-storage-adapter.class"
import StorageCategoryInfo from "Common/interfaces/storage-category-info.interface"
import DeviceResponse, {
  DeviceResponseStatus,
} from "Backend/adapters/device-response.interface"

class PurePhoneStorageFakeAdapter extends PurePhoneStorageAdapter {
  public async getAvailableSpace(): Promise<DeviceResponse<number>> {
    return {
      status: DeviceResponseStatus.Ok,
      data: 1717986918,
    }
  }

  public async getCapacity(): Promise<DeviceResponse<number>> {
    return {
      status: DeviceResponseStatus.Ok,
      data: 17179869184,
    }
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
