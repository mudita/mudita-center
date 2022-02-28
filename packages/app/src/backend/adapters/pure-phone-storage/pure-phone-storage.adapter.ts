/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import PurePhoneStorageAdapter from "Backend/adapters/pure-phone-storage/pure-phone-storage-adapter.class"
import StorageCategoryInfo from "Common/interfaces/storage-category-info.interface"
import DeviceService from "Backend/device-service"
import { Endpoint, Method } from "@mudita/pure"
import DeviceResponse, {
  DeviceResponseStatus,
} from "Backend/adapters/device-response.interface"

const fromMebiToByte = (mebi: number): number => {
  const factor = 1048576
  return mebi * factor
}
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
        data: fromMebiToByte(Number(data.fsFree)),
      }
    } else {
      return {
        status,
        error: { message: "Get available space: Something went wrong" },
      }
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
        data: fromMebiToByte(Number(data.fsTotal)),
      }
    } else {
      return {
        status,
        error: { message: "Get capacity: Something went wrong" },
      }
    }
  }

  public getStorageCategories(): StorageCategoryInfo[] {
    return []
  }

  public getTotalSpace(): number {
    return 16000000000
  }
}

const createPurePhoneStorageAdapter = (
  deviceService: DeviceService
): PurePhoneStorageAdapter => new PurePhoneStorage(deviceService)

export default createPurePhoneStorageAdapter
