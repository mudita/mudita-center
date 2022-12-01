/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { CaseColour } from "@mudita/pure"
import DeviceBaseInfoAdapter from "App/__deprecated__/backend/adapters/device-base-info/device-base-info-adapter.class"
import DeviceInfo from "App/__deprecated__/common/interfaces/device-info.interface"
import {
  RequestResponse,
  RequestResponseStatus,
} from "App/core/types/request-response.interface"

class DeviceBaseInfo extends DeviceBaseInfoAdapter {
  constructor() {
    super()
  }

  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/require-await
  public async getDeviceInfo(): Promise<RequestResponse<DeviceInfo>> {
    return {
      status: RequestResponseStatus.Ok,
      data: {
        deviceToken: "Nr8uiSV7KmWxX3WOFqZPF7uB+Zx8qaPa",
        osVersion: "1.0.0",
        serialNumber: "1UB13213MN14K1",
        caseColour: CaseColour.Gray,
        backupFilePath: "path/to/directory/fileBase.tar",
      },
    }
  }
}

const createFakeDeviceBaseInfoAdapter = (): DeviceBaseInfoAdapter =>
  new DeviceBaseInfo()

export default createFakeDeviceBaseInfoAdapter
