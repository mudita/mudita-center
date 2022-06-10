/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import DeviceInfo from "App/__deprecated__/common/interfaces/device-info.interface"
import { RequestResponse } from "App/core/types/request-response.interface"

export default abstract class DeviceBaseInfoAdapter {
  public abstract getDeviceInfo(): Promise<RequestResponse<DeviceInfo>>
}
