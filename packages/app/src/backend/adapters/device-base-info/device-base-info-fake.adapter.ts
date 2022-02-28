/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { CaseColour } from "@mudita/pure"
import DeviceResponse, {
  DeviceResponseStatus,
} from "Backend/adapters/device-response.interface"
import { osVersion } from "App/main/default-app-configuration.json"
import DeviceBaseInfoAdapter from "Backend/adapters/device-base-info/device-base-info-adapter.class"
import DeviceInfo from "Common/interfaces/device-info.interface"

class DeviceBaseInfo extends DeviceBaseInfoAdapter {
  constructor() {
    super()
  }

  public async getDeviceInfo(): Promise<DeviceResponse<DeviceInfo>> {
    return {
      status: DeviceResponseStatus.Ok,
      data: {
        deviceToken: "Nr8uiSV7KmWxX3WOFqZPF7uB+Zx8qaPa",
        osVersion: osVersion,
        serialNumber: "1UB13213MN14K1",
        caseColour: CaseColour.Gray,
        backupLocation: "path/to/directory",
      },
    }
  }
}

const createFakeDeviceBaseInfoAdapter = (): DeviceBaseInfoAdapter =>
  new DeviceBaseInfo()

export default createFakeDeviceBaseInfoAdapter
