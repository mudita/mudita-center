/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import PurePhoneBatteryServiceAdapter from "Backend/adapters/pure-phone-battery-service/pure-phone-battery-service-adapter.class"
import DeviceResponse, {
  DeviceResponseStatus,
} from "Backend/adapters/device-response.interface"

class PurePhoneBatteryServiceFakeAdapter extends PurePhoneBatteryServiceAdapter {
  public async getBatteryLevel(): Promise<DeviceResponse<number>> {
    return {
      status: DeviceResponseStatus.Ok,
      data: 0.5,
    }
  }

  public getChargingStatus(): boolean {
    return false
  }
}

const createFakePurePhoneBatteryAdapter = (): PurePhoneBatteryServiceAdapter =>
  new PurePhoneBatteryServiceFakeAdapter()

export default createFakePurePhoneBatteryAdapter
