/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import PurePhoneStorageAdapter from "Backend/adapters/pure-phone-storage/pure-phone-storage-adapter.class"
import StorageCategoryInfo from "Common/interfaces/storage-category-info.interface"
import DeviceService from "Backend/device-service"
import { Endpoint, Method } from "@mudita/mudita-center-pure"
import DeviceResponse, {
  DeviceResponseStatus,
} from "Backend/adapters/device-response.interface"

class PurePhoneStorage extends PurePhoneStorageAdapter {
  constructor(private deviceService: DeviceService) {
    super()
  }

  public async getAvailableSpace(): Promise<DeviceResponse<number>> {
    const { status, data } = await this.deviceService.request({
      endpoint: Endpoint.DeviceInfo,
      method: Method.Get,
    })

    if (status === DeviceResponseStatus.Ok && data) {
      return {
        status,
        data: Number(data.fsFree),
      }
    } else {
      return { status, error: { message: "Something went wrong" } }
    }
  }

  public async getCapacity(): Promise<DeviceResponse<number>> {
    const { status, data } = await this.deviceService.request({
      endpoint: Endpoint.DeviceInfo,
      method: Method.Get,
    })

    if (status === DeviceResponseStatus.Ok && data) {
      return {
        status,
        data: Number(data.fsTotal),
      }
    } else {
      return { status, error: { message: "Something went wrong" } }
    }
  }

  public getStorageCategories(): StorageCategoryInfo[] {
    return []
  }
}

const createPurePhoneStorageAdapter = (
  deviceService: DeviceService
): PurePhoneStorageAdapter => new PurePhoneStorage(deviceService)

export default createPurePhoneStorageAdapter
