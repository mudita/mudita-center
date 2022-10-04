/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import PurePhoneStorageAdapter from "App/__deprecated__/backend/adapters/pure-phone-storage/pure-phone-storage-adapter.class"
import StorageCategoryInfo from "App/__deprecated__/common/interfaces/storage-category-info.interface"
import {
  RequestResponse,
  RequestResponseStatus,
} from "App/core/types/request-response.interface"

class PurePhoneStorageFakeAdapter extends PurePhoneStorageAdapter {
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/require-await
  public async getSystemReservedSpace(): Promise<RequestResponse<number>> {
    return {
      status: RequestResponseStatus.Ok,
      data: 1717986918,
    }
  }
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/require-await
  public async getUsedUserSpace(): Promise<RequestResponse<number>> {
    return {
      status: RequestResponseStatus.Ok,
      data: 1717986918,
    }
  }
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/require-await
  public async getTotalSpace(): Promise<RequestResponse<number>> {
    return {
      status: RequestResponseStatus.Ok,
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
