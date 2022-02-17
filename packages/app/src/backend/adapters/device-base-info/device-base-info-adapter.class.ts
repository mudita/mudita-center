/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import DeviceResponse from "Backend/adapters/device-response.interface"
import DeviceInfo from "Common/interfaces/device-info.interface"

export default abstract class DeviceBaseInfoAdapter {
  public abstract getDeviceInfo(): Promise<DeviceResponse<DeviceInfo>>
}
