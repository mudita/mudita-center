/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import PurePhoneBatteryServiceAdapter from "App/__deprecated__/backend/adapters/pure-phone-battery-service/pure-phone-battery-service-adapter.class"
import {
  RequestResponse,
  RequestResponseStatus,
} from "App/core/types/request-response.interface"

class PurePhoneBatteryServiceFakeAdapter extends PurePhoneBatteryServiceAdapter {
  public async getBatteryLevel(): Promise<RequestResponse<number>> {
    return {
      status: RequestResponseStatus.Ok,
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
