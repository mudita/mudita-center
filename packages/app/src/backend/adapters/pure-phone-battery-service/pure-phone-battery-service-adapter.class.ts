/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { RequestResponse } from "App/core/types/request-response.interface"

export default abstract class PurePhoneBatteryServiceAdapter {
  public abstract getBatteryLevel(): Promise<RequestResponse<number>>
  public abstract getChargingStatus(): boolean
}
