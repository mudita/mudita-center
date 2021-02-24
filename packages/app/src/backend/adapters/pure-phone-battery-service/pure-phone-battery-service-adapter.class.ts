/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import DeviceResponse from "Backend/adapters/device-response.interface"

export default abstract class PurePhoneBatteryServiceAdapter {
  public abstract getBatteryLevel(): Promise<DeviceResponse<number>>
  public abstract getChargingStatus(): boolean
}
