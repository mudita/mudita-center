/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { CaseColour, Endpoint, Method } from "@mudita/pure"
import DeviceResponse, {
  DeviceResponseStatus,
} from "Backend/adapters/device-response.interface"
import DeviceService from "Backend/device-service"
import DeviceBaseInfoAdapter from "Backend/adapters/device-base-info/device-base-info-adapter.class"
import DeviceInfo from "Common/interfaces/device-info.interface"

export class DeviceBaseInfo extends DeviceBaseInfoAdapter {
  constructor(private deviceService: DeviceService) {
    super()
  }

  public async getDeviceInfo(): Promise<DeviceResponse<DeviceInfo>> {
    const { status, data } = await this.deviceService.request({
      endpoint: Endpoint.DeviceInfo,
      method: Method.Get,
    })

    if (status !== DeviceResponseStatus.Ok || data === undefined) {
      return {
        status,
        error: { message: "Get Device Info: Something went wrong" },
      }
    } else {
      return {
        status,
        data: {
          osVersion: data.version,
          serialNumber: data.serialNumber,
          caseColour: data.caseColour ? data.caseColour : CaseColour.Gray,
          backupLocation: data.backupLocation ? data.backupLocation : "",
        },
      }
    }
  }
}

const createDeviceBaseInfoAdapter = (
  deviceService: DeviceService
): DeviceBaseInfoAdapter => new DeviceBaseInfo(deviceService)

export default createDeviceBaseInfoAdapter
