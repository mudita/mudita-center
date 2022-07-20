/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import PurePhoneBatteryServiceAdapter from "App/__deprecated__/backend/adapters/pure-phone-battery-service/pure-phone-battery-service-adapter.class"
import DeviceService from "App/__deprecated__/backend/device-service"
import { Endpoint, Method } from "@mudita/pure"
import {
  RequestResponse,
  RequestResponseStatus,
} from "App/core/types/request-response.interface"

class PurePhoneBatteryService extends PurePhoneBatteryServiceAdapter {
  constructor(private deviceService: DeviceService) {
    super()
  }

  public async getBatteryLevel(): Promise<RequestResponse<number>> {
    const { status, data } = await this.deviceService.request({
      endpoint: Endpoint.DeviceInfo,
      method: Method.Get,
    })

    if (status === RequestResponseStatus.Ok && data) {
      return {
        status,
        data: Number((Number(data.batteryLevel) / 100).toFixed(2)),
      }
    } else {
      return {
        status,
        error: { message: "Get battery level: Something went wrong" },
      }
    }
  }

  // TODO: handle this mock in this task -> https://appnroll.atlassian.net/browse/PDA-589
  public getChargingStatus(): boolean {
    return true
  }
}

const createPurePhoneBatteryAdapter = (
  deviceService: DeviceService
): PurePhoneBatteryServiceAdapter => new PurePhoneBatteryService(deviceService)

export default createPurePhoneBatteryAdapter
